import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [payment, setPayment] = useState<'cod' | 'test'>('cod');

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleOrder = () => {
    if (!address.trim()) {
      toast.error('Please enter a shipping address');
      return;
    }
    clearCart();
    toast.success('Order placed successfully! 🎉');
    navigate('/orders');
  };

  return (
    <div className="container py-8 max-w-2xl">
      <h1 className="text-2xl font-display font-bold text-foreground mb-6">Checkout</h1>

      <div className="space-y-6">
        <div className="bg-card rounded-lg border border-border p-4 space-y-3">
          <h2 className="font-display font-semibold text-foreground">Order Summary</h2>
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex justify-between text-sm font-body">
              <span className="text-card-foreground">{product.name} × {quantity}</span>
              <span className="font-medium text-card-foreground">₹{(product.price * quantity).toLocaleString('en-IN')}</span>
            </div>
          ))}
          <div className="border-t border-border pt-3 flex justify-between">
            <span className="font-body font-semibold text-foreground">Total</span>
            <span className="text-xl font-body font-bold text-primary">₹{total.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <div className="space-y-3">
          <Label className="font-body font-medium">Shipping Address</Label>
          <Input
            value={address}
            onChange={e => setAddress(e.target.value)}
            placeholder="Enter full address"
            className="font-body"
          />
        </div>

        <div className="space-y-3">
          <Label className="font-body font-medium">Payment Method</Label>
          <div className="flex gap-3">
            <Button
              variant={payment === 'cod' ? 'default' : 'outline'}
              className="flex-1 font-body"
              onClick={() => setPayment('cod')}
            >
              Cash on Delivery
            </Button>
            <Button
              variant={payment === 'test' ? 'default' : 'outline'}
              className="flex-1 font-body"
              onClick={() => setPayment('test')}
            >
              Test Payment
            </Button>
          </div>
        </div>

        <Button onClick={handleOrder} size="lg" className="w-full font-body">
          Place Order
        </Button>
      </div>
    </div>
  );
}
