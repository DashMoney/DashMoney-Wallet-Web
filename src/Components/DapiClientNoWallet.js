export default function dapiClientNoWallet(theNetwork) {
  if (theNetwork === "mainnet") {
    // console.log("mainnet dapiClient");
    //select random number from 1-19 and then add 2 or three to thedapiAddress? 0-18
    //
    // let x = Math.floor(Math.random() * 16);
    // let dapiAddrs = [
    //   "198.7.115.43:443",
    //   "149.28.241.190:443",
    //   "216.238.75.46:443",
    //   "134.255.182.186:443",
    //   // "51.83.234.203:443",
    //   "185.198.234.25:443",
    //   "37.60.236.151:443",
    //   "185.192.96.70:443",
    //   "37.27.83.17:443",
    //   "70.34.206.123:443",
    //   "51.83.191.208:443",
    //   "185.166.217.154:443",
    //   "108.160.135.149:443",
    //   "188.245.90.255:443",
    //   "95.179.139.125:443",
    //   "173.199.71.83:443",
    //   "50.116.28.103:443",
    //   "45.76.141.74:443",
    //   "37.27.67.164:443",
    // ];

    return {
      network: "mainnet",
      // dapiAddresses: [dapiAddrs[x], dapiAddrs[x + 1]],
      // dapiAddresses: [
      //   "149.28.241.190:443",
      //   "134.255.182.186:443",
      //   "185.198.234.25:443",
      // ],

      apps: {
        DPNSContract: {
          contractId: "GWRSAVFMjXx8HpQFaNJMqBV7MBgMK4br5UESsB4S31Ec",
        },
        // PayGroupsContract: {
        //   contractId: "",
        // },
      },
    };
  } else {
    //THIS IS TESTNET PATH
    //console.log("testnet dapiClient");
    let x = Math.floor(Math.random() * 4);
    let dapiAddrs = [
      "52.10.229.11:1443",
      "54.149.33.167:1443",
      "52.24.124.162:1443",
      "54.187.14.232:1443",
      "52.10.229.11:1443",
    ];
    return {
      network: theNetwork,
      dapiAddresses: [dapiAddrs[x], dapiAddrs[x + 1]],
      // dapiAddresses: [
      //   // "35.165.50.126:1443",
      //   "52.10.229.11:1443",
      //   "54.149.33.167:1443",
      //   "52.24.124.162:1443",
      //   "54.187.14.232:1443",
      // ],
      apps: {
        DPNSContract: {
          contractId: "GWRSAVFMjXx8HpQFaNJMqBV7MBgMK4br5UESsB4S31Ec",
        },
        PayGroupsContract: {
          contractId: "AyhSpcypjKmTnQCT2oDFWCZF2depMppT89sNLWb4T8Wh",
          //"A5xatnwZ7DCN2mbopVMMTpA4ho7odU2e52adGjXuW8CZ",
        },
        TwoPartyContract: {
          contractId: "EDLpeKCEFKGXDieomj4DidpCBJzuKf8paAHXcc1kQ89T",
        },
      },
    };
  }
}

//dapiClientNoWallet(this.state.whichNetwork)
