'use client';
import { ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { LENIS_DEFAULT_OPTIONS } from './_lib/lenis.constants';
import { InitializeLenis } from './_lib/lenis.utils';
import { LenisOptions } from 'lenis';

interface Props {
  children: ReactNode;
  options?: LenisOptions;
}

export default function LenisProvider({
  children,
  options = LENIS_DEFAULT_OPTIONS,
}: Props) {
  const pathname = usePathname();

  useEffect(() => {
    const lenis = InitializeLenis(options);

    window.onbeforeunload = () => {
      lenis.scrollTo(0, { immediate: true });
    };

    return () => {
      lenis.destroy();
    };
  }, [options, pathname]);

  return <>{children}</>;
}
