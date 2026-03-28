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
  'cat-1': ['Terracotta Vase', 'Blue Pottery Plate', 'Clay Diya Set', 'Ceramic Mug', 'Pottery Bowl', 'Handmade Ceramic Plate', 'Rustic Clay Bowl', 'Decorated Pottery Jar'],
  'cat-2': ['Banarasi Silk Scarf', 'Khadi Cotton Stole', 'Ikat Cushion Cover', 'Handloom Saree', 'Woven Table Runner', 'Hand-dyed Fabric', 'Jute Weave Rug', 'Silk Pashmina Shawl'],
  'cat-3': ['Carved Elephant', 'Wooden Chess Set', 'Sandalwood Box', 'Teak Serving Tray', 'Rosewood Bookend', 'Hand-carved Mirror Frame', 'Wooden Jewelry Box', 'Decorative Wooden Bowl'],
  'cat-4': ['Brass Diya', 'Copper Water Bottle', 'Bell Metal Bowl', 'Iron Candle Stand', 'Bronze Figurine', 'Hammered Copper Plate', 'Brass Incense Holder', 'Metal Water Jug'],
  'cat-5': ['Bamboo Basket', 'Cane Chair', 'Bamboo Lamp', 'Woven Mat', 'Bamboo Wind Chime', 'Decorative Bamboo Screen', 'Cane Storage Box', 'Bamboo Plant Stand'],
  'cat-6': ['Silver Jhumka', 'Kundan Necklace', 'Lac Bangle Set', 'Temple Earrings', 'Oxidized Anklet', 'Pearl Pendant', 'Statement Ring', 'Gemstone Bracelet'],
  'cat-7': ['Madhubani Canvas', 'Warli Art Frame', 'Miniature Painting', 'Pattachitra Scroll', 'Kalamkari Print', 'Acrylic Abstract Art', 'Watercolor Landscape', 'Folk Art Mural'],
  'cat-8': ['Leather Journal', 'Mojari Shoes', 'Leather Sling Bag', 'Wallet with Block Print', 'Leather Belt', 'Embossed Leather Pouch', 'Handstitched Saddle Bag', 'Vintage Leather Satchel'],
  'cat-9': ['Marble Taj Replica', 'Soapstone Box', 'Granite Mortar Set', 'Stone Incense Holder', 'Carved Deity', 'Stone Wall Hanging', 'Sculptured Stone Planter', 'Engraved Stone Coaster Set'],
  'cat-10': ['Phulkari Dupatta', 'Chikankari Kurta Fabric', 'Kantha Throw', 'Zardozi Clutch', 'Mirror Work Cushion', 'Embroidered Wall Hanging', 'Beaded Cushion Cover', 'Hand-embroidered Saree'],
};

// Real image URLs for each category from Unsplash
const CATEGORY_IMAGES: Record<string, string[]> = {
  'cat-1': [
    'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1578420217221-20a50b0e3684?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1578924519327-21f13feac3c3?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1578924519382-a4c944fa7d8f?w=600&h=600&fit=crop',
  ],
  'cat-2': [
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1523821741446-edb429493601?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1546005881-b72b27e84530?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1598084993000-6b96de3dd969?w=600&h=600&fit=crop',
  ],
  'cat-3': [
    'https://images.unsplash.com/photo-1611275426394-18b526f13dcd?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1578924519327-21f13feac3c3?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1601114921884-f4c54caf2e1a?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1578601738722-e2b58c39e16f?w=600&h=600&fit=crop',
  ],
  'cat-4': [
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1578924519327-21f13feac3c3?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1611081857486-e89f3ee4abf7?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1578924519327-21f13feac3c3?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1599643478104-b129e5ea2e94?w=600&h=600&fit=crop',
  ],
  'cat-5': [
    'https://images.unsplash.com/photo-1578924519327-21f13feac3c3?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1567538626872-8500b5e20ea4?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1596909124669-c622ee4a9a9f?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1578924519327-21f13feac3c3?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=600&h=600&fit=crop',
  ],
  'cat-6': [
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1581974267369-3c91f3038989?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1565721976498-e9ddb7069eb8?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop',
  ],
  'cat-7': [
    'https://images.unsplash.com/photo-1578926314433-e2789279f4aa?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1578982981159-cb29ebf0b0c3?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1577720643272-265f434879a6?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1567353021948-b91a9f9f0a1b?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1578926314433-e2789279f4aa?w=600&h=600&fit=crop',
  ],
  'cat-8': [
    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1548698314-d92bcc672f68?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1576956031262-e8cff670f3db?w=600&h=600&fit=crop',
  ],
  'cat-9': [
    'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1578924519327-21f13feac3c3?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1578924519327-21f13feac3c3?w=600&h=600&fit=crop',
  ],
  'cat-10': [
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1593642632632-2c5a58f75e45?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1546005881-b72b27e84530?w=600&h=600&fit=crop',
  ],
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

// Create 10 artisans (one per category)
for (let i = 0; i < 10; i++) {
  const stateIdx = i;
  const craftIdx = i;
  const userId = `artisan-${i + 1}`;

  artisanUsers.push({
    id: userId,
    name: `${CRAFT_TYPES[craftIdx]} from ${VILLAGES[stateIdx]}`,
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
    bio: `Master ${CRAFT_TYPES[craftIdx].toLowerCase()} from ${VILLAGES[stateIdx]}, ${STATES[stateIdx]}. Carrying forward a family tradition of over ${randomInt(3, 10)} generations with authentic craftsmanship.`,
    approval_status: 'approved',
    approved_at: randomDate(90),
    approved_by: 'admin-1',
    created_at: randomDate(180),
    updated_at: randomDate(30),
  });
}

// Create exactly 50 products - 5 per category
for (let catIdx = 0; catIdx < 10; catIdx++) {
  const catId = CATEGORIES[catIdx].id;
  const productNames = PRODUCT_NAMES[catId] || PRODUCT_NAMES['cat-1'];
  const categoryImages = CATEGORY_IMAGES[catId] || CATEGORY_IMAGES['cat-1'];
  const artisanIdx = catIdx;
  const userId = `artisan-${artisanIdx + 1}`;

  // Create 5 products per category
  for (let j = 0; j < 5; j++) {
    const pName = productNames[j] || `${productNames[j % productNames.length]} ${j + 1}`;
    const imageUrl = categoryImages[j % categoryImages.length];

    allProducts.push({
      id: `prod-${catIdx}-${j}`,
      artisan_id: userId,
      artisan_name: `${CRAFT_TYPES[artisanIdx]} from ${VILLAGES[artisanIdx]}`,
      category_id: catId,
      category_name: CATEGORIES[catIdx].name,
      name: pName,
      description: `Authentic handcrafted ${pName.toLowerCase()} created using traditional techniques and premium materials. Each piece is unique and made with care.`,
      story: `This ${pName.toLowerCase()} is skillfully crafted in ${VILLAGES[artisanIdx]}, ${STATES[artisanIdx]} using methods passed down through generations of artisans.`,
      material: ['Clay', 'Silk', 'Teak Wood', 'Brass', 'Bamboo', 'Silver', 'Natural Dyes', 'Leather', 'Marble', 'Cotton'][artisanIdx],
      time_to_make: `${randomInt(3, 25)} days`,
      price: randomInt(299, 12999),
      stock: randomInt(5, 40),
      images: [imageUrl],
      approval_status: 'approved',
      is_active: true,
      created_at: randomDate(90),
      updated_at: randomDate(14),
    });
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
