const { create } =
require("ipfs-http-client");

const ipfs = create({
    host:"ipfs.infura.io",
    port:5001,
    protocol:"https"
});

exports.uploadToIPFS =
async(buffer)=>{

    const result =
    await ipfs.add(buffer);

    return result.path;
}