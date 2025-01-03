import "./SprintEditor.css"

function SprintEditor() {

  const statusOption = ["Not Started", "Active", "Completed"]

  return (
    <section className="main__section">
      <form>
        <div className="editor__row">
          <label className="editor__label" htmlFor="name">Name</label>
          <input 
            className="editor__input blue-container editor__input--row"
            id="name"
            name="name"
            required
            minLength={1}
          />
        </div>

        <div className="editor__row">
          <label className="editor__label" htmlFor="startDate">Start Date</label>
          <input
            className="editor__input blue-container task-editor__input--column75"
            type="date"
            id="startDate"
            name="startDate"
            required
          />
        </div>

        <div className="editor__row">
          <label className="editor__label" htmlFor="endDate">End Date</label>
          <input
            className="editor__input blue-container task-editor__input--column75"
            type="date"
            id="endDate"
            name="endDate"
            required
          />
        </div>

        <div className="editor__row">
          <label className="editor__label" htmlFor="status">Status</label>
          <select
            className="editor__input blue-container task-editor__input--column50"
            id="status"
            name="status"
          >
            {
              statusOption.map(option => (
                <option key={option} value={option}>
                    {option}
                </option>
              ))
            }
          </select>
        </div>

        <div className="editor__buttons">
          <button className="editor__button editor__button--blue">Save</button>
          <button 
            className="editor__button editor__button--blue"
            type="button"
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  )
}

export default SprintEditor
