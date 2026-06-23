import { CheckCircle2 } from 'lucide-react';

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Izquierda: A Quién Asesoramos */}
          <div className="bg-surface p-8 md:p-12 rounded-3xl shadow-xl border border-border transition-transform hover:-translate-y-1 duration-300">
            <h3 className="text-2xl md:text-3xl font-extrabold text-text-main mb-8 border-b border-border pb-4 text-brand-accent">¿A QUIÉN ASESORAMOS?</h3>
            <ul className="space-y-6">
              <li className="flex items-center text-xl text-text-muted font-medium hover:text-text-main transition-colors"><span className="text-3xl mr-4 grayscale hover:grayscale-0 transition-all">👴</span> Pensionados</li>
              <li className="flex items-center text-xl text-text-muted font-medium hover:text-text-main transition-colors"><span className="text-3xl mr-4 grayscale hover:grayscale-0 transition-all">👨‍💼</span> Empleados Públicos</li>
              <li className="flex items-center text-xl text-text-muted font-medium hover:text-text-main transition-colors"><span className="text-3xl mr-4 grayscale hover:grayscale-0 transition-all">🏢</span> Empleados Privados</li>
              <li className="flex items-center text-xl text-text-muted font-medium hover:text-text-main transition-colors"><span className="text-3xl mr-4 grayscale hover:grayscale-0 transition-all">👮</span> Policía Nacional</li>
              <li className="flex items-center text-xl text-text-muted font-medium hover:text-text-main transition-colors"><span className="text-3xl mr-4 grayscale hover:grayscale-0 transition-all">🪖</span> Fuerzas Militares</li>
              <li className="flex items-center text-xl text-text-muted font-medium hover:text-text-main transition-colors"><span className="text-3xl mr-4 grayscale hover:grayscale-0 transition-all">👨‍🏫</span> Docentes Públicos</li>
            </ul>
          </div>

          {/* Derecha: Por Qué Elegirnos */}
          <div className="bg-[#111] text-white p-8 md:p-12 rounded-3xl shadow-xl border border-[#333] transition-transform hover:-translate-y-1 duration-300 relative overflow-hidden">
            {/* Elemento decorativo de fondo */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent opacity-10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
            
            <h3 className="text-2xl md:text-3xl font-extrabold mb-8 border-b border-white/10 pb-4 text-brand-accent relative z-10">¿POR QUÉ ELEGIRNOS?</h3>
            <ul className="space-y-6 relative z-10">
              <li className="flex items-center text-lg font-medium text-gray-200 hover:text-white transition-colors">
                <CheckCircle2 className="text-brand-accent mr-4 shrink-0" size={24} /> Gestión profesional con procesos rápidos y seguros.
              </li>
              <li className="flex items-center text-lg font-medium text-gray-200 hover:text-white transition-colors">
                <CheckCircle2 className="text-brand-accent mr-4 shrink-0" size={24} /> Acompañamiento personalizado de principio a fin.
              </li>
              <li className="flex items-center text-lg font-medium text-gray-200 hover:text-white transition-colors">
                <CheckCircle2 className="text-brand-accent mr-4 shrink-0" size={24} /> Atención a nivel nacional.
              </li>
              <li className="flex items-center text-lg font-medium text-gray-200 hover:text-white transition-colors">
                <CheckCircle2 className="text-brand-accent mr-4 shrink-0" size={24} /> Asesoría 100 % digital, sin necesidad de desplazamientos.
              </li>
              <li className="flex items-center text-lg font-medium text-gray-200 hover:text-white transition-colors">
                <CheckCircle2 className="text-brand-accent mr-4 shrink-0" size={24} /> Procesos ágiles.
              </li>
              <li className="flex items-center text-lg font-medium text-gray-200 hover:text-white transition-colors">
                <CheckCircle2 className="text-brand-accent mr-4 shrink-0" size={24} /> Experiencia en soluciones financieras.
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
