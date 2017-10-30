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
    static findUser(req, res){
        res.send('userfound')
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

