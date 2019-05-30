const
    assert = require("assert"),
    common = require("../../src/common/elements")

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
                    assert.equal(common.whatever(), 2)
                })
            })
        })
    })
})