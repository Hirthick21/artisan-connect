import { Link, useSearchParams } from 'react-router-dom';
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
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-primary/5 py-16 md:py-24">
        <div className="container text-center">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground leading-tight">
            Handcrafted by India's
            <br />
            <span className="text-primary">Village Artisans</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground font-body max-w-xl mx-auto">
            Discover authentic crafts directly from rural artisans. Every purchase supports traditional livelihoods.
          </p>
          <form onSubmit={handleSearch} className="mt-8 flex max-w-md mx-auto gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search pottery, textiles, jewelry..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9 h-12 font-body"
              />
            </div>
            <Button type="submit" size="lg" className="font-body h-12">
              Search
            </Button>
          </form>
        </div>
      </section>

      {/* Categories */}
      <section className="container py-12">
        <h2 className="text-2xl font-display font-bold text-foreground">Shop by Craft</h2>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {CATEGORIES.map(cat => (
            <Link
              key={cat.id}
              to={`/browse?category=${cat.slug}`}
              className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border bg-card hover:border-primary/30 hover:bg-primary/5 transition-colors"
            >
              <span className="text-3xl">{cat.icon}</span>
              <span className="text-sm font-body font-medium text-center text-card-foreground">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-display font-bold text-foreground">Featured Products</h2>
          <Link to="/browse" className="text-sm font-body font-medium text-primary hover:underline flex items-center gap-1">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featured.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}
