pragma solidity >=0.4.21 <0.6.0;
pragma experimental ABIEncoderV2;

import "./ERC721Mintable.sol";
import "./Verifier.sol";

contract SolnSquareVerifier is CryptoPropertyTitle {
    Verifier private _verifier;

    struct Solution {
        uint256 tokenId;
        address ownerAddress;
    }

    Solution[] private _solutions;

    event SolutionAdded(uint256 tokenId, address ownerAddress);

    constructor (address verifierContract) public {
        _verifier = Verifier(verifierContract);
    }

    function addSolution(address ownerAddress, uint256 tokenId) public {
        Solution memory soln = Solution({tokenId: tokenId, ownerAddress: ownerAddress});
        _solutions.push(soln);
        emit SolutionAdded(tokenId, ownerAddress);
    }

    function getSolnNum() public view returns (uint256) {
        return _solutions.length;
    }

    function mintAfterVerify(address to, uint256 tokenId, Verifier.Proof memory proof, uint[2] memory inputs) public {
        require(_verifier.verifyTx(proof, inputs), "Solution cannot be verified");
        addSolution(to, tokenId);
        mint(to, tokenId);
    }
}
