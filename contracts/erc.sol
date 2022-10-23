// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TyToken is ERC20 {
    address payable public admin;
    constructor() ERC20 ("TyToken", "ETO") {
        _mint(admin, 1000000 * 10 ** 18);
        admin = payable(msg.sender);
    }

function mint(address to, uint amount) external{
        require(msg.sender == admin, 'only admin');
        _mint( to, amount);
}

function burn (uint amount) external {
        _burn (msg.sender, amount);
}
}