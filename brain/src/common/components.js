import React, { Component } from "react"  // eslint-disable-line no-unused-vars

export class Square extends Component {
    state = { value: 0 }
    render() {
        return (
            <button className="square">
                {this.props.value}
            </button>
        )
    }
}

export class Tree extends Component {
    renderSquare(i) {
        return <Square value={i} />
    }

    render() {
        const status = "Next player: X"

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        )
    }
}

export class Brain extends Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Tree />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        )
    }
}
