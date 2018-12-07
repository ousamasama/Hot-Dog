import APIManager from "./APIManager"
let currentUserId = sessionStorage.getItem("userID");
let currentUserIdParsed = Number(currentUserId)
class MatchesManager extends APIManager {
  getUser(id) {
    return this.get(id)
  }
  getAll() {
    return this.all()
  }
  // removeAndList(unmatchId, getUnmatchedId) {
  //   return this.delete(unmatchId, getUnmatchedId).then(() => this.all())
  // }
  unmatch(id) {
    return this.delete(id).then(() => this.all())
  }
  usersMatches(userId) {
    return fetch(`http://localhost:5002/matches?userId=${currentUserIdParsed}&friendId=${userId}`).then(data => data.json())
  }
  matchedUser(userId) {
    return fetch(`http://localhost:5002/matches?friendId=${currentUserIdParsed}&userId=${userId}`).then(data => data.json())
  }
  addAndList(newMatch, user, userId, friendId, likedBy) {
    let myNewMatch = {
      matchname: newMatch,
      username: user,
      userId: userId,
      friendId: friendId,
      likedBy: likedBy
    }
      return this.post(myNewMatch).then(() => this.all())
  }
}

export default new MatchesManager("matches")