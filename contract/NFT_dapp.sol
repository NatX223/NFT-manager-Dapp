pragma solidity ^0.8.0;

//importation of ERC1155 contract from openzeppelin
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC1155/ERC1155.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

contract NFTcontract is ERC1155, Ownable {

    uint public constant ART = 0;
    uint public constant PHOTO = 1;

    //setting the contructor and calling that of ERC1155("moralis url for project/{id}.json")
    constructor () ERC1155("") {
        _mint(msg.sender, ART, 0, "");
        _mint(msg.sender, PHOTO, 1, "");
        _mint(msg.sender, EXPERIENCE, 2, "");
    }

    function mint(address account, uint256 id, uint256 amount) public onlyOwner {
        _mint(account, id, amount, "");
    }

    function burn(address account, uint256 id, uint256 amount) public {
      require(msg.sender == account);
      _burn(account, id, amount);
    } 
}