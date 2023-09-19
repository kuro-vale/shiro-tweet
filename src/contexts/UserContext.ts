export type UserRequest = {
  Username: string,
  Password: string
}

class UserContext {
  static getCurrentUser() {
    return {
      username: "tmp"
    };
  }
}

export default UserContext;