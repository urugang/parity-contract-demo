// npm install -g solc
// npm install -g ethereumjs-testrpc
const Web3 = require('web3');
const fs = require('fs');
const solc = require('solc');
/*
* connect to ethereum node
*/
const ethereumUri = 'http://localhost:8540';
const user0_addr = "0x00AE9aA07aD975FEb85403866A64f09C1e2E05F7";
const user0_pass = "user0";

let web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(ethereumUri));

if(!web3.isConnected()){
    throw new Error('unable to connect to ethereum node at ' + ethereumUri);
}else{
    console.log('connected to ehterum node at ' + ethereumUri);
    let coinbase = web3.eth.coinbase;
    console.log('coinbase:' + coinbase);
    let balance = web3.eth.getBalance(coinbase);
    console.log('balance:' + web3.fromWei(balance, 'ether') + " ETH");
    let accounts = web3.eth.accounts;
    console.log(accounts);

	if (web3.personal.unlockAccount(user0_addr, user0_pass)){

		console.log('${user0_addr} is unlocked.');
	} else {
		console.log('unlocked failed, ${user0_addr} .');
	}

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

console.log(JSON.stringify(abi, undefined, 2));


/*
* deploy contract
*/
let gasEstimate = web3.eth.estimateGas({data: '0x' + bytecode});
console.log('gasEstimate = ' + gasEstimate);

let MyContract = web3.eth.contract(abi);
console.log('deploying contract...');

let myContractReturned = MyContract.new([], {
    from: user0_addr,
    data: '0x'+ bytecode,
    gas: gasEstimate + 50000
}, function (err, myContract) {
    if (!err) {
        // NOTE: The callback will fire twice!
        // Once the contract has the transactionHash property set and once its deployed on an address.

        // e.g. check tx hash on the first call (transaction send)
        if (!myContract.address) {
            console.log(`myContract.transactionHash = ${myContract.transactionHash}`); // The hash of the transaction, which deploys the contract

        // check address on the second call (contract deployed)
        } else {
            console.log(`myContract.address = ${myContract.address}`); // the contract address
            global.contractAddress = myContract.address;
        }

        // Note that the returned "myContractReturned" === "myContract",
        // so the returned "myContractReturned" object will also get the address set.
    } else {
        console.log(err);
    }
});

(function wait () {
    setTimeout(wait, 1000);
})();


// call contract function
let BasicContract = web3.eth.contract(abi);
basicContract = BasicContract.at("0x62f4b16D67b112409ab4AC87274926382daACfAc");
basicContract.Transfer([], function(err, result) { console.log("event: %o", result); })



basicContract.transfer('0x00bF10fA4ACE94E3CcE3ECAB6552d7794F1De85b', 14);
