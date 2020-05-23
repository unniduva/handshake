import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import {generateLabels}from  "../../../../helpers"
const FormItem = Form.Item;

class ResetPasswordForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(ev) {
        ev.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err){
              
                this.props.onSubmit(values);
            }
            else
                console.error(err);
        });
    }
	checkPassword = (rule, value, callback) => {
	
	    if (this.props.form.getFieldValue("password")&&value && value !== this.props.form.getFieldValue("password")) {
		  
	        callback(generateLabels("v_repeat_password_valid"));
	    } else {
	        callback();
	    }
	};
    
	render() {
	    const { getFieldDecorator } = this.props.form;
	    return (
	        <Form className="basic-form"  onSubmit={this.handleSubmit}>   
	            <FormItem label="New Password">
	                {getFieldDecorator("password", {
	                    rules: [{ required: true, message: "Please input your new password!" },
	                        { min: 8, message: generateLabels("v_password_valid") },],
	                })(
	                    <Input placeholder="Enter your new password" type="password"/>
	                )}
	            </FormItem>    
	            <FormItem label="Confirm New Password" className="mb-3x">
	                {getFieldDecorator("confirm_password", {
	                    rules: [{ required: true, message: "Please confirm your new password!" },  { validator: this.checkPassword }],
	                })(
	                    <Input placeholder="Please enter confirm password" type="password"/>
	                )}
	            </FormItem>     
	            <Button disabled={this.props.loading} loading={this.props.loading} htmlType="submit" type="primary" className="submit-btn btn-has-icon uppercase btn-width-full">RESET PASSWORD</Button>
	        </Form> 
	    );
	}
}
const resetPassword = Form.create()(ResetPasswordForm);
export default resetPassword;







