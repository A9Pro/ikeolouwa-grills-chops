import { Playfair_Display, Cormorant_Garamond, Lora } from 'next/font/google';
import './globals.css';
import Header from '../components/Header';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-playfair' });
const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '600', '700'], variable: '--font-cormorant' });
const lora = Lora({ subsets: ['latin'], weight: ['400', '700'], style: ['normal', 'italic'], variable: '--font-lora' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${cormorant.variable} ${lora.variable}`}>
      <body className="min-h-screen bg-[#f9f9f9]">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}