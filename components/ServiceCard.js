import * as Icons from 'lucide-react';

export default function ServiceCard({ servicio }) {
  const IconComponent = Icons[servicio.icono] || Icons.HelpCircle;

  return (
    <div className="bg-surface rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-border flex flex-col h-full transform hover:-translate-y-2">
      <div className="w-14 h-14 bg-bg text-brand-accent border border-border rounded-xl flex items-center justify-center mb-6 shadow-sm">
        <IconComponent size={32} strokeWidth={1.5} />
      </div>
      
      <h3 className="text-2xl font-bold text-text-main mb-3">{servicio.titulo}</h3>
      <p className="text-text-muted mb-6 flex-grow">{servicio.descripcion_corta}</p>
      
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-text-main uppercase tracking-wider mb-3">Beneficios Principales</h4>
        <ul className="space-y-2">
          {servicio.beneficios_principales.map((beneficio, index) => (
            <li key={index} className="flex items-start">
              <Icons.CheckCircle2 className="text-brand-accent mr-2 shrink-0 mt-0.5" size={18} />
              <span className="text-text-muted text-sm">{beneficio}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-bg rounded-lg p-4 mt-auto border border-border">
        <p className="text-xs text-text-muted font-medium uppercase mb-1">Requisitos Mínimos:</p>
        <p className="text-sm text-text-main font-medium">{servicio.requisitos_minimos}</p>
      </div>
    </div>
  );
}
