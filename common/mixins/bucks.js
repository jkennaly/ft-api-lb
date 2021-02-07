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
  	    console.log('buck order', userId, s)
    		const sql_stmt = 'INSERT INTO orders(user, order_record) VALUES(?, CAST(? AS JSON));'
			const params = [userId, JSON.stringify(s)]
			Model.dataSource.connector.execute(sql_stmt, params, console.log)


  			cb(undefined, s)
  		})
  		.catch(cb)
    
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
}