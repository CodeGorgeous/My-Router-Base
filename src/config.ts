import { IVNode } from "./types/interface";

const config: Record<string, IVNode> = {
    "404": {
        tag: "h1",
        children: ["404 Not Found"]
    }
};

export default config;