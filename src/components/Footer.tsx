import { Link } from 'react-router-dom';
import { CATEGORIES } from '@/data/mockData';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30 mt-auto">
      <div className="container py-8 sm:py-10 px-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <Link to="/" className="text-lg font-display font-bold text-primary">ARTNET</Link>
            <p className="text-xs text-muted-foreground font-body mt-2 max-w-[200px]">
              Connecting India's village artisans with the world, one craft at a time.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs font-body font-semibold text-foreground uppercase tracking-wider mb-3">Shop</h4>
            <ul className="space-y-2">
              <li><Link to="/browse" className="text-xs font-body text-muted-foreground hover:text-foreground transition-colors">All Products</Link></li>
              {CATEGORIES.slice(0, 3).map(cat => (
                <li key={cat.id}>
                  <Link to={`/browse?category=${cat.slug}`} className="text-xs font-body text-muted-foreground hover:text-foreground transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Artisans */}
          <div>
            <h4 className="text-xs font-body font-semibold text-foreground uppercase tracking-wider mb-3">For Artisans</h4>
            <ul className="space-y-2">
              <li><Link to="/login" className="text-xs font-body text-muted-foreground hover:text-foreground transition-colors">Seller Login</Link></li>
              <li><Link to="/login" className="text-xs font-body text-muted-foreground hover:text-foreground transition-colors">Start Selling</Link></li>
              <li><Link to="/login" className="text-xs font-body text-muted-foreground hover:text-foreground transition-colors">Seller Dashboard</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-xs font-body font-semibold text-foreground uppercase tracking-wider mb-3">Help</h4>
            <ul className="space-y-2">
              <li><Link to="/browse" className="text-xs font-body text-muted-foreground hover:text-foreground transition-colors">Browse Products</Link></li>
              <li><Link to="/cart" className="text-xs font-body text-muted-foreground hover:text-foreground transition-colors">Shopping Cart</Link></li>
              <li><Link to="/orders" className="text-xs font-body text-muted-foreground hover:text-foreground transition-colors">Track Orders</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[10px] sm:text-xs text-muted-foreground font-body">© 2026 ARTNET Marketplace. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/browse" className="text-[10px] sm:text-xs text-muted-foreground hover:text-foreground font-body transition-colors">Explore</Link>
            <Link to="/login" className="text-[10px] sm:text-xs text-muted-foreground hover:text-foreground font-body transition-colors">Login</Link>
            <Link to="/cart" className="text-[10px] sm:text-xs text-muted-foreground hover:text-foreground font-body transition-colors">Cart</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
