const Web3 = require('web3');
const fs = require('fs');
const solc = require('solc');
var BigNumber=require('bignumber.js')
const ethereumUri = 'http://localhost:8545';
const contractAddress="0x3b40fa7ac4f19acc32b85de65d3c37e3d5ad48a1"
/*
* connect to ethereum node
*/
let web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(ethereumUri));
if(!web3.isConnected()){
    throw new Error('unable to connect to ethereum node at ' + ethereumUri);
}
let accounts = web3.eth.accounts;
console.log('connected to ehterum node at %s', ethereumUri);
console.log('balance: %s ETH', web3.fromWei(web3.eth.getBalance(accounts[1]), 'ether'));
console.log('accounts: %s', accounts);
web3.personal.unlockAccount(accounts[0], 'node0');
web3.personal.unlockAccount(accounts[1], 'user0');
if (web3.personal.unlockAccount(accounts[1], 'user1')){
	console.log('%s unlocked succeeded.', accounts[1]);
} else {
	console.log('%s unlocked failed.', accounts[1]);
}

// call contract function
let abi = [
  {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "balance",
        "type": "uint256"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "whoami",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "inputs": [],
    "payable": false,
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "me",
        "type": "address"
      }
    ],
    "name": "Whoami",
    "type": "event"
  }
]


let BasicContract = web3.eth.contract(abi);
basicContract = BasicContract.at(contractAddress);
console.log("basicContract.balance[accounts[0]]: %s",
			basicContract.balanceOf(accounts[0]));
console.log("basicContract.balance[accounts[1]]: %s",
			basicContract.balanceOf(accounts[1]));

// transafer
let transferEvent = basicContract.Transfer([],
										   function(err, result) {
											   console.log("Transafer event:");
											   console.log("%o", result);
										   });
basicContract.transfer(accounts[0], 223, { from: accounts[1]});

// whoami
let whoamiEvent = basicContract.Whoami([],
									   function(err, result) {
										   console.log("Whoami event:");
										   console.log("%o", result);
									   });
basicContract.whoami({from: accounts[1]});

// stop watch
setTimeout(function(){
	transferEvent.stopWatching();
	whoamiEvent.stopWatching();
}, 20000);
