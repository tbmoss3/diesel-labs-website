import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 border-t border-zinc-800/50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <span className="text-xl font-bold text-white">Diesel Labs</span>
            </Link>
            <p className="text-zinc-500 text-sm max-w-md">
              AI solutions for businesses that want results, not research projects. 
              We bridge the gap between AI hype and real business value.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-zinc-500 hover:text-emerald-400 text-sm transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-zinc-500 hover:text-emerald-400 text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-zinc-500 hover:text-emerald-400 text-sm transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="mailto:info@diesel.dev" 
                  className="text-zinc-500 hover:text-emerald-400 text-sm transition-colors"
                >
                  info@diesel.dev
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-zinc-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-600 text-sm">
            © {currentYear} Diesel Labs. All rights reserved.
          </p>
          <p className="text-zinc-700 text-xs">
            Build. Maintain. Monitor.
          </p>
        </div>
      </div>
    </footer>
  );
}
