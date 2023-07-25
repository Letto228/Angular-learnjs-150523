import {SCROLL_CONST} from '../scroll-const';

export function bottomLoadCondition(
    scrollTop: number,
    lowerScrollPosition: number,
    prevScrollTop: number,
): boolean {
    const nearBotttomBorder = lowerScrollPosition - scrollTop < SCROLL_CONST;
    // true, когда до нижней границы останется меньше значения SCROLL_CONST;
    const bottomScrollContinue = scrollTop > prevScrollTop;
    // Проверяет направление промотки, и не даёт сработать если промотка идёт вверх.

    return nearBotttomBorder && bottomScrollContinue;
}
