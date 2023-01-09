const check_auth = ( headers ) => { 
    const authorization = headers.authorization || headers.Authorization
    if(!authorization) return false;
    const token = authorization.split(" ")[1]

    if(token === process.env.ADMIN_TOKEN ){
        return true;
    }

    return false


}

module.exports = {check_auth}