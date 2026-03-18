import { Link } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CATEGORIES, ALL_PRODUCTS } from '@/data/mockData';
import ProductCard from '@/components/ProductCard';
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
      {/* Hero */}
      <section className="bg-primary/5 py-10 sm:py-16 md:py-24 px-4">
        <div className="container text-center">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight break-words">
            Handcrafted by India's
            <br />
            <span className="text-primary">Village Artisans</span>
          </h1>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-muted-foreground font-body max-w-xl mx-auto px-2">
            Discover authentic crafts directly from rural artisans. Every purchase supports traditional livelihoods.
          </p>
          <form onSubmit={handleSearch} className="mt-6 sm:mt-8 flex max-w-md mx-auto gap-2 px-2">
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search pottery, textiles..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9 h-10 sm:h-12 font-body text-sm"
              />
            </div>
            <Button type="submit" size="default" className="font-body h-10 sm:h-12 shrink-0 text-sm">
              Search
            </Button>
          </form>
        </div>
      </section>

      {/* Categories */}
      <section className="container py-8 sm:py-12 px-4">
        <h2 className="text-xl sm:text-2xl font-display font-bold text-foreground">Shop by Craft</h2>
        <div className="mt-4 sm:mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3">
          {CATEGORIES.map(cat => (
            <Link
              key={cat.id}
              to={`/browse?category=${cat.slug}`}
              className="flex flex-col items-center gap-1.5 sm:gap-2 p-3 sm:p-4 rounded-lg border border-border bg-card hover:border-primary/30 hover:bg-primary/5 transition-colors"
            >
              <span className="text-2xl sm:text-3xl">{cat.icon}</span>
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
    </div>
  );
}
