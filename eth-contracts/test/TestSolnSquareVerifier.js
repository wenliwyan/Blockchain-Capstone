var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
var Verifier = artifacts.require('Verifier');
const fs = require('fs');
proof = JSON.parse(fs.readFileSync("../zokrates/code/square/proof.json"))

contract('SolnSquareVerifier', accounts => {
    beforeEach(async function () {
        let verifierContract = await Verifier.new()
        this.contract = await SolnSquareVerifier.new(verifierContract.address);
    })

    it('A new solution can be added', async function () {
        await this.contract.addSolution(accounts[0], 0);
        let numSolutions = await this.contract.getSolnNum();
        assert.equal(numSolutions, 1, "solution not added");
    })

    it('Mint token after verification', async function () {
        await this.contract.mintAfterVerify(accounts[1], 1, proof.proof, proof.inputs);
        let owner = await this.contract.ownerOf(1);
        assert.equal(owner, accounts[1], "token not minted");
    })
})