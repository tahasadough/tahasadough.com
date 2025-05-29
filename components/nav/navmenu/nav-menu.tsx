import * as motion from 'motion/react-client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { NAV_LINKS } from '../_lib/navbar.constants';

interface Props {
  setIsToggled: (value: boolean) => void;
}

export default function NavMenu({ setIsToggled }: Props) {
  const navMenuRef = useRef(null);

  useEffect(() => {
    const navMenuNode: HTMLElement = navMenuRef.current!;
    const closeNavMenu = () => setIsToggled(false);
    const navMenuClickEventListener = navMenuNode.addEventListener(
      'click',
      (e: MouseEvent) => {
        const targetElement = e.target as HTMLElement;
        if (targetElement.classList.contains('navmenu-link')) {
          closeNavMenu();
        }
      },
    );

    return () =>
      navMenuNode.removeEventListener('click', navMenuClickEventListener!);
  }, [setIsToggled]);

  const linkStyles = 'hover:text-gray transition-all duration-500';
  return (
    <motion.div
      ref={navMenuRef}
      initial={{ height: 0 }}
      animate={{ height: 'auto' }}
      exit={{ height: 0 }}
      transition={{ duration: 0.4 }}
      className='border-light-black bg-almost-black fixed top-0 right-0 -z-10 w-full border-b'
    >
      <section className='space-y-8 px-5 pt-16 pb-10 text-lg'>
        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
          exit={{ scale: 0.5, opacity: 0 }}
          className='border-light-black border-t-2 p-1'
        ></motion.div>
        {NAV_LINKS.map((link, i) => (
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            key={i}
          >
            <Link
              key={i}
              href={link.href}
              className={`${linkStyles} navmenu-link block`}
            >
              {link.name}
            </Link>
          </motion.div>
        ))}
      </section>
    </motion.div>
  );
}
