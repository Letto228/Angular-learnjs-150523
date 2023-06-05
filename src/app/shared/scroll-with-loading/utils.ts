import {borderOffset} from './border-offset';

export function isNeedScrollToTop(scrollTop: number, prevScroll: number): boolean {
    return scrollTop < borderOffset && scrollTop < prevScroll;
}

export function isNeedScrollToBottom(
    scrollTop: number,
    lowerScrollPosition: number,
    prevScroll: number,
): boolean {
    return lowerScrollPosition - scrollTop < borderOffset && scrollTop > prevScroll;
}
