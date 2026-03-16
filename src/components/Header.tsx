import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CATEGORIES } from '@/data/mockData';
import { useState } from 'react';

export default function Header() {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) navigate(`/browse?q=${encodeURIComponent(search.trim())}`);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="text-2xl font-display font-bold text-primary">ARTNET</span>
        </Link>

        <form onSubmit={handleSearch} className="flex-1 max-w-md hidden md:flex">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search crafts, artisans..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 font-body"
            />
          </div>
        </form>

        <nav className="hidden lg:flex items-center gap-1">
          {CATEGORIES.slice(0, 5).map(cat => (
            <Link
              key={cat.id}
              to={`/browse?category=${cat.slug}`}
              className="px-3 py-1.5 text-sm font-body font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {cat.name}
            </Link>
          ))}
          <Link to="/browse" className="px-3 py-1.5 text-sm font-body font-medium text-primary hover:text-primary/80 transition-colors">
            All
          </Link>
        </nav>

        <div className="flex items-center gap-2 ml-auto">
          <Link to="/cart" className="relative p-2 hover:bg-secondary rounded-md transition-colors">
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-body font-semibold">
                {itemCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-2">
              {user.role === 'admin' && (
                <Button variant="ghost" size="sm" onClick={() => navigate('/admin')} className="font-body">
                  <LayoutDashboard className="h-4 w-4 mr-1" /> Admin
                </Button>
              )}
              {user.role === 'artisan' && (
                <Button variant="ghost" size="sm" onClick={() => navigate('/seller')} className="font-body">
                  <LayoutDashboard className="h-4 w-4 mr-1" /> Dashboard
                </Button>
              )}
              {user.role === 'buyer' && (
                <Button variant="ghost" size="sm" onClick={() => navigate('/orders')} className="font-body">
                  Orders
                </Button>
              )}
              <span className="text-sm font-body font-medium hidden sm:inline">{user.name}</span>
              <Button variant="ghost" size="icon" onClick={logout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button variant="default" size="sm" onClick={() => navigate('/login')} className="font-body">
              <User className="h-4 w-4 mr-1" /> Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
