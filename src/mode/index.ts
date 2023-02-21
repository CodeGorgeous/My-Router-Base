import { _rootElement, _router } from "../index";
import { render } from "../render";
import config from "../config";
import { isElement, IRouteItem } from "../types/index";

/**
 * 根据匹配更新视图
 * @param route 
 */
export function updateView (route?: IRouteItem) {
    if (isElement(_rootElement)) {
        if (route) {
            render(_rootElement, route.component);
        } else { // 未找到符合要求的页面则向页面中呈现404
            render(_rootElement, config["404"]);
        }
    }
    document.querySelectorAll("a").forEach(oA => {
        oA.removeEventListener("click", proxyHref);
        oA.addEventListener("click", proxyHref);
    })
};

function proxyHref(e: MouseEvent) {
    e.preventDefault();
    const _element = e.target as unknown as (HTMLAnchorElement | null);
    _element?.href && _router.push(_element.pathname);
};