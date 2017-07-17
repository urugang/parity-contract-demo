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

    $ mdkir -p ~/.local && cd ~/.local
    $ wget https://nodejs.org/dist/v8.1.4/node-v8.1.4-linux-x64.tar.xz  
    $ tar xf node-v8.1.4-linux-x64.tar.xz  
    $ export PATH=$PWD/node-v8.1.4-linux-x64/bin:$PATH

# setup parity poa<a id="sec-3" name="sec-3"></a>

    $ ./scripts/setup.sh  
    1) reset environment  
    npm notice created a lockfile as package-lock.json. You should commit this file.  
    added 71 packages in 4.521s  
    2) import key from backup files  
    Loading config file from config/node0.toml  
    2 account(s) imported  
    Loading config file from config/node1.toml  
    2 account(s) imported  
    3) start two node  
    4) add nodes   
    .............................................................................................................................................................  
    http://localhost:8645: "enode://19e32f769cadbf107a25ce78769ca055dbc349b0384d2f6b6a026265328cf6bf3713d1a574c561650b719ee092edb54649bfd1044d422e2ff23ef08ab3b20098@192.168.1.122:30400"  
    http://localhost:8545: "enode://5b6021bdb6f889c211153c8eb43d26c863755827bf76ad88eb6be92adacd27fdb4a31c72ad44aee31b87491badcb8478b8439c227245abdcf3285704f593909b@192.168.1.122:30300"  
    added (http://localhost:8645) to (http://localhost:8545)  
    5) status   
    urugang   2824 90.0  1.4 545344 118520 pts/6   Sl+  14:28   0:01 parity --config config/node0.toml  
    urugang   2825 59.5  1.5 547396 127596 pts/6   Sl+  14:28   0:01 parity ui --config config/node1.toml --ui-no-validation --ports-shift=100  
    urugang   3716  0.0  0.0  15996  1024 pts/6    S+   14:28   0:00 grep parity

-   [使用parity建立proof-of-authority](https://medium.com/taipei-ethereum-meetup/%E4%BD%BF%E7%94%A8parity%E5%BB%BA%E7%AB%8Bproof-of-authority-poa-ethereum-chain-c5c1cdd0f21a)
-   [Demo-PoA-tutorial](https://github.com/paritytech/parity/wiki/Demo-PoA-tutorial)
-   [使用node-js部署智能合約](https://medium.com/taipei-ethereum-meetup/%E4%BD%BF%E7%94%A8node-js%E9%83%A8%E7%BD%B2%E6%99%BA%E8%83%BD%E5%90%88%E7%B4%84-smart-contract-520534305aaf)

# create contract<a id="sec-4" name="sec-4"></a>

    $ ./js/create-contract.js  contracts/BasicToken.sol   
    1) connect to ethereum node: http://localhost:8545  
    2) unlock account  
       0x00a8afedf7f63bf9e8e45916af8153f109da92b9/node0: ok  
       0x00ae9aa07ad975feb85403866a64f09c1e2e05f7/user0: ok  
    3) compile contract file: contracts/BasicToken.sol  
    4) deploy contract  
       BasicToken.abi: [{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"whoami","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"me","type":"address"}],"name":"Whoami","type":"event"}]  
       BasicToken.bc: 0x6060604052341561000f57600080fd5b5b336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550612710600260008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b5b6104b0806100c86000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806318160ddd1461006a57806370a08231146100935780638da5cb5b146100e0578063a9059cbb14610135578063b3b36bb314610177575b600080fd5b341561007557600080fd5b61007d6101cc565b6040518082815260200191505060405180910390f35b341561009e57600080fd5b6100ca600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506101d2565b6040518082815260200191505060405180910390f35b34156100eb57600080fd5b6100f361021c565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561014057600080fd5b610175600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610241565b005b341561018257600080fd5b61018a6103c3565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b60015481565b6000600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490505b919050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b61028a600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020548261042f565b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610316600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205482610449565b600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040518082815260200191505060405180910390a35b5050565b60007ffaf1b992abd26a004e10010116cd5ffdd9b75b62e06f9e6897e54892bebbc1b633604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a13390505b90565b600061043d83831115610474565b81830390505b92915050565b60008082840190506104698482101580156104645750838210155b610474565b8091505b5092915050565b80151561048057600080fd5b5b505600a165627a7a723058205839ad46a6fb02a80def3eaa20ca9c92e4877aad80551ecf54ba2bebf3316d850029  
       BasicToken.txhash: 0x10c4ac145c62c4181ab6cba5e92f92c471cf6a46caff8a3ca01bdfef2cd1a434  
       BasicToken.addr: 0x62f4b16d67b112409ab4ac87274926382daacfac

# call contract<a id="sec-5" name="sec-5"></a>

when web ui is enabled, even you unlock account in web3 successfully, you have to input password again in web ui.  

    ./js/call-BasicToken.js 
    1) connect to ethereum node: http://localhost:8545
    2) unlock account
       0x00a8afedf7f63bf9e8e45916af8153f109da92b9/node0: ok
       0x00ae9aa07ad975feb85403866a64f09c1e2e05f7/user0: ok
    3) get abi and address
    4) watch Transfer event and call transfer
    tx hash: 0x0ab5077ce0f49de596a389a50ae290f9008367571f2b51344d909555d12b29e3 
    5) watch Whoami event and call whoami
    tx hash: 0x1414c50c9647836ea439ed71f4ad8908d97ccaa975dd90e61dcce1e35c781c6e 
    Transafer event:
     { address: '0x62f4b16d67b112409ab4ac87274926382daacfac',
      blockHash: '0x2b71ac881885ad6334b2c362a0e489bc8f686b4831c831e9a97d958cf4eb4f6e',
      blockNumber: 5,
      logIndex: 0,
      transactionHash: '0x0ab5077ce0f49de596a389a50ae290f9008367571f2b51344d909555d12b29e3',
      transactionIndex: 0,
      transactionLogIndex: '0x0',
      type: 'mined',
      event: 'Transfer',
      args: 
       { from: '0x00ae9aa07ad975feb85403866a64f09c1e2e05f7',
         to: '0x00a8afedf7f63bf9e8e45916af8153f109da92b9',
         value: { [String: '223'] s: 1, e: 2, c: [Array] } } }
    Whoami event:
     { address: '0x62f4b16d67b112409ab4ac87274926382daacfac',
      blockHash: '0x2b71ac881885ad6334b2c362a0e489bc8f686b4831c831e9a97d958cf4eb4f6e',
      blockNumber: 5,
      logIndex: 1,
      transactionHash: '0x1414c50c9647836ea439ed71f4ad8908d97ccaa975dd90e61dcce1e35c781c6e',
      transactionIndex: 1,
      transactionLogIndex: '0x0',
      type: 'mined',
      event: 'Whoami',
      args: { me: '0x00a8afedf7f63bf9e8e45916af8153f109da92b9' } }
