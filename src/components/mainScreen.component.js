import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import Navbar from "./navbar.component";

const Entry = props => (
    <tr>
      <td>{props.entry.name}</td>
      <td>{props.entry.progress}/{props.entry.totalLength}</td>
      <td>{props.entry.status}</td>
      <td>{props.entry.rating}/10</td>
      <td>
        <a href="#" onClick={() => { props.increment(props.entry._id, props.type) }}>Increment</a> | <a href="#" onClick={() => { props.deleteEntry() }}>Delete</a>
      </td>
    </tr>
)

export default class MainScreen extends Component {
  
    constructor(props) {
        super(props);

        this.deleteEntry = this.deleteEntry.bind(this);
        this.gameList = this.gameList.bind(this);
        this.increment = this.increment.bind(this);

        this.state = {
            gameData: null,
            gameList: null,
            showData: null,
            mangaData: null,
            gameDataFin: false,
            userId: '5e51ea419cd2261c1c4c7e7b',
        };
    }

    componentDidMount() {
        //games
        //this.setState({userId : localStorage.getItem("userId")});
        let games = [];
        let gameBacklog = [];
        let shows = [];
        let showBacklog = [];
        let manga= [];
        let mangaBacklog = [];
        window.setTimeout(() => {}, 3000)
        //games
        axios.get('http://localhost:5000/gamebacklog/' + this.state.userId)
            .then(response => {
                this.setState({gameData: response.data});
                axios.get('http://localhost:5000/game/')
                    .then(response => {
                        this.setState({gameData : response.data});
                        console.log(this.state.gameData);
                        this.setState({gameList: this.gameList()});
                        window.setTimeout(this.setState({gameDataFin: true}), 10000);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
            console.log(error);
        });
        
        axios.get('http://localhost:5000/showbacklog/' + this.state.userId)
            .then(response => {
            showBacklog = response.data;
            axios.get('http://localhost:5000/show/')
                .then(response => {
                    shows = response.data
                    this.setState({showData : showBacklog.map((currentShow) => {
                        let matchingShow = shows.find(show => show._id === currentShow.show_id)
                        currentShow.type = "show";
                        currentShow.units = "Episodes";
                        currentShow.name = matchingShow.name;
                        currentShow.totalLength = matchingShow.total_episodes;
                        return currentShow;
                    })});
                })
                .catch((error) => {
                console.log(error);
                });
            })
            .catch((error) => {
            console.log(error);
            });

        axios.get('http://localhost:5000/mangabacklog/' + this.state.userId)
            .then(response => {
                mangaBacklog = response.data;
                axios.get('http://localhost:5000/manga/')
                    .then(response => {
                        manga = response.data;
                        this.setState({gameData : mangaBacklog.map((currentManga) => {
                            let matchingManga = manga.find(manga => manga._id === currentManga.manga_id)
                            currentManga.type = "manga";
                            currentManga.units = "Chapters";
                            currentManga.name = matchingManga.name;
                            currentManga.totalLength = matchingManga.total_chapters;
                            return currentManga;
                        })});
                    })
                    .catch((error) => {
                    console.log(error);
                    });
            })
            .catch((error) => {
            console.log(error);
            });
    }

    deleteEntry(id, type) {
        axios.delete('http://localhost:5000/'+ type+ 'backlog/'+ this.state.userId + '/' + id)
            .then(response => { console.log(response.data)});

        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }

    increment(id, type){
        axios.post('http://localhost:5000/'+ type+ 'backlog/'+ this.state.userId + '/' + id)
    }

    gameList() {
        return this.state.gameData.map(game => {
            return <Entry entry={game} deleteEntry={() => {this.deleteEntry(game._id, "game")}} key={game._id}/>;
        })
    }
/*
    showList() {
        return this.state.showData.map(show => {
            return <Entry entry={show} deleteEntry={() => {this.deleteEntry(show._id, "show")}} key={show._id}/>;
        })
    }

    mangaList() {
        return this.state.mangaData.map(manga => {
            return <Entry entry={manga} deleteEntry={() => {this.deleteEntry(manga._id, "manga")}} key={manga._id}/>;
        })
    }
*/
    render() {
        if(localStorage.getItem('isAuthed') !== "true"){
            return <Redirect to="/login" />
        }
        else{
            if(this.state.gameDataFin){
                return (
                    <div>
                        <Navbar />
                        {this.state.gameDataFin ?
                        <div>
                            <h3>Games</h3>
                            <table className="table">
                            <thead className="thead-light">
                                <tr>
                                    <th>Name</th>
                                    <th>Progress</th>
                                    <th>Status</th>
                                    <th>Rating</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                { this.gameList() }
                            </tbody>
                            </table>
                            <br />
                        </div> : null}
                    </div>
                );
            }
            else{
                return(<Navbar />);
            }
        }
  }
}