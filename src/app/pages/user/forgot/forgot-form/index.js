import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import { Alert } from "antd";
const FormItem = Form.Item;

class ForgotPasswordForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleSubmit = this.handleSubmit.bind(this);
    }
 
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) 
                this.props.onSubmit(values);
            else
                console.error(err);
        });
    }
    render() {

        const { getFieldDecorator } = this.props.form;
        return (
            <Form className="basic-form"  onSubmit={this.handleSubmit}>  
                <FormItem className="mb-3x" label="Enter your email ID">
                    {getFieldDecorator("email", {
                        rules: [
                            { required: true, message: "Please input your Email ID!" },
                            { type: "email", message: "Please input a valid email!" }
                        ],
                        initialValue: this.props.failedUser && this.props.failedUser.email,
                    })(
                        <Input placeholder="Please enter your registered Email ID"/>
                    )}
                </FormItem>    
                <FormItem>
                    <Button disabled={this.props.loading} loading={this.props.loading} htmlType="submit" type="primary" className="submit-btn btn-has-icon uppercase btn-width-full">FORGOT PASSWORD</Button>
                </FormItem>
                <div className="forgot-alert">
                    {this.props.resetAlertMsg ? 
                        <Alert type='info' message={this.props.resetAlertMsg} closable onClose={this.props.resetAlertClose} />  
                        : null}
                </div>        
            </Form> 
        );
    }
}

const forgotPassword = Form.create()(ForgotPasswordForm);
export default forgotPassword



