import { Link } from 'react-router-dom';
import { Product } from '@/data/types';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="group block bg-card rounded-lg border border-border overflow-hidden hover:shadow-md transition-shadow animate-fade-in"
    >
      <div className="aspect-square overflow-hidden bg-secondary">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <div className="p-2 sm:p-3">
        <p className="text-[10px] sm:text-xs text-muted-foreground font-body truncate">{product.category_name}</p>
        <h3 className="font-display font-semibold text-xs sm:text-sm mt-0.5 line-clamp-1 text-card-foreground">{product.name}</h3>
        <p className="text-[10px] sm:text-xs text-muted-foreground font-body mt-0.5 truncate">by {product.artisan_name}</p>
        <p className="text-sm sm:text-base font-body font-bold text-primary mt-1">₹{product.price.toLocaleString('en-IN')}</p>
      </div>
    </Link>
  );
}
