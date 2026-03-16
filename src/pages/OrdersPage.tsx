import { SAMPLE_ORDERS } from '@/data/mockData';
import StatusBadge from '@/components/StatusBadge';

export default function OrdersPage() {
  return (
    <div className="container py-8 max-w-3xl">
      <h1 className="text-2xl font-display font-bold text-foreground mb-6">My Orders</h1>
      {SAMPLE_ORDERS.length === 0 ? (
        <p className="text-muted-foreground font-body">No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {SAMPLE_ORDERS.slice(0, 10).map(order => (
            <div key={order.id} className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="text-sm font-body font-medium text-card-foreground">#{order.id}</span>
                  <span className="text-xs text-muted-foreground font-body ml-2">{new Date(order.created_at).toLocaleDateString('en-IN')}</span>
                </div>
                <StatusBadge status={order.status} />
              </div>
              {order.items.map(item => (
                <div key={item.id} className="flex justify-between text-sm font-body py-1">
                  <span className="text-card-foreground">{item.product_name} × {item.quantity}</span>
                  <span className="text-muted-foreground">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
              <div className="border-t border-border mt-2 pt-2 flex justify-between">
                <span className="text-sm font-body text-muted-foreground">{order.payment_method}</span>
                <span className="font-body font-bold text-primary">₹{order.total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
