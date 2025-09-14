import { Playfair_Display, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import Header from '../components/Header';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-playfair' });
const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-cormorant' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${cormorant.variable}`}>
      <body className="min-h-screen bg-[#f9f9f9] pt-16">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}