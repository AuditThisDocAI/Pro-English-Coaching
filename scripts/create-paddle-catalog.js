/**
 * Paddle Catalog Creation Script
 * 
 * This script creates your product, prices, 7-day trials, and regional overrides 
 * in your live Paddle account.
 * 
 * To run this script:
 * 1. Add your Paddle API key to the .env file: PADDLE_API_KEY=your_live_api_key
 * 2. Run the script: node scripts/create-paddle-catalog.js
 */

import 'dotenv/config';

const PADDLE_API_KEY = process.env.PADDLE_API_KEY;
const API_URL = 'https://api.paddle.com';

if (!PADDLE_API_KEY) {
  console.error('❌ Error: PADDLE_API_KEY is missing from your .env file.');
  console.error('Please add your live Paddle API key to proceed.');
  process.exit(1);
}

const headers = {
  'Authorization': `Bearer ${PADDLE_API_KEY}`,
  'Content-Type': 'application/json'
};

// Pricing amounts in the lowest denomination (strings)
const PRICES = {
  monthly: {
    USD: "2500", // $25.00
    GBP: "2000", // £20.00
    EUR: "2400", // €24.00
    AUD: "3500", // A$35.00
  },
  annual: {
    USD: "20000", // $200.00
    GBP: "16000", // £160.00
    EUR: "19000", // €190.00
    AUD: "28000", // A$280.00
  }
};

async function createPaddleCatalog() {
  console.log('🚀 Starting Paddle Catalog Creation...\n');

  try {
    // 1. Create the Product
    console.log('📦 Creating Product: ProEnglish Unlimited...');
    const productRes = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        name: 'ProEnglish Unlimited',
        description: 'Unlimited AI coaching sessions, native voice dictation, and all industry specializations.',
        tax_category: 'digital-goods',
      })
    });

    const productData = await productRes.json();
    if (!productRes.ok) throw new Error(`Product Creation Failed: ${JSON.stringify(productData)}`);
    
    const productId = productData.data.id;
    console.log(`✅ Product created successfully! ID: ${productId}\n`);

    // 2. Create the Monthly Price with Trial and Overrides
    console.log('💰 Creating Monthly Plan ($25/mo) with 7-day trial...');
    const monthlyRes = await fetch(`${API_URL}/prices`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        description: 'Monthly Plan',
        product_id: productId,
        unit_price: {
          amount: PRICES.monthly.USD,
          currency_code: 'USD'
        },
        billing_cycle: {
          interval: 'month',
          frequency: 1
        },
        trial_period: {
          interval: 'day',
          frequency: 7
        },
        unit_price_overrides: [
          { country_codes: ['GB'], unit_price: { amount: PRICES.monthly.GBP, currency_code: 'GBP' } },
          { country_codes: ['IE'], unit_price: { amount: PRICES.monthly.EUR, currency_code: 'EUR' } },
          { country_codes: ['AU'], unit_price: { amount: PRICES.monthly.AUD, currency_code: 'AUD' } },
        ]
      })
    });

    const monthlyData = await monthlyRes.json();
    if (!monthlyRes.ok) throw new Error(`Monthly Price Creation Failed: ${JSON.stringify(monthlyData)}`);
    const monthlyPriceId = monthlyData.data.id;
    console.log(`✅ Monthly price created successfully! ID: ${monthlyPriceId}`);

    // 3. Create the Annual Price with Trial and Overrides
    console.log('💰 Creating Annual Plan ($200/yr) with 7-day trial...');
    const annualRes = await fetch(`${API_URL}/prices`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        description: 'Annual Plan',
        product_id: productId,
        unit_price: {
          amount: PRICES.annual.USD,
          currency_code: 'USD'
        },
        billing_cycle: {
          interval: 'year',
          frequency: 1
        },
        trial_period: {
          interval: 'day',
          frequency: 7
        },
        unit_price_overrides: [
          { country_codes: ['GB'], unit_price: { amount: PRICES.annual.GBP, currency_code: 'GBP' } },
          { country_codes: ['IE'], unit_price: { amount: PRICES.annual.EUR, currency_code: 'EUR' } },
          { country_codes: ['AU'], unit_price: { amount: PRICES.annual.AUD, currency_code: 'AUD' } },
        ]
      })
    });

    const annualData = await annualRes.json();
    if (!annualRes.ok) throw new Error(`Annual Price Creation Failed: ${JSON.stringify(annualData)}`);
    const annualPriceId = annualData.data.id;
    console.log(`✅ Annual price created successfully! ID: ${annualPriceId}\n`);

    // 4. Output Summary
    console.log('🎉 Catalog Creation Complete! Please save these IDs for your application:\n');
    console.log('=========================================');
    console.log(`Product ID:    ${productId}`);
    console.log(`Monthly Price: ${monthlyPriceId}`);
    console.log(`Annual Price:  ${annualPriceId}`);
    console.log('=========================================');

  } catch (err) {
    console.error('\n❌ An error occurred during catalog creation:');
    console.error(err.message);
  }
}

createPaddleCatalog();
