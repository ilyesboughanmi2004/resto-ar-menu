const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Image URLs extracted from Elfsight widget
const imageUrls = [
  'https://files.elfsight.com/storage/b27fdf3d-b477-40ce-84d4-ddcade571fb4/f299acaf-76fe-4e14-aa67-fff28c5fdea0.jpeg',
  'https://files.elfsight.com/storage/b27fdf3d-b477-40ce-84d4-ddcade571fb4/9a6baf84-4629-433c-b540-85c046cea60b.jpeg',
  'https://files.elfsight.com/storage/b27fdf3d-b477-40ce-84d4-ddcade571fb4/422f8da7-6463-4944-a7b2-f7dfe5d5d9b8.jpeg',
  'https://files.elfsight.com/storage/b27fdf3d-b477-40ce-84d4-ddcade571fb4/457d769d-bd03-4dd8-8c86-53641662276e.jpeg',
  'https://files.elfsight.com/storage/b27fdf3d-b477-40ce-84d4-ddcade571fb4/8ae3affe-00ca-46f1-89f1-4092db9175f9.jpeg',
  'https://files.elfsight.com/storage/b27fdf3d-b477-40ce-84d4-ddcade571fb4/e777a8dd-a95d-4695-9ef6-67b6784fe99f.jpeg',
  'https://files.elfsight.com/storage/b27fdf3d-b477-40ce-84d4-ddcade571fb4/34edd512-6f36-48cb-86d0-90f50e065f52.jpeg',
  'https://files.elfsight.com/storage/b27fdf3d-b477-40ce-84d4-ddcade571fb4/6b16ca1a-3e65-4ea4-8485-990f9f40c310.jpeg',
];

// Map images to pizza items (first 8 items in Pizza category)
const pizzaItems = [
  'la-rossa',
  'margherita',
  'burrata',
  'jersey-margherita',
  'panna',
  'bosco',
  'pepperoni',
  'guancia',
];

const imagesDir = path.join(process.cwd(), 'public', 'images');

// Ensure directory exists
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (response) => {
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
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function downloadAllImages() {
  console.log('📥 Starting image download...\n');
  
  for (let i = 0; i < imageUrls.length; i++) {
    const url = imageUrls[i];
    const itemName = pizzaItems[i] || `item-${i + 1}`;
    const filename = `${itemName}.jpg`;
    
    try {
      await downloadImage(url, filename);
    } catch (error) {
      console.error(`❌ Error downloading ${filename}:`, error.message);
    }
  }
  
  console.log('\n🎉 Image download completed!');
  console.log(`📁 Images saved to: ${imagesDir}`);
}

downloadAllImages().catch(console.error);

