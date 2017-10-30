import user from '../models';
const users = user.User;

class UserCrude {
    static createUser(req, res){
        return users.create({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            surname: req.body.surname,
        })
        .then(user => res.status(201).send(user))
        .catch(error => res.status(400).send(error));
   
    }  
    static signIn(req, res){
       return users
       .find({
        where: {
          username: req.body.username,
          password: req.body.password,
        },
      })
      .then(user => {
          if(!user){
            return res.status(404).send({
                message: 'username Not Found',
              });
          }
          return res.status(200).send({
              message: "user log in successful"
          })
      })
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

