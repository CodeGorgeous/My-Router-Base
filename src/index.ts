import { IRouteItem, TRouterModeFunctionReturn } from "./types";
import { findSelectorElement } from "./utils/dom";
import { warn } from "./utils/warn";
import { createHashRouter } from "./mode/hash";
import { createHistoryRouter } from "./mode/history";
import { createAbstractRouter } from "./mode/abstract";

export let _rootElement: Element | null = null,
    _globalRoutes: IRouteItem[] = [],
    _router: ReturnType<TRouterModeFunctionReturn>;
const routerModeMap = new Map<string, TRouterModeFunctionReturn>([
    ["hash", createHashRouter],
    ["history", createHistoryRouter],
    ["abstract", createAbstractRouter],
]);

/**
 * 创建路由
 * @param options 
 */
export function createRouter(options: {
    routes: IRouteItem[],
    mode: "hash" | "history" | "abstract",
    root: Element | string
}) {
    let router: ReturnType<TRouterModeFunctionReturn> = {
        push: (path?: string) => {}
    };
    // 初始化寻找挂载根元素
    if (typeof options.root === "string") _rootElement = findSelectorElement(options.root);
    else _rootElement = options.root;
    if (!_rootElement) { // 说明用户给到的根元素不存在
        warn(typeof options.root === "string" ?
                `选择器为${options.root}的元素不存在` :
                `${options.root}的元素不存在`
            );
        return router;
    }
    // 初始化全局路由
    options.routes && (_globalRoutes = options.routes);
    // 寻找合适的路由方案
    if (routerModeMap.has(options.mode)) {
        const routerFunction = routerModeMap.get(options.mode);
        routerFunction && (router = routerFunction());
    } else warn(`未寻找到${options.mode}路由模式`);
    _router = router;
    return router;
}