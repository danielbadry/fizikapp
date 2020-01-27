const jwt = require('jsonwebtoken');
module.exports = {


  friendlyName: 'Jwt',


  description: 'Jwt users.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {
    const privateKey = `-----BEGIN RSA PRIVATE KEY-----
    Proc-Type: 4,ENCRYPTED
    DEK-Info: AES-128-CBC,0B5A1780FB0DF155FE12B66B41AAEA43
    
    pjypeE4Dh4bNraSeKNnWTwu+kWBsEsK0v9q5l3j+AdZAMhkGIyuYvgnesACvwvrt
    /w6D8CjqqOMsfGhpAKbaeTYu1t0YHLUtkjaQfJBdp2nQpHLY4U8hlXZYJkJ5MSuO
    AIdFmNghJGzUsxnSfv7/Fp1JAdkNUL39RRVYo3se0kItmCksiFsG8DankOb51D+b
    ian3SAiEhTKAQEq6Lxe4tQ2No6QfgthQIurTXIZhnwd+Tqvs2r1XjuOW1/6P7YlM
    2FqJBo8DMhmuW4P3F811YdOsJpsA5qnHcIWdtY/XmFgM18ZXK/3eARlB4DUahJqv
    3rpSg7tvU9gXek10lm/lp1OoVwFmvobkssmzqpPTNrBi3UMIKQlVH503kYN5KFx1
    tTTULyljPp8z+Xp7szDYVMnup0e7LI2YgVddeKj9dXp935PiiOlTJeKca8j59f7E
    9jaTJeXhgL/Qzz/Kc0dJZuVAQOFbW+aSmCa5wQW47QX5IdE6rSSVoyD6qQB652yR
    FnF33SyuB97dA6XO6YilZL1/YweOsPZhzttedlxvjFQGlfU0DF1YTNQbacUM3GPY
    FrVS+85WQqm70CDT1XmsVrBLIBJMNlqfV3Tycv+uZ5jVhooRGAn0OqXxt9hOI2kX
    kgJ9RrsVzfJFnBsTfLfK86ibim/kdq0inIXXouODvr8TdRuyuho1aJerAjljHwC6
    r39IvBLobA5PGfvXoHY/MwxHG6b4wZrJ+UYHZSN8QIPUXoc/qeNko/N0LeAXGa+l
    Egp3r0O3x+dO9txuWZGuIF8LOF9P3TS5WfNikm0q0TymJY1tZTPtzReg19N3j7v8
    vpiI6hapywSiuQeW2yOdIkuj9wixVvCPjObC3eXQsRjI5SVqAQRjzM2n3demFUuJ
    tFUJi426kHQ740WCV1TTCwjCA0YKb+YAv4hfBhTm/KyLFB1uXSbRcGGjuW0iTa/G
    iNwVYO2CizMGMxnigeIeytFVkbYXzYk8T69sLp3YwHcZkabhPIlAZKbc9cE1CC1Z
    jLqlU8lVfEz2gO5k+LBTFf7+VzLthf0fSvyh5C07+fW/b0OlGts50COmgJpW5+Rm
    UBLa+lk71OGqdMF+CFZa2igM+LWge4NMSp/caldqQEyYAPRKMmD239SEECGVO+ES
    bLIIUf/OY92ND+GT8LAcWwuo5WGFyH23fpkLRG/h4V8SubJlpMTtZ6CVJ82ri3WE
    f3fQATa8LUdMdQcEGKFHBSkijFJgsLaVaxRZT6iePcKz1oM9TnYgFN4ganshemEr
    S/cRqtKVrJhWxc7uhk5PqPKx2M/vQl7dymOzw+MZp1PsLw+eLxYzWcj9q+RRensC
    Zi98yzmkVyNOVVymv4rUw494i5GXjI2uZ8ntgxyXA4m9wySJR29vEUPx2bvr+jN9
    YDGdac9EzbqOantcZ9CErHCenTV4hrFIh73Ll0zbfGL7c0TlSJqoJwCFe4WtRjsw
    2ldwef+g4Ov0aKDlIGGgMCQe+mtc1mMebVfSjN3R7taQ3qkMYcvRdOe7za1wtJxB
    /ED4c147yGfq8YNoDaukLm+0lO+ttSKAf+zP2mzqaaIzWhuQxLCww5s0Zm2e8QhY
    -----END RSA PRIVATE KEY-----
    `;
    const payload = {
      sub: '123', // Unique user id string
      name: 'John Doe', // Full name of user

      // Optional custom user root path
      // 'https://claims.tiny.cloud/drive/root': '/johndoe',

      exp: Math.floor(Date.now() / 1000) + (60 * 10) // 10 minutes expiration
    };

    try {
      const token = jwt.sign(payload, privateKey, { algorithm: 'RS256'});
      this.res.set('content-type', 'application/json');
      this.res.status(200);
      this.res.send(JSON.stringify({
        token: token
      }));
    } catch (e) {
      this.res.status(500);
      this.res.send(e.message);
    }
  }


};
