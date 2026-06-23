'use client';

import { useState, useEffect } from 'react';
import { Settings, Calculator } from 'lucide-react';

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
  const [showAdmin, setShowAdmin] = useState(false);
  const [showResults, setShowResults] = useState(false);

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

              {/* Botón Admin */}
              <div className="text-center">
                <button 
                  onClick={() => setShowAdmin(!showAdmin)}
                  className="text-sm text-text-muted hover:text-brand-accent flex items-center justify-center gap-1 mx-auto transition-colors"
                >
                  <Settings size={16} /> Ajustar Tasas/Plazo Mensual (Admin/Internal Use Only)
                </button>
              </div>

              {/* Panel Admin */}
              {showAdmin && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-xl border border-yellow-200 dark:border-yellow-700 max-w-sm mx-auto animate-in slide-in-from-top-2">
                  <label className="block text-sm font-bold text-text-main mb-2">Tasa de Interés Mensual (MV) %</label>
                  <input 
                    type="number" 
                    step="0.01"
                    value={tasaMensual}
                    onChange={(e) => {
                      setTasaMensual(Number(e.target.value));
                      setShowResults(false);
                    }}
                    className="w-full p-2 border border-border rounded-lg bg-bg text-text-main focus:ring-brand-accent"
                  />
                </div>
              )}

              {/* Botón Simular y Resumen */}
              <div className="pt-6 border-t border-border">
                {!showResults ? (
                  <button 
                    onClick={() => setShowResults(true)}
                    className="w-full md:w-auto mx-auto block bg-brand-accent hover:brightness-110 text-white font-bold py-4 px-12 rounded-xl transition-all shadow-lg text-xl"
                  >
                    Simular
                  </button>
                ) : (
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-border shadow-inner animate-in fade-in">
                    <h4 className="text-xl font-bold text-center mb-6">Resumen de Simulación</h4>
                    <div className="space-y-3 font-mono text-sm sm:text-base">
                      <div className="flex justify-between border-b border-border/50 pb-2">
                        <span className="text-text-muted">Tasa de Interés Mensual (MV)</span>
                        <span className="font-bold">{tasaMensual.toFixed(2)}% (Ajustable)</span>
                      </div>
                      <div className="flex justify-between border-b border-border/50 pb-2">
                        <span className="text-text-muted">Tasa de Interés Anual (EA)</span>
                        <span className="font-bold">{tasaEA.toFixed(2)}%</span>
                      </div>
                      <div className="flex justify-between border-b border-border/50 pb-2">
                        <span className="text-text-muted">Plazo Seleccionado</span>
                        <span className="font-bold">{plazo} meses</span>
                      </div>
                      <div className="flex justify-between border-b border-border/50 pb-2">
                        <span className="text-text-muted">Cuota Mensual</span>
                        <span className="font-bold text-brand-accent">{formatCurrency(cuota)}</span>
                      </div>
                      <div className="flex justify-between border-b border-border/50 pb-2">
                        <span className="text-text-muted">Total a Pagar (Intereses)</span>
                        <span className="font-bold">{formatCurrency(totalIntereses)}</span>
                      </div>
                      <div className="flex justify-between border-b border-border/50 pb-2">
                        <span className="text-text-muted">Total a Pagar (Capital + Intereses)</span>
                        <span className="font-bold">{formatCurrency(totalPagado)}</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <p className="text-center text-text-muted font-bold mt-8 uppercase tracking-widest text-sm">
                  SUJETO A ESTUDIO DE CRÉDITO
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
