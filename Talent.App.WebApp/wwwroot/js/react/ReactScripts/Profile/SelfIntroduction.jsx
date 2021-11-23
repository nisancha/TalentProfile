/* Self introduction section */
import React, { Component } from "react";
import { ChildSingleInput } from "../Form/SingleInput.jsx";
import { TextArea } from "semantic-ui-react";

export default class SelfIntroduction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      summary: props.summary ? props.summary : "",
      description: props.description ? props.description : "",
      isSummaryError: false,
      isDescriptionError: false,
    };

    this.updateDescription = this.updateDescription.bind(this);
    this.saveDescription = this.saveDescription.bind(this);
  }

  updateDescription(event) {
    const key = event.target.name;
    console.log(key);
    this.setState({
      [key]: event.target.value,
    });
  }

  updateDescription(event) {
    this.setState({
      description: event.target.value,
    });
  }

  saveDescription() {
    let isSummaryError = this.state.summary.length === 0 ? true : false;
    let isDescriptionError = this.state.description.length < 150 ? true : false;

    if (isSummaryError || isDescriptionError) {
      this.setState({
        isSummaryError: isSummaryError,
        isDescriptionError: isDescriptionError,
      });
    } else {
      const data = {
        summary: this.state.summary,
        description: this.state.description,
      };
      this.setState(
        {
          isSummaryError: isSummaryError,
          isDescriptionError: isDescriptionError,
        },
        this.props.saveProfileData(data)
      );
    }
  }

  render() {
    return (
        <div className="ui sixteen wide column">
          <ChildSingleInput
            inputType="text"
            name="summary"
            value={this.props.summary ? this.props.summary : ""}
            controlFunc={this.updateDescription}
            maxLength={150}
            placeholder="Please provide a short summary about yourself"
            errorMessage="Summary should not be empty"
            isError={this.state.isSummaryError}
          />
          <p>Summary must be no more than 150 charactors</p>
          <div className="field">
            <TextArea
              name="description"
              placeholder="Please tell us about any hobbies, additional expertise or anything you'd like to add."
              defaultValue={this.props.description ? this.props.description :""}
              onChange={this.updateDescription}
              maxLength={600}
            />
            {this.state.isDescriptionError ? (
              <div className="ui basic red pointing prompt label transition visible">
                Description should not be less than 150 characters
              </div>
            ) : null}
          </div>
          <p>Description much be between 150-600 characters</p>
          <button
            type="button"
            className="ui teal right floated button"
            onClick={this.saveDescription}
          >
            Save
          </button>
        </div>
    );
  }
}