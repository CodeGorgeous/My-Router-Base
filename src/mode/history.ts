import { _globalRoutes } from "../index";
import { updateView } from "./index";

export function createHistoryRouter() {
    _updateView();
    window.addEventListener("popstate", () => {
        _updateView();
    });
    return {
        push: (path?: string) => {
            if (!path) return;
            // 根据path寻找route
            history.pushState("", "", path);
            _updateView();
        }
    };
};

function _updateView() {
    const findRouteResult = _globalRoutes.find(route => `${route.path}` === location.pathname);
    updateView(findRouteResult);
};