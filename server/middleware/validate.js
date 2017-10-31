export const check = (name, username, email, password, surname) => {
    const strPattern = /\S{3,}@\S{2,}\.\S{2,}/;
    let message = '';
    if(name.length < 3 || name.includes(' ')){
        return 'input valid name';
    }
    if(surname.length < 3 || surname.includes(' ')){
        return({
            message: "input valid name"
        })
    }
    if(username.length < 3){
        return({
            message: "input valid username"
        })
    }
    if(!strPattern.test(email)) {
        return({
            message: "input valid email"
        })
    }
    if(password.trim().length ===0 || password.length < 6){
        return({
            message: "password must be atleast 6 characters"
        })
    }
    return message;
}
   
    