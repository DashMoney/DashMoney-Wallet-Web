import React from "react";
import LocalForage from "localforage";

import Image from "react-bootstrap/Image";

import DashBkgd from "./Images/dash_digital-cash_logo_2018_rgb_for_screens.png";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import TopNav from "./Components/TopNav/TopNav";

import PublicSpacesPage from "./Components/3-PublicSpaces/PublicSpacesPage";

import encryptMyReq from "./Components/2-PartyPay/encryptMyReq";
import encryptMyResp from "./Components/2-PartyPay/encryptMyResp";

import decryptMyReqs from "./Components/2-PartyPay/decryptMyReqs";
import decryptTheirResps from "./Components/2-PartyPay/decryptTheirResps";

import decryptMyResps from "./Components/2-PartyPay/decryptMyResps";
import decryptTheirReqs from "./Components/2-PartyPay/decryptTheirReqs";

import "./App.css";
import LoginForm from "./Components/0-LoginPage/LoginForm";
import AccountLogin from "./Components/0-LoginPage/AccountLogin";
import IdentityControlPage from "./Components/0-LoginPage/IdentityControlPage";

import TopUpIdentityModal from "./Components/TopUpIdentityModal";

import WalletExplaination from "./Components/WalletExplaination";

import CreateNewWalletModal from "./Components/0-LoginPage/CreateNewWalletModal";
import RegisterIdentityModal from "./Components/0-LoginPage/RegisterIdentityModal";

import RegisterNameModal from "./Components/0-LoginPage/RegisterNameModal";

import SendFundsModal from "./Components/0-LoginPage/SendFundsModal";
import LogoutModal from "./Components/0-LoginPage/LogoutModal";

import PayGroupsPage from "./Components/1-PayGroups/PayGroupsPage";

import RegisterPayGroupModal from "./Components/1-PayGroups/Modals/RegisterPayGroupModal";

import CreateJoinPage from "./Components/1-PayGroups/CreateJoinPage";

import CreatePayGroupPage from "./Components/1-PayGroups/CreatePayGroupPage";

import ECDHxEncrypt from "./Components/1-PayGroups/Encrypt&Decrypt/ECDHxEncrypt";

import ECDHxDecrypt from "./Components/1-PayGroups/Encrypt&Decrypt/ECDHxDecrypt";

import DocKeyEncrypt from "./Components/1-PayGroups/Encrypt&Decrypt/DocKeyEncrypt";

import DocKeyDecrypt from "./Components/1-PayGroups/Encrypt&Decrypt/DocKeyDecrypt";

import DecryptChatForMbrs from "./Components/1-PayGroups/Encrypt&Decrypt/DecryptChatForMbrs";

import DecryptChatDoc4Edit from "./Components/1-PayGroups/Encrypt&Decrypt/DecryptChatDoc4Edit";

import EncryptChatDoc4Edit from "./Components/1-PayGroups/Encrypt&Decrypt/EncryptChatDoc4Edit";

import getYourXPub from "./Components/1-PayGroups/MultisigFuncs/getYourXPub";

import xPubsInMultiScriptOut from "./Components/1-PayGroups/MultisigFuncs/xPubsInMultiScriptOut";

import multiSigUTXOsQuery from "./Components/1-PayGroups/MultisigFuncs/RPCWebProxyMultiSigUTXOQuery";

import ConfirmCreatePayGroupModal from "./Components/1-PayGroups/Modals/ConfirmCreatePayGroupModal";

import ConfirmJoinPayGroupModal from "./Components/1-PayGroups/Modals/ConfirmJoinPayGroupModal";

import SelectedPayGroupPage from "./Components/1-PayGroups/SelectedPayGroupPage";

import SelectedPayGroupPmts from "./Components/1-PayGroups/SelectedPayGroupPmts";

import ConfirmFinalizePayGroupModal from "./Components/1-PayGroups/Modals/ConfirmFinalizePayGroupModal";

// import ComingSoonModal from "./Components/1-PayGroups/Modals/ComingSoonModal";

import ConfirmAddMessageModal from "./Components/1-PayGroups/Modals/ConfirmAddMessageModal";

import ConfirmAddLikeModal from "./Components/1-PayGroups/Modals/ConfirmAddLikeModal";

import SelectedPayGroupPmtsCreateMultisig from "./Components/1-PayGroups/SelectedPayGroupPmtsCreateMultisig";

import ConfirmCreateMultiSigAcctModal from "./Components/1-PayGroups/Modals/ConfirmCreateMultiSigAcctModal";

import ConfirmAcceptMultiSigAcctModal from "./Components/1-PayGroups/Modals/ConfirmAcceptMultiSigAcctModal";

// import ProxyPage from "./Components/1-ProxyAccounts/ProxyPage";
// import HowProxyModal from "./Components/1-ProxyAccounts/HowProxyModal";

// import AddProxyModal from "./Components/1-ProxyAccounts/AddProxyModal";
// import EditProxyModal from "./Components/1-ProxyAccounts/EditProxyModal";
// import DeleteProxyModal from "./Components/1-ProxyAccounts/DeleteProxyModal";

import TwoPartyPage from "./Components/2-PartyPay/TwoPartyActualPage";
import RequestPage from "./Components/2-PartyPay/RequestPage";

import Register2PartyModal from "./Components/2-PartyPay/Modals/Register2PartyModal";

import Confirm2PartyRequestModal from "./Components/2-PartyPay/Modals/Confirm2PartyRequestModal";
import Pay2PartyRequestModal from "./Components/2-PartyPay/Modals/Pay2PartyRequestModal";

import Release2PartyModal from "./Components/2-PartyPay/Modals/Release2PartyModal";
import RetrieveFundsModal from "./Components/2-PartyPay/Modals/RetrieveFundsModal";

import AddMsgToRequestModal from "./Components/2-PartyPay/Modals/AddMsgToRequestModal";
import AddMessageToResponseModal from "./Components/2-PartyPay/Modals/AddMessageToResponseModal";

import Refund2PartyModal from "./Components/2-PartyPay/Modals/Refund2PartyModal";
import WithdrawRefundModal from "./Components/2-PartyPay/Modals/WithdrawRefundModal";

import createFullTX from "./Components/2-PartyPay/createFullTX";
import createFullTXRefund from "./Components/2-PartyPay/createFullTXRefund";

import WalletPage from "./Components/9-Wallet/WalletPage";

import ConfirmAddrPaymentModal from "./Components/9-Wallet/ConfirmAddrPaymentModal";

import dapiClient from "./Components/DapiClient";
import dapiClientNoWallet from "./Components/DapiClientNoWallet";

//const Dash = require("dash");
import Dash from "dash";

const {
  Core: {
    Mnemonic,
    //HDPrivateKey,
    HDPublicKey,
    //PublicKey,
    Script,
    Address,
    //Transaction,
    //Output,
    //Networks,
    //Block,
    crypto,
    //Dash.Core.crypto
  },
  Essentials: { Buffer },
  PlatformProtocol: { Identifier },
} = Dash;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      mode: import.meta.env.VITE_BKGD,
      //mode: "dark", //from .env -> import.meta.env.VITE_BKGD

      //ACCOUNT 'LOGIN' PAGE STATE
      isLoadingIdentity: true,
      isLoadingIdInfo: true,
      isLoadingCreditTransfer: false,

      isLoadingName: true,
      isLoadingAlias: false,

      isLoadingWallet: true, //For wallet for topup

      isIdentityControlShowing: false,

      identityRegisterCount: 0,
      identityError: false,
      idInfoError: false,
      nameError: false,
      aliasError: false,
      //ACCOUNT 'LOGIN' PAGE STATE^^^^^^

      //PAY GROUPS PAGE

      YourPGsMultiSigUTXOs: [],

      isLoadingPayGroups: true,
      isLoadingPayGroupMsgs: true,

      YourPayGroupsPubKeyDoc: "Querying", // When do I query this,
      //While querying, start off -> "Querying"
      //If no 2Party PubKey -> "No Pub Key" and query

      YourPayGroups: [],
      YourPayGroupsMbrs: [],
      YourPayGroupsNames: [],
      YourPayGroupsPubKeys: [],

      PayGroups1: false, // YourPayGroupsMbrs
      PayGroups2: false, // YourPayGroups Names&PubKeys

      InitialPullPAYGROUPS: true,
      DisplayPayGroupsOrder: "Most Recent",
      isPayGroupsRefreshReady: true,

      //createPayGroupModal
      newPayGroupNameDocs: [],
      newPayGroupECDHDocs: [],

      //Join PayGroups

      JoinPayGroups: [], //mbrIndex
      //JoinPayGroupsMbrs: [], //Could query multiple of same PayGroup need to set(Unique)
      JoinPayGroupsNames: [],
      JoinPayGroupsPubKeys: [],

      PayGroups3: false,
      PayGroups4: false,

      InitialPullJoinPAYGROUPS: true,

      isJoinGroupsRefreshReady: true,

      newJoinPayGroupDoc: "",

      selectedPayGroupDoc: "",
      selectedPayGroupNameDocs: [],
      selectedPayGroupMbrDocs: [],

      selectedPayGroupECDHDocs: [],
      selectedPayGroupChatDocs: [],

      InitialPullPayGroupMsgs: true,
      isPayGroupsMsgsRefreshReady: true,

      sharedSecret: "",
      messageToAdd: "",
      chatDocToEdit: "",
      chatDocToEditIndex: 0,

      //PAY GROUPS PAGE STATE^^^^^

      // 2 PARTY PAGE STATE

      InitialPull2Party: true,
      is2PartyRefreshReady: true,

      Your2PartyPubKey: "Querying", // When do I query this,
      //While querying, start off -> "Querying"
      //If no 2Party PubKey -> "No Pub Key" and query

      ReqsFromYou: [],
      ReqsFromYouPubKeys: [],
      ReqsFromYouNames: [],
      ReqsFromYouResponses: [],

      ReqsToYou: [],
      ReqsToYouPubKeys: [],
      ReqsToYouNames: [],
      ReqsToYouResponses: [],

      isLoading2Party: true,
      DisplayReqsOrPmts: "Payments",

      TwoParty1: false,
      TwoParty2: false,

      // sendPmtMsgSuccess2Party: false,
      sendPmtMsgFailure2Party: false,

      sendSuccess2Party: false, // then what is this
      // ^^^ this is the payment Tx send -> yes
      sendFailure2Party: false,
      // sendReqSuccess2Party: false,
      sendReqFailure2Party: false,

      requestPmtReqDoc2Party: "",
      sendToNameDoc2Party: "",
      requestPubKeyDoc2Party: "",
      responsePubKeyDoc2Party: "",
      amountToSend2Party: 0,
      messageToSend2Party: "",

      signature2Party: "",
      responseToEdit: "",
      responseToEditIndex: "", //<- Need this for the editingfunction!!

      signingToSendToWhomNameDoc: "",

      requestToUse: "", // FOR showWithdrawRefundModal
      requestPubKeyDocToUse: "",
      responseToUse: "",
      responsePubKeyDocToUse: "",

      requestToEdit: "",
      requestToEditIndex: "", //<- Need this for the editingfunction!!
      txToUse: "",

      // 2 PARTY PAGE STATE^^^^

      //WALLET PAGE

      isLoadingButtons_WALLET: true,
      isLoadingForm_WALLET: false,

      isLoadingRefresh_WALLET: false,

      WALLET_sendToAddress: "",
      WALLET_amountToSend: 0,

      WALLET_sendSuccess: false,
      WALLET_sendFailure: false,

      WALLET_nameSuccess: "",
      WALLET_amtSuccess: 0,

      //*** *** *** *** ***

      //WALLET PAGE STATE^^^^^^

      selectedDapp: "Login",

      presentModal: "",
      isModalShowing: false,
      whichNetwork: import.meta.env.VITE_NETWORK, //"testnet" or 'mainnet',

      mnemonic: "",
      identity: "",
      identityInfo: "",
      identityRaw: "",
      uniqueName: "",
      aliasList: [],

      accountBalance: "",
      accountHistory: "",
      accountAddress: "",
      walletId: "",

      //BELOW IS OTHERS ADDRESSES

      WALLET_addresses: [],
      WALLET_addressesNames: [],

      platformLogin: false,

      //LocalForageKeys: [],
      DashMoneyLFKeys: [],
      FrontendFee: 0,
      validFrontendFee: true,

      skipSynchronizationBeforeHeight: 1029000,

      //skipSynchronizationBeforeHeightMAINNET: 2130000,
      //skipSynchronizationBeforeHeightTESTNET: 1029000,

      expandedTopNav: false,
    };
  }

  closeTopNav = () => {
    this.setState({
      expandedTopNav: false,
    });
  };

  toggleTopNav = () => {
    if (this.state.expandedTopNav) {
      this.setState({
        expandedTopNav: false,
      });
    } else {
      this.setState({
        expandedTopNav: true,
      });
    }
  };

  handleSelectedDapp = (theDapp) => {
    this.setState({
      selectedDapp: theDapp,
      expandedTopNav: false,
    });
  };

  hideModal = () => {
    this.setState({
      isModalShowing: false,
    });
  };

  showModal = (modalName) => {
    this.setState({
      presentModal: modalName,
      isModalShowing: true,
    });
  };

  handleMode = () => {
    if (this.state.mode === "primary")
      this.setState(
        {
          mode: "dark",
        },
        () => this.setFrontendLFmode()
      );
    else {
      this.setState(
        {
          mode: "primary",
        },
        () => this.setFrontendLFmode()
      );
    }
  };

  setFrontendLFmode = () => {
    let DashFrontend = LocalForage.createInstance({
      name: "dash-frontend",
    });
    DashFrontend.setItem("mode", this.state.mode)
      .then((d) => {
        console.log("Return from LF setitem:", d);
      })
      .catch((err) => {
        console.error("Something went wrong setting to localForage:\n", err);
      });
  };

  hideIdentityControlPage = () => {
    this.setState({
      isIdentityControlShowing: false,
    });
  };

  showIdentityControlPage = () => {
    this.setState({
      isIdentityControlShowing: true,
    });
  };

  handleLogout = () => {
    window.location.reload();
  };

  componentDidMount() {
    LocalForage.config({
      name: "dash-frontend",
    });
    let DashFrontend = LocalForage.createInstance({
      name: "dash-frontend",
    });
    DashFrontend.getItem("mode")
      .then((modeVal) => {
        if (modeVal !== null) {
          this.setState({
            mode: modeVal,
          });
        }
      })
      .catch(function (err) {
        console.log(err);
      });
    //
    //2) GET WALLETID KEYS FOR OBTAINING IDENTITY
    //
    LocalForage.config({
      name: "dashmoney-platform-login",
    });
    let DashMoneyLF = LocalForage.createInstance({
      name: "dashmoney-platform-login",
    });

    DashMoneyLF.keys()
      .then((keys) => {
        this.setState({
          DashMoneyLFKeys: keys,
        });
        console.log(keys);
      })
      .catch(function (err) {
        console.log(err);
      });

    //NEED TO ADD THE TESTNET/MAINNET VERIFY AND CHANGE IF TESTNET ->
    this.verifyFrontendFeeAndNetworkAndSkipSync();

    //HAVE TO HAVE THE NETWORK SET FIRST ->
    //this.getDSOEveryoneDocs(); //WHY NOT MOVE TO ONSELECT LIKE OTHERS -> it doesn't cause that much of an issue.
  }

  //ACCOUNT LOGIN FUNCTIONS => SIMPLE LOGIN FIRST
  triggerNameLoading = () => {
    this.setState({
      isLoadingName: true,
    });
  };

  triggerNameNotLoading = () => {
    this.setState({
      isLoadingName: false,
    });
  };

  triggerAliasLoading = () => {
    this.setState({
      isLoadingAlias: true,
    });
  };

  triggerAliasNotLoading = () => {
    this.setState({
      isLoadingAlias: false,
    });
  };

  //TRIGGER THE LOGIN PROCESS ->
  handleAccountLogin = (theMnemonic) => {
    if (this.state.DashMoneyLFKeys.length === 0) {
      this.setState(
        {
          isLoggedIn: true,
          mnemonic: theMnemonic,
        },
        () => this.getWalletAndIdentitywithMnem(theMnemonic)
      );
    } else {
      this.setState(
        {
          isLoggedIn: true,
          mnemonic: theMnemonic,
        },
        () => this.checkPlatformOnlyLogin(theMnemonic)
      );
    }
  };

  checkPlatformOnlyLogin = (theMnemonic) => {
    console.log("Called Check Platform Login");

    let clientOpts = {};
    if (this.state.whichNetwork === "mainnet") {
      clientOpts = {
        network: this.state.whichNetwork,
        dapiAddresses: [
          //'149.28.241.190:443',
          "134.255.182.186:443",
          "185.198.234.25:443",
        ],
        wallet: {
          mnemonic: theMnemonic,
          offlineMode: true,
        },
      };
    } else {
      clientOpts = {
        network: this.state.whichNetwork,

        wallet: {
          mnemonic: theMnemonic,
          offlineMode: true,
        },
      };
    }

    const client = new Dash.Client(clientOpts);

    const getWalletId = async () => {
      const account = await client.getWalletAccount();

      //console.log("walletIdToTry:", walletIdToTry);

      return account.walletId;
    };

    getWalletId()
      .then((walletIdToTry) => {
        let isKeyAvail = this.state.DashMoneyLFKeys.includes(walletIdToTry);
        // console.log(`DashMoneyLF Test -> ${isKeyAvail}`);

        if (isKeyAvail) {
          console.log("This here is a login skip!!");
          //************* */
          let DashMoneyLF = LocalForage.createInstance({
            name: "dashmoney-platform-login",
          });

          DashMoneyLF.getItem(walletIdToTry)
            .then((val) => {
              //  console.log("Value Retrieved", val);
              if (
                val !== null ||
                typeof val.identity !== "string" ||
                val.identity === "" ||
                val.name === "" ||
                typeof val.name !== "string"
              ) {
                // console.log(val.identity);
                this.setState(
                  {
                    platformLogin: true,
                    identity: val.identity,
                    uniqueName: val.name,
                    walletId: walletIdToTry,
                    isLoadingName: false,
                    isLoadingIdentity: false,
                  },
                  () => this.handlePlatformLoginSeq(val.identity, theMnemonic)
                );
              } else {
                console.log("platform login FROM LF failed");
                //JUST DO NORMAL FULL LOGIN
                //IF LF FAILS FOR SOME REASON JUST DOES NORMAL LOGIN
                this.setState(
                  {
                    platformLogin: false,
                    identity: "",
                    uniqueName: "",
                    walletId: walletIdToTry,
                  },
                  () => this.getWalletAndIdentitywithMnem(theMnemonic)
                );
              }
            })
            .catch((err) => {
              console.error(
                "Something went wrong getting from DashMoneyLF:\n",
                err
              );
            });
        } else {
          console.log("platform login FROM LF failed");
          //JUST DO NORMAL FULL LOGIN
          //FOR LOGIN WITH NEW MNEN BUT NOT IN LF
          this.setState(
            {
              platformLogin: false,
              walletId: walletIdToTry,
            },
            () => this.getWalletAndIdentitywithMnem(theMnemonic)
          );
        }
      })
      .catch((e) => console.error("Something went wrong:\n", e))
      .finally(() => client.disconnect());
  };

  handlePlatformLoginSeq = (theIdentity, theMnemonic) => {
    //
    this.getIdentityInfo(theIdentity);
    this.getWalletPlatformLogin(theMnemonic);
    //this.get2PartyYourPubKey();
    this.getPayGroupECDHPubKey();
    // this.getNamefromIdentity(theIdentity); DONT NEED <=

    //
    //  ----   ----   ----   ----   ----    ----   ----
    //
    //After(Identity/Name) -> trigger added to 2 Functions ABOVE
    // ForYou(Messages)
    //this.startMessagesQuerySeq(theIdentity);
  };

  handleAccountRetry = () => {
    this.setState(
      {
        isLoadingIdentity: true,
        isLoadingWallet: true,
      },
      () => this.getWalletAndIdentitywithMnem(this.state.mnemonic)
    );
  };
  //
  // BELOW STANDARD LOGIN
  getWalletAndIdentitywithMnem = (theMnemonic) => {
    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        theMnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
      //   {
      //   network: this.state.whichNetwork,

      //   dapiAddresses: ["44.233.44.95:1443"], // <= *****

      //   wallet: {
      //     mnemonic: theMnemonic,
      //     adapter: LocalForage.createInstance,
      //     unsafeOptions: {
      //       skipSynchronizationBeforeHeight:
      //         this.state.skipSynchronizationBeforeHeight,
      //     },
      //   },
      // }
    );

    //console.log(this.state.whichNetwork);
    //console.log(this.state.skipSynchronizationBeforeHeight);

    const retrieveIdentityIds = async () => {
      const account = await client.getWalletAccount();

      //console.log(account.getTotalBalance());
      // console.log(account.getUnusedAddress().address);
      //console.log(account.getTransactionHistory());

      this.setState({
        accountBalance: account.getTotalBalance(),
        accountAddress: account.getUnusedAddress().address,
        accountHistory: account.getTransactionHistory(),
        walletId: account.walletId,
      });

      return account.identities.getIdentityIds();
    };

    retrieveIdentityIds()
      .then((d) => {
        //  console.log("Mnemonic identities:\n", d);
        if (d.length === 0) {
          this.setState({
            isLoadingIdentity: false,
            isLoadingWallet: false,

            //These are not called so end loading
            isLoadingIdInfo: false,
            isLoadingAlias: false,
            isLoadingName: false,

            identity: "no identity",
            //uniqueName: '', //Kicks out of platform login if identity is disabled but LF still retains.
          });
        } else {
          this.setState(
            {
              identity: d[0],
              isLoadingIdentity: false,
              isLoadingWallet: false,
              //maintain Loading bc continuing to other functions
            },
            () => this.conductFullLogin(d[0])
          );
        }
      })
      .catch((e) => {
        console.error(
          "Something went wrong getWalletAndIdentitywithMnem:\n",
          e
        );
        this.setState({
          identityError: true,
          isLoadingIdentity: false,
        });
      })
      .finally(() => client.disconnect());
  };
  conductFullLogin = (theIdentity) => {
    // <= Called from above func..
    // if (!this.state.platformLogin) { //Disconnected bc no platformlogin for now
    //   this.handleLoginAndLFobjectCreate(theIdentity);
    // }

    //THIS SHOULD CALL IDINFO, NAMES, AND ALIASES
    this.getIdentityInfo(theIdentity);
    this.getNamefromIdentity(theIdentity);
    // this.getAliasfromIdentity(theIdentity); NO MORE ALIASES?
  }; //Many LF, mostRecent and other functions have not been incorporated yet
  //
  //
  // BELOW PLATFORM LOGIN - WALLET PART
  getWalletPlatformLogin = (theMnemonic) => {
    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        theMnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    const retrieveIdentityIds = async () => {
      const account = await client.getWalletAccount();

      //console.log(account.getTotalBalance());
      // console.log(account.getUnusedAddress().address);
      //console.log(account.getTransactionHistory());

      this.setState({
        accountBalance: account.getTotalBalance(),
        accountAddress: account.getUnusedAddress().address,
        accountHistory: account.getTransactionHistory(),
        //walletId: account.walletId,
      });

      return account.identities.getIdentityIds();
    };

    retrieveIdentityIds()
      .then((d) => {
        //  console.log("Mnemonic identities:\n", d);
        //if (d.length === 0) {
        // NEED TO HANDLE IF RETURN IS EMPTY BUT I HAVE A KEY IN LF.
        // SHOULD I JUST NOT RETURN IDENTITY? OR
        // NEED ENTIRE NEW FUNCTION TO HANDLE CHANGING OF LF
        //   this.setState({
        //     isLoadingIdentity: false,
        //     isLoadingWallet: false,

        //     //These are not called so end loading
        //     isLoadingIdInfo: false,
        //     isLoadingAlias: false,
        //     isLoadingName: false,

        //     identity: "no identity",
        //     uniqueName: "", //Kicks out of platform login if identity is disabled but LF still retains.
        //   });
        // }
        if (this.state.identity === d[0]) {
          //SHOULD IT NOT EVEN WORRY ABOUT THE IDENTITY?
          this.setState(
            {
              identity: d[0],
              isLoadingIdentity: false,
              isLoadingWallet: false,
            } //,() => this.getAddresses_WALLET()
            //  CALL -> this.getAddresses_WALLET();
            // BC REQUIRES -> this.state.accountHistory
          );
        }
      })
      .catch((e) => {
        console.error("Something went wrong getWalletPlatformLogin:\n", e);
      })
      .finally(() => client.disconnect());
  };

  getIdentityInfo = (theIdentity) => {
    console.log("Called get identity info");

    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));

    const retrieveIdentity = async () => {
      return client.platform.identities.get(theIdentity); // Your identity ID
    };

    retrieveIdentity()
      .then((d) => {
        if (d !== null) {
          console.log("Identity retrieved:\n", d.toJSON());
          let idInfo = d.toJSON();
          this.setState({
            isLoadingIdInfo: false,
            identityInfo: idInfo,
            identityRaw: d,
          });
        } else {
          console.log("No Identity Info retrieved");
          //If I have an identity then there will be something but if there isn't an identity than this is not called? ->
        }
      })
      .catch((e) => {
        console.error(
          "Something went wrong in retrieving the identityinfo:\n",
          e
        );
        this.setState({
          isLoadingIdInfo: false,
          idInfoError: true, //NEED TO HANDLE SO CAN DISPLAY ->
        });
      })
      .finally(() => client.disconnect());
  };

  handleName = (nameToAdd) => {
    //From Name Purchase
    this.setState(
      {
        uniqueName: nameToAdd,
        isLoadingName: false,
      },
      () => this.LOGINCOMPLETEQueryTrigger(this.state.identity)
    );
    //
    this.loadIdentityCredits(); //Send Fee and update credits
    //
    //ADDS IDENTITY/NAME TO LF AFTER PURCHASE OF NAME
    //  //******************** */
    let DashMoneyLF = LocalForage.createInstance({
      name: "dashmoney-platform-login",
    });
    let lfObject = {
      identity: this.state.identity,
      name: nameToAdd,
    };

    DashMoneyLF.setItem(this.state.walletId, lfObject)
      .then((d) => {
        //return DashMoneyLF.getItem(walletId);
        console.log("Return from LF setitem:", d);
      })
      .catch((err) => {
        console.error("Something went wrong setting to DashMoneyLF:\n", err);
      });
    // //******************** */
  };

  getNamefromIdentity = (theIdentity) => {
    console.log(theIdentity);
    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));
    //const client = new Dash.Client({ network: "testnet" });

    const retrieveNameByRecord = async () => {
      // Retrieve by a name's identity ID
      return client.platform.names.resolveByRecord(
        "identity",
        // "dashUniqueIdentityId", record === 'identity'
        theIdentity // Your identity ID
      );
    };

    retrieveNameByRecord()
      .then((d) => {
        if (d.length === 0) {
          console.log("There are no Names.");
          this.setState({
            //Should catch the new name and aliases and stop spinner
            isLoadingName: false,
            uniqueName: "no name",
          });
        } else {
          let nameRetrieved = d[0].toJSON();
          //
          //  //******************** */
          //ADDS IDENTITY/NAME TO LF AFTER NORMAL LOGIN IF WALLETID IS NOT IN LF
          if (!this.state.platformLogin) {
            let DashMoneyLF = LocalForage.createInstance({
              name: "dashmoney-platform-login",
            });
            let lfObject = {
              identity: theIdentity,
              name: nameRetrieved.label,
            };

            DashMoneyLF.setItem(this.state.walletId, lfObject)
              .then((d) => {
                //return DashMoneyLF.getItem(walletId);
                //   console.log("Return from LF setitem:", d);
              })
              .catch((err) => {
                console.error(
                  "Something went wrong setting to DashMoneyLF:\n",
                  err
                );
              });
          }
          //******************** */
          console.log("Name retrieved:\n", nameRetrieved);
          this.setState(
            {
              uniqueName: nameRetrieved.label,
              isLoadingName: false,
            },
            () => this.LOGINCOMPLETEQueryTrigger(theIdentity)
          );
        }
      })
      .catch((e) => {
        this.setState({
          isLoadingName: false,
          nameError: true,
        });
        console.error("Something went wrong getting names:\n", e);
        // this.getAliasfromIdentity(theIdentity);
      })
      .finally(() => client.disconnect());
  };

  LOGINCOMPLETEQueryTrigger = (theIdentity) => {
    //this.get2PartyYourPubKey();
    this.getPayGroupECDHPubKey();
    //After(Identity/Name) -> trigger added to 2 Functions ABOVE
    // ForYou(Messages)
    // this.startMessagesQuerySeq(theIdentity);
  };

  // ####  ####  WRITE ACTIONS BELOW  #### ####

  registerIdentity = () => {
    //REIMPLEMENT LFOBJ CREATE WHEN GET TO THAT POINT <-

    this.setState({
      isLoadingIdentity: true,
      isLoadingIdInfo: true,
    });

    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        this.state.mnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    const createIdentity = async () => {
      return client.platform.identities.register();
    };

    createIdentity()
      .then((d) => {
        console.log("Registered Identity:\n", d.toJSON());
        let idInfo = d.toJSON();
        this.setState(
          {
            identity: idInfo.id,
            identityInfo: idInfo,
            identityRaw: d,
            uniqueName: "no name", //This sets up the next step
            isLoadingIdentity: false,
            isLoadingIdInfo: false,
            //accountBalance: this.state.accountBalance - 1400000
          },
          () => this.getWalletAfterIdentityRegister()
        );
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        this.setState({
          identityRegisterCount: this.state.identityRegisterCount + 1,
          isLoadingIdentity: false,
          isLoadingIdInfo: false,
          identityError: true,
        });
      })
      .finally(() => client.disconnect());
  };

  getWalletAfterIdentityRegister = () => {
    this.setState({
      isLoadingWallet: true,
    });

    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        this.state.mnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    const retrieveWallet = async () => {
      const account = await client.getWalletAccount();

      this.setState({
        accountBalance: account.getTotalBalance(),
        accountHistory: account.getTransactionHistory(),
      });

      return true;
    };

    retrieveWallet()
      .then((d) => {
        console.log("Wallet Reloaded:\n", d);
        this.setState({
          isLoadingWallet: false,
        });
      })
      .catch((e) => {
        console.error(
          "Something went wrong reloading WalletAfterIdentityRegister:\n",
          e
        );
        this.setState({
          isLoadingWallet: false,
        });
      })
      .finally(() => client.disconnect());
  };

  doTopUpIdentity = (numOfCredits) => {
    this.setState({
      isLoadingIdInfo: true,
      identityInfo: "",
    });

    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        this.state.mnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    const topupIdentity = async () => {
      const identityId = this.state.identity; // Your identity ID
      const topUpAmount = numOfCredits; // Number of duffs ie 1000

      // await client.platform.identities.topUp(identityId, topUpAmount);
      // return client.platform.identities.get(identityId);
      return client.platform.identities.topUp(identityId, topUpAmount);
    };

    topupIdentity()
      .then((d) => {
        //console.log("Identity credit balance: ", d.balance);
        //Just manually add the topup amount
        this.setState(
          {
            identityInfo: "", //d.toJSON(),
            //identityRaw: d,
            isLoadingIdInfo: false,
            accountBalance: this.state.accountBalance - 1000000,
          },
          () => this.loadIdentityCredits()
        );
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        this.setState({
          isLoadingIdInfo: false,
          //Add error state to handle identityInfo being set to '' or else will be stuck in loading state.. ->
        });
      })
      .finally(() => client.disconnect());
  };
  //Name and Alias purchase is done in the modal.

  /* ACCOUNT LOGIN FUNCTIONS^^^
   *
   *
   *   ################
   *   ###          ####
   *   ################
   *   ###
   *   ###
   *
   * PAY GROUP FUNCTIONS
   */

  getPayGroupECDHPubKey = () => {
    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));

    const getDocuments = async () => {
      //console.log("Called Pay Group ECDH Pub Key");

      return client.platform.documents.get("PayGroupsContract.ECDHxDoc", {
        where: [["$ownerId", "==", this.state.identity]],
      });
    };

    getDocuments()
      .then((d) => {
        if (d.length === 0) {
          console.log("There are no YourPayGroupsPubKeyDoc");

          this.setState(
            { YourPayGroupsPubKeyDoc: "No Pub Key", isLoadingPayGroups: false } //,() => this.checkPayGroupRace()
          );
        } else {
          // let docArray = [];

          // for (const n of d) {
          //   let returnedDoc = n.toJSON();
          //   //console.log("Req:\n", returnedDoc);
          //   returnedDoc.toId = Identifier.from(
          //     returnedDoc.toId,
          //     "base64"
          //   ).toJSON();
          //   //console.log("newReq:\n", returnedDoc);
          //   docArray = [...docArray, returnedDoc];
          //   //docArray.push(returnedDoc)
          // }

          this.setState(
            { YourPayGroupsPubKeyDoc: d[0].toJSON(), isLoadingPayGroups: false } //,() => this.check2PartyRace()
          );
        }
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
      })
      .finally(() => client.disconnect());
  };

  RegisterYourPayGroupPubKey = () => {
    console.log("Called Register YourPayGroupsECDHPubKey");
    this.setState({
      isLoadingPayGroups: true,
      YourPayGroupsPubKeyDoc: "Querying",
    });

    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        this.state.mnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    const submitNoteDocument = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      } // Your identity ID

      //create wallet from new Mnemonic

      let wallet = new Mnemonic(this.state.mnemonic);

      let hdPrivateKey = wallet.toHDPrivateKey();

      //Determine the timeIndex -> DONE

      let theTime = Date.now();

      //console.log("returnedDoc: ", returnedDoc);
      let timeStamp = theTime - 1744000000000;
      // console.log("timeStamp: ", timeStamp);

      // this is milliseconds *** -> truncate to fix
      //   //`m/2147483647` <- LIMIT, will hit in 68 years
      let truncatedTimeStamp = new String(timeStamp).slice(0, -3);

      //"m/2025'/5'/1'/timeIndex'"
      let hdPrivateKeyChild = hdPrivateKey.deriveChild(
        `m/2025'/5'/1'/${truncatedTimeStamp}'`
      );

      let PublicKey = new HDPublicKey(
        hdPrivateKeyChild,
        this.state.whichNetwork
      ).toObject().publicKey;

      // CHANGED xpubkey to -> publicKey

      console.log("PublicKey", PublicKey);

      const docProperties = {
        //'pubKey', 'timeIndex','data','groupData','extra'
        pubKey: PublicKey,
        timeIndex: parseInt(truncatedTimeStamp),
        data: "",
        //JSON.stringify({  }),
        groupData: "",
        extra: "",
      };

      // Create the note document
      const PayGroupDoc = await platform.documents.create(
        "PayGroupsContract.ECDHxDoc",
        identity,
        docProperties
      );

      //############################################################
      //This below disconnects the document sending..***

      //return PayGroupDoc;

      //This is to disconnect the Document Creation***
      //############################################################

      const documentBatch = {
        create: [PayGroupDoc], // Document(s) to create
      };
      // Sign and submit the document(s)
      await platform.documents.broadcast(documentBatch, identity);
      return PayGroupDoc;
    };

    submitNoteDocument()
      .then((d) => {
        let returnedDoc = d.toJSON(); //d[0].toJSON();

        if (returnedDoc.data !== "") {
          returnedDoc.data = JSON.parse(returnedDoc.data);
        }

        console.log("Document:\n", returnedDoc);

        this.setState(
          {
            YourPayGroupsPubKeyDoc: returnedDoc,
            isLoadingPayGroups: false,
          },
          () => this.loadIdentityCredits()
        );
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
      })
      .finally(() => client.disconnect());
  };

  //Unused for now
  editYourPayGroupPubKey = () => {
    //If the items are not stringified, then need to stringify before saving

    //  console.log("Called Edit YourPayGroupPubKey");
    this.setState({
      isLoadingPayGroups: true,
    });

    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        this.state.mnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    const submitPayGroupDoc = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      }

      const [document] = await client.platform.documents.get(
        "PayGroupsContract.ECDHxDoc",
        {
          where: [["$id", "==", this.state.YourPayGroupsPubKeyDoc.$id]],
        }
      );

      document.set("xPubKey", JSON.stringify([...editedProxyList]));

      await platform.documents.broadcast({ replace: [document] }, identity);
      return document;

      //############################################################
      //This below disconnects the document editing..***

      // return document;

      //This is to disconnect the Document editing***
      //############################################################
    };

    submitPayGroupDoc()
      .then((d) => {
        let returnedDoc = d.toJSON();
        //console.log("Document:\n", returnedDoc);

        // returnedDoc.replyId = Identifier.from(
        //   returnedDoc.replyId,
        //   "base64"
        // ).toJSON();

        //returnedDoc.proxyList = JSON.parse(returnedDoc.proxyList);

        console.log("YourPubKeyDocument:\n", returnedDoc);

        this.setState(
          {
            YourPayGroupsPubKeyDoc: returnedDoc,
            isLoadingProxy: false,
          },
          () => this.loadIdentityCredits()
        );
      })
      .catch((e) => {
        console.error(
          "Something went wrong with YourPayGroup PubKey edit:\n",
          e
        );
      })
      .finally(() => client.disconnect());
  };

  pullInitialTriggerPAYGROUPS = () => {
    if (this.state.InitialPullPAYGROUPS) {
      this.startMyPayGroupsRace();

      this.setState({
        InitialPullPAYGROUPS: false,
      });
    }
  };

  handlePayGroupsOrderFilter = (theSelected) => {
    this.setState({
      DisplayPayGroupsOrder: theSelected,
    });
  };

  handleRefresh_PayGroups = () => {
    this.setState({
      //isLoadingWallet: true,
      isLoadingPayGroups: true,
      isPayGroupsRefreshReady: false,
    });

    this.startMyPayGroupsRace();
    //this.getPayGroupsWallet(); //Need this??
    this.loadIdentityCredits();

    //REFRESH -> TIMEOUT
    //if (!this.state.isPayGroupsRefreshReady) {
    const PayGroupsTimeout = setTimeout(this.allowPayGroupsRefresh, 8000);
    // }
    //REFRESH -> TIMEOUT
  };

  allowPayGroupsRefresh = () => {
    this.setState({
      isPayGroupsRefreshReady: true,
    });
  };

  startMyPayGroupsRace = () => {
    if (!this.state.isLoadingPayGroups) {
      this.setState({ isLoadingPayGroups: true });
    }
    this.getAllYourPayGroupDocs();
  };

  checkMyPayGroupsRace = () => {
    if (this.state.PayGroups1 && this.state.PayGroups2) {
      this.setState(
        {
          // isLoadingWallet: false,
          isLoadingPayGroups: false,

          PayGroups1: false,
          PayGroups2: false,
        },
        () => this.pullMultiSigUTXOs()
      );
    }
  };

  pullMultiSigUTXOs = () => {
    console.log("Calling pullMultiSigUTXOs");

    //WILL NEED ALL YOURMBRDOCS -> LOOP THROUGH AND GET SCRIPTS ->

    let allYourPayGroupsScripts = [];
    //
    this.state.YourPayGroups.forEach((x) => {
      let keyArray = [];
      if (x.scripts.pub !== undefined) {
        keyArray = Object.keys(x.scripts.pub);
        keyArray.forEach((y) => {
          allYourPayGroupsScripts.push(x.scripts.pub[y][0]);
        });
      }
    });

    console.log("allYourPayGroupsScripts: ", allYourPayGroupsScripts);

    const getYourPGScripts = async () => {
      //check that it is not [] empty ->
      let utxos = await multiSigUTXOsQuery(
        allYourPayGroupsScripts,
        this.state.whichNetwork
      );
      return utxos;
    };

    getYourPGScripts()
      .then((d) => {
        console.log("API Data: ", d);

        this.setState({
          YourPGsMultiSigUTXOs: d,
        });
      })
      .catch((e) => console.error("Something went wrong:\n", e));

    //allYourPayGroupDocs should be an array of arrays
  };

  //QUERY -> myPayGroup -> $ownerId
  //   Limit will be 100 (forEach) Pay Groups for now. by date created or could assign with extra in ECDHxDoc <- ** idea for later.
  //[mbrs2Doc, mbrs3Doc, mbrs4Doc, mbrs5Doc, mbrs6Doc, mbrs7Doc, mbrs8Doc]

  getAllYourPayGroupDocs = () => {
    //console.log("Calling getAllYourPayGroupDocs");

    let docArray = [
      "mbrs1Doc",
      "mbrs2Doc",
      "mbrs3Doc",
      "mbrs4Doc",
      "mbrs5Doc",
      // "mbrs6Doc",
    ]; // 'mbrs7Doc', 'mbrs8Doc'

    let allYourPayGroupDocs;

    const getYourPGDocs = async () => {
      const promises = docArray.map((numOfMbrs) => {
        return this.getYourPayGroupDocs(numOfMbrs);
      });
      allYourPayGroupDocs = await Promise.all(promises);
      return allYourPayGroupDocs;
    };

    getYourPGDocs()
      .then((d) => {
        console.log("Your Pay Groups: ", d);

        //THIS NEEDS TO BE JUST AN ARRAY OF DOCS NOT ARRAY-OF-ARRAY SO FLATMAP
        //[[mbrs2docs..],[mbrs3docs..],[...]]
        let flatArray = d.flat();
        console.log("flatArray: ", flatArray);
        //[mbrs2docs..,mbrs3docs..,...]

        if (flatArray.length === 0) {
          this.setState(
            {
              YourPayGroups: [],
              YourPayGroupsNames: [],
              YourPayGroupsMbrs: [],
              YourPayGroupsPubKeys: [],
              PayGroups1: true,
              PayGroups2: true,
            },
            () => this.checkMyPayGroupsRace()
          );
        } else {
          this.getAllMberPayGroupDocs(flatArray); //-> PayGroup1

          this.getYourPayGroupNames(flatArray);
        }

        //this.

        // if (d.length === 0) {
        //   console.log(`There are no ${theNumOfMbrs}`);
        //   return [];
        // } else {
        //   let docArray = [];
        //   for (const n of d) {
        //     let returnedDoc = n.toJSON();
        //     docArray.push(returnedDoc);
        //   }
        //   return docArray;
        // }
      })
      .catch((e) => console.error("Something went wrong:\n", e));

    //allYourPayGroupDocs should be an array of arrays
    //console.log("Your Pay Groups: ", allYourPayGroupDocs);
  };

  // performs (7->5)
  getYourPayGroupDocs = async (theNumOfMbrs) => {
    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));

    const getDocuments = async () => {
      return client.platform.documents.get(
        `PayGroupsContract.${theNumOfMbrs}`,
        {
          // limit: 100,
          where: [
            ["$ownerId", "==", this.state.identity],
            ["$createdAt", "<=", Date.now()],
          ],
          orderBy: [["$createdAt", "desc"]],
        }
      );
    };

    return getDocuments()
      .then((d) => {
        if (d.length === 0) {
          // console.log(`There are no ${theNumOfMbrs}`);
          return [];
        } else {
          let isDecodeError = false;
          let docArray = [];
          for (const n of d) {
            let returnedDoc = n.toJSON();
            //console.log("MbrDoc:\n", returnedDoc);

            returnedDoc.payGroupId = Identifier.from(
              returnedDoc.payGroupId,
              "base64"
            ).toJSON();

            returnedDoc.forMbrs = JSON.parse(returnedDoc.forMbrs);

            if (returnedDoc.scripts !== "") {
              returnedDoc.scripts = JSON.parse(returnedDoc.scripts);
            }

            //DECRYPT dATA TO tEST -> sat

            let DecryptedFromMbrs = DocKeyDecrypt(
              returnedDoc.fromMbrs,
              returnedDoc.timeIndex,
              this.state.mnemonic
            );

            //console.log("DecryptedFromMbrs: ", DecryptedFromMbrs);

            //SO FromMbrs ONLY SAVE ON FINALIZED EDIT -> CHECK ->
            // ALSO NEED TO ADD FOR THE FINAL DOC EDIT BC THIS ONLY ADD ON THE PULL ->
            //
            let mbrsXPubsToPass = JSON.parse(DecryptedFromMbrs);

            // THEREFORE CAN DECRYPT AND SAVE AS mbrsXPubs after I add my own to the array ->

            // function getYourXPub(theMnemonic,theTimeIndex,whichNetwork)

            mbrsXPubsToPass.push(
              getYourXPub(
                this.state.mnemonic,
                returnedDoc.timeIndex,
                this.state.whichNetwork
              )
            );

            console.log("mbrsXPubsToPass: ", mbrsXPubsToPass);

            returnedDoc.mbrsXPubs = mbrsXPubsToPass;

            // if (returnedDoc.fromMbrs !== "") {
            //   returnedDoc.fromMbrs = JSON.parse(returnedDoc.fromMbrs);
            // }

            //ALSO NEED TO FOR EACH MBR# ->  ***
            let mbrNum = parseInt(returnedDoc.$type.slice(4, 5));

            if (mbrNum === 1) {
              returnedDoc.mbrsList = JSON.parse(returnedDoc.mbrsList);
            } else {
              for (let i = 2; i <= mbrNum; i++) {
                returnedDoc[`mbr${i}`] = Identifier.from(
                  returnedDoc[`mbr${i}`],
                  "base64"
                ).toJSON();
              }
            }

            docArray.push(returnedDoc);
          }
          return docArray;
        }
      })
      .catch((e) => console.error("Something went wrong:\n", e))
      .finally(() => client.disconnect());
  };
  //pull the mbrs from each mbr#doc, create unique set
  //Your number of PayGroups will be directly equall to # of MemberPayGroup Queries
  //QUERY -> mber$Docs ->
  getAllMberPayGroupDocs = async (yourPayGroupDocs) => {
    let allMbrDocs;

    //get the mbr1Docs -> create a document for the type, payGroupId, and OwnerIds and pass that doc into -> DONE
    //get the non mbr1Docs -> create a mbr1Doc query doc for them -> DONE

    //Get joinedMbrDocs and initialMbrDoc
    let joinAndInitialMbrDocs = [...yourPayGroupDocs];

    yourPayGroupDocs.forEach((pgDoc) => {
      if (pgDoc.$type === "mbrs1Doc") {
        let standInDoc = {};
        //
        pgDoc.mbrsList.forEach((mbr, index) => {
          standInDoc[`mbr${index + 2}`] = mbr;
        });
        //
        standInDoc.$type = `mbrs${pgDoc.mbrsList.length + 1}Doc`;
        standInDoc.payGroupId = pgDoc.payGroupId;
        //
        //console.log("standInDoc: ", standInDoc);
        //
        joinAndInitialMbrDocs.push(standInDoc);
      } else {
        let standInDoc = {};
        //
        let mbrNum = parseInt(pgDoc.$type.slice(4, 5));
        let ownerArrayOfMbrIds = [];
        for (let i = 2; i <= mbrNum; i++) {
          ownerArrayOfMbrIds.push(pgDoc[`mbr${i}`]);
        }
        standInDoc.mbrsList = ownerArrayOfMbrIds;
        standInDoc.$type = `mbrs1Doc`;
        standInDoc.payGroupId = pgDoc.payGroupId;
        //
        joinAndInitialMbrDocs.push(standInDoc);
      }
    });

    //console.log("joinAndInitialMbrDocs: ", joinAndInitialMbrDocs);

    const getPGMbrsDocs = async () => {
      const promises = joinAndInitialMbrDocs.map((pgDoc) => {
        return this.getMberDocs(pgDoc);
      });
      allMbrDocs = await Promise.all(promises);
      return allMbrDocs;
    };

    getPGMbrsDocs()
      .then((d) => {
        console.log("Mbr Pay Group Docs: ", d.flat());

        this.setState(
          {
            YourPayGroups: yourPayGroupDocs,
            YourPayGroupsMbrs: d.flat(),
            PayGroups1: true,
          },
          () => this.checkMyPayGroupsRace()
        );
        // if (d.length === 0) {
        //   console.log(`There are no ${theNumOfMbrs}`);
        //   return [];
        // } else {
        //   let docArray = [];
        //   for (const n of d) {
        //     let returnedDoc = n.toJSON();
        //     docArray.push(returnedDoc);
        //   }
        //   return docArray;
        // }
      })
      .catch((e) => console.error("Something went wrong:\n", e));
  };
  //
  getMberDocs = async (thePayGroupDoc) => {
    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));

    //Get an array of the mbr ids ->
    //ALSO NEED TO FOR EACH MBR# ->  ***

    let mbrNum = parseInt(thePayGroupDoc.$type.slice(4, 5));

    let ownerArrayOfMbrIds = [];

    if (mbrNum === 1) {
      ownerArrayOfMbrIds = [...thePayGroupDoc.mbrsList];
    } else {
      for (let i = 2; i <= mbrNum; i++) {
        ownerArrayOfMbrIds.push(thePayGroupDoc[`mbr${i}`]);
      }
    }

    //console.log("ownerArrayOfMbrIds: ", ownerArrayOfMbrIds);

    // let setOfToIds = [...new Set(ownerarrayOfToIds)];

    // let arrayOfToIds = [...setOfToIds];

    const getDocuments = async () => {
      // console.log("Called GetMbrDocs");
      //doc.docType ->
      return client.platform.documents.get(
        `PayGroupsContract.${thePayGroupDoc.$type}`,
        {
          where: [
            ["payGroupId", "==", thePayGroupDoc.payGroupId],
            ["$ownerId", "in", ownerArrayOfMbrIds],
          ],
          orderBy: [["$ownerId", "asc"]],
        }
      );
    };

    return getDocuments()
      .then((d) => {
        if (d.length === 0) {
          return [];
        } else {
          let docArray = [];

          for (const n of d) {
            let returnedDoc = n.toJSON();
            //console.log("MbrDoc:\n", returnedDoc);
            returnedDoc.payGroupId = Identifier.from(
              returnedDoc.payGroupId,
              "base64"
            ).toJSON();

            returnedDoc.forMbrs = JSON.parse(returnedDoc.forMbrs);

            if (returnedDoc.scripts !== "") {
              returnedDoc.scripts = JSON.parse(returnedDoc.scripts);
            }

            //ALSO NEED TO FOR EACH MBR# ->  ***

            let mbrNum = parseInt(returnedDoc.$type.slice(4, 5));

            if (mbrNum === 1) {
              returnedDoc.mbrsList = JSON.parse(returnedDoc.mbrsList);
            } else {
              for (let i = 2; i <= mbrNum; i++) {
                returnedDoc[`mbr${i}`] = Identifier.from(
                  returnedDoc[`mbr${i}`],
                  "base64"
                ).toJSON();
              }
            }

            //console.log("newMbrDoc:\n", returnedDoc);
            docArray = [...docArray, returnedDoc];
            //docArray.push(returnedDoc)
          }

          return docArray;
        }
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
      })
      .finally(() => client.disconnect());
  };

  //  Limit will be 100 mbrNames for now.
  getYourPayGroupNames = (docArray) => {
    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));
    //START OF NAME RETRIEVAL

    let ownerArrayOfMbrIds = [];

    docArray.forEach((doc) => {
      let mbrNum = parseInt(doc.$type.slice(4, 5));

      if (mbrNum === 1) {
        ownerArrayOfMbrIds = [...doc.mbrsList, ...ownerArrayOfMbrIds];
      } else {
        for (let i = 2; i <= mbrNum; i++) {
          ownerArrayOfMbrIds.push(doc[`mbr${i}`]);
        }
      }
    });

    let setOfMbrIds = [...new Set(ownerArrayOfMbrIds)];

    let arrayOfMbrIds = [...setOfMbrIds];

    //console.log("Calling get2PartyByYouNames");

    const getNameDocuments = async () => {
      return client.platform.documents.get("DPNSContract.domain", {
        where: [["records.identity", "in", arrayOfMbrIds]],
        orderBy: [["records.identity", "asc"]],
      });
    };

    getNameDocuments()
      .then((d) => {
        if (d.length === 0) {
          //console.log("No DPNS domain documents retrieved.");
        }

        let nameDocArray = [];

        for (const n of d) {
          //console.log("NameDoc:\n", n.toJSON());

          nameDocArray = [n.toJSON(), ...nameDocArray];
        }
        console.log(`DPNS Name Docs: ${nameDocArray}`);

        //CALLING THE PUBLIC KEYS DOCS HERE***
        this.getYourPayGroupPubKeys(nameDocArray, arrayOfMbrIds);
        //
      })
      .catch((e) => {
        console.error("Something went wrong getting YourPayGroup Names:\n", e);
      })
      .finally(() => client.disconnect());
    //END OF NAME RETRIEVAL
  };

  //  Limit will be 100 mbrXPubKeys for now.
  getYourPayGroupPubKeys = (theNameDocArray, arrayOfMbrIds) => {
    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));

    //console.log("Calling get2PartyFromYouPubKeys");

    const getPublicKeyDocuments = async () => {
      return client.platform.documents.get("PayGroupsContract.ECDHxDoc", {
        where: [["$ownerId", "in", arrayOfMbrIds]],
        orderBy: [["$ownerId", "asc"]],
      });
    };

    getPublicKeyDocuments()
      .then((d) => {
        if (d.length === 0) {
          console.log("No PayGroupPubKeys documents retrieved.");
        }

        let pubKeyDocArray = [];

        for (const n of d) {
          // console.log("PubKeyDoc:\n", n.toJSON());

          pubKeyDocArray = [n.toJSON(), ...pubKeyDocArray];
        }
        // console.log(`Public Key Docs: ${pubKeyDocArray}`);

        this.setState(
          {
            YourPayGroupsNames: theNameDocArray,
            YourPayGroupsPubKeys: pubKeyDocArray,
            PayGroups2: true,
          },
          () => this.checkMyPayGroupsRace()
        );
      })
      .catch((e) => {
        console.error(
          "Something went wrong getting YourPay Groups PubKeys:\n",
          e
        );
      })
      .finally(() => client.disconnect());
  };

  /// Create/Join Pay Group Page

  pullInitialTriggerJoinPAYGROUPS = () => {
    if (this.state.InitialPullJoinPAYGROUPS) {
      this.startJoinPayGroupsRace();

      this.setState({
        InitialPullJoinPAYGROUPS: false,
      });
    }
  };

  startJoinPayGroupsRace = () => {
    if (!this.state.isLoadingPayGroups) {
      this.setState({ isLoadingPayGroups: true });
    }
    this.getAllJoinPayGroupDocs();
  };

  handleRefresh_JoinGroups = () => {
    this.setState({
      //isLoadingWallet: true,
      isLoadingPayGroups: true,
      isJoinGroupsRefreshReady: false,
    });

    this.getAllJoinPayGroupDocs();
    //this.loadIdentityCredits();

    //REFRESH -> TIMEOUT
    //if (!this.state.isJoinGroupsRefreshReady) {
    const JoinGroupsTimeout = setTimeout(this.allowJoinGroupsRefresh, 6000);
    // }
    //REFRESH -> TIMEOUT
  };

  allowJoinGroupsRefresh = () => {
    this.setState({
      isJoinGroupsRefreshReady: true,
    });
  };

  getAllJoinPayGroupDocs = () => {
    //console.log("Calling getAllJoinPayGroupDocs");

    let docArray = [
      "mbrs2Doc",
      "mbrs3Doc",
      "mbrs4Doc",
      "mbrs5Doc", //"mbrs6Doc"
    ]; // 'mbrs7Doc', 'mbrs8Doc'

    let allJoinPayGroupDocs;

    const getJoinPGDocs = async () => {
      const promises = docArray.map((numOfMbrs) => {
        return this.getJoinPayGroupDocs(numOfMbrs);
      });
      allJoinPayGroupDocs = await Promise.all(promises);
      return allJoinPayGroupDocs;
    };

    getJoinPGDocs()
      .then((d) => {
        console.log("Join Pay Groups: ", d);

        //THIS NEEDS TO BE JUST AN ARRAY OF DOCS NOT ARRAY-OF-ARRAY SO FLATMAP
        //[[mbrs2docs..],[mbrs3docs..],[...]]
        let flatArray = d.flat();
        console.log("flatArray: ", flatArray);
        //[mbrs2docs..,mbrs3docs..,...]

        //this.getJoinPayGroupDocs(flatArray); //-> PayGroup3
        //DO i NEED ^^^ THIS ?  <- NO

        if (flatArray.length === 0) {
          this.setState(
            {
              JoinPayGroups: [],
              JoinPayGroupsNames: [],
              JoinPayGroupsPubKeys: [],
              isLoadingPayGroups: false,
              //PayGroups3: true,
              //PayGroups4: true,
            }
            //,() => this.checkJoinPayGroupsRace()
          );
        } else {
          this.getJoinPayGroupNames(flatArray);
        }
      })
      .catch((e) => console.error("Something went wrong:\n", e));
  };

  getJoinPayGroupDocs = async (mbrDocNum) => {
    let numJoinDocs;

    let mbrNumArr = [];

    let mbrNum = parseInt(mbrDocNum.slice(4, 5));

    for (let i = 2; i <= mbrNum; i++) {
      mbrNumArr.push(`mbr${i}`);
    }

    const getJoinMbrsDocs = async () => {
      const promises = mbrNumArr.map((mbrNum) => {
        return this.getJoinPayGroupIndexDocs(mbrDocNum, mbrNum);
      });

      numJoinDocs = await Promise.all(promises);
      return numJoinDocs;
    };

    return getJoinMbrsDocs()
      .then((d) => {
        //console.log("Join Pay Group Docs: ", d.flat());
        return d.flat();
      })
      .catch((e) => console.error("Something went wrong:\n", e));
  };

  //getJoinPayGroupIndex  QUERY: [mbr#]
  getJoinPayGroupIndexDocs = async (theNumOfMbrs, mbrNum) => {
    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));

    const getDocuments = async () => {
      return client.platform.documents.get(
        `PayGroupsContract.${theNumOfMbrs}`,
        {
          // limit: 100,
          where: [[mbrNum, "==", this.state.identity]],
        }
      );
    };

    return getDocuments()
      .then((d) => {
        if (d.length === 0) {
          //console.log(`There are no ${mbrNum} of ${theNumOfMbrs}`);
          return [];
        } else {
          let docArray = [];
          for (const n of d) {
            let returnedDoc = n.toJSON();
            console.log("MbrDoc:\n", returnedDoc);

            returnedDoc.payGroupId = Identifier.from(
              returnedDoc.payGroupId,
              "base64"
            ).toJSON();

            returnedDoc.forMbrs = JSON.parse(returnedDoc.forMbrs);

            // if (returnedDoc.fromMbrs !== "") {
            //   returnedDoc.fromMbrs = JSON.parse(returnedDoc.fromMbrs);
            // }

            //decryptMyReqs(theReqs, theMnemonic, whichNetwork)
            // let decryptedDocs = decryptMyReqs(
            //   docArray,
            //   this.state.mnemonic,
            //   this.state.whichNetwork
            // );

            //ALSO NEED TO FOR EACH MBR# ->  ***
            let mbrNum = parseInt(returnedDoc.$type.slice(4, 5));

            if (mbrNum === 1) {
              returnedDoc.mbrsList = JSON.parse(returnedDoc.mbrsList);
            } else {
              for (let i = 2; i <= mbrNum; i++) {
                returnedDoc[`mbr${i}`] = Identifier.from(
                  returnedDoc[`mbr${i}`],
                  "base64"
                ).toJSON();
              }
            }

            docArray.push(returnedDoc);
          }
          return docArray;
        }
      })
      .catch((e) => console.error("Something went wrong:\n", e))
      .finally(() => client.disconnect());
  };

  getJoinPayGroupNames = (docArray) => {
    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));
    //START OF NAME RETRIEVAL

    let ownerArrayOfMbrIds = [];

    docArray.forEach((doc) => {
      let mbrNum = parseInt(doc.$type.slice(4, 5));

      for (let i = 2; i <= mbrNum; i++) {
        ownerArrayOfMbrIds.push(doc[`mbr${i}`]);
      }

      ownerArrayOfMbrIds.push(doc.$ownerId);
    });

    let setOfMbrIds = [...new Set(ownerArrayOfMbrIds)];

    let arrayOfMbrIds = [...setOfMbrIds];

    //console.log("Calling get2PartyByYouNames");

    const getNameDocuments = async () => {
      return client.platform.documents.get("DPNSContract.domain", {
        where: [["records.identity", "in", arrayOfMbrIds]],
        orderBy: [["records.identity", "asc"]],
      });
    };

    getNameDocuments()
      .then((d) => {
        if (d.length === 0) {
          //console.log("No DPNS domain documents retrieved.");
        }

        let nameDocArray = [];

        for (const n of d) {
          //console.log("NameDoc:\n", n.toJSON());

          nameDocArray = [n.toJSON(), ...nameDocArray];
        }
        console.log(`DPNS Name Docs: ${nameDocArray}`);

        //CALLING THE PUBLIC KEYS DOCS HERE***
        this.getJoinPayGroupPubKeys(docArray, nameDocArray, arrayOfMbrIds);
        //
      })
      .catch((e) => {
        console.error("Something went wrong getting YourPayGroup Names:\n", e);
      })
      .finally(() => client.disconnect());
    //END OF NAME RETRIEVAL
  };

  getJoinPayGroupPubKeys = (docArray, theNameDocArray, arrayOfMbrIds) => {
    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));

    //console.log("Calling get2PartyFromYouPubKeys");

    const getPublicKeyDocuments = async () => {
      return client.platform.documents.get("PayGroupsContract.ECDHxDoc", {
        where: [["$ownerId", "in", arrayOfMbrIds]],
        orderBy: [["$ownerId", "asc"]],
      });
    };

    getPublicKeyDocuments()
      .then((d) => {
        if (d.length === 0) {
          console.log("No PayGroupPubKeys documents retrieved.");
        }

        let pubKeyDocArray = [];

        for (const n of d) {
          console.log("PubKeyDoc:\n", n.toJSON());

          pubKeyDocArray = [n.toJSON(), ...pubKeyDocArray];
        }
        // console.log(`Public Key Docs: ${pubKeyDocArray}`);

        this.setState(
          {
            JoinPayGroups: docArray,
            JoinPayGroupsNames: theNameDocArray,
            JoinPayGroupsPubKeys: pubKeyDocArray,
            isLoadingPayGroups: false,
            //PayGroups2: true,
          } //,() => this.checkMyPayGroupsRace()
        );
      })
      .catch((e) => {
        console.error(
          "Something went wrong getting YourPay Groups PubKeys:\n",
          e
        );
      })
      .finally(() => client.disconnect());
  };

  showConfirmCreatePayGroupModal = (theNameDocs, theECDHDocs) => {
    this.setState({
      // sendPmtMsgSuccess2Party: false,
      // sendPmtMsgFailure2Party: false,

      newPayGroupNameDocs: theNameDocs,
      newPayGroupECDHDocs: theECDHDocs,

      presentModal: "ConfirmCreatePayGroupModal",
      isModalShowing: true,
    });
  };

  createPayGroupMbrDoc = () => {
    //console.log("Called Create Pay Group Mbr Doc");

    this.setState({
      isLoadingPayGroups: true,
      isModalShowing: false,
      selectedDapp: "Pay Groups",
      //DisplayReqsOrPmts: "Requests",
    });

    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        this.state.mnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    let docProperties = {};

    const submitDocument = async () => {
      const { platform } = client;
      // const identity = await platform.identities.get(this.state.identity); // Your identity ID

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      } // Your identity ID

      // ***   ***   ***   ***
      // ***   ***   ***   ***   ***

      //BUILD THE FORMBRS ->
      //Determine the timeIndex -> DONE

      let theTime = Date.now();

      //console.log("returnedDoc: ", returnedDoc);
      let timeStamp = theTime - 1744000000000;
      // console.log("timeStamp: ", timeStamp);

      // this is milliseconds *** -> truncate to fix
      //   //`m/2147483647` <- LIMIT, will hit in 68 years
      let truncatedTimeStamp = new String(timeStamp).slice(0, -3);

      //SEND TO ECDHxEncrypt ->

      //for the mbrDoc is should be a hd xPubKey for multisigs.

      let wallet = new Mnemonic(this.state.mnemonic);

      let hdPrivateKey = wallet.toHDPrivateKey();

      let hdPrivateKeyChildPath3 = hdPrivateKey.deriveChild(
        `m/2025'/5'/3'/${truncatedTimeStamp}'`
      );

      let xPublicKey = new HDPublicKey(
        hdPrivateKeyChildPath3,
        this.state.whichNetwork
      ).toObject().xpubkey;
      // // CHANGED publicKey to -> xpubkey

      console.log("HDxPublicKey", xPublicKey);

      // TEST of DashMoney3 to BurgerJoint3: SAT

      //Should also just get private key here as well -> no this one is repeating but unrelated

      //ECDHxEncrypt(thePackage,theECDHxDocArray,yourECDHxDoc,  theTimeIndex,theMnemonic,//whichNetwork)

      let encryptedForMbrs = ECDHxEncrypt(
        xPublicKey,
        this.state.newPayGroupECDHDocs,
        this.state.YourPayGroupsPubKeyDoc,
        // truncatedTimeStamp,
        this.state.mnemonic
        // this.state.whichNetwork
      );

      // ***   ***   ***   ***   ***
      // ***   ***   ***   ***

      docProperties = {
        payGroupId: Identifier.from(crypto.Random.getRandomBuffer(32)).toJSON(),
        // 'mbr2', -> 'mbr8',
        timeIndex: parseInt(truncatedTimeStamp),
        forMbrs: JSON.stringify(encryptedForMbrs),
        fromMbrs: "",
        scripts: "",
        extra: "",
      };

      //Add property to DocProperties for each mbrIndex ->

      // `mbrs${length+2}Doc`

      // const myObject = {};
      // myObject.newProperty = 'new value';

      this.state.newPayGroupECDHDocs.forEach((mbr, index) => {
        docProperties[`mbr${index + 2}`] = mbr.$ownerId;
      });

      console.log("docProperties: ", docProperties);

      //DocKey encrypt the fromMbrs with timeIndex -> not yet.

      // Create the note document
      const PayGroupDocument = await platform.documents.create(
        `PayGroupsContract.mbrs${this.state.newPayGroupECDHDocs.length + 1}Doc`,
        identity,
        docProperties
      );

      //console.log("Initial Doc: ", PayGroupDocument.toJSON());

      //DocKey Encryption -> Not needed and also changed to timeIndex

      //3 BELOW - all failed
      //PayGroupDocument.payGroupId = PayGroupDocument.$id;
      //document.set("payGroupId", PayGroupDocument.$id);
      //PayGroupDocument.assign("PayGroupId", PayGroupDocument.$id);

      //console.log("Final Doc: ", PayGroupDocument.toJSON());

      //############################################################
      //This below disconnects the document sending..***

      //return PayGroupDocument;

      //This is to disconnect the Document Creation***

      //############################################################

      const documentBatch = {
        create: [PayGroupDocument], // Document(s) to create
      };

      await platform.documents.broadcast(documentBatch, identity);
      return PayGroupDocument;
    };

    submitDocument()
      .then((d) => {
        let returnedDoc = d.toJSON();

        returnedDoc.payGroupId = Identifier.from(
          returnedDoc.payGroupId,
          "base64"
        ).toJSON();

        returnedDoc.forMbrs = JSON.parse(returnedDoc.forMbrs);

        //ALSO NEED TO FOR EACH MBR# ->  ***
        //can use the number of ECDHxDocs again.

        this.state.newPayGroupECDHDocs.forEach((mbr, index) => {
          returnedDoc[`mbr${index + 2}`] = Identifier.from(
            returnedDoc[`mbr${index + 2}`],
            "base64"
          ).toJSON();
        });

        //GET RID OF BELOW STUFF ->

        //Buffer.from(returnedDoc.req).toString()

        //returnedDoc.msgObject = JSON.parse(returnedDoc.msgObject);

        console.log("MbrDocument:\n", returnedDoc);

        this.setState(
          {
            YourPayGroups: [returnedDoc, ...this.state.YourPayGroups],
            //YourPayGroupsMbrs: [],
            YourPayGroupsNames: [
              ...this.state.newPayGroupNameDocs,
              ...this.state.YourPayGroupsNames,
            ],
            YourPayGroupsPubKeys: [
              ...this.state.newPayGroupECDHDocs,
              ...this.state.YourPayGroupsPubKeys,
            ],

            isLoadingPayGroups: false,
          }
          //() => this.handleRefresh_PayGroups()
        );
      })
      .catch((e) => {
        this.setState({
          isLoadingPayGroups: false,
        });

        console.error("Something went wrong creating new Pay Group:\n", e);
      })
      .finally(() => client.disconnect());
  };

  showConfirmJoinPayGroupModal = (theNameDocs, theECDHDocs, theInviteDoc) => {
    let filteredNameDocs = theNameDocs.filter(
      (x) => x.$ownerId !== this.state.identity
    );
    let filteredECDHDocs = theECDHDocs.filter(
      (x) => x.$ownerId !== this.state.identity
    );

    this.setState({
      // sendPmtMsgSuccess2Party: false,
      // sendPmtMsgFailure2Party: false,

      newPayGroupNameDocs: filteredNameDocs,
      newPayGroupECDHDocs: filteredECDHDocs,

      newJoinPayGroupDoc: theInviteDoc,

      presentModal: "ConfirmJoinPayGroupModal",
      isModalShowing: true,
    });
  };

  joinPayGroupMbrDoc = () => {
    //console.log("Called Create Pay Group Mbr Doc");

    this.setState({
      isLoadingPayGroups: true,
      isModalShowing: false,
      selectedDapp: "Pay Groups",
      //DisplayReqsOrPmts: "Requests",
    });

    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        this.state.mnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    let docProperties = {};

    const submitDocument = async () => {
      const { platform } = client;
      // const identity = await platform.identities.get(this.state.identity); // Your identity ID

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      } // Your identity ID

      // ***   ***   ***   ***
      // ***   ***   ***   ***   ***

      //BUILD THE FORMBRS ->
      //Determine the timeIndex -> DONE

      let theTime = Date.now();

      //console.log("returnedDoc: ", returnedDoc);
      let timeStamp = theTime - 1744000000000;
      // console.log("timeStamp: ", timeStamp);

      // this is milliseconds *** -> truncate to fix
      //   //`m/2147483647` <- LIMIT, will hit in 68 years
      let truncatedTimeStamp = new String(timeStamp).slice(0, -3);

      //SEND TO ECDHxEncrypt ->

      //for the mbrDoc is should be a hd xPubKey for multisigs.

      let wallet = new Mnemonic(this.state.mnemonic);

      let hdPrivateKey = wallet.toHDPrivateKey();

      let hdPrivateKeyChildPath3 = hdPrivateKey.deriveChild(
        `m/2025'/5'/3'/${truncatedTimeStamp}'`
      );

      let xPublicKey = new HDPublicKey(
        hdPrivateKeyChildPath3,
        this.state.whichNetwork
      ).toObject().xpubkey;
      // // CHANGED publicKey to -> xpubkey

      console.log("HDxPublicKey", xPublicKey);

      // TEST of BurgerJoint3 to DashMoney3: -> SAT

      //Should also just get private key here as well -> no this one is repeating but unrelated

      //ECDHxEncrypt(thePackage,theECDHxDocArray,yourECDHxDoc,  theTimeIndex,theMnemonic,//whichNetwork)

      let encryptedForMbrs = ECDHxEncrypt(
        xPublicKey,
        this.state.newPayGroupECDHDocs,
        this.state.YourPayGroupsPubKeyDoc,
        // truncatedTimeStamp,
        this.state.mnemonic
        // this.state.whichNetwork
      );

      // ***   ***   ***   ***   ***
      // ***   ***   ***   ***

      let mbrsIds = this.state.newPayGroupNameDocs.map((x) => x.$ownerId);

      docProperties = {
        payGroupId: this.state.newJoinPayGroupDoc.payGroupId,
        mbrsList: JSON.stringify(mbrsIds),
        timeIndex: parseInt(truncatedTimeStamp),
        forMbrs: JSON.stringify(encryptedForMbrs),
        fromMbrs: "",
        scripts: "",
        extra: "",
      };

      console.log("docProperties: ", docProperties);

      //DocKey encrypt the fromMbrs with timeIndex -> not yet.

      // Create the note document
      const PayGroupDocument = await platform.documents.create(
        `PayGroupsContract.mbrs1Doc`,
        identity,
        docProperties
      );

      //console.log("Initial Doc: ", PayGroupDocument.toJSON());

      //############################################################
      //This below disconnects the document sending..***

      //return PayGroupDocument;

      //This is to disconnect the Document Creation***

      //############################################################

      const documentBatch = {
        create: [PayGroupDocument], // Document(s) to create
      };

      await platform.documents.broadcast(documentBatch, identity);
      return PayGroupDocument;
    };

    submitDocument()
      .then((d) => {
        let returnedDoc = d.toJSON();

        console.log("MbrDocument:\n", returnedDoc);

        this.handleRefresh_PayGroups();

        // returnedDoc.payGroupId = Identifier.from(
        //   returnedDoc.payGroupId,
        //   "base64"
        // ).toJSON();

        // returnedDoc.forMbrs = JSON.parse(returnedDoc.forMbrs);

        // returnedDoc.mbrsList = JSON.parse(returnedDoc.mbrsList);

        // console.log("MbrDocument:\n", returnedDoc);

        // this.setState(
        //   {
        //     YourPayGroups: [returnedDoc, ...this.state.YourPayGroups],
        //     //YourPayGroupsMbrs: [],
        //     YourPayGroupsNames: [
        //       ...this.state.newPayGroupNameDocs,
        //       ...this.state.YourPayGroupsNames,
        //     ],
        //     YourPayGroupsPubKeys: [
        //       ...this.state.newPayGroupECDHDocs,
        //       ...this.state.YourPayGroupsPubKeys,
        //     ],

        //     isLoadingPayGroups: false,
        //   },
        //   () => this.handleRefresh_PayGroups()
        // );
      })
      .catch((e) => {
        this.setState({
          isLoadingPayGroups: false,
        });

        console.error("Something went wrong joining new Pay Group:\n", e);
      })
      .finally(() => client.disconnect());
  };

  showConfirmCreateMultiSigAcctModal = (theLabel, numOfMbrs) => {
    //Determine index here? ->
    //func(numOfMbrs) and uses your mbrDoc ->
    let theIndex = 1;
    let currentKeys = [];

    let scriptObjKey = numOfMbrs * 10;

    console.log(scriptObjKey);

    if (this.state.selectedPayGroupDoc.scripts !== "") {
      currentKeys = this.state.selectedPayGroupDoc.scripts.pub.keys();
    }
    let orderedKeys = [];

    if (currentKeys.length !== 0) {
      //order highest to lowest -> SAT
      orderedKeys = currentKeys.sort(function (a, b) {
        return b - a;
      });

      console.log("orderedKeys: ", orderedKeys);
    }

    let highestIndex = orderedKeys.find((x) => {
      return x < scriptObjKey + 10 && x > scriptObjKey;
    });

    //console.log(highestIndex);

    if (highestIndex === undefined) {
      theIndex = theIndex + scriptObjKey;
    } else {
      theIndex = highestIndex + 1;
    }

    console.log("theIndex: ", theIndex);

    this.setState({
      multiSigNumOfMbrs: numOfMbrs,
      multiSigLabel: theLabel,
      multiSigIndex: theIndex,
      presentModal: "ConfirmCreateMultiSigAcctModal",
      isModalShowing: true,
    });
  };

  editPayGroupMbrDoc4MultiSigAcct = () => {
    //console.log("Called Edit Pay Group Mbr Doc 4 MultiSig Acct");

    this.setState({
      isLoadingPayGroups: true,
      isModalShowing: false,
      selectedDapp: "PayGroupPmts",
    });

    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        this.state.mnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    const editDocument = async () => {
      const { platform } = client;
      // const identity = await platform.identities.get(this.state.identity); // Your identity ID

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      } // Your identity ID

      const [document] = await client.platform.documents.get(
        `PayGroupsContract.${this.state.selectedPayGroupDoc.$type}`,
        {
          where: [["$id", "==", this.state.selectedPayGroupDoc.$id]],
        }
      );

      // MOVE GET YOURXPUB  TO THE MBR QUERY WHERE THE XPUBS ARE DECRYPTED!! and save them in mbrDoc -> ***

      //multiSigNumOfMbrs
      //multiSigLabel
      //multiSigIndex

      // export default function xPubsInMultiScriptOut(
      //   theXPubs,
      //   theNumOfMbrsReq,
      //   theIndex,
      //   whichNetwork
      // )

      let newMultiSigScripts = xPubsInMultiScriptOut(
        this.state.selectedPayGroupDoc.mbrsXPubs,
        this.state.multiSigNumOfMbrs,
        this.state.multiSigIndex.toString().slice(1, 2),
        this.state.whichNetwork
      );

      //NEED TO GET THE XPUBS FOR ALL MEMBERS -> FROM MY MBRdOC <-***

      //pASS XPUBS AND INDEX TO FUNC ->

      //BUILD MBR DOC SCRIPTS ->
      let newScripts = { pub: {} };
      if (this.state.selectedPayGroupDoc.scripts === "") {
        newScripts.pub[this.state.multiSigIndex] = [
          newMultiSigScripts,
          this.state.multiSigLabel,
        ];
      } else {
        newScripts = this.state.selectedPayGroupDoc.scripts;

        newScripts.pub[this.state.multiSigIndex] = [
          newMultiSigScripts,
          this.state.multiSigLabel,
        ];
      }

      document.set("scripts", JSON.stringify(newScripts));

      await platform.documents.broadcast({ replace: [document] }, identity);
      return document;

      //############################################################
      //This below disconnects the document editing..***

      //return document;

      //This is to disconnect the Document editing***
      //############################################################
    };

    editDocument()
      .then((d) => {
        let returnedDoc = d.toJSON();

        returnedDoc.payGroupId = Identifier.from(
          returnedDoc.payGroupId,
          "base64"
        ).toJSON();

        //returnedDoc.forMbrs = JSON.parse(returnedDoc.forMbrs);
        //Already Parsed ^^

        returnedDoc.scripts = JSON.parse(returnedDoc.scripts);

        //ALSO NEED TO FOR EACH MBR# ->  ***
        let mbrNum = parseInt(returnedDoc.$type.slice(4, 5));

        if (mbrNum === 1) {
          returnedDoc.mbrsList = JSON.parse(returnedDoc.mbrsList);
        } else {
          for (let i = 2; i <= mbrNum; i++) {
            returnedDoc[`mbr${i}`] = Identifier.from(
              returnedDoc[`mbr${i}`],
              "base64"
            ).toJSON();
          }
        }

        //ADD THE XPUBS HERE AS WELL ->
        //returnedDoc.fromMbrs = JSON.parse(returnedDoc.fromMbrs);
        let DecryptedFromMbrs = DocKeyDecrypt(
          returnedDoc.fromMbrs,
          returnedDoc.timeIndex,
          this.state.mnemonic
        );

        console.log("DecryptedFromMbrs: ", DecryptedFromMbrs);

        let mbrsXPubsToPass = JSON.parse(DecryptedFromMbrs);

        // function getYourXPub(theMnemonic,theTimeIndex,whichNetwork)

        mbrsXPubsToPass.push(
          getYourXPub(
            this.state.mnemonic,
            returnedDoc.timeIndex,
            this.state.whichNetwork
          )
        );

        console.log("mbrsXPubsToPass: ", mbrsXPubsToPass);

        returnedDoc.mbrsXPubs = mbrsXPubsToPass;

        // EDIT AND REPLACE :

        let indexToReplace = this.state.YourPayGroups.findIndex(
          (x) => x.$id === returnedDoc.$id
        );
        //console.log(indexToReplace);

        let editedYourPayGroupDocs = this.state.YourPayGroups;

        editedYourPayGroupDocs.splice(parseInt(indexToReplace), 1, returnedDoc);

        console.log("EditedMbrDoc:\n", returnedDoc);

        this.setState(
          {
            selectedPayGroupDoc: returnedDoc,
            YourPayGroups: editedYourPayGroupDocs,
            // selectedDapp: "PayGroupPmts",
            isLoadingPayGroups: false,
          },
          () => this.loadIdentityCredits()
        );
      })
      .catch((e) => {
        this.setState({
          isLoadingPayGroups: false,
        });

        console.error("Something went wrong creating Pay Group Script:\n", e);
      })
      .finally(() => client.disconnect());
  };

  showAcceptMultiSigAcctModal = (theLabel, theIndex) => {
    console.log("theIndex: ", theIndex);

    this.setState({
      multiSigNumOfMbrs: Number(theIndex.toString().slice(0, 1)),
      multiSigLabel: theLabel,
      multiSigIndex: theIndex,
      presentModal: "ConfirmAcceptMultiSigAcctModal",
      isModalShowing: true,
    });
  };

  editPGMbrDocAcceptMultiSigAcct = () => {
    //console.log("Called Edit Pay Group Mbr Doc 4 MultiSig Acct");

    this.setState({
      isLoadingPayGroups: true,
      isModalShowing: false,
      selectedDapp: "PayGroupPmts",
    });

    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        this.state.mnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    const editDocument = async () => {
      const { platform } = client;
      // const identity = await platform.identities.get(this.state.identity); // Your identity ID

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      } // Your identity ID

      const [document] = await client.platform.documents.get(
        `PayGroupsContract.${this.state.selectedPayGroupDoc.$type}`,
        {
          where: [["$id", "==", this.state.selectedPayGroupDoc.$id]],
        }
      );

      // MOVE GET YOURXPUB  TO THE MBR QUERY WHERE THE XPUBS ARE DECRYPTED!! and save them in mbrDoc -> ***

      //multiSigNumOfMbrs
      //multiSigLabel
      //multiSigIndex

      // export default function xPubsInMultiScriptOut(
      //   theXPubs,
      //   theNumOfMbrsReq,
      //   theIndex,
      //   whichNetwork
      // )

      let newMultiSigScripts = xPubsInMultiScriptOut(
        this.state.selectedPayGroupDoc.mbrsXPubs,
        this.state.multiSigNumOfMbrs,
        this.state.multiSigIndex.toString().slice(1, 2),
        this.state.whichNetwork
      );

      //NEED TO GET THE XPUBS FOR ALL MEMBERS -> FROM MY MBRdOC <-***

      //pASS XPUBS AND INDEX TO FUNC ->

      //BUILD MBR DOC SCRIPTS ->
      let newScripts = { pub: {} };
      if (this.state.selectedPayGroupDoc.scripts === "") {
        newScripts.pub[this.state.multiSigIndex] = [
          newMultiSigScripts,
          this.state.multiSigLabel,
        ];
      } else {
        newScripts = this.state.selectedPayGroupDoc.scripts;

        newScripts.pub[this.state.multiSigIndex] = [
          newMultiSigScripts,
          this.state.multiSigLabel,
        ];
      }

      document.set("scripts", JSON.stringify(newScripts));

      // await platform.documents.broadcast({ replace: [document] }, identity);
      // return document;

      //############################################################
      //This below disconnects the document editing..***

      return document;

      //This is to disconnect the Document editing***
      //############################################################
    };

    editDocument()
      .then((d) => {
        let returnedDoc = d.toJSON();

        returnedDoc.payGroupId = Identifier.from(
          returnedDoc.payGroupId,
          "base64"
        ).toJSON();

        //returnedDoc.forMbrs = JSON.parse(returnedDoc.forMbrs);
        //Already Parsed ^^

        returnedDoc.scripts = JSON.parse(returnedDoc.scripts);

        //ALSO NEED TO FOR EACH MBR# ->  ***
        let mbrNum = parseInt(returnedDoc.$type.slice(4, 5));

        if (mbrNum === 1) {
          returnedDoc.mbrsList = JSON.parse(returnedDoc.mbrsList);
        } else {
          for (let i = 2; i <= mbrNum; i++) {
            returnedDoc[`mbr${i}`] = Identifier.from(
              returnedDoc[`mbr${i}`],
              "base64"
            ).toJSON();
          }
        }

        //ADD THE XPUBS HERE AS WELL ->
        //returnedDoc.fromMbrs = JSON.parse(returnedDoc.fromMbrs);
        let DecryptedFromMbrs = DocKeyDecrypt(
          returnedDoc.fromMbrs,
          returnedDoc.timeIndex,
          this.state.mnemonic
        );

        console.log("DecryptedFromMbrs: ", DecryptedFromMbrs);

        let mbrsXPubsToPass = JSON.parse(DecryptedFromMbrs);

        // function getYourXPub(theMnemonic,theTimeIndex,whichNetwork)

        mbrsXPubsToPass.push(
          getYourXPub(
            this.state.mnemonic,
            returnedDoc.timeIndex,
            this.state.whichNetwork
          )
        );

        console.log("mbrsXPubsToPass: ", mbrsXPubsToPass);

        returnedDoc.mbrsXPubs = mbrsXPubsToPass;

        // EDIT AND REPLACE :

        let indexToReplace = this.state.YourPayGroups.findIndex(
          (x) => x.$id === returnedDoc.$id
        );
        //console.log(indexToReplace);

        let editedYourPayGroupDocs = this.state.YourPayGroups;

        editedYourPayGroupDocs.splice(parseInt(indexToReplace), 1, returnedDoc);

        console.log("EditedMbrDoc:\n", returnedDoc);

        this.setState(
          {
            selectedPayGroupDoc: returnedDoc,
            YourPayGroups: editedYourPayGroupDocs,
            // selectedDapp: "PayGroupPmts",
            isLoadingPayGroups: false,
          },
          () => this.getIdCreditsAndUTXOs()
        );
      })
      .catch((e) => {
        this.setState({
          isLoadingPayGroups: false,
        });

        console.error("Something went wrong creating Pay Group Script:\n", e);
      })
      .finally(() => client.disconnect());
  };

  getIdCreditsAndUTXOs = () => {
    this.loadIdentityCredits();
    this.pullMultiSigUTXOs();
  };

  /// PayGroupPage
  //need to SEND TO MSGS QUERY!! ->
  decideFinalizeOrGoToPage = (
    thePayGroupDoc,
    theNameDocs,
    theMbrDocs,
    thePubKeyDocs
  ) => {
    //save stuff here and save after check ->
    if (thePayGroupDoc.fromMbrs === "") {
      this.setState({
        selectedPayGroupDoc: thePayGroupDoc,
        selectedPayGroupNameDocs: theNameDocs,
        selectedPayGroupMbrDocs: theMbrDocs,
        selectedPayGroupECDHDocs: thePubKeyDocs,

        presentModal: "ConfirmFinalizePayGroupModal",
        isModalShowing: true,
      });
    } else {
      this.setState({
        selectedPayGroupDoc: thePayGroupDoc,
        selectedPayGroupNameDocs: theNameDocs,
        selectedPayGroupMbrDocs: theMbrDocs,
        selectedPayGroupECDHDocs: thePubKeyDocs,
        isLoadingPayGroupMsgs: true,
        //isLoadingPayGroups: true,
        isModalShowing: false,
        selectedDapp: "PayGroup",
      });
    }
  };

  showConfirmFinalizedPayGroupModal = (theNameDocs, theECDHDocs) => {
    this.setState({
      // sendPmtMsgSuccess2Party: false,
      // sendPmtMsgFailure2Party: false,

      selectedPayGroupNameDocs: theNameDocs,
      selectedPayGroupECDHDocs: theECDHDocs,

      presentModal: "ConfirmFinalizedPayGroupModal",
      isModalShowing: true,
    });
  };
  //UPDATE -> m/2025'/5'/1'/timeIndex'
  editFinalizePayGroupMbrDoc = () => {
    //If the items are not stringified, then need to stringify before saving

    //  console.log("Called Edit Finalize YourPayGroupMbrDoc");
    this.setState({
      //isLoadingSelectedPayGroup: true,
      isLoadingPayGroups: true,
    });

    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        this.state.mnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    const submitPayGroupDoc = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      }

      const [document] = await client.platform.documents.get(
        `PayGroupsContract.${this.state.selectedPayGroupDoc.$type}`,
        {
          where: [["$id", "==", this.state.selectedPayGroupDoc.$id]],
        }
      );

      //Decrypt All ECDH

      //GET ENCRYPTED DATA FROM OTHER MBRS DOCS -> ORDER BY TUPLES(OWNERiD&DATA)

      let mbrsEncryptedTuples = [];

      this.state.selectedPayGroupMbrDocs.forEach((mbrDoc) => {
        let mbrNum = parseInt(mbrDoc.$type.slice(4, 5));

        let ownerArrayOfMbrIds = [];

        if (mbrNum === 1) {
          ownerArrayOfMbrIds = [...mbrDoc.mbrsList];
        } else {
          for (let i = 2; i <= mbrNum; i++) {
            ownerArrayOfMbrIds.push(mbrDoc[`mbr${i}`]);
          }
        }

        let yourIndex = ownerArrayOfMbrIds.findIndex(
          (x) => x === this.state.identity
        );

        mbrsEncryptedTuples.push([mbrDoc.$ownerId, mbrDoc.forMbrs[yourIndex]]);
      });

      console.log("mbrsEncryptedTuples: ", mbrsEncryptedTuples);

      //generate a list of each mbrDoc
      //determine the index that yourIdentity is
      // pull that index for the forMbrs and add to the

      //maybe add a mbrList to all the mbr#Docs?? ->

      // they used mypubKey and their privkey
      // I need my (privKey && theirECDHkey)

      let decryptedFromMbrs = ECDHxDecrypt(
        mbrsEncryptedTuples, //this is an array of encrypted data
        this.state.selectedPayGroupECDHDocs, //ordered from thePackage array
        this.state.YourPayGroupsPubKeyDoc,

        this.state.mnemonic
        //whichNetwork
      );
      //cATCH HERE IF AN ERROR IS TRIGGERED -> NOT XPUB DECRYPTED

      console.log("decryptedFromMbrs: ", decryptedFromMbrs);

      decryptedFromMbrs = decryptedFromMbrs[0]; //removes isError at [1]

      //Encrypt (path4 )
      //DocKeyEncrypt(thePackage, theTimeIndex,theMnemonic)

      //List/Order of mbrs from your mbrDoc so list of ownerIds

      let myMbrNum = parseInt(this.state.selectedPayGroupDoc.$type.slice(4, 5));

      let mbrsIdOrder = [];

      if (myMbrNum === 1) {
        mbrsIdOrder = [...this.state.selectedPayGroupDoc.mbrsList];
      } else {
        for (let i = 2; i <= myMbrNum; i++) {
          mbrsIdOrder.push(this.state.selectedPayGroupDoc[`mbr${i}`]);
        }
      }

      let dataToEncrypt = mbrsIdOrder.map((id) => {
        let tuple = decryptedFromMbrs.find((tup) => tup[0] === id);
        return tuple[1];
      });

      let EncryptedFromMbrs = DocKeyEncrypt(
        JSON.stringify(dataToEncrypt),
        this.state.selectedPayGroupDoc.timeIndex,
        this.state.mnemonic
      );

      //console.log("EncryptedFromMbrs: ", EncryptedFromMbrs);

      //DECRYPT dATA TO tEST -> sat

      // let DecryptedFromMbrs = DocKeyDecrypt(
      //   EncryptedFromMbrs,
      //   this.state.selectedPayGroupDoc.timeIndex,
      //   this.state.mnemonic
      // );

      // console.log("DecryptedFromMbrs: ", DecryptedFromMbrs);

      //SET FROMMBRS ->
      document.set("fromMbrs", EncryptedFromMbrs);

      await platform.documents.broadcast({ replace: [document] }, identity);
      return document;

      //############################################################
      //This below disconnects the document editing..***

      // return document;

      //This is to disconnect the Document editing***
      //############################################################
    };

    submitPayGroupDoc()
      .then((d) => {
        let returnedDoc = d.toJSON();

        //console.log("Document:\n", returnedDoc);

        returnedDoc.payGroupId = Identifier.from(
          returnedDoc.payGroupId,
          "base64"
        ).toJSON();

        returnedDoc.forMbrs = JSON.parse(returnedDoc.forMbrs);

        // if (returnedDoc.fromMbrs !== "") {
        //   returnedDoc.fromMbrs = JSON.parse(returnedDoc.fromMbrs);
        // }

        //ALSO NEED TO FOR EACH MBR# ->  ***
        let mbrNum = parseInt(returnedDoc.$type.slice(4, 5));

        if (mbrNum === 1) {
          returnedDoc.mbrsList = JSON.parse(returnedDoc.mbrsList);
        } else {
          for (let i = 2; i <= mbrNum; i++) {
            returnedDoc[`mbr${i}`] = Identifier.from(
              returnedDoc[`mbr${i}`],
              "base64"
            ).toJSON();
          }
        }
        //console.log("FinalizeMbrDoc:\n", returnedDoc);

        let indexToReplace = this.state.YourPayGroups.findIndex(
          (x) => x.$id === returnedDoc.$id
        );

        //console.log(indexToReplace);

        let editedYourPayGroupDocs = this.state.YourPayGroups;

        editedYourPayGroupDocs.splice(parseInt(indexToReplace), 1, returnedDoc);

        console.log("FinalizeMbrDoc:\n", returnedDoc);

        this.setState(
          {
            selectedPayGroupDoc: returnedDoc,
            YourPayGroups: editedYourPayGroupDocs,
            selectedDapp: "PayGroup",
            isLoadingPayGroups: false,
          },
          () => this.loadIdentityCredits()
        );
      })
      .catch((e) => {
        console.error(
          "Something went wrong with YourPayGroup finalize edit:\n",
          e
        );
      })
      .finally(() => client.disconnect());
  };

  //PayGroupPage -> Message Queries

  pullInitialTriggerPAYGROUPMSGS = () => {
    if (this.state.InitialPullPayGroupMsgs) {
      this.getPayGroupMsgs();

      this.setState({
        InitialPullPayGroupMsgs: false,
      });
    }
  };

  //Go back Function -> Dapp and Group and can't click back until loading is done? ->
  //selectedDapp, controlBackArrow - loading state, and initial query
  // AND clear msgs!! ->

  handlePayGroupMsgsBackArrow = () => {
    this.setState({
      selectedDapp: "Pay Groups",
      isLoadingPayGroupMsgs: true,
      InitialPullPayGroupMsgs: true,
      selectedPayGroupChatDocs: [],
    });
  };

  // handleRefresh_PayGroupMsgs = () => {
  //   this.setState({
  //     isLoadingPayGroupMsgs: true,
  //     isPayGroupMsgsRefreshReady: false,
  //   });

  //   this.getPayGroupMsgs();
  //   //this.loadIdentityCredits();

  //   //REFRESH -> TIMEOUT
  //   //if (!this.state.is2PartyRefreshReady) {
  //   const PayGroupMsgsTimeout = setTimeout(
  //     this.allowPayGroupsMsgsRefresh,
  //     5000
  //   );
  //   // }
  //   //REFRESH -> TIMEOUT
  // };

  // allowPayGroupsMsgsRefresh = () => {
  //   this.setState({
  //     isPayGroupsMsgsRefreshReady: true,
  //   });
  // };

  getPayGroupMsgs = () => {
    //console.log("Calling getPayGroupMsgs");

    let theDoc = this.state.selectedPayGroupDoc;

    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));

    let ownerArrayOfMbrIds = [];

    let mbrNum = parseInt(theDoc.$type.slice(4, 5));

    if (mbrNum === 1) {
      ownerArrayOfMbrIds = [...theDoc.mbrsList];
    } else {
      for (let i = 2; i <= mbrNum; i++) {
        ownerArrayOfMbrIds.push(theDoc[`mbr${i}`]);
      }
    }

    ownerArrayOfMbrIds.push(this.state.identity);

    const getDocuments = async () => {
      return client.platform.documents.get("PayGroupsContract.chatDoc", {
        // limit: 100,
        where: [
          ["payGroupId", "==", theDoc.payGroupId],
          ["$ownerId", "in", ownerArrayOfMbrIds],
        ],
        orderBy: [["$ownerId", "asc"]],
      });
    };

    getDocuments()
      .then((d) => {
        if (d.length === 0) {
          //console.log("There are no ChatDocs for Pay Group");
          //Create a Chat doc and encrypt docKey for others ->
          //this.createStartPayGroupsMsgs();
          //NO ^^^ just enable with button, no auto.

          this.setState({
            isLoadingPayGroupMsgs: false,
          });
        } else {
          //if there are doc(s) but none are mine -> create docKey from the first DocKey ->

          // if there are doc(s) and one is mine -> order and
          // check if forMbrs is '' if not then check if first, if not
          let docArray = [];

          for (const n of d) {
            let returnedDoc = n.toJSON();
            //console.log("ChatDoc:\n", returnedDoc);
            returnedDoc.payGroupId = Identifier.from(
              returnedDoc.payGroupId,
              "base64"
            ).toJSON();

            // // returnedDoc.msgObject = JSON.parse(returnedDoc.msgObject);
            //console.log("chatDoc:\n", returnedDoc);

            docArray.push(returnedDoc);
          }
          //DocKeyDecrypt

          this.setState(
            {
              selectedPayGroupChatDocs: docArray,
              isLoadingPayGroupMsgs: false,
            },
            () => this.scrollToBottom()
          );
        }
      })
      .catch((e) => console.error("Something went wrong:\n", e))
      .finally(() => client.disconnect());
  };

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({
      behavior: "smooth", //"instant",
      block: "start",
      inline: "nearest",
    });
  };

  decideStartOrNotPayGroupsMsgs = () => {
    //SearchPriorToCreateInitialMessage -> update

    this.setState({
      isLoadingPayGroupMsgs: true,
    });

    let theDoc = this.state.selectedPayGroupDoc;

    let ownerArrayOfMbrIds = [];

    let mbrNum = parseInt(theDoc.$type.slice(4, 5));

    if (mbrNum === 1) {
      ownerArrayOfMbrIds = [...theDoc.mbrsList];
    } else {
      for (let i = 2; i <= mbrNum; i++) {
        ownerArrayOfMbrIds.push(theDoc[`mbr${i}`]);
      }
    }

    ownerArrayOfMbrIds.push(this.state.identity);

    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));
    const getDocuments = async () => {
      return client.platform.documents.get("PayGroupsContract.chatDoc", {
        where: [
          ["payGroupId", "==", theDoc.payGroupId],
          ["$ownerId", "in", ownerArrayOfMbrIds],
        ],
        orderBy: [["$ownerId", "asc"]],
      });
    };
    getDocuments()
      .then((d) => {
        if (d.length === 0) {
          console.log("There is no Chat Docs");
          // this.setState({
          //   isLoadingPayGroupMsgs: false,
          // });
          this.createStartPayGroupsMsgs();
        } else {
          let docArray = [];

          for (const n of d) {
            let returnedDoc = n.toJSON();
            //console.log("Req:\n", returnedDoc);
            returnedDoc.payGroupId = Identifier.from(
              returnedDoc.payGroupId,
              "base64"
            ).toJSON();
            if (returnedDoc.forMbrs !== "") {
              returnedDoc.forMbrs = JSON.parse(returnedDoc.forMbrs);
            }

            //console.log("newReq:\n", returnedDoc);
            // docArray = [...docArray, returnedDoc];
            // if (returnedDoc.toId === returnedDoc.forId) {
            //   docArray = [...docArray, returnedDoc];
            // }
            docArray.push(returnedDoc);
          }

          //search - filter not find..and get the
          let doYouHaveAChatDoc = false;

          let yourChatDoc = docArray.find((x) => {
            return x.$ownerId === this.state.identity;
          });

          if (yourChatDoc === undefined) {
            //orderfirst to last ->
            let firstChatDoc;

            // //need to order the MSGS ->
            if (docArray.length === 1) {
              firstChatDoc = docArray[0];
            } else {
              let orderedChatDocs = docArray.sort(function (a, b) {
                return a.$createdAt - b.$createdAt; //returns smallest number first
              });
              firstChatDoc = orderedChatDocs[0];
            }

            console.log("firstChatDoc: ", firstChatDoc);

            // if (firstChatDoc.forMbrs === "") {
            //   firstChatDoc = orderedChatDocs[1]; // This is not sufficient
            // }

            this.setState(
              {
                selectedPayGroupChatDocs: docArray,
                // isLoadingPayGroupMsgs: false,
              },
              () => this.createNotFirstPayGroupsMsgs(firstChatDoc)
            );
          } else {
            this.setState({
              isLoadingPayGroupMsgs: false,
            });
          }
        }
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
      })
      .finally(() => client.disconnect());
  };

  createStartPayGroupsMsgs = () => {
    //console.log("Called Create Pay Group Mbr Doc");

    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        this.state.mnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    let docProperties = {};

    const submitDocument = async () => {
      const { platform } = client;
      // const identity = await platform.identities.get(this.state.identity); // Your identity ID

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      } // Your identity ID

      // ***   ***   ***   ***
      // ***   ***   ***   ***   ***

      //BUILD THE FORMBRS ->
      //Determine the timeIndex -> DONE

      let theTime = Date.now();

      //console.log("returnedDoc: ", returnedDoc);
      let timeStamp = theTime - 1744000000000;
      // console.log("timeStamp: ", timeStamp);

      // this is milliseconds *** -> truncate to fix
      //   //`m/2147483647` <- LIMIT, will hit in 68 years
      let truncatedTimeStamp = new String(timeStamp).slice(0, -3);

      // GET MBRs xPUBKEYs

      let mbrNum = parseInt(this.state.selectedPayGroupDoc.$type.slice(4, 5));

      let ownerArrayOfMbrIds = [];

      if (mbrNum === 1) {
        ownerArrayOfMbrIds = [...this.state.selectedPayGroupDoc.mbrsList];
      } else {
        for (let i = 2; i <= mbrNum; i++) {
          ownerArrayOfMbrIds.push(this.state.selectedPayGroupDoc[`mbr${i}`]);
        }
      }

      let pubKeyDocs = ownerArrayOfMbrIds.map((mbrId) => {
        let pubKeyDoc = this.state.selectedPayGroupECDHDocs.find((pub) => {
          return pub.$ownerId === mbrId;
        });
        return pubKeyDoc;
      });

      pubKeyDocs = pubKeyDocs.filter((doc) => doc !== undefined);

      //NEED ALERT - IF ONE IS UNDEFINED

      let docKey = Identifier.from(crypto.Random.getRandomBuffer(32)).toJSON();

      //ECDHxEncrypt(thePackage,theECDHxDocArray,yourECDHxDoc,  theTimeIndex,theMnemonic,//whichNetwork)

      let encryptedForMbrs = ECDHxEncrypt(
        docKey,
        pubKeyDocs,
        this.state.YourPayGroupsPubKeyDoc,
        // truncatedTimeStamp,
        this.state.mnemonic
        // this.state.whichNetwork
      );

      //*** Below - not necessary just to TEST*/

      // let decryptedFromMbrs = ECDHxDecrypt(
      //   mbrsEncryptedTuples, //this is an array of encrypted data
      //   this.state.selectedPayGroupECDHDocs, //ordered from thePackage array
      //   this.state.YourPayGroupsPubKeyDoc,

      //   this.state.mnemonic
      //   //whichNetwork
      // );
      //cATCH HERE IF AN ERROR IS TRIGGERED -> NOT XPUB DECRYPTED

      //console.log("decryptedFromMbrs: ", decryptedFromMbrs);

      //decryptedFromMbrs = decryptedFromMbrs[0]; //removes isError at [1]

      //*** */

      //ENCRYPT DOCKEY ->
      //DocKeyEncrypt(thePackage,theTimeIndex,theMnemonic)

      let encryptedDocKey = DocKeyEncrypt(
        docKey,
        truncatedTimeStamp,
        this.state.mnemonic
      );

      //DECRYPT dATA TO tEST ->

      // let DecryptedFromMbrs = DocKeyDecrypt(
      //   encryptedForMbrs,
      //   this.state.selectedPayGroupDoc.timeIndex,
      //   this.state.mnemonic
      // );

      // console.log("ChatDoc-DecryptedFromMbrs: ", DecryptedFromMbrs);

      // ***   ***   ***   ***   ***
      // ***   ***   ***   ***

      docProperties = {
        payGroupId: this.state.selectedPayGroupDoc.payGroupId,
        forMbrs: JSON.stringify(encryptedForMbrs),

        timeIndex: parseInt(truncatedTimeStamp),
        docKey: encryptedDocKey,

        msg1: "",
        msg2: "",
        msg3: "",
        msg4: "",
        msg5: "",
        msg6: "",
      };

      console.log("docProperties: ", docProperties);

      // Create the note document
      const PayGroupDocument = await platform.documents.create(
        `PayGroupsContract.chatDoc`,
        identity,
        docProperties
      );

      //console.log("Initial Doc: ", PayGroupDocument.toJSON());

      //############################################################
      //This below disconnects the document sending..***

      //return PayGroupDocument;

      //This is to disconnect the Document Creation***

      //############################################################

      const documentBatch = {
        create: [PayGroupDocument], // Document(s) to create
      };

      await platform.documents.broadcast(documentBatch, identity);
      return PayGroupDocument;
    };

    submitDocument()
      .then((d) => {
        let returnedDoc = d.toJSON();

        returnedDoc.payGroupId = Identifier.from(
          returnedDoc.payGroupId,
          "base64"
        ).toJSON();

        returnedDoc.forMbrs = JSON.parse(returnedDoc.forMbrs);

        console.log("chatDocument:\n", returnedDoc);

        this.setState(
          {
            selectedPayGroupChatDocs: [
              returnedDoc,
              ...this.state.selectedPayGroupChatDocs,
            ],

            isLoadingPayGroupMsgs: false,
          }
          //() => this.handleRefresh_PayGroups()
        );
      })
      .catch((e) => {
        this.setState({
          isLoadingPayGroupMsgs: false,
        });

        console.error("Something went wrong creatingStartPGMsgs:\n", e);
      })
      .finally(() => client.disconnect());
  };

  createNotFirstPayGroupsMsgs = (theFirstChatDoc) => {
    console.log("Called Create Not First ChatDoc");

    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        this.state.mnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    let docProperties = {};

    const submitDocument = async () => {
      const { platform } = client;
      // const identity = await platform.identities.get(this.state.identity); // Your identity ID

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      } // Your identity ID

      // ***   ***   ***   ***
      // ***   ***   ***   ***   ***

      //BUILD THE FORMBRS ->
      //Determine the timeIndex -> DONE

      let theTime = Date.now();

      //console.log("returnedDoc: ", returnedDoc);
      let timeStamp = theTime - 1744000000000;
      // console.log("timeStamp: ", timeStamp);

      // this is milliseconds *** -> truncate to fix
      //   //`m/2147483647` <- LIMIT, will hit in 68 years
      let truncatedTimeStamp = new String(timeStamp).slice(0, -3);

      //Decrypt All ECDH - no
      // I JUST NEED TO DECRYPT CHATDOC!!

      //so there is only one chatDoc that is giving the encrypted data to all the other mbrs. so this is much simpler than the pubkey exchange.

      //theFirstChatDoc

      //GET ENCRYPTED DATA FROM OTHER MBRS DOCS -> ORDER BY TUPLES(OWNERiD&DATA)
      let chatStarter = this.state.selectedPayGroupMbrDocs.find((mbrDoc) => {
        return mbrDoc.$ownerId === theFirstChatDoc.$ownerId;
      });

      let chatStarterECDHDoc = this.state.selectedPayGroupECDHDocs.find(
        (mbrDoc) => {
          return mbrDoc.$ownerId === theFirstChatDoc.$ownerId;
        }
      );

      let forYouEncryptedPwd;

      if (chatStarter !== undefined) {
        let mbrNum = parseInt(chatStarter.$type.slice(4, 5));

        let ownerArrayOfMbrIds = [];

        if (mbrNum === 1) {
          ownerArrayOfMbrIds = [...chatStarter.mbrsList];
        } else {
          for (let i = 2; i <= mbrNum; i++) {
            ownerArrayOfMbrIds.push(chatStarter[`mbr${i}`]);
          }
        }

        let yourIndex = ownerArrayOfMbrIds.findIndex(
          (x) => x === this.state.identity
        );

        forYouEncryptedPwd = theFirstChatDoc.forMbrs[yourIndex];

        console.log("forYouEncryptedPwd: ", forYouEncryptedPwd);
      }

      let decryptedFromMbrs = DecryptChatForMbrs(
        forYouEncryptedPwd,
        chatStarterECDHDoc,
        this.state.YourPayGroupsPubKeyDoc,
        this.state.mnemonic
        //whichNetwork
      );
      //cATCH HERE IF AN ERROR IS TRIGGERED -> NOT XPUB DECRYPTED

      console.log("decryptedFromMbrs: ", decryptedFromMbrs);

      // ***   ***   ***   ***   ***
      // ***   ***   ***   ***

      //ENCRYPT DOCKEY ->
      //DocKeyEncrypt(thePackage,theTimeIndex,theMnemonic)

      let encryptedDocKey = DocKeyEncrypt(
        decryptedFromMbrs, //this is the docKey
        truncatedTimeStamp,
        this.state.mnemonic
      );

      //DECRYPT dATA TO tEST ->

      // let DecryptedFromMbrs = DocKeyDecrypt(
      //   encryptedForMbrs,
      //   this.state.selectedPayGroupDoc.timeIndex,
      //   this.state.mnemonic
      // );

      // console.log("ChatDoc-DecryptedFromMbrs: ", DecryptedFromMbrs);

      // ***   ***   ***   ***   ***
      // ***   ***   ***   ***

      docProperties = {
        payGroupId: this.state.selectedPayGroupDoc.payGroupId,
        forMbrs: "",

        timeIndex: parseInt(truncatedTimeStamp),
        docKey: encryptedDocKey,

        msg1: "",
        msg2: "",
        msg3: "",
        msg4: "",
        msg5: "",
        msg6: "",
      };

      //console.log("docProperties: ", docProperties);

      //DocKey encrypt the fromMbrs with timeIndex -> not yet.

      // Create the note document
      const PayGroupDocument = await platform.documents.create(
        `PayGroupsContract.chatDoc`,
        identity,
        docProperties
      );

      //console.log("Initial Doc: ", PayGroupDocument.toJSON());

      //############################################################
      //This below disconnects the document sending..***

      //return PayGroupDocument;

      //This is to disconnect the Document Creation***

      //############################################################

      const documentBatch = {
        create: [PayGroupDocument], // Document(s) to create
      };

      await platform.documents.broadcast(documentBatch, identity);
      return PayGroupDocument;
    };

    submitDocument()
      .then((d) => {
        let returnedDoc = d.toJSON();

        //console.log("MbrDocument:\n", returnedDoc);

        returnedDoc.payGroupId = Identifier.from(
          returnedDoc.payGroupId,
          "base64"
        ).toJSON();

        console.log("returnedChatDoc:\n", returnedDoc);

        this.setState(
          {
            selectedPayGroupChatDocs: [
              returnedDoc,
              ...this.state.selectedPayGroupChatDocs,
            ],

            isLoadingPayGroupMsgs: false,
          },
          () => this.loadIdentityCredits()
        );
      })
      .catch((e) => {
        this.setState({
          isLoadingPayGroups: false,
        });

        console.error(
          "Something went wrong create NotFirst Pay GroupMsgs:\n",
          e
        );
      })
      .finally(() => client.disconnect());
  };

  //I can't decrypt Other msgs untill I have a msgs, when at least not till I decrypt the first msg

  showAddMessageToChatDocModal = (theMessage, theSharedSecret) => {
    //Need to find the latest ChatDoc -> filter and then sort and let the earliest
    let yourChatDocs = this.state.selectedPayGroupChatDocs.filter((x) => {
      return x.$ownerId === this.state.identity;
    });

    let yourLatestChatDoc;
    if (yourChatDocs.length === 1) {
      yourLatestChatDoc = yourChatDocs[0];
    } else {
      //Do Later
      //let orderedMsgs = this.props.chatMsgs.sort(function (a, b) {
      //   return a.time - b.time;
      // });
      yourLatestChatDoc = yourChatDocs[0];
    }

    let chatDocIndex = this.state.selectedPayGroupChatDocs.findIndex((chat) => {
      return chat.$id === yourLatestChatDoc.$id;
    });
    this.setState({
      sharedSecret: theSharedSecret,
      messageToAdd: theMessage,
      chatDocToEdit: yourLatestChatDoc,
      chatDocToEditIndex: chatDocIndex, //<- Need this for the editingfunction!!

      presentModal: "ConfirmAddMessageModal",
      isModalShowing: true,
    });
  };

  decideMsgNumOrNewDoc4MSG = () => {
    //this.state.chatDocToEdit

    //msg1
    if (this.state.chatDocToEdit.msg1.length < 2000) {
      this.editAddMessageToChatDoc("msg1");
    }
    //msg2
    else if (this.state.chatDocToEdit.msg2.length < 2000) {
      this.editAddMessageToChatDoc("msg2");
    }
    //msg3
    else if (this.state.chatDocToEdit.msg3.length < 2000) {
      this.editAddMessageToChatDoc("msg3");
    }
    //msg4
    else if (this.state.chatDocToEdit.msg4.length < 2000) {
      this.editAddMessageToChatDoc("msg4");
    }
    //msg5
    else if (this.state.chatDocToEdit.msg5.length < 2000) {
      this.editAddMessageToChatDoc("msg5");
    }
    //msg6
    else if (this.state.chatDocToEdit.msg6.length < 2000) {
      this.editAddMessageToChatDoc("msg6");
    } else {
      //createNewChatDoc() and start at msg1
    }
  };

  editAddMessageToChatDoc = (theMsgNum) => {
    //  console.log("Called Edit ResponseAddMessage");
    this.setState({
      isLoadingPayGroupMsgs: true,
    });

    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        this.state.mnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    // *** *** ***

    let theTime = Date.now();

    theTime = new String(theTime).slice(0, -3);

    let theMsgObject = {
      msg: this.state.messageToAdd,
      time: theTime,
    };

    let msgArrayToDecrypt;

    //change decryptedMsgArray -> decryptedMsgObject
    //let decryptedMsgArray = [];
    let decryptedMsgObject = { msgs: [], likes: [] };

    if (this.state.chatDocToEdit[theMsgNum] !== "") {
      msgArrayToDecrypt = this.state.chatDocToEdit[theMsgNum];

      decryptedMsgObject = DecryptChatDoc4Edit(
        msgArrayToDecrypt,
        this.state.sharedSecret
      );

      decryptedMsgObject = JSON.parse(decryptedMsgObject);
    }

    //Previous
    //msg1 = [{msg:.., time:...}]

    //Change to
    //msg1 = {msgs:[{msg:.., time:...}],likes:[likeId,...]}

    decryptedMsgObject.msgs.push(theMsgObject);

    console.log("MsgObjectToEncrypt: ", decryptedMsgObject);

    //SEND OBJECT TO ENCRYPT ->

    let encrypted4ChatDoc = EncryptChatDoc4Edit(
      JSON.stringify(decryptedMsgObject),
      this.state.sharedSecret
    );

    console.log("encrypted4ChatDoc: ", encrypted4ChatDoc);

    // *** *** ***

    const submit2PartyDoc = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      }

      const [document] = await client.platform.documents.get(
        "PayGroupsContract.chatDoc",
        {
          where: [["$id", "==", this.state.chatDocToEdit.$id]],
        }
      );

      document.set(theMsgNum, encrypted4ChatDoc);

      await platform.documents.broadcast({ replace: [document] }, identity);

      return document;

      //############################################################
      //This below disconnects the document editing..***

      //return document;

      //This is to disconnect the Document editing***
      //############################################################
    };

    submit2PartyDoc()
      .then((d) => {
        let returnedDoc = d.toJSON();

        returnedDoc.payGroupId = Identifier.from(
          returnedDoc.payGroupId,
          "base64"
        ).toJSON();

        console.log("Edited ChatDoc:\n", returnedDoc);

        let editedChatDocs = this.state.selectedPayGroupChatDocs;

        editedChatDocs.splice(this.state.chatDocToEditIndex, 1, returnedDoc);

        this.setState(
          {
            selectedPayGroupChatDocs: editedChatDocs,
            isLoadingPayGroupMsgs: false,
          },
          () => this.loadIdentityCredits()
        );
      })
      .catch((e) => {
        console.error("Something went wrong with ChatDoc Edit:\n", e);
        this.setState({
          isLoadingPayGroupMsgs: false,
        });
      })
      .finally(() => client.disconnect());
  };

  showAddLikeToChatDocModal = (theMessageObjectLiked, theSharedSecret) => {
    // need to also pass the like msg identifier, first 4 of owner and timeStamp? ->

    //Need to find the latest ChatDoc -> filter and then sort and let the earliest
    let yourChatDocs = this.state.selectedPayGroupChatDocs.filter((x) => {
      return x.$ownerId === this.state.identity;
    });

    let yourLatestChatDoc;
    if (yourChatDocs.length === 1) {
      yourLatestChatDoc = yourChatDocs[0];
    } else {
      //Do Later
      // order then pick the first one ->
      yourLatestChatDoc = yourChatDocs[0];
    }

    let chatDocIndex = this.state.selectedPayGroupChatDocs.findIndex((chat) => {
      return chat.$id === yourLatestChatDoc.$id;
    });

    //let likeIdentifier = this.state.messageObjectLiked

    console.log(
      "msgIdentifier: ",
      theMessageObjectLiked.owner.slice(0, 4) +
        theMessageObjectLiked.time.toString().slice(0, -3)
    );

    this.setState({
      sharedSecret: theSharedSecret,

      messageObjectLiked: theMessageObjectLiked,
      chatDocToEdit: yourLatestChatDoc,
      chatDocToEditIndex: chatDocIndex, //<- Need this for the editingfunction!!

      presentModal: "ConfirmAddLikeModal",
      isModalShowing: true,
    });
  };

  decideMsgNumOrNewDoc4LIKE = () => {
    //this.state.chatDocToEdit

    //msg1
    if (this.state.chatDocToEdit.msg1.length < 2000) {
      this.editAddLikeToChatDoc("msg1");
    }
    //msg2
    else if (this.state.chatDocToEdit.msg2.length < 2000) {
      this.editAddLikeToChatDoc("msg2");
    }
    //msg3
    else if (this.state.chatDocToEdit.msg3.length < 2000) {
      this.editAddLikeToChatDoc("msg3");
    }
    //msg4
    else if (this.state.chatDocToEdit.msg4.length < 2000) {
      this.editAddLikeToChatDoc("msg4");
    }
    //msg5
    else if (this.state.chatDocToEdit.msg5.length < 2000) {
      this.editAddLikeToChatDoc("msg5");
    }
    //msg6
    else if (this.state.chatDocToEdit.msg6.length < 2000) {
      this.editAddLikeToChatDoc("msg6");
    } else {
      //createNewChatDoc() and start at msg1
    }
  };

  editAddLikeToChatDoc = (theMsgNum) => {
    this.setState({
      isLoadingPayGroupMsgs: true,
    });

    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        this.state.mnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    let msgIdentifier =
      this.state.messageObjectLiked.owner.slice(0, 4) +
      this.state.messageObjectLiked.time.toString().slice(0, -3);

    let msgLikeArraysToDecrypt;

    //change decryptedMsgArray -> decryptedMsgObject
    //let decryptedMsgArray = [];
    let decryptedMsgLikeObject = { msgs: [], likes: [] };

    if (this.state.chatDocToEdit[theMsgNum] !== "") {
      msgLikeArraysToDecrypt = this.state.chatDocToEdit[theMsgNum];

      decryptedMsgLikeObject = DecryptChatDoc4Edit(
        msgLikeArraysToDecrypt,
        this.state.sharedSecret
      );

      decryptedMsgLikeObject = JSON.parse(decryptedMsgLikeObject);
    }

    //Previous
    //msg1 = [{msg:.., time:...}]

    //Change to
    //msg1 = {msgs:[{msg:.., time:...}],likes:[]}

    decryptedMsgLikeObject.likes.push(msgIdentifier);

    console.log("MsgLikeObjectToEncrypt: ", decryptedMsgLikeObject);

    //SEND OBJECT TO ENCRYPT ->

    let encrypted4ChatDoc = EncryptChatDoc4Edit(
      JSON.stringify(decryptedMsgLikeObject),
      this.state.sharedSecret
    );

    console.log("encrypted4ChatDoc: ", encrypted4ChatDoc);

    // *** *** ***

    const submit2PartyDoc = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      }

      const [document] = await client.platform.documents.get(
        "PayGroupsContract.chatDoc",
        {
          where: [["$id", "==", this.state.chatDocToEdit.$id]],
        }
      );

      //CHANGE THE DOCUMENT.SET ->

      document.set(theMsgNum, encrypted4ChatDoc);

      await platform.documents.broadcast({ replace: [document] }, identity);
      return document;

      //############################################################
      //This below disconnects the document editing..***

      //return document;

      //This is to disconnect the Document editing***
      //############################################################
    };

    submit2PartyDoc()
      .then((d) => {
        let returnedDoc = d.toJSON();

        returnedDoc.payGroupId = Identifier.from(
          returnedDoc.payGroupId,
          "base64"
        ).toJSON();

        console.log("Edited ChatDoc:\n", returnedDoc);

        let editedChatDocs = this.state.selectedPayGroupChatDocs;

        editedChatDocs.splice(this.state.chatDocToEditIndex, 1, returnedDoc);

        this.setState(
          {
            selectedPayGroupChatDocs: editedChatDocs,
            isLoadingPayGroupMsgs: false,
          },
          () => this.loadIdentityCredits()
        );
      })
      .catch((e) => {
        console.error("Something went wrong with ChatDoc Edit:\n", e);
        this.setState({
          isLoadingPayGroupMsgs: false,
        });
      })
      .finally(() => client.disconnect());
  };

  //Pay Group Pmts

  handlePayGroupPmtsBackArrow = () => {
    this.setState(
      {
        selectedDapp: "PayGroup",
        isLoadingPayGroupMsgs: true,
        InitialPullPayGroupMsgs: true,
        selectedPayGroupChatDocs: [],
      },
      () => this.pullInitialTriggerPAYGROUPMSGS()
    );
  };

  //payInit Doc create

  //payDoc create - Response create

  //last person - Submit TX

  /* PAY GROUP FUNCTIONS^^^^^
   *
   *                                  ################
   *                                  ###          ####
   *                                  ################
   *                                  ###
   *                                  ###
   *
   *
   *      #############
   *     ###         ###
   *              ####
   *          ####
   *      ####
   *     ###############
   *
   */

  pullInitialTrigger2Party = () => {
    if (this.state.InitialPull2Party) {
      this.start2PartyRace();

      this.setState({
        InitialPull2Party: false,
      });
    }
  };

  handleReqsOrPmtsFilter = (theSelected) => {
    this.setState({
      DisplayReqsOrPmts: theSelected,
    });
  };

  handleRefresh_2Party = () => {
    this.setState({
      isLoadingWallet: true,
      isLoading2Party: true,
      is2PartyRefreshReady: false,

      sendSuccess2Party: false,
      sendFailure2Party: false,
      sendMsgSuccess2Party: false, //It just appears
      sendMsgFailure2Party: false,
    });

    this.start2PartyRace();
    this.get2PartyWallet();
    this.loadIdentityCredits();

    //REFRESH -> TIMEOUT
    //if (!this.state.is2PartyRefreshReady) {
    const TwoPartyTimeout = setTimeout(this.allow2PartyRefresh, 5000);
    // }
    //REFRESH -> TIMEOUT
  };

  allow2PartyRefresh = () => {
    this.setState({
      is2PartyRefreshReady: true,
    });
  };

  start2PartyRace = () => {
    if (!this.state.isLoading2Party) {
      this.setState({ isLoading2Party: true });
    }

    this.get2PartyReqsFromYou(); //Reqs -> PubKeys & Name(toId) And Response (reqId)
    this.get2PartyReqsToYou(); //Reqs -> PubKeys & Names -> Response

    //add a check only if not initial -> PULL YOUR PUBLIC KEY***
  };

  check2PartyRace = () => {
    if (this.state.TwoParty1 && this.state.TwoParty2) {
      this.setState({
        // isLoadingWallet: false,
        isLoading2Party: false,

        TwoParty1: false,
        TwoParty2: false,
      });
    }
  };
  //Only call this if they hit the refresh button. -> DONE
  get2PartyWallet = () => {
    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        this.state.mnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    const retrieveWallet = async () => {
      const account = await client.getWalletAccount();

      this.setState({
        accountBalance: account.getTotalBalance(),
        //accountAddress: account.getUnusedAddress().address,
        accountHistory: account.getTransactionHistory(),
      });

      return account;
    };

    retrieveWallet()
      .then((d) => {
        //console.log("Wallet Account:\n", d);

        this.setState({
          isLoadingWallet: false,
        });
      })
      .catch((e) => {
        console.error("Something went wrong get 2Party Wallet:\n", e);
      })
      .finally(() => client.disconnect());
  };
  //I think add this to login pull, not page ->
  get2PartyYourPubKey = () => {
    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));

    const getDocuments = async () => {
      // console.log("Called 2 Party Pub Key");

      return client.platform.documents.get("TwoPartyContract.xPubKeyDoc", {
        where: [["$ownerId", "==", this.state.identity]],
      });
    };

    getDocuments()
      .then((d) => {
        if (d.length === 0) {
          //console.log("There are no 2PartyYourPubKey");

          this.setState(
            { Your2PartyPubKey: "No Pub Key" } //,() => this.check2PartyRace()
          );
        } else {
          // let docArray = [];

          // for (const n of d) {
          //   let returnedDoc = n.toJSON();
          //   //console.log("Req:\n", returnedDoc);
          //   returnedDoc.toId = Identifier.from(
          //     returnedDoc.toId,
          //     "base64"
          //   ).toJSON();
          //   //console.log("newReq:\n", returnedDoc);
          //   docArray = [...docArray, returnedDoc];
          //   //docArray.push(returnedDoc)
          // }

          this.setState(
            { Your2PartyPubKey: d[0].toJSON() } //,() => this.check2PartyRace()
          );
        }
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
      })
      .finally(() => client.disconnect());
  };

  get2PartyReqsFromYou = () => {
    //console.log("Calling get2PartyReqsFromYou");

    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));

    const getDocuments = async () => {
      return client.platform.documents.get("TwoPartyContract.request", {
        // limit: 100,
        where: [
          ["$ownerId", "==", this.state.identity],
          ["$createdAt", "<=", Date.now()],
        ],
        orderBy: [["$createdAt", "desc"]],
      });
    };

    getDocuments()
      .then((d) => {
        if (d.length === 0) {
          //console.log("There are no ReqsFromYou");

          this.setState(
            {
              TwoParty1: true,
              ReqsFromYou: [],
              ReqsFromYouNames: [],
              ReqsFromYouResponses: [],
            },
            () => this.check2PartyRace()
          );
        } else {
          let docArray = [];

          for (const n of d) {
            let returnedDoc = n.toJSON();
            //console.log("Req:\n", returnedDoc);
            returnedDoc.toId = Identifier.from(
              returnedDoc.toId,
              "base64"
            ).toJSON();

            returnedDoc.forId = Identifier.from(
              returnedDoc.forId,
              "base64"
            ).toJSON();

            // // returnedDoc.msgObject = JSON.parse(returnedDoc.msgObject);
            //console.log("newReq:\n", returnedDoc);
            // docArray = [...docArray, returnedDoc];
            if (returnedDoc.toId === returnedDoc.forId) {
              docArray = [...docArray, returnedDoc];
            }
            //docArray.push(returnedDoc)
          }
          //decryptMyReqs(theReqs, theMnemonic, whichNetwork)
          let decryptedDocs = decryptMyReqs(
            docArray,
            this.state.mnemonic,
            this.state.whichNetwork
          );
          this.get2PartyFromYouNames(decryptedDocs);
        }
      })
      .catch((e) => console.error("Something went wrong:\n", e))
      .finally(() => client.disconnect());
  };

  get2PartyFromYouNames = (docArray) => {
    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));
    //START OF NAME RETRIEVAL - ToId not the ownerId!!!

    let ownerarrayOfToIds = docArray.map((doc) => {
      return doc.toId;
    });

    let setOfToIds = [...new Set(ownerarrayOfToIds)];

    let arrayOfToIds = [...setOfToIds];

    //CALLING THE PUBLIC KEYS DOCS HERE***
    this.get2PartyFromYouPubKeys(arrayOfToIds);
    //

    //console.log("Calling get2PartyByYouNames");

    const getNameDocuments = async () => {
      return client.platform.documents.get("DPNSContract.domain", {
        where: [["records.identity", "in", arrayOfToIds]],
        orderBy: [["records.identity", "asc"]],
      });
    };

    getNameDocuments()
      .then((d) => {
        if (d.length === 0) {
          //console.log("No DPNS domain documents retrieved.");
        }

        let nameDocArray = [];

        for (const n of d) {
          //console.log("NameDoc:\n", n.toJSON());

          nameDocArray = [n.toJSON(), ...nameDocArray];
        }
        //console.log(`DPNS Name Docs: ${nameDocArray}`);

        this.get2PartyFromYouResponses(docArray, nameDocArray);
      })
      .catch((e) => {
        console.error(
          "Something went wrong getting 2Party FromYou Names:\n",
          e
        );
      })
      .finally(() => client.disconnect());
    //END OF NAME RETRIEVAL
  };

  get2PartyFromYouPubKeys = (arrayOfToIds) => {
    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));

    //console.log("Calling get2PartyFromYouPubKeys");

    const getPublicKeyDocuments = async () => {
      return client.platform.documents.get("TwoPartyContract.xPubKeyDoc", {
        where: [["$ownerId", "in", arrayOfToIds]],
        orderBy: [["$ownerId", "asc"]],
      });
    };

    getPublicKeyDocuments()
      .then((d) => {
        if (d.length === 0) {
          //console.log("No DPNS domain documents retrieved.");
        }

        let pubKeyDocArray = [];

        for (const n of d) {
          //console.log("PubKeyDoc:\n", n.toJSON());

          pubKeyDocArray = [n.toJSON(), ...pubKeyDocArray];
        }
        //console.log(`Public Key Docs: ${pubKeyDocArray}`);

        this.setState(
          {
            ReqsFromYouPubKeys: pubKeyDocArray,
          } //,() => this.check2PartyRace()
        );
      })
      .catch((e) => {
        console.error(
          "Something went wrong getting 2Party FromYou PubKeys:\n",
          e
        );
      })
      .finally(() => client.disconnect());
  };

  get2PartyFromYouResponses = (docArray, nameDocArray) => {
    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));

    //*  ***   ***

    //let unencryptedMyDocs = unEncryptMyDocs(docArray, this.state.mnemonic)

    //*  ***   ***

    // This Below is to get unique set of FromYou Req doc ids
    let arrayOfReqIds = docArray.map((doc) => {
      return doc.$id;
    });

    //console.log("Array of FromYou Req ids", arrayOfReqIds);

    let setOfReqIds = [...new Set(arrayOfReqIds)];

    arrayOfReqIds = [...setOfReqIds];

    //console.log("Array of Req ids", arrayOfReqIds);

    const getDocuments = async () => {
      return client.platform.documents.get("TwoPartyContract.response", {
        where: [
          ["reqId", "in", arrayOfReqIds],
          // ["$createdAt", "<=", Date.now()],
        ],
        orderBy: [
          ["reqId", "asc"],
          // ["$createdAt", "desc"],
        ],
      });
    };

    getDocuments()
      .then((d) => {
        let responseDocArray = [];

        for (const n of d) {
          let returnedDoc = n.toJSON();
          //console.log("Response:\n", returnedDoc);
          returnedDoc.reqId = Identifier.from(
            returnedDoc.reqId,
            "base64"
          ).toJSON();
          returnedDoc.toId = Identifier.from(
            returnedDoc.toId,
            "base64"
          ).toJSON();
          // returnedDoc.msgObject = JSON.parse(returnedDoc.msgObject);
          //console.log("newResponse:\n", returnedDoc);
          responseDocArray = [...responseDocArray, returnedDoc];
        }

        //*  ***   ***
        // decryptTheirResps(theResps, theMnemonic, whichNetwork)

        let decryptedRespArray = decryptTheirResps(
          responseDocArray,
          this.state.mnemonic,
          this.state.whichNetwork
        );
        //*  ***   ***

        this.setState(
          {
            TwoParty1: true,
            ReqsFromYou: docArray, //
            ReqsFromYouNames: nameDocArray,
            ReqsFromYouResponses: decryptedRespArray, //
          },
          () => this.check2PartyRace()
        );
      })
      .catch((e) => {
        console.error("Something went wrong 2PartyFromYouResponses:\n", e);
      })
      .finally(() => client.disconnect());
  };

  get2PartyReqsToYou = () => {
    // console.log("Called get2PartyToYou");

    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));

    const getDocuments = async () => {
      return client.platform.documents.get("TwoPartyContract.request", {
        where: [
          ["toId", "==", this.state.identity],
          ["$createdAt", "<=", Date.now()],
        ],
        orderBy: [["$createdAt", "desc"]],
      });
    };

    getDocuments()
      .then((d) => {
        if (d.length === 0) {
          //console.log("There are no ForyouByyouMsgs");

          this.setState(
            {
              TwoParty2: true,
              ReqsToYou: [],
              ReqsToYouNames: [],
              ReqsToYouResponses: [],
            },
            () => this.check2PartyRace()
          );
        } else {
          let docArray = [];
          //console.log("Getting get2PartyToYou");
          for (const n of d) {
            let returnedDoc = n.toJSON();
            //console.log("Req:\n", returnedDoc);

            returnedDoc.toId = Identifier.from(
              returnedDoc.toId,
              "base64"
            ).toJSON();

            returnedDoc.forId = Identifier.from(
              returnedDoc.forId,
              "base64"
            ).toJSON();

            //use an if 100

            //returnedDoc.msgObject = JSON.parse(returnedDoc.msgObject);
            // console.log("newReq:\n", returnedDoc);
            //docArray = [...docArray, returnedDoc];
            if (returnedDoc.toId === returnedDoc.forId) {
              docArray = [...docArray, returnedDoc];
            }
          }
          //decryptTheirReqs(theReqs, theMnemonic, whichNetwork)
          let decryptedDocs = decryptTheirReqs(
            docArray,
            this.state.mnemonic,
            this.state.whichNetwork
          );

          this.get2PartyToYouNames(decryptedDocs);
        }
      })
      .catch((e) => console.error("Something went wrong:\n", e))
      .finally(() => client.disconnect());
  };

  get2PartyToYouNames = (docArray) => {
    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));
    //START OF NAME RETRIEVAL

    let ownerarrayOfOwnerIds = docArray.map((doc) => {
      return doc.$ownerId;
    });

    let setOfOwnerIds = [...new Set(ownerarrayOfOwnerIds)];

    let arrayOfOwnerIds = [...setOfOwnerIds];

    //CALLING THE PUBLIC KEYS DOCS HERE***
    this.get2PartyToYouPubKeys(arrayOfOwnerIds);
    //

    //console.log("Calling get2PartyToYouNames");

    const getNameDocuments = async () => {
      return client.platform.documents.get("DPNSContract.domain", {
        where: [["records.identity", "in", arrayOfOwnerIds]],
        orderBy: [["records.identity", "asc"]],
      });
    };

    getNameDocuments()
      .then((d) => {
        if (d.length === 0) {
          //console.log("No DPNS domain documents retrieved.");
        }

        let nameDocArray = [];

        for (const n of d) {
          //  console.log("INIT TOYOU NameDoc:\n", n.toJSON());

          nameDocArray = [n.toJSON(), ...nameDocArray];
        }
        //console.log(`DPNS Name Docs: ${nameDocArray}`);

        this.get2PartyToYouResponses(docArray, nameDocArray);
      })
      .catch((e) => {
        console.error("Something went wrong getting 2Party ToYou Names:\n", e);
      })
      .finally(() => client.disconnect());
    //END OF NAME RETRIEVAL
  };

  get2PartyToYouPubKeys = (arrayOfOwnerIds) => {
    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));

    //console.log("Calling get2PartyToYouPubKeys");

    const getPublicKeyDocuments = async () => {
      return client.platform.documents.get("TwoPartyContract.xPubKeyDoc", {
        where: [["$ownerId", "in", arrayOfOwnerIds]],
        orderBy: [["$ownerId", "asc"]],
      });
    };

    getPublicKeyDocuments()
      .then((d) => {
        if (d.length === 0) {
          //console.log("No DPNS domain documents retrieved.");
        }

        let pubKeyDocArray = [];

        for (const n of d) {
          //console.log("PubKeyDoc:\n", n.toJSON());

          pubKeyDocArray = [n.toJSON(), ...pubKeyDocArray];
        }
        //console.log(`Public Key Docs: ${pubKeyDocArray}`);

        this.setState(
          {
            ReqsToYouPubKeys: pubKeyDocArray,
          } //,() => this.check2PartyRace()
        );
      })
      .catch((e) => {
        console.error(
          "Something went wrong getting 2Party ToYou PubKeys:\n",
          e
        );
      })
      .finally(() => client.disconnect());
  };

  get2PartyToYouResponses = (docArray, nameDocArray) => {
    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));

    // This Below is to get unique set of ToYou Req doc ids
    let arrayOfReqIds = docArray.map((doc) => {
      return doc.$id;
    });

    //console.log("Array of ToYou Req ids", arrayOfReqIds);

    let setOfReqIds = [...new Set(arrayOfReqIds)];

    arrayOfReqIds = [...setOfReqIds];

    //console.log("Array of Req ids", arrayOfReqIds);

    const getDocuments = async () => {
      //console.log("Called Get 2PartyByYou Threads");

      return client.platform.documents.get("TwoPartyContract.response", {
        where: [
          ["reqId", "in", arrayOfReqIds],
          // ["$createdAt", "<=", Date.now()],
        ],
        orderBy: [
          ["reqId", "asc"],
          //  ["$createdAt", "desc"],
        ],
      });
    };

    getDocuments()
      .then((d) => {
        let responseDocArray = [];

        for (const n of d) {
          let returnedDoc = n.toJSON();
          //console.log("Response:\n", returnedDoc);
          returnedDoc.reqId = Identifier.from(
            returnedDoc.reqId,
            "base64"
          ).toJSON();

          returnedDoc.toId = Identifier.from(
            returnedDoc.toId,
            "base64"
          ).toJSON();
          // returnedDoc.msgObject = JSON.parse(returnedDoc.msgObject);
          //console.log("newResponse:\n", returnedDoc);
          responseDocArray = [...responseDocArray, returnedDoc];
        }

        // decryptMyResps(theResps, theMnemonic, whichNetwork)

        let decryptedRespArray = decryptMyResps(
          responseDocArray,
          this.state.mnemonic,
          this.state.whichNetwork
        );

        this.setState(
          {
            TwoParty2: true,
            ReqsToYou: docArray,
            ReqsToYouNames: nameDocArray,
            ReqsToYouResponses: decryptedRespArray, //responseDocArray,
          },
          () => this.check2PartyRace()
        );
      })
      .catch((e) => {
        console.error("Something went wrong 2PartyToYouResponses:\n", e);
      })
      .finally(() => client.disconnect());
  };

  // ^^^^ - PAYMENT REQUEST

  //Oh this just closes the alert i think
  handleSuccessAlert_TWOPARTY = () => {
    this.setState({
      TWOPARTY_sendSuccess: false,
      TWOPARTY_sendMsgSuccess: false,
    });
  }; //THis should just show up in wallet of on the request right?
  //So like

  handleFailureAlert_TWOPARTY = () => {
    this.setState({
      TWOPARTY_sendFailure: false,
    });
  };

  handleFailureMsgAlert_TWOPARTY = () => {
    this.setState({
      TWOPARTY_sendMsgFailure: false,
    });
  };
  // BELOW - PAYMENT REQUEST
  handleFailurePmtMsgAlert_TWOPARTY = () => {
    this.setState({
      TWOPARTY_sendPmtMsgFailure: false,
    });
  };

  handleSuccessPmtMsgAlert_TWOPARTY = () => {
    this.setState({
      TWOPARTY_sendPmtMsgSuccess: false,
    });
  };

  // BELOW - PAYMENT REQUEST
  // Request(Merch) - Confirm/sendTo2Party(Cust) - Release(Cust) -
  show2PartyRequestModal = (
    inputNameDoc,
    inputNumber //, message
  ) => {
    this.setState({
      sendPmtMsgSuccess2Party: false,
      sendPmtMsgFailure2Party: false,

      sendToNameDoc2Party: inputNameDoc, // removed .label
      amountToSend2Party: Number((inputNumber * 100000000).toFixed(0)),
      // messageToSend2Party: message,
      presentModal: "Confirm2PartyRequestModal",
      isModalShowing: true,
    });
  };

  showAddMsgToRequestModal = (theRequest, theResponseName, pubKeyDoc) => {
    let requestIndex = this.state.ReqsFromYou.findIndex((req) => {
      return req.$id === theRequest.$id;
    });
    this.setState({
      requestToEdit: theRequest,
      requestToEditIndex: requestIndex, //<- Need this for the editingfunction!!
      signingToSendToWhomNameDoc: theResponseName,
      responsePubKeyDoc2Party: pubKeyDoc,

      presentModal: "AddMsgToRequestModal",
      isModalShowing: true,
    });
  };

  editRequestAddMessage = (addedMessage) => {
    this.setState({
      isLoading2Party: true,
    });
    let timeStamp;

    if (this.state.requestToEdit.req === "100") {
      const client = new Dash.Client(
        dapiClientNoWallet(this.state.whichNetwork)
      );

      const getDocuments = async () => {
        return client.platform.documents.get("TwoPartyContract.request", {
          where: [["$id", "==", this.state.requestToEdit.$id]],
        });
      };

      getDocuments()
        .then((d) => {
          if (d.length === 0) {
            console.log("There is no Request");
            this.setState({
              isLoading2Party: false,
            });
          } else {
            let returnedDoc = d[0].toJSON();

            //console.log("returnedDoc: ", returnedDoc);
            timeStamp = returnedDoc.$createdAt - 1729873000000;
            // console.log("timeStamp: ", timeStamp);
            this.editRequestAddMessageWithTimeStamp(addedMessage, timeStamp);
          }
        })
        .catch((e) => {
          console.error("Something went wrong:\n", e);
        })
        .finally(() => client.disconnect());
    } else {
      timeStamp = this.state.requestToEdit.$createdAt - 1729873000000;
      // console.log("timeStamp: ", timeStamp);
      this.editRequestAddMessageWithTimeStamp(addedMessage, timeStamp);
    }
  };

  editRequestAddMessageWithTimeStamp = (addedMessage, timeStamp) => {
    //console.log(addedMessage);
    // this.setState({
    //   isLoading2Party: true,
    // });

    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        this.state.mnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );
    let propsToEncrypt;

    const edit2PartyDoc = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      } // Your identity ID

      // *** *** ***

      let theTime = Date.now();

      let theMsgObject = [];

      if (addedMessage !== "") {
        //SHouldnt get here anyway..
        theMsgObject = [
          {
            msg: addedMessage,
            time: theTime,
          },
        ];
      } else {
        theMsgObject = [];
      }

      propsToEncrypt = {
        txId: this.state.requestToEdit.txId,
        sig: this.state.requestToEdit.sigObject,
        msgs: [...theMsgObject, ...this.state.requestToEdit.msgObject],
      };

      console.log("propsToEncrypt: ", propsToEncrypt);

      //SEND OBJECT TO ENCRYPT ->

      let encryptedProps = encryptMyReq(
        timeStamp,
        propsToEncrypt,
        // this.state.Your2PartyPubKey
        this.state.responsePubKeyDoc2Party,
        this.state.mnemonic,
        this.state.whichNetwork
      );

      // *** *** ***

      const [document] = await client.platform.documents.get(
        "TwoPartyContract.request",
        {
          where: [["$id", "==", this.state.requestToEdit.$id]],
        }
      );

      //CHANGE THE DOCUMENT.SET ->

      // let theMsgsToAddTo = [...this.state.requestToEdit.msgObject];
      // theMsgsToAddTo.push(theMsgObject);

      //console.log("theMsgsToAddTo", theMsgsToAddTo);

      if (addedMessage !== "") {
        document.set("req", Buffer.from(encryptedProps.req).toString("base64"));
        document.set("fromReq", encryptedProps.fromReq);
      }

      await platform.documents.broadcast({ replace: [document] }, identity);
      return document;

      //############################################################
      //This below disconnects the document editing..***

      //return document;

      //This is to disconnect the Document editing***
      //############################################################
    };

    edit2PartyDoc()
      .then((d) => {
        let returnedDoc = d.toJSON();

        returnedDoc.toId = Identifier.from(returnedDoc.toId, "base64").toJSON();

        returnedDoc.forId = Identifier.from(
          returnedDoc.forId,
          "base64"
        ).toJSON();

        //returnedDoc.msgObject = JSON.parse(returnedDoc.msgObject);

        // let propsToEncrypt = {
        //   txId: this.state.requestToEdit.txId,
        //   sig: this.state.requestToEdit.sigObject,
        //   msgs: [theMsgObject, ...this.state.requestToEdit.msgObject],
        // };

        returnedDoc.txId = propsToEncrypt.txId;
        returnedDoc.sigObject = propsToEncrypt.sig;
        returnedDoc.msgObject = propsToEncrypt.msgs;
        returnedDoc.error = "";

        console.log("Edited 2Party Req:\n", returnedDoc);

        let editedRequests = this.state.ReqsFromYou;

        editedRequests.splice(this.state.requestToEditIndex, 1, returnedDoc);

        this.setState(
          {
            ReqsFromYou: editedRequests,
            isLoading2Party: false,
          },
          () => this.loadIdentityCredits()
        );
      })
      .catch((e) => {
        // this.setState({
        //   isLoading2Party: false,
        // });

        console.error("Something went wrong editing 2 Party request:\n", e);
      })
      .finally(() => client.disconnect());
  };

  showAddMessageToResponseModal = (theResponse, theRequestName, pubKeyDoc) => {
    let responseIndex = this.state.ReqsToYouResponses.findIndex((resp) => {
      return resp.$id === theResponse.$id;
    });
    this.setState({
      responseToEdit: theResponse,
      responseToEditIndex: responseIndex, //<- Need this for the editingfunction!!
      signingToSendToWhomNameDoc: theRequestName,
      requestPubKeyDoc2Party: pubKeyDoc,

      presentModal: "AddMessageToResponseModal",
      isModalShowing: true,
    });
  };

  editResponseAddMessage = (addedMessage) => {
    //  console.log("Called Edit ResponseAddMessage");
    this.setState({
      isLoading2Party: true,
    });

    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        this.state.mnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    // *** *** ***

    let theTime = Date.now();

    let theMsgObject = [];

    if (addedMessage !== "") {
      //SHouldnt get here anyway..
      theMsgObject = [
        {
          msg: addedMessage,
          time: theTime,
        },
      ];
    } else {
      theMsgObject = [];
    }

    let propsToEncrypt = {
      txId: this.state.responseToEdit.txId,
      refund: this.state.responseToEdit.refundTxId,
      sig: this.state.responseToEdit.sigObject,
      msgs: [...theMsgObject, ...this.state.responseToEdit.msgObject],
    };

    console.log("propsToEncrypt: ", propsToEncrypt);

    //SEND OBJECT TO ENCRYPT ->

    let encryptedProps = encryptMyResp(
      this.state.responseToEdit.reqTime,
      propsToEncrypt,
      // this.state.Your2PartyPubKey
      this.state.requestPubKeyDoc2Party,
      this.state.mnemonic,
      this.state.whichNetwork
    );

    // *** *** ***

    const submit2PartyDoc = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      }

      const [document] = await client.platform.documents.get(
        "TwoPartyContract.response",
        {
          where: [["$id", "==", this.state.responseToEdit.$id]],
        }
      );

      //CHANGE THE DOCUMENT.SET ->

      if (addedMessage !== "") {
        document.set(
          "resp",
          Buffer.from(encryptedProps.resp).toString("base64")
        );
        document.set("fromResp", encryptedProps.fromResp);
      }

      await platform.documents.broadcast({ replace: [document] }, identity);
      return document;

      //############################################################
      //This below disconnects the document editing..***

      //return document;

      //This is to disconnect the Document editing***
      //############################################################
    };

    submit2PartyDoc()
      .then((d) => {
        let returnedDoc = d.toJSON();

        returnedDoc.reqId = Identifier.from(
          returnedDoc.reqId,
          "base64"
        ).toJSON();

        returnedDoc.toId = Identifier.from(returnedDoc.toId, "base64").toJSON();

        //returnedDoc.msgObject = JSON.parse(returnedDoc.msgObject);

        // let propsToEncrypt = {
        //   txId: this.state.responseToEdit.txId,
        //   refund: this.state.responseToEdit.refundTxId,
        //   sig: this.state.responseToEdit.sigObject,
        //   msgs: [...theMsgObject, ...this.state.responseToEdit.msgObject],
        // };

        returnedDoc.txId = propsToEncrypt.txId;
        returnedDoc.refundTxId = propsToEncrypt.refund;
        returnedDoc.sigObject = propsToEncrypt.sig;
        returnedDoc.msgObject = propsToEncrypt.msgs;
        returnedDoc.error = "";

        console.log("Edited 2Party Doc:\n", returnedDoc);

        let editedResponses = this.state.ReqsToYouResponses;

        editedResponses.splice(this.state.responseToEditIndex, 1, returnedDoc);

        this.setState(
          {
            ReqsToYouResponses: editedResponses,
            isLoading2Party: false,
          },
          () => this.loadIdentityCredits()
        );
      })
      .catch((e) => {
        console.error("Something went wrong with Response Edit:\n", e);
        this.setState({
          isLoading2Party: false,
        });
      })
      .finally(() => client.disconnect());
  };

  // rejectOrReplyRequest = (addedMessage, ifReject) => {
  //   this.setState({
  //     isLoadingRefresh_WALLET: true,
  //     isLoadingWallet: true,

  //     isLoadingButtons_WALLET: true,
  //     isLoadingForm_WALLET: true,
  //     isLoadingMsgs_WALLET: true,
  //   });

  //   //console.log(addedMessage);

  //   const client = new Dash.Client(
  //     dapiClient(
  //       this.state.whichNetwork,
  //       this.state.mnemonic,
  //       this.state.skipSynchronizationBeforeHeight
  //     )
  //   );

  //   let docProperties = {};

  //   const submitDocuments = async () => {
  //     const { platform } = client;

  //     let identity = "";
  //     if (this.state.identityRaw !== "") {
  //       identity = this.state.identityRaw;
  //     } else {
  //       identity = await platform.identities.get(this.state.identity);
  //     } // Your identity ID
  //     if (ifReject) {
  //       docProperties = {
  //         msg: addedMessage,
  //         msgId: this.state.WALLET_requestPmtReqDoc.$id,
  //         txId: "rej",
  //       };
  //     } else {
  //       docProperties = {
  //         msg: addedMessage,
  //         msgId: this.state.WALLET_requestPmtReqDoc.$id,
  //       };
  //     }

  //     // Create the note document
  //     const dgmDocument = await platform.documents.create(
  //       "DGMContract.dgmthr",
  //       identity,
  //       docProperties
  //     );

  //     //console.log(dsoDocument.toJSON());

  //     //############################################################
  //     //This below disconnects the document sending..***

  //     // return dgmDocument;

  //     //This is to disconnect the Document Creation***

  //     //############################################################

  //     const documentBatch = {
  //       create: [dgmDocument], // Document(s) to create
  //     };

  //     await platform.documents.broadcast(documentBatch, identity);
  //     return dgmDocument;
  //   };

  //   submitDocuments()
  //     .then((d) => {
  //       let returnedDoc = d.toJSON();
  //       console.log("Thread Documents:\n", returnedDoc);

  //       let newThread;

  //       // required: [' 'msg','msgId', "$createdAt", "$updatedAt"],
  //       if (ifReject) {
  //         newThread = {
  //           $ownerId: returnedDoc.$ownerId,
  //           $id: returnedDoc.$id,
  //           msgId: this.state.WALLET_requestPmtReqDoc.$id,
  //           msg: addedMessage,
  //           $createdAt: returnedDoc.$createdAt,
  //           txId: "rej",
  //         };
  //       } else {
  //         newThread = {
  //           $ownerId: returnedDoc.$ownerId,
  //           $id: returnedDoc.$id,
  //           msgId: this.state.WALLET_requestPmtReqDoc.$id,
  //           msg: addedMessage,
  //           $createdAt: returnedDoc.$createdAt,
  //         };
  //       }

  //       this.setState({
  //         WALLET_ByYouThreads: [newThread, ...this.state.WALLET_ByYouThreads],

  //         isLoadingRefresh_WALLET: false,
  //         isLoadingWallet: false,
  //         isLoadingButtons_WALLET: false,
  //         isLoadingForm_WALLET: false,

  //         isLoadingMsgs_WALLET: false,
  //       });
  //     })
  //     .catch((e) => {
  //       this.setState({
  //         isLoadingRefresh_WALLET: false,
  //         isLoadingWallet: false,
  //         isLoadingButtons_WALLET: false,
  //         isLoadingForm_WALLET: false,

  //         isLoadingMsgs_WALLET: false,
  //       });

  //       console.error("Something went wrong creating new thread:\n", e);
  //     })
  //     .finally(() => client.disconnect());
  // };

  // ^^^ FOR PAYMENT REQUESTS**
  //

  // ^^^^ - PAYMENT REQUEST

  //CREATING DOCUMENTS AND MAKING PAYMENTS
  //Called from modal on showModal on Button Press
  RegisterYour2PartyPubKey = () => {
    console.log("Called Register 2Party Pub Key");
    this.setState({
      isLoading2Party: true,
      Your2PartyPubKey: "Querying",
    });

    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        this.state.mnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    const submitNoteDocument = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      } // Your identity ID

      //create wallet from new Mnemonic

      let wallet = new Mnemonic(this.state.mnemonic);

      let hdPrivateKey = wallet.toHDPrivateKey();

      let hdPrivateKeyChild = hdPrivateKey.deriveChild("m/2024'/5'/2'");
      //"m/2024'/5'/2'/timestamp"

      let hdxPublicKey = new HDPublicKey(
        hdPrivateKeyChild,
        this.state.whichNetwork
      ).toObject().xpubkey;

      //xpubkey

      console.log("hdxPublicKey", hdxPublicKey);

      const docProperties = {
        xpubkey: hdxPublicKey,
      };

      // Create the note document
      const TwoPartyDoc = await platform.documents.create(
        "TwoPartyContract.xPubKeyDoc",
        identity,
        docProperties
      );

      //############################################################
      //This below disconnects the document sending..***

      //return TwoPartyDoc;

      //This is to disconnect the Document Creation***
      //############################################################

      const documentBatch = {
        create: [TwoPartyDoc], // Document(s) to create
      };
      // Sign and submit the document(s)
      await platform.documents.broadcast(documentBatch, identity);
      return TwoPartyDoc;
    };

    submitNoteDocument()
      .then((d) => {
        let returnedDoc = d.toJSON(); //d[0].toJSON();
        console.log("Document:\n", returnedDoc);

        this.setState(
          {
            Your2PartyPubKey: returnedDoc,
            isLoading2Party: false,
          },
          () => this.loadIdentityCredits()
        );
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        // this.setState({
        //   isLoading2Party: false,
        // });
      })
      .finally(() => client.disconnect());
  };

  requestDash2PartyPayment = () => {
    //RENTALS USES A SEPARATE REQUEST FUNCTION BC OF THE FORID
    //console.log("Called Submit Request Pmt Doc");

    this.setState({
      isLoading2Party: true,
      isModalShowing: false,
      selectedDapp: "2-Party Pay",
      DisplayReqsOrPmts: "Requests",
    });

    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        this.state.mnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    let docProperties = {};

    const submitDocument = async () => {
      const { platform } = client;
      // const identity = await platform.identities.get(this.state.identity); // Your identity ID

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      } // Your identity ID

      docProperties = {
        toId: this.state.sendToNameDoc2Party.$ownerId,
        forId: this.state.sendToNameDoc2Party.$ownerId,
        req: "100",
        fromReq: "100",
        amt: this.state.amountToSend2Party,

        // txId: "", //Blank txId not paid out of multisig Yet
        // sigObject: "",
        // msgObject: theMsgObject,
        //encryptObject: "",
      };

      //console.log(docProperties);

      // Create the note document
      const twoPartyDocument = await platform.documents.create(
        "TwoPartyContract.request",
        identity,
        docProperties
      );

      //console.log(twoPartyDocument.toJSON());

      //############################################################
      //This below disconnects the document sending..***

      //return twoPartyDocument;

      //This is to disconnect the Document Creation***

      //############################################################

      const documentBatch = {
        create: [twoPartyDocument], // Document(s) to create
      };

      await platform.documents.broadcast(documentBatch, identity);
      return twoPartyDocument;
    };

    submitDocument()
      .then((d) => {
        let returnedDoc = d.toJSON();

        returnedDoc.toId = Identifier.from(returnedDoc.toId, "base64").toJSON();

        returnedDoc.forId = Identifier.from(
          returnedDoc.forId,
          "base64"
        ).toJSON();

        //Buffer.from(returnedDoc.req).toString()

        // propsToEncrypt = {
        //   txId: this.state.requestToEdit.txId,
        //   sig: this.state.requestToEdit.sigObject,
        //   msgs: [...theMsgObject, ...this.state.requestToEdit.msgObject],
        // };

        returnedDoc.txId = "";
        returnedDoc.sigObject = "";
        returnedDoc.msgObject = [];
        returnedDoc.error = "";

        //returnedDoc.msgObject = JSON.parse(returnedDoc.msgObject);

        console.log("Req Document:\n", returnedDoc);

        this.setState(
          {
            ReqsFromYou: [returnedDoc, ...this.state.ReqsFromYou],
            ReqsFromYouNames: [
              this.state.sendToNameDoc2Party,
              ...this.state.ReqsFromYouNames,
            ],
            isLoading2Party: false,
            //send2PartyPmtMsgSuccess: true,
          },
          () => this.handleRefresh_2Party()
        );
      })
      .catch((e) => {
        this.setState({
          isLoading2Party: false,
          sendReqFailure2Party: true,
        });

        console.error("Something went wrong creating new 2Party Req:\n", e);
      })
      .finally(() => client.disconnect());
  };

  //THIS IS THE ACTUAL PAYMENT AND TX
  show2PartyPayRequestModal = (
    reqDoc,
    inputNameDoc, //name and OwnerId
    pubKeyDoc
    //NEED FOR MSGID
    //inputNumber //Should already be in duffs
  ) => {
    //THIS IS AFTER YOU CLICK PAY ON PAYMENT REQUEST
    this.setState({
      sendSuccess2Party: false, //TX go through
      sendFailure2Party: false, //TX go through
      //sendReqSuccess2Party: false, //Req go through
      // sendReqFailure2Party: false,
      //sendPmtMsgSuccess2Party: false, //It just go through
      sendPmtMsgFailure2Party: false, //Response go through
      requestPmtReqDoc2Party: reqDoc,
      sendToNameDoc2Party: inputNameDoc,
      amountToSend2Party: Number(reqDoc.amt),
      requestPubKeyDoc2Party: pubKeyDoc,

      //messageToSend2Party: message, //Add message in the modal

      presentModal: "Pay2PartyRequestModal",
      isModalShowing: true,
    });
  };

  payDash2PartyRequest = (addedMessage) => {
    // console.log(addedMessage);

    this.setState({
      isLoading2Party: true,
      isLoadingWallet: true,
    });

    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        this.state.mnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    const payToRecipient = async () => {
      const account = await client.getWalletAccount();

      //CREATE THE MULTISIG TO SEND TO -

      //https://github.com/dashpay/dashcore-lib/blob/master/lib/hdpublickey.js

      //2,147,483,648 =  2^31 is deriveChild limit
      //1,729,873,503,663 TIMENOW
      //31,536,000 secsInYear
      //68 years this is how long until repeat - no just repeat, run out of room, will need to increase truncate
      //Just truncate - 1,729,873,000,000

      let timeStamp =
        this.state.requestPmtReqDoc2Party.$createdAt - 1729873000000;

      //console.log("timeStamp", timeStamp);

      let truncatedTimeStamp = new String(timeStamp).slice(0, -3);

      //console.log("requestPmtReqDoc2Party", this.state.requestPmtReqDoc2Party);
      //console.log("Your2PartyPubKey", this.state.Your2PartyPubKey.xpubkey);

      let YourPublicKey = new HDPublicKey(this.state.Your2PartyPubKey.xpubkey)
        .deriveChild(`m/${truncatedTimeStamp}`)
        //`m/2147483647` <- LIMIT, will hit in 68 years
        .toObject().publicKey;

      // console.log("YourPublicKey", YourPublicKey);

      let TheirPublicKey = new HDPublicKey(
        this.state.requestPubKeyDoc2Party.xpubkey
      )
        .deriveChild(`m/${truncatedTimeStamp}`)
        .toObject().publicKey;

      // console.log("TheirPublicKey", TheirPublicKey);

      let redeemScript = Script.buildMultisigOut(
        [YourPublicKey, TheirPublicKey],
        2
      );

      //console.log("redeemScript: ", redeemScript);

      let scriptHashOut = redeemScript.toScriptHashOut();
      //console.log("ScriptHashOut: ", scriptHashOut.toString());

      let scriptAddress = Address.fromScript(
        scriptHashOut,
        this.state.whichNetwork
      );
      console.log("scriptAddress: ", scriptAddress.toString());

      //CREATE THE MULTISIG TO SEND TO ^^^^

      let dashAmt = this.state.amountToSend2Party;
      console.log("sats sent in TX:", dashAmt);
      // console.log(typeof dashAmt);

      // let amt = dashAmt.toFixed(0).toString();
      // console.log(amt);
      // console.log(typeof amt);

      const transaction = account.createTransaction({
        recipient: scriptAddress,
        satoshis: dashAmt, //Must be a string!! -> no.
      });
      //return transaction.id; //Use to disable TX
      return account.broadcastTransaction(transaction);
    };

    payToRecipient()
      .then((d) => {
        console.log("Payment TX:\n", d);

        this.setState(
          {
            sendSuccess2Party: true, //TX go through //DO I NEED THIS? BC THE DOCUMENT WILL JUST CHANGE TO REFLECT
          },
          () => this.create2PartyResponseWithTX(d, addedMessage)
        );
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        this.setState({
          isLoading2Party: false,
          isLoadingWallet: false,
          sendFailure2Party: true, //TX go through
        });
      });
    //.finally(() => client.disconnect()); // <- Caused Error in the past, added back seems to fix more recent payment error. -> YES error dont use
  };

  //NEEDS ITS ONLY MODAL AND MESSAGE.. OR SHOULD JUST SUBMIT
  //THIS IS THE Create Response is AlreadySent
  alreadySentCreateResponse = (
    reqDoc,
    inputNameDoc, //name and OwnerId
    pubKeyDoc,
    txId
    //inputNumber //Should already be in duffs
  ) => {
    this.setState(
      {
        //sendSuccess2Party: false, //TX go through
        //sendFailure2Party: false, //TX go through
        //sendPmtMsgFailure2Party: false, //Response go through
        requestPmtReqDoc2Party: reqDoc,
        sendToNameDoc2Party: inputNameDoc,
        amountToSend2Party: Number(reqDoc.amt),
        requestPubKeyDoc2Party: pubKeyDoc,
      },
      () => this.create2PartyResponseWithTX(txId, "")
    );
  };

  create2PartyResponseWithTX = (theTxId, addedMessage) => {
    //console.log(addedMessage);
    this.setState({
      //This is for the checkAlreadySent Resubmit
      isLoading2Party: true,
    });

    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        this.state.mnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    let docProperties = {};

    //get time
    let theTime = Date.now();

    //build msgObject = id?, time created updated,
    let theMsgObject = [];

    if (addedMessage !== "") {
      theMsgObject = [
        {
          msg: addedMessage,
          time: theTime,
        },
      ];
    } else {
      theMsgObject = [];
    }

    let propsToEncrypt = {
      txId: theTxId,
      refund: "",
      sig: "",
      msgs: theMsgObject,
    };

    console.log("propsToEncrypt: ", propsToEncrypt);

    // encryptMyResp(
    //   timeStamp,
    // theRespInput,
    // theRequestPubKeyDoc,
    // //theResponsePubKeyDoc
    // theMnemonic,
    // whichNetwork
    // )

    let timeStamp =
      this.state.requestPmtReqDoc2Party.$createdAt - 1729873000000;

    let encryptedProps = encryptMyResp(
      timeStamp,
      propsToEncrypt,
      this.state.requestPubKeyDoc2Party,
      // this.state.Your2PartyPubKey
      this.state.mnemonic,
      this.state.whichNetwork
    );

    const submitDocuments = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      } // Your identity ID

      console.log(encryptedProps);

      docProperties = {
        reqId: this.state.requestPmtReqDoc2Party.$id,
        toId: this.state.requestPmtReqDoc2Party.$ownerId,
        amtMatch: this.state.amountToSend2Party,
        reqTime: timeStamp,
        resp: Buffer.from(encryptedProps.resp).toString("base64"),
        fromResp: encryptedProps.fromResp, //Buffer.from(encryptedProps.fromResp).toString("base64"),
        //txId: theTxId,
        //refundTxId: "",
        //sigObject: "",
        // msgObject: theMsgObject,
      };

      // Create the note document
      const twoPartyDocument = await platform.documents.create(
        "TwoPartyContract.response",
        identity,
        docProperties
      );

      //console.log(dsoDocument.toJSON());

      //############################################################
      //This below disconnects the document sending..***

      //return twoPartyDocument;

      //This is to disconnect the Document Creation***

      //############################################################

      const documentBatch = {
        create: [twoPartyDocument], // Document(s) to create
      };

      await platform.documents.broadcast(documentBatch, identity);
      return twoPartyDocument;
    };

    submitDocuments()
      .then((d) => {
        let returnedDoc = d.toJSON();

        returnedDoc.reqId = Identifier.from(
          returnedDoc.reqId,
          "base64"
        ).toJSON();

        returnedDoc.toId = Identifier.from(returnedDoc.toId, "base64").toJSON();
        // let propsToEncrypt = {
        //   txId: theTxId,
        //   refund: "",
        //   sig: "",
        //   msgs: theMsgObject,
        // };

        //txId: theTxId,
        //refundTxId: "",
        //sigObject: "",
        // msgObject: theMsgObject,

        returnedDoc.txId = propsToEncrypt.txId;
        returnedDoc.refundTxId = propsToEncrypt.refund;
        returnedDoc.sigObject = propsToEncrypt.sig;
        returnedDoc.msgObject = propsToEncrypt.msgs;
        returnedDoc.error = "";

        console.log("response Doc:\n", returnedDoc);

        this.setState(
          {
            ReqsToYouResponses: [returnedDoc, ...this.state.ReqsToYouResponses],
            //BELOW handled in the POSTPAYMENTWallet function.
            //isLoadingWallet: false,
            isLoading2Party: false,
            WALLET_sendMsgSuccess: true,
          },
          () => this.loadIdentityCredits()
        );

        this.get2PartyWallet();
      })
      .catch((e) => {
        this.setState(
          {
            isLoading2Party: false,
            sendPmtMsgFailure2Party: true,
          },
          () => this.get2PartyWallet()
        );

        console.error("Something went wrong creating 2 Party response:\n", e);
      })
      .finally(() => client.disconnect());
  };

  // THIS IS FOR THE RESPONSE DOCUMENT <- **

  showReleaseFundsModal = (
    signatureToAdd,
    theResponse,
    toWhomNameDoc,
    pubKeyDoc,
    theRequest
  ) => {
    this.setState({
      isLoading2Party: true,
    });
    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));

    // const getDocuments = async () => {
    //   return client.platform.documents.get("TwoPartyContract.response", {
    //     where: [["$id", "==", theResponse.$id]],
    //   });
    // };

    const getDocuments = async () => {
      return client.platform.documents.get("TwoPartyContract.request", {
        where: [["$id", "==", theResponse.reqId]],
      });
    };

    getDocuments()
      .then((d) => {
        if (d.length === 0) {
          console.log("There is no Document");

          //PUT THE REFRESH HERE..
          this.handleRefresh_2Party();
        } else {
          let returnedDoc = d[0].toJSON();

          //console.log("returnedDoc: ", returnedDoc);
          if (returnedDoc.req !== theRequest.req) {
            //Why will the req be different? bc this is checking the other person's document
            //JUST REFRESH
            this.handleRefresh_2Party();
          } else {
            this.showReleaseFundsModalPostCheck(
              signatureToAdd,
              theResponse,
              toWhomNameDoc,
              pubKeyDoc
            );
          }
        }
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        return undefined;
      })
      .finally(() => client.disconnect());
  };

  showReleaseFundsModalPostCheck = (
    signatureToAdd,
    theResponse,
    toWhomNameDoc,
    pubKeyDoc
  ) => {
    //console.log("signatureToAdd", signatureToAdd);
    //find the index
    let responseIndex = this.state.ReqsToYouResponses.findIndex((resp) => {
      return resp.$id === theResponse.$id;
    });

    this.setState(
      {
        isLoading2Party: false, //ADDED FOR THE CHECK SIGN
        signature2Party: signatureToAdd,
        responseToEdit: theResponse,
        responseToEditIndex: responseIndex, //<- Need this for the editingfunction!!
        requestPubKeyDoc2Party: pubKeyDoc,
        signingToSendToWhomNameDoc: toWhomNameDoc,
      },
      () => this.showModal("Release2PartyModal")
    );
  };

  editReleaseFunds = (addedMessage) => {
    //  console.log("Called Edit ReleaseFunds");
    this.setState({
      isLoading2Party: true,
    });

    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        this.state.mnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    // *** *** ***

    let theMsgObject = [];

    if (addedMessage !== "") {
      let theTime = Date.now();

      theMsgObject = [
        {
          msg: addedMessage,
          time: theTime,
        },
      ];
    }

    let propsToEncrypt = {
      txId: this.state.responseToEdit.txId,
      refund: this.state.responseToEdit.refundTxId,
      sig: this.state.signature2Party.signature.toString(),
      //sig: this.state.responseToEdit.sigObject,
      msgs: [...theMsgObject, ...this.state.responseToEdit.msgObject],
    };

    //console.log("propsToEncrypt: ", propsToEncrypt);

    //SEND OBJECT TO ENCRYPT ->

    let encryptedProps = encryptMyResp(
      this.state.responseToEdit.reqTime,
      propsToEncrypt,
      // this.state.Your2PartyPubKey
      this.state.requestPubKeyDoc2Party,
      this.state.mnemonic,
      this.state.whichNetwork
    );

    // *** *** ***

    const submit2PartyDoc = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      }

      const [document] = await client.platform.documents.get(
        "TwoPartyContract.response",
        {
          where: [["$id", "==", this.state.responseToEdit.$id]],
        }
      );

      //console.log("signatureToAdd", this.state.signatureToAdd);
      //RELEASE THE FUNDS
      // document.set(
      //   "sigObject",
      //   this.state.signature2Party.signature.toString()
      // );
      // let theMsgsToAddTo = [...this.state.responseToEdit.msgObject];
      // theMsgsToAddTo.push(theMsgObject);
      // //console.log("theMsgsToAddTo", theMsgsToAddTo);
      // if (addedMessage !== "") {
      //   document.set("msgObject", JSON.stringify(theMsgsToAddTo));
      // }

      //CHANGE THE DOCUMENT.SET ->

      document.set("resp", Buffer.from(encryptedProps.resp).toString("base64"));
      document.set("fromResp", encryptedProps.fromResp);

      await platform.documents.broadcast({ replace: [document] }, identity);
      return document;

      //############################################################
      //This below disconnects the document editing..***

      //return document;

      //This is to disconnect the Document editing***
      //############################################################
    };

    submit2PartyDoc()
      .then((d) => {
        let returnedDoc = d.toJSON();

        returnedDoc.reqId = Identifier.from(
          returnedDoc.reqId,
          "base64"
        ).toJSON();

        returnedDoc.toId = Identifier.from(returnedDoc.toId, "base64").toJSON();

        //returnedDoc.msgObject = JSON.parse(returnedDoc.msgObject);

        returnedDoc.txId = propsToEncrypt.txId;
        returnedDoc.refundTxId = propsToEncrypt.refund;
        returnedDoc.sigObject = propsToEncrypt.sig;
        returnedDoc.msgObject = propsToEncrypt.msgs;
        returnedDoc.error = "";

        console.log("Edited 2Party Doc:\n", returnedDoc);

        let editedResponses = this.state.ReqsToYouResponses;

        editedResponses.splice(this.state.responseToEditIndex, 1, returnedDoc);

        this.setState(
          {
            ReqsToYouResponses: editedResponses,
            isLoading2Party: false,
          },
          () => this.loadIdentityCredits()
        );
      })
      .catch((e) => {
        console.error("Something went wrong with Response Edit:\n", e);
        this.setState({
          isLoading2Party: false,
        });
      })
      .finally(() => client.disconnect());
  };

  showRetrieveFundsModal = (
    theResponse,
    theResponsePubKeyDoc,
    toWhomNameDoc,
    theRequest,
    theTx
  ) => {
    let requestIndex = this.state.ReqsFromYou.findIndex((req) => {
      return req.$id === theRequest.$id;
    });
    this.setState(
      {
        responseToUse: theResponse,
        responsePubKeyDocToUse: theResponsePubKeyDoc,
        signingToSendToWhomNameDoc: toWhomNameDoc, //This will be the responseName
        requestToEdit: theRequest,
        requestToEditIndex: requestIndex, //<- Need this for the editingfunction!!
        txToUse: theTx,
      },
      () => this.showModal("RetrieveFundsModal")
    );
  };

  //THIS IS THE ACTUAL PAYMENT AND TX
  payRetrieveFunds = (addedMessage) => {
    // console.log(addedMessage);

    this.setState({
      isLoading2Party: true,
      isLoadingWallet: true,
      //messageToSend2Party: "MSGFORpaidthr",
    });

    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        this.state.mnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    const payToRecipient = async () => {
      const account = await client.getWalletAccount();

      // createFullTX(
      //   theRequest,
      //   theRequestPubKeyDoc,
      //   theResponse,
      //   theResponsePubKeyDoc,
      //   whichNetwork,
      //   theTx, //txId,script,amt
      //   theMnemonic,
      //   theAddress
      // )

      let transaction = createFullTX(
        this.state.requestToEdit,
        this.state.Your2PartyPubKey,
        this.state.responseToUse,
        this.state.responsePubKeyDocToUse,
        this.state.whichNetwork,
        this.state.txToUse,
        this.state.mnemonic,
        this.state.accountAddress
      );

      //return transaction.id; //Use to disable TX
      return account.broadcastTransaction(transaction);
    };

    payToRecipient()
      .then((d) => {
        console.log("Payment TX:\n", d);

        this.setState(
          {
            sendSuccess2Party: true, //TX go through //DO I NEED THIS? BC THE DOCUMENT WILL JUST CHANGE TO REFLECT
          },
          () => this.editRetrieveFundsReqWithTX(d, addedMessage)
        );
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        this.setState({
          isLoading2Party: false,
          isLoadingWallet: false,
          sendFailure2Party: true, //TX go through
        });
      });
    //.finally(() => client.disconnect()); // <- Caused Error in the past, added back seems to fix more recent payment error. -> YES error dont use
  };

  editRetrieveFundsReqWithTX = (theTxId, addedMessage) => {
    //console.log(addedMessage);

    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        this.state.mnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    // *** *** ***

    let theMsgObject = [];

    if (addedMessage !== "") {
      let theTime = Date.now();

      theMsgObject = [
        {
          msg: addedMessage,
          time: theTime,
        },
      ];
    }

    let propsToEncrypt = {
      txId: theTxId,
      sig: this.state.requestToEdit.sigObject,
      msgs: [...theMsgObject, ...this.state.requestToEdit.msgObject],
    };

    //console.log("propsToEncrypt: ", propsToEncrypt);

    let timeStamp = this.state.requestToEdit.$createdAt - 1729873000000;

    //SEND OBJECT TO ENCRYPT ->

    let encryptedProps = encryptMyReq(
      timeStamp,
      propsToEncrypt,
      // this.state.Your2PartyPubKey
      this.state.responsePubKeyDocToUse,
      this.state.mnemonic,
      this.state.whichNetwork
    );

    // *** *** ***

    const edit2PartyDoc = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      } // Your identity ID

      const [document] = await client.platform.documents.get(
        "TwoPartyContract.request",
        {
          where: [["$id", "==", this.state.requestToEdit.$id]],
        }
      );

      //console.log("signatureToAdd", this.state.signatureToAdd);
      //RELEASE THE FUNDS
      // document.set("txId", theTxId);
      // let theMsgsToAddTo = [...this.state.requestToEdit.msgObject];
      // theMsgsToAddTo.push(theMsgObject);
      // //console.log("theMsgsToAddTo", theMsgsToAddTo);
      // if (addedMessage !== "") {
      //   document.set("msgObject", JSON.stringify(theMsgsToAddTo));
      // }

      //CHANGE THE DOCUMENT.SET ->

      document.set("req", Buffer.from(encryptedProps.req).toString("base64"));
      document.set("fromReq", encryptedProps.fromReq);

      await platform.documents.broadcast({ replace: [document] }, identity);
      return document;

      //############################################################
      //This below disconnects the document editing..***

      //return document;

      //This is to disconnect the Document editing***
      //############################################################
    };

    edit2PartyDoc()
      .then((d) => {
        let returnedDoc = d.toJSON();

        returnedDoc.toId = Identifier.from(returnedDoc.toId, "base64").toJSON();

        returnedDoc.forId = Identifier.from(
          returnedDoc.forId,
          "base64"
        ).toJSON();

        //returnedDoc.msgObject = JSON.parse(returnedDoc.msgObject);

        // let propsToEncrypt = {
        //   txId: this.state.requestToEdit.txId,
        //   sig: this.state.requestToEdit.sigObject,
        //   msgs: [theMsgObject, ...this.state.requestToEdit.msgObject],
        // };

        returnedDoc.txId = propsToEncrypt.txId;
        returnedDoc.sigObject = propsToEncrypt.sig;
        returnedDoc.msgObject = propsToEncrypt.msgs;
        returnedDoc.error = "";

        console.log("Edited 2Party Req:\n", returnedDoc);

        let editedRequests = this.state.ReqsFromYou;

        editedRequests.splice(this.state.requestToEditIndex, 1, returnedDoc);

        this.setState(
          {
            ReqsFromYou: editedRequests,
            isLoading2Party: false,
          },
          () => this.loadIdentityCredits()
        );

        this.get2PartyWallet();
      })
      .catch((e) => {
        this.setState(
          {
            isLoading2Party: false,
            // sendPmtMsgFailure2Party: true,
          },
          () => this.get2PartyWallet()
        );

        console.error("Something went wrong editing 2 Party request:\n", e);
      })
      .finally(() => client.disconnect());
  };

  // THIS IS FOR THE REQUEST DOCUMENT <- **

  showRefundFundsModal = (
    signatureToAdd,
    theRequest,
    toWhomNameDoc,
    theResponsePubKeyDoc,
    theResponse
  ) => {
    this.setState({
      isLoading2Party: true,
    });
    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));

    const getDocuments = async () => {
      return client.platform.documents.get("TwoPartyContract.response", {
        where: [["$id", "==", theResponse.$id]],
      });
    };

    getDocuments()
      .then((d) => {
        if (d.length === 0) {
          console.log("There is no Document");

          //PUT THE REFRESH HERE..
          this.handleRefresh_2Party();
        } else {
          let returnedDoc = d[0].toJSON();

          //console.log("returnedDoc: ", returnedDoc);
          if (returnedDoc.resp !== theResponse.resp) {
            //JUST REFRESH
            this.handleRefresh_2Party();
          } else {
            this.showRefundFundsModalPostCheck(
              signatureToAdd,
              theRequest,
              toWhomNameDoc,
              theResponsePubKeyDoc
            );
          }
        }
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        return undefined;
      })
      .finally(() => client.disconnect());
  };

  showRefundFundsModalPostCheck = (
    signatureToAdd,
    theRequest,
    toWhomNameDoc,
    theResponsePubKeyDoc
  ) => {
    //console.log("signatureToAdd", signatureToAdd);
    //find the index
    let requestIndex = this.state.ReqsFromYou.findIndex((req) => {
      return req.$id === theRequest.$id;
    });
    this.setState(
      {
        isLoading2Party: false, //ADDED FOR THE CHECK
        signature2Party: signatureToAdd,
        responsePubKeyDocToUse: theResponsePubKeyDoc,
        requestToEdit: theRequest,
        requestToEditIndex: requestIndex, //<- Need this for the editingfunction!!
        signingToSendToWhomNameDoc: toWhomNameDoc,
      },
      () => this.showModal("Refund2PartyModal")
    );
  };

  editRefundFunds = (addedMessage) => {
    //  console.log("Called Edit Refund Funds");
    this.setState({
      isLoading2Party: true,
    });

    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        this.state.mnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    // *** *** ***

    let theMsgObject = [];

    if (addedMessage !== "") {
      let theTime = Date.now();

      theMsgObject = [
        {
          msg: addedMessage,
          time: theTime,
        },
      ];
    }

    let propsToEncrypt = {
      txId: this.state.requestToEdit.txId,
      sig: this.state.signature2Party.signature.toString(),
      msgs: [...theMsgObject, ...this.state.requestToEdit.msgObject],
    };

    console.log("propsToEncrypt: ", propsToEncrypt);

    let timeStamp = this.state.requestToEdit.$createdAt - 1729873000000;

    //SEND OBJECT TO ENCRYPT ->

    let encryptedProps = encryptMyReq(
      timeStamp,
      propsToEncrypt,
      // this.state.Your2PartyPubKey
      this.state.responsePubKeyDocToUse,
      this.state.mnemonic,
      this.state.whichNetwork
    );

    // *** *** ***

    const submit2PartyDoc = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      }

      const [document] = await client.platform.documents.get(
        "TwoPartyContract.request",
        {
          where: [["$id", "==", this.state.requestToEdit.$id]],
        }
      );

      //console.log("signatureToAdd", this.state.signatureToAdd);
      //RELEASE THE FUNDS
      // document.set(
      //   "sigObject",
      //   this.state.signature2Party.signature.toString()
      // );
      // //console.log(typeof this.state.requestToEdit.msgObject);
      // let theMsgsToAddTo = [...this.state.requestToEdit.msgObject];
      // theMsgsToAddTo.push(theMsgObject);
      // //console.log("theMsgsToAddTo", theMsgsToAddTo);
      // if (addedMessage !== "") {
      //   document.set("msgObject", JSON.stringify(theMsgsToAddTo));
      // }

      //CHANGE THE DOCUMENT.SET ->

      document.set("req", Buffer.from(encryptedProps.req).toString("base64"));
      document.set("fromReq", encryptedProps.fromReq);

      await platform.documents.broadcast({ replace: [document] }, identity);
      return document;

      //############################################################
      //This below disconnects the document editing..***

      //return document;

      //This is to disconnect the Document editing***
      //############################################################
    };

    submit2PartyDoc()
      .then((d) => {
        let returnedDoc = d.toJSON();

        returnedDoc.toId = Identifier.from(returnedDoc.toId, "base64").toJSON();

        returnedDoc.forId = Identifier.from(
          returnedDoc.forId,
          "base64"
        ).toJSON();

        // returnedDoc.msgObject = JSON.parse(returnedDoc.msgObject);

        returnedDoc.txId = propsToEncrypt.txId;
        returnedDoc.sigObject = propsToEncrypt.sig;
        returnedDoc.msgObject = propsToEncrypt.msgs;
        returnedDoc.error = "";

        console.log("Edited 2Party Doc:\n", returnedDoc);

        let editedRequests = this.state.ReqsFromYou;

        editedRequests.splice(this.state.requestToEditIndex, 1, returnedDoc);

        this.setState(
          {
            ReqsFromYou: editedRequests,
            isLoading2Party: false,
          },
          () => this.loadIdentityCredits()
        );
      })
      .catch((e) => {
        console.error("Something went wrong with Request Edit:\n", e);
        this.setState({
          isLoading2Party: false,
        });
      })
      .finally(() => client.disconnect());
  };

  showWithdrawRefundModal = (
    theResponse,
    theRequestPubKeyDoc, //theResponsePubKeyDoc
    toWhomNameDoc,
    theRequest,
    theTx
  ) => {
    let responseIndex = this.state.ReqsToYouResponses.findIndex((resp) => {
      return resp.$id === theResponse.$id;
    });
    this.setState(
      {
        requestToUse: theRequest,
        requestPubKeyDocToUse: theRequestPubKeyDoc,
        signingToSendToWhomNameDoc: toWhomNameDoc, //This will be the responseName
        responseToEdit: theResponse,
        responseToEditIndex: responseIndex,
        txToUse: theTx,
      },
      () => this.showModal("WithdrawRefundModal")
    );
  };

  //THIS IS THE ACTUAL PAYMENT AND TX
  payWithdrawRefund = (addedMessage) => {
    // console.log(addedMessage);

    this.setState({
      isLoading2Party: true,
      isLoadingWallet: true,
      //messageToSend2Party: "MSGFORpaidthr",
    });

    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        this.state.mnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    const payToRecipient = async () => {
      const account = await client.getWalletAccount();

      // createFullTX(
      //   theRequest,
      //   theRequestPubKeyDoc,
      //   theResponse,
      //   theResponsePubKeyDoc,
      //   whichNetwork,
      //   theTx, //txId,script,amt
      //   theMnemonic,
      //   theAddress
      // )

      let transaction = createFullTXRefund(
        this.state.requestToUse,
        this.state.requestPubKeyDocToUse,
        this.state.responseToEdit,
        this.state.Your2PartyPubKey,
        this.state.whichNetwork,
        this.state.txToUse,
        this.state.mnemonic,
        this.state.accountAddress
      );

      //return transaction.id; //Use to disable TX
      return account.broadcastTransaction(transaction);
    };

    payToRecipient()
      .then((d) => {
        console.log("Payment TX:\n", d);

        this.setState(
          {
            sendSuccess2Party: true, //TX go through //DO I NEED THIS? BC THE DOCUMENT WILL JUST CHANGE TO REFLECT
          },
          () => this.editWithdrawRefundRespWithTX(d, addedMessage)
        );
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        this.setState({
          isLoading2Party: false,
          isLoadingWallet: false,
          sendFailure2Party: true, //TX go through
        });
      });
    //.finally(() => client.disconnect()); // <- Caused Error in the past, added back seems to fix more recent payment error. -> YES error dont use
  };

  editWithdrawRefundRespWithTX = (theTxId, addedMessage) => {
    //console.log(addedMessage);

    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        this.state.mnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    // *** *** ***

    let theMsgObject = [];

    if (addedMessage !== "") {
      let theTime = Date.now();

      theMsgObject = [
        {
          msg: addedMessage,
          time: theTime,
        },
      ];
    }

    let propsToEncrypt = {
      txId: this.state.responseToEdit.txId,
      refund: theTxId,
      //sig: this.state.signature2Party,
      sig: this.state.responseToEdit.sigObject,
      msgs: [...theMsgObject, ...this.state.responseToEdit.msgObject],
    };

    console.log("propsToEncrypt: ", propsToEncrypt);

    //SEND OBJECT TO ENCRYPT ->

    let encryptedProps = encryptMyResp(
      this.state.responseToEdit.reqTime,
      propsToEncrypt,
      // this.state.Your2PartyPubKey
      this.state.requestPubKeyDocToUse,
      this.state.mnemonic,
      this.state.whichNetwork
    );

    // *** *** ***

    const edit2PartyDoc = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      } // Your identity ID

      const [document] = await client.platform.documents.get(
        "TwoPartyContract.response",
        {
          where: [["$id", "==", this.state.responseToEdit.$id]],
        }
      );

      //console.log("signatureToAdd", this.state.signatureToAdd);
      //RELEASE THE FUNDS
      // document.set("txId", theTxId);
      // let theMsgsToAddTo = [...this.state.responseToEdit.msgObject];
      // theMsgsToAddTo.push(theMsgObject);
      // //console.log("theMsgsToAddTo", theMsgsToAddTo);
      // if (addedMessage !== "") {
      //   document.set("msgObject", JSON.stringify(theMsgsToAddTo));
      // }

      //CHANGE THE DOCUMENT.SET ->

      document.set("resp", Buffer.from(encryptedProps.resp).toString("base64"));
      document.set("fromResp", encryptedProps.fromResp);

      await platform.documents.broadcast({ replace: [document] }, identity);
      return document;

      //############################################################
      //This below disconnects the document editing..***

      //return document;

      //This is to disconnect the Document editing***
      //############################################################
    };

    edit2PartyDoc()
      .then((d) => {
        let returnedDoc = d.toJSON();

        returnedDoc.reqId = Identifier.from(
          returnedDoc.reqId,
          "base64"
        ).toJSON();

        returnedDoc.toId = Identifier.from(returnedDoc.toId, "base64").toJSON();

        //returnedDoc.msgObject = JSON.parse(returnedDoc.msgObject);

        returnedDoc.txId = propsToEncrypt.txId;
        returnedDoc.refundTxId = propsToEncrypt.refund;
        returnedDoc.sigObject = propsToEncrypt.sig;
        returnedDoc.msgObject = propsToEncrypt.msgs;
        returnedDoc.error = "";

        console.log("Edited 2Party Resp:\n", returnedDoc);

        let editedResponses = this.state.ReqsToYouResponses;

        editedResponses.splice(this.state.responseToEditIndex, 1, returnedDoc);

        this.setState(
          {
            ReqsToYouResponses: editedResponses,
            isLoading2Party: false,
          },
          () => this.loadIdentityCredits()
        );

        this.get2PartyWallet();
      })
      .catch((e) => {
        this.setState(
          {
            isLoading2Party: false,
            // sendPmtMsgFailure2Party: true,
          },
          () => this.get2PartyWallet()
        );

        console.error("Something went wrong editing 2 Party response:\n", e);
      })
      .finally(() => client.disconnect());
  };

  /* 2-Party FUNCTIONS^^^^^
   *
   *
   *                             #############
   *                            ###         ###
   *                                     ####
   *                                 ####
   *                              ####
   *                            ###############
   *
   *    ################
   *    ###          ###
   *    ################
   *    ###
   *    ###
   */
  //PUBLIC SPACES FUNCTIONS

  pullInitialTriggerPUBLICSPACES = () => {
    if (this.state.InitialPullPUBLICSPACES) {
      this.getYourPublicSpaces();
      this.getActivePublicSpaces();
      this.setState({
        InitialPullPUBLICSPACES: false, //ADD
      });
    }
  };

  // hidePublicSpacePage = () => {
  //   this.setState({
  //     isPublicSpaceShowing: false,
  //   });
  // };

  // showPublicSpacesPage = (groupName) => {
  //   this.setState({
  //     selectedDapp: "Public Spaces", // ADDED THIS FOR THE EVENT FUNCTIONALITY
  //     isModalShowing: false, // ADDED THIS FOR THE EVENT FUNCTIONALITY
  //     selectedGroup: groupName,
  //     isGroupShowing: true,
  //   });
  // };

  getYourPublicSpaces = (theIdentity) => {
    this.setState({
      isLoadingGroups: true,
    });

    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));

    //DGTInvite Query
    const getDocuments = async () => {
      return client.platform.documents.get("DGTContract.dgtinvite", {
        where: [
          ["toId", "==", theIdentity],
          //["$createdAt", "<=", Date.now()],
        ],
        orderBy: [["$createdAt", "desc"]],
      });
    };

    getDocuments()
      .then((d) => {
        if (d.length === 0) {
          console.log("There are no ActivePublicSpaces");
          this.setState({
            isLoadingGroups: false,
          });
        } else {
          let docArray = [];

          for (const n of d) {
            let returnedDoc = n.toJSON();
            //console.log("Invite:\n", returnedDoc);
            returnedDoc.toId = Identifier.from(
              returnedDoc.toId,
              "base64"
            ).toJSON();
            //console.log("newInvite:\n", returnedDoc);
            docArray = [...docArray, returnedDoc];
          }

          this.getYourPublicSpacesNames(docArray);
        }
      })
      .catch((e) => console.error("Something went wrong:\n", e))

      .finally(() => client.disconnect());
  };

  getYourPublicSpacesNames = (docArray) => {
    //console.log("Calling getNamesforDGTInvites");

    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));

    let arrayOfOwnerIds = docArray.map((doc) => {
      return doc.$ownerId;
    });

    let setOfOwnerIds = [...new Set(arrayOfOwnerIds)];

    arrayOfOwnerIds = [...setOfOwnerIds];

    const getNameDocuments = async () => {
      return client.platform.documents.get("DPNSContract.domain", {
        where: [["records.identity", "in", arrayOfOwnerIds]],
        orderBy: [["records.identity", "asc"]],
      });
    };

    getNameDocuments()
      .then((d) => {
        if (d.length === 0) {
          console.log("No DPNS domain documents retrieved.");
        }

        let nameDocArray = [];

        for (const n of d) {
          //console.log("NameDoc:\n", n.toJSON());

          nameDocArray = [n.toJSON(), ...nameDocArray];
        }

        this.setState({
          dgtInvitesNames: nameDocArray,
          dgtInvites: docArray,
          isLoadingGroups: false,
        });
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        this.setState({
          isLoadingGroups: false,
        });
      })
      .finally(() => client.disconnect());
  };

  getActivePublicSpaces = () => {
    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));

    const getDocuments = async () => {
      return client.platform.documents.get("PublicSpacesContract.dgtmsg", {
        limit: 80,
        where: [["$createdAt", "<=", Date.now()]],
        orderBy: [["$createdAt", "desc"]],
      });
    };

    getDocuments()
      .then((d) => {
        if (d.length === 0) {
          this.setState({
            isLoadingActiveGroups: false,
          });
        } else {
          let docArray = [];

          // for (const n of d) {
          //   let returnedDoc = n.toJSON();
          //   //console.log("Doc:\n", returnedDoc);
          //   returnedDoc.msgId = Identifier.from(
          //     returnedDoc.msgId,
          //     "base64"
          //   ).toJSON();
          //   //console.log("newDoc:\n", returnedDoc);
          //   docArray = [...docArray, returnedDoc];
          // }

          for (const n of d) {
            //console.log("Invite Documents:\n", n.toJSON());
            docArray = [...docArray, n.toJSON()];
            //DOES ANY PART OF DOCUMENT NEED CONVERTING? LIKE THE TOID? ->
          }

          let arrayOfGroups = docArray.map((doc) => {
            return doc.group;
          });

          let setOfGroups = [...new Set(arrayOfGroups)];

          let arrayOfUniqueGroups = [...setOfGroups];

          let uniqueActiveGroups = arrayOfUniqueGroups.map((grpName) => {
            return docArray.find((doc) => doc.group === grpName);
          });

          this.setState({
            dgtActiveGroups: uniqueActiveGroups,
            isLoadingActiveGroups: false,
          });
        }
      })
      .catch((e) => console.error("Something went wrong:\n", e))

      .finally(() => client.disconnect());
  };

  getActivePublicSpacesNames = (docArray) => {
    //console.log("Calling getNamesforDGTInvites");

    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));

    let arrayOfOwnerIds = docArray.map((doc) => {
      return doc.$ownerId;
    });

    let setOfOwnerIds = [...new Set(arrayOfOwnerIds)];

    arrayOfOwnerIds = [...setOfOwnerIds];

    const getNameDocuments = async () => {
      return client.platform.documents.get("DPNSContract.domain", {
        where: [["records.identity", "in", arrayOfOwnerIds]],
        orderBy: [["records.identity", "asc"]],
      });
    };

    getNameDocuments()
      .then((d) => {
        if (d.length === 0) {
          console.log("No DPNS domain documents retrieved.");
        }

        let nameDocArray = [];

        for (const n of d) {
          //console.log("NameDoc:\n", n.toJSON());

          nameDocArray = [n.toJSON(), ...nameDocArray];
        }

        this.setState({
          dgtInvitesNames: nameDocArray,
          dgtInvites: docArray,
          isLoadingGroups: false,
        });
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        this.setState({
          isLoadingGroups: false,
        });
      })
      .finally(() => client.disconnect());
  };

  //if not a DPNS or
  decideSelectedSpace = (theSpaceLabel) => {
    // DPNS or non-DPNS
    //what is query for DPNS Space? ->
    // 1) get name for ownerid , get spaces by ownerid, display text
    //      so same as for own spaces
    // but also spaces withe the label so can see all sent to owner as well ->
  };

  getSelectedPublicSpace = () => {};

  getSelectedPublicSpaceNames = (docArray) => {
    //console.log("Calling getNamesforDGTInvites");

    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));

    let arrayOfOwnerIds = docArray.map((doc) => {
      return doc.$ownerId;
    });

    let setOfOwnerIds = [...new Set(arrayOfOwnerIds)];

    arrayOfOwnerIds = [...setOfOwnerIds];

    const getNameDocuments = async () => {
      return client.platform.documents.get("DPNSContract.domain", {
        where: [["records.identity", "in", arrayOfOwnerIds]],
        orderBy: [["records.identity", "asc"]],
      });
    };

    getNameDocuments()
      .then((d) => {
        if (d.length === 0) {
          console.log("No DPNS domain documents retrieved.");
        }

        let nameDocArray = [];

        for (const n of d) {
          //console.log("NameDoc:\n", n.toJSON());

          nameDocArray = [n.toJSON(), ...nameDocArray];
        }

        this.setState({
          dgtInvitesNames: nameDocArray,
          dgtInvites: docArray,
          isLoadingGroups: false,
        });
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        this.setState({
          isLoadingGroups: false,
        });
      })
      .finally(() => client.disconnect());
  };

  // Create OR edit.
  handleSelectedJoinPublicSpace = (publicSpaceName) => {
    this.setState(
      {
        selectedPublicSpace: publicSpaceName,
      },
      () => this.showModal("JoinPublicSpaceModal")
    );
  };

  createPublicSpaceDoc = (newGroup) => {
    //Its just a name.
    this.setState({
      isLoadingGroups: true,
    });

    //Makes sure I dont send 2nd invite to myself

    let document = this.state.dgtInvites.find((invite) => {
      return (
        newGroup === invite.group && invite.$ownerId === this.state.identity
      );
    });

    if (document !== undefined) {
      this.setState({
        isLoadingGroups: false,
      });
    } else {
      const client = new Dash.Client(
        dapiClient(
          this.state.whichNetwork,
          this.state.mnemonic,
          this.state.skipSynchronizationBeforeHeight
        )
      );

      const submitInvite = async () => {
        const { platform } = client;

        //const identity = await platform.identities.get(this.state.identity); // Your identity ID
        //const identity = this.state.identityRaw;
        let identity = "";
        if (this.state.identityRaw !== "") {
          identity = this.state.identityRaw;
        } else {
          identity = await platform.identities.get(this.state.identity);
        } // Your identity ID

        const docProperties = {
          group: newGroup,
          //toId: Buffer.from(Identifier.from(this.state.identity)),
          // handle on return or what? did i change it right?
          toId: this.state.identity,
          dgt: "self",
        };

        // Create the note document
        const dgtDocument = await platform.documents.create(
          "DGTContract.dgtinvite",
          identity,
          docProperties
        );

        const documentBatch = {
          create: [dgtDocument], // Document(s) to create
        };
        // Sign and submit the document(s)
        await platform.documents.broadcast(documentBatch, identity);
        return dgtDocument;
      };

      submitInvite()
        .then((d) => {
          let submittedDoc = d.toJSON();

          this.setState(
            {
              dgtInvites: [submittedDoc, ...this.state.dgtInvites],
              dgtInvitesForEvents: [
                submittedDoc,
                ...this.state.dgtInvitesForEvents,
              ],
              isLoadingGroups: false,
            },
            () => this.loadIdentityCredits()
          );
        })
        .catch((e) => {
          console.error("Something went wrong:\n", e);
          this.setState({
            isLoadingGroups: false,
            errorGroupsAdd: true, //Needs to add to state and handle
          });
        })
        .finally(() => client.disconnect());
    } // This is the close of the else statment
  };

  editPublicSpaceDoc = () => {};

  handleDeletePublicSpace = (publicSpaceName) => {
    this.setState(
      {
        selectedPublicSpace: publicSpaceName,
      },
      () => this.showModal("DeletePublicSpaceModal")
    );
  };

  deletePublicSpaceDoc = (groupRemove) => {
    this.setState({
      isLoadingGroups: true,
      isGroupShowing: false,
    });

    //create a group to remove array for before display ->
    //Find the groupName of the doc and return the docId -> DONE

    let documentJSON = this.state.dgtInvites.find((invite) => {
      return (
        groupRemove === invite.group && invite.$ownerId === this.state.identity
      );
    });
    console.log(documentJSON);

    //let documentId = document.$id;

    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        this.state.mnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    const deleteDocument = async () => {
      const { platform } = client;
      const identity = this.state.identityRaw;

      const [document] = await client.platform.documents.get(
        "DGTContract.dgtinvite",
        { where: [["$id", "==", documentJSON.$id]] }
      );

      // Sign and submit the document delete transition
      await platform.documents.broadcast({ delete: [document] }, identity);
      return document;
    };

    deleteDocument()
      .then((d) => {
        console.log("Document deleted:\n", d.toJSON());

        let indexToDelete = this.state.dgtInvites.findIndex((invite) => {
          return invite.$id === d.toJSON().$id && invite.dgt === "self";
        });

        let mutableArray = this.state.dgtInvites;
        mutableArray.splice(indexToDelete, 1);

        this.setState({
          dgtInvites: mutableArray,
          dgtInvitesForEvents: mutableArray,
          isLoadingGroups: false,
        });
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        this.setState({
          isLoadingGroups: false,
          //Add Error alert ->
        });
      })
      .finally(() => client.disconnect());
  };

  /*
  * PUBLIC SPACES FUNCTIONS^^^^
                                        ################
   *                                    ###          ###
   *                                    ################
   *                                    ###          
   *                                    ###  
   * 
   *    
   *##       ###    ###
   * ###    ####   ##
   *  ###  ## ## ###
   *   ## ##  ####
   *    ###   ###
   

   */ //WALLET FUNCTIONS

  /*
   *
   *
   * ###      ###    ###
   *  ###    ####   ##
   *   ###  ## ## ###
   *    ## ##  ####
   *     ###   ###
   */

  //WALLET FUNCTIONS

  handleTab_WALLET = (eventKey) => {
    if (eventKey === "Payments")
      this.setState({
        WALLET_whichTab: "Payments",
      });
    else {
      this.setState({
        WALLET_whichTab: "Your Wallet",
      });
    }
  };

  triggerPayButton = () => {
    this.setState({
      WALLET_whichPayType: "Pay",
    });
  };

  triggerRequestButton = () => {
    this.setState({
      WALLET_whichPayType: "Request",
    });
  };

  showAddrConfirmModal_WALLET = (inputAddr, inputNumber) => {
    this.setState(
      {
        WALLET_sendSuccess: false,
        WALLET_sendFailure: false,

        WALLET_amountToSend: Number((inputNumber * 100000000).toFixed(0)),
        WALLET_sendToAddress: inputAddr,
        WALLET_sendToName: "",

        presentModal: "ConfirmAddrPaymentModal",
        isModalShowing: true,
      } //,
      //() => {
      // console.log(this.state.sendToAddress);
      // console.log(this.state.amountToSend);
      //}
    );
  };

  // ^^^^ - PAYMENT REQUEST
  handleSuccessAlert_WALLET = () => {
    this.setState({
      WALLET_sendSuccess: false,
      WALLET_sendMsgSuccess: false,
    });
  };

  handleFailureAlert_WALLET = () => {
    this.setState({
      WALLET_sendFailure: false,
    });
  };

  handleLoginforPostPaymentWallet_WALLET = () => {
    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        this.state.mnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    const retrieveWallet = async () => {
      const account = await client.getWalletAccount();

      console.log(account.getTotalBalance());
      console.log(account);

      this.setState({
        accountBalance: account.getTotalBalance(),
        //accountAddress: account.getUnusedAddress().address,
        accountHistory: account.getTransactionHistory(),
      });

      return account;
    };

    retrieveWallet()
      .then((d) => {
        //console.log("Wallet Account:\n", d);
        this.setState(
          {
            isLoadingWallet: false,
            isLoadingButtons_WALLET: false,
            isLoadingRefresh_WALLET: false,
          },
          () => this.loadIdentityCredits()
        );
      })
      .catch((e) => {
        console.error("Something went wrong getting Wallet:\n", e);
        this.setState({
          isLoadingWallet: false,
          isLoadingButtons_WALLET: false,
          isLoadingRefresh_WALLET: false,
        });
      })
      .finally(() => client.disconnect());
  };

  handleRefresh_WALLET = () => {
    this.setState({
      isLoadingWallet: true,
      isLoadingRefresh_WALLET: true,
      isLoadingButtons_WALLET: true,

      WALLET_sendSuccess: false,
      WALLET_sendFailure: false,
    });

    this.refreshWallet_WALLET();
  };

  refreshWallet_WALLET = () => {
    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        this.state.mnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    const retrieveWallet = async () => {
      const account = await client.getWalletAccount();

      this.setState({
        accountBalance: account.getTotalBalance(),
        //accountAddress: account.getUnusedAddress().address,
        accountHistory: account.getTransactionHistory(),
      });

      return account;
    };

    retrieveWallet()
      .then((d) => {
        //console.log("Wallet Account:\n", d);

        this.setState({
          isLoadingWallet: false,
          isLoadingRefresh_WALLET: false,
          isLoadingButtons_WALLET: false,
        });
      })
      .catch((e) => {
        console.error("Something went wrong RefreshWallet:\n", e);
      })
      .finally(() => client.disconnect());
  };

  //FROM: https://dashpay.github.io/platform/Wallet-library/account/createTransaction/

  sendDashtoAddress_WALLET = () => {
    this.setState({
      isLoadingRefresh_WALLET: true,
      isLoadingButtons_WALLET: true,
      isLoadingWallet: true,
      isLoadingForm_WALLET: true,
    });

    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        this.state.mnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    const payToRecipient = async () => {
      const account = await client.getWalletAccount();

      let dashAmt = this.state.WALLET_amountToSend;
      console.log("sats sent in TX:", dashAmt);
      console.log(typeof dashAmt);

      // let amt = dashAmt.toFixed(0).toString();
      // console.log(amt);
      // console.log(typeof amt);

      const transaction = account.createTransaction({
        recipient: this.state.WALLET_sendToAddress,
        satoshis: dashAmt, //Must be a string!!
      });
      //return transaction;//Use to disable TX
      return account.broadcastTransaction(transaction);
    };

    payToRecipient()
      .then((d) => {
        console.log("Payment TX:\n", d);

        this.setState(
          {
            isLoadingRefresh_WALLET: false,
            isLoadingWallet: false,
            isLoadingButtons_WALLET: false,
            isLoadingForm_WALLET: false,
            WALLET_sendSuccess: true,
          },
          () => this.handleLoginforPostPaymentWallet_WALLET()
        );
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        this.setState({
          isLoadingRefresh_WALLET: false,
          isLoadingWallet: false,
          isLoadingButtons_WALLET: false,
          isLoadingForm_WALLET: false,
          WALLET_sendFailure: true,
        });
      });
    //.finally(() => client.disconnect()); // <- Caused Error -> YES error dont use
  };

  //

  //
  // ^^^ FOR PAYMENT REQUESTS**
  //
  handlePostPayment_WALLET = (txId) => {
    if (this.state.WALLET_messageToSend === "") {
      this.setState(
        {
          isLoadingForm_WALLET: false,
        },
        () => this.handleLoginforPostPaymentWallet_WALLET()
      );
    } else {
      this.submitDGMMessage_WALLET(txId);
    }
  };

  /*
   *WALLET FUNCTIONS^^^^
   *                            ##       ###    ###
   *                             ###    ####   ##
   *                              ###  ## ## ###
   *                               ## ##  ####
   *                                ###   ###
   *
   *   ################
   *   ###          ####
   *   ################
   *   ###          ####
   *   ###           ####
   */

  //REVIEWS FUNCTIONS

  /*
   *    ################
   *          ###
   *          ###
   *          ###
   *          ###
   */

  //TRANSFER FUNCTIONS

  verifyFrontendFeeAndNetworkAndSkipSync = () => {
    // RUN CompDidMount

    //ALREADY SET IN COMPONENT PROPS
    // whichNetwork: import.meta.env.VITE_NETWORK,

    if (this.state.whichNetwork !== "mainnet") {
      this.setState(
        {
          whichNetwork: "testnet",

          // skipSynchronizationBeforeHeight:
          //   this.state.skipSynchronizationBeforeHeightTESTNET,
        } //,() => this.getDSOEveryoneDocs()
      );
    } else {
      // this.getDSOEveryoneDocs();
    }
  };

  loadIdentityCredits = () => {
    console.log("Called loadIdentityCredits");

    this.setState({
      identityInfo: "",
    });

    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));

    const retrieveIdentity = async () => {
      return client.platform.identities.get(this.state.identity); // Your identity ID
    };

    retrieveIdentity()
      .then((d) => {
        //console.log("Identity retrieved:\n", d.toJSON());

        this.setState({
          identityInfo: d.toJSON(),
          identityRaw: d,
        });
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
      })
      .finally(() => client.disconnect());
  };

  render() {
    this.state.mode === "primary"
      ? (document.body.style.backgroundColor = "rgb(280,280,280)")
      : (document.body.style.backgroundColor = "rgb(20,20,20)");

    this.state.mode === "primary"
      ? (document.body.style.color = "black")
      : (document.body.style.color = "white");

    let isLoginComplete =
      this.state.uniqueName !== "" && this.state.uniqueName !== "no name";

    return (
      <>
        <TopNav
          handleMode={this.handleMode}
          mode={this.state.mode}
          showModal={this.showModal}
          whichNetwork={this.state.whichNetwork}
          isLoggedIn={this.state.isLoggedIn}
          toggleTopNav={this.toggleTopNav}
          expandedTopNav={this.state.expandedTopNav}
          selectedDapp={this.state.selectedDapp}
          handleSelectedDapp={this.handleSelectedDapp}
          uniqueName={this.state.uniqueName}
          identityInfo={this.state.identityInfo}
          FrontendFee={this.state.FrontendFee}
          validFrontendFee={this.state.validFrontendFee}
        />

        <Image fluid="true" id="dash-bkgd" src={DashBkgd} alt="Dash Logo" />

        <Container className="g-0">
          <Row className="justify-content-md-center">
            <Col md={9} lg={8} xl={7} xxl={6}>
              {this.state.selectedDapp === "Login" ? (
                <>
                  {!this.state.isLoggedIn ? (
                    <>
                      <LoginForm
                        handleAccountLogin={this.handleAccountLogin}
                        DashMoneyLFKeys={this.state.DashMoneyLFKeys}
                        showModal={this.showModal}
                        mode={this.state.mode}
                      />
                    </>
                  ) : (
                    <></>
                  )}
                  {this.state.isLoggedIn &&
                  !this.state.isIdentityControlShowing ? (
                    <>
                      <AccountLogin
                        isLoginComplete={isLoginComplete}
                        whichNetwork={this.state.whichNetwork}
                        mnemonic={this.state.mnemonic}
                        handleAccountRetry={this.handleAccountRetry}
                        showModal={this.showModal}
                        toggleTopNav={this.toggleTopNav}
                        isLoadingIdentity={this.state.isLoadingIdentity}
                        isLoadingIdInfo={this.state.isLoadingIdInfo}
                        isLoadingName={this.state.isLoadingName}
                        isLoadingAlias={this.state.isLoadingAlias}
                        isLoadingWallet={this.state.isLoadingWallet}
                        identity={this.state.identity}
                        identityRaw={this.state.identityRaw}
                        identityInfo={this.state.identityInfo}
                        uniqueName={this.state.uniqueName}
                        aliasList={this.state.aliasList}
                        accountBalance={this.state.accountBalance}
                        mode={this.state.mode}
                        showIdentityControlPage={this.showIdentityControlPage}
                        identityRegisterCount={this.state.identityRegisterCount}
                      />
                    </>
                  ) : (
                    <></>
                  )}
                  {/* IDENTITY CONTROL PAGE */}
                  {this.state.isLoggedIn &&
                  this.state.isIdentityControlShowing ? (
                    <>
                      <IdentityControlPage
                        withdrawalCredits={this.withdrawalCredits}
                        disableIdentityMasterKey={this.disableIdentityMasterKey}
                        identity={this.state.identity}
                        identityRaw={this.state.identityRaw}
                        identityInfo={this.state.identityInfo}
                        mode={this.state.mode}
                        hideIdentityControlPage={this.hideIdentityControlPage}
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <></>
              )}
            </Col>
          </Row>
        </Container>
        <Container className="g-0">
          {this.state.selectedDapp === "Public Spaces" ? (
            <>
              <PublicSpacesPage
                mnemonic={this.state.mnemonic}
                whichNetwork={this.state.whichNetwork}
                isLoginComplete={isLoginComplete}
                isLoadingPayGroups={this.state.isLoadingPayGroups}
                identity={this.state.identity}
                identityInfo={this.state.identityInfo}
                uniqueName={this.state.uniqueName}
                mode={this.state.mode}
                showModal={this.showModal}
                pullInitialTriggerPAYGROUPS={this.pullInitialTriggerPAYGROUPS}
                isPayGroupsRefreshReady={this.state.isPayGroupsRefreshReady}
                DisplayPayGroupsOrder={this.state.DisplayPayGroupsOrder}
                handlePayGroupsOrderFilter={this.handlePayGroupsOrderFilter}
                handleRefresh_PayGroups={this.handleRefresh_PayGroups}
                accountBalance={this.state.accountBalance}
                accountHistory={this.state.accountHistory}
                handleSelectedDapp={this.handleSelectedDapp}
                YourPayGroupsPubKeyDoc={this.state.YourPayGroupsPubKeyDoc}
                YourPayGroups={this.state.YourPayGroups}
                YourPayGroupsMbrs={this.state.YourPayGroupsMbrs}
                YourPayGroupsNames={this.state.YourPayGroupsNames}
                YourPayGroupsPubKeys={this.state.YourPayGroupsPubKeys}
                decideFinalizeOrGoToPage={this.decideFinalizeOrGoToPage}
              />
            </>
          ) : (
            <></>
          )}

          {this.state.selectedDapp === "Pay Groups" ? (
            <>
              <PayGroupsPage
                mnemonic={this.state.mnemonic}
                whichNetwork={this.state.whichNetwork}
                isLoginComplete={isLoginComplete}
                isLoadingPayGroups={this.state.isLoadingPayGroups}
                identity={this.state.identity}
                identityInfo={this.state.identityInfo}
                uniqueName={this.state.uniqueName}
                mode={this.state.mode}
                showModal={this.showModal}
                pullInitialTriggerPAYGROUPS={this.pullInitialTriggerPAYGROUPS}
                isPayGroupsRefreshReady={this.state.isPayGroupsRefreshReady}
                DisplayPayGroupsOrder={this.state.DisplayPayGroupsOrder}
                handlePayGroupsOrderFilter={this.handlePayGroupsOrderFilter}
                handleRefresh_PayGroups={this.handleRefresh_PayGroups}
                accountBalance={this.state.accountBalance}
                accountHistory={this.state.accountHistory}
                handleSelectedDapp={this.handleSelectedDapp}
                YourPayGroupsPubKeyDoc={this.state.YourPayGroupsPubKeyDoc}
                YourPayGroups={this.state.YourPayGroups}
                YourPayGroupsMbrs={this.state.YourPayGroupsMbrs}
                YourPayGroupsNames={this.state.YourPayGroupsNames}
                YourPayGroupsPubKeys={this.state.YourPayGroupsPubKeys}
                decideFinalizeOrGoToPage={this.decideFinalizeOrGoToPage}
              />
            </>
          ) : (
            <></>
          )}

          {this.state.selectedDapp === "PayGroup" ? (
            <>
              <SelectedPayGroupPage
                isLoadingPayGroups={this.state.isLoadingPayGroups}
                isLoadingPayGroupMsgs={this.state.isLoadingPayGroupMsgs}
                mnemonic={this.state.mnemonic}
                identity={this.state.identity}
                identityInfo={this.state.identityInfo}
                uniqueName={this.state.uniqueName}
                mode={this.state.mode}
                showModal={this.showModal}
                showAddMessageToChatDocModal={this.showAddMessageToChatDocModal}
                showAddLikeToChatDocModal={this.showAddLikeToChatDocModal}
                handleSelectedDapp={this.handleSelectedDapp}
                handlePayGroupMsgsBackArrow={this.handlePayGroupMsgsBackArrow}
                //
                pullInitialTriggerPAYGROUPMSGS={
                  this.pullInitialTriggerPAYGROUPMSGS
                }
                isPayGroupsMsgsRefreshReady={
                  this.state.isPayGroupsMsgsRefreshReady
                }
                //
                decideStartOrNotPayGroupsMsgs={
                  this.decideStartOrNotPayGroupsMsgs
                }
                //
                selectedPayGroupDoc={this.state.selectedPayGroupDoc}
                selectedPayGroupNameDocs={this.state.selectedPayGroupNameDocs}
                selectedPayGroupMbrDocs={this.state.selectedPayGroupMbrDocs}
                selectedPayGroupECDHDocs={this.state.selectedPayGroupECDHDocs}
                selectedPayGroupChatDocs={this.state.selectedPayGroupChatDocs}
                //
              />
            </>
          ) : (
            <></>
          )}

          {this.state.selectedDapp === "PayGroupPmts" ? (
            <>
              <SelectedPayGroupPmts
                isLoadingPayGroups={this.state.isLoadingPayGroups}
                isLoadingPayGroupMsgs={this.state.isLoadingPayGroupMsgs}
                mnemonic={this.state.mnemonic}
                identity={this.state.identity}
                identityInfo={this.state.identityInfo}
                uniqueName={this.state.uniqueName}
                mode={this.state.mode}
                whichNetwork={this.state.whichNetwork}
                showModal={this.showModal}
                // showAddMessageToChatDocModal={this.showAddMessageToChatDocModal}
                handleSelectedDapp={this.handleSelectedDapp}
                //handlePayGroupPmtsBackArrow={this.handlePayGroupPmtsBackArrow}
                YourPGsMultiSigUTXOs={this.state.YourPGsMultiSigUTXOs}
                //
                // pullInitialTriggerPAYGROUPMSGS={
                //   this.pullInitialTriggerPAYGROUPMSGS
                // }
                // isPayGroupsMsgsRefreshReady={
                //   this.state.isPayGroupsMsgsRefreshReady
                // }
                //
                showAcceptMultiSigAcctModal={this.showAcceptMultiSigAcctModal}
                //
                selectedPayGroupDoc={this.state.selectedPayGroupDoc}
                selectedPayGroupNameDocs={this.state.selectedPayGroupNameDocs}
                selectedPayGroupMbrDocs={this.state.selectedPayGroupMbrDocs}
                selectedPayGroupECDHDocs={this.state.selectedPayGroupECDHDocs}
                //selectedPayGroupChatDocs={this.state.selectedPayGroupChatDocs}
                //
              />
            </>
          ) : (
            <></>
          )}

          {this.state.selectedDapp === "PayGroupPmtsCreateMultisig" ? (
            <>
              <SelectedPayGroupPmtsCreateMultisig
                isLoadingPayGroups={this.state.isLoadingPayGroups}
                isLoadingPayGroupMsgs={this.state.isLoadingPayGroupMsgs}
                mnemonic={this.state.mnemonic}
                identity={this.state.identity}
                identityInfo={this.state.identityInfo}
                uniqueName={this.state.uniqueName}
                mode={this.state.mode}
                showModal={this.showModal}
                showConfirmCreateMultiSigAcctModal={
                  this.showConfirmCreateMultiSigAcctModal
                }
                handleSelectedDapp={this.handleSelectedDapp}
                //USE ^^ HERE
                //handlePayGroupPmtsBackArrow={this.handlePayGroupPmtsBackArrow}
                //

                selectedPayGroupDoc={this.state.selectedPayGroupDoc}
                // selectedPayGroupNameDocs={this.state.selectedPayGroupNameDocs}
                // selectedPayGroupMbrDocs={this.state.selectedPayGroupMbrDocs}
                // selectedPayGroupECDHDocs={this.state.selectedPayGroupECDHDocs}
                // selectedPayGroupChatDocs={this.state.selectedPayGroupChatDocs}
                //
              />
            </>
          ) : (
            <></>
          )}

          {this.state.selectedDapp === "CreateJoinPage" ? (
            <>
              <CreateJoinPage
                isLoginComplete={isLoginComplete}
                isLoadingPayGroups={this.state.isLoadingPayGroups}
                identity={this.state.identity}
                identityInfo={this.state.identityInfo}
                uniqueName={this.state.uniqueName}
                mode={this.state.mode}
                //showModal={this.showModal}
                accountBalance={this.state.accountBalance}
                accountHistory={this.state.accountHistory}
                handleSelectedDapp={this.handleSelectedDapp}
                //
                showConfirmJoinPayGroupModal={this.showConfirmJoinPayGroupModal}
                //
                pullInitialTriggerJoinPAYGROUPS={
                  this.pullInitialTriggerJoinPAYGROUPS
                }
                //
                isJoinGroupsRefreshReady={this.state.isJoinGroupsRefreshReady}
                handleRefresh_JoinGroups={this.handleRefresh_JoinGroups}
                //
                YourPayGroups={this.state.YourPayGroups}
                JoinPayGroups={this.state.JoinPayGroups}
                JoinPayGroupsNames={this.state.JoinPayGroupsNames}
                JoinPayGroupsPubKeys={this.state.JoinPayGroupsPubKeys}
              />
            </>
          ) : (
            <></>
          )}

          {this.state.selectedDapp === "Create Pay Group" ? (
            <>
              <CreatePayGroupPage
                isLoginComplete={isLoginComplete}
                isLoading2Party={this.state.isLoading2Party}
                identity={this.state.identity}
                identityInfo={this.state.identityInfo}
                uniqueName={this.state.uniqueName}
                mode={this.state.mode}
                //showModal={this.showModal}

                showConfirmCreatePayGroupModal={
                  this.showConfirmCreatePayGroupModal
                }
                accountBalance={this.state.accountBalance}
                accountHistory={this.state.accountHistory}
                handleSelectedDapp={this.handleSelectedDapp}
              />
            </>
          ) : (
            <></>
          )}

          {this.state.selectedDapp === "2-Party Pay" ? (
            <>
              <TwoPartyPage
                mnemonic={this.state.mnemonic}
                whichNetwork={this.state.whichNetwork}
                isLoginComplete={isLoginComplete}
                isLoading2Party={this.state.isLoading2Party}
                identity={this.state.identity}
                identityInfo={this.state.identityInfo}
                uniqueName={this.state.uniqueName}
                mode={this.state.mode}
                showModal={this.showModal}
                pullInitialTrigger2Party={this.pullInitialTrigger2Party}
                is2PartyRefreshReady={this.state.is2PartyRefreshReady}
                handleRefresh_2Party={this.handleRefresh_2Party}
                accountBalance={this.state.accountBalance}
                accountHistory={this.state.accountHistory}
                DisplayReqsOrPmts={this.state.DisplayReqsOrPmts}
                handleReqsOrPmtsFilter={this.handleReqsOrPmtsFilter}
                handleSelectedDapp={this.handleSelectedDapp}
                Your2PartyPubKey={this.state.Your2PartyPubKey}
                ReqsFromYou={this.state.ReqsFromYou}
                ReqsFromYouPubKeys={this.state.ReqsFromYouPubKeys}
                ReqsFromYouNames={this.state.ReqsFromYouNames}
                ReqsFromYouResponses={this.state.ReqsFromYouResponses}
                ReqsToYou={this.state.ReqsToYou}
                ReqsToYouPubKeys={this.state.ReqsToYouPubKeys}
                ReqsToYouNames={this.state.ReqsToYouNames}
                ReqsToYouResponses={this.state.ReqsToYouResponses}
                show2PartyPayRequestModal={this.show2PartyPayRequestModal}
                showReleaseFundsModal={this.showReleaseFundsModal}
                showRetrieveFundsModal={this.showRetrieveFundsModal}
                showAddMsgToRequestModal={this.showAddMsgToRequestModal}
                showAddMessageToResponseModal={
                  this.showAddMessageToResponseModal
                }
                showRefundFundsModal={this.showRefundFundsModal}
                showWithdrawRefundModal={this.showWithdrawRefundModal}
                alreadySentCreateResponse={this.alreadySentCreateResponse}
              />
            </>
          ) : (
            <></>
          )}

          {this.state.selectedDapp === "2-PartyRequest" ? (
            <>
              <RequestPage
                isLoginComplete={isLoginComplete}
                isLoading2Party={this.state.isLoading2Party}
                identity={this.state.identity}
                identityInfo={this.state.identityInfo}
                uniqueName={this.state.uniqueName}
                mode={this.state.mode}
                //showModal={this.showModal}

                show2PartyRequestModal={this.show2PartyRequestModal}
                accountBalance={this.state.accountBalance}
                accountHistory={this.state.accountHistory}
                handleSelectedDapp={this.handleSelectedDapp}
              />
            </>
          ) : (
            <></>
          )}

          {this.state.selectedDapp === "Wallet" ? (
            <>
              <WalletPage
                WALLET_Login7={this.state.WALLET_Login7} //This is for the enable pay to name control
                isLoginComplete={isLoginComplete}
                WALLET_whichTab={this.state.WALLET_whichTab}
                handleTab_WALLET={this.handleTab_WALLET}
                showModal={this.showModal}
                WALLET_messageToSend={this.state.WALLET_messageToSend}
                sendDashtoName={this.sendDashtoName_WALLET}
                requestDashfromName={this.requestDashfromName_WALLET}
                isModalShowing={this.state.isModalShowing}
                presentModal={this.state.presentModal}
                hideModal={this.hideModal}
                closeTopNav={this.closeTopNav}
                WALLET_sendFailure={this.state.WALLET_sendFailure}
                WALLET_sendSuccess={this.state.WALLET_sendSuccess}
                handleFailureAlert_WALLET={this.handleFailureAlert_WALLET}
                handleSuccessAlert_WALLET={this.handleSuccessAlert_WALLET}
                WALLET_amountToSend={this.state.WALLET_amountToSend}
                WALLET_sendToName={this.state.WALLET_sendToName}
                WALLET_sendToAddress={this.state.WALLET_sendToAddress}
                mnemonic={this.state.mnemonic}
                whichNetwork={this.state.whichNetwork}
                skipSynchronizationBeforeHeight={
                  this.state.skipSynchronizationBeforeHeight
                }
                dgmDocuments={this.state.dgmDocuments}
                isLoadingRefresh_WALLET={this.state.isLoadingRefresh_WALLET}
                isLoadingButtons_WALLET={this.state.isLoadingButtons_WALLET}
                isLoadingWallet={this.state.isLoadingWallet}
                isLoadingForm_WALLET={this.state.isLoadingForm_WALLET}
                mode={this.state.mode}
                accountBalance={this.state.accountBalance}
                accountHistory={this.state.accountHistory} //ADD THIS TO THE LOGIN PROCESS =>
                accountAddress={this.state.accountAddress} //ADD THIS TO THE LOGIN PROCESS =>
                identity={this.state.identity}
                identityInfo={this.state.identityInfo}
                uniqueName={this.state.uniqueName}
                showConfirmModal={this.showConfirmModal_WALLET}
                showRequestModal={this.showRequestModal_WALLET}
                showAddrConfirmModal={this.showAddrConfirmModal_WALLET}
                showPayRequestModal={this.showPayRequestModal_WALLET}
                showRejectReplyReqModal={this.showRejectReplyReqModal_WALLET}
                WALLET_ByYouMsgs={this.state.WALLET_ByYouMsgs}
                WALLET_ByYouNames={this.state.WALLET_ByYouNames}
                WALLET_ByYouThreads={this.state.WALLET_ByYouThreads}
                WALLET_ToYouMsgs={this.state.WALLET_ToYouMsgs}
                WALLET_ToYouNames={this.state.WALLET_ToYouNames}
                WALLET_ToYouThreads={this.state.WALLET_ToYouThreads}
                isLoadingMsgs_WALLET={this.state.isLoadingMsgs_WALLET}
                handleRefresh_WALLET={this.handleRefresh_WALLET}
                whichPayType={this.state.WALLET_whichPayType}
                triggerRequestButton={this.triggerRequestButton}
                triggerPayButton={this.triggerPayButton}
              />
            </>
          ) : (
            <></>
          )}
          <p></p>
          {/* https://stackoverflow.com/questions/37620694/how-to-scroll-to-bottom-in-react */}
          <div
            style={{ float: "left", clear: "both" }}
            ref={(el) => {
              this.messagesEnd = el;
            }}
          ></div>
          <p></p>
        </Container>
        {/* #####    BELOW ARE THE MODALS    #####    */}
        {this.state.isModalShowing &&
        this.state.presentModal === "LogoutModal" ? (
          <LogoutModal
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            handleLogout={this.handleLogout}
            closeTopNav={this.closeTopNav}
          />
        ) : (
          <></>
        )}
        {this.state.isModalShowing &&
        this.state.presentModal === "CreateNewWalletModal" ? (
          <CreateNewWalletModal
            isModalShowing={this.state.isModalShowing}
            whichNetwork={this.state.whichNetwork}
            hideModal={this.hideModal}
            mode={this.state.mode}
            closeTopNav={this.closeTopNav}
          />
        ) : (
          <></>
        )}
        {this.state.isModalShowing &&
        this.state.presentModal === "SendFundsModal" ? (
          <SendFundsModal
            isModalShowing={this.state.isModalShowing}
            accountAddress={this.state.accountAddress}
            whichNetwork={this.state.whichNetwork}
            hideModal={this.hideModal}
            mode={this.state.mode}
            closeTopNav={this.closeTopNav}
          />
        ) : (
          <></>
        )}
        {this.state.isModalShowing &&
        this.state.presentModal === "WalletExplaination" ? (
          <WalletExplaination
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            showModal={this.state.showModal}
          />
        ) : (
          <></>
        )}
        {this.state.isModalShowing &&
        this.state.presentModal === "RegisterIdentityModal" ? (
          <RegisterIdentityModal
            isModalShowing={this.state.isModalShowing}
            registerIdentity={this.registerIdentity}
            hideModal={this.hideModal}
            mode={this.state.mode}
            skipSynchronizationBeforeHeight={
              this.state.skipSynchronizationBeforeHeight
            }
            whichNetwork={this.state.whichNetwork}
            closeTopNav={this.closeTopNav}
          />
        ) : (
          <></>
        )}
        {this.state.isModalShowing &&
        this.state.presentModal === "TopUpIdentityModal" ? (
          <TopUpIdentityModal
            accountBalance={this.state.accountBalance}
            isLoadingWallet={this.state.isLoadingWallet}
            isModalShowing={this.state.isModalShowing}
            whichNetwork={this.state.whichNetwork}
            hideModal={this.hideModal}
            mode={this.state.mode}
            doTopUpIdentity={this.doTopUpIdentity}
            closeTopNav={this.closeTopNav}
          />
        ) : (
          <></>
        )}
        {this.state.isModalShowing &&
        this.state.presentModal === "RegisterNameModal" ? (
          <RegisterNameModal
            triggerNameLoading={this.triggerNameLoading}
            triggerNameNotLoading={this.triggerNameNotLoading}
            handleName={this.handleName}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            identity={this.state.identity}
            identityRaw={this.state.identityRaw}
            mnemonic={this.state.mnemonic}
            whichNetwork={this.state.whichNetwork}
            skipSynchronizationBeforeHeight={
              this.state.skipSynchronizationBeforeHeight
            }
            closeTopNav={this.closeTopNav}
          />
        ) : (
          <></>
        )}
        {/*     ################
         *      ###          ####
         *      ################
         *      ###
         *      ###            */}

        {/* {this.state.isModalShowing &&
        this.state.presentModal === "ComingSoonModal" ? (
          <ComingSoonModal
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            closeTopNav={this.closeTopNav}
          />
        ) : (
          <></>
        )} */}

        {this.state.isModalShowing &&
        this.state.presentModal === "ConfirmCreateMultiSigAcctModal" ? (
          <ConfirmCreateMultiSigAcctModal
            whichNetwork={this.state.whichNetwork}
            uniqueName={this.state.uniqueName}
            multiSigNumOfMbrs={this.state.multiSigNumOfMbrs}
            multiSigLabel={this.state.multiSigLabel}
            editPayGroupMbrDoc4MultiSigAcct={
              this.editPayGroupMbrDoc4MultiSigAcct
            }
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            closeTopNav={this.closeTopNav}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "ConfirmAcceptMultiSigAcctModal" ? (
          <ConfirmAcceptMultiSigAcctModal
            whichNetwork={this.state.whichNetwork}
            uniqueName={this.state.uniqueName}
            multiSigNumOfMbrs={this.state.multiSigNumOfMbrs}
            multiSigLabel={this.state.multiSigLabel}
            editPGMbrDocAcceptMultiSigAcct={this.editPGMbrDocAcceptMultiSigAcct}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            closeTopNav={this.closeTopNav}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "ConfirmAddLikeModal" ? (
          <ConfirmAddLikeModal
            decideMsgNumOrNewDoc4LIKE={this.decideMsgNumOrNewDoc4LIKE}
            messageObjectLiked={this.state.messageObjectLiked}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            closeTopNav={this.closeTopNav}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "ConfirmAddMessageModal" ? (
          <ConfirmAddMessageModal
            decideMsgNumOrNewDoc4MSG={this.decideMsgNumOrNewDoc4MSG}
            messageToAdd={this.state.messageToAdd}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            closeTopNav={this.closeTopNav}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "RegisterPayGroupModal" ? (
          <RegisterPayGroupModal
            RegisterYourPayGroupPubKey={this.RegisterYourPayGroupPubKey}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            closeTopNav={this.closeTopNav}
          />
        ) : (
          <></>
        )}
        {this.state.isModalShowing &&
        this.state.presentModal === "ConfirmCreatePayGroupModal" ? (
          <ConfirmCreatePayGroupModal
            whichNetwork={this.state.whichNetwork}
            uniqueName={this.state.uniqueName}
            newPayGroupNameDocs={this.state.newPayGroupNameDocs}
            newPayGroupECDHDocs={this.state.newPayGroupECDHDocs}
            createPayGroupMbrDoc={this.createPayGroupMbrDoc}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            closeTopNav={this.closeTopNav}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "ConfirmJoinPayGroupModal" ? (
          <ConfirmJoinPayGroupModal
            whichNetwork={this.state.whichNetwork}
            uniqueName={this.state.uniqueName}
            newPayGroupNameDocs={this.state.newPayGroupNameDocs}
            newPayGroupECDHDocs={this.state.newPayGroupECDHDocs}
            joinPayGroupMbrDoc={this.joinPayGroupMbrDoc}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            closeTopNav={this.closeTopNav}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "ConfirmFinalizePayGroupModal" ? (
          <ConfirmFinalizePayGroupModal
            whichNetwork={this.state.whichNetwork}
            uniqueName={this.state.uniqueName}
            newPayGroupNameDocs={this.state.selectedPayGroupNameDocs}
            newPayGroupECDHDocs={this.state.selectedPayGroupECDHDocs}
            editFinalizePayGroupMbrDoc={this.editFinalizePayGroupMbrDoc}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            closeTopNav={this.closeTopNav}
          />
        ) : (
          <></>
        )}

        {/* 
        {this.state.isModalShowing &&
        this.state.presentModal === "HowProxyModal" ? (
          <HowProxyModal
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            showModal={this.state.showModal}
          />
        ) : (
          <></>
        )} */}

        {/*
         *      #############
         *     ###         ###
         *              ####
         *          ####
         *      ####
         *     ###############
         * */}
        {this.state.isModalShowing &&
        this.state.presentModal === "Register2PartyModal" ? (
          <Register2PartyModal
            RegisterYour2PartyPubKey={this.RegisterYour2PartyPubKey}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            closeTopNav={this.closeTopNav}
          />
        ) : (
          <></>
        )}
        {this.state.isModalShowing &&
        this.state.presentModal === "Confirm2PartyRequestModal" ? (
          <Confirm2PartyRequestModal
            whichNetwork={this.state.whichNetwork}
            requestPmtNameDoc={this.state.sendToNameDoc2Party}
            amountToSend={this.state.amountToSend2Party}
            messageToSend={this.state.messageToSend2Party}
            requestDash2PartyPayment={this.requestDash2PartyPayment}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            closeTopNav={this.closeTopNav}
          />
        ) : (
          <></>
        )}
        {this.state.isModalShowing &&
        this.state.presentModal === "AddMsgToRequestModal" ? (
          <AddMsgToRequestModal
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            SelectedReplyNameDoc={this.state.signingToSendToWhomNameDoc}
            editRequestAddMessage={this.editRequestAddMessage}
            closeTopNav={this.closeTopNav}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "AddMessageToResponseModal" ? (
          <AddMessageToResponseModal
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            SelectedReplyNameDoc={this.state.signingToSendToWhomNameDoc}
            editResponseAddMessage={this.editResponseAddMessage}
            closeTopNav={this.closeTopNav}
          />
        ) : (
          <></>
        )}
        {this.state.isModalShowing &&
        this.state.presentModal === "Pay2PartyRequestModal" ? (
          <Pay2PartyRequestModal
            /*
           requestPmtReqDoc2Party: "",
      sendToNameDoc2Party: "",
      requestPubKeyDoc2Party: "",
      amountToSend2Party: 0,
      messageToSend2Party: "",
           */
            sendToName={this.state.sendToNameDoc2Party.label}
            requestPmtNameDoc={this.state.sendToNameDoc2Party}
            amountToSend={this.state.amountToSend2Party}
            whichNetwork={this.state.whichNetwork}
            payDash2PartyRequest={this.payDash2PartyRequest}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
          />
        ) : (
          <></>
        )}
        {this.state.isModalShowing &&
        this.state.presentModal === "Release2PartyModal" ? (
          <Release2PartyModal
            sendToName={this.state.signingToSendToWhomNameDoc.label}
            requestPmtNameDoc={this.state.signingToSendToWhomNameDoc}
            amountToSend={this.state.responseToEdit.amtMatch}
            whichNetwork={this.state.whichNetwork}
            editReleaseFunds={this.editReleaseFunds}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
          />
        ) : (
          <></>
        )}
        {this.state.isModalShowing &&
        this.state.presentModal === "RetrieveFundsModal" ? (
          <RetrieveFundsModal
            sendToName={this.state.signingToSendToWhomNameDoc.label}
            requestPmtNameDoc={this.state.signingToSendToWhomNameDoc}
            amountToSend={this.state.requestToEdit.amt}
            whichNetwork={this.state.whichNetwork}
            payRetrieveFunds={this.payRetrieveFunds}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
          />
        ) : (
          <></>
        )}
        {this.state.isModalShowing &&
        this.state.presentModal === "Refund2PartyModal" ? (
          <Refund2PartyModal
            sendToName={this.state.signingToSendToWhomNameDoc.label}
            requestPmtNameDoc={this.state.signingToSendToWhomNameDoc}
            amountToSend={this.state.requestToEdit.amt}
            whichNetwork={this.state.whichNetwork}
            editRefundFunds={this.editRefundFunds}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
          />
        ) : (
          <></>
        )}
        {this.state.isModalShowing &&
        this.state.presentModal === "WithdrawRefundModal" ? (
          <WithdrawRefundModal
            sendToName={this.state.signingToSendToWhomNameDoc.label}
            requestPmtNameDoc={this.state.signingToSendToWhomNameDoc}
            amountToSend={this.state.requestToUse.amt}
            whichNetwork={this.state.whichNetwork}
            payWithdrawRefund={this.payWithdrawRefund}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
          />
        ) : (
          <></>
        )}

        {/* ##      ###    ###
         *   ###    ####   ##
         *    ###  ## ## ###
         *     ## ##  ####
         *      ###   ### */}
        {this.state.isModalShowing &&
        this.state.presentModal === "ConfirmAddrPaymentModal" ? (
          <ConfirmAddrPaymentModal
            whichNetwork={this.state.whichNetwork}
            sendToAddress={this.state.WALLET_sendToAddress}
            amountToSend={this.state.WALLET_amountToSend}
            sendDashtoAddress={this.sendDashtoAddress_WALLET}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            closeTopNav={this.closeTopNav}
          />
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default App;
