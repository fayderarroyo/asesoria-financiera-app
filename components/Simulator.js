'use client';

import { useState, useEffect } from 'react';
import { Settings, Calculator, AlertTriangle, Lock, Unlock } from 'lucide-react';

const CREDIT_LINES = [
  { id: 'libranza', name: 'LIBRANZA', maxPlazo: 156, defaultTasa: 1.15, icon: '🏛️' },
  { id: 'libranza_rep', name: 'LIBRANZA REPORTADO', maxPlazo: 180, defaultTasa: 1.50, icon: '📄' },
  { id: 'vehiculo', name: 'VEHÍCULO', maxPlazo: 84, defaultTasa: 1.30, icon: '🚗' },
  { id: 'hipotecario', name: 'HIPOTECARIO', maxPlazo: 360, defaultTasa: 1.10, icon: '🏠' },
  { id: 'consumo', name: 'CONSUMO', maxPlazo: 72, defaultTasa: 1.80, icon: '🧑' }
];

export default function Simulator() {
  const [selectedLine, setSelectedLine] = useState(CREDIT_LINES[0]);
  const [monto, setMonto] = useState(50000000);
  const [plazo, setPlazo] = useState(60);
  const [tasaMensual, setTasaMensual] = useState(CREDIT_LINES[0].defaultTasa);
  
  // Admin State
  const [showAdmin, setShowAdmin] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [showResults, setShowResults] = useState(false);

  const isFirstOfMonth = new Date().getDate() === 1;

  // Update defaults when changing line
  useEffect(() => {
    setTasaMensual(selectedLine.defaultTasa);
    if (plazo > selectedLine.maxPlazo) {
      setPlazo(selectedLine.maxPlazo);
    }
    setShowResults(false);
  }, [selectedLine]);

  const handleMontoChange = (e) => {
    setMonto(Number(e.target.value));
    setShowResults(false);
  };

  const handlePlazoChange = (e) => {
    setPlazo(Number(e.target.value));
    setShowResults(false);
  };

  const handleLogin = () => {
    if (passwordInput === 'Claudia1304*') {
      setIsAdminAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Contraseña incorrecta');
    }
  };

  // Cálculos
  const i = tasaMensual / 100;
  const cuota = i === 0 
    ? monto / plazo 
    : (monto * i) / (1 - Math.pow(1 + i, -plazo));
    
  const totalPagado = cuota * plazo;
  const totalIntereses = totalPagado - monto;
  const tasaEA = (Math.pow(1 + i, 12) - 1) * 100;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value);
  };

  return (
    <section className="py-20 bg-surface border-y border-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-text-main mb-4 uppercase tracking-wide flex items-center justify-center gap-3">
            <Calculator className="text-brand-accent" size={36} /> SIMULADOR
          </h2>
          <p className="text-xl text-text-muted">Proyecta tu crédito y conoce el valor estimado de tus cuotas mensuales.</p>
        </div>

        <div className="bg-bg rounded-3xl shadow-xl border border-border overflow-hidden">
          {/* Tabs */}
          <div className="flex flex-wrap border-b border-border bg-surface">
            {CREDIT_LINES.map((line) => (
              <button
                key={line.id}
                onClick={() => setSelectedLine(line)}
                className={`flex-1 py-4 px-2 text-center font-bold text-sm sm:text-base border-b-4 transition-colors flex items-center justify-center gap-2 ${
                  selectedLine.id === line.id 
                    ? 'border-brand-accent text-brand-accent bg-bg' 
                    : 'border-transparent text-text-muted hover:bg-bg/50 hover:text-text-main'
                }`}
              >
                <span className="text-xl hidden sm:inline">{line.icon}</span>
                {line.name}
              </button>
            ))}
          </div>

          <div className="p-6 md:p-10">
            {/* Controles Principales */}
            <div className="space-y-10">
              
              {/* Monto */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-xl font-bold text-text-main">1. Ingrese Monto (COP):</label>
                  <div className="bg-surface px-4 py-2 rounded-xl border border-border font-mono font-bold text-lg text-text-main">
                    {formatCurrency(monto)}
                  </div>
                </div>
                <input 
                  type="range" 
                  min="1000000" 
                  max="500000000" 
                  step="1000000"
                  value={monto} 
                  onChange={handleMontoChange}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-accent"
                />
              </div>

              {/* Plazo */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-xl font-bold text-text-main">2. Plazo (Meses):</label>
                  <div className="text-right">
                    <div className="bg-surface px-4 py-2 rounded-xl border border-border font-mono font-bold text-lg text-text-main inline-block">
                      {plazo}
                    </div>
                    <div className="text-xs text-text-muted mt-1 font-medium">Plazo Máximo: {selectedLine.maxPlazo} meses</div>
                  </div>
                </div>
                <input 
                  type="range" 
                  min="12" 
                  max={selectedLine.maxPlazo} 
                  step="1"
                  value={plazo} 
                  onChange={handlePlazoChange}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-accent"
                />
              </div>

              {/* Cuota Estimada Básica */}
              <div className="bg-surface p-6 rounded-2xl border border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                <label className="text-xl font-bold text-text-main">3. Cuota Mensual Estimada:</label>
                <div className="text-3xl font-extrabold text-brand-accent">
                  {formatCurrency(cuota)}
                </div>
              </div>

              {/* Panel Admin Toggle */}
              <div className="text-center pt-4">
                <button 
                  onClick={() => setShowAdmin(!showAdmin)}
                  className="text-sm text-text-muted hover:text-brand-accent flex items-center justify-center gap-2 mx-auto transition-colors font-bold uppercase tracking-wider"
                >
                  <Settings size={16} /> Panel de Ajuste de Tasas
                </button>
                
                {isFirstOfMonth && (
                  <div className="mt-4 inline-flex items-center gap-2 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 px-4 py-2 rounded-full text-sm font-bold animate-pulse">
                    <AlertTriangle size={16} /> RECORDATORIO: Es día 1. ¡Actualiza las tasas del mes!
                  </div>
                )}
              </div>

              {/* Contenedor Admin Seguro */}
              {showAdmin && (
                <div className="bg-[#111] dark:bg-gray-900 p-6 rounded-2xl border border-[#333] max-w-md mx-auto animate-in slide-in-from-top-2 shadow-2xl relative overflow-hidden">
                  {/* Patrón de seguridad de fondo */}
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none"></div>
                  
                  {!isAdminAuthenticated ? (
                    <div className="relative z-10 flex flex-col gap-4">
                      <div className="flex items-center gap-2 text-white font-bold mb-2">
                        <Lock className="text-brand-accent" size={20} /> Acceso Restringido
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 uppercase tracking-widest block mb-2">Contraseña de Administrador:</label>
                        <input 
                          type="password"
                          value={passwordInput}
                          onChange={(e) => {
                            setPasswordInput(e.target.value);
                            setAuthError('');
                          }}
                          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                          className="w-full p-3 border border-[#444] rounded-xl bg-black text-white focus:ring-2 focus:ring-brand-accent outline-none"
                          placeholder="••••••••••••"
                        />
                      </div>
                      {authError && <span className="text-xs text-red-500 font-bold bg-red-500/10 p-2 rounded">{authError}</span>}
                      <button 
                        onClick={handleLogin}
                        className="bg-brand-accent text-white font-bold py-3 rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2 mt-2"
                      >
                        <Unlock size={18} /> Desbloquear Panel
                      </button>
                    </div>
                  ) : (
                    <div className="relative z-10">
                      <div className="flex justify-between items-center mb-6 border-b border-[#333] pb-4">
                        <div className="flex items-center gap-2 text-white font-bold">
                          <Unlock className="text-green-500" size={20} /> Panel Desbloqueado
                        </div>
                        <button 
                           onClick={() => { setIsAdminAuthenticated(false); setShowAdmin(false); setPasswordInput(''); }}
                           className="text-xs text-gray-400 hover:text-red-500 transition-colors uppercase font-bold"
                        >Cerrar Sesión</button>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="bg-black/50 p-4 rounded-xl border border-[#333]">
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Tasa Mensual (MV) % Actual</label>
                          <div className="flex items-center justify-between text-brand-accent font-bold text-xl mb-4">
                            {selectedLine.name}
                          </div>
                          <div className="flex items-center gap-3">
                            <input 
                              type="number" 
                              step="0.01"
                              value={tasaMensual}
                              onChange={(e) => {
                                setTasaMensual(Number(e.target.value));
                                setShowResults(false);
                              }}
                              className="w-full p-3 border border-[#444] rounded-xl bg-black text-white focus:ring-2 focus:ring-brand-accent text-lg outline-none"
                            />
                            <span className="text-white text-xl font-bold">%</span>
                          </div>
                        </div>
                        
                        <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-xl text-xs text-blue-300">
                          <strong>Nota Importante:</strong> Esta actualización de tasa por el momento solo es válida para esta sesión del navegador. Para que la tasa quede guardada permanentemente para todos los clientes, conectaremos esta sección a la base de datos (Supabase) en el siguiente paso.
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Botón Simular y Resumen */}
              <div className="pt-6 border-t border-border mt-8">
                {!showResults ? (
                  <button 
                    onClick={() => setShowResults(true)}
                    className="w-full md:w-auto mx-auto block bg-brand-accent hover:brightness-110 text-white font-bold py-4 px-12 rounded-xl transition-all shadow-lg text-xl"
                  >
                    Simular Crédito
                  </button>
                ) : (
                  <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl border border-border shadow-inner animate-in fade-in">
                    <h4 className="text-2xl font-extrabold text-center mb-8 text-text-main border-b border-border pb-4">Resumen de Simulación</h4>
                    <div className="space-y-4 font-mono text-sm sm:text-base">
                      <div className="flex justify-between border-b border-border/50 pb-3">
                        <span className="text-text-muted">Línea de Crédito</span>
                        <span className="font-bold text-text-main">{selectedLine.name}</span>
                      </div>
                      <div className="flex justify-between border-b border-border/50 pb-3">
                        <span className="text-text-muted">Tasa de Interés Mensual (MV)</span>
                        <span className="font-bold text-text-main">{tasaMensual.toFixed(2)}%</span>
                      </div>
                      <div className="flex justify-between border-b border-border/50 pb-3">
                        <span className="text-text-muted">Tasa de Interés Anual (EA)</span>
                        <span className="font-bold text-text-main">{tasaEA.toFixed(2)}%</span>
                      </div>
                      <div className="flex justify-between border-b border-border/50 pb-3">
                        <span className="text-text-muted">Plazo Seleccionado</span>
                        <span className="font-bold text-text-main">{plazo} meses</span>
                      </div>
                      <div className="flex justify-between border-b border-border/50 pb-3 items-center">
                        <span className="text-text-muted">Cuota Mensual</span>
                        <span className="font-extrabold text-xl text-brand-accent bg-brand-accent/10 px-3 py-1 rounded-lg">{formatCurrency(cuota)}</span>
                      </div>
                      <div className="flex justify-between border-b border-border/50 pb-3">
                        <span className="text-text-muted">Total a Pagar (Intereses)</span>
                        <span className="font-bold text-text-main">{formatCurrency(totalIntereses)}</span>
                      </div>
                      <div className="flex justify-between border-b border-border/50 pb-3">
                        <span className="text-text-muted">Total a Pagar (Capital + Intereses)</span>
                        <span className="font-bold text-text-main">{formatCurrency(totalPagado)}</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <p className="text-center text-text-muted font-bold mt-8 uppercase tracking-widest text-sm bg-surface p-3 rounded-xl border border-border">
                  ⚠️ SUJETO A ESTUDIO DE CRÉDITO Y POLÍTICAS DE LA ENTIDAD
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
