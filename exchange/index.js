"use strict";

let exchangeRecordStorage = [];

const { PeerRPCServer } = require("grenache-nodejs-http");
const Link = require("grenache-nodejs-link");
const { matchOrder } = require("./orderMatchingSystem");
const { updateOrderBook } = require("../orderbook/update");

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
  link.announce("exchange", service.port, {});
}, 1000);

service.on("request", (rid, key, payload, handler) => {
  const order = payload.details;

  handler.reply(null, {
    message: `Order Received at Exchange for clientId: ${payload.details.clientId}`,
  });

  const [completelyMatchingOrder, partiallyMatchingOrder] = matchOrder(
    exchangeRecordStorage,
    order
  );

  if (!completelyMatchingOrder && !partiallyMatchingOrder) {
    exchangeRecordStorage.push(order);
  }

  if (completelyMatchingOrder.length > 0) {
    markCompleteOrder(completelyMatchingOrder);
    handler.reply(null, {
      message: `Order completed at Exchange for clientId: ${payload.clientId} and orderId: ${payload.tradeId}`,
    });
  }

  if (partiallyMatchingOrder.length > 0) {
    markPartialOrder(partiallyMatchingOrder);
  }
});

function markCompleteOrder(order) {
  exchangeRecordStorage = exchangeRecordStorage.filter(
    (pendingOrder) => pendingOrder.tradeId !== order.tradeId
  );
  console.log("exchangeRecordStorage", exchangeRecordStorage);
  updateOrderBook(order);
}

function markPartialOrder(order) {
  const idx = exchangeRecordStorage.findIndex(
    (pendingOrder) => pendingOrder.tradeId === order.tradeId
  );

  exchangeRecordStorage[idx].quantity -= order.quantity;
}
