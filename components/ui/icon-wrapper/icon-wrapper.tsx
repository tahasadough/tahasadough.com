import { ReactNode } from 'react';

interface Props {
  icon: ReactNode;
}

export default function IconWrapper({ icon }: Props) {
  return (
    <div className='border-light-black bg-lighter-black flex size-12 items-center justify-center rounded-lg border'>
      {icon}
    </div>
  );
}
