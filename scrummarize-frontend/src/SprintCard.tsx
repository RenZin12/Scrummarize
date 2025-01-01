import { Sprint } from "./lib/types"
import "./SprintCard.css"

type SprintCardProps = {
    sprint: Sprint
}

function SprintCard(props: SprintCardProps) {
  return (
    <article className="blue-container sprint-card">
        <h3>{props.sprint.name}</h3>
        <div className="sprint-card__row sprint-card__row--dates">
            <p className="sprint-card__date">{props.sprint.startDate.toLocaleDateString()}</p>
            <p>-</p>
            <p className="sprint-card__date">{props.sprint.endDate.toLocaleDateString()}</p>
        </div>
        <div className="sprint-card__row sprint-card__row--status">
            <p className="sprint-card__status">{props.sprint.status}</p>
        </div>
    </article>
  )
}

export default SprintCard