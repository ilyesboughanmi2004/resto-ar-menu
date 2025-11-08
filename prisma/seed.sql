-- Seed script for ARMenu database
-- Run this in your Supabase SQL editor
-- Using GLB file path: /models/towels_reality_scan_test.glb
-- Make sure the GLB file is placed in public/models/ folder

-- First, create a restaurant if it doesn't exist
INSERT INTO "Restaurant" (name, description, "logoUrl", "qrCodeUrl", "createdAt", "updatedAt")
VALUES ('Your Coffee Shop', 'A cozy coffee shop serving delicious beverages and treats', NULL, NULL, NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Get the restaurant ID (assuming it's the first one)
-- Create Drinks category
INSERT INTO "Category" (name, "restaurantId", "order", "createdAt", "updatedAt")
SELECT 'Drinks', id, 1, NOW(), NOW()
FROM "Restaurant"
WHERE name = 'Your Coffee Shop'
ON CONFLICT DO NOTHING;

-- Insert menu items for Drinks category
-- All items use the same 3D model for testing (replace '/models/towels_reality_scan_test.glb' with actual model ID)
-- Water
INSERT INTO "MenuItem" (name, description, price, "imageUrl", "arModelUrl", "categoryId", "restaurantId", "order", "createdAt", "updatedAt")
SELECT 'Sparkling Water', 'Refreshing carbonated water', 2.50, NULL, '/models/towels_reality_scan_test.glb', c.id, r.id, 1, NOW(), NOW()
FROM "Category" c, "Restaurant" r
WHERE c.name = 'Drinks' AND r.name = 'Your Coffee Shop'
ON CONFLICT DO NOTHING;

INSERT INTO "MenuItem" (name, description, price, "imageUrl", "arModelUrl", "categoryId", "restaurantId", "order", "createdAt", "updatedAt")
SELECT 'Still Water', 'Pure filtered water', 2.00, NULL, '/models/towels_reality_scan_test.glb', c.id, r.id, 2, NOW(), NOW()
FROM "Category" c, "Restaurant" r
WHERE c.name = 'Drinks' AND r.name = 'Your Coffee Shop'
ON CONFLICT DO NOTHING;

-- Coffees
INSERT INTO "MenuItem" (name, description, price, "imageUrl", "arModelUrl", "categoryId", "restaurantId", "order", "createdAt", "updatedAt")
SELECT 'Espresso', 'Strong, concentrated coffee shot', 3.50, NULL, '/models/towels_reality_scan_test.glb', c.id, r.id, 3, NOW(), NOW()
FROM "Category" c, "Restaurant" r
WHERE c.name = 'Drinks' AND r.name = 'Your Coffee Shop'
ON CONFLICT DO NOTHING;

INSERT INTO "MenuItem" (name, description, price, "imageUrl", "arModelUrl", "categoryId", "restaurantId", "order", "createdAt", "updatedAt")
SELECT 'Americano', 'Espresso with hot water', 4.00, NULL, '/models/towels_reality_scan_test.glb', c.id, r.id, 4, NOW(), NOW()
FROM "Category" c, "Restaurant" r
WHERE c.name = 'Drinks' AND r.name = 'Your Coffee Shop'
ON CONFLICT DO NOTHING;

INSERT INTO "MenuItem" (name, description, price, "imageUrl", "arModelUrl", "categoryId", "restaurantId", "order", "createdAt", "updatedAt")
SELECT 'Cappuccino', 'Espresso with steamed milk and foam', 4.50, NULL, '/models/towels_reality_scan_test.glb', c.id, r.id, 5, NOW(), NOW()
FROM "Category" c, "Restaurant" r
WHERE c.name = 'Drinks' AND r.name = 'Your Coffee Shop'
ON CONFLICT DO NOTHING;

INSERT INTO "MenuItem" (name, description, price, "imageUrl", "arModelUrl", "categoryId", "restaurantId", "order", "createdAt", "updatedAt")
SELECT 'Latte', 'Espresso with steamed milk', 4.75, NULL, '/models/towels_reality_scan_test.glb', c.id, r.id, 6, NOW(), NOW()
FROM "Category" c, "Restaurant" r
WHERE c.name = 'Drinks' AND r.name = 'Your Coffee Shop'
ON CONFLICT DO NOTHING;

INSERT INTO "MenuItem" (name, description, price, "imageUrl", "arModelUrl", "categoryId", "restaurantId", "order", "createdAt", "updatedAt")
SELECT 'Mocha', 'Espresso with chocolate and steamed milk', 5.25, NULL, '/models/towels_reality_scan_test.glb', c.id, r.id, 7, NOW(), NOW()
FROM "Category" c, "Restaurant" r
WHERE c.name = 'Drinks' AND r.name = 'Your Coffee Shop'
ON CONFLICT DO NOTHING;

INSERT INTO "MenuItem" (name, description, price, "imageUrl", "arModelUrl", "categoryId", "restaurantId", "order", "createdAt", "updatedAt")
SELECT 'Macchiato', 'Espresso with a dollop of foam', 4.25, NULL, '/models/towels_reality_scan_test.glb', c.id, r.id, 8, NOW(), NOW()
FROM "Category" c, "Restaurant" r
WHERE c.name = 'Drinks' AND r.name = 'Your Coffee Shop'
ON CONFLICT DO NOTHING;

INSERT INTO "MenuItem" (name, description, price, "imageUrl", "arModelUrl", "categoryId", "restaurantId", "order", "createdAt", "updatedAt")
SELECT 'Cold Brew', 'Smooth, cold-brewed coffee', 4.50, NULL, '/models/towels_reality_scan_test.glb', c.id, r.id, 9, NOW(), NOW()
FROM "Category" c, "Restaurant" r
WHERE c.name = 'Drinks' AND r.name = 'Your Coffee Shop'
ON CONFLICT DO NOTHING;

INSERT INTO "MenuItem" (name, description, price, "imageUrl", "arModelUrl", "categoryId", "restaurantId", "order", "createdAt", "updatedAt")
SELECT 'Iced Coffee', 'Chilled coffee over ice', 4.00, NULL, '/models/towels_reality_scan_test.glb', c.id, r.id, 10, NOW(), NOW()
FROM "Category" c, "Restaurant" r
WHERE c.name = 'Drinks' AND r.name = 'Your Coffee Shop'
ON CONFLICT DO NOTHING;

-- Sodas
INSERT INTO "MenuItem" (name, description, price, "imageUrl", "arModelUrl", "categoryId", "restaurantId", "order", "createdAt", "updatedAt")
SELECT 'Cola', 'Classic cola soft drink', 3.00, NULL, '/models/towels_reality_scan_test.glb', c.id, r.id, 11, NOW(), NOW()
FROM "Category" c, "Restaurant" r
WHERE c.name = 'Drinks' AND r.name = 'Your Coffee Shop'
ON CONFLICT DO NOTHING;

INSERT INTO "MenuItem" (name, description, price, "imageUrl", "arModelUrl", "categoryId", "restaurantId", "order", "createdAt", "updatedAt")
SELECT 'Lemon-Lime Soda', 'Refreshing citrus-flavored soda', 3.00, NULL, '/models/towels_reality_scan_test.glb', c.id, r.id, 12, NOW(), NOW()
FROM "Category" c, "Restaurant" r
WHERE c.name = 'Drinks' AND r.name = 'Your Coffee Shop'
ON CONFLICT DO NOTHING;

INSERT INTO "MenuItem" (name, description, price, "imageUrl", "arModelUrl", "categoryId", "restaurantId", "order", "createdAt", "updatedAt")
SELECT 'Orange Soda', 'Fruity orange-flavored soda', 3.00, NULL, '/models/towels_reality_scan_test.glb', c.id, r.id, 13, NOW(), NOW()
FROM "Category" c, "Restaurant" r
WHERE c.name = 'Drinks' AND r.name = 'Your Coffee Shop'
ON CONFLICT DO NOTHING;

INSERT INTO "MenuItem" (name, description, price, "imageUrl", "arModelUrl", "categoryId", "restaurantId", "order", "createdAt", "updatedAt")
SELECT 'Root Beer', 'Classic root beer flavor', 3.25, NULL, '/models/towels_reality_scan_test.glb', c.id, r.id, 14, NOW(), NOW()
FROM "Category" c, "Restaurant" r
WHERE c.name = 'Drinks' AND r.name = 'Your Coffee Shop'
ON CONFLICT DO NOTHING;

INSERT INTO "MenuItem" (name, description, price, "imageUrl", "arModelUrl", "categoryId", "restaurantId", "order", "createdAt", "updatedAt")
SELECT 'Ginger Ale', 'Crisp ginger-flavored soda', 3.25, NULL, '/models/towels_reality_scan_test.glb', c.id, r.id, 15, NOW(), NOW()
FROM "Category" c, "Restaurant" r
WHERE c.name = 'Drinks' AND r.name = 'Your Coffee Shop'
ON CONFLICT DO NOTHING;

