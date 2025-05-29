import { cn } from '@/lib/utils/cn';
import { CvaBaseComponentProps } from '@/lib/types/common.type';
import { rounded } from './_lib/badge.types';
import { BADGE_VARIANTS } from './_lib/badge.constants';

interface Props extends CvaBaseComponentProps {
  rounded?: rounded;
}

export default function Badge({
  children,
  className,
  color,
  size,
  rounded,
}: Props) {
  return (
    <span className={cn(BADGE_VARIANTS({ color, size, rounded }), className)}>
      {children}
    </span>
  );
}
