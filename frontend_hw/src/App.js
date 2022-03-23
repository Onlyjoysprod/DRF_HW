import React from 'react'
import logo from './logo.svg';
import './App.css';
import UserList from './components/UserList.js'
import ProjectList from './components/ProjectList.js'
import NoteList from './components/NoteList.js'
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
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
            'notes': [],
            'token': ''
        }
    }

    getData(){
        let headers = this.getHeader()

        axios
            .get('http://localhost:8000/api/users/', {headers})
            .then( response => {
                const users = response.data.results
                this.setState({
                    'users': users
                })
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    'users': []
                })
            })
        axios
            .get('http://localhost:8000/api/projects/', {headers})
            .then( response => {
                const projects = response.data.results

                this.setState({
                    'projects': projects
                })
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    'projects': []
                })
            })
        axios
            .get('http://localhost:8000/api/notes/', {headers})
            .then( response => {
                const notes = response.data.results

                this.setState({
                    'notes': notes
                })
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    'notes': []
                })
            })
    }

    componentDidMount() {
        let token = localStorage.getItem('token')
        this.setState({
            'token': token
        }, this.getData)
    }

    isAuth() {
        return !!this.state.token
    }

    getHeader() {
        if (this.isAuth()) {
            return{
                'Authorization': 'Token ' + this.state.token
            }
        }
        return {}
    }

    getToken(login, password) {
        console.log(login, password)
        axios
            .post('http://localhost:8000/api-auth-token/', {'username': login, 'password': password})
            .then(response => {
                const token = response.data.token
                console.log(token)
                localStorage.setItem('token', token)
                this.setState({
                    'token': token
                }, this.getData)
            })
            .catch(error => console.log(error))
    }

    logout() {
        localStorage.setItem('token', '')
        this.setState({
            'token': ''
        }, this.getData)
    }

    render () {
        return (
            <div>
                <BrowserRouter>
                    <Menu/>
                    <li>
                        { this.isAuth() ? <button onClick={()=>this.logout()} >Logout</button> : <Link to='/login'>Login</Link>}
                    </li>
                    <Routes>
                        <Route exact path='/' element = {<UserList users={this.state.users} />} />
                        <Route exact path='/projects/' element = {<ProjectList projects={this.state.projects} />} />
                        <Route exact path='/notes/' element = {<NoteList notes={this.state.notes} />} />
                        <Route exact path='/login/' element = {<LoginForm getToken={(login, password) => this.getToken(login, password)} />} />
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
