const fakeAuth = {
  isAuthenticated: false,
  hasSession() {
    const token = localStorage.getItem('token');
    return token !== null;
  },
  authenticate(cb) {
    this.isAuthenticated = true;
    console.log('authenticate', this.isAuthenticated);
    setTimeout(cb, 100);
  },
  signout(cb) {
    this.isAuthenticated = false;
    console.log('signout', this.isAuthenticated);
    setTimeout(cb, 100);
  }
};

export default fakeAuth;
