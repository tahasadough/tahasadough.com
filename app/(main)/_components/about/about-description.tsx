import Badge from '@/components/ui/badge/badge';

export default function AboutDescription() {
  return (
    <section className='space-y-8 py-10 md:px-10'>
      <div className='flex justify-start md:justify-center'>
        <Badge>About</Badge>
      </div>
      <h2 className='text-2xl text-[--gray] md:text-center md:text-4xl lg:text-5xl'>
        I&apos;m a <span className='text-white'>Software Engineer</span>
      </h2>
      <p className='text-[16px] text-[--gray] md:text-center'>
        I specialize in web development, My expertise lies in leveraging modern
        technologies and frameworks, including Nest js, Next js, Angular, React,
        Express js and Go. I am passionate about staying up-to-date with the
        latest technologies and continuously expanding my skill set.
      </p>
    </section>
  );
}
