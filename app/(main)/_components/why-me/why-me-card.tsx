import { ReactNode } from 'react';
import { CvaBaseComponentProps } from '@/lib/types/common.type';
import Card from '@/components/ui/card/card';
import IconWrapper from '@/components/ui/icon-wrapper/icon-wrapper';

interface Props extends CvaBaseComponentProps {
  icon?: ReactNode;
  title: string;
}

export default function WhyMeCard({ icon, title, children }: Props) {
  return (
    <Card>
      <section className='space-y-6'>
        <IconWrapper icon={icon} />
        <h3 className='text-xl'>{title}</h3>
        <p className='text-[16px] text-[--gray]'>{children}</p>
      </section>
    </Card>
  );
}
