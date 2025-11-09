import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...\n')

  // Create or get restaurant
  let restaurant = await prisma.restaurant.findFirst()
  
  if (!restaurant) {
    restaurant = await prisma.restaurant.create({
      data: {
        name: 'Your Restaurant',
        description: 'A modern fast food restaurant serving delicious meals',
        logoUrl: null,
        qrCodeUrl: null,
      },
    })
    console.log('✅ Created restaurant:', restaurant.name)
  } else {
    console.log('✅ Using existing restaurant:', restaurant.name)
  }

  // GLB file paths for AR models
  const defaultGlbFilePath = '/models/towels_reality_scan_test.glb'
  const pizzaGlbFilePath = '/models/pizza.glb'

  // Define all categories and their menu items (extracted from Elfsight Fast Food Restaurant example)
  const categoriesData = [
    {
      name: 'Pizza',
      order: 1,
      items: [
        {
          name: 'La Rossa',
          description: 'Tomato sauce, garlic, basil (no cheese)',
          price: 15.00,
          order: 1,
          imageUrl: '/images/la-rossa.jpg',
          arModelUrl: pizzaGlbFilePath,
        },
        {
          name: 'Margherita',
          description: 'Tomato sauce, fresh mozzarella, basil, sea salt, California extra virgin olive oil',
          price: 17.00,
          order: 2,
          imageUrl: '/images/margherita.jpg',
          arModelUrl: pizzaGlbFilePath,
        },
        {
          name: 'Burrata',
          description: 'Tomato Sauce, burrata, garlic, basil',
          price: 18.00,
          order: 3,
          imageUrl: '/images/burrata.jpg',
          arModelUrl: pizzaGlbFilePath,
        },
        {
          name: 'Jersey Margherita',
          description: 'Crushed NJ tomatoes, Jersey Girl mozzarella, basil',
          price: 19.00,
          order: 4,
          imageUrl: '/images/jersey-margherita.jpg',
          arModelUrl: pizzaGlbFilePath,
        },
        {
          name: 'Panna',
          description: 'Tomato sauce, fresh mozzarella, grass-fed PA cow\'s cream, arugula, parmigiano',
          price: 18.00,
          order: 5,
          imageUrl: '/images/panna.jpg',
          arModelUrl: pizzaGlbFilePath,
        },
        {
          name: 'Bosco',
          description: 'Tomato sauce, fresh mozzarella, cremini mushrooms, fontina',
          price: 17.00,
          order: 6,
          imageUrl: '/images/bosco.jpg',
          arModelUrl: pizzaGlbFilePath,
        },
        {
          name: 'Pepperoni',
          description: 'Tomato sauce, fresh mozzarella, pepperoni',
          price: 19.00,
          order: 7,
          imageUrl: '/images/pepperoni.jpg',
          arModelUrl: pizzaGlbFilePath,
        },
        {
          name: 'Guancia',
          description: 'Tomato sauce, fresh mozzarella, guanciale, shaved onion, pecorino',
          price: 19.00,
          order: 8,
          imageUrl: '/images/guancia.jpg',
          arModelUrl: pizzaGlbFilePath,
        },
      ],
    },
    {
      name: 'Burgers',
      order: 2,
      items: [
        {
          name: 'Classic Burger',
          description: 'Beef patty, lettuce, tomato, onion, pickles, special sauce',
          price: 12.00,
          order: 1,
          imageUrl: '/images/classic-burger.jpg',
        },
        {
          name: 'Cheeseburger',
          description: 'Beef patty, cheese, lettuce, tomato, onion, pickles',
          price: 13.00,
          order: 2,
          imageUrl: '/images/cheeseburger.jpg',
        },
        {
          name: 'Bacon Burger',
          description: 'Beef patty, crispy bacon, cheese, lettuce, tomato, onion',
          price: 14.50,
          order: 3,
          imageUrl: '/images/bacon-burger.jpg',
        },
        {
          name: 'BBQ Burger',
          description: 'Beef patty, BBQ sauce, crispy onions, cheddar cheese',
          price: 14.00,
          order: 4,
          imageUrl: '/images/bbq-burger.jpg',
        },
        {
          name: 'Veggie Burger',
          description: 'Plant-based patty, lettuce, tomato, onion, special sauce',
          price: 11.00,
          order: 5,
          imageUrl: '/images/veggie-burger.jpg',
        },
      ],
    },
    {
      name: 'Snacks & Sides',
      order: 3,
      items: [
        {
          name: 'French Fries',
          description: 'Crispy golden fries with sea salt',
          price: 4.50,
          order: 1,
          imageUrl: '/images/french-fries.jpg',
        },
        {
          name: 'Onion Rings',
          description: 'Beer-battered onion rings, crispy and golden',
          price: 5.00,
          order: 2,
          imageUrl: '/images/onion-rings.jpg',
        },
        {
          name: 'Mozzarella Sticks',
          description: 'Breaded mozzarella with marinara sauce',
          price: 6.50,
          order: 3,
          imageUrl: '/images/mozzarella-sticks.jpg',
        },
        {
          name: 'Chicken Wings',
          description: 'Spicy buffalo wings with blue cheese dip',
          price: 8.00,
          order: 4,
          imageUrl: '/images/chicken-wings.jpg',
        },
        {
          name: 'Nachos',
          description: 'Tortilla chips with cheese, jalapeños, and sour cream',
          price: 7.50,
          order: 5,
          imageUrl: '/images/nachos.jpg',
        },
        {
          name: 'Loaded Fries',
          description: 'French fries topped with cheese, bacon, and sour cream',
          price: 7.00,
          order: 6,
          imageUrl: '/images/loaded-fries.jpg',
        },
      ],
    },
    {
      name: 'Salads',
      order: 4,
      items: [
        {
          name: 'Caesar Salad',
          description: 'Romaine lettuce, parmesan, croutons, caesar dressing',
          price: 9.00,
          order: 1,
          imageUrl: '/images/caesar-salad.jpg',
        },
        {
          name: 'Garden Salad',
          description: 'Mixed greens, tomatoes, cucumbers, carrots, vinaigrette',
          price: 8.00,
          order: 2,
          imageUrl: '/images/garden-salad.jpg',
        },
        {
          name: 'Greek Salad',
          description: 'Mixed greens, feta cheese, olives, tomatoes, cucumbers, olive oil',
          price: 10.00,
          order: 3,
          imageUrl: '/images/greek-salad.jpg',
        },
        {
          name: 'Chicken Salad',
          description: 'Mixed greens, grilled chicken, tomatoes, cucumbers, ranch dressing',
          price: 11.00,
          order: 4,
          imageUrl: '/images/chicken-salad.jpg',
        },
        {
          name: 'Cobb Salad',
          description: 'Mixed greens, grilled chicken, bacon, eggs, avocado, blue cheese',
          price: 12.00,
          order: 5,
          imageUrl: '/images/cobb-salad.jpg',
        },
      ],
    },
    {
      name: 'Drinks',
      order: 5,
      items: [
        {
          name: 'Cola',
          description: 'Classic cola soft drink',
          price: 3.00,
          order: 1,
          imageUrl: '/images/cola.jpg',
        },
        {
          name: 'Lemon-Lime Soda',
          description: 'Refreshing citrus-flavored soda',
          price: 3.00,
          order: 2,
          imageUrl: '/images/lemon-lime-soda.jpg',
        },
        {
          name: 'Orange Soda',
          description: 'Fruity orange-flavored soda',
          price: 3.00,
          order: 3,
          imageUrl: '/images/orange-soda.jpg',
        },
        {
          name: 'Root Beer',
          description: 'Classic root beer flavor',
          price: 3.25,
          order: 4,
          imageUrl: '/images/root-beer.jpg',
        },
        {
          name: 'Iced Tea',
          description: 'Refreshing iced tea, sweetened or unsweetened',
          price: 2.75,
          order: 5,
          imageUrl: '/images/iced-tea.jpg',
        },
        {
          name: 'Lemonade',
          description: 'Fresh squeezed lemonade',
          price: 3.50,
          order: 6,
          imageUrl: '/images/lemonade.jpg',
        },
        {
          name: 'Water',
          description: 'Bottled water',
          price: 2.00,
          order: 7,
          imageUrl: '/images/water.jpg',
        },
      ],
    },
  ]

  // Create categories and menu items
  for (const categoryData of categoriesData) {
    let category = await prisma.category.findFirst({
      where: {
        restaurantId: restaurant.id,
        name: categoryData.name,
      },
    })

    if (!category) {
      category = await prisma.category.create({
        data: {
          name: categoryData.name,
          restaurantId: restaurant.id,
          order: categoryData.order,
        },
      })
      console.log(`✅ Created category: ${categoryData.name}`)
    } else {
      console.log(`✅ Using existing category: ${categoryData.name}`)
      // Delete existing menu items in this category to avoid duplicates
      const deletedCount = await prisma.menuItem.deleteMany({
        where: {
          categoryId: category.id,
        },
      })
      if (deletedCount.count > 0) {
        console.log(`   🗑️  Deleted ${deletedCount.count} existing menu items`)
      }
    }

    // Create menu items for this category
    for (const item of categoryData.items) {
      await prisma.menuItem.create({
        data: {
          name: item.name,
          description: item.description,
          price: item.price,
          order: item.order,
          categoryId: category.id,
          restaurantId: restaurant.id,
          imageUrl: item.imageUrl || null,
          arModelUrl: (item as any).arModelUrl || defaultGlbFilePath,
        },
      })
      console.log(`   ✅ Created menu item: ${item.name}`)
    }
  }

  const totalItems = categoriesData.reduce((sum, cat) => sum + cat.items.length, 0)
  console.log('\n🎉 Seed completed successfully!')
  console.log(`📊 Created ${categoriesData.length} categories with ${totalItems} total menu items`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

