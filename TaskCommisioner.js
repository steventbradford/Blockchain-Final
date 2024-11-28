import web3 from './web3';
const address='0x38671A269bFe33811423289e7B6d66C67E4943d0';
const abi=[
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "AllCommissions",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "poster",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "requirements",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "commitPrice",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "payout",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "assigned",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "verified",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "ListedCommissions",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "poster",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "requirements",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "commitPrice",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "payout",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "assigned",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "verified",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            }
        ],
        "name": "acceptCommission",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "deposit",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getContractBalance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getCurrentCommissions",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "poster",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "requirements",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "commitPrice",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "payout",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "assigned",
                        "type": "address"
                    },
                    {
                        "internalType": "bool",
                        "name": "verified",
                        "type": "bool"
                    }
                ],
                "internalType": "struct TaskCommissioner.commission[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "requirements",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "payout",
                "type": "uint256"
            }
        ],
        "name": "postCommission",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            }
        ],
        "name": "verifyCommission",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];
const taskcommissioner = new web3.eth.Contract(abi, address);
export default new web3.eth.Contract(abi, address);
