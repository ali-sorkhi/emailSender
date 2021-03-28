import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import SurveyField from "./SurveyField";
import validateEmails from '../../utils/validateEmails';
import formFields from "./formFields";


export default class SurveyForm extends Component{
    renderFields(){

        /* return(
            <div>
                <Field label="Survey Title" type="text" name="title" component={SurveyField}/>
                <Field label="Subject" type="text" name="subject" component={SurveyField}/>
                <Field label="Email body" type="text" name="body" component={SurveyField}/>
                <Field label="Recipients" type="text" name="emails" component={SurveyField}/>
            </div>
        ); */
        // == 
        return _.map(formFields, ({label, name}) => {
            return (
                <Field key={name} component={SurveyField} type="text" label={label} name={name} />
            );
        });
    }

    render(){
        return(
            <div>
                <form onSubmit ={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat white-text">cancel</Link>
                    <button type="submit" className="teal btn-flat right white-text">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );
    }
}

function validate(values){
    // validate should return an error object , if that object is empty it validate is correct
    const errors = {};

    errors.recipients = validateEmails(values.recipients || '');

    /* if (!values.title){
        errors.title='you must provide a title';
    }
    if (!values.subject){
        errors.subject='you must provide a subject';
    }
    if (!values.body){
        errors.body='you must provide a body';
    } */
    // ==
    _.each(formFields,({name})=>{
        if(!values[name]){
            errors[name]= 'You must provide a value';
        }
    });


    return errors;
}

SurveyForm = reduxForm({
    validate, //= validate:validate
    form: 'surveyForm',
    destroyOnUnmount: false, //keeping form values
})(SurveyForm);