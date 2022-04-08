import {Link} from "react-router-dom"

const ProjectItem = ({project, deleteProject}) => {
    return (
        <tr>
            <td>
                {project.name}
            </td>
            <td>
                {project.repo_url}
            </td>
            <td>
                {project.users}
            </td>
            <td>
                <button onClick={()=>deleteProject(project.id)}>Delete</button>
            </td>
        </tr>
    )
}

const ProjectList = ({projects, deleteProject}) => {
    return (
        <table>
            <th>
                Project name
            </th>
            <th>
                Repo url
            </th>
            <th>
                Users
            </th>
            {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject} />)}
        </table>
    )
}

export default ProjectList
