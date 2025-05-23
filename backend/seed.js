import sequelize from './db.js'
import Product from './models/Product.js'

async function seed() {
  try {
    await sequelize.authenticate()
    // sync schema if not done yet , ignore it when synced
    await Product.sync({ alter: true })

    // mock datas
    const products = [
      {
        articleNo: 'OFF-001',
        productName: 'Office Chair - Ergonomic',
        inPrice: 299.99,
        price: 399.99,
        unit: 'pcs',
        inStock: 15,
        description: 'Ergonomic office chair with lumbar support and adjustable height'
      },
      {
        articleNo: 'DESK-002',
        productName: 'Standing Desk - Electric',
        inPrice: 499.99,
        price: 699.99,
        unit: 'pcs',
        inStock: 8,
        description: 'Electric height-adjustable standing desk with memory settings'
      },
      {
        articleNo: 'MON-003',
        productName: '27" 4K Monitor',
        inPrice: 349.99,
        price: 449.99,
        unit: 'pcs',
        inStock: 12,
        description: '27-inch 4K UHD monitor with HDR and USB-C connectivity'
      },
      {
        articleNo: 'KEY-004',
        productName: 'Mechanical Keyboard',
        inPrice: 89.99,
        price: 129.99,
        unit: 'pcs',
        inStock: 25,
        description: 'RGB mechanical keyboard with Cherry MX switches'
      },
      {
        articleNo: 'MOUSE-005',
        productName: 'Wireless Mouse',
        inPrice: 29.99,
        price: 49.99,
        unit: 'pcs',
        inStock: 30,
        description: 'Wireless ergonomic mouse with programmable buttons'
      },
      {
        articleNo: 'HDD-006',
        productName: 'External SSD 1TB',
        inPrice: 79.99,
        price: 119.99,
        unit: 'pcs',
        inStock: 20,
        description: '1TB external SSD with USB 3.2 Gen 2 support'
      },
      {
        articleNo: 'NET-007',
        productName: 'WiFi Router',
        inPrice: 149.99,
        price: 199.99,
        unit: 'pcs',
        inStock: 10,
        description: 'Dual-band WiFi 6 router with mesh capability'
      },
      {
        articleNo: 'CAB-008',
        productName: 'USB-C Hub',
        inPrice: 39.99,
        price: 59.99,
        unit: 'pcs',
        inStock: 40,
        description: '7-in-1 USB-C hub with HDMI, Ethernet, and SD card slots'
      },
      {
        articleNo: 'LAMP-009',
        productName: 'LED Desk Lamp',
        inPrice: 24.99,
        price: 39.99,
        unit: 'pcs',
        inStock: 35,
        description: 'Adjustable LED desk lamp with multiple brightness levels'
      },
      {
        articleNo: 'HEAD-010',
        productName: 'Noise-Cancelling Headphones',
        inPrice: 199.99,
        price: 299.99,
        unit: 'pcs',
        inStock: 18,
        description: 'Wireless noise-cancelling headphones with 30-hour battery life'
      },
      {
        articleNo: 'PRINT-011',
        productName: 'Laser Printer - Business',
        inPrice: 399.99,
        price: 549.99,
        unit: 'pcs',
        inStock: 6,
        description: 'Business laser printer with duplex printing and wireless connectivity'
      },
      {
        articleNo: 'SCAN-012',
        productName: 'Document Scanner',
        inPrice: 199.99,
        price: 279.99,
        unit: 'pcs',
        inStock: 9,
        description: 'High-speed document scanner with automatic document feeder'
      },
      {
        articleNo: 'WEBCAM-013',
        productName: '4K Webcam',
        inPrice: 129.99,
        price: 179.99,
        unit: 'pcs',
        inStock: 22,
        description: '4K webcam with noise-cancelling microphone and auto-focus'
      },
      {
        articleNo: 'SPEAK-014',
        productName: 'Conference Speaker',
        inPrice: 249.99,
        price: 349.99,
        unit: 'pcs',
        inStock: 7,
        description: '360° conference speaker with echo cancellation and noise reduction'
      },
      {
        articleNo: 'UPS-015',
        productName: 'UPS Battery Backup',
        inPrice: 179.99,
        price: 249.99,
        unit: 'pcs',
        inStock: 14,
        description: '1500VA UPS with LCD display and voltage regulation'
      }
    ]

    for (const product of products) {
      await Product.create(product)
      console.log(`product inserted --- ${product.productName}`)
    }

    process.exit(0)
  } catch (error) {
    console.error('error occurred', error)
    process.exit(1)
  }
}

seed()
