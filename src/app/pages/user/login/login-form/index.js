import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import { generateLabels } from "../../../../helpers"
import { Link } from "react-router-dom";
const FormItem = Form.Item;

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            type: "password", loading: false,
            icon: "passowrd-hide"
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    showHide(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ type: this.state.type === "text" ? "password" : "text" })
        this.setState({ icon: this.state.icon === "passowrd-hide" ? "passowrd-show" : "passowrd-hide" })
    }
    async handleSubmit(e) {
        e.preventDefault();
        await this.setState({ loading: true })
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;//eslint-disable-line
                if (this.props.form.getFieldValue("email") && reg.test(this.props.form.getFieldValue("email")) === false) {
                    this.props.form.setFields({
                        email: {
                            value: values.email,
                            errors: [new Error(generateLabels("v_email_valid"))],
                        },
                    });
                }
                else {
                    await this.props.onSubmit(values);
                    await this.setState({ loading: false })
                }
            }
            else
                console.error(err);
        });
    }


    render() {
        console.log(this.state.loading, "popopoopoopoppopoopopopoopop")
        const { getFieldDecorator } = this.props.form;
        return (
            <Form className="basic-form" onSubmit={()=>this.handleSubmit}>
                <FormItem label={generateLabels("username") || "User name"}>
                    {getFieldDecorator("email", {
                        rules: [{ required: true, message: generateLabels("v_email") },],
                    })(
                        <Input placeholder={generateLabels("p_username") || "Please enter email ID"} type="text" name="loginMail" />
                    )}
                </FormItem>
                <FormItem label={generateLabels("password") || "Password"}>
                    {getFieldDecorator("password", {
                        rules: [{ required: true, message: generateLabels("v_password") }],
                    })(
                        <Input.Password type={this.state.type} placeholder={generateLabels("p_password") || "Please enter your password"} id="loginPassword" autoComplete="loginPassword" />
                    )}
                </FormItem>
                <FormItem className="mb-3x">
                    <div className="auth-alter">
                        <Link to="/forgot-password">{`${generateLabels("forgot_password") || "forgot password"} ?`}</Link>
                    </div>
                </FormItem>
                <FormItem>
                    <Button style={{background:"#FF69B4"}} id="login" disabled={this.state.loading} loading={this.state.loading} htmlType="submit" type="primary" className="submit-btn btn-has-icon uppercase btn-width-full">{generateLabels("signin")||"Log In"}</Button>
                </FormItem>
            </Form>
        );
    }
}
const Login = Form.create()(LoginForm)

export default Login