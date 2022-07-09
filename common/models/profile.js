// profile.js

const gravatar = require('gravatar');

module.exports = function (Profile) {

  Profile.observe('before save', function filterProperties(ctx, next) {
    let oInstance = ctx.instance;

    if (oInstance) oInstance.password = oInstance.password || 'placeholder';

    next();
  });

  Profile.getUserId = function (userData, req, cb) {
    const user = req.user
    const ftUser = user.ftUserId

    const authHeader = req.header('Authorization')
    console.log('getUserId user', user)
    console.log('getUserId userData', userData)
    if (ftUser) return cb(null, ftUser)


    //use the access token to get userinfo

    //if(process.env.NODE_ENV === 'test') console.log('getUserId idToken userData', userData)
    //if(process.env.NODE_ENV === 'test') console.log('getUserId idToken user', user)

    //compare the idToken user_id field and the user sub field to make sure they match
    //console.log(user.sub)

    //call database function to get username from user sub
    //check if sub has an aliased id and return if present
    const sql_stmt = 'SELECT user FROM `user_aliases` WHERE alias=?'
    const params = [user.sub]
    Profile.dataSource.connector.execute(sql_stmt, params, callback);
    function callback(err, result) {
      //console.log('callback called err result', err, result)
      if (err) console.log(err);
      //console.log(result)
      //if there is an error or a valid alias
      if (err || result && result.length) {
        cb(err, result && result.length ? result[0].user : 0)
        return
      }
      const emailVerified = userData.email_verified
      //if(emailVerified) {
      const sql_stmt = 'SELECT id FROM `Users` WHERE email=?'
      const params = [userData.email]
      Profile.dataSource.connector.execute(sql_stmt, params, emailCheckCallback);

    }
    function emailCheckCallback(err, result) {
      //console.log('ecc called', err, result)
      if (err) {
        console.log(err)
        cb(err, 0)
        return
      }
      console.log('emailCheckCallback', err, result)
      //console.log(result)
      if (result.length) {
        //create an alias to the user with the matching email
        const sql_stmt = 'INSERT INTO `user_aliases`(user, alias) VALUES (?, ?)'
        const params = [result[0].id, user.sub]
        Profile.dataSource.connector.execute(sql_stmt, params, err => err ? console.log(err) : undefined);
        cb(err, result[0].id)
        return
      } else createUser(err)
    }
    function createUser(err, result) {
      //console.log('createUser called', err, result)
      const email = userData.email || user.email
      Profile.create({
        email: email,
        username: userData.username || userData.nickname || userData.email || user.nickname,
        picture: userData.picture || user.picture || gravatar.url(email, { protocol: 'https', s: '100' }),
        credits: 1
      }, function (err, result) {
        if (err) {
          console.log('Profile creation failed')
          console.log(err)
          return cb(err)
        }
        const sql_stmt = 'SELECT id FROM `Users` WHERE email=?'
        const params = [userData.email]
        Profile.dataSource.connector.execute(sql_stmt, params, function (err, result) {
          const sql_stmt = 'INSERT INTO `user_aliases`(user, alias) VALUES (?, ?)'
          const params = [result[0].id, user.sub]

          const aliasTable = req.app.get('aliasTable')
          aliasTable[user.sub] = result[0].id
          req.app.set('aliasTable')
          Profile.dataSource.connector.execute(sql_stmt, params, err => err ? console.log(err) : undefined);
          cb(err, result[0].id)

        });
      })
    }
  }

  Profile.remoteMethod('getUserId', {
    accepts: [
      { arg: 'userData', type: 'Object', http: { source: 'body' } },
      { arg: 'req', type: 'object', 'http': { source: 'req' } }
    ],
    returns: { arg: 'id', type: 'number' },
    documented: false,
    http: {
      path: '/getUserId',
      verb: 'post'
    }
  });
};

