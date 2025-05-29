import type { Metadata } from 'next';
import './globals.css';
import { ReactNode } from 'react';
import LenisProvider from '@/lib/providers/lenis/lenis-provider';
import GsapProvider from '@/lib/providers/gsap-provider';
import MouseTrailProvider from '@/lib/providers/mouse-trail-provider';

export const metadata: Metadata = {
  title: 'Taha Sadough',
  description: 'Developing High-Performance & Scalable Applications',
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang='en' className='overflow-x-hidden md:overflow-auto'>
      <body className='overflow-x-hidden bg-black text-white antialiased select-none md:overflow-auto'>
        <LenisProvider>
          <GsapProvider>
            <MouseTrailProvider>{children}</MouseTrailProvider>
          </GsapProvider>
        </LenisProvider>
      </body>
    </html>
  );
}

// Base UI & UX by a template (proxio template) (some sections)
