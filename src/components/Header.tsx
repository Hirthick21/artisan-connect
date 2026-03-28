import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, LogOut, LayoutDashboard, Menu, X, Settings, Heart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full hover:bg-secondary/80 transition-colors">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt={user.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                      {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="flex flex-col space-y-1">
                  <p className="text-sm font-semibold">{user.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {user.role === 'buyer' && (
                  <>
                    <DropdownMenuItem onClick={() => navigate('/orders')} className="cursor-pointer">
                      <LayoutDashboard className="h-4 w-4 mr-2" />
                      <span>My Orders</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Heart className="h-4 w-4 mr-2" />
                      <span>Wishlist</span>
                    </DropdownMenuItem>
                  </>
                )}
                {user.role === 'admin' && (
                  <DropdownMenuItem onClick={() => navigate('/admin')} className="cursor-pointer">
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    <span>Admin Dashboard</span>
                  </DropdownMenuItem>
                )}
                {user.role === 'artisan' && (
                  <DropdownMenuItem onClick={() => navigate('/seller')} className="cursor-pointer">
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    <span>Seller Dashboard</span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="h-4 w-4 mr-2" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive focus:text-destructive">
                  <LogOut className="h-4 w-4 mr-2" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="default" size="sm" onClick={() => navigate('/login')} className="font-body text-xs hidden sm:flex gap-2 px-3">
              <User className="h-4 w-4" /> Login
            </Button>
          )}

          {/* Mobile menu toggle */}
          <Button 
            variant="outline" 
            size="icon" 
            className="sm:hidden h-9 w-9 border rounded-lg hover:bg-secondary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-menu-toggle"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5 text-foreground" />
            ) : (
              <Menu className="h-5 w-5 text-foreground" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-border bg-background/95 backdrop-blur p-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          {user && (
            <div className="flex items-center gap-3 pb-3 border-b border-border">
              <Avatar className="h-10 w-10 border border-border">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt={user.name} />
                <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                  {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
              </div>
            </div>
          )}
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
                className="px-3 py-1.5 text-xs font-body font-medium text-muted-foreground bg-secondary rounded-md hover:bg-secondary/80 transition-colors"
              >
                {cat.icon} {cat.name}
              </Link>
            ))}
          </div>
          {user ? (
            <div className="flex flex-col gap-2 pt-2 border-t border-border">
              {user.role === 'admin' && (
                <Button variant="outline" size="sm" onClick={() => { navigate('/admin'); setMobileMenuOpen(false); }} className="font-body text-xs justify-start">
                  <LayoutDashboard className="h-4 w-4 mr-2" /> Admin Dashboard
                </Button>
              )}
              {user.role === 'artisan' && (
                <Button variant="outline" size="sm" onClick={() => { navigate('/seller'); setMobileMenuOpen(false); }} className="font-body text-xs justify-start">
                  <LayoutDashboard className="h-4 w-4 mr-2" /> Seller Dashboard
                </Button>
              )}
              {user.role === 'buyer' && (
                <Button variant="outline" size="sm" onClick={() => { navigate('/orders'); setMobileMenuOpen(false); }} className="font-body text-xs justify-start">
                  <LayoutDashboard className="h-4 w-4 mr-2" /> My Orders
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={() => { logout(); setMobileMenuOpen(false); }} className="font-body text-xs justify-start text-destructive hover:text-destructive">
                <LogOut className="h-4 w-4 mr-2" /> Logout
              </Button>
            </div>
          ) : (
            <Button variant="default" size="sm" onClick={() => { navigate('/login'); setMobileMenuOpen(false); }} className="w-full font-body text-xs gap-2">
              <User className="h-4 w-4" /> Login
            </Button>
          )}
        </div>
      )}
    </header>
  );
}
