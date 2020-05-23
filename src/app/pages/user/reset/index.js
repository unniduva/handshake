import React, { Component } from "react";
import { connect } from "react-redux";
import ResetForm from "./reset-form";
import { Link } from "react-router-dom";
import queryString from "query-string";
import {history} from "../../../store"
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

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
    }
    async handleSubmit(data) {
        const parsed = queryString.parse(this.props.location.search);
        data.fogotpwd_token =  parsed.reset_password_token
	  let res= await this.props.resetPassword(data);
	  if(res&&res.status){
            setTimeout(function(){
 
			
                history.push("/login")
	   
		  }, 800);
		 
	
	
	
        }
    }
   
    render() {
		
        return (
            <div className="auth-bg signup-wrapp">
                <div className="auth-wrapper" elevation={4} >
                    <div className="auth-wrapper-inner">
                        <h1 className="title-block">Reset your password</h1>
                        <div className="auth-form-block">
                            <ResetForm onSubmit={this.handleSubmit} loading={this.props.loading} /> 
                            <div className="bottom-link-block mobile-view">
                                <span className="text-block">Back to</span>
                                <Link to="/login" className="auth-header-logo forward-link">Login</Link>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
