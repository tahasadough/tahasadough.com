import Link from 'next/link';
import Image from 'next/image';

export default function GitHubLink() {
  return (
    <Link
      href='https://github.com/tahasadough'
      target='_blank'
      className='flex items-center gap-2'
    >
      <Image
        src='/taha-sadough.webp'
        width={25}
        height={25}
        alt='profile-image'
        className='rounded-full object-cover'
      />
      <h2 className='font-bold'>Taha Sadough</h2>
    </Link>
  );
}
