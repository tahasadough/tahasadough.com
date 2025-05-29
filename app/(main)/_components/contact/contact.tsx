import Button from '@/components/ui/button/button';
import Badge from '@/components/ui/badge/badge';
import Image from 'next/image';
import Link from 'next/link';

export default function Contact() {
  return (
    <section
      id='contact'
      className='relative flex flex-col items-center justify-center gap-7 py-32'
    >
      <Badge>Contact</Badge>
      <h2 className='text-center text-[32px] lg:text-5xl'>
        <span className='text-gray'>Let&apos;s Get </span>in Touch
      </h2>
      <p className='text-gray text-center text-[16px]'>
        Let&apos;s start ASAP.
      </p>
      <Link
        href='https://github.com/tahasadough'
        target='_blank'
        className='z-40'
      >
        <Button variant='outline'>Connect me</Button>
      </Link>
      <div className='absolute inset-0 -z-10 h-full bg-black opacity-90'></div>
      <div className='from-almost-black absolute -top-20 left-0 h-[40%] w-full bg-gradient-to-br to-black blur-3xl'></div>
      <div className='from-almost-black absolute top-98 bottom-0 left-0 h-[30%] w-full bg-gradient-to-br to-black blur-3xl'></div>

      <Image
        src='/metalic-shape-background.webp'
        alt='metalic-shape-background'
        fill
        className='absolute inset-0 -z-20 size-full object-cover'
      />
    </section>
  );
}
