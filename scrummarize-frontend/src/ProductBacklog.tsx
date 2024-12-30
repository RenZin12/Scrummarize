import { useState } from 'react'
import './ProductBacklog.css'
import TaskCard from './TaskCard.tsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faArrowsUpDownLeftRight} from '@fortawesome/free-solid-svg-icons'
import { Link } from '@tanstack/react-router'

function ProductBacklog() {

    const [tasks, setTasks] = useState([
        {   
            taskID: 1,
            name: "Draw a cat",
            storyPoint: 100,
            priorityRating: "Important",
            tags: ["Frontend", "Backend", "API", "Database", "Framework", "Testing", "UI", "UX"]
        }, 
        {   
            taskID: 2,
            name: "Read a book",
            storyPoint: 1,
            priorityRating: "Low",
            tags: ["Frontend"]
        }
    ])

    return (
        <section className="main__section">
            <h2>Product Backlog</h2>

            <div className="product-backlog__task-list">
                {
                    tasks.map(task => <TaskCard task={task} key={task.taskID} />)
                }
            </div>

            <div className="product-backlog__buttons">
                <Link className="product-backlog__button" to="/product-backlog/task-editor">
                    <FontAwesomeIcon icon={faPlus} />
                    <p>Add</p>
                </Link>
                <Link className="product-backlog__button">
                    <FontAwesomeIcon icon={faArrowsUpDownLeftRight} />
                    <p>Move</p>
                </Link>
            </div>
        </section>
    )
}

export default ProductBacklog
