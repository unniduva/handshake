import React, { Component } from "react";
import { connect } from "react-redux";
import LoginForm from "./login-form";
import { history } from "../../../store";
import { Link } from "react-router-dom";
import { generateLabels } from "../../../helpers"

const mapDispatchToProps = ({ user, studio }) => {
    return {
        ...user, ...studio
    };
};

const mapStateToProps = ({ user, studio }) => {
    return {
        ...user, ...studio
    };
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidUpdate() {
        if (this.props.user && this.props.user.email)
            if (this.props.location && this.props.location.state && this.props.location.state.prevPath)
                history.push(`${this.props.location.state.prevPath}`)
            else
                history.push("/")
        else history.push("/login")

    }
    async handleSubmit(user) {
        await this.props.login(user)
    }

    handleOpen = () => {
        this.sucessCommonModal.open()
    }

    render() {
        return (
            <div className="auth-bg">
                <div className="auth-wrapper">
                    <div className="auth-wrapper-inner">
                        <h1 className="title-block">{generateLabels("signin")}</h1>
                        <div className="auth-form-block">
                            <LoginForm forgt={
                                this.handleOpen
                            } onSubmit={this.handleSubmit} loading={this.props.loading} errorMessage={this.props.errorMessage} clearMessage={this.props.clearErrorMessage} />
                        </div>
                        <div className="bottom-link-block">
                            <span className="text-block">{`${generateLabels("dont_have_acc")||"don't have an account"} ?`}</span>
                            <Link to="/signup" className="auth-header-logo forward-link">{`${generateLabels("signup_label")}`}</Link>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
