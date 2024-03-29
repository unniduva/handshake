import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import { generateLabels, getUserLocation } from "../../../../helpers"
import { Link } from "react-router-dom";
const FormItem = Form.Item;

class SignUpForm extends Component {

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
                    var device = await getUserLocation()
                    await this.props.onSubmit({
                        ...values, active: true,
                        last_loggined: {
                            last_loggined_date: new Date(), device_detalis: {
                                app: window.navigator.appVersion, vendor: window.navigator.vendor,
                                ip: device.ip, platform: window.navigator.platform, country_code: device.country,
                                city: device.city, location: { latitude: device.latitude, longitude: device.longitude },
                                org: device.org,
                                postal: device.postal,
                                region: device.region
                            }
                        }
                    });
                    await this.setState({ loading: false })
                }
            }
            else
                console.error(err);
        });
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form className="basic-form" onSubmit={this.handleSubmit}>
                <FormItem label={generateLabels("") || "Name"}>
                    {getFieldDecorator("name", {
                        rules: [{ required: true, message: generateLabels("v_email") },],
                    })(
                        <Input placeholder={generateLabels("") || "Please enter Your name"} type="text" name="name" />
                    )}
                </FormItem>
                <FormItem label={generateLabels("") || "Email"}>
                    {getFieldDecorator("email", {
                        rules: [{ required: true, message: generateLabels("") },],
                    })(
                        <Input placeholder={generateLabels("") || "Please enter Your email"} type="text" name="email" />
                    )}
                </FormItem>
                <FormItem label={generateLabels("password")}>
                    {getFieldDecorator("password", {
                        rules: [{ required: true, message: generateLabels("v_password") }],
                    })(
                        <Input.Password type={this.state.type} placeholder={generateLabels("p_password") || "Please enter your password"} id="password" autoComplete="loginPassword" />
                    )}
                </FormItem>
                <FormItem label={generateLabels("cofirmpassword")}>
                    {getFieldDecorator("cofirmpassword", {
                        rules: [{ required: true, message: generateLabels("") }],
                    })(
                        <Input.Password type={this.state.type} placeholder={generateLabels("") || "Please confirm your password"} id="cofirmpassword" autoComplete="loginPassword" />
                    )}
                </FormItem>
                <FormItem>
                    <Button id="SignUp" disabled={this.state.loading} loading={this.state.loading} htmlType="submit" type="primary" className="submit-btn btn-has-icon uppercase btn-width-full">{generateLabels("signin")}</Button>
                </FormItem>
                <FormItem >
                    <div className="auth-alter">
                        <p style={{ fontSize: 14, marginLeft: "20%" }} className="bottom-link-block">Already have an account? </p>&nbsp;
                        <Link to="/login">{`${generateLabels("")}Login`}</Link>
                    </div>
                </FormItem>
            </Form>
        );
    }
}
const SignUp = Form.create()(SignUpForm)

export default SignUp