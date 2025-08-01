import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Facebook, Twitter, Github } from 'lucide-react';
import { Icons } from '../icons';
import Tooltip from '../tooltip';

export function Footer() {
  return (
    <footer className="bg-card/50 border-t overflow-hidden">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Logo className="h-9 w-9" />
              <span className="font-bold text-lg">572</span>
            </Link>
            <p className="text-muted-foreground max-w-xs">
              Flexible game server hosting with hourly billing. Pay only for what you use, with no long-term contracts.
            </p>
            <div className="flex gap-4 mt-6">
              <Link href="https://twitter.com" className="text-muted-foreground hover:text-foreground transition">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="https://facebook.com" className="text-muted-foreground hover:text-foreground transition">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://instagram.com" className="text-muted-foreground hover:text-foreground transition">
                <Github className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://discord.com" className="text-muted-foreground hover:text-foreground transition">
                <Icons.discord className="h-5 w-5" />
                <span className="sr-only">Discord</span>
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Games</h3>
            <ul className="space-y-2">
              <li><Link href="/games/minecraft" className="text-muted-foreground hover:text-foreground transition">Minecraft</Link></li>
              <li><Link href="/games/ark" className="text-muted-foreground hover:text-foreground transition">ARK</Link></li>
              <li><Link href="/games/valheim" className="text-muted-foreground hover:text-foreground transition">Valheim</Link></li>
              <li><Link href="/games/counter-strike" className="text-muted-foreground hover:text-foreground transition">Counter-Strike 2</Link></li>
              <li><Link href="/games/rust" className="text-muted-foreground hover:text-foreground transition">Rust</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-muted-foreground hover:text-foreground transition">About Us</Link></li>
              <li><Link href="/how-it-works" className="text-muted-foreground hover:text-foreground transition">How It Works</Link></li>
              <li><Link href="/pricing" className="text-muted-foreground hover:text-foreground transition">Pricing</Link></li>
              <li><Link href="/features" className="text-muted-foreground hover:text-foreground transition">Features</Link></li>
              <li><Link href="/faq" className="text-muted-foreground hover:text-foreground transition">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/contact" className="text-muted-foreground hover:text-foreground transition">Contact Us</Link></li>
              <li><Link href="/documentation" className="text-muted-foreground hover:text-foreground transition">Documentation</Link></li>
              <li><Link href="/status" className="text-muted-foreground hover:text-foreground transition">System Status</Link></li>
              <li><Link href="/terms" className="text-muted-foreground hover:text-foreground transition">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-muted-foreground hover:text-foreground transition">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Payment Methods Icons */}
        <div className="mt-8">
          <h3 className="font-medium mb-3">Payment Methods</h3>
          <div className="flex gap-2">
            <Tooltip text="Visa" position="bottom">
              <img src="/icons/visa-icon.svg" alt="Visa" className="h-auto w-[2.8rem]" />
            </Tooltip>
            <Tooltip text="Mastercard" position="bottom">
              <img src="/icons/mastercard-icon.svg" alt="MasterCard" className="h-auto w-[2.8rem]" />
            </Tooltip>
            <Tooltip text="PayPal" position="bottom">
              <img src="/icons/paypal-icon.svg" alt="PayPal" className="h-auto w-[2.8rem]" />
            </Tooltip>
            <Tooltip text="Google Pay" position="bottom">
              <img src="/icons/google-pay-icon.svg" alt="Google Pay" className="h-auto w-[2.8rem]" />
            </Tooltip>
            <Tooltip text="Apple Pay" position="bottom">
              <img src="/icons/apple-pay-icon.svg" alt="Apple Pay" className="h-auto w-[2.8rem]" />
            </Tooltip>
            <Tooltip text="Klarna" position="bottom">
             <img src="/icons/klarna-icon.svg" alt="Klarna" className="h-auto w-[2.8rem]" />
            </Tooltip>
            <Tooltip text="PaySafeCard" position="bottom">
              <img src="/icons/paysafecard-icon.svg" alt="PaySafeCard" className="h-auto w-[2.8rem]" />
            </Tooltip>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-muted flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 572 Hosting UG. All rights reserved. Prices incl. VAT
          </p>
          <div className="flex">
            <Link href="/terms-of-service" className="text-sm text-muted-foreground hover:text-foreground transition">
              Terms of Service
            </Link>
            <span className="px-2 text-sm text-muted-foreground">•</span>
            <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground transition">
              Privacy Policy
            </Link>
            <span className="px-2 text-sm text-muted-foreground">•</span>
            <Link href="/legal-notice" className="text-sm text-muted-foreground hover:text-foreground transition">
              Legal Notice
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}