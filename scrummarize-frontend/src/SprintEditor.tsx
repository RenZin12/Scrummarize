import { ChangeEvent, useState } from "react";
import { Sprint } from "./lib/types";
import "./SprintEditor.css"
import { localeDateStringToDate } from "./lib/utils";

type SprintEditorProps = {
    sprint?: Sprint;
    action: (formData: FormData) => Promise<void>;
    navigateTo: () => void;
    deleteSprint?: () => void;
}

type SprintDate = {
  startDate: string,
  endDate: string
}

function SprintEditor(props: SprintEditorProps) {
  const [date, setDate] = useState<SprintDate>({
    startDate: props.sprint?.startDate || "",
    endDate: props.sprint?.endDate || ""
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setDate(prevDate => ({
      ...prevDate,
      [name]: value
    }))
  }

  const getStatus = (date: SprintDate) => {
    const now = new Date()
    let status = "Not Started"

    if (date.startDate && now >= localeDateStringToDate(date.startDate)) {
      status = "Active"
    }
    if (date.endDate && now >= localeDateStringToDate(date.endDate)) {
      status = "Completed"
    }
    
    return status
  }

  const isReadOnly = (status: string | undefined) => {
    return status === "Active" || status === "Completed"
  }

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
            defaultValue={props.sprint?.name || ""}
            readOnly={isReadOnly(props.sprint?.status)}
          />
        </div>

        <div className="editor__row">
          <label className="editor__label" htmlFor="startDate">Start Date</label>
          <input
            className="editor__input blue-container sprint-editor__input--column75"
            type="date"
            id="startDate"
            name="startDate"
            required
            value={date.startDate}
            onChange={handleChange}
            max={date.endDate}
            readOnly={isReadOnly(props.sprint?.status)}
          />
        </div>

        <div className="editor__row">
          <label className="editor__label" htmlFor="endDate">End Date</label>
          <input
            className="editor__input blue-container sprint-editor__input--column75"
            type="date"
            id="endDate"
            name="endDate"
            required
            value={date.endDate}
            onChange={handleChange}
            min={date.startDate}
            readOnly={isReadOnly(props.sprint?.status)}
          />
        </div>

        <div className="editor__row">
          <label className="editor__label">Status</label>
          <p className="editor__input blue-container editor__input--column50">
            {getStatus(date)}
          </p>
        </div>

        <div className="editor__buttons">
          {
            isReadOnly(props.sprint?.status)
            ? (
              <button 
                className="editor__button editor__button--blue editor__button--span2 editor__button--fit"
                type="button"
                onClick={props.navigateTo}
              >
                Back to Sprint Board
              </button>
            )
            : (
              <>
                <button className="editor__button editor__button--blue editor__button--standard">Save</button>
                <button 
                  className="editor__button editor__button--blue editor__button--standard"
                  type="button"
                  onClick={props.navigateTo}
                >
                  Cancel
                </button>
                {
                  props.deleteSprint
                  && (
                    <button
                      className="editor__button editor__button--red editor__button--span2 editor__button--standard"
                      type="button"
                      onClick={props.deleteSprint}
                    >
                      Delete
                    </button>
                  )
                }
              </>
            )
          }
        </div>
      </form>
    </section>
  )
}

export default SprintEditor
