import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="bg-bg text-text-main transition-colors duration-300 flex flex-col items-center w-full">
      
      {/* Banner de fondo manteniendo su proporción original sin recortes extraños */}
      <div className="w-full max-w-[1920px] mx-auto">
        <Image 
          src="/banner.jpeg" 
          alt="Asesoría Financiera Banner" 
          width={1920}
          height={600}
          priority
          className="w-full h-auto object-contain"
        />
      </div>
      
      {/* Contenido de texto movido debajo del banner para que no tape el logo */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-10 pb-16 flex flex-col items-center">
        
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-text-main">
          Tu Asesor y Gestor de <span className="text-brand-accent">Confianza</span>
        </h1>
        <p className="mt-4 max-w-2xl text-xl mx-auto mb-8 text-text-muted">
          Soluciones de crédito ágiles, seguras y a tu medida. Descubre cómo podemos ayudarte a alcanzar tus metas sin complicaciones.
        </p>
        
        <div className="flex justify-center gap-4 flex-wrap">
          <Link href="#servicios" className="bg-brand-accent hover:brightness-110 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg flex items-center gap-2 border border-brand-accent">
            Ver Servicios <ArrowRight size={20} />
          </Link>
          <Link href="#contacto" className="bg-surface border-2 border-brand-accent hover:bg-brand-accent hover:text-white text-brand-accent font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg">
            Solicitar Ahora
          </Link>
        </div>
      </div>
    </section>
  );
}
