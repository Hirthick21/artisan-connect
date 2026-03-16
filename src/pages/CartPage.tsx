import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, total } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="container py-16 text-center">
        <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground" />
        <h1 className="text-2xl font-display font-bold text-foreground mt-4">Your cart is empty</h1>
        <Link to="/browse" className="text-primary font-body mt-4 inline-block hover:underline">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-3xl">
      <h1 className="text-2xl font-display font-bold text-foreground mb-6">Shopping Cart</h1>
      <div className="space-y-4">
        {items.map(({ product, quantity }) => (
          <div key={product.id} className="flex gap-4 p-4 bg-card rounded-lg border border-border">
            <img src={product.images[0]} alt={product.name} className="w-20 h-20 object-cover rounded-md" />
            <div className="flex-1 min-w-0">
              <Link to={`/product/${product.id}`} className="font-display font-semibold text-card-foreground hover:text-primary text-sm">{product.name}</Link>
              <p className="text-xs text-muted-foreground font-body">{product.artisan_name}</p>
              <p className="text-sm font-body font-bold text-primary mt-1">₹{product.price.toLocaleString('en-IN')}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeFromCart(product.id)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
              <div className="flex items-center border border-border rounded-md">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(product.id, quantity - 1)}>
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center text-sm font-body">{quantity}</span>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(product.id, quantity + 1)}>
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-secondary rounded-lg border border-border">
        <div className="flex justify-between items-center">
          <span className="font-body font-medium text-foreground">Total</span>
          <span className="text-2xl font-body font-bold text-primary">₹{total.toLocaleString('en-IN')}</span>
        </div>
        <Button onClick={() => navigate('/checkout')} className="w-full mt-4 font-body" size="lg">
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
}
