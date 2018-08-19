var Contact = {
    new(name, email, phone) {
        if(!name){
            throw {
                message: "The name parameter can't be empty"
            }
        }
        if(!email){
            throw {
                message: "The email parameter can't be empty"
            }
        }
        if(!phone){
            throw {
                message: "The phone parameter can't be empty"
            }
        }

        return {
            name,
            email,
            phone
        }
    }
}

module.exports = Contact;