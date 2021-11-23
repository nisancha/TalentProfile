/* Certificate section */
import React from 'react';
import Cookies from 'js-cookie';
import { Form, Input } from 'semantic-ui-react';


export default class Certificate extends React.Component {

    constructor(props) {
        super(props)
        const details = props.details ?
        Object.assign({}, props.details)
        : {
            certifications: ""
        }
        this.state = {
            showEditSection: false,
            newCertification: details,
        } 
        
        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveCertification = this.saveCertification.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this) 
    }
    openEdit() {
        const details = Object.assign({}, this.props.details)
        this.setState({
            showEditSection: true,
            newCertification: details,
        })
    }
    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }
    handleChange(event) {
        const data = Object.assign({}, this.state.newCertification)
        data[event.target.name] = event.target.value
        this.setState({
            newCertification: data
        })
    }
    saveCertification () {
        var cookies = Cookies.get("talentAuthToken");
        $.ajax({
          url: "http://localhost:60290/profile/profile/updateCertification",
          headers: {
            Authorization: "Bearer " + cookies,
            "Content-Type": "application/json",
          },
          type: "POST",
          data: JSON.stringify(this.state.newCertification),
          success: function (res) {
            console.log(res);
            if (res.success == true) {
              TalentUtil.notification.show(
                "Update certification sucessfully",
                "success",
                null,
                null
              );
            } else {
              TalentUtil.notification.show(
                "Certification did not Update successfully",
                "error",
                null,
                null
              );
            }
          }.bind(this),
          error: function (res, a, b) {
            console.log(res);
            console.log(a);
            console.log(b);
          },
        });
    }

    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )   
    }
    renderEdit() {
        return (
            <div className='ui sixteen wide column'>
                <Form.Field 
                    control={Input} 
                    label='Certification'
                    value={this.state.newCertification.certifications}
                    onChange={this.handleChange}
                    placeholder='Enter Your Certifications'
                />
                <button type="button" className="ui teal button" onClick={this.saveCertification}>Save</button>
                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
            </div>
        )
    }
    renderDisplay() {

        let certifications = this.props.details ? this.props.details.certifications : ""
    
        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <p>Certifications: {certifications}</p>
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )
    }
}

