from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app import models, schemas
from app.deps import get_current_active_user, get_current_user, get_current_admin

router = APIRouter(prefix="/orders", tags=["orders"])

@router.post("/", response_model=schemas.OrderOut)
def create_order(order_in: schemas.OrderCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_active_user)):
    total = 0.0
    order = models.Order(user_id=current_user.id)
    db.add(order)
    db.flush()
    for it in order_in.items:
        prod = db.query(models.Product).filter(models.Product.id == it.product_id).with_for_update().first()
        if not prod:
            raise HTTPException(404, f"Product {it.product_id} not found")
        if prod.stock < it.quantity:
            raise HTTPException(400, f"Insufficient stock for product {prod.id}")
        prod.stock -= it.quantity
        db.add(models.OrderItem(order_id=order.id, product_id=prod.id, quantity=it.quantity, price=prod.price))
        total += prod.price * it.quantity
    order.total_amount = total
    db.commit()
    db.refresh(order)
    return order

@router.get("/", response_model=list[schemas.OrderOut])
def get_user_orders(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_active_user)):
    orders = db.query(models.Order).filter(models.Order.user_id == current_user.id).all()
    return orders

@router.get("/{order_id}", response_model=schemas.OrderOut)
def get_order(order_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if not order:
        raise HTTPException(404, "Order not found")
    if order.user_id != current_user.id and current_user.role != "admin":
        raise HTTPException(403, "Not allowed")
    return order

@router.post("/{order_id}/pay")
def pay_order(order_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_active_user)):
    order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if not order:
        raise HTTPException(404, "Order not found")
    if order.user_id != current_user.id:
        raise HTTPException(403, "Not allowed")
    if order.status != "pending":
        raise HTTPException(400, "Order not pending")
    order.status = "paid"
    db.commit()
    return {"detail": "payment successful", "order_id": order.id}
