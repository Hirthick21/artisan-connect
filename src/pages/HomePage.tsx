import { Link } from 'react-router-dom';
import { ArrowRight, Search, ShieldCheck, Truck, Heart, Star, Package, Users, MapPin, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CATEGORIES, ALL_PRODUCTS, ARTISAN_PROFILES, SAMPLE_ORDERS } from '@/data/mockData';
import ProductCard from '@/components/ProductCard';
import HeroCarousel from '@/components/HeroCarousel';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TESTIMONIALS = [
  {
    name: 'Meera Sharma',
    location: 'Mumbai',
    text: 'The handwoven silk saree I received was absolutely stunning. You can feel the artisan\'s dedication in every thread. Will definitely order again!',
    rating: 5,
    product: 'Banarasi Silk Saree',
  },
  {
    name: 'Rajesh Kumar',
    location: 'Delhi',
    text: 'Bought a set of blue pottery for my new home. The quality exceeded my expectations — each piece is unique and beautifully crafted.',
    rating: 5,
    product: 'Jaipur Blue Pottery Set',
  },
  {
    name: 'Anita Desai',
    location: 'Bangalore',
    text: 'Supporting local artisans while getting gorgeous home decor? Win-win! The brass lamp I ordered is now the centerpiece of my living room.',
    rating: 4,
    product: 'Brass Diya Lamp',
  },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Artisans List Products',
    description: 'Village artisans photograph and describe their handcrafted items with our easy-to-use listing wizard.',
    icon: Package,
  },
  {
    step: '02',
    title: 'Quality Verified',
    description: 'Our team reviews every artisan profile and product to ensure authenticity and quality standards.',
    icon: ShieldCheck,
  },
  {
    step: '03',
    title: 'You Discover & Buy',
    description: 'Browse by craft type, region, or artisan story. Add to cart and checkout with COD or online payment.',
    icon: Search,
  },
  {
    step: '04',
    title: 'Direct to Your Door',
    description: 'Products ship directly from the artisan\'s workshop to your doorstep. Fair prices, no middlemen.',
    icon: Truck,
  },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const approvedProducts = ALL_PRODUCTS.filter(p => p.approval_status === 'approved' && p.is_active);
  const featured = approvedProducts.slice(0, 8);
  const newArrivals = approvedProducts.slice(8, 12);
  const approvedArtisans = ARTISAN_PROFILES.filter(a => a.approval_status === 'approved');

  const totalArtisans = approvedArtisans.length;
  const totalProducts = approvedProducts.length;
  const totalOrders = SAMPLE_ORDERS.length;
  const uniqueStates = new Set(approvedArtisans.map(a => a.state)).size;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) navigate(`/browse?q=${encodeURIComponent(search.trim())}`);
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Search bar overlay */}
      <section className="relative -mt-8 sm:-mt-10 z-20 px-4">
        <div className="container max-w-xl mx-auto">
          <form
            onSubmit={handleSearch}
            className="flex gap-2 bg-card border border-border rounded-xl shadow-lg p-2 sm:p-3"
          >
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search pottery, textiles, jewelry..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9 h-10 sm:h-11 font-body text-sm border-0 bg-transparent focus-visible:ring-0"
              />
            </div>
            <Button type="submit" size="default" className="font-body h-10 sm:h-11 shrink-0 text-sm px-5">
              Search
            </Button>
          </form>
        </div>
      </section>

      {/* Trust badges */}
      <section className="container py-6 sm:py-8 px-4">
        <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-2xl mx-auto">
          {[
            { icon: ShieldCheck, label: 'Verified Artisans', desc: 'Every seller approved' },
            { icon: Truck, label: 'Direct Shipping', desc: 'Workshop to doorstep' },
            { icon: Heart, label: 'Support Villages', desc: 'Empower communities' },
          ].map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex flex-col items-center text-center gap-1.5">
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <span className="text-xs sm:text-sm font-body font-semibold text-foreground leading-tight">{label}</span>
              <span className="text-[10px] sm:text-xs font-body text-muted-foreground hidden sm:block">{desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container py-6 sm:py-10 px-4">
        <h2 className="text-xl sm:text-2xl font-display font-bold text-foreground">Shop by Craft</h2>
        <div className="mt-4 sm:mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3">
          {CATEGORIES.map(cat => (
            <Link
              key={cat.id}
              to={`/browse?category=${cat.slug}`}
              className="flex flex-col items-center gap-1.5 sm:gap-2 p-3 sm:p-4 rounded-lg border border-border bg-card hover:border-primary/30 hover:bg-primary/5 transition-colors group"
            >
              <span className="text-2xl sm:text-3xl group-hover:scale-110 transition-transform">{cat.icon}</span>
              <span className="text-xs sm:text-sm font-body font-medium text-center text-card-foreground leading-tight">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container pb-8 sm:pb-12 px-4">
        <div className="flex items-center justify-between mb-4 sm:mb-6 gap-2">
          <h2 className="text-xl sm:text-2xl font-display font-bold text-foreground">Featured Products</h2>
          <Link to="/browse" className="text-xs sm:text-sm font-body font-medium text-primary hover:underline flex items-center gap-1 shrink-0 whitespace-nowrap">
            View All <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          {featured.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-secondary/30 py-10 sm:py-16 px-4">
        <div className="container">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-foreground">How ARTNET Works</h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground font-body max-w-md mx-auto">
              From artisan's hands to your home — a simple, transparent journey.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {HOW_IT_WORKS.map(({ step, title, description, icon: Icon }) => (
              <div key={step} className="text-center">
                <div className="mx-auto h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <span className="text-[10px] sm:text-xs font-body font-bold text-primary uppercase tracking-wider">Step {step}</span>
                <h3 className="text-sm sm:text-base font-display font-bold text-foreground mt-1 leading-tight">{title}</h3>
                <p className="text-[11px] sm:text-xs text-muted-foreground font-body mt-1.5 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="container py-10 sm:py-14 px-4">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-foreground">Our Impact</h2>
          <p className="mt-2 text-sm text-muted-foreground font-body">Every purchase makes a difference</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto">
          {[
            { value: `${totalArtisans}+`, label: 'Verified Artisans', icon: Users },
            { value: `${totalProducts}+`, label: 'Handmade Products', icon: Package },
            { value: `${uniqueStates}+`, label: 'Indian States', icon: MapPin },
            { value: `${totalOrders}+`, label: 'Orders Delivered', icon: Truck },
          ].map(({ value, label, icon: Icon }) => (
            <div key={label} className="bg-card border border-border rounded-xl p-4 sm:p-6 text-center">
              <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary mx-auto mb-2" />
              <p className="text-2xl sm:text-3xl font-display font-bold text-foreground">{value}</p>
              <p className="text-[11px] sm:text-xs text-muted-foreground font-body mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="container pb-10 sm:pb-14 px-4">
          <div className="flex items-center justify-between mb-4 sm:mb-6 gap-2">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-foreground">New Arrivals</h2>
            <Link to="/browse" className="text-xs sm:text-sm font-body font-medium text-primary hover:underline flex items-center gap-1 shrink-0">
              See More <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {newArrivals.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {/* Artisan Spotlight */}
      <section className="bg-secondary/30 py-10 sm:py-14 px-4">
        <div className="container">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-foreground">Meet Our Artisans</h2>
            <p className="mt-2 text-sm text-muted-foreground font-body max-w-md mx-auto">
              Real people preserving centuries-old craft traditions across India.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {approvedArtisans.slice(0, 4).map(artisan => (
              <Link
                to={`/browse?q=${encodeURIComponent(artisan.craft_type)}`}
                key={artisan.id}
                className="bg-card border border-border rounded-xl p-4 text-center hover:border-primary/30 hover:shadow-md transition-all group"
              >
                <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 text-xl sm:text-2xl group-hover:scale-105 transition-transform">
                  {artisan.craft_type === 'Pottery' ? '🏺' :
                   artisan.craft_type === 'Handloom' ? '🧶' :
                   artisan.craft_type === 'Woodwork' ? '🪵' :
                   artisan.craft_type === 'Jewelry' ? '💎' :
                   artisan.craft_type === 'Metalwork' ? '⚒️' :
                   artisan.craft_type === 'Painting' ? '🎨' :
                   artisan.craft_type === 'Leatherwork' ? '👜' :
                   artisan.craft_type === 'Embroidery' ? '🪡' :
                   artisan.craft_type === 'Bamboo' ? '🎋' : '🧵'}
                </div>
                <h3 className="text-sm font-display font-bold text-card-foreground truncate">{artisan.business_name}</h3>
                <p className="text-[11px] sm:text-xs text-muted-foreground font-body mt-0.5">{artisan.craft_type}</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground font-body mt-0.5">{artisan.village}, {artisan.state}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Button variant="outline" onClick={() => navigate('/browse')} className="font-body text-sm">
              Discover All Artisans <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container py-10 sm:py-14 px-4">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-foreground">What Buyers Say</h2>
          <p className="mt-2 text-sm text-muted-foreground font-body">Real reviews from our community</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-4 sm:p-5">
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${s < t.rating ? 'text-primary fill-primary' : 'text-muted-foreground/30'}`} />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground font-body leading-relaxed italic">"{t.text}"</p>
              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-xs sm:text-sm font-body font-semibold text-foreground">{t.name}</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground font-body">{t.location} • {t.product}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-primary text-primary-foreground">
        <div className="container py-10 sm:py-14 px-4 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold">Are You an Artisan?</h2>
          <p className="mt-2 text-sm sm:text-base font-body opacity-90 max-w-md mx-auto">
            Join {totalArtisans}+ verified artisans selling their crafts to buyers across India. Zero listing fees.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
            <Button
              variant="secondary"
              size="lg"
              className="font-body"
              onClick={() => navigate('/login')}
            >
              Start Selling Today
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="font-body border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => navigate('/browse')}
            >
              Browse as Buyer
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter / Final CTA */}
      <section className="container py-10 sm:py-14 px-4">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-lg sm:text-xl font-display font-bold text-foreground">Stay Connected</h2>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground font-body">
            Get updates on new artisan collections, stories from the villages, and exclusive offers.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const input = (e.target as HTMLFormElement).elements.namedItem('email') as HTMLInputElement;
              if (input?.value) {
                input.value = '';
                import('sonner').then(({ toast }) => toast.success('Thank you for subscribing!'));
              }
            }}
            className="mt-4 flex gap-2 max-w-sm mx-auto"
          >
            <Input
              type="email"
              name="email"
              placeholder="your@email.com"
              required
              className="font-body text-sm flex-1 min-w-0"
            />
            <Button type="submit" className="font-body text-sm shrink-0">Subscribe</Button>
          </form>
        </div>
      </section>
    </div>
  );
}
