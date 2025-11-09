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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {restaurant.logoUrl && (
            <Image
              src={restaurant.logoUrl}
              alt={restaurant.name}
              width={120}
              height={48}
              className="h-10 w-auto mx-auto mb-3"
              unoptimized
            />
          )}
          <h1 className="text-2xl font-semibold text-center text-gray-900 mb-1">
            {restaurant.name}
          </h1>
          {restaurant.description && (
            <p className="text-sm text-gray-600 text-center max-w-xl mx-auto">
              {restaurant.description}
            </p>
          )}
        </div>
      </header>

      {/* Category Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-[100px] z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto scrollbar-hide py-4 gap-1 scroll-smooth">
            {restaurant.categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id.toString())}
                className={`px-5 py-2 rounded-md font-medium whitespace-nowrap transition-colors min-w-fit ${
                  selectedCategory === category.id.toString()
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Menu Items */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {menuItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No items in this category yet.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-primary/50 transition-colors"
              >
                <div className="flex">
                  {/* Left side - Text content */}
                  <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1.5">
                        {item.name}
                      </h3>
                      {item.description && (
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                      <p className="text-base font-semibold text-primary">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Right side - Image and AR button */}
                  <div className="relative w-32 h-32 flex-shrink-0">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <div className="w-12 h-12 border-2 border-gray-300 rounded"></div>
                      </div>
                    )}
                    {item.arModelUrl && (
                      <button
                        onClick={() => setSelectedARModel(item.arModelUrl!)}
                        className="absolute bottom-2 right-2 bg-primary hover:bg-highlight text-white px-3 py-1.5 rounded text-xs font-medium shadow transition-colors"
                      >
                        AR
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

