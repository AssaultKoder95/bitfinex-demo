"use strict";

const { PeerRPCClient } = require("grenache-nodejs-http");
const Link = require("grenache-nodejs-link");
const { REQUEST_TYPE } = require("../constants");
const {
  getClientId,
  generateRandomizedRequestPayload,
  uid,
} = require("../utils");

const link = new Link({
  grape: "http://127.0.0.1:30001",
});
link.start();

const peer = new PeerRPCClient(link, {});
peer.init();

const requestPayload = generateRandomizedRequestPayload();

peer.request("exchange", requestPayload, { timeout: 10000 }, (err, data) => {
  if (err) {
    console.error(err);
    process.exit(-1);
  }

  console.log(data);
});

/*
// In case we wish to send a user generated payload, please uncomment & use this code piece.

const userGeneratedRequestPayload = generateRequestPayload({
  quantity: 10,
  symbol: "MSFT",
  price: 1,
  orderType: "SELL",
});

function generateRequestPayload({ quantity, symbol, price, orderType }) {
  return {
    type: REQUEST_TYPE.SEND_ORDER,
    details: {
      clientId: getClientId() + parseInt(Math.random() * 100),
      quantity,
      symbol,
      price,
      orderType,
      tradeId: uid(),
      timestamp: new Date().toISOString(),
    },
  };
}

peer.request(
  "exchange",
  userGeneratedRequestPayload,
  { timeout: 1000000 },
  (err, data) => {
    if (err) {
      console.error(err);
      process.exit(-1);
    }

    console.log(data);
  }
);

*/
