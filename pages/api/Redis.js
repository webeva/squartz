import axios from "axios"
class RedisApi {
    constructor() {
        this.client = null;
    }
    //Create new user
    async joinCommunity(uid, id){
        if(!uid || !id){
            console.log("Cannot join community")
            return
        }
        try{
            const response = axios.post("https://squadz.spatiumstories.xyz/join-new-community", {
                UID: uid, 
                Id: id
            })
            return response
        }catch(error){
            console.log(error)
            return
        }
    }
    async createNewCommunity(id, name, desc, profile, banner, admin, restriction, channels, deso){
        if(!id || !name || !desc || !profile || !banner || !admin || !restriction){
            console.log("Cannot create community")
            return
        }
        try{
            const response = await axios.post("https://squadz.spatiumstories.xyz/create-new-community", {
                UID: id, 
                Name: name, 
                Description: desc, 
                Profile: profile, 
                Banner: banner, 
                Admin: admin, 
                Restriction: restriction,
                Channels: channels,
                Deso: deso
            })
            return response
        }catch(error){
            console.log(error)
            return
        }

    }
    async getUserChat(id){
        
        if(!id){
            console.log("No id")
            return
        }
        try{
            const response = await axios.get(`https://squadz.spatiumstories.xyz/get-user-chats/${id}`)
            return response.data
        }catch(error){
            console.log(error)
            return
        }
    }
    async getCommunity(value){
        if(!value){
            console.log("Value missing")
            return
        }
        try{
            const response = await axios.get(`https://squadz.spatiumstories.xyz/get-community-info/${value}`)
            return response.data
        }catch(error){
            console.log(error)
            return
        }
    }
    async addCommunity(data){
        if(!data){
            console.log("Value is missing")
            return 
        }
        try{
            const response = await axios.post(`https://squadz.spatiumstories.xyz/add-community-list`, data)
            return response.data
        }catch(error){
            console.log(error)
            return
        }
    }
    async createNewUser(name, uid, type, profile){
        let newProfile;
        if(profile){
            newProfile = profile
        }else{
            newProfile = `https://ui-avatars.com/api/?name=${name}?background=random`
        }
        try{
            const response = await axios.post('https://squadz.spatiumstories.xyz/create-new-user/', {
                Name: name,
                UID: uid,
                Type: type,
                CommunityList: "",
                Email: "",
                Profile: newProfile
            })
            return response
        }catch(error){
            return 
        }
       
       
    }

  
    
}
export default RedisApi