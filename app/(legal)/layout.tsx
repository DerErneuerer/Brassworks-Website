import '../globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/legal/header';
import { Footer } from '@/components/general/footer';
import { Toaster } from '@/components/ui/toaster';
import { Banner } from '@/components/legal/banner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '572 : HOSTING : HOME',
  description:
    'Powerful and customizable game server hosting with dynamic scaling, smart resource management, and easy setup for all skill levels.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="flex min-h-screen flex-col">
            <Header />
            <Banner />
            <main className="flex-1 overflow-hidden">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}