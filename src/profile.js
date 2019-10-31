import React from "react";
import ProfilePic from "./profile-pic";
import Bioedit from "./bioedit";

export default class Profile extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {}

    render() {
        return (
            <React.Fragment>
                <div className="profileStyles">
                    <ProfilePic
                        toggleModal={() => this.props.toggleModal()}
                        first={this.props.first}
                        last={this.props.last}
                        profilepicture={this.props.profilepicture}
                    />
                </div>
                <div className="bioEdition">
                    <Bioedit
                        first={this.props.first}
                        last={this.props.last}
                        bio={this.props.bio}
                        setBio={this.props.setBio}
                    />
                </div>
            </React.Fragment>
        );
    }
}
