import React, { Component } from "react";
import { connect } from "react-redux";
import ForgotPasswordForm from "./forgot-form";
import { Link } from "react-router-dom";
import { history } from "../../../store";
const mapDispatchToProps = ({ user }) => {
    return {
        ...user
    };
};

const mapStateToProps = ({ user }) => {
    return {
        ...user
    };
};

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(user) {
        return this.props.firebaseForgetPassword(user);
    }
    resetAlertClose() {
        this.props.clearResetAlertMsg();
        history.push("/login")
    }
    render() {
        return (
            <div className="auth-bg">
                <div className="auth-wrapper" elevation={4} >
                    <div className="auth-wrapper-inner">
                        <h1 className="title-block">Forgot Password</h1>
                        <div className="auth-form-block">
                            <ForgotPasswordForm onSubmit={this.handleSubmit} loading={this.props.loading} failedUser={this.props.failedUser}
                                resetAlertMsg={this.props.resetAlertMsg}
                                resetAlertClose={this.resetAlertClose.bind(this)}
                            />
                        </div>
                        <div className="bottom-link-block">
                            <span className="text-block">Back to</span>
                            <Link to="/login" className="auth-header-logo forward-link">Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);