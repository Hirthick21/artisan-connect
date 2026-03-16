import { useParams, Link } from 'react-router-dom';
import { ALL_PRODUCTS } from '@/data/mockData';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Minus, Plus, MapPin, Clock } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = ALL_PRODUCTS.find(p => p.id === id);
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-2xl font-display font-bold text-foreground">Product not found</h1>
        <Link to="/browse" className="text-primary font-body mt-4 inline-block">Back to Browse</Link>
      </div>
    );
  }

  const handleAdd = () => {
    addToCart(product, qty);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="container py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="aspect-square rounded-lg overflow-hidden bg-secondary">
          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
        </div>

        <div>
          <p className="text-sm text-muted-foreground font-body">{product.category_name}</p>
          <h1 className="text-3xl font-display font-bold text-foreground mt-1">{product.name}</h1>
          <p className="text-sm text-muted-foreground font-body mt-1">by <span className="text-foreground font-medium">{product.artisan_name}</span></p>
          <p className="text-3xl font-body font-bold text-primary mt-4">₹{product.price.toLocaleString('en-IN')}</p>

          <div className="mt-6 space-y-3">
            {product.material && (
              <div className="flex items-center gap-2 text-sm font-body text-muted-foreground">
                <span className="font-medium text-foreground">Material:</span> {product.material}
              </div>
            )}
            {product.time_to_make && (
              <div className="flex items-center gap-2 text-sm font-body text-muted-foreground">
                <Clock className="h-4 w-4" /> Crafting time: {product.time_to_make}
              </div>
            )}
            <div className="flex items-center gap-2 text-sm font-body text-muted-foreground">
              <span className={product.stock > 5 ? 'text-accent' : 'text-destructive'}>
                {product.stock > 5 ? `${product.stock} in stock` : product.stock > 0 ? `Only ${product.stock} left` : 'Out of stock'}
              </span>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center border border-border rounded-md">
              <Button variant="ghost" size="icon" onClick={() => setQty(q => Math.max(1, q - 1))} className="h-10 w-10">
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-10 text-center font-body font-medium">{qty}</span>
              <Button variant="ghost" size="icon" onClick={() => setQty(q => Math.min(product.stock, q + 1))} className="h-10 w-10">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button onClick={handleAdd} disabled={product.stock === 0} size="lg" className="flex-1 font-body">
              <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
            </Button>
          </div>

          {product.story && (
            <div className="mt-8 p-4 bg-secondary/50 rounded-lg border border-border">
              <h3 className="font-display font-semibold text-foreground">The Story</h3>
              <p className="text-sm text-muted-foreground font-body mt-2">{product.story}</p>
            </div>
          )}

          <p className="mt-6 text-sm text-muted-foreground font-body">{product.description}</p>
        </div>
      </div>
    </div>
  );
}
