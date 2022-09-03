const REQUEST_TYPE = {
  SHOW_ORDERS: "show_orders",
  SEND_ORDER: "send_order",
  SHOW_ALL_ORDERS: "show_all_orders",
  EXCHANGE_HANDLER: "exchange_handler",
};

const ORDER_TYPE = ["BUY", "SELL"];
const STOCK_QTY = [1, 10, 50];
const STOCK_PRICE = [1, 2, 3];
const STOCK_SYMBOLS = ["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA", "META"];

module.exports = {
  REQUEST_TYPE,
  STOCK_SYMBOLS,
  ORDER_TYPE,
  STOCK_QTY,
  STOCK_PRICE,
};
