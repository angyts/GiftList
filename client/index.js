const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 
  const args = process.argv;
  // console.log(args);
  if (args.length !== 3){
    throw new Error('Usage: node index "the name you want to test"')
  }

  const name = args[2];
  const index = niceList.findIndex(n => n === name);
  const merkleTree = new MerkleTree(niceList);
  const proof = merkleTree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    name: name,
    proof: proof
  });

  console.log({ gift });
}

main();