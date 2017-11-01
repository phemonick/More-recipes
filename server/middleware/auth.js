import jwt from 'jsonwebtoken';
export default class Auth {

   
        
        
  
    static verifyToken(req, res, next){
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        if(token){
            const secret = process.env.secret;
            jwt.verify(token, secret, (err, data) =>{
                if(err){
                    return res.json({
                        message: "authentication failed"
                    })
                }
                req.user = data;
                return next();
            })
        }
        return res.status(404).json({
            message: "no token yet",
        })
        return this;

    }

sign(user) {
    this.secret = process.env.secret;
    return jwt.sign(user, this.secret);
  }
}
