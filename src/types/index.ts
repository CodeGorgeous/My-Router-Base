/**
 * 类型保护
 * @param target 
 * @returns 
 */
export function isElement(target: Element | null): target is Element {
    if (target === null) return false;
    return true;
}

export type TRouterModeFunctionReturn = () => {
    push: (path?: string) => void;
};

export * from "./interface";