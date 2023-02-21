import { _globalRoutes, _rootElement } from "../index";
import { updateView } from "./index";

const _historyStack: string[] = [];

export function createAbstractRouter() {
    _historyStack.push("/");
    _updateView();
    return {
        push: (path?: string) => {
            path && (_historyStack.push(path));
            _updateView();
        }
    }
};

function _updateView() {
    const findRouteResult = _globalRoutes.find(route => `${route.path}` === _historyStack[_historyStack.length - 1]);
    updateView(findRouteResult);
};
