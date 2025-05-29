import AboutDescription from './about-description';
import AboutImage from './about-image';

export default function About() {
  return (
    <section
      id='about'
      className='flex flex-col items-center justify-center pt-30 md:flex-col-reverse xl:flex-row xl:items-stretch xl:justify-stretch'
    >
      <AboutImage />
      <AboutDescription />
    </section>
  );
}
