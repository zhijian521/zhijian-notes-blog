import * as React from 'react';

import { cn } from '@/lib/utils';

const ScrollArea = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => {
        return <div className={cn('overflow-auto', className)} ref={ref} {...props} />;
    },
);
ScrollArea.displayName = 'ScrollArea';

export { ScrollArea };
