<div id="table-of-contents">
<h2>Table of Contents</h2>
<div id="text-table-of-contents">
<ul>
<li><a href="#sec-1">1. install parity</a></li>
<li><a href="#sec-2">2. install nodejs</a></li>
<li><a href="#sec-3">3. setup parity poa</a></li>
<li><a href="#sec-4">4. create contract</a></li>
<li><a href="#sec-5">5. call contract</a></li>
</ul>
</div>
</div>

# install [parity](https://github.com/paritytech/parity)<a id="sec-1" name="sec-1"></a>

    $ git clone --depth=1 git@github.com:paritytech/parity  
    $ cd parity  
    $ cargo install --force --debug

# install [nodejs](https://nodejs.org/en/)<a id="sec-2" name="sec-2"></a>

    $ wget https://nodejs.org/dist/v8.1.4/node-v8.1.4-linux-x64.tar.xz  
    $ tar xf node-v8.1.4-linux-x64.tar.xz  
    $ export PATH=$PWD/node-v8.1.4-linux-x64/bin:$PATH

# setup parity poa<a id="sec-3" name="sec-3"></a>

1.  [使用parity建立proof-of-authority](https://medium.com/taipei-ethereum-meetup/%E4%BD%BF%E7%94%A8parity%E5%BB%BA%E7%AB%8Bproof-of-authority-poa-ethereum-chain-c5c1cdd0f21a)
2.  [Demo-PoA-tutorial](https://github.com/paritytech/parity/wiki/Demo-PoA-tutorial)
3.  [使用node-js部署智能合約](https://medium.com/taipei-ethereum-meetup/%E4%BD%BF%E7%94%A8node-js%E9%83%A8%E7%BD%B2%E6%99%BA%E8%83%BD%E5%90%88%E7%B4%84-smart-contract-520534305aaf)

    $ npm install  
    added 71 packages in 1.064s  
    $ bash setup.sh  
    Loading config file from node0.toml   
    2 account(s) imported  
    Loading config file from node1.toml  
    2 account(s) imported  
    ................................................................................................................................................  
    "enode://957304a1812a09ba4a0ed8811ddfe77e809b295f343101a41c479e9184a1878dffb4749dc8a77b09128f1a8a688f1b9964433e6a7875f96e941de4d2e856d18d@192.168.1.122:30300"  
    ,{"jsonrpc":"2.0","result":true,"id":0}  
    31735 79.5  2.3 540368 187840 pts/3   Sl+  09:52   0:01 parity ui --config node0.toml --ui-no-validation  
    31736 54.0  2.4 540372 199712 pts/3   Sl+  09:52   0:01 parity ui --config node1.toml --ui-no-validation --ports-shift=100  
    32450  0.0  0.0  18040  1084 pts/3    R+   09:52   0:00 grep parity

# create contract<a id="sec-4" name="sec-4"></a>

    $ node create-contract.js  
    connected to ehterum node at http://localhost:8545  
    balance: 1000 ETH  
    accounts: 0x00a8afedf7f63bf9e8e45916af8153f109da92b9,0x00ae9aa07ad975feb85403866a64f09c1e2e05f7  
    0x00ae9aa07ad975feb85403866a64f09c1e2e05f7 unlocked succeeded.  
    compiling contract...  
    done  
    abi: [ 
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
    gasEstimate = 405197  
    deploying contract...  
    basicContract.transactionHash = 0x353fa26642f16afce16fba9708c4a3a47b038ac1a7a79dbe1d29505982d02445

# call contract<a id="sec-5" name="sec-5"></a>

when web ui is enabled, even you unlock account in web3 successfully, you have to input password again in web ui.

    $ node call-contract.js  
    connected to ehterum node at http://localhost:8545  
    balance: 999.99910352863088272 ETH  
    accounts: 0x00a8afedf7f63bf9e8e45916af8153f109da92b9,0x00ae9aa07ad975feb85403866a64f09c1e2e05f7  
    0x00ae9aa07ad975feb85403866a64f09c1e2e05f7 unlocked failed.  
    basicContract.balance[accounts[0]]: 4237  
    basicContract.balance[accounts[1]]: 5763  
    Transafer event:  
     { address: '0x3b40fa7ac4f19acc32b85de65d3c37e3d5ad48a1',  
      blockHash: '0x158a9cd0fb0ad17c511dae50c2249ae35f9c884340a1588b67b99f4193d1dcae',  
      blockNumber: 54,  
      logIndex: 0,  
      transactionHash: '0x37343d55886482e1c61de4629987e9c0a69e73250b72be72020e3e353803b786',  
      transactionIndex: 0,  
      transactionLogIndex: '0x0',  
      type: 'mined',  
      event: 'Transfer',  
      args:   
       { from: '0x00ae9aa07ad975feb85403866a64f09c1e2e05f7',  
         to: '0x00a8afedf7f63bf9e8e45916af8153f109da92b9',  
         value: { [String: '223'] s: 1, e: 2, c: [Array] } } }  
    Transafer event:  
     { address: '0x3b40fa7ac4f19acc32b85de65d3c37e3d5ad48a1',  
      blockHash: '0x158a9cd0fb0ad17c511dae50c2249ae35f9c884340a1588b67b99f4193d1dcae',  
      blockNumber: 54,  
      logIndex: 0,  
      transactionHash: '0x37343d55886482e1c61de4629987e9c0a69e73250b72be72020e3e353803b786',  
      transactionIndex: 0,  
      transactionLogIndex: '0x0',  
      type: 'mined',  
      event: 'Transfer',  
      args:   
       { from: '0x00ae9aa07ad975feb85403866a64f09c1e2e05f7',  
         to: '0x00a8afedf7f63bf9e8e45916af8153f109da92b9',  
         value: { [String: '223'] s: 1, e: 2, c: [Array] } } }  
    Whoami event:  
     { address: '0x3b40fa7ac4f19acc32b85de65d3c37e3d5ad48a1',  
      blockHash: '0x6db5fabd3f178bcb5c7efd1e07073cd129420ae73c9edfbec74f4ebe6c48c54a',  
      blockNumber: 55,  
      logIndex: 0,  
      transactionHash: '0x7831efcbe13ab30f1019ae6f44b429cfb565fed8c9f832ed97b2666fcf81a530',  
      transactionIndex: 0,  
      transactionLogIndex: '0x0',  
      type: 'mined',  
      event: 'Whoami',  
      args: { me: '0x00ae9aa07ad975feb85403866a64f09c1e2e05f7' } }
