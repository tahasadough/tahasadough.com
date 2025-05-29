import Icon from '@/components/icon/icon';
import Badge from '@/components/ui/badge/badge';
import WhyMeCard from './why-me-card';

export default function WhyMe() {
  return (
    <section className='flex flex-col items-center justify-center gap-10 py-16'>
      <Badge>Why me?</Badge>
      <h2 className='px-2 text-center text-[32px] leading-none lg:px-0 lg:text-5xl'>
        I create epic apps that <span className='text-[--gray]'>spark</span>{' '}
        your imagination!
      </h2>
      <section className='grid gap-8 md:grid-cols-3'>
        <WhyMeCard icon={<Icon.Watch />} title='Efficient Workflow'>
          Streamlined developing process for rapid deliver without compromising
          quality or detail.
        </WhyMeCard>
        <WhyMeCard title='Collaborative Process' icon={<Icon.Chat />}>
          I work closely with you, integrating your feedback to create fantastic
          softwares and amazing experiences
        </WhyMeCard>
        <WhyMeCard title='Attention to Detail' icon={<Icon.Search />}>
          Meticulous attention to everything, ensuring a polished and cohesive
          final application that impresses.
        </WhyMeCard>
      </section>
    </section>
  );
}
