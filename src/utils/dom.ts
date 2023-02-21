/**
 * 根据选择器寻找元素
 * @param selector 
 */
export function findSelectorElement(selector: string) {
    return document.querySelector(selector);
}