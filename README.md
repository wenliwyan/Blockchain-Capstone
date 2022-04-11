# Udacity Blockchain Capstone

The capstone will build upon the knowledge you have gained in the course in order to build a decentralized housing product. 

# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)

# Development

Truffle@5.4.33
Rinkeby Contract: 0x3074Fe14032Bb1C2F2371591711cfB9d1697b9a6

# Test

```bash
cd eth-contracts
truffle test test/TestERC721Mintable.js
```

# Zokrates

v0.7.11

```
zokrates compile -i square.code
zokrates setup
zokrates compute-witness -a 337 113569
zokrates generate-proof
zokrates export-verifier
```