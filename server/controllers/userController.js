import user from '../models';
import bcrypt from 'bcryptjs';
import * as validate from '../middleware/validate'
import Auth from '../middleware/auth'
import jwt from 'jsonwebtoken';
const users = user.User;

class UserCrude {
    static createUser(req, res){
        const name = req.body.name; 
        const username = req.body.username;
        const password = req.body.password;
        const email = req.body.email;
        const surname = req.body.surname;

        const validCheck = validate.check(name, username, email, password, surname);
        if(validCheck !== ''){
            return res.status(400).send({
                message: validCheck,
            })
        }
        // Returns one document that satisfies the specified query criteria on the collection
        users
            .findOne({
                attributes: [ 'email', 'username'],
            //    projection parameter
                where: {
                    $or: [
                        {   
                            username:{
                                $ilike: username
                            }
                        },
                        {
                            email: {
                                $ilike: email
                            }
                        }
                    ]
                }
            })
            .then((user) => {
                if(user.username == username){
                    return res.status(404).send('username taken')
                }
                else if(user.email == email){
                    return res.status(404).send('email already taken')
                }
            });

        const data = req.body.password;
        bcrypt.hash(data, 10)
        .then((hash) => {
        return users.create({
            name: req.body.name,
            username: req.body.username,
            password: hash,
            email: req.body.email,
            surname: req.body.surname,
          })
          .then(user => res.status(201).send(user))
        })
         .catch(error => res.status(400).send(error))
        
        
    }  
    static signIn(req, res){
         const data = req.body.password;

       return users
       .find({
        where: {
          username: req.body.username,
        //   password: req.body.password,
        },
      })
      .then(user => {
          if(!user){
            return res.status(404).send({
                message: 'username Not Found',
              });
          }
          bcrypt.compare(data, user.password)
          .then((bool) => {
              if (bool){
                const token = jwt.sign({
                    id: user.id
                },
                process.env.secret,
                    { expiresIn: Math.floor(Date.now() / 1000) + (60 * 60)}
                );
          return res.status(200).send({
              message: "user log in successful",
              token
          })}
          return res.status(404).send({
            message: 'password Not correct',
        })
      })
    })
    .catch(error => res.status(400).send(error))
}
    static getUser(req, res){
        return users
        .all()
        .then(user => res.status(201).send(user));
    }
    static updateUser(req, res){

    }
    static deleteUser(req, res){

    }
}

export default UserCrude;

