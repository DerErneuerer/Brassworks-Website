import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Map, Coffee } from 'lucide-react';
import { Icons } from '../icons';

export function Footer() {
  return (
    <footer className="bg-card/50 border-t overflow-hidden">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Logo className="h-9 w-auto" />
            </Link>
            <p className="text-muted-foreground max-w-xs">
              Our public server thrives on cooperation between players - express your creativity freely, with each other.
            </p>
            <div className="flex gap-4 mt-6">
              <Link href="https://discord.gg/neqEBnPVgY" className="text-muted-foreground hover:text-foreground transition">
                <Icons.discord className="h-5 w-5" />
                <span className="sr-only">Discord</span>
              </Link>
              <Link href="" className="text-muted-foreground hover:text-foreground transition">
                <Coffee className="h-5 w-5" />
                <span className="sr-only">Kofi</span>
              </Link>
              <Link href="" className="text-muted-foreground hover:text-foreground transition">
                <Map className="h-5 w-5" />
                <span className="sr-only">Live Map</span>
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Seasons</h3>
            <ul className="space-y-2">
              <li><Link href="/games/minecraft" className="text-muted-foreground hover:text-foreground transition">Season 1</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Modpack</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-muted-foreground hover:text-foreground transition">Download</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Server</h3>
            <ul className="space-y-2">
              <li><Link href="/contact" className="text-muted-foreground hover:text-foreground transition">Join our Server</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-muted flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 Brassworks. All rights reserved.
          </p>
          <div className="flex">
            <Link href="/legal-notice" className="text-sm text-muted-foreground hover:text-foreground transition">
              Legal Notice
            </Link>
            <span className="px-2 text-sm text-muted-foreground">•</span>
            <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground transition">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}