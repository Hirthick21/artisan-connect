import { useState } from 'react';
import { ALL_PRODUCTS, CATEGORIES } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import StatusBadge from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus, X } from 'lucide-react';
import { toast } from 'sonner';
import { Product } from '@/data/types';

export default function SellerProductsPage() {
  const { user } = useAuth();
  const artisanId = user?.id || 'artisan-1';
  const [products, setProducts] = useState(() => ALL_PRODUCTS.filter(p => p.artisan_id === artisanId));
  const [showWizard, setShowWizard] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '', category_id: '', price: '', stock: '', description: '', material: '', time_to_make: '', story: '',
  });

  const handleSubmit = () => {
    if (!form.name || !form.category_id || !form.price) {
      toast.error('Please fill required fields');
      return;
    }
    const cat = CATEGORIES.find(c => c.id === form.category_id);
    const newProduct: Product = {
      id: `prod-new-${Date.now()}`,
      artisan_id: artisanId,
      artisan_name: user?.name || 'Artisan',
      category_id: form.category_id,
      category_name: cat?.name || '',
      name: form.name,
      description: form.description,
      story: form.story,
      material: form.material,
      time_to_make: form.time_to_make,
      price: parseInt(form.price),
      stock: parseInt(form.stock) || 0,
      images: [`https://picsum.photos/seed/${Date.now()}/600/600`],
      approval_status: 'pending',
      is_active: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setProducts(prev => [newProduct, ...prev]);
    setShowWizard(false);
    setStep(1);
    setForm({ name: '', category_id: '', price: '', stock: '', description: '', material: '', time_to_make: '', story: '' });
    toast.success('Product submitted for approval!');
  };

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold text-foreground">My Products</h1>
        <Button onClick={() => setShowWizard(true)} className="font-body">
          <Plus className="h-4 w-4 mr-1" /> Add Product
        </Button>
      </div>

      {showWizard && (
        <div className="fixed inset-0 bg-foreground/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg border border-border w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-bold text-lg text-card-foreground">Add Product — Step {step}/3</h2>
              <Button variant="ghost" size="icon" onClick={() => { setShowWizard(false); setStep(1); }}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-1 mb-6">
              {[1, 2, 3].map(s => (
                <div key={s} className={`h-1.5 flex-1 rounded-full ${s <= step ? 'bg-primary' : 'bg-border'}`} />
              ))}
            </div>

            {step === 1 && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground font-body">📸 Start with photos and basic info</p>
                <div className="aspect-video bg-secondary rounded-lg border-2 border-dashed border-border flex items-center justify-center">
                  <span className="text-sm text-muted-foreground font-body">Photo auto-generated for demo</span>
                </div>
                <div className="space-y-2">
                  <Label className="font-body font-medium">Product Name *</Label>
                  <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Blue Pottery Vase" className="font-body" />
                </div>
                <div className="space-y-2">
                  <Label className="font-body font-medium">Category *</Label>
                  <Select value={form.category_id} onValueChange={v => setForm(f => ({ ...f, category_id: v }))}>
                    <SelectTrigger className="font-body"><SelectValue placeholder="Select craft type" /></SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map(c => <SelectItem key={c.id} value={c.id} className="font-body">{c.icon} {c.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={() => setStep(2)} className="w-full font-body">Next →</Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground font-body">💰 Pricing and inventory</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="font-body font-medium">Price (₹) *</Label>
                    <Input type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} placeholder="500" className="font-body" />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-body font-medium">Stock</Label>
                    <Input type="number" value={form.stock} onChange={e => setForm(f => ({ ...f, stock: e.target.value }))} placeholder="10" className="font-body" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="font-body font-medium">Material</Label>
                  <Input value={form.material} onChange={e => setForm(f => ({ ...f, material: e.target.value }))} placeholder="e.g. Clay, Silk, Wood" className="font-body" />
                </div>
                <div className="space-y-2">
                  <Label className="font-body font-medium">Time to Make</Label>
                  <Input value={form.time_to_make} onChange={e => setForm(f => ({ ...f, time_to_make: e.target.value }))} placeholder="e.g. 5 days" className="font-body" />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1 font-body">← Back</Button>
                  <Button onClick={() => setStep(3)} className="flex-1 font-body">Next →</Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground font-body">📖 Tell the story of your craft</p>
                <div className="space-y-2">
                  <Label className="font-body font-medium">Description</Label>
                  <Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Describe your product..." className="font-body" rows={3} />
                </div>
                <div className="space-y-2">
                  <Label className="font-body font-medium">Story (optional)</Label>
                  <Textarea value={form.story} onChange={e => setForm(f => ({ ...f, story: e.target.value }))} placeholder="What makes this special? What village tradition does it carry?" className="font-body" rows={3} />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setStep(2)} className="flex-1 font-body">← Back</Button>
                  <Button onClick={handleSubmit} className="flex-1 font-body">Submit for Approval</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <table className="w-full text-sm font-body">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="text-left p-3 font-medium text-muted-foreground">Product</th>
              <th className="text-left p-3 font-medium text-muted-foreground hidden md:table-cell">Price</th>
              <th className="text-left p-3 font-medium text-muted-foreground hidden md:table-cell">Stock</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} className="border-b border-border last:border-0">
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <img src={p.images[0]} alt={p.name} className="w-10 h-10 rounded object-cover" />
                    <span className="text-card-foreground font-medium">{p.name}</span>
                  </div>
                </td>
                <td className="p-3 text-card-foreground hidden md:table-cell">₹{p.price.toLocaleString('en-IN')}</td>
                <td className="p-3 hidden md:table-cell">
                  <span className={p.stock <= 5 ? 'text-destructive font-medium' : 'text-muted-foreground'}>{p.stock}</span>
                </td>
                <td className="p-3"><StatusBadge status={p.approval_status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
