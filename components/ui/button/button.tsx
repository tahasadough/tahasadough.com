import { cn } from '@/lib/utils/cn';
import { CvaBaseComponentProps } from '@/lib/types/common.type';
import { BUTTON_VARIANTS } from './_lib/button.constants';

export default function Button({
  children,
  variant,
  size,
  className,
}: CvaBaseComponentProps) {
  return (
    <button className={cn(BUTTON_VARIANTS({ variant, size }), className)}>
      {children}
    </button>
  );
}
