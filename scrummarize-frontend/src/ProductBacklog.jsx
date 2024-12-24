import { useState } from 'react'
import './ProductBacklog.css'
import TaskCard from './TaskCard.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faArrowsUpDownLeftRight} from '@fortawesome/free-solid-svg-icons'

function ProductBacklog() {

    const [tasks, setTasks] = useState([
        {   
            id: 1,
            taskName: "Draw a cat",
            storyPoint: 100,
            priorityRating: "Important",
            tags: ["Frontend", "Backend", "API", "Database", "Framework", "Testing", "UI", "UX"]
        }, 
        {   
            id: 2,
            taskName: "Read a book",
            storyPoint: 1,
            priorityRating: "Low",
            tags: ["Frontend"]
        }
    ])

    return (
        <section className="product-backlog">
            <h2>Product Backlog</h2>

            <div className="product-backlog__task-list">
                {
                    tasks.map(task => <TaskCard task={task} key={task.id} />)
                }
            </div>

            <div className="product-backlog__buttons">
                <button className="product-backlog__button">
                    <FontAwesomeIcon icon={faPlus} />
                    <p>Add</p>
                </button>
                <button className="product-backlog__button">
                    <FontAwesomeIcon icon={faArrowsUpDownLeftRight} />
                    <p>Move</p>
                </button>
            </div>
        </section>
    )
}

export default ProductBacklog
