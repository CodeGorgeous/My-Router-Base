export type IVNodeChildren = string | IVNode

export interface IVNode {
    tag: string // 第一层是这是个根元素的存在
    props?: Record<string, any>
    children?: IVNodeChildren[]
}

export interface IRouteItem {
    path: string
    name?: string
    component: IVNode
}
