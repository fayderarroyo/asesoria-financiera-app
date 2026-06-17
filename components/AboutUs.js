import Image from 'next/image';

export default function AboutUs() {
  return (
    <section id="nosotros" className="py-20 bg-surface border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-text-main mb-4 uppercase tracking-wide">Quiénes Somos</h2>
          <p className="text-xl text-text-muted max-w-4xl mx-auto leading-relaxed">
            Somos una empresa especializada en gestión y asesoría financiera, comprometida con brindar soluciones personalizadas y acompañamiento integral a nuestros clientes. Trabajamos para ayudarte a tomar decisiones financieras con <span className="text-brand-accent font-semibold">confianza, transparencia y seguridad</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Izquierda: Texto */}
          <div className="order-2 lg:order-1">
            <h3 className="text-2xl font-bold text-text-main mb-6 text-brand-accent border-b border-border pb-2 inline-block">Nuestra Visión y Compromiso</h3>
            <p className="text-text-muted mb-6 text-lg leading-relaxed text-justify">
              Mi compromiso es brindar un acompañamiento cercano, profesional y transparente, identificando las soluciones financieras que mejor se adapten a las necesidades y objetivos de cada cliente. En Asesoría Financiera nuestro enfoque se basa en la confianza, la responsabilidad y la búsqueda de resultados efectivos.
            </p>
            <p className="text-text-muted text-lg leading-relaxed text-justify">
              Contamos con un equipo de profesionales a nivel nacional, altamente capacitados para ofrecer asesoría personalizada y acompañamiento integral durante todo el proceso, ayudando a nuestros clientes a alcanzar sus metas financieras con seguridad y tranquilidad.
            </p>
          </div>

          {/* Derecha: CEO Info */}
          <div className="order-1 lg:order-2 flex flex-col items-center justify-center">
            <h3 className="text-2xl font-bold text-text-main mb-8 text-center uppercase tracking-widest text-brand-accent w-full border-b border-border pb-2 lg:hidden">Nuestra CEO</h3>
            
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-brand-accent shadow-2xl mb-6 bg-bg flex items-center justify-center">
              {/* Espacio para la foto corporativa. Por ahora un placeholder elegante */}
              <div className="text-center p-6">
                <span className="text-text-muted text-sm uppercase tracking-widest block mb-2">Foto Corporativa</span>
                <span className="text-4xl">👩‍💼</span>
              </div>
            </div>
            <div className="text-center bg-bg px-8 py-4 rounded-2xl shadow-sm border border-border">
              <h4 className="text-3xl font-extrabold text-text-main mb-1">Yuriam Atencia</h4>
              <p className="text-brand-accent font-bold text-lg uppercase tracking-wider">CEO - Asesora y Gestora Financiera</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
