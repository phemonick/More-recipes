export const check = (name, username, email, password, surname) => {
    const strPattern = /\S{3,}@\S{2,}\.\S{2,}/;
    if(name.length < 3 || name.includes(' ')){
        return 'input valid name';
    }
    if(surname.length < 3 || surname.includes(' ')){
        return 'input valid surname'
    }
    if(username.length < 3){
        return 'username must contain atleast 3 strings'

    }
    if(!strPattern.test(email)) {
        return 'Enter a valid email';
    }
    if(password.trim().length ===0 || password.length < 6){
        return 'password must be at least 6 characters';

    }
    return false;
}
   
    