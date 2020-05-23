import React, { Component } from "react";
import { connect } from "react-redux";
import SignInForm from "./signup-form";
import { history } from "../../../store";
import { Link } from "react-router-dom";
import { generateLabels } from "../../../helpers"

const mapDispatchToProps = ({ user,studio }) => {
    return {
        ...user,...studio
    };
};

const mapStateToProps = ({ user,studio }) => {
    return {
        ...user,...studio
    };
};
class SignUp extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(user) {
        await this.props.registerUser(user);
        if (this.props.user && this.props.user.email)
            history.push("/")
    }
    componentDidMount() {
        // this.props.onErrorWithoutNotify({message:""})
    }
    render() {

        return (
            <div className="auth-bg">
                <div className="auth-wrapper" elevation={4}>
                    <div className="auth-wrapper-inner auth-wrapper-inner--signup">
                        <h1 className="title-block">{generateLabels("signup_your_account")}</h1>
                        <div className="auth-form-block">
                            <SignInForm
                                onSubmit={this.handleSubmit}
                                loading={this.props.loading} errorMessage={this.props.errorMessage} clearMessage={this.props.clearErrorMessage}
                            />
                        </div>
                        <div className="bottom-link-block">
                            <span className="text-block">{`${generateLabels("already_have_acc")||"Already have an account"} ?`}</span>
                            <Link to="/login" className="auth-header-logo forward-link">{generateLabels("signin")}</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
