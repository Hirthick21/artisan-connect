import { Link } from 'react-router-dom';
import { ArrowRight, Search, ShieldCheck, Truck, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CATEGORIES, ALL_PRODUCTS } from '@/data/mockData';
import ProductCard from '@/components/ProductCard';
import HeroCarousel from '@/components/HeroCarousel';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const featured = ALL_PRODUCTS
    .filter(p => p.approval_status === 'approved' && p.is_active)
    .slice(0, 8);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) navigate(`/browse?q=${encodeURIComponent(search.trim())}`);
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Search bar overlay section */}
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
            { icon: Truck, label: 'Direct Shipping', desc: 'Farm to doorstep' },
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
      <section className="container pb-12 sm:pb-16 px-4">
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

      {/* CTA Banner */}
      <section className="bg-primary text-primary-foreground">
        <div className="container py-10 sm:py-14 px-4 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold">Are You an Artisan?</h2>
          <p className="mt-2 text-sm sm:text-base font-body opacity-90 max-w-md mx-auto">
            Join 60+ verified artisans selling their crafts to buyers across India. Zero listing fees.
          </p>
          <Button
            variant="secondary"
            size="lg"
            className="mt-5 font-body"
            onClick={() => navigate('/login')}
          >
            Start Selling Today
          </Button>
        </div>
      </section>
    </div>
  );
}
