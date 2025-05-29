import TopFooterAbout from './top-footer-about';
import TopFooterLinks from './top-footer-links';

export default function TopFooter() {
  return (
    <section className='flex flex-col space-y-6 md:flex-row md:justify-between md:space-y-0'>
      <TopFooterAbout />
      <TopFooterLinks />
    </section>
  );
}
