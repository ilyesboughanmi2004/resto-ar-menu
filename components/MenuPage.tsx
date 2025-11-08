'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Restaurant, Category, MenuItem } from '@prisma/client';
import ARViewer from './ARViewer';

type RestaurantWithRelations = Restaurant & {
  categories: (Category & {
    menuItems: MenuItem[];
  })[];
};

interface MenuPageProps {
  restaurant: RestaurantWithRelations;
}

export default function MenuPage({ restaurant }: MenuPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    restaurant.categories[0]?.id.toString() || null
  );
  const [selectedARModel, setSelectedARModel] = useState<string | null>(null);

  const currentCategory = restaurant.categories.find(
    (cat) => cat.id.toString() === selectedCategory
  );

  const menuItems = currentCategory?.menuItems || [];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {restaurant.logoUrl && (
            <Image
              src={restaurant.logoUrl}
              alt={restaurant.name}
              width={120}
              height={48}
              className="h-12 w-auto mx-auto mb-2"
              unoptimized
            />
          )}
          <h1 className="text-2xl font-bold text-center text-shadow">
            {restaurant.name}
          </h1>
          {restaurant.description && (
            <p className="text-sm text-gray-600 text-center mt-1">
              {restaurant.description}
            </p>
          )}
        </div>
      </header>

      {/* Category Navigation */}
      <nav className="bg-primary sticky top-[88px] z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto scrollbar-hide py-3 gap-2 scroll-smooth">
            {restaurant.categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id.toString())}
                className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition-all min-w-fit ${
                  selectedCategory === category.id.toString()
                    ? 'bg-highlight text-white shadow-lg scale-105'
                    : 'bg-accent text-white hover:bg-highlight'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Menu Items */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {menuItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No items in this category yet.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Left side - Text content */}
                  <div className="flex-1 p-4 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-shadow mb-2">
                        {item.name}
                      </h3>
                      {item.description && (
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {item.description}
                        </p>
                      )}
                      <p className="text-lg font-semibold text-primary">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Right side - Image and AR button */}
                  <div className="relative sm:w-48 w-full h-48 sm:h-auto flex-shrink-0">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">No image</span>
                      </div>
                    )}
                    {item.arModelUrl && (
                      <button
                        onClick={() => setSelectedARModel(item.arModelUrl!)}
                        className="absolute bottom-2 right-2 bg-primary hover:bg-highlight text-white px-4 py-2 rounded-lg font-medium shadow-lg transition-all transform hover:scale-105 active:scale-95 text-sm z-10"
                      >
                        View in AR
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* AR Viewer Modal */}
      {selectedARModel && (
        <ARViewer
          modelUrl={selectedARModel}
          onClose={() => setSelectedARModel(null)}
        />
      )}
    </div>
  );
}

