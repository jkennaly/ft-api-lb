// common/mixins/bucks.js

const Stripe = require('stripe');
const stripe = process.env.STRIPE_SECRET && Stripe(process.env.STRIPE_SECRET)

module.exports = function(Model) {
  Model.bucks = function(req, cb) {

    // get current user ID
    const userId = Model.app.get('ftUserId')
    const sql_stmt = 'SELECT * FROM ledger WHERE user=?'
	const params = [userId]
	Model.dataSource.connector.execute(sql_stmt, params, cb)
  }

  Model.buyBucks = function(data, cb) {
    if(!stripe) return cb(undefined, Promise.resolve(true))
    const userId = Model.app.get('ftUserId')
    const price = data.quantity < 10 ? process.env.PRICE_SMALL : process.env.PRICE_LARGE
    const sessionObject = {
      payment_method_types: ['card'],
      line_items: [
        {
          price: price,
          quantity: data.quantity,
        },
      ],
      mode: 'payment',
      success_url: data.successUrl,
      cancel_url: data.cancelUrl
    }
    const session = stripe.checkout.sessions.create(sessionObject)
      .then(s => {
        const userId = Model.app.get('ftUserId')
        //console.log('buck order', userId, s)
        const sql_stmt = 'INSERT INTO orders(user, order_record, quantity, payment_intent) VALUES(?, CAST(? AS JSON), ?, ?);'
      const params = [userId, JSON.stringify(s), data.quantity, s.payment_intent]
      Model.dataSource.connector.execute(sql_stmt, params, err => err && console.log(err))


        cb(undefined, s)
      })
      .catch(cb)
    
  }

  Model.fulfillBucks = function(data, req, cb) {
    //const userId = Model.app.get('ftUserId')
    const endpointSecret = process.env.BUCKS_HOOK_SECRET
    const sig = req.headers['stripe-signature']
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret)

      //const data = JSON.parse(req.body.toString())
    } catch (err) {
      //console.log('fulfillBucks event error', JSON.stringify(err))
      return cb(err);
    }
    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object
      const sql_stmt = 'SELECT quantity, user FROM orders WHERE payment_intent=? ;'
      const params = [session.payment_intent]
      Model.dataSource.connector.execute(sql_stmt, params, (err, results) => {
        if(err) {
          console.log('fulfillBucks load error', err)
          return cb(err)
        }

        const sql_stmt = 'INSERT INTO ledger (user, category, bucks, description) VALUES (?, ?, ?, CAST(? AS JSON)) ;'
        const params = [results[0].user, 'Purchased', results[0].quantity, JSON.stringify(session)]
        Model.dataSource.connector.execute(sql_stmt, params, (err, results) => {
          if(err) {
            console.log('fulfillBucks save error', err)
            return cb(err)
          }
          
          cb()
        })
      })

      //console.log('fulfillBucks', session)
      //Fulfill the purchase...
      //fulfillOrder(session)
    } else return cb()
  }

    Model.remoteMethod('bucks', {
        accepts: [
	        {
		        arg: 'req', type: 'object', http: function (ctx) {
		            return ctx.req;
		        }
	        }
        ],
        http: {
        	path: '/bucks',
        	verb: 'get'
        },
        returns: {arg: 'data', type: 'array'}
    })

    Model.remoteMethod('buyBucks', {
        accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
        http: {
          path: '/bucks',
          verb: 'post'
        },
        returns: {arg: 'data', type: 'object'}
    })

    Model.remoteMethod('fulfillBucks', {
        accepts: [
          { arg: 'data', type: 'object', http: { source: 'body' } },
          { arg: "req", type: "object", http: { source: 'req' } }
        ],
        http: {
          path: '/bucks/fulfill',
          verb: 'post'
        },
        returns: {arg: 'data', type: 'object'}
    })
}