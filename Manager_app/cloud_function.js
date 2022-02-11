//declaring and initializing a cloud function
Moralis.Cloud.define("getMetadata", async (request) => {
    const logger = Moralis.Cloud.getLogger()

    let NFTId = request.params.nftId;
    let hexId = parseInt(NFTId).toString(16);
    let paddedHex = ("0000000000000000000000000000000000000000000000000000000000000000" + hexId).slice(-64)
    logger.info(paddedHex);

    return Moralis.Cloud.httpRequest({url: "first server .json file directory with the .com/" + paddedHex + ".json"})
    .then(function (httpResponse) {
        return httpResponse.text;
    })
})