'use client';

import { useState } from 'react';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

export default function LeadForm({ servicios }) {
  const [formData, setFormData] = useState({
    nombre: '',
    cedula: '',
    telefono: '',
    monto: '',
    tipo_credito: ''
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/prospectos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ocurrió un error al enviar la solicitud.');
      }

      setStatus('success');
      setFormData({ nombre: '', cedula: '', telefono: '', monto: '', tipo_credito: '' });
    } catch (error) {
      setStatus('error');
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="bg-surface rounded-3xl p-8 md:p-10 shadow-2xl border border-border relative overflow-hidden transition-colors duration-300">
      <div className="absolute top-0 left-0 w-full h-2 bg-brand-accent"></div>
      
      <h3 className="text-3xl font-extrabold text-text-main mb-2">Solicita tu Crédito</h3>
      <p className="text-text-muted mb-8">Completa el formulario y un asesor te contactará en breve.</p>

      {status === 'success' ? (
        <div className="bg-green-50/10 border border-green-500/20 rounded-2xl p-8 text-center animate-in fade-in zoom-in duration-500">
          <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
          <h4 className="text-xl font-bold text-green-500 mb-2">¡Solicitud Enviada!</h4>
          <p className="text-green-600/80">Hemos recibido tus datos correctamente. Muy pronto nos pondremos en contacto contigo.</p>
          <button 
            onClick={() => setStatus('idle')}
            className="mt-6 text-green-600 font-semibold hover:text-green-500 underline"
          >
            Enviar nueva solicitud
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="nombre" className="block text-sm font-semibold text-text-main mb-1">Nombre Completo</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              required
              value={formData.nombre}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition-colors outline-none text-text-main bg-bg"
              placeholder="Ej. Juan Pérez"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="cedula" className="block text-sm font-semibold text-text-main mb-1">Cédula</label>
              <input
                type="text"
                id="cedula"
                name="cedula"
                required
                value={formData.cedula}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition-colors outline-none text-text-main bg-bg"
                placeholder="Número de documento"
              />
            </div>
            <div>
              <label htmlFor="telefono" className="block text-sm font-semibold text-text-main mb-1">Teléfono Móvil</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                required
                value={formData.telefono}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition-colors outline-none text-text-main bg-bg"
                placeholder="Ej. 3001234567"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="monto" className="block text-sm font-semibold text-text-main mb-1">Monto a Solicitar ($)</label>
              <input
                type="number"
                id="monto"
                name="monto"
                min="500000"
                required
                value={formData.monto}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition-colors outline-none text-text-main bg-bg"
                placeholder="Ej. 5000000"
              />
            </div>
            <div>
              <label htmlFor="tipo_credito" className="block text-sm font-semibold text-text-main mb-1">Tipo de Crédito</label>
              <select
                id="tipo_credito"
                name="tipo_credito"
                required
                value={formData.tipo_credito}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition-colors outline-none text-text-main bg-bg"
              >
                <option value="" disabled>Selecciona un servicio</option>
                {servicios.map((s) => (
                  <option key={s.id} value={s.titulo}>{s.titulo}</option>
                ))}
              </select>
            </div>
          </div>

          {status === 'error' && (
            <div className="bg-red-500/10 text-red-500 border border-red-500/20 p-4 rounded-xl flex items-start gap-3">
              <AlertCircle className="shrink-0 mt-0.5" size={18} />
              <p className="text-sm">{errorMessage}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-brand-accent hover:opacity-90 text-white font-bold py-4 rounded-xl transition-all shadow-lg flex justify-center items-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Procesando...
              </>
            ) : (
              'Enviar Solicitud'
            )}
          </button>
          <p className="text-xs text-center text-text-muted mt-4">
            Tus datos están protegidos y serán tratados conforme a nuestra política de privacidad.
          </p>
        </form>
      )}
    </div>
  );
}
