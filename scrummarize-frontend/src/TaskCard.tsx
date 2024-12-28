import './TaskCard.css'
import { Task } from './lib/types'

type TaskCardProps = {
    task: Task
}

function TaskCard(props: TaskCardProps) {

    const getPriorityRatingClass = (priorityRating: string) => {
        const defaultClass = "task-card__priority-rating"

        let priorityRatingClass = ""
        switch(priorityRating) {
            case "Low":
                priorityRatingClass = defaultClass + "--low"
                break
            case "Medium":
                priorityRatingClass = defaultClass + "--medium"
                break
            case "Important":
                priorityRatingClass = defaultClass + "--important"
                break
            case "Urgent":
                priorityRatingClass = defaultClass + "--urgent"
                break
            default:
                priorityRatingClass = ""
        }

        return defaultClass + " " + priorityRatingClass
    }

    const getTagClass = (tag: string) => {
        const defaultClass = "task-card__tag"

        let tagClass = ""
        switch(tag) {
            case "Frontend":
                tagClass = defaultClass + "--frontend"
                break
            case "Backend":
                tagClass = defaultClass + "--backend"
                break
            case "API":
                tagClass = defaultClass + "--api"
                break
            case "Database":
                tagClass = defaultClass + "--database"
                break
            case "Framework":
                tagClass = defaultClass + "--framework"
                break
            case "Testing":
                tagClass = defaultClass + "--testing"
                break
            case "UI":
                tagClass = defaultClass + "--ui"
                break
            case "UX":
                tagClass = defaultClass + "--ux"
                break
            default:
                tagClass = ""
        }

        return defaultClass + " " + tagClass
    }

    return (
        <article className="task-card blue-container">
            <h3>{props.task.taskName}</h3>
            <div className="task-card__information">
                <div className="task-card__line">
                    <p className="task-card__story-point">{props.task.storyPoint}</p>
                    <p className={getPriorityRatingClass(props.task.priorityRating)}>{props.task.priorityRating}</p>
                </div>
                <div className="task-card__tags">
                    {
                        props.task.tags.map(tag => <p className={getTagClass(tag)} key={tag}>{tag}</p>)
                    }
                </div>
            </div>
        </article>
    )
}

export default TaskCard
