//importing moralis
const serverUrl = "https://ryp6krzvbcoy.usemoralis.com:2053/server";
const appId = "a8RiGzJnX5H8DFKlnvanOzsL5UTfbak8oRzPwXWU";
Moralis.start({ serverUrl, appId });

let web3;
const ethers = Moralis.web3Library;


async function init() {
    let currentUser = Moralis.User.current();
    if(!currentUser){
        window.location.pathname = "/index.html";
    }

    web3 = await Moralis.enableWeb3();

    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
      let nftId = params.nftId; 

      
    document.getElementById("token_id_input").value = nftId;
    
    document.getElementById("amount_input").value = 1;
}

async function transfer() {
    let tokenId = parseInt(document.getElementById("token_id_input").value);
    let address = document.getElementById("address_input").value;
    let amount = parseInt(document.getElementById("amount_input").value);
    
    const options = {
        type: "erc1155",
        receiver: address,
        contract_address: "0xc9fc8cfb8f374673f273505ba3926673746bc838",
        token_id: tokenId,
        amount: amount}

        let result = await Moralis.transfer(options);
        alert("Transfer successful").then(
            console.log(result)
        )

    }



document.getElementById("submit_transfer").onclick = transfer;

init();




