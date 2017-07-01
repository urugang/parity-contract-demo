// npm install -g solc
// npm install -g ethereumjs-testrpc
const Web3 = require('web3');
const fs = require('fs');
const solc = require('solc');
const ethereumUri = 'http://localhost:8545';
let web3 = new Web3();
/*
 * connect to ethereum node
 */


web3.setProvider(new web3.providers.HttpProvider(ethereumUri));
if(!web3.isConnected()){
    throw new Error('unable to connect to ethereum node at ' + ethereumUri);
}
let accounts = web3.eth.accounts;
console.log('connected to ehterum node at %s', ethereumUri);
console.log('balance: %s ETH', web3.fromWei(web3.eth.getBalance(accounts[1]), 'ether'));
console.log('accounts: %s', accounts);
if (web3.personal.unlockAccount(accounts[1], "user0")){
	console.log('%s unlocked succeeded.', accounts[1]);
} else {
	console.log('%s unlocked failed.', accounts[1]);
}


/*
 * Compile Contract and Fetch ABI, bytecode
 */
let source = fs.readFileSync("./contracts/BasicToken.sol", 'utf8');
console.log('compiling contract...');
let compiledContract = solc.compile(source);
console.log('done');
for (let contractName in compiledContract.contracts) {
    // code and ABI that are needed by web3
    // console.log(contractName + ': ' + compiledContract.contracts[contractName].bytecode);
    // console.log(contractName + '; ' + JSON.parse(compiledContract.contracts[contractName].interface));
    var bytecode = compiledContract.contracts[contractName].bytecode;
    var abi = JSON.parse(compiledContract.contracts[contractName].interface);
}

console.log("abi: "+JSON.stringify(abi, undefined, 2));


/*
 * deploy contract
 */
let gasEstimate = web3.eth.estimateGas({data: '0x' + bytecode});
console.log('gasEstimate = ' + gasEstimate);

let BasicContract = web3.eth.contract(abi);
console.log('deploying contract...');

let basicContract = BasicContract.new([], {
    from: accounts[1],
    data: '0x'+ bytecode,
    gas: gasEstimate + 50000
}, function (err, basicContract) {
    if (!err) {
        // NOTE: The callback will fire twice!
        // Once the contract has the transactionHash property set and once its deployed on an address.

        // e.g. check tx hash on the first call (transaction send)
        if (!basicContract.address) {
            console.log(`basicContract.transactionHash = ${basicContract.transactionHash}`); // The hash of the transaction, which deploys the contract

            // check address on the second call (contract deployed)
        } else {
            console.log(`basicContract.address = ${basicContract.address}`); // the contract address
            global.contractAddress = basicContract.address;
        }

        // Note that the returned "myContractReturned" === "myContract",
        // so the returned "myContractReturned" object will also get the address set.
    } else {
        console.log(err);
    }
});
