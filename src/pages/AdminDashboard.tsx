import { useState } from 'react';
import { ARTISAN_PROFILES, ALL_PRODUCTS, MOCK_KPI, SAMPLE_ORDERS, ARTISAN_USERS } from '@/data/mockData';
import StatusBadge from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Users, Package, ShoppingCart, IndianRupee, TrendingUp, Clock } from 'lucide-react';
import { ArtisanProfile, Product, ApprovalStatus } from '@/data/types';

export default function AdminDashboard() {
  const [profiles, setProfiles] = useState(ARTISAN_PROFILES);
  const [products, setProducts] = useState(ALL_PRODUCTS);
  const kpi = MOCK_KPI;

  const pendingProfiles = profiles.filter(p => p.approval_status === 'pending');
  const pendingProducts = products.filter(p => p.approval_status === 'pending');

  const updateProfileStatus = (id: string, status: ApprovalStatus) => {
    setProfiles(prev => prev.map(p => p.id === id ? { ...p, approval_status: status, approved_at: new Date().toISOString(), approved_by: 'admin-1' } : p));
    toast.success(`Profile ${status}`);
  };

  const updateProductStatus = (id: string, status: ApprovalStatus) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, approval_status: status, is_active: status === 'approved' } : p));
    toast.success(`Product ${status}`);
  };

  const funnelSteps = [
    { name: 'View Product', value: kpi.conversion_funnel.view_product },
    { name: 'Add to Cart', value: kpi.conversion_funnel.add_to_cart },
    { name: 'Checkout Start', value: kpi.conversion_funnel.checkout_start },
    { name: 'Order Placed', value: kpi.conversion_funnel.order_placed },
  ];

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-display font-bold text-foreground mb-6">Admin Dashboard</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {[
          { label: 'Active Artisans (7d)', value: kpi.active_artisans_7d, icon: Users },
          { label: 'Approved Products', value: kpi.approved_products, icon: Package },
          { label: 'Total Orders', value: kpi.total_orders, icon: ShoppingCart },
          { label: 'GMV', value: `₹${(kpi.gmv / 1000).toFixed(0)}K`, icon: IndianRupee },
          { label: 'AOV', value: `₹${kpi.aov.toLocaleString('en-IN')}`, icon: TrendingUp },
          { label: 'Pending Approvals', value: kpi.pending_approvals, icon: Clock },
        ].map(stat => (
          <div key={stat.label} className="bg-card rounded-lg border border-border p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <stat.icon className="h-4 w-4 text-primary" />
              <span className="text-[10px] text-muted-foreground font-body uppercase tracking-wide">{stat.label}</span>
            </div>
            <span className="text-lg font-body font-bold text-card-foreground">{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Conversion Funnel */}
      <div className="bg-card rounded-lg border border-border p-4 mb-8">
        <h2 className="font-display font-semibold text-foreground mb-4">Conversion Funnel</h2>
        <div className="space-y-3">
          {funnelSteps.map((step, i) => {
            const pct = (step.value / funnelSteps[0].value) * 100;
            const convRate = i > 0 ? ((step.value / funnelSteps[i - 1].value) * 100).toFixed(1) : '100';
            return (
              <div key={step.name}>
                <div className="flex justify-between text-sm font-body mb-1">
                  <span className="text-card-foreground">{step.name}</span>
                  <span className="text-muted-foreground">{step.value.toLocaleString()} ({convRate}%)</span>
                </div>
                <div className="h-6 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary/80 rounded-full transition-all" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Tabs defaultValue="profiles" className="space-y-4">
        <TabsList className="font-body">
          <TabsTrigger value="profiles">Artisan Profiles ({pendingProfiles.length})</TabsTrigger>
          <TabsTrigger value="products">Products ({pendingProducts.length})</TabsTrigger>
          <TabsTrigger value="all-profiles">All Artisans</TabsTrigger>
        </TabsList>

        <TabsContent value="profiles">
          {pendingProfiles.length === 0 ? (
            <p className="text-muted-foreground font-body p-4">No pending artisan profiles.</p>
          ) : (
            <div className="space-y-3">
              {pendingProfiles.map(profile => {
                const artUser = ARTISAN_USERS.find(u => u.id === profile.user_id);
                return (
                  <div key={profile.id} className="bg-card rounded-lg border border-border p-4 flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-body font-semibold text-card-foreground">{artUser?.name}</span>
                        <StatusBadge status={profile.approval_status} />
                      </div>
                      <p className="text-sm text-muted-foreground font-body mt-1">{profile.craft_type} · {profile.village}, {profile.state}</p>
                      <p className="text-sm text-muted-foreground font-body mt-1">{profile.bio}</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Button size="sm" className="font-body bg-accent hover:bg-accent/90 text-accent-foreground" onClick={() => updateProfileStatus(profile.id, 'approved')}>Approve</Button>
                      <Button size="sm" variant="outline" className="font-body text-destructive border-destructive/30" onClick={() => updateProfileStatus(profile.id, 'rejected')}>Reject</Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="products">
          {pendingProducts.length === 0 ? (
            <p className="text-muted-foreground font-body p-4">No pending products.</p>
          ) : (
            <div className="space-y-3">
              {pendingProducts.slice(0, 20).map(product => (
                <div key={product.id} className="bg-card rounded-lg border border-border p-4 flex flex-col md:flex-row md:items-center gap-4">
                  <img src={product.images[0]} alt={product.name} className="w-16 h-16 rounded object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-body font-semibold text-card-foreground">{product.name}</span>
                      <StatusBadge status={product.approval_status} />
                    </div>
                    <p className="text-sm text-muted-foreground font-body">{product.artisan_name} · {product.category_name} · ₹{product.price.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button size="sm" className="font-body bg-accent hover:bg-accent/90 text-accent-foreground" onClick={() => updateProductStatus(product.id, 'approved')}>Approve</Button>
                    <Button size="sm" variant="outline" className="font-body text-destructive border-destructive/30" onClick={() => updateProductStatus(product.id, 'rejected')}>Reject</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="all-profiles">
          <div className="bg-card rounded-lg border border-border overflow-x-auto">
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="text-left p-3 font-medium text-muted-foreground">Name</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Craft</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Location</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {profiles.slice(0, 30).map(profile => {
                  const artUser = ARTISAN_USERS.find(u => u.id === profile.user_id);
                  return (
                    <tr key={profile.id} className="border-b border-border last:border-0">
                      <td className="p-3 text-card-foreground">{artUser?.name}</td>
                      <td className="p-3 text-muted-foreground">{profile.craft_type}</td>
                      <td className="p-3 text-muted-foreground">{profile.village}, {profile.state}</td>
                      <td className="p-3"><StatusBadge status={profile.approval_status} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
