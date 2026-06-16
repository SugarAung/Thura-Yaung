import Link from 'next/link';

const PLATFORM_LINKS = [
  { href: '/categories',          label: 'Categories' },
  { href: '/#how-it-works',       label: 'How It Works' },
  { href: '/register-professional', label: 'For Professionals' },
  { href: '/book',                label: 'Book a Consultation' },
];

const RESOURCE_LINKS = [
  { href: '/news',      label: 'News & Blog' },
  { href: '/community', label: 'Community' },
  { href: '/safety',    label: 'Safety Guide' },
];

const LEGAL_LINKS = [
  { href: '/safety',  label: 'Privacy Policy' },
  { href: '/safety',  label: 'Terms of Use' },
  { href: '/safety',  label: 'Contact Us' },
];

export default function Footer() {
  return (
    <footer className="bg-neutral-warm50 border-t border-neutral-warm200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🌟</span>
              <span className="font-bold text-xl text-brand-lavender-600">Thura Yaung</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
              Safe, anonymous consultations for everyone in Myanmar.
            </p>
            <p className="text-xs text-gray-400">
              ⚠️ Demo version — not for real consultations
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">Platform</h4>
            <ul className="space-y-2">
              {PLATFORM_LINKS.map(({ href, label }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-gray-500 hover:text-brand-lavender-600 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">Resources</h4>
            <ul className="space-y-2">
              {RESOURCE_LINKS.map(({ href, label }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-gray-500 hover:text-brand-lavender-600 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">Legal</h4>
            <ul className="space-y-2">
              {LEGAL_LINKS.map(({ href, label }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-gray-500 hover:text-brand-lavender-600 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-neutral-warm200 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-400">
          <p>© 2026 Thura Yaung. Frontend demo only.</p>
          <p>Built with ❤️ for Myanmar</p>
        </div>
      </div>
    </footer>
  );
}
