import React from 'react'

export default function SurveyReview( { onCancel }  /*props*/) {
    return (
        <div>
            <h5>please confirm your entries</h5>
            <button
                className="yellow darken-3 btn-flat"
                onClick={onCancel}
            >
                Back
            </button>
        </div>
    )
}
