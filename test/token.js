const { expect } = require("chai");
const hre = require("hardhat");

describe("TyToken contract", function() {
    // global vars
    let Token;
    let tyToken;
    let admin;
    let addr1;
    let addr2;
    let tokenCap = 1000000;


    beforeEach(async function() {
        // Get the ContractFactory and Signers here.
        Token = await ethers.getContractFactory("TyToken");
        [admin, addr1, addr2] = await hre.ethers.getSigners();

        tyToken = await Token.deploy(tokenCap);
    });

    describe("Deployment", function() {
        it("Should set the right admin", async function() {
            expect(await tyToken.admin()).to.equal(admin.address);
        });

        it("Should set the max capped supply to the argument provided during deployment", async function() {
            const cap = await tyToken.cap();
            expect(Number(hre.ethers.utils.formatEther(cap))).to.equal(tokenCap);
        });

    });

    describe("Transactions", function() {
        it("Should transfer tokens between accounts", async function() {
            // Transfer 50 tokens from owner to addr1
            await tyToken.transfer(addr1.address, 50);
            const addr1Balance = await tyToken.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(50);

            // Transfer 50 tokens from addr1 to addr2
            // We use .connect(signer) to send a transaction from another account
            await tyToken.connect(addr1).transfer(addr2.address, 50);
            const addr2Balance = await tyToken.balanceOf(addr2.address);
            expect(addr2Balance).to.equal(50);
        });

        it("Should fail if sender doesn't have enough tokens", async function() {
            const initialAdminBalance = await tyToken.balanceOf(admin.address);
            // Try to send 1 token from addr1 (0 tokens) to owner (1000000 tokens).
            // `require` will evaluate false and revert the transaction.
            await expect(
                tyToken.connect(addr1).transfer(admin.address, 1)
            ).to.be.revertedWith("ERC20: transfer amount exceeds balance");

            // Owner balance shouldn't have changed.
            expect(await tyToken.balanceOf(admin.address)).to.equal(
                initialAdminBalance
            );
        });

        it("Should update balances after transfers", async function() {
            const initialAdminBalance = await tyToken.balanceOf(admin.address);

            // Transfer 100 tokens from owner to addr1.
            await tyToken.transfer(addr1.address, 100);

            // Transfer another 50 tokens from owner to addr2.
            await tyToken.transfer(addr2.address, 50);

            // Check balances.
            const finalAdminBalance = await tyToken.balanceOf(admin.address);
            expect(finalAdminBalance).to.equal(initialAdminBalance.sub(150));

            const addr1Balance = await tyToken.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(100);

            const addr2Balance = await tyToken.balanceOf(addr2.address);
            expect(addr2Balance).to.equal(50);
        });
    });

});