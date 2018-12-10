import APIManager from "./APIManager"

class UserManager extends APIManager {
  addUser(id) {
    return this.post(id)
  }
  getUser(id) {
    return this.get(id)
  }
  getAll() {
    return this.all()
  }
  removeAndList(id) {
    return this.delete(id).then(() => this.all())
  }
  patchAndListUsers(payload, url) {
    return this.patch(payload, url).then(() => this.allSortedFurthest())
  }
  // post(newUser) {
  //   return fetch("http://localhost:5002/users", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(newUser)
  //   }).then(data => data.json())
  // }
}

export default new UserManager("users")