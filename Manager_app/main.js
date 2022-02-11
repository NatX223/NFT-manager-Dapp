//innitializing moralis
const serverUrl = "https://ryp6krzvbcoy.usemoralis.com:2053/server";
const appId = "a8RiGzJnX5H8DFKlnvanOzsL5UTfbak8oRzPwXWU";
Moralis.start({ serverUrl, appId });


function displayNFTs(All_NFTs, length) {
    const parent = document.getElementById("app");
    for (let i = 0; i < All_NFTs.length; i++) {
        let nfts = All_NFTs[i];
        let metadata_ = nfts.metadata;
        let metadata = JSON.parse(metadata_);
        let id = nfts.token_id;

        let htmlstring = 
        `    <div class="card">
            <img src="${metadata.image}" alt="NFT image">
            <div class="card-body">
            <h5 class="card-title">${metadata.name}</h5>
            <h5 class="card-title">tokenId: ${id}</h5>
            <h6 class="card-title">Details</h6>
            <p class="card-text">${metadata.describtion}</p>
            <p class="card-text">Number of owners: ${length}</p>
            <a href="mint.html?nftId=${id}" class="btn btn-primary">Mint</a>
            <a href="transfer.html?nftId=${id}" class="btn btn-primary">Transfer</a>
            </div>
        </div>`;

        let col = document.createElement("div");
        col.className = "col col-md-3"
        col.innerHTML = htmlstring;
        parent.appendChild(col);

        }
    }


async function getOwnerData() {
    const currentUser = Moralis.User.current();
    let accounts = currentUser.get("accounts");
    const options = {
        chain: 'rinkeby', address: accounts[0], token_address: "0xc9fc8cfb8f374673f273505ba3926673746bc838"
    };
    return Moralis.Web3API.account.getNFTsForContract(options)
    .then((data) => {
        let result = data.result.reduce( (object, currentElement) => {
            object[currentElement.token_id] = currentamount;
            return object;
        }
        ,{}
        )
        return result;
    })
}

async function getNFTsMetadata() {
    //getting all NFTs
    const options = { address: "0xc9fc8cfb8f374673f273505ba3926673746bc838", chain: "rinkeby"};
    return Moralis.Web3API.token.getAllTokenIds(options)
    .then((data) => {
        let All_NFTs = data.result; 
        //return All_NFTs;
        console.log(All_NFTs);
    })
}

async function getNFTsOwners() {
    //getting all NFTs
    const options = { address: "0xc9fc8cfb8f374673f273505ba3926673746bc838", chain: "rinkeby"};
    return Moralis.Web3API.token.getAllTokenIds(options)
    .then((data) => {
        let All_NFTs = data.result; 
        // return All_NFTs;
        
    for (let i = 0; i < All_NFTs.length; i++) {
        let nfts = All_NFTs[i];
        let id = nfts.token_id;

        const options = {address: "0xc9fc8cfb8f374673f273505ba3926673746bc838", token_id: id, chain: "rinkeby"};
        return Moralis.Web3API.token.getTokenIdOwners(options)
        .then(
            (res) => {
                owners = [];
                res.result.forEach(element => {
                    owners.push(element.owner_of);
               });
               let length = owners.length;
            return length;
          }
         )
    }
    }
    )
}

async function initializeApp() {
    let currentUser = Moralis.User.current();
    if(!currentUser){
        currentUser = await Moralis.Web3.authenticate();
    } 

    let length = await getNFTsOwners();
    
    let All_NFTs = await getNFTsMetadata();

    //let ownerData = await getOwnerData();
    
    
    displayNFTs(All_NFTs, length);
    getNFTsMetadata();
    
}

initializeApp();

// <p class="card-text">Amount in circulation: ${nfts.amount}</p>