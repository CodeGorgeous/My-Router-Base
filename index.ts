import { createRouter } from "./src";

const routes = [{
    path: "/",
    component: {
        tag: "div",
        children: ["页面A"]
    }
}, {
    path: "/B",
    component: {
        tag: "div",
        children: ["页面B"]
    }
}, {
    path: "/C",
    component: {
        tag: "div",
        children: ["页面C"]
    }
}];

createRouter({
    routes,
    mode: "abstract",
    root: "#app"
});

/**
 * hash模式:
 *  hashChange事件实现
 */

/**
 * history模式:
 *  通过h5中新增的history相关api实现
 *  pushState、replaceState可新增/替换当前页面
 *  popstate可以监听到例如back、go这样的操作
 */

/**
 * abstract模式:
 *  内存模式, 通过程序中自建的一个空间存储页面变化记录实现
 *  通过改变该空间内的数据及时进行记录并改变页面即可
 *  无论如何初次进入网站必定位于首页
 *  该模式不会改变url上的变化, 即维持不变
 */