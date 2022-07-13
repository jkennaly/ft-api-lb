'use strict';

const jose = require('node-jose');

module.exports = async function buildKeystore(app, callback) {
  try {
    const keystore = jose.JWK.createKeyStore();
    await keystore.add(process.env.LOCAL_PUBLIC, 'pem')
    app.set('jwks', keystore.toJSON(true));
  } catch (err) {
    console.log("add JWK failed from PEM key:", err.message);
    throw (err);
  }
  callback();
};
