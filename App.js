import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';
import commission from './TaskCommissioner.js';
class App extends React.Component {
    state={
        owner:'',

    };
    async componentDidMount(){
        const addcommission = await commission.methods.postCommission("dee", 1).call();
        const commissions = await commission.methods.getCurrentCommissions().call();

        this.setState({current: commissions, add: addcommission})
    }
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2> Task Commissioner </h2>
                    <p>
                        This contract is owned by {this.state.add}
                    </p>
                    <p>
                        Current Listed Commissions: {this.state.current}
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
            </div>
        );
    }
}

export default App;
