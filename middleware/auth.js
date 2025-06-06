const authCheck = (req, res, next) => {
    const authHeader = req.headers['auth'];
    if(authHeader != "c3RvcmVhbmRjb25uZWN0IGlzIGJlc3Q=")
    {
        return res.status(403).send({message:'Authentication Failed'})
    }
    next()
}
module.exports = authCheck;