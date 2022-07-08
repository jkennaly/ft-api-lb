//Source: https://github.com/ahmedelamine/nodejs-dynamoDB/blob/main/lib/ddbDocClient.js
const dotenv = require("dotenv")
dotenv.config()

const { upsertItem, getItem } = require('./aws/crud')

const TABLE_NAME = "festigram.auth.recovery"
const TABLE_KEY = "email"

const storeRecovery = async (email, secret, callback) => {
  const item = {
    email, secret, callback
  }
  const newItem = await upsertItem(item, TABLE_NAME, TABLE_KEY)
  return newItem
}

const validRecovery = async (email, secret) => {

  const { Item } = await getItem(email, TABLE_NAME, TABLE_KEY)
  return Item && Item.secret === secret && Item.callback

}

const clearRecovery = async (email) => {
  const item = {
    email, secret: '', callback: ''
  }
  const newItem = await upsertItem(item, TABLE_NAME, TABLE_KEY)
  return newItem
}



module.exports = { storeRecovery, validRecovery, clearRecovery }