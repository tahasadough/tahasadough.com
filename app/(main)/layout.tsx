import Footer from '@/components/footer/footer';
import NavBar from '@/components/nav/navbar/nav-bar';
import { ReactNode } from 'react';

export default function MainLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <header className='lg:container'>
        <NavBar />
      </header>
      <main>{children}</main>
      <footer className='container'>
        <Footer />
      </footer>
    </>
  );
}
