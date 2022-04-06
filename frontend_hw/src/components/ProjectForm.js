import React from 'react'

class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'name': '',
            'repo_url': '',
            'users': ''
        }
    }


    handleSubmit(event){
        this.props.newProject(this.state.name, this.state.repo_url, this.state.users)
        event.preventDefault()
    }

    handleUsersChange(event){
        if (!event.target.selectedOptions) {
            return
        }

        let users = []
        for (let i=0; i < event.target.selectedOptions.length; i++) {
            users.push(parseInt(event.target.selectedOptions.item(i).value))
        }

        this.setState({
            'users': users
        })
    }

    handleNameChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return(
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <input
                    type="text"
                    name="name"
                    placeholder="name"
                    onChange={(event) => this.handleNameChange(event)}
                    value={this.state.name}
                />
                <input
                    type="text"
                    name="repo_url"
                    placeholder="repo_url"
                    onChange={(event) => this.handleNameChange(event)}
                    value={this.state.repo_url}
                />
                <select multiple onChange={(event) => this.handleUsersChange(event)}>
                    {this.props.users.map((user) => <option value={user.id}>{user.first_name} {user.last_name}</option>)}
                </select>
                <input type="submit" value="Create" />
            </form>
        )
    }
}

export default ProjectForm
