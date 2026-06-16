import { promises as fs } from 'fs';
import path from 'path';
import Hero from '@/components/Hero';
import ServicesCarousel from '@/components/ServicesCarousel';
import LeadForm from '@/components/LeadForm';
import WhatsAppButton from '@/components/WhatsAppButton';

async function getServicios() {
  const filePath = path.join(process.cwd(), 'data', 'servicios.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export default async function Home() {
  const servicios = await getServicios();

  return (
    <main className="min-h-screen bg-bg transition-colors duration-300 overflow-x-hidden">
      <Hero />

      <section id="servicios" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-text-main mb-4">Nuestros Servicios Financieros</h2>
          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            Desliza para ver nuestras alternativas de crédito diseñadas para ajustarse a tus necesidades.
          </p>
        </div>
        
        {/* Reemplazamos el Grid estático por el Carrusel Interactivo */}
        <ServicesCarousel servicios={servicios} />
        
      </section>

      <section id="contacto" className="py-20 bg-brand relative transition-colors duration-300">
        <div className="absolute inset-0 bg-brand bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-white">¿Listo para empezar?</h2>
            <p className="text-gray-300 mt-2">Déjanos tus datos y te brindaremos la mejor asesoría.</p>
          </div>
          <LeadForm servicios={servicios} />
        </div>
      </section>

      <WhatsAppButton />

      <footer className="bg-[#0a0a0a] text-gray-500 py-8 text-center border-t border-white/5">
        <p>© {new Date().getFullYear()} Asesoría Financiera. Todos los derechos reservados.</p>
      </footer>
    </main>
  );
}
