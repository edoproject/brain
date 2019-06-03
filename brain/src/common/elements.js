const datamuse = require("datamuse")

const branch = async (word, api = datamuse, width = 1) => {
    let a = api.request("words?ml=" + word)
        .then((json) => {
            let b = json.filter(record => record.tags.includes("n"))
                .slice(0, width)
                .map(record => record.word)
            console.log(b)
            return b
        })
    return a
}

const whatever = () => {
    return 2
}

export { whatever, branch }