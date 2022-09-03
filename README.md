## CRY-PORTO-EXCHANGE

This code sample helps us create an exchange that contains a simple order matching algorithm implementation along with communication based on grenache.

### Initial Setup

The setup process is very simple, clone this repoistory and do `npm install`. This should install all the dependencies.

Our project is dependent on this npm package named `grenache-grape`. In order to install this dependency, you can run the following command `npm i -g grenache-grape`.

### How to run?

In order to run this, we need to perform a couple of steps mentioned below:

1. We need to boot grape servers first, the following commands should help:

```bash
grape --dp 20001 --aph 30001 --bn '127.0.0.1:20002'
grape --dp 20002 --aph 40001 --bn '127.0.0.1:20001'
```

Once you have the servers running, run the following commands:

```bash
# Starts exchange setup
node exchange/manage.js

# Starts orderbook setup
node orderbook/handler.js
```

Once we have all the grape servers, orderbook and exchange code running, we are in a position to place orders to our exchange using client.

In order to run the client, we can use the following command:

```bash
# the numerical value denotes the clientId ( unique identifier )
node client/send_order.js 10
```

At the point of time, you should ideally see something like this in your console/s:
<img width="939" alt="Screenshot 2022-09-03 at 6 28 46 PM" src="https://user-images.githubusercontent.com/6575313/188271622-5e9b0856-628d-48e1-997f-b437942ca31d.png">

### Overview

We have 3 entities as part of our system:

1. Client
2. Exchange
3. Orderbook

These entities have access to certain methods / functions as mentioned below:

1. Client
   - send order
   - show orders ( specific to client )
2. Exchange
   - handle incoming orders

3. Orderbook
   - handle incoming orders
   - Show complete order history
   - updates order book

### Things to take care of

The current system doesn't handle the condition where a small order is placed first and then a large order.
The settlement for the large order can not be done from small order.

### Improvements / Enhancements

I believe I have limited knowledge of the system that I built and there can be a lot more things that we can develop / improve up in the current setup given I get mentorship by peers.

Based on my experience so far, I would like to

1. Add methods for testing the code.
2. Add setup for creating / adding methods in a modular fashion ( CLI based approach )

If anything more comes in my mind, I will be adding that here.
