'use client';

import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ServiceCard from './ServiceCard';

export default function ServicesCarousel({ servicios }) {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5); // 5px tolerance
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      // Scroll by roughly the width of one card (or half container)
      const scrollAmount = scrollContainerRef.current.clientWidth / 2;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto group">
      
      {/* Contenedor del Carrusel (Scroll Snap) */}
      <div 
        ref={scrollContainerRef}
        onScroll={checkScroll}
        className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 pb-8 pt-4 px-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {servicios.map((servicio) => (
          <div 
            key={servicio.id} 
            className="w-full md:w-[calc(50%-12px)] flex-shrink-0 snap-center md:snap-start"
          >
            <ServiceCard servicio={servicio} />
          </div>
        ))}
      </div>

      {/* Controles */}
      <button 
        onClick={() => scroll('left')}
        disabled={!canScrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 md:-ml-12 bg-surface border border-border p-3 rounded-full shadow-lg text-brand-hover hover:bg-bg disabled:opacity-0 disabled:pointer-events-none transition-all z-10"
        aria-label="Anterior"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button 
        onClick={() => scroll('right')}
        disabled={!canScrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 md:-mr-12 bg-surface border border-border p-3 rounded-full shadow-lg text-brand-hover hover:bg-bg disabled:opacity-0 disabled:pointer-events-none transition-all z-10"
        aria-label="Siguiente"
      >
        <ChevronRight size={24} />
      </button>
      
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
