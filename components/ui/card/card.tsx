import { PropsWithChildren } from 'react';

export default function Card({ children }: PropsWithChildren) {
  return (
    <div className='border-light-black bg-almost-black rounded-2xl border px-8 py-10'>
      {children}
    </div>
  );
}
