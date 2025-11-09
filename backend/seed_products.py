import requests

# ======== CONFIGURATION ========
BASE_URL = "http://127.0.0.1:8000"
ADMIN_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE3NjMyMDI3NTh9.5EooeA7F1eO2OoLHDh5DHDQ63KuTLjrIeHRcJP031JE"

# ======== PRODUCT DATA ========
products = [
    # Electronics
    {"name": "Wireless Mouse", "description": "Ergonomic 2.4GHz wireless mouse with adjustable DPI and silent clicks.", "price": 29.99, "stock": 100},
    {"name": "Mechanical Keyboard", "description": "RGB backlit mechanical keyboard with blue switches for tactile feedback.", "price": 79.99, "stock": 50},
    {"name": "Noise Cancelling Headphones", "description": "Over-ear Bluetooth headphones with active noise cancellation and 30-hour battery.", "price": 149.99, "stock": 40},
    {"name": "Smart Watch Series X", "description": "Fitness tracker with heart-rate monitoring, GPS, and waterproof design.", "price": 199.00, "stock": 60},
    {"name": "1080p Webcam", "description": "Full HD 1080p webcam with built-in microphone and auto light correction.", "price": 49.99, "stock": 80},

    # Mobile & Accessories
    {"name": "Fast Charging Cable (Type-C)", "description": "1.5m braided USB-C cable supporting 60W power delivery.", "price": 9.99, "stock": 200},
    {"name": "Power Bank 10000mAh", "description": "Compact and lightweight portable charger with dual USB output.", "price": 34.99, "stock": 150},
    {"name": "Wireless Charger Pad", "description": "Qi-certified 15W wireless charging pad with LED indicator.", "price": 24.99, "stock": 100},

    # Home & Kitchen
    {"name": "Electric Kettle 1.8L", "description": "Stainless steel kettle with auto shut-off and rapid boil technology.", "price": 39.99, "stock": 70},
    {"name": "Air Fryer 4.5L", "description": "Oil-free air fryer with digital timer and temperature control.", "price": 129.99, "stock": 30},
    {"name": "Smart LED Bulb", "description": "WiFi-enabled color-changing LED bulb compatible with Alexa and Google Home.", "price": 19.99, "stock": 120},

    # Fashion
    {"name": "Men's Cotton T-Shirt", "description": "100% cotton round-neck T-shirt available in multiple colors.", "price": 14.99, "stock": 100},
    {"name": "Women's Denim Jacket", "description": "Classic blue denim jacket with button closure and side pockets.", "price": 49.99, "stock": 60},
    {"name": "Leather Wallet", "description": "Genuine leather wallet with RFID protection and 6 card slots.", "price": 39.99, "stock": 90},

    # Gaming
    {"name": "Gaming Headset Pro", "description": "7.1 surround sound gaming headset with noise-cancelling mic and RGB lights.", "price": 89.99, "stock": 45},
    {"name": "Game Controller Wireless", "description": "Ergonomic wireless controller compatible with PC and Android devices.", "price": 59.99, "stock": 50},
    {"name": "Portable Bluetooth Speaker", "description": "Compact waterproof speaker with 12-hour playtime and deep bass.", "price": 69.99, "stock": 80},
    {"name": "4K Action Camera", "description": "Waterproof action cam with 4K recording, WiFi, and 2 batteries included.", "price": 99.99, "stock": 40},
    {"name": "VR Headset Lite", "description": "Lightweight virtual reality headset compatible with most smartphones.", "price": 79.99, "stock": 30},
]

# ======== SCRIPT ========
headers = {
    "Authorization": f"Bearer {ADMIN_TOKEN}",
    "Content-Type": "application/json"
}

success, failed = 0, 0
for product in products:
    try:
        res = requests.post(f"{BASE_URL}/products/", json=product, headers=headers)
        if res.status_code == 200 or res.status_code == 201:
            print(f"✅ Added: {product['name']}")
            success += 1
        else:
            print(f"❌ Failed ({res.status_code}): {product['name']} → {res.text}")
            failed += 1
    except Exception as e:
        print(f"⚠️ Error adding {product['name']}: {e}")
        failed += 1

print(f"\n📦 Upload complete → Success: {success}, Failed: {failed}")
