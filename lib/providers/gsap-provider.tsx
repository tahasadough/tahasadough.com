'use client';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { HeroSectionAnimations } from '@/app/(main)/_components/hero-section/_lib/hero-section.animation';
import { ScrollTrigger } from 'gsap/all';
import { ReactNode } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function GsapProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  useGSAP(() => {
    HeroSectionAnimations();
  }, []);

  return <>{children}</>;
}
