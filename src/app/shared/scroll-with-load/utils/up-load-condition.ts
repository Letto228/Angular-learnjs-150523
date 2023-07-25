import {SCROLL_CONST} from '../scroll-const';

export function upLoadCondition(scrollTop: number, prevScrollTop: number): boolean {
    const nearUpBorder = scrollTop < SCROLL_CONST;
    // true, когда попадаем в диапазон 0 - SCROLL_CONST
    const scrollUpContinue = scrollTop < prevScrollTop;
    // проверяет направление, выбросит false если промотка направлена вниз

    return nearUpBorder && scrollUpContinue;
}
