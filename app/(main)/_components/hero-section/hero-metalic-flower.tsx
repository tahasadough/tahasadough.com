import Image from 'next/image';
import * as motion from 'motion/react-client';

export function HeroMetalicFlower() {
  return (
    <section className='relative -z-50 shadow-2xl'>
      <div id='metalic-flower-wrapper'>
        <motion.section
          initial={{ rotate: -65, y: 30 }}
          animate={{ y: 0, rotate: 0, scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className='opacity-0'
        >
          <Image
            decoding='async'
            width={500}
            height={500}
            sizes='500'
            src='/metalic-flower.webp'
            alt='Grey-metallic-flower-shaped-object'
            className='object-cover'
          ></Image>
          <div className='absolute top-0 -z-50 w-full rounded-full bg-white py-64 opacity-10 blur-3xl'></div>
        </motion.section>
      </div>
      <div className='from-almost-black absolute top-[40%] z-50 h-[600px] w-full bg-gradient-to-tr to-black opacity-85 blur-3xl'></div>
      <div className='from-almost-black absolute top-[80%] z-50 h-[600px] w-full bg-gradient-to-tr to-black blur-3xl'></div>
    </section>
  );
}
