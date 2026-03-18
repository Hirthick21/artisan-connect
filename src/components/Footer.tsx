export default function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/50 mt-auto">
      <div className="container py-6 sm:py-8 px-4 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
        <div className="text-center sm:text-left min-w-0">
          <span className="text-base sm:text-lg font-display font-bold text-primary">ARTNET</span>
          <p className="text-xs sm:text-sm text-muted-foreground font-body mt-1">Connecting Indian village artisans with the world.</p>
        </div>
        <p className="text-[10px] sm:text-xs text-muted-foreground font-body shrink-0">© 2026 ARTNET Marketplace. MVP Demo.</p>
      </div>
    </footer>
  );
}
