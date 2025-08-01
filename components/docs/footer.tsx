import Link from 'next/link';

export function Footer() {
  return (
    <footer>
      <div className="pb-10">
        <div className="flex right-0 absolute mr-6">
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition">
              Terms of Service
            </Link>
            <span className="px-2 text-sm text-muted-foreground">•</span>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition">
              Privacy Policy
            </Link>
            <span className="px-2 text-sm text-muted-foreground">•</span>
            <Link href="/legal-notice" className="text-sm text-muted-foreground hover:text-foreground transition">
              Legal Notice
            </Link>
          </div>
      </div>
    </footer>
  );
}