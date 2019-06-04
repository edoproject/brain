import assert from "assert"
import { expect } from "chai"
import { configure, shallow } from "enzyme"
import { whatever, tree, unflatten } from "../../src/common/elements"
import { Square } from "../../src/common/components"
import React from "react"  // eslint-disable-line no-unused-vars
import Adapter from "enzyme-adapter-react-16"
import fs from "fs"

configure({ adapter: new Adapter() })

describe("unit tests", () => {
    context("unit tests context", () => {

        describe("Suite 1", () => {
            context("Suite 1 context", () => {
                beforeEach(() => {})

                afterEach(() => {})

                it("Test 1", () => {
                    assert.equal(whatever(), 2)
                })

                it("renders three <Square /> components", () => {
                    const wrapper = shallow(<Square />)
                    console.log(wrapper)
                })

                it("unflatten", () => {
                    const input_edges = [
                        {
                            parent: undefined,
                            word: "a",
                            depth: 0,
                        },
                        {
                            parent: "a",
                            word: "b1",
                            depth: 1,
                        },
                        {
                            parent: "a",
                            word: "b2",
                            depth: 1,
                        },
                        {
                            parent: "b1",
                            word: "c11",
                            depth: 1,
                        },
                        {
                            parent: "b2",
                            word: "c21",
                            depth: 1,
                        },

                    ]

                    const expected_trees = [
                        {
                            parent: undefined,
                            word: "a",
                            depth: 0,
                            children: [
                                {
                                    parent: "a",
                                    word: "b1",
                                    depth: 1,
                                    children: [
                                        {
                                            parent: "b1",
                                            word: "c11",
                                            depth: 1,
                                            children: [],
                                        },
                                    ],
                                },
                                {
                                    parent: "a",
                                    word: "b2",
                                    depth: 1,
                                    children: [
                                        {
                                            parent: "b2",
                                            word: "c21",
                                            depth: 1,
                                            children: [],
                                        },
                                    ],
                                },
                            ],
                        },
                    ]

                    let unflattened = unflatten(input_edges)

                    expect(unflattened).to.deep.equal(expected_trees)
                })

                it("tree", async () => {
                    const fake_datamuse_api = {
                        request: async () => {
                            let json = JSON.parse(
                                fs.readFileSync("./test/resources/car_synonims.json"))
                            return json
                        },
                    }

                    const expected_trees = [
                        {
                            depth: 0,
                            word: "car",
                            parent: undefined,
                            children: [
                                {
                                    depth: 1,
                                    word: "motorcar",
                                    parent: "car",
                                    children: [
                                        {
                                            depth: 2,
                                            word: "railcar",
                                            parent: "motorcar",
                                            children: [],
                                        },
                                        {
                                            depth: 2,
                                            word: "auto",
                                            parent: "motorcar",
                                            children: [],
                                        },
                                    ],
                                },
                                {
                                    depth: 1,
                                    word: "automobile",
                                    parent: "car",
                                    children: [
                                        {
                                            depth: 2,
                                            word: "gondola",
                                            parent: "automobile",
                                            children: [],
                                        },
                                        {
                                            depth: 2,
                                            word: "machine",
                                            parent: "automobile",
                                            children: [],
                                        },
                                    ],
                                },
                            ],
                        },
                    ]

                    let mind_map = await tree({
                        word: "car",
                        api: fake_datamuse_api,
                        width: 2,
                        depth: 2,
                    })

                    expect(mind_map).to.deep.equal(expected_trees)
                })

                it("tree - reversed", async () => {
                    const fake_datamuse_api = {
                        request: async () => {
                            let json = JSON.parse(
                                fs.readFileSync("./test/resources/car_synonims.json"))
                            return json
                        },
                    }

                    const expected_trees = [
                        {
                            depth: 0,
                            word: "car",
                            parent: undefined,
                            children: [
                                {
                                    depth: 1,
                                    word: "motorcar",
                                    parent: "car",
                                    children: [
                                        {
                                            depth: 2,
                                            word: "railcar",
                                            parent: "motorcar",
                                            children: [],
                                        },
                                        {
                                            depth: 2,
                                            word: "auto",
                                            parent: "motorcar",
                                            children: [],
                                        },
                                    ],
                                },
                                {
                                    depth: 1,
                                    word: "automobile",
                                    parent: "car",
                                    children: [
                                        {
                                            depth: 2,
                                            word: "gondola",
                                            parent: "automobile",
                                            children: [],
                                        },
                                        {
                                            depth: 2,
                                            word: "machine",
                                            parent: "automobile",
                                            children: [],
                                        },
                                    ],
                                },
                            ],
                        },
                    ]

                    let mind_map = await tree({
                        word: "car",
                        api: fake_datamuse_api,
                        width: 2,
                        depth: 2,
                        reversed: true,
                    })

                    expect(mind_map).to.deep.equal(expected_trees)
                })
            })
        })
    })
})
