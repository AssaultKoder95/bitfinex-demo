const {
  REQUEST_TYPE,
  STOCK_QTY,
  STOCK_SYMBOLS,
  STOCK_PRICE,
  ORDER_TYPE,
} = require("./constants");

function getClientId() {
  const commandLineArgs = process.argv.slice(2);
  return commandLineArgs[0];
}

function getRandomArrayElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).substring(10);
}

function generateRandomizedRequestPayload() {
  return {
    type: REQUEST_TYPE.SEND_ORDER,
    details: {
      clientId: getClientId(),
      quantity: getRandomArrayElement(STOCK_QTY),
      symbol: getRandomArrayElement(STOCK_SYMBOLS),
      price: getRandomArrayElement(STOCK_PRICE),
      orderType: getRandomArrayElement(ORDER_TYPE),
      tradeId: uid(),
      timestamp: new Date().toISOString(),
    },
  };
}

module.exports = {
  getClientId,
  getRandomArrayElement,
  uid,
  generateRandomizedRequestPayload,
};
