var ERC721MintableComplete = artifacts.require('CryptoPropertyTitle');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});

            // mint multiple tokens
            await this.contract.mint(account_one, 0);
            await this.contract.mint(account_two, 1);
            await this.contract.mint(account_two, 2);
        })

        it('should return total supply', async function () {
            let totalAmount = await this.contract.totalSupply();
            assert.equal(totalAmount, 3, "total number of tokens incorrect");
        })

        it('should get token balance', async function () { 
            let accountBalance = await this.contract.balanceOf(account_two);
            assert.equal(accountBalance, 2, "account balance incorrect.");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let tokenURI = await this.contract.tokenURI(1);
            assert.equal(tokenURI, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1", "token uri incorrect.");
        })

        it('should transfer token from one owner to another', async function () {
            await this.contract.transferFrom(account_one, account_two, 0);
            let newOwner = await this.contract.ownerOf(0);
            assert.equal(newOwner, account_two, "token not transferred.")
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            let accessDenied = false;
            try {
                await this.contract.mint(account_two, 3, {from: account_two});
            } catch (e) {
                accessDenied = true;
            }
            assert.equal(accessDenied, true, "mint not restricted to contract owner");
        })

        it('should return contract owner', async function () { 
            assert.equal(await this.contract.owner(), account_one, "incorrect contract owner");
        })

    });
})