import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { UserRole } from '@/data/types';

export default function LoginPage() {
  const { login, switchRole } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      toast.success('Logged in successfully');
      navigate('/');
    } else {
      toast.error('Invalid credentials');
    }
  };

  const quickLogin = (role: UserRole) => {
    switchRole(role);
    toast.success(`Logged in as ${role}`);
    if (role === 'admin') navigate('/admin');
    else if (role === 'artisan') navigate('/seller');
    else navigate('/');
  };

  return (
    <div className="container py-16 max-w-sm">
      <h1 className="text-3xl font-display font-bold text-foreground text-center">Welcome to ARTNET</h1>
      <p className="text-sm text-muted-foreground font-body text-center mt-2">Login to your account</p>

      <form onSubmit={handleLogin} className="mt-8 space-y-4">
        <div className="space-y-2">
          <Label className="font-body">Email</Label>
          <Input value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@artnet.local" className="font-body" />
        </div>
        <div className="space-y-2">
          <Label className="font-body">Password</Label>
          <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Admin@123" className="font-body" />
        </div>
        <Button type="submit" className="w-full font-body" size="lg">Login</Button>
      </form>

      <div className="mt-8 border-t border-border pt-6">
        <p className="text-xs text-muted-foreground font-body text-center mb-3">Quick Demo Access</p>
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1 font-body text-xs" onClick={() => quickLogin('buyer')}>Buyer</Button>
          <Button variant="outline" className="flex-1 font-body text-xs" onClick={() => quickLogin('artisan')}>Artisan</Button>
          <Button variant="outline" className="flex-1 font-body text-xs" onClick={() => quickLogin('admin')}>Admin</Button>
        </div>
      </div>

      <div className="mt-4 text-xs text-muted-foreground font-body text-center space-y-1">
        <p>Admin: admin@artnet.local / Admin@123</p>
        <p>Buyer: priya@example.com / Buyer@123</p>
        <p>Artisan: artisan1@artnet.local / Artisan@123</p>
      </div>
    </div>
  );
}
