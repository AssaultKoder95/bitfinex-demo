function matchOrder(pendingOrdersArray, order) {
  if (pendingOrdersArray.length < 1) {
    return [false, false];
  }

  const completelyMatchingOrder = findCompleteOrderMatch(
    pendingOrdersArray,
    order
  );

  const partiallyMatchingOrder = findPartialOrderMatch(
    pendingOrdersArray,
    order
  );

  if (completelyMatchingOrder.length > 0) {
    return [completelyMatchingOrder, false];
  }

  if (partiallyMatchingOrder.length > 0) {
    return [false, partiallyMatchingOrder];
  }

  return [false, false];
}

/*
For order to be considered as complete match, we need the following criteria to be true:
  1. client id & order type should be different
  2. quantity, symbol and price should be equal
*/

function findCompleteOrderMatch(pendingOrdersArray, order) {
  const filteredOrder = pendingOrdersArray.filter((pendingOrders) => {
    return (
      pendingOrders.clientId != order.clientId &&
      pendingOrders.orderType != order.orderType &&
      pendingOrders.quantity === order.quantity &&
      pendingOrders.symbol === order.symbol &&
      pendingOrders.price === order.price
    );
  });

  return filteredOrder;
}

/*
For order to be considered as partial match, we need the following criteria to be true:
  1. client id & order type should be different
  2. symbol and price should be equal
  3. order quantity should be less than pending order quantity
*/

function findPartialOrderMatch(pendingOrdersArray, order) {
  const filteredOrder = pendingOrdersArray.filter((pendingOrders) => {
    return (
      pendingOrders.clientId != order.clientId &&
      pendingOrders.orderType != order.orderType &&
      pendingOrders.symbol === order.symbol &&
      pendingOrders.price === order.price &&
      pendingOrders.quantity < order.quantity
    );
  });

  return filteredOrder;
}

module.exports = {
  matchOrder,
};
