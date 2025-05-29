import HeroIntro from './hero-intro';
import { HeroMetalicFlower } from './hero-metalic-flower';

export default function Hero() {
  return (
    <section className='flex flex-col items-center justify-center space-y-[45px] px-2 pt-36 pb-10 md:space-y-[64px] md:px-8 md:pt-[120px] md:pb-0 lg:space-y-[100px] lg:px-10 lg:pt-[140px]'>
      <HeroIntro />
      <HeroMetalicFlower />
    </section>
  );
}
