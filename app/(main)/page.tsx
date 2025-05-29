import About from './_components/about/about';
import Contact from './_components/contact/contact';
import HeroSection from './_components/hero-section/hero-section';
import WhyMe from './_components/why-me/why-me';

function HomePage() {
  return (
    <>
      <section className='container'>
        <HeroSection />
        <About />
        <WhyMe />
      </section>
      <Contact />
    </>
  );
}

export default HomePage;
