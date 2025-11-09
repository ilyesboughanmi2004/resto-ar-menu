const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Image mapping for all menu items
// Using Unsplash food images as placeholders since we can't extract all from widget
const imageMapping = {
  // Pizza (already downloaded, but keeping for reference)
  'la-rossa': 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80',
  'margherita': 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80',
  'burrata': 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80',
  'jersey-margherita': 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80',
  'panna': 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80',
  'bosco': 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80',
  'pepperoni': 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80',
  'guancia': 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80',
  
  // Burgers
  'classic-burger': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
  'cheeseburger': 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80',
  'bacon-burger': 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80',
  'bbq-burger': 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80',
  'veggie-burger': 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80',
  
  // Snacks & Sides
  'french-fries': 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&q=80',
  'onion-rings': 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&q=80',
  'mozzarella-sticks': 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80',
  'chicken-wings': 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=800&q=80',
  'nachos': 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=800&q=80',
  'loaded-fries': 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&q=80',
  
  // Salads
  'caesar-salad': 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&q=80',
  'garden-salad': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
  'greek-salad': 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80',
  'chicken-salad': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
  'cobb-salad': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
  
  // Drinks
  'cola': 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=800&q=80',
  'lemon-lime-soda': 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=800&q=80',
  'orange-soda': 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=800&q=80',
  'root-beer': 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=800&q=80',
  'iced-tea': 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80',
  'lemonade': 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=800&q=80',
  'water': 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=800&q=80',
};

const imagesDir = path.join(process.cwd(), 'public', 'images');

// Ensure directory exists
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    const request = protocol.get(url, (response) => {
      if (response.statusCode === 200) {
        const filePath = path.join(imagesDir, filename);
        const fileStream = fs.createWriteStream(filePath);
        
        response.pipe(fileStream);
        
        fileStream.on('finish', () => {
          fileStream.close();
          console.log(`✅ Downloaded: ${filename}`);
          resolve();
        });
      } else if (response.statusCode === 301 || response.statusCode === 302) {
        // Handle redirects
        downloadImage(response.headers.location, filename)
          .then(resolve)
          .catch(reject);
      } else {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
      }
    });
    
    request.on('error', (err) => {
      reject(err);
    });
    
    request.setTimeout(30000, () => {
      request.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

async function downloadAllImages() {
  console.log('📥 Starting image download for all categories...\n');
  
  // Skip pizza images (already downloaded)
  const skipImages = ['la-rossa', 'margherita', 'burrata', 'jersey-margherita', 'panna', 'bosco', 'pepperoni', 'guancia'];
  
  for (const [itemName, url] of Object.entries(imageMapping)) {
    if (skipImages.includes(itemName)) {
      console.log(`⏭️  Skipping ${itemName}.jpg (already exists)`);
      continue;
    }
    
    const filename = `${itemName}.jpg`;
    const filePath = path.join(imagesDir, filename);
    
    // Skip if file already exists
    if (fs.existsSync(filePath)) {
      console.log(`⏭️  Skipping ${filename} (already exists)`);
      continue;
    }
    
    try {
      await downloadImage(url, filename);
      // Add a small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`❌ Error downloading ${filename}:`, error.message);
    }
  }
  
  console.log('\n🎉 Image download completed!');
  console.log(`📁 Images saved to: ${imagesDir}`);
}

downloadAllImages().catch(console.error);

