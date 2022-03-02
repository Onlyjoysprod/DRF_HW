import React from 'react'
import logo from './logo.svg';
import './App.css';
import UserList from './components/UserList.js'
import ProjectList from './components/ProjectList.js'
import NoteList from './components/NoteList.js'
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import axios from 'axios'
import {HashRouter, BrowserRouter, Route, Routes, Link, useLocation, Navigate} from 'react-router-dom'


const NotFound = () => {
    let location = useLocation()
    return (
        <div> Page {location.pathname} not found </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'notes': []
        }
    }

    componentDidMount() {
        axios
            .get('http://localhost:8000/api/users/')
            .then( response => {
                const users = response.data.results

                this.setState({
                    'users': users
                })
            })
            .catch(error => console.log(error))
        axios
            .get('http://localhost:8000/api/projects/')
            .then( response => {
                const projects = response.data.results

                this.setState({
                    'projects': projects
                })
            })
            .catch(error => console.log(error))
        axios
            .get('http://localhost:8000/api/notes/')
            .then( response => {
                const notes = response.data.results

                this.setState({
                    'notes': notes
                })
            })
            .catch(error => console.log(error))
    }


    render () {
        return (
            <div>
                <BrowserRouter>
                    <Menu/>

                    <Routes>
                        <Route exact path='/' element = {<UserList users={this.state.users} />} />
                        <Route exact path='/projects/' element = {<ProjectList projects={this.state.projects} />} />
                        <Route exact path='/notes/' element = {<NoteList notes={this.state.notes} />} />
                        <Route exact path='/users/' element = {<Navigate to='/' />} />
                        <Route path='/user/:id' element = {<UserList users={this.state.users} />} />
                        <Route path="*" element = {<NotFound />} />
                    </Routes>

                    <Footer/>
                </BrowserRouter>
            </div>
        )
    }
}


export default App;
