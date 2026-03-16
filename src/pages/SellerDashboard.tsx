import { ALL_PRODUCTS, SAMPLE_ORDERS, ARTISAN_PROFILES } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import StatusBadge from '@/components/StatusBadge';
import { Link } from 'react-router-dom';
import { Package, IndianRupee, AlertTriangle, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SellerDashboard() {
  const { user } = useAuth();
  const artisanId = user?.id || 'artisan-1';
  const profile = ARTISAN_PROFILES.find(p => p.user_id === artisanId);
  const products = ALL_PRODUCTS.filter(p => p.artisan_id === artisanId);
  const approvedProducts = products.filter(p => p.approval_status === 'approved');
  const myOrderItems = SAMPLE_ORDERS.flatMap(o => o.items).filter(i => i.artisan_id === artisanId);
  const revenue = myOrderItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const lowStock = products.filter(p => p.stock <= 5 && p.stock > 0);

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Seller Dashboard</h1>
          {profile && <StatusBadge status={profile.approval_status} />}
        </div>
        <Link to="/seller/products">
          <Button className="font-body">Manage Products</Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Products', value: approvedProducts.length, icon: Package, color: 'text-primary' },
          { label: 'Revenue', value: `₹${revenue.toLocaleString('en-IN')}`, icon: IndianRupee, color: 'text-accent' },
          { label: 'Orders', value: myOrderItems.length, icon: TrendingUp, color: 'text-primary' },
          { label: 'Low Stock', value: lowStock.length, icon: AlertTriangle, color: 'text-destructive' },
        ].map(stat => (
          <div key={stat.label} className="bg-card rounded-lg border border-border p-4">
            <div className="flex items-center gap-2 mb-2">
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
              <span className="text-xs text-muted-foreground font-body">{stat.label}</span>
            </div>
            <span className="text-xl font-body font-bold text-card-foreground">{stat.value}</span>
          </div>
        ))}
      </div>

      <h2 className="text-lg font-display font-semibold text-foreground mb-4">Recent Order Items</h2>
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <table className="w-full text-sm font-body">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="text-left p-3 font-medium text-muted-foreground">Product</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Qty</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Amount</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {myOrderItems.slice(0, 10).map(item => (
              <tr key={item.id} className="border-b border-border last:border-0">
                <td className="p-3 text-card-foreground">{item.product_name}</td>
                <td className="p-3 text-muted-foreground">{item.quantity}</td>
                <td className="p-3 text-card-foreground">₹{(item.price * item.quantity).toLocaleString('en-IN')}</td>
                <td className="p-3"><StatusBadge status={item.fulfillment_status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {lowStock.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-display font-semibold text-foreground mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" /> Low Stock Alerts
          </h2>
          <div className="space-y-2">
            {lowStock.map(p => (
              <div key={p.id} className="flex justify-between items-center p-3 bg-destructive/5 rounded-lg border border-destructive/20">
                <span className="font-body text-sm text-foreground">{p.name}</span>
                <span className="font-body text-sm font-bold text-destructive">{p.stock} left</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
