import { cva } from 'class-variance-authority';

export const BUTTON_VARIANTS = cva(
  'cursor-pointer rounded-3xl px-8 py-[0.63rem] font-bold transition-all duration-500 hover:bg-white hover:text-almost-black',
  {
    variants: {
      variant: {
        default: 'bg-almost-black',
        outline: 'border-gray border',
      },
      size: {
        default: 'px-4 py-2',
        sm: 'px-3 py-1',
        lg: 'px-6 py-3 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);
