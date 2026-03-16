import { User, ArtisanProfile, Category, Product, Order, KPIData } from './types';

export const CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Pottery & Ceramics', slug: 'pottery', icon: '🏺' },
  { id: 'cat-2', name: 'Handloom Textiles', slug: 'textiles', icon: '🧵' },
  { id: 'cat-3', name: 'Woodwork', slug: 'woodwork', icon: '🪵' },
  { id: 'cat-4', name: 'Metal Craft', slug: 'metalcraft', icon: '⚒️' },
  { id: 'cat-5', name: 'Bamboo & Cane', slug: 'bamboo', icon: '🎋' },
  { id: 'cat-6', name: 'Jewelry', slug: 'jewelry', icon: '💍' },
  { id: 'cat-7', name: 'Paintings', slug: 'paintings', icon: '🎨' },
  { id: 'cat-8', name: 'Leather Goods', slug: 'leather', icon: '👜' },
  { id: 'cat-9', name: 'Stone Carving', slug: 'stone', icon: '🗿' },
  { id: 'cat-10', name: 'Embroidery', slug: 'embroidery', icon: '🪡' },
];

const STATES = ['Rajasthan', 'Gujarat', 'Uttar Pradesh', 'West Bengal', 'Tamil Nadu', 'Kerala', 'Odisha', 'Madhya Pradesh', 'Karnataka', 'Assam'];
const VILLAGES = ['Jaipur', 'Kutch', 'Varanasi', 'Shantiniketan', 'Mahabalipuram', 'Thrissur', 'Puri', 'Gwalior', 'Mysore', 'Jorhat'];
const CRAFT_TYPES = ['Potter', 'Weaver', 'Woodcarver', 'Metalsmith', 'Bamboo Artisan', 'Jeweler', 'Painter', 'Leather Worker', 'Stone Carver', 'Embroiderer'];

const PRODUCT_NAMES: Record<string, string[]> = {
  'cat-1': ['Terracotta Vase', 'Blue Pottery Plate', 'Clay Diya Set', 'Ceramic Mug', 'Pottery Bowl'],
  'cat-2': ['Banarasi Silk Scarf', 'Khadi Cotton Stole', 'Ikat Cushion Cover', 'Handloom Saree', 'Woven Table Runner'],
  'cat-3': ['Carved Elephant', 'Wooden Chess Set', 'Sandalwood Box', 'Teak Serving Tray', 'Rosewood Bookend'],
  'cat-4': ['Brass Diya', 'Copper Water Bottle', 'Bell Metal Bowl', 'Iron Candle Stand', 'Bronze Figurine'],
  'cat-5': ['Bamboo Basket', 'Cane Chair', 'Bamboo Lamp', 'Woven Mat', 'Bamboo Wind Chime'],
  'cat-6': ['Silver Jhumka', 'Kundan Necklace', 'Lac Bangle Set', 'Temple Earrings', 'Oxidized Anklet'],
  'cat-7': ['Madhubani Canvas', 'Warli Art Frame', 'Miniature Painting', 'Pattachitra Scroll', 'Kalamkari Print'],
  'cat-8': ['Leather Journal', 'Mojari Shoes', 'Leather Sling Bag', 'Wallet with Block Print', 'Leather Belt'],
  'cat-9': ['Marble Taj Replica', 'Soapstone Box', 'Granite Mortar Set', 'Stone Incense Holder', 'Carved Deity'],
  'cat-10': ['Phulkari Dupatta', 'Chikankari Kurta Fabric', 'Kantha Throw', 'Zardozi Clutch', 'Mirror Work Cushion'],
};

function generateId() {
  return Math.random().toString(36).substring(2, 10);
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDate(daysAgo: number) {
  const d = new Date();
  d.setDate(d.getDate() - randomInt(0, daysAgo));
  return d.toISOString();
}

// Generate Users
export const ADMIN_USER: User = {
  id: 'admin-1',
  name: 'ARTNET Admin',
  email: 'admin@artnet.local',
  role: 'admin',
  created_at: '2024-01-01T00:00:00Z',
};

export const DEMO_BUYER: User = {
  id: 'buyer-1',
  name: 'Priya Sharma',
  email: 'priya@example.com',
  role: 'buyer',
  created_at: '2024-06-01T00:00:00Z',
};

const artisanUsers: User[] = [];
const artisanProfiles: ArtisanProfile[] = [];
const allProducts: Product[] = [];

for (let i = 0; i < 60; i++) {
  const stateIdx = i % 10;
  const craftIdx = i % 10;
  const catId = CATEGORIES[craftIdx].id;
  const userId = `artisan-${i + 1}`;
  const isApproved = i < 45; // 45 approved, 15 pending

  artisanUsers.push({
    id: userId,
    name: `Artisan ${VILLAGES[stateIdx]} ${i + 1}`,
    email: `artisan${i + 1}@artnet.local`,
    role: 'artisan',
    created_at: randomDate(180),
  });

  artisanProfiles.push({
    id: `profile-${i + 1}`,
    user_id: userId,
    craft_type: CRAFT_TYPES[craftIdx],
    village: VILLAGES[stateIdx],
    district: VILLAGES[stateIdx],
    state: STATES[stateIdx],
    bio: `Traditional ${CRAFT_TYPES[craftIdx].toLowerCase()} from ${VILLAGES[stateIdx]}, ${STATES[stateIdx]}. Carrying forward a family tradition of over ${randomInt(2, 8)} generations.`,
    approval_status: isApproved ? 'approved' : 'pending',
    approved_at: isApproved ? randomDate(90) : undefined,
    approved_by: isApproved ? 'admin-1' : undefined,
    created_at: randomDate(180),
    updated_at: randomDate(30),
  });

  // Generate products for approved artisans
  if (isApproved) {
    const productNames = PRODUCT_NAMES[catId] || PRODUCT_NAMES['cat-1'];
    const numProducts = Math.min(randomInt(5, 10), productNames.length + 5);
    for (let j = 0; j < numProducts; j++) {
      const pName = j < productNames.length
        ? productNames[j]
        : `${productNames[j % productNames.length]} #${j + 1}`;
      const isProductApproved = j < numProducts - 1; // last product pending
      allProducts.push({
        id: `prod-${i}-${j}`,
        artisan_id: userId,
        artisan_name: `Artisan ${VILLAGES[stateIdx]} ${i + 1}`,
        category_id: catId,
        category_name: CATEGORIES[craftIdx].name,
        name: pName,
        description: `Handcrafted ${pName.toLowerCase()} made with traditional techniques passed down through generations.`,
        story: `This ${pName.toLowerCase()} is crafted in the village of ${VILLAGES[stateIdx]}, using methods that have been practiced for centuries.`,
        material: ['Clay', 'Silk', 'Teak Wood', 'Brass', 'Bamboo', 'Silver', 'Natural Dyes', 'Leather', 'Marble', 'Cotton'][craftIdx],
        time_to_make: `${randomInt(2, 30)} days`,
        price: randomInt(150, 15000),
        stock: randomInt(1, 50),
        images: [`https://picsum.photos/seed/${i}-${j}/600/600`],
        approval_status: isProductApproved ? 'approved' : 'pending',
        is_active: isProductApproved,
        created_at: randomDate(90),
        updated_at: randomDate(14),
      });
    }
  }
}

// Generate sample orders
const sampleOrders: Order[] = [];
for (let i = 0; i < 30; i++) {
  const approvedProducts = allProducts.filter(p => p.approval_status === 'approved');
  const numItems = randomInt(1, 4);
  const items = [];
  let total = 0;
  for (let j = 0; j < numItems; j++) {
    const prod = approvedProducts[randomInt(0, approvedProducts.length - 1)];
    const qty = randomInt(1, 3);
    const price = prod.price;
    total += price * qty;
    items.push({
      id: `oi-${i}-${j}`,
      order_id: `order-${i + 1}`,
      product_id: prod.id,
      product_name: prod.name,
      artisan_id: prod.artisan_id,
      quantity: qty,
      price,
      fulfillment_status: (['pending', 'processing', 'shipped', 'delivered'] as const)[randomInt(0, 3)],
    });
  }
  sampleOrders.push({
    id: `order-${i + 1}`,
    buyer_id: 'buyer-1',
    buyer_name: 'Priya Sharma',
    items,
    total,
    status: (['placed', 'confirmed', 'shipped', 'delivered'] as const)[randomInt(0, 3)],
    payment_method: randomInt(0, 1) ? 'COD' : 'Test Payment',
    shipping_address: `${randomInt(1, 500)} MG Road, ${VILLAGES[randomInt(0, 9)]}, ${STATES[randomInt(0, 9)]}`,
    created_at: randomDate(60),
    updated_at: randomDate(7),
  });
}

export const ARTISAN_USERS = artisanUsers;
export const ARTISAN_PROFILES = artisanProfiles;
export const ALL_PRODUCTS = allProducts;
export const SAMPLE_ORDERS = sampleOrders;

export const MOCK_KPI: KPIData = {
  active_artisans_7d: 32,
  active_artisans_30d: 48,
  approved_products: allProducts.filter(p => p.approval_status === 'approved').length,
  total_orders: sampleOrders.length,
  gmv: sampleOrders.reduce((sum, o) => sum + o.total, 0),
  aov: Math.round(sampleOrders.reduce((sum, o) => sum + o.total, 0) / sampleOrders.length),
  pending_approvals: ARTISAN_PROFILES.filter(p => p.approval_status === 'pending').length + allProducts.filter(p => p.approval_status === 'pending').length,
  conversion_funnel: {
    view_product: 4200,
    add_to_cart: 890,
    checkout_start: 310,
    order_placed: 180,
  },
};
