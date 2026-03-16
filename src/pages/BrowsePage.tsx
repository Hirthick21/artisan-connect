import { useSearchParams } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { ALL_PRODUCTS, CATEGORIES } from '@/data/mockData';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const PAGE_SIZE = 12;

export default function BrowsePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q')?.toLowerCase() || '';
  const categorySlug = searchParams.get('category') || '';
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('newest');

  const filtered = useMemo(() => {
    let items = ALL_PRODUCTS.filter(p => p.approval_status === 'approved' && p.is_active);
    if (query) {
      items = items.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.artisan_name.toLowerCase().includes(query) ||
        p.category_name.toLowerCase().includes(query) ||
        p.material?.toLowerCase().includes(query)
      );
    }
    if (categorySlug) {
      const cat = CATEGORIES.find(c => c.slug === categorySlug);
      if (cat) items = items.filter(p => p.category_id === cat.id);
    }
    if (sortBy === 'price_low') items.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price_high') items.sort((a, b) => b.price - a.price);
    else items.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    return items;
  }, [query, categorySlug, sortBy]);

  const paginated = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = paginated.length < filtered.length;

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            {categorySlug ? CATEGORIES.find(c => c.slug === categorySlug)?.name || 'Browse' : query ? `Results for "${query}"` : 'All Products'}
          </h1>
          <p className="text-sm text-muted-foreground font-body mt-1">{filtered.length} products found</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-1 flex-wrap">
            <Button
              variant={!categorySlug ? 'default' : 'outline'}
              size="sm"
              className="font-body"
              onClick={() => { searchParams.delete('category'); setSearchParams(searchParams); setPage(1); }}
            >
              All
            </Button>
            {CATEGORIES.map(cat => (
              <Button
                key={cat.id}
                variant={categorySlug === cat.slug ? 'default' : 'outline'}
                size="sm"
                className="font-body text-xs"
                onClick={() => { searchParams.set('category', cat.slug); setSearchParams(searchParams); setPage(1); }}
              >
                {cat.icon} {cat.name}
              </Button>
            ))}
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40 font-body">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="price_low">Price: Low→High</SelectItem>
              <SelectItem value="price_high">Price: High→Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground font-body">No products found. Try a different search.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {paginated.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
          {hasMore && (
            <div className="text-center mt-8">
              <Button variant="outline" onClick={() => setPage(p => p + 1)} className="font-body">
                Load More
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
