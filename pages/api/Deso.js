/*import Deso from 'deso-protocol';

class DesoApi {
    constructor() {
      this.client = null;
    }
    /* ============ Login ========= 
    async login(request) {
      if (!request) {
        console.log("Request level required");
        return;
      }
      try {
        const response = await this.getClient().identity.login(request);
        return response;
      } catch (error) {
        console.log(error);
        return;
      }
    }
    /* ======== Get NFTs for a user ========= 
    async getNFTForUser(userKey) {
      if (!userKey) {
        console.log("User key required");
        return;
      }
      try {
        const request = {
          UserPublicKeyBase58Check: userKey,
        };
        const response = await this.getClient().nft.getNftsForUser(request);
        return response;
      } catch (error) {
        console.log(error);
        return;
      }
    }
    /* ========= Get NFTs of a certain type (Work in progress) ====== 
    async getNFTOf(user, nftType) {
      if (!user) {
        console.log("No user found");
        return;
      }
      const request = {
        UserPublicKeyBase58Check: user,
      };
      try {
        const response =
          this.getClient().nft.getNftsForUser(request).data.NFTsMap;
        console.log(response);
      } catch (error) {
        return;
      }
    }
    /* ========== Get the messages for a certain chat ====== 
    async getMessages(userkey) {
      if (!userkey) {
        console.log("Key is required");
        return;
      }
  
      const data = {
        NumToFetch: 25,
        PublicKeyBase58Check: userkey,
        FetchAfterPublicKeyBase58Check: "",
        HoldersOnly: false,
        FollowersOnly: false,
        FollowingOnly: false,
        HoldingsOnly: false,
        SortAlgorithm: "time",
      };
      try {
        const result = await this.getClient().social.getMessagesStateless(data);
        return result;
      } catch (error) {
        return null;
      }
    }
    /* ======= Logout ========= 
    async logout(user) {
      const response = await this.getClient().identity.logout(user);
    }
    /* ========== Send a message ======= 
    async sendMessage(userkey, receiver, message, image) {
      let imageSent;
      if (!userkey) {
        console.log("No user key");
        return;
      }
      if (!receiver) {
        console.log("No receiver");
        return;
      }
      if (!message) {
        console.log("No message");
        return;
      }
      if (image) {
        imageSent = image;
      } else {
        imageSent = null;
      }
      try {
        const request = {
          RecipientPublicKeyBase58Check: receiver,
          SenderPublicKeyBase58Check: userkey,
          MessageText: message,
          MinFeeRateNanosPerKB: 1000,
          ExtraData: {
            Img: imageSent,
          },
        };
  
        const response = await this.getClient().social.sendMessage(request);
      } catch (error) {
        console.log(error);
        return;
      }
    }
    /* ======== Get current user's JWT ========== 
    async getJwt(user) {
      if (!user) {
        console.log("User needed");
        return;
      }
      try {
        const request = user;
        const response = await this.getClient().identity.getJwt(request);
        return response;
      } catch (error) {
        console.log(error);
        return;
      }
    }
    /* ======= Upload Image ======== 
    async uploadImage(user, JWT, result) {
      if (!result) {
        console.log("Result needed");
        return;
      }
      const request = {
        UserPublicKeyBase58Check: user,
        JWT: JWT,
        file: result,
      };
      const response = await this.getClient().media.uploadImage(request);
      return response;
    }
    /* ========= Get the username from a public key ======= 
    async getUsername(userkey) {
      if (!userkey) {
        console.log("No user key");
        return;
      }
      try {
        const request = {
          PublicKeysBase58Check: [userkey],
        };
        const response = await this.getClient().user.getUserStateless(request);
  
        return response.UserList[0].ProfileEntryResponse.Username;
      } catch (error) {
        console.log(error);
        return;
      }
    }
    /* ========== Get a public key from the username ======== 
    async getPublicKey(username) {
      if (!username) {
        console.log("No user key");
        return;
      }
      try {
        const request = {
          Username: username.id,
        };
        const response = await this.getClient().user.getSingleProfile(request);
  
        return response.Profile.PublicKeyBase58Check;
      } catch (error) {
        console.log(error);
        return;
      }
    }
  
    /* ======== Get Client ======= 
    getClient() {
      if (this.client) return this.client;
      this.client = new Deso();
      return this.client;
    }
  }
  export default DesoApi;
  */