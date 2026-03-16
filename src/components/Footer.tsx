export default function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/50 mt-auto">
      <div className="container py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <span className="text-lg font-display font-bold text-primary">ARTNET</span>
          <p className="text-sm text-muted-foreground font-body mt-1">Connecting Indian village artisans with the world.</p>
        </div>
        <p className="text-xs text-muted-foreground font-body">© 2026 ARTNET Marketplace. MVP Demo.</p>
      </div>
    </footer>
  );
}
