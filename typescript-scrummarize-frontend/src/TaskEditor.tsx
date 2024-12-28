import { useNavigate } from '@tanstack/react-router'
import './TaskEditor.css'

function TaskEditor() {

    const navigate = useNavigate({ from: "/product-backlog/task-editor" })

    const priorityRatingOptions = ["Low", "Medium", "Important", "Urgent"]
    const tagOptions = ["Frontend", "Backend", "API", "Database", "Framework", "Testing", "UI", "UX"]

    return (
        <section className="main__section">
            <div className="task-editor__row">
                <label className="task-editor__label" htmlFor="taskName">Task Name</label>
                <input className="task-editor__input blue-container task-editor__input--row" id="taskName" name="taskName" />
            </div>
            
            <div className="task-editor__row">
                <label className="task-editor__label" htmlFor="description">Description</label>
                <textarea className="task-editor__input blue-container task-editor__input--textarea task-editor__input--row" id="description" name="description"></textarea>
            </div>
            
            <div className="task-editor__row">
                <label className="task-editor__label" htmlFor="storyPoint">Story Point</label>
                <input className="task-editor__input blue-container task-editor__input--column" type="number" id="storyPoint" min="0" max="100" name="storyPoint" />
            </div>
            
            <div className="task-editor__row">
                <label className="task-editor__label" htmlFor="priorityRating">Priority Rating</label>
                <select className="task-editor__input blue-container task-editor__input--column" id="priorityRating" name="priorityRating">
                    {
                        priorityRatingOptions.map(option => <option key={option} value={option}>{option}</option>)
                    }
                </select>
            </div>
            
            <div className="task-editor__row">
                <label className="task-editor__label">Tags</label>
                <div className="task-editor__input blue-container">
                    {
                        tagOptions.map(option => (
                            <div className="task-editor__checkbox" key={option}>
                                <input type="checkbox" className="task-editor__input--checkbox" id={option} name="tags" />
                                <label className="task-editor__label--checkbox" htmlFor={option}>{option}</label>
                            </div>
                        ))
                    }
                </div>
            </div>
            
            <div className="task-editor__row">
                <label className="task-editor__label" htmlFor="assignee">Assignee</label>
                <select className="task-editor__input blue-container task-editor__input--column" id="assignee" name="assignee">
                    <option value="">None</option>
                </select>
            </div>

            <div className="task-editor__row">
                <label className="task-editor__label">Task Status</label>
                <p className="task-editor__input blue-container task-editor__input--column">Not Started</p>
            </div>

            <div className="task-editor__row">
                <label className="task-editor__label">Task Stage</label>
                <p className="task-editor__input blue-container task-editor__input--column">Planning</p>
            </div>

            <div className="task-editor__buttons">
                <button className="task-editor__button">Save</button>
                <button 
                    className="task-editor__button"
                    type="button"
                    onClick={() => navigate({ to: "/product-backlog" })}
                >Cancel</button>
            </div>
        </section>
    )
}

export default TaskEditor
