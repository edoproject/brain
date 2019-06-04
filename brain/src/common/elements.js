const datamuse = require("datamuse")

const query = async (word, api = datamuse) => {
    let a = api.request("words?ml=" + word)
        .then((json) => {
            let b = json.filter(record => record.tags.includes("n"))
                .map(record => record.word)
            return b
        })
    return a
}

const unflatten = (edges) => {
    let tree = [],
        hash = {},
        node

    // First map the nodes of the array to an object -> create a hash table.
    edges.forEach((edge) => {
        hash[edge.word] = edge
        hash[edge.word]["children"] = []
    })

    for (let word in hash) {
        node = hash[word]
        // If has a parent, push itself as a child
        if (node.parent) {
            hash[node["parent"]]["children"].push(node)
        }
        // If no parent, push to the root
        else {
            tree.push(node)
        }
    }

    return tree
}

const tree = async (word, api = datamuse, width = 3, depth = 3) => {
    const pairs_queue = []
    const pending_queue = []
    let set = new Set([word])

    pending_queue.unshift({
        depth: 0,
        word: word,
        parent: undefined,
    })
    while (pending_queue.length > 0) {
        const current = pending_queue.pop()
        pairs_queue.push(current)

        if (current.depth >= depth) continue

        const possible_children = await query(current.word, api, set)
        const children = possible_children.filter(item => {
            return !(set.has(item))
        })
            .slice(0, width)

        pending_queue.unshift(...children.map((child) => {
            return {
                depth: current.depth + 1,
                word: child,
                parent: current.word,
            }
        }))

        set = new Set([...set, ...children])
    }

    return unflatten(pairs_queue)
}

const whatever = () => {
    return 2
}

export { tree, unflatten, whatever }