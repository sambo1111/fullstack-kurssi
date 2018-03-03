import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import counterReducer from './components/counterReducer'

const store = createStore(counterReducer)

const Keskiarvo = () => {
    return (
        <div>{(store.getState().bad * (-1) + store.getState().good) / (store.getState().good + store.getState().ok + store.getState().bad)} </div>
    )
}

const Positiivista = () => {
    return (
        <div>{(store.getState().good)/(store.getState().good + store.getState().bad + store.getState().ok)}</div>
    )
}

const Statistiikka = () => {

    return (
        <div>
            <h2>statistiikka</h2>
            <table>
                <tbody>
                    <tr>
                        <td>hyvä</td>
                        <td>{store.getState().good}</td>
                    </tr>
                    <tr>
                        <td>neutraali</td>
                        <td>{store.getState().ok}</td>
                    </tr>
                    <tr>
                        <td>huono</td>
                        <td>{store.getState().bad}</td>
                    </tr>
                    <tr>
                        <td>keskiarvo</td>
                        <td><Keskiarvo /></td>
                    </tr>
                    <tr>
                        <td>positiivisia</td>
                        <td><Positiivista /></td>
                    </tr>
                </tbody>
            </table>
        </div >
    )
}

class App extends React.Component {
    klik = (nappi) => () => {
        console.log(nappi)
        store.dispatch({ type: nappi })
    }

    render() {
        return (
            <div>
                <h2>anna palautetta</h2>
                <button onClick={this.klik('GOOD')}>hyvä</button>
                <button onClick={this.klik('OK')}>neutraali</button>
                <button onClick={this.klik('BAD')}>huono</button>
                <Statistiikka />
                <button onClick={this.klik('ZERO')}>nollaa tilasto</button>
            </div>
        )
    }
}

const renderApp = () => {
    ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)