import ReactDOM from "react-dom"
import "./index.css"
import React from "react"
import Tree from "react-tree-graph"
import { tree } from "./common/elements"
import "./style/graph.css"

tree({
    word: "car",
    reverse: true,
    width: 3,
    depth: 3,
}).then((data) => {
    ReactDOM.render(
        <div className="custom-container">
            <Tree
                data={data[0]}
                height={1000}
                width={1200}
                keyProp="word"
                labelProp="word"
                nodeRadius={10}
                animated={true}
                svgProps={{
                    className: "custom",
                }}
            />
        </div >,

        document.getElementById("root")
    )
})