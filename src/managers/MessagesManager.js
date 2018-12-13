import APIManager from "./APIManager"
let currentUserId = sessionStorage.getItem("userID");
let currentUserIdParsed = Number(currentUserId)

class MessagesManager extends APIManager {
  
  getMessages(id) {
    return this.get(id)
  }
  getAll() {
    return this.all()
  }
  messagesFromMe(userId) {
    return fetch(`http://localhost:5002/messages?fromUserId=${currentUserIdParsed}&toUserId=${userId}`).then(data => data.json())
  }
  messagesToMe(userId) {
    return fetch(`http://localhost:5002/messages?toUserId=${currentUserIdParsed}&fromUserId=${userId}`).then(data => data.json())
  }
  removeAndList(id) {
    return this.delete(id).then(() => this.all())
  }
  addAndList(newMessage) {
      return this.post(newMessage).then(() => this.all())
  }
  patchAndListMessages(payload, url) {
    return this.patch(payload, url).then(() => this.allSortedFurthest())
  }
}

export default new MessagesManager("messages")