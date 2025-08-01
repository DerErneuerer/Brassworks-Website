'use client';

import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '@/lib/utils';

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    progressColor?: string;
    value?: number;
    animateOnMount?: boolean;
  }
>(({ className, value = 0, progressColor = "bg-primary", animateOnMount = true, ...props }, ref) => {
  const [internalValue, setInternalValue] = React.useState(animateOnMount ? 0 : value);

  React.useEffect(() => {
    if (animateOnMount) {
      const timeout = setTimeout(() => {
        setInternalValue(value);
      }, 50);
      return () => clearTimeout(timeout);
    } else {
      setInternalValue(value);
    }
  }, [value, animateOnMount]);

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        'relative h-4 w-full overflow-hidden rounded-full bg-secondary',
        className
      )}
      {...props}
      value={internalValue}
    >
      <ProgressPrimitive.Indicator
        className={cn('h-full w-full flex-1 transition-transform duration-300 ease-out', progressColor)}
        style={{ transform: `translateX(-${100 - internalValue}%)` }}
      />
    </ProgressPrimitive.Root>
  );
});

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };