import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, LogOut, LayoutDashboard, Menu, X } from 'lucide-react';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) navigate(`/browse?q=${encodeURIComponent(search.trim())}`);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="container flex h-14 sm:h-16 items-center gap-2 sm:gap-4">
        <Link to="/" className="flex items-center shrink-0">
          <span className="text-xl sm:text-2xl font-display font-bold text-primary">ARTNET</span>
        </Link>

        <form onSubmit={handleSearch} className="flex-1 max-w-md hidden md:flex min-w-0">
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

        <nav className="hidden lg:flex items-center gap-1 shrink-0">
          {CATEGORIES.slice(0, 4).map(cat => (
            <Link
              key={cat.id}
              to={`/browse?category=${cat.slug}`}
              className="px-2 py-1.5 text-xs font-body font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
            >
              {cat.name}
            </Link>
          ))}
          <Link to="/browse" className="px-2 py-1.5 text-xs font-body font-medium text-primary hover:text-primary/80 transition-colors whitespace-nowrap">
            All
          </Link>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2 ml-auto shrink-0">
          <Link to="/cart" className="relative p-2 hover:bg-secondary rounded-md transition-colors">
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center font-body font-semibold">
                {itemCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="hidden sm:flex items-center gap-1">
              {user.role === 'admin' && (
                <Button variant="ghost" size="sm" onClick={() => navigate('/admin')} className="font-body text-xs px-2">
                  <LayoutDashboard className="h-4 w-4 mr-1" /> Admin
                </Button>
              )}
              {user.role === 'artisan' && (
                <Button variant="ghost" size="sm" onClick={() => navigate('/seller')} className="font-body text-xs px-2">
                  <LayoutDashboard className="h-4 w-4 mr-1" /> Dashboard
                </Button>
              )}
              {user.role === 'buyer' && (
                <Button variant="ghost" size="sm" onClick={() => navigate('/orders')} className="font-body text-xs px-2">
                  Orders
                </Button>
              )}
              <span className="text-xs font-body font-medium hidden lg:inline truncate max-w-[100px]">{user.name}</span>
              <Button variant="ghost" size="icon" onClick={logout} className="h-8 w-8">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button variant="default" size="sm" onClick={() => navigate('/login')} className="font-body text-xs hidden sm:flex">
              <User className="h-4 w-4 mr-1" /> Login
            </Button>
          )}

          {/* Mobile menu toggle */}
          <Button variant="ghost" size="icon" className="sm:hidden h-8 w-8" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-border bg-background p-4 space-y-3">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search crafts..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9 font-body"
              />
            </div>
          </form>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.slice(0, 5).map(cat => (
              <Link
                key={cat.id}
                to={`/browse?category=${cat.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-1.5 text-xs font-body font-medium text-muted-foreground bg-secondary rounded-md"
              >
                {cat.icon} {cat.name}
              </Link>
            ))}
          </div>
          {user ? (
            <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
              {user.role === 'admin' && (
                <Button variant="outline" size="sm" onClick={() => { navigate('/admin'); setMobileMenuOpen(false); }} className="font-body text-xs">Admin</Button>
              )}
              {user.role === 'artisan' && (
                <Button variant="outline" size="sm" onClick={() => { navigate('/seller'); setMobileMenuOpen(false); }} className="font-body text-xs">Dashboard</Button>
              )}
              {user.role === 'buyer' && (
                <Button variant="outline" size="sm" onClick={() => { navigate('/orders'); setMobileMenuOpen(false); }} className="font-body text-xs">Orders</Button>
              )}
              <Button variant="outline" size="sm" onClick={() => { logout(); setMobileMenuOpen(false); }} className="font-body text-xs">Logout</Button>
            </div>
          ) : (
            <Button variant="default" size="sm" onClick={() => { navigate('/login'); setMobileMenuOpen(false); }} className="w-full font-body text-xs">
              <User className="h-4 w-4 mr-1" /> Login
            </Button>
          )}
        </div>
      )}
    </header>
  );
}
