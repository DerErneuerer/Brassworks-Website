import './../globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/docs/header';
import { Footer } from '@/components/docs/footer';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '572 : HOSTING : DOCS',
  description: 'Powerful and customizable game server hosting with dynamic scaling, smart resource management, and easy setup for all skill levels.',
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
            <main className="flex-1 md:ml-[17rem]">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}