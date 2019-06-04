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

const tree = async (options) => {
    if (options === undefined) options = {}
    if (options.word === undefined) options.word = ""
    if (options.api === undefined) options.api = datamuse
    if (options.width === undefined) options.width = 1
    if (options.depth === undefined) options.depth = 1
    if (options.reverse === undefined) options.reverse = false


    const pairs_queue = []
    const pending_queue = []
    let set = new Set([options.word])

    pending_queue.unshift({
        depth: 0,
        word: options.word,
        parent: undefined,
    })
    while (pending_queue.length > 0) {
        const current = pending_queue.pop()
        pairs_queue.push(current)

        if (current.depth >= options.depth) continue

        const possible_children = await query(current.word, options.api, set)
        const filtered_children = possible_children.filter(item => {
            return !(set.has(item))
        })
        const children = options.reverse
            ? filtered_children.slice(filtered_children.length - options.width, filtered_children.length)
            : filtered_children.slice(0, options.width)

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