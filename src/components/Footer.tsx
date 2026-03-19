import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30 mt-auto">
      <div className="container py-8 sm:py-10 px-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <span className="text-lg font-display font-bold text-primary">ARTNET</span>
            <p className="text-xs text-muted-foreground font-body mt-2 max-w-[200px]">
              Connecting India's village artisans with the world, one craft at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-body font-semibold text-foreground uppercase tracking-wider mb-3">Shop</h4>
            <ul className="space-y-2">
              <li><Link to="/browse" className="text-xs font-body text-muted-foreground hover:text-foreground transition-colors">All Products</Link></li>
              <li><Link to="/browse?category=pottery" className="text-xs font-body text-muted-foreground hover:text-foreground transition-colors">Pottery</Link></li>
              <li><Link to="/browse?category=handloom" className="text-xs font-body text-muted-foreground hover:text-foreground transition-colors">Textiles</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-xs font-body font-semibold text-foreground uppercase tracking-wider mb-3">About</h4>
            <ul className="space-y-2">
              <li><span className="text-xs font-body text-muted-foreground">Our Mission</span></li>
              <li><span className="text-xs font-body text-muted-foreground">Artisan Stories</span></li>
              <li><span className="text-xs font-body text-muted-foreground">Impact Report</span></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xs font-body font-semibold text-foreground uppercase tracking-wider mb-3">Support</h4>
            <ul className="space-y-2">
              <li><span className="text-xs font-body text-muted-foreground">Help Center</span></li>
              <li><span className="text-xs font-body text-muted-foreground">Shipping Info</span></li>
              <li><Link to="/login" className="text-xs font-body text-muted-foreground hover:text-foreground transition-colors">Seller Login</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[10px] sm:text-xs text-muted-foreground font-body">© 2026 ARTNET Marketplace. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="text-[10px] sm:text-xs text-muted-foreground font-body">Privacy</span>
            <span className="text-[10px] sm:text-xs text-muted-foreground font-body">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
