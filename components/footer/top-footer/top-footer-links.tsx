import Link from 'next/link';
import { FOOTER_LINKS } from '../_lib/footer.constants';

export default function TopFooterLinks() {
  return (
    <section className='z-10 grid grid-cols-2 gap-2 text-sm'>
      {FOOTER_LINKS.map((link, i) => (
        <Link
          key={i}
          href={link.href}
          target={link.target}
          className='hover:text-gray transition-all duration-500'
        >
          {link.name}
        </Link>
      ))}
    </section>
  );
}
