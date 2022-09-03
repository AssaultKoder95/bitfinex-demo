"use strict";

const orderbookRecordStorage = [];

const { PeerRPCServer } = require("grenache-nodejs-http");
const Link = require("grenache-nodejs-link");
const { REQUEST_TYPE } = require("../constants");

const link = new Link({
  grape: "http://127.0.0.1:30001",
});
link.start();

const peer = new PeerRPCServer(link, {
  timeout: 300000,
});
peer.init();

const port = 1024 + Math.floor(Math.random() * 1000);
const service = peer.transport("server");
service.listen(port);

setInterval(function () {
  link.announce("orderbook", service.port, {});
}, 1000);

function updateOrderBook(order) {
  orderbookRecordStorage.push(order);
}

service.on("request", (rid, key, payload, handler) => {
  if (payload.type === REQUEST_TYPE.SHOW_ALL_ORDERS) {
    handler.reply(null, { records: orderbookRecordStorage });
  }

  if (payload.type === REQUEST_TYPE.SHOW_ORDERS) {
    const filteredRecords = orderbookRecordStorage.filter(
      (order) => order.clientId === payload.clientId
    );

    handler.reply(null, { records: filteredRecords });
  }

  if (payload.type === REQUEST_TYPE.EXCHANGE_HANDLER) {
    updateOrderBook(payload.details);
  }
});
