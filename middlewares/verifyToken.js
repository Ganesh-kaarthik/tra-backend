const jwt = require("jsonwebtoken");

const verifyToken = async(req, res, next) => {
    if(!req.headers.authorization) return res.status(403).json({msg: 'Not authorized. No token'})

    if(req.headers.authorization.startsWith("Bearer ")){
      const token = req.headers.authorization.split(' ')[1] 
      jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
        if(err) return res.status(403).json({msg: 'Wrong or expired token.'})
        else {
            req.user = data 
            next()
        }
      })
    } else {
        return res.status(403).json({msg: 'Not authorized. No token'})
    }
}

const verifyTokenAdmin = async(req, res, next) => {
    if(!req.headers.authorization) return res.status(403).json({msg: 'Not authorized. No token'})

    if(req.headers.authorization.startsWith("Bearer ")){
      const token = req.headers.authorization.split(' ')[1] 
    
      jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
        if(err) return res.status(403).json({msg: 'Wrong or expired token.'})
        else {
          console.log(req.user)
            if(!data.isAdmin){ 
                return res.status(403).json({msg: 'You are not the admin.'})
            } 
            req.user = data 
            next()
        }
      })
    } 
    
    else {
        return res.status(403).json({msg: 'Not authorized. No token'})
    }
}

module.exports = {
    verifyToken,
    verifyTokenAdmin,
}