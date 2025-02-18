import fetch from 'node-fetch';
import { parse } from 'csv-parse/sync';
import fs from 'fs/promises';

async function processCSV() {
  try {
    // Fetch the CSV file
    const response = await fetch('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/products-vnbXswe5B4VgKjK7DixTGtgb0Tpg5c.csv');
    const csvText = await response.text();
    
    // Parse CSV
    const records = parse(csvText, {
      columns: true,
      skip_empty_lines: true
    });

    // Transform records into our product format
    const products = records.map((record, index) => ({
      id: `product-${index + 1}`,
      name: record.name || `Product ${index + 1}`,
      description: record.description || 'Luxury furniture piece perfect for your home',
      price: parseFloat(record.price) || 0,
      salePrice: record.sale_price ? parseFloat(record.sale_price) : null,
      images: ["/placeholder.svg"],
      categories: record.category ? [record.category] : ['Uncategorized'],
      stockQuantity: parseInt(record.stock) || 10,
      materials: record.materials || 'Premium Materials',
      dimensions: record.dimensions || 'Dimensions available upon request'
    }));

    console.log(`Processed ${products.length} products`);
    console.log('Sample product:', products[0]);

    // Save as JSON
    await fs.writeFile('processed-products.json', JSON.stringify(products, null, 2));
    console.log('Saved products to processed-products.json');

    return products;
  } catch (error) {
    console.error('Error processing CSV:', error);
    throw error;
  }
}

processCSV().catch(console.error);

