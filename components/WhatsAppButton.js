import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const phoneNumber = "573000000000"; // Reemplazar con el número real
  const message = encodeURIComponent("¡Hola! Estoy interesado en los servicios financieros y me gustaría recibir más información.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 hover:scale-110 transition-all duration-300 z-50 flex items-center justify-center group"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={28} />
      <span className="absolute right-16 bg-white text-gray-800 px-3 py-1.5 rounded-lg shadow-lg text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        ¿Necesitas ayuda?
      </span>
    </a>
  );
}
