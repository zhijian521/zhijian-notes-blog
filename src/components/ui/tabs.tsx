'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

interface TabsContextValue {
    onValueChange?: (value: string) => void;
    value: string;
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

function Tabs({
    children,
    defaultValue,
    onValueChange,
    value,
}: {
    children: React.ReactNode;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    value?: string;
}) {
    const [internalValue, setInternalValue] = React.useState(defaultValue ?? '');
    const currentValue = value ?? internalValue;

    return (
        <TabsContext.Provider
            value={{
                value: currentValue,
                onValueChange: (nextValue) => {
                    if (value === undefined) {
                        setInternalValue(nextValue);
                    }
                    onValueChange?.(nextValue);
                },
            }}
        >
            {children}
        </TabsContext.Provider>
    );
}

function TabsList({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn('inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground', className)}
            {...props}
        >
            {children}
        </div>
    );
}

function TabsTrigger({
    children,
    className,
    value,
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    value: string;
}) {
    const context = React.useContext(TabsContext);

    if (!context) {
        throw new Error('TabsTrigger must be used within Tabs.');
    }

    const active = context.value === value;

    return (
        <button
            className={cn(
                'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                active ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground',
                className,
            )}
            data-state={active ? 'active' : 'inactive'}
            onClick={() => {
                context.onValueChange?.(value);
            }}
            type='button'
            {...props}
        >
            {children}
        </button>
    );
}

function TabsContent({
    children,
    className,
    value,
    ...props
}: React.HTMLAttributes<HTMLDivElement> & {
    value: string;
}) {
    const context = React.useContext(TabsContext);

    if (!context || context.value !== value) {
        return null;
    }

    return (
        <div className={cn('mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2', className)} {...props}>
            {children}
        </div>
    );
}

export { Tabs, TabsContent, TabsList, TabsTrigger };
