"use strict";

const { PeerRPCClient } = require("grenache-nodejs-http");
const Link = require("grenache-nodejs-link");
const { REQUEST_TYPE } = require("../constants");
const { getClientId } = require("../utils");

const link = new Link({
  grape: "http://127.0.0.1:30001",
});
link.start();

const peer = new PeerRPCClient(link, {});
peer.init();

const requestPayload = {
  type: REQUEST_TYPE.SHOW_ORDERS,
  clientId: getClientId(),
};

peer.request("orderbook", requestPayload, { timeout: 10000 }, (err, data) => {
  if (err) {
    console.error(err);
    process.exit(-1);
  }
  console.log(data);
});
