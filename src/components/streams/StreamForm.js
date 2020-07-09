import React from 'react';
import { Field, reduxForm } from 'redux-form';
 


class StreamForm extends React.Component {
    renderError({ error, touched }) {
        if (touched && error) {
            return(
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            )
        }
    }
    // helper methods
    renderInput = ({ input, label, meta }) => {    // destructuring {input} out of formProps
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`
        return (
        <div className={className}>
            <label>{ label }</label>
            <input {...input} autoComplete='off'/>
            {this.renderError(meta)}
        </div>

        )
    }

    onSubmit = formValues => {
        this.props.onSubmit(formValues);
    }

    render() {            
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}className="ui form error">
                <Field name="title" component={this.renderInput} label="Enter Title" />
                <Field name="description" component={this.renderInput} label="Enter Description" />
                <button className="ui button primary">Submit</button>
            </form>

        ) 
    }
}
// validation; make sure this is outside of class
const validate = (formValues) => {
    const errors = {};
    
    if(!formValues.title) {
        errors.title = 'Must enter a title'
    }
    if(!formValues.description) {
        errors.description = 'Must enter description'
    }
    return errors;
}

export default reduxForm({
    form: 'stream form', // any name for the form
    validate    // ES6 for validate: validate
})(StreamForm);   // StreamCreate calls reduxForm

