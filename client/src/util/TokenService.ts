import jwtDecode from "jwt-decode";

export class TokenService<T> {
  constructor(public tokenName: string) { }
  get isValid(): boolean {
    let token = this.getToken()
    if (!token) return false
    else {
      const { exp = 0 } = jwtDecode<{ exp?: Number }>(token);
      return exp < Date.now() / 1000
    }
  }
  getToken() {
    return localStorage.getItem(this.tokenName)
  }
  setToken(token: string | null) {
    if (token) localStorage.setItem(this.tokenName, token)
    else localStorage.removeItem(this.tokenName)
    return token
  }
  getPayload(): T | null {
    try {
      let token = this.getToken()
      if (!token) return null
      const { data } = jwtDecode<{ data: T }>(token)
      return data
    } catch (error) {
      console.log(error)
      return null
    }
  }
}
