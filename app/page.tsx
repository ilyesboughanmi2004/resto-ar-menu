import { prisma } from '@/lib/prisma';
import MenuPage from '@/components/MenuPage';

export default async function Home() {
  // Fetch restaurant data
  const restaurant = await prisma.restaurant.findFirst({
    include: {
      categories: {
        include: {
          menuItems: {
            orderBy: {
              order: 'asc',
            },
          },
        },
        orderBy: {
          order: 'asc',
        },
      },
    },
  });

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-shadow mb-4">No Restaurant Data Found</h1>
          <p className="text-gray-600">Please add restaurant data to the database.</p>
        </div>
      </div>
    );
  }

  return <MenuPage restaurant={restaurant} />;
}

