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
  likedMe(loggedInUsersId) {
    return fetch(`http://localhost:5002/likes?likedUserId=${loggedInUsersId}`).then(data => data.json())
  }
  myLikes(loggedInUsersId) {
    return fetch(`http://localhost:5002/likes?likedByUserId=${loggedInUsersId}`).then(data => data.json())
  }
  usersLikes(userId) {
    return fetch(`http://localhost:5002/likes?likedUserId=${currentUserIdParsed}&likedByUserId=${userId}`).then(data => data.json())
  }
  likesUser(userId) {
    return fetch(`http://localhost:5002/likes?likedByUserId=${currentUserIdParsed}&likedUserId=${userId}`).then(data => data.json())
  }
  unlike(id) {
    return this.delete(id).then(() => this.all())
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