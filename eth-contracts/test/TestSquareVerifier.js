var Verifier = artifacts.require('Verifier');
const fs = require('fs');
proof = JSON.parse(fs.readFileSync("../zokrates/code/square/proof.json"))

contract('Verifier', accounts => {
    beforeEach(async function () {
        this.contract = await Verifier.new({from: accounts[0]});
    })

    it('test verification with correct proof', async function () {
        let res = await this.contract.verifyTx(proof.proof, proof.inputs);
        assert.equal(res, true, "verification with correct proof fails");
    })
})
