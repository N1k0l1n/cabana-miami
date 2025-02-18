import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import { setTimeout } from 'timers/promises';
import { writeFile } from 'fs/promises';
import path from 'path';

// Configuration
const CONFIG = {
  baseUrl: 'https://www.cabana-miami.com',
  productsPath: '/all-products',
  delayBetweenRequests: 2000, // 2 seconds
  maxRetries: 3,
  outputPath: path.join(process.cwd(), 'public', 'data', 'products.json'),
  userAgent: 'Mozilla/5.0 (compatible; CabanaMiami/1.0; +https://www.cabana-miami.com)'
};

async function fetchWithRetry(url, options, retries = CONFIG.maxRetries) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'User-Agent': CONFIG.userAgent,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying... ${retries} attempts remaining`);
      await setTimeout(CONFIG.delayBetweenRequests);
      return fetchWithRetry(url, options, retries - 1);
    }
    throw error;
  }
}

async function scrapeProductDetails(url) {
  const response = await fetchWithRetry(url);
  const html = await response.text();
  const $ = cheerio.load(html);

  // Extract detailed product information
  // Adjust selectors based on actual HTML structure
  return {
    description: $('.product-description').text().trim(),
    specifications: $('.product-specifications').text().trim(),
    materials: $('.product-materials').text().trim(),
    dimensions: $('.product-dimensions').text().trim(),
  };
}

async function scrapeProducts() {
  try {
    console.log('Starting enhanced product scrape from cabana-miami.com...');
    
    const mainResponse = await fetchWithRetry(`${CONFIG.baseUrl}${CONFIG.productsPath}`);
    const html = await mainResponse.text();
    const $ = cheerio.load(html);
    const products = [];
    let processedCount = 0;

    // Sample products (since we can't actually scrape the website)
    // In reality, you would parse the actual HTML structure
    const sampleProducts = [
      {
        id: "1",
        name: "Coastal Breeze Armchair",
        description: "Handcrafted rattan armchair with plush cushions",
        price: 1299.00,
        salePrice: null,
        images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pini1._Natural_rattan_and_rattan_lampshades_on_the_ceiling_are__4ff710d1-0b6f-48de-a9f6-ed26b71ce46b-Q7FoV0woSgS4fqHxZcwr32CAzJRECr.png"],
        categories: ["Seating", "Living Room"],
        stockQuantity: 10,
        materials: "Natural Rattan, Premium Fabric",
        dimensions: "32\"W x 34\"D x 35\"H"
      },
      {
        id: "2",
        name: "Palm Beach Dining Table",
        description: "Elegant dining table with tempered glass top",
        price: 2499.00,
        salePrice: 1999.00,
        images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pini1._set_of_sofas_2_pieces_of_a_single_sofa_one_unit_2_seats__8688774c-15d2-4dee-9631-8c398a7890d6-40D4cChFGaVI10UduVNjXVKwcKxKno.png"],
        categories: ["Dining", "Tables"],
        stockQuantity: 5,
        materials: "Teak Wood, Tempered Glass",
        dimensions: "72\"W x 42\"D x 30\"H"
      },
      {
        id: "3",
        name: "Oceanview Sofa",
        description: "Luxurious three-seater with weather-resistant fabric",
        price: 3299.00,
        salePrice: null,
        images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pini1._A_teak_root_table_in_a_luxury_yacht_at_sea_many_details__f1d1f328-030a-4255-bd14-da1c5d94e1b9-jzAtOV9pGVoyzEHihhZy3ObPFCJf63.png"],
        categories: ["Seating", "Living Room"],
        stockQuantity: 8,
        materials: "Sustainable Teak, Performance Fabric",
        dimensions: "84\"W x 36\"D x 34\"H"
      }
    ];

    products.push(...sampleProducts);

    // Create the data directory if it doesn't exist
    await mkdir(path.dirname(CONFIG.outputPath), { recursive: true });

    // Save products to JSON file
    await writeFile(CONFIG.outputPath, JSON.stringify(products, null, 2));
    console.log(`Successfully saved ${products.length} products to ${CONFIG.outputPath}`);

    return products;
  } catch (error) {
    console.error('Error during product scraping:', error);
    throw error;
  }
}

// Helper function to create directory
async function mkdir(path, options) {
  const fs = await import('fs/promises');
  await fs.mkdir(path, options);
}

// Run the scraper
scrapeProducts().catch(console.error);

