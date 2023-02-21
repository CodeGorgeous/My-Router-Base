import { IVNode, IVNodeChildren } from "../types/interface";

/**虚拟树模版示例:
 * {
 *  tag: "div",
 *  props: {
 *      class: "container"
 *  },
 *  children: ["Hello", {
 *      tag: "span",
 *      children: ["CodeGorgeous"]
 *  }]
 * }
 */

export function render(root: Element, vNode: IVNode) {
    /**
     * 根据vNode生成真实的DOM树
     * 将生成后的真实DOM树放到root节点内
     */
    const oTargetElement = document.createElement(vNode.tag);
    vNode.props && setAttributes(oTargetElement, vNode.props);
    if (vNode.children) {
        const oChildrenElements = generatorElement(vNode.children);
        for (const oChildrenElement of oChildrenElements) {
            oTargetElement.appendChild(oChildrenElement);
        }
    }
    // 挂载生成好的真实DOM树到
    root.innerHTML = "";
    root.appendChild(oTargetElement);
};

/**
 * 生成真实树
 * @param vNode 
 * @returns 
 */
function generatorElement(vNode: IVNodeChildren[]) {
    const result: (Text | Element)[] = [];
    for (const node of vNode) {
        if (typeof node === "string") {
            result.push(document.createTextNode(node));
        } else {
            const oTargetElement = document.createElement(node.tag);
            node.props && setAttributes(oTargetElement, node.props);
            if (node.children) {
                const childrenElements = generatorElement(node.children);
                for (const childrenElement of childrenElements) {
                    oTargetElement.appendChild(childrenElement);
                }
            }
        }
    }
    return result;
}

/**
 * 批量设置attributes
 * @param target 
 * @param attributes 
 */
function setAttributes (target: Element, attributes: Record<string, any>) {
    for (const attribute in attributes) {
        target.setAttribute(attribute, attributes[attribute]);
    }
}