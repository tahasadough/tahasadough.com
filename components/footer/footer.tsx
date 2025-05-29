import BottomFooter from './bottom-footer/bottom-footer';
import TopFooter from './top-footer/top-footer';

export default function Footer() {
  return (
    <section className='pt-16 pb-12'>
      <TopFooter />
      <div className='bg-light-black my-10 h-[1px]'></div>
      <BottomFooter />
    </section>
  );
}
