//https://chainz.cryptoid.info/api.dws
//NEED API KEY.. so go to below

//https://rpc.digitalcash.dev/ <- MAINNET

//https://trpc.digitalcash.dev/   //TESTNET
// By AJ, I THINK AND GOT FROM DEVTALK ON DISCORD

// https://github.com/digitalcashdev/RPCWebProxy

export default async function multiSigUTXOsQuery(
  theAddressArray,
  whichNetwork
) {
  // typically http://localhost:19998/

  //whichNetwork will decide Base URL if want mainnet usage
  let baseUrl = "https://trpc.digitalcash.dev/";
  let basicAuth = btoa(`user:pass`);
  let payload = JSON.stringify({
    method: "getaddressutxos",
    params: [{ addresses: theAddressArray }],
  });

  let returnArray = [];

  /*API data: getaddressutxos
 [
  {
    address: 'yjXnjGLBnjgsBgyu33si6PzDuGM7dVBCzr',
    txid: 'd098d8fbd5cdcb12f513b18cace9eb0aea8f71fefc82ff871e7651234a927551',
    outputIndex: 0,
    script: '76a914fea07ad90ddefdbbafecae744296834832b05b1688ac',
    satoshis: 5000000,
    height: 1257338
  }
 */

  const testAPI = async () => {
    let resp = await fetch(baseUrl, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "Content-Type": "application/json",
      },
      body: payload,
    });

    let data = await resp.json();
    if (data.error) {
      let err = new Error(data.error.message);
      Object.assign(err, data.error);
      throw err;
    }
    return data.result;
  };

  await testAPI()
    .then((d) => {
      //console.log("API data:\n", d); //.toJSON());
      returnArray = d;
    })
    .catch((e) => console.error("Something went wrong:\n", e));

  return returnArray;
}
// .finally(() => client.disconnect());

/**
  * API data: getaddressbalance
 {
  balance: 5000000,
  balance_immature: 0,
  balance_spendable: 5000000,
  received: 5000000
}

  */

// const testAPI = async () => {
//   const response = await fetch('https://trpc.digitalcash.dev/')

//   if (!response.ok) {
//     throw new Error('Network response was not ok');
//   }

//   const data = await response.json(); // or response.text()
//   console.log(data);

//   return response;
// };

// testAPI()
// .then((d) => console.log('API data:\n', d //d.toJSON()
// ))
//   .catch((e) => console.error('Something went wrong:\n', e))
//   .finally(() => client.disconnect());
