import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

async function scrapeProducts() {
  try {
    console.log('Starting product scrape from cabana-miami.com...');
    
    // Fetch the all products page
    const response = await fetch('https://www.cabana-miami.com/all-products', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const products = [];

    // Find and parse each product
    $('.product-item').each((i, element) => {
      const product = {
        id: $(element).attr('data-product-id') || `product-${i + 1}`,
        name: $(element).find('.product-title').text().trim(),
        price: parseFloat($(element).find('.product-price').text().replace(/[^0-9.]/g, '')),
        description: $(element).find('.product-description').text().trim(),
        images: [],
        categories: []
      };

      // Get product images
      $(element).find('.product-image img').each((i, img) => {
        const imgUrl = $(img).attr('src');
        if (imgUrl) {
          product.images.push(imgUrl);
        }
      });

      // Get product categories
      $(element).find('.product-category').each((i, cat) => {
        const category = $(cat).text().trim();
        if (category) {
          product.categories.push(category);
        }
      });

      products.push(product);
    });

    console.log(`Found ${products.length} products`);

    // Save products to a file
    const fs = require('fs');
    fs.writeFileSync('products.json', JSON.stringify(products, null, 2));
    console.log('Products saved to products.json');

    // Print sample of first product
    if (products.length > 0) {
      console.log('\nSample product:');
      console.log(products[0]);
    }

    return products;
  } catch (error) {
    console.error('Error scraping products:', error);
    throw error;
  }
}

// Run the scraper
scrapeProducts().catch(console.error);

