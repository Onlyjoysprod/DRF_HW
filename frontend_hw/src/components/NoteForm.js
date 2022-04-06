import React from 'react'

class NoteForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'text': '',
            'project': '',
            'author': ''
        }

    }


    handleSubmit(event){
        this.props.newNote(this.state.text, this.state.project, this.state.author)
        event.preventDefault()
    }

    handleProjectChange(event){
        if (!event.target.selectedOptions) {
            return
        }

        this.setState({
            'project': event.target.value
        })
    }

    handleAuthorChange(event){
        if (!event.target.selectedOptions) {
            return
        }

        this.setState({
            'author': event.target.value
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
                    name="text"
                    placeholder="text"
                    onChange={(event) => this.handleNameChange(event)}
                    value={this.state.text}
                />
                <select onChange={(event) => this.handleProjectChange(event)}>
                    {this.props.projects.map((project) => <option value={project.id}>{project.name}</option>)}
                </select>
                <select onChange={(event) => this.handleAuthorChange(event)}>
                    {this.props.users.map((user) => <option value={user.id}>{user.username}</option>)}
                </select>
                <input type="submit" value="Create" />
            </form>
        )
    }
}

export default NoteForm
