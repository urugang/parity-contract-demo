#!/usr/bin/env node
// npm install -g solc
// npm install -g ethereumjs-testrpc
const Web3 = require('web3');
const fs = require('fs');
const solc = require('solc');
const client = 'http://localhost:8545';
const web3 = new Web3();
const contractFile = process.argv[2];
const secrets = [ "node0", "user0"];


// 1) connect to ethereum node
console.log('1) connect to ethereum node: %s', client);
web3.setProvider(new web3.providers.HttpProvider(client));
if(!web3.isConnected()){
    throw new Error('unable to connect to ethereum node at ' + client);
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

// 3) compile contract
console.log("3) compile contract file: %s", contractFile);
let source = fs.readFileSync(contractFile, 'utf8');
let compiledContracts = solc.compile(source);

// 4) deploy contract
console.log("4) deploy contract");
for (let name in compiledContracts.contracts) {
	const from = accounts[1];
    const abi = JSON.parse(compiledContracts.contracts[name].interface);
    const bytecode = "0x" + compiledContracts.contracts[name].bytecode;
    const gas = web3.eth.estimateGas({data: bytecode}) + 50000;
    const Contract = web3.eth.contract(abi);
	const contractName = name.substring(1)
    let contract = Contract.new([],
								{ from: from,
								  data: bytecode,
								  gas: gas
								}, function (err, contract) {
									if (err) {
										console.log(err);
										return;
									}
									if (!contract.address) {
										console.log(`   %s.txhash: %s`, contractName, contract.transactionHash);
									} else {
										console.log("   %s.addr: %s", contractName, contract.address);
										fs.writeFileSync("data/" + contractName + ".addr", contract.address);
									}
								});
	fs.writeFileSync("data/" + contractName + ".abi", JSON.stringify(abi));
	fs.writeFileSync("data/" + contractName + ".bc", bytecode);
	console.log("   %s.abi: %s", contractName, JSON.stringify(abi));
	console.log("   %s.bc: %s", contractName, bytecode);
}
