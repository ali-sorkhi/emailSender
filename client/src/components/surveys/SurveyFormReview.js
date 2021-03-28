import _ from "lodash";
import React from 'react'
import { connect } from "react-redux";
import formFields from "./formFields";
import * as actions from "../../actions/index";

export default function SurveyReview( { onCancel, formValues, submitSurvey }  /*props*/) {
    
    const reviewFields = _.map(formFields, field=>{
        return(
            <div key={field.name}>
               <label>{field.label}</label>
               <div>
                   {formValues[field.name]}
               </div>
            </div>
        );
    });

    return (
        <div>
            <h5>please confirm your entries</h5>
            {reviewFields}
            <button className="yellow darken-3 btn-flat white-text" onClick={onCancel}>
                Back 
            </button>
            <button className="green btn-flat right white-text" onClick={()=>submitSurvey(formValues)}>
                Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    );
}

//connecting two fun means the return of first shows as props in second:
function mapStateToProps(state){
    
    return {
        formValues: state.form.surveyForm.values
    };
}

SurveyReview = connect(mapStateToProps, actions)(SurveyReview);