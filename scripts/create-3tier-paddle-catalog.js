/**
 * Paddle 3-Tier Catalog Creation Script
 * 
 * This script creates your products, prices, 7-day trials, and regional overrides 
 * in your live Paddle account for the Starter, Pro, and Advanced tiers.
 * 
 * To run this script:
 * 1. Add your Paddle API key to the .env file: PADDLE_API_KEY=your_live_api_key
 * 2. Run the script: node scripts/create-3tier-paddle-catalog.js
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

const TIERS = [
  {
    name: 'Starter',
    description: 'Basic AI coaching and 5 daily sessions.',
    prices: {
      monthly: { USD: "1500", GBP: "1200", EUR: "1400", AUD: "2000" },
      annual: { USD: "12000", GBP: "9600", EUR: "11200", AUD: "16000" }
    }
  },
  {
    name: 'Pro',
    description: 'Unlimited AI coaching sessions, native voice dictation, and all industry specializations.',
    prices: {
      monthly: { USD: "2500", GBP: "2000", EUR: "2400", AUD: "3500" },
      annual: { USD: "20000", GBP: "16000", EUR: "19000", AUD: "28000" }
    }
  },
  {
    name: 'Advanced',
    description: 'Everything in Pro, plus prioritized support and advanced grammar analytics.',
    prices: {
      monthly: { USD: "5000", GBP: "4000", EUR: "4800", AUD: "7000" },
      annual: { USD: "40000", GBP: "32000", EUR: "38000", AUD: "56000" }
    }
  }
];

async function createPrice(productId, billingInterval, priceMap) {
  const res = await fetch(`${API_URL}/prices`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      description: `${billingInterval === 'month' ? 'Monthly' : 'Annual'} Plan`,
      product_id: productId,
      unit_price: {
        amount: priceMap.USD,
        currency_code: 'USD'
      },
      billing_cycle: {
        interval: billingInterval,
        frequency: 1
      },
      trial_period: {
        interval: 'day',
        frequency: 7
      },
      unit_price_overrides: [
        { country_codes: ['GB'], unit_price: { amount: priceMap.GBP, currency_code: 'GBP' } },
        { country_codes: ['IE'], unit_price: { amount: priceMap.EUR, currency_code: 'EUR' } },
        { country_codes: ['AU'], unit_price: { amount: priceMap.AUD, currency_code: 'AUD' } },
      ]
    })
  });

  const data = await res.json();
  if (!res.ok) throw new Error(`Price Creation Failed: ${JSON.stringify(data)}`);
  return data.data.id;
}

async function createPaddleCatalog() {
  console.log('🚀 Starting 3-Tier Paddle Catalog Creation...\n');

  try {
    for (const tier of TIERS) {
      console.log(`📦 Creating Product: ${tier.name}...`);
      const productRes = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          name: tier.name,
          description: tier.description,
          tax_category: 'digital-goods',
        })
      });

      const productData = await productRes.json();
      if (!productRes.ok) throw new Error(`Product Creation Failed: ${JSON.stringify(productData)}`);
      
      const productId = productData.data.id;
      console.log(`✅ Product created! ID: ${productId}`);

      console.log(`💰 Creating Monthly Price...`);
      const monthlyPriceId = await createPrice(productId, 'month', tier.prices.monthly);
      console.log(`   -> Monthly Price ID: ${monthlyPriceId}`);

      console.log(`💰 Creating Annual Price...`);
      const annualPriceId = await createPrice(productId, 'year', tier.prices.annual);
      console.log(`   -> Annual Price ID: ${annualPriceId}\n`);
    }

    console.log('🎉 3-Tier Catalog Creation Complete! Please save these IDs for your application.');

  } catch (err) {
    console.error('\n❌ An error occurred during catalog creation:');
    console.error(err.message);
  }
}

createPaddleCatalog();
