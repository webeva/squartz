import axios from "axios"
class RedisApi {
    constructor() {
        this.client = null;
    }
    //Create new user


    async createNewUser(name, uid, type){
        try{
            const response = await axios.post('https://eva-gun-node.herokuapp.com/create-new-user/', {
                Name: name,
                UID: uid,
                Type: type,
                CommunityList: "",
                Email: ""
            })
            return response
        }catch(error){
            return 
        }
       
       
    }

  
    
}
export default RedisApi