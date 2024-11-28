import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';
import commission from './TaskCommissioner.js';

class App extends React.Component {
    state = {
        inputString: '', // State for the first input field
        inputNumber: '', // State for the second input field
        owName: '', // Current commissions
        currentCommissions: '', // State to hold the fetched commissions
    };

    // Handle form submission
    handleSubmit = async () => {
        const { inputString, inputNumber } = this.state;

        if (!inputString || !inputNumber) {
            alert('Both fields are required!');
            return;
        }

        const uintValue = parseInt(inputNumber, 10);
        if (isNaN(uintValue)) {
            alert('The second input must be a valid number!');
            return;
        }

        try {
            // Request accounts from MetaMask
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const fromAddress = accounts[0];

            // Send the transaction
            await commission.methods.postCommission(inputString, uintValue).send({
                from: fromAddress,
                gas: 3000000, // Adjust if necessary
            });

            // Fetch updated commissions
            const updatedCommissions = await commission.methods.getCurrentCommissions().call();
            this.setState({ owName: updatedCommissions });

            alert('Commission successfully added!');
        } catch (error) {
            console.error("Error adding commission:", error.message);
            alert(`Error: ${error.message}`);
        }
    };

    // Fetch and display current commissions
    handleGetCommissions = async () => {
        try {
            if (!window.ethereum) {
                alert("MetaMask is not installed. Please install it to use this feature.");
                return;
            }

            // Fetch raw data
            const rawCommissions = await commission.methods.getCurrentCommissions().call();

            // Parse the returned data
            const formattedCommissions = rawCommissions.map((rawCommission) => ({
                id: rawCommission.id,
                poster: rawCommission.poster,
                requirements: rawCommission.requirements,
                commitPrice: rawCommission.commitPrice,
                payout: rawCommission.payout,
                assigned: rawCommission.assigned,
                verified: rawCommission.verified,
            }));

            console.log("Formatted commissions:", formattedCommissions);
            this.setState({ currentCommissions: formattedCommissions });
        } catch (error) {
            console.error("Error fetching commissions:", error.message);
            alert(`Error fetching commissions: ${error.message}`);
        }
    };



    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Task Commissioner</h2>

                    <p>
                        Current Listed Commissions: {this.state.owName}
                    </p>

                    {/* Input Fields and Submit Button */}
                    <div style={styles.form}>
                        <input
                            type="text"
                            placeholder="Enter a string"
                            value={this.state.inputString}
                            onChange={(e) => this.setState({ inputString: e.target.value })}
                            style={styles.input}
                        />
                        <input
                            type="number"
                            placeholder="Enter a number"
                            value={this.state.inputNumber}
                            onChange={(e) => this.setState({ inputNumber: e.target.value })}
                            style={styles.input}
                        />
                        <button onClick={this.handleSubmit} style={styles.button}>
                            Submit Commission
                        </button>
                    </div>

                    {/* Button to Fetch and Display Current Commissions */}
                    <button onClick={this.handleGetCommissions} style={styles.button}>
                        Get Current Commissions
                    </button>

                    {/* Display Current Commissions */}
                    {this.state.currentCommissions && (
                        <p style={styles.commissionsText}>
                            Current Commissions: {this.state.currentCommissions}
                        </p>
                    )}
                </header>
            </div>
        );
    }
}

// Inline styling for the form
const styles = {
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        marginTop: '20px',
    },
    input: {
        padding: '10px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        width: '200px',
    },
    button: {
        padding: '10px',
        fontSize: '16px',
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '10px',
    },
    commissionsText: {
        marginTop: '20px',
        fontSize: '18px',
        color: '#333',
    },
};

export default App;
