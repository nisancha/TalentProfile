/* Education section */
import React from 'react';
import Cookies from 'js-cookie';
import { default as Countries } from '../../../../../wwwroot/util/jsonFiles/countries.json'
import { ChildSingleInput } from '../Form/SingleInput.jsx';


export default class Education extends React.Component {
    constructor(props) {
        super(props)
        const details = props.details ?
        Object.assign({}, props.details)
        : {
            education: ""
        }
        this.state = {
            showEditSection: false,
            newEducation: details,
        } 
        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveContact = this.saveContact.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this) 
    }
    openEdit() {
        const details = Object.assign({}, this.props.details)
        this.setState({
            showEditSection: true,
            newEducation: details,
        })
    }
    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }
    handleChange(event) {
        const data = Object.assign({}, this.state.newEducation)
        data[event.target.name] = event.target.value
        this.setState({
            newEducation: data
        })
    }
    saveContact() {
        console.log(this.props.componentId)
        console.log(this.state.newEducation)
        const data = Object.assign({}, this.state.newEducation)
        //this.props.controlFunc(this.props.componentId, data)
        this.closeEdit()
    }
    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )   
    }
    renderEdit() {
        return (
            <div className='ui sixteen wide column'>
                <ChildSingleInput
                    inputType="text"
                    label="Education Qualification"
                    name="education"
                    value={this.state.newEducation.education}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your Education Qualifications"
                    errorMessage="Please enter your Qualification"
                />
                <button type="button" className="ui teal button" onClick={this.saveContact}>Save</button>
                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
            </div>
        )
    }
    renderDisplay() {

        let education = this.props.details ? this.props.details.education : ""
    
        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <p>Education Qualaification: {education}</p>
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )
    }
}

