import React, { Component } from 'react';
import axios from 'axios';

export default class AccountComponent extends Component {
  constructor(props){
    super(props)

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.onRegister = this.onRegister.bind(this);
    this.onBack = this.onBack.bind(this);
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);

    this.state = {
      isRegistering: false,
      isLoggingIn: false,
      username: '',
      password: '',
      name: '',
    };
  }
  
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }

  onBack(e) {
    this.setState({
      isLoggingIn: false,
      isRegistering: false,
    })
  }

  onLogin(e) {
    this.setState({
      isLoggingIn: true,
      isRegistering: false,
    })
  }

  onRegister(e) {
    this.setState({
      isLoggingIn: false,
      isRegistering: true,
    })
  }

  handleLoginSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password,
    }

    console.log(user);

    axios.post('http://localhost:5000/user/login', user)
      .then(res => console.log(res.data));

    axios.get('http://localhost:5000/user/'+this.state.username)
      .then(res => localStorage.setItem("userId", res.data));

    localStorage.setItem("isAuthed", true);
    localStorage.setItem("userName", this.state.username);
    window.location = '/';
  }

  handleRegisterSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password,
      name: this.state.name,
    }

    console.log(user);

    axios.post('http://localhost:5000/user/register', user)
      .then(res => console.log(res.data));

    axios.get('http://localhost:5000/user/'+this.state.username)
      .then(res => localStorage.setItem("userId", res.data));
      
    localStorage.setItem("isAuthed", true);
    localStorage.setItem("userName", this.state.username);
    window.location = '/';
  }

  render() {
    return (
      <div class="container" style={{width: '30%'}}>
        {!this.state.isLoggingIn || !this.state.isRegistering ? <h2>Welcome!</h2> : null}
        {this.state.isRegistering ? <h3>Create New User</h3> : null}
        {this.state.isLoggingIn ? <h3>Log In</h3>: null}
        <form>
          <div className="form-group">
          {this.state.isLoggingIn || this.state.isRegistering ? 
            <div>
              <label>Username: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                  />
              <label>Password: </label>
              <input  type="password"
                  required
                  className="form-control"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                  />
            </div>
          : null}
          {this.state.isRegistering ?
            <div>
              <label>Name: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                  />
            </div>
          : null}
          </div>
          {!this.state.isRegistering && !this.state.isLoggingIn ? 
          <div className="form-group">
            <input type="submit" value="Log In" className="btn btn-lg btn-primary" onClick={this.onLogin} />
            <input type="submit" value="Register" className="btn btn-lg btn-primary float-right" onClick={this.onRegister} />
          </div>
          : null}

          {this.state.isLoggingIn ? 
          <div className="form-group">
            <input type="submit" value="Log In" className="btn btn-primary" onClick={this.handleLoginSubmit} />
          </div>
          : null}
          
          {this.state.isRegistering ? 
          <div className="form-group">
            <input type="submit" value="Register" className="btn btn-primary" onClick={this.handleRegisterSubmit} />
          </div>
          : null}

          {this.state.isRegistering || this.state.isLoggingIn ? 
          <div className="form-group">
            <input type="submit" value="Go Back" className="btn btn-primary" onClick={this.onBack} />
          </div>
          : null}
        </form>
      </div>
    );
  }
}