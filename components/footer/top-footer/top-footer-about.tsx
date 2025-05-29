import GitHubLink from '@/components/github-link/github-link';
import Link from 'next/link';

export default function TopFooterAbout() {
  return (
    <section className='space-y-3'>
      <GitHubLink />
      <p className='w-[60%] text-sm'>
        Software Engineer | Developing High-Performance & Scalable Applications
      </p>
      <Link
        href='mailto:tsadough.eng@gmail.com'
        className='hover:text-gray transition-all duration-500'
      >
        tsadough.eng@gmail.com
      </Link>
    </section>
  );
}
