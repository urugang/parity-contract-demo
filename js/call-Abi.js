#!/usr/bin/env node
const Web3 = require('web3');
const fs = require('fs');
const solc = require('solc');
const BigNumber=require('bignumber.js')
const client = 'http://localhost:8545';
const secrets = [ "node0", "user0"];
const contractName = "Abi"

console.log('1) connect to ethereum node: %s', client);
let web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(client));
if(!web3.isConnected()){
    throw new Error('unable to connect to ethereum node at ' + ethereumUri);
}

// 2) unlock account
console.log("2) unlock account");
const accounts = web3.eth.accounts;
for (var i=0; i < secrets.length; i++) {
	if (!web3.personal.unlockAccount(accounts[i], secrets[i])){
		console.log("   %s/%s: failed,", accounts[i], secrets[i]);
		return;
	}
	console.log("   %s/%s: ok", accounts[i], secrets[i]);
}

console.log("3) get abi and address")
const contractAbi = JSON.parse(fs.readFileSync("data/" + contractName + ".abi", 'utf8'));
const contractAddress = fs.readFileSync("data/" + contractName + ".addr", 'utf8');
const Contract = web3.eth.contract(contractAbi);
const contract = Contract.at(contractAddress);


console.log("5) watch Whoami event and call whoami");
console.log("%s ", contract.setValue(0x12345678, {from: accounts[0]}));
