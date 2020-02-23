import React, { Component } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


export default class RegisterUser extends Component {

    constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.classes = this.useStyles.bind(this);
    this.state = {
      username: '',
      password: '',
      name: ''
    }
  }

  useStyles = () =>{ makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));}
  
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

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password,
      name: this.state.name
    }

    console.log(user);

    axios.post('http://localhost:5000/user/register', user)
      .then(res => console.log(res.data));
  }

  render() {
    return (
        <form className={this.classes.root} noValidate autoComplete="off" onSubmit={this.onSubmit}>

        <TextField id="username" label="Username" value={this.state.username}
                onChange={this.onChangeUsername} />
        <br/>   

        <TextField id="password" label="Password" value={this.state.password}
                onChange={this.onChangePassword} />
        <br/>

        <TextField id="name" label="Name" value={this.state.name}
                onChange={this.onChangeName} />
        <br/>

        <Button type="submit" variant="contained" color="primary" onClick={this.onSubmit}>
            Submit
        </Button>

        </form>
    )
  }
}