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
                <div className="editor__row">
                    <label className="editor__label" htmlFor="name">Name</label>
                    <input 
                        className="editor__input blue-container editor__input--row"
                        id="name"
                        name="name"
                        required
                        minLength={1}
                        defaultValue={props.task?.name || ""}
                        key={props.task?.name || "name"}
                    />
                </div>
                
                <div className="editor__row">
                    <label className="editor__label" htmlFor="description">Description</label>
                    <textarea
                        className="editor__input blue-container task-editor__input--textarea editor__input--row"
                        id="description"
                        name="description"
                        defaultValue={props.task?.description || ""}
                        key={props.task?.description || "description"}
                    ></textarea>
                </div>
                
                <div className="editor__row">
                    <label className="editor__label" htmlFor="storyPoint">Story Point</label>
                    <input
                        className="editor__input blue-container task-editor__input--column50"
                        type="number"
                        id="storyPoint"
                        min="0"
                        max="100"
                        name="storyPoint"
                        defaultValue={props.task?.storyPoint || 0}
                        key={props.task?.storyPoint || "storyPoint"}
                    />
                </div>
                
                <div className="editor__row">
                    <label className="editor__label" htmlFor="priorityRating">Priority Rating</label>
                    <select
                        className="editor__input blue-container task-editor__input--column50"
                        id="priorityRating"
                        name="priorityRating"
                        defaultValue={props.task?.priorityRating}
                        key={props.task?.priorityRating || "priorityRating"}
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
                
                <div className="editor__row">
                    <label className="editor__label">Tags</label>
                    <div className="editor__input blue-container">
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
                                        key={props.task?.tags.includes(option).toString() || option}
                                    />
                                    <label className="task-editor__label--checkbox" htmlFor={option}>{option}</label>
                                </div>
                            ))
                        }
                    </div>
                </div>
                
                <div className="editor__row">
                    <label className="editor__label" htmlFor="assignee">Assignee</label>
                    <select
                        className="editor__input blue-container task-editor__input--column50"
                        id="assignee"
                        name="assignee"
                    >
                        <option value="">None</option>
                    </select>
                </div>

                <div className="editor__row">
                    <label className="editor__label" htmlFor="status">Task Status</label>
                    <select
                        className="editor__input blue-container task-editor__input--column50"
                        id="status"
                        name="status"
                        defaultValue={props.task?.status}
                        key={props.task?.status || "status"}
                    >
                        <option value="Not Started">Not Started</option>
                    </select>
                </div>

                <div className="editor__row">
                    <label className="editor__label" htmlFor="stage">Task Stage</label>
                    <select
                        className="editor__input blue-container task-editor__input--column50"
                        id="stage"
                        name="stage"
                        defaultValue={props.task?.stage}
                        key={props.task?.status || "stage"}
                    >
                        <option value="Planning">Planning</option>
                    </select>
                </div>

                <div className="editor__buttons">
                    <button className="editor__button editor__button--blue">Save</button>
                    <button 
                        className="editor__button editor__button--blue"
                        type="button"
                        onClick={props.navigateTo}
                    >
                        Cancel
                    </button>

                    {
                        props.deleteTask 
                        && (
                            <button
                                className="editor__button task-editor__button__delete"
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
