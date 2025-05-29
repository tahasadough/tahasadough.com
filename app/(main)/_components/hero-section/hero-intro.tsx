import Badge from '@/components/ui/badge/badge';
import Button from '@/components/ui/button/button';
import Link from 'next/link';

export default function HeroIntro() {
  return (
    <section className='flex flex-col items-center justify-center gap-9'>
      <Badge>Hello,I&apos;m Taha 👋</Badge>
      <h1 className='text-center text-[2rem] leading-none sm:text-[3rem] md:text-[4rem] lg:text-[4.3rem]'>
        Software Engineer{' '}
        <span className='text-[--gray]'>
          Developing High-Performance & Scalable Applications
        </span>
      </h1>
      <div className='flex justify-center'>
        <Link
          href='https://github.com/tahasadough'
          target='_blank'
          className='py-2'
        >
          <Button variant='outline'>Connect me</Button>
        </Link>
      </div>
    </section>
  );
}
