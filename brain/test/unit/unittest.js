import assert from "assert"
import { configure, shallow } from "enzyme"
import whatever from "../../src/common/elements"
import { Square } from "../../src/common/components"
import React from "react"  // eslint-disable-line no-unused-vars
import Adapter from "enzyme-adapter-react-16"

configure({ adapter: new Adapter() })

describe("unit tests", () => {
    context("unit tests context", () => {

        describe("Suite 1", () => {
            context("Suite 1 context", () => {
                beforeEach(() => {
                    console.log("setUp")
                })

                afterEach(() =>  {
                    console.log("tearDown")
                })

                it("Test 1", () => {
                    assert.equal(whatever(), 2)
                })

                it("renders three <Square /> components", () => {
                    const wrapper = shallow(<Square />)
                    console.log(wrapper)
                })
            })
        })
    })
})