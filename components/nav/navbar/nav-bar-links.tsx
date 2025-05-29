import Link from 'next/link';
import { NAV_LINKS } from '../_lib/navbar.constants';

export default function NavBarLinks() {
  return (
    <section className='hidden space-x-8 md:block'>
      {NAV_LINKS.map((link, i) => (
        <Link
          key={i}
          href={link.href}
          className='hover:text-gray transition-all duration-500'
        >
          {link.name}
        </Link>
      ))}
    </section>
  );
}
