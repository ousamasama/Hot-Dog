import APIManager from "./APIManager"

class MatchesManager extends APIManager {
  getUser(id) {
    return this.get(id)
  }
  getAll() {
    return this.all()
  }
  removeAndList(oldMatch, user) {
    return this.delete(oldMatch, user).then(() => this.all())
  }
  addAndList(newMatch, user, userId, friendId) {
    let myNewMatch = {
      matchname: newMatch,
      username: user,
      userId: userId,
      friendId: friendId
    }
      return this.post(myNewMatch).then(() => this.all())
  }
}

export default new MatchesManager("matches")