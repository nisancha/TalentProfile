import React, { Component } from 'react';
import { Select, Form, Input } from 'semantic-ui-react';
import Cookies from 'js-cookie';
import { languageLevel } from '../Employer/common.js';


class CreateLanguage extends React.Component {
    constructor(props) {
        super(props);
        const details = props.details ?
        Object.assign({}, props.details)
        : {
            languages: {
                language: "", 
                level: ""
            }
        }
        this.state = { 
            newLanguage: details,
         }
         this.handleChange = this.handleChange.bind(this)
         this.addLanguage = this.addLanguage.bind(this) // https POST request
         this.render = this.render.bind(this)
    }


    handleChange(event) {
        const data = Object.assign({}, this.state.newLanguage)
        data[event.target.name] = event.target.value
        this.setState({
            newLanguage: data
        })
    }

    addLanguage () {
        var cookies = Cookies.get("talentAuthToken");
        $.ajax({
          url: "http://localhost:60290/profile/profile/addLanguage",
          headers: {
            Authorization: "Bearer " + cookies,
            "Content-Type": "application/json",
          },
          type: "POST",
          data: JSON.stringify(this.state.newLanguage),
          success: function (res) {
            console.log(res);
            if (res.success == true) {
              TalentUtil.notification.show(
                "Add Language sucessfully",
                "success",
                null,
                null
              );
            } else {
              TalentUtil.notification.show(
                "Language did not Add successfully",
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
            <div className='ui sixteen wide column'>
                <Form.Group>
                <Form.Field
                control={Input}
                defaultValue={this.state.newLanguage.languages.language}
                onChange={this.handleChange}
                placeholder='Enter Language'
                />
                <Form.Field 
                control={Select}
                options={languageLevel}
                defaultValue={this.state.newLanguage.languages.level}
                onChange={this.handleChange}
                />
                <button type="button" className="ui teal button" onClick={this.addLanguage}>Add</button>
                <button type="button" className="ui button">Cancel</button>
                </Form.Group>
                
                {/* <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button> */}
            </div>
         );
    }
}
 
export default CreateLanguage;