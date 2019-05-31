import assert from "assert"
import whatever from "../../src/common/elements"

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
            })
        })
    })
})