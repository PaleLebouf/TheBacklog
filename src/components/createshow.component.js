import React, { Component } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default class CreateShow extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeTotalEpisodes = this.onChangeTotalEpisodes.bind(this);
    this.onChangeCreatedBy = this.onChangeCreatedBy.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.classes = this.useStyles.bind(this);

    this.state = {
      name: '',
      total_episodes: '',
      created_by: '',
      users: []
    }
  }

  useStyles = () =>{ makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));}

  componentDidMount() {
    axios.get('http://localhost:5000/user/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
            username: response.data[0].username
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }

  onChangeTotalEpisodes(e) {
    this.setState({
      total_episodes: e.target.value
    })
  }

  onChangeCreatedBy(e) {
    this.setState({
      created_by: e.target.value
    })
  }



  onSubmit(e) {
    e.preventDefault();

    const show = {
      name: this.state.name,
      total_episodes: this.state.total_episodes,
      created_by: this.state.created_by,
      
    }

    console.log(show);

    axios.post('http://localhost:5000/show/add', show)
      .then(res => console.log(res.data));
  }

  render() {
    return (

        <form className={this.classes.root} noValidate autoComplete="off" onSubmit={this.onSubmit}>

        <TextField id="Show Name" label="Show Name" value={this.state.name}
                onChange={this.onChangeName} />
        <br/>   

        <TextField id="Total Episodes" label="Total Episodes" value={this.state.total_episodes}
                onChange={this.onChangeTotalEpisodes} />
        <br/>

        <TextField id="Created By" label="Created By" value={this.state.created_by}
                onChange={this.onChangeCreatedBy} />
        <br/>

        <Button type="submit" variant="contained" color="primary" onClick={this.onSubmit}>
            Submit
        </Button>

        </form>
    )}}