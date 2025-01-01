import { useNavigate } from '@tanstack/react-router'
import './TaskEditor.css'
import { Task } from './lib/types'

type TaskEditorProps = {
    task?: Task;
    action: (formData: FormData) => Promise<void>;
    navigateTo: () => void;
    deleteTask?: () => void;
}

function TaskEditor(props: TaskEditorProps) {
    const priorityRatingOptions = ["Low", "Medium", "Important", "Urgent"]
    const tagOptions = ["Frontend", "Backend", "API", "Database", "Framework", "Testing", "UI", "UX"]

    return (
        <section className="main__section">
            <form action={props.action}>
                <div className="task-editor__row">
                    <label className="task-editor__label" htmlFor="name">Name</label>
                    <input 
                        className="task-editor__input blue-container task-editor__input--row"
                        id="name"
                        name="name"
                        required
                        minLength={1}
                        defaultValue={props.task?.name || ""}
                    />
                </div>
                
                <div className="task-editor__row">
                    <label className="task-editor__label" htmlFor="description">Description</label>
                    <textarea
                        className="task-editor__input blue-container task-editor__input--textarea task-editor__input--row"
                        id="description"
                        name="description"
                        defaultValue={props.task?.description || ""}
                    ></textarea>
                </div>
                
                <div className="task-editor__row">
                    <label className="task-editor__label" htmlFor="storyPoint">Story Point</label>
                    <input
                        className="task-editor__input blue-container task-editor__input--column"
                        type="number"
                        id="storyPoint"
                        min="0"
                        max="100"
                        name="storyPoint"
                        defaultValue={props.task?.storyPoint || 0}
                    />
                </div>
                
                <div className="task-editor__row">
                    <label className="task-editor__label" htmlFor="priorityRating">Priority Rating</label>
                    <select
                        className="task-editor__input blue-container task-editor__input--column"
                        id="priorityRating"
                        name="priorityRating"
                        defaultValue={props.task?.priorityRating}
                    >
                        {
                            priorityRatingOptions.map(option => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))
                        }
                    </select>
                </div>
                
                <div className="task-editor__row">
                    <label className="task-editor__label">Tags</label>
                    <div className="task-editor__input blue-container">
                        {
                            tagOptions.map(option => (
                                <div className="task-editor__checkbox" key={option}>
                                    <input
                                        type="checkbox"
                                        className="task-editor__input--checkbox"
                                        id={option}
                                        name="tags"
                                        value={option}
                                        defaultChecked={props.task?.tags.includes(option)}
                                    />
                                    <label className="task-editor__label--checkbox" htmlFor={option}>{option}</label>
                                </div>
                            ))
                        }
                    </div>
                </div>
                
                <div className="task-editor__row">
                    <label className="task-editor__label" htmlFor="assignee">Assignee</label>
                    <select
                        className="task-editor__input blue-container task-editor__input--column"
                        id="assignee"
                        name="assignee"
                    >
                        <option value="">None</option>
                    </select>
                </div>

                <div className="task-editor__row">
                    <label className="task-editor__label" htmlFor="status">Task Status</label>
                    <select
                        className="task-editor__input blue-container task-editor__input--column"
                        id="status"
                        name="status"
                    >
                        <option value="Not Started">Not Started</option>
                    </select>
                </div>

                <div className="task-editor__row">
                    <label className="task-editor__label" htmlFor="stage">Task Stage</label>
                    <select
                        className="task-editor__input blue-container task-editor__input--column"
                        id="stage"
                        name="stage"
                    >
                        <option value="Planning">Planning</option>
                    </select>
                </div>

                <div className="task-editor__buttons">
                    <button className="task-editor__button task-editor__button--blue">Save</button>
                    <button 
                        className="task-editor__button task-editor__button--blue"
                        type="button"
                        onClick={props.navigateTo}
                    >
                        Cancel
                    </button>

                    {
                        props.deleteTask 
                        && (
                            <button
                                className="task-editor__button task-editor__button__delete"
                                type="button"
                                onClick={props.deleteTask}
                            >
                                Delete
                            </button>
                        )
                    }
                </div>
            </form>
        </section>
    )
}

export default TaskEditor
