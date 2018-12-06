import APIManager from "./APIManager"
let currentUserId = sessionStorage.getItem("userID");
let currentUserIdParsed = Number(currentUserId)
class LikesManager extends APIManager {
  getUser(id) {
    return this.get(id)
  }
  getAll() {
    return this.all()
  }
  likedMe() {
    return fetch(`http://localhost:5002/likes?likedUserId=${currentUserIdParsed}`).then(data => data.json())
  }
  myLikes() {
    return fetch(`http://localhost:5002/likes?likedByUserId=${currentUserIdParsed}`).then(data => data.json())
  }
  removeAndList(oldMatch, user) {
    return this.delete(oldMatch, user).then(() => this.all())
  }
  addAndList(yourId, theirId) {
    let myNewLike = {
        likedUserId: yourId,
        likedByUserId: theirId
    }
      return this.post(myNewLike).then(() => this.all())
  }
}

export default new LikesManager("likes")