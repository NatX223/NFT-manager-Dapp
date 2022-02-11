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
    let accounts = await web3.listAccounts();

    // var url = window.location.href;
    // var captured = /myParam=([^&]+)/.exec(url);
    // var nftId = captured ? captured : 'nftId';

    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    let nftId = params.nftId; 

    // const urlParams = new URLSearchParams(window.location.search);
    // const params = window.location.href;
    // const nftId = params.get(nftId);
    document.getElementById("token_id_input").value = nftId;
    document.getElementById("address_input").value = accounts[0];
}

const sendOptions = {
    contractAddress: "0xc9fc8cfb8f374673f273505ba3926673746bc838",
    functionName: "mint",
    abi: contractabi,
    params: {
      //from: accounts[0], value: 0
    },
  }

async function mint() {
    let tokenId = parseInt(document.getElementById("token_id_input").value);
    let address = document.getElementById("address_input").value;
    let amount = parseInt(document.getElementById("amount_input").value);
    //const contract = new web3.eth.contract(contractabi, "0xc9fc8cfb8f374673f273505ba3926673746bc838");
    //let accounts = await web3.eth.getAccounts();
    let accounts = await web3.listAccounts();
    const mintOptions = {
        contractAddress: "0xc9fc8cfb8f374673f273505ba3926673746bc838",
        functionName: "mint",
        abi: contractabi,
        params: {
            account: address, id: tokenId, amount: amount
          //from: accounts[0], value: 0
        },
      }

      
      const options = {type: "native", amount: Moralis.Units.ETH("0.01"), receiver: "0xc9fc8cfb8f374673f273505ba3926673746bc838"}
      let result = await Moralis.transfer(options);

      const mint = await Moralis.executeFunction(mintOptions).then(
          //() => {
              result
          //}
      ).then(alert("Item has been minted"));

      await mint.wait();
    // .on("receipt", function(receipt){
    //     alert("Item has been minted")
    // })

}

document.getElementById("submit_mint").onclick = mint;

init();




