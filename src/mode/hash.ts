import { _globalRoutes } from "../index";
import { updateView } from "./index";

export function createHashRouter() {
    if (!window.location.hash) { // hash路由初始化
        window.location.hash = "/";
    };
    // 初次渲染视图
    _updateView();
    // 放置微队列, 防止因hash路由的初始化
    Promise.resolve(window.addEventListener("hashchange", _updateView));
    return {
        push: (path?: string) => {
            path && (window.location.href = `#${path}`);
        }
    }
};

function _updateView() {
    const findRouteResult = _globalRoutes.find(route => `#${route.path}` === window.location.hash);
    updateView(findRouteResult);
};