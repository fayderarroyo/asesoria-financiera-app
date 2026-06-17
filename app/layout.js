import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Soluciones Financieras - Tu Crédito Ideal',
  description: 'Encuentra el crédito perfecto para ti. Créditos de libranza, consumo, vehículo, hipotecario y compra de cartera.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="scroll-smooth scroll-pt-24">
      <body className={`${inter.className} antialiased text-text-main bg-bg`}>
        {children}
      </body>
    </html>
  );
}
