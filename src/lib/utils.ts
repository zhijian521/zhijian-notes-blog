import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/*== 合并 CSS 类名，先通过 clsx 解析条件类，再用 tailwind-merge 去重冲突的 Tailwind 类。 用于组件中动态组合 className。 ==*/
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
