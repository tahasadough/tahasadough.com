import Lenis from 'lenis';
import { LenisOptions } from 'lenis';

export function InitializeLenis(options: LenisOptions) {
  const lenis = new Lenis(options);

  const raf = (time: number) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };

  requestAnimationFrame(raf);

  return lenis;
}
