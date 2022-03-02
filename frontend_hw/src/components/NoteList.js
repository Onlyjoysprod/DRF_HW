const NoteItem = ({note}) => {
    return (
        <tr>
            <td>
                {note.author}
            </td>
            <td>
                {note.project}
            </td>
            <td>
                {note.text}
            </td>
            <td>
                {note.created_at}
            </td>
            <td>
                {note.updated_at}
            </td>
            <td>
                {note.is_active}
            </td>
        </tr>
    )
}

const NoteList = ({notes}) => {
    return (
        <table>
            <th>
                Note author
            </th>
            <th>
                Project
            </th>
            <th>
                Text
            </th>
            <th>
                Was created
            </th>
            <th>
                Was updated
            </th>
            <th>
                Is active
            </th>
            {notes.map((note) => <NoteItem note={note} />)}
        </table>
    )
}

export default NoteList
