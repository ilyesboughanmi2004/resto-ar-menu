import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...\n')

  // Create or get restaurant
  let restaurant = await prisma.restaurant.findFirst()
  
  if (!restaurant) {
    restaurant = await prisma.restaurant.create({
      data: {
        name: 'Your Coffee Shop',
        description: 'A cozy coffee shop serving delicious beverages and treats',
        logoUrl: null,
        qrCodeUrl: null,
      },
    })
    console.log('✅ Created restaurant:', restaurant.name)
  } else {
    console.log('✅ Using existing restaurant:', restaurant.name)
  }

  // Create or get Drinks category
  let drinksCategory = await prisma.category.findFirst({
    where: {
      restaurantId: restaurant.id,
      name: 'Drinks',
    },
  })

  if (!drinksCategory) {
    drinksCategory = await prisma.category.create({
      data: {
        name: 'Drinks',
        restaurantId: restaurant.id,
        order: 1,
      },
    })
    console.log('✅ Created category: Drinks')
  } else {
    console.log('✅ Using existing category: Drinks')
    // Delete existing menu items in Drinks category to avoid duplicates
    const deletedCount = await prisma.menuItem.deleteMany({
      where: {
        categoryId: drinksCategory.id,
      },
    })
    if (deletedCount.count > 0) {
      console.log(`🗑️  Deleted ${deletedCount.count} existing menu items`)
    }
  }

  // Create menu items
  const menuItems = [
    // Water
    {
      name: 'Sparkling Water',
      description: 'Refreshing carbonated water',
      price: 2.50,
      order: 1,
    },
    {
      name: 'Still Water',
      description: 'Pure filtered water',
      price: 2.00,
      order: 2,
    },
    // Coffees
    {
      name: 'Espresso',
      description: 'Strong, concentrated coffee shot',
      price: 3.50,
      order: 3,
    },
    {
      name: 'Americano',
      description: 'Espresso with hot water',
      price: 4.00,
      order: 4,
    },
    {
      name: 'Cappuccino',
      description: 'Espresso with steamed milk and foam',
      price: 4.50,
      order: 5,
    },
    {
      name: 'Latte',
      description: 'Espresso with steamed milk',
      price: 4.75,
      order: 6,
    },
    {
      name: 'Mocha',
      description: 'Espresso with chocolate and steamed milk',
      price: 5.25,
      order: 7,
    },
    {
      name: 'Macchiato',
      description: 'Espresso with a dollop of foam',
      price: 4.25,
      order: 8,
    },
    {
      name: 'Cold Brew',
      description: 'Smooth, cold-brewed coffee',
      price: 4.50,
      order: 9,
    },
    {
      name: 'Iced Coffee',
      description: 'Chilled coffee over ice',
      price: 4.00,
      order: 10,
    },
    // Sodas
    {
      name: 'Cola',
      description: 'Classic cola soft drink',
      price: 3.00,
      order: 11,
    },
    {
      name: 'Lemon-Lime Soda',
      description: 'Refreshing citrus-flavored soda',
      price: 3.00,
      order: 12,
    },
    {
      name: 'Orange Soda',
      description: 'Fruity orange-flavored soda',
      price: 3.00,
      order: 13,
    },
    {
      name: 'Root Beer',
      description: 'Classic root beer flavor',
      price: 3.25,
      order: 14,
    },
    {
      name: 'Ginger Ale',
      description: 'Crisp ginger-flavored soda',
      price: 3.25,
      order: 15,
    },
  ]

  // Sketchfab model ID for towels_reality_scan_test.glb
  const sketchfabModelId = 'c6b7ee9ff9844eebb8922538cb76e40e'

  for (const item of menuItems) {
    await prisma.menuItem.create({
      data: {
        ...item,
        categoryId: drinksCategory.id,
        restaurantId: restaurant.id,
        imageUrl: null,
        arModelUrl: sketchfabModelId, // All items use the same 3D model for testing
      },
    })
    console.log(`✅ Created menu item: ${item.name}`)
  }

  console.log('\n🎉 Seed completed successfully!')
  console.log(`📊 Created ${menuItems.length} menu items in the Drinks category`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

