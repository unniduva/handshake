import React, { Component } from "react";
import { Form, Input, Button, DatePicker, Row, Col } from "antd";
import { generateLabels } from "../../../../helpers"
const FormItem = Form.Item;

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "password",
            icon: "passowrd-hide", loading: false,
            phone: null,
            validation: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    showHide(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ type: this.state.type === "text" ? "password" : "text" });
        this.setState({
            icon:
                this.state.icon === "passowrd-hide" ? "passowrd-show" : "passowrd-hide"
        });
    }
    checkPassword = (rule, value, callback) => {

        if (this.props.form.getFieldValue("password") && value && value !== this.props.form.getFieldValue("password")) {

            callback(generateLabels("v_repeat_password_valid"));
        } else {
            callback();
        }
    };


    async handleSubmit(e) {
        e.preventDefault();
        await this.setState({ loading: true })
        this.props.form.validateFields(async (err, values) => {
            var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;//eslint-disable-line
            if (this.props.form.getFieldValue("email") && reg.test(this.props.form.getFieldValue("email")) === false) {
                this.props.form.setFields({
                    email: {
                        value: values.email,
                        errors: [new Error(generateLabels("v_email_valid"))],
                    },
                });
            }
            if (!err) {
                if (!err) {
                    var data = {
                        email: values.email,
                        password: values.password,
                        Fname: values.fname,
                        Lname: values.lname ? values.lname : "",
                        Dob: new Date(values.dob),
                        type: "user"
                    }
                    this.props.onSubmit(data);
                    await this.setState({ loading: false })

                }
            } else console.error(err);
        });
    }
    async componentDidUpdate(newprop) {
        // if (this.props.errorMessage !== newprop.errorMessage)
        //     if (this.props.errorMessage === "unique_email_required") {
        //         this.props.form.setFields({
        //             email: {
        //                 errors: [new Error(generateLabels("unique_email_required"))],
        //             },
        //         });
        //         this.props.clearMessage()
        //     }
    }
    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Form className="basic-form" onSubmit={this.handleSubmit}>
                <Row gutter={20} type="flex">
                    <Col xs={24} sm={12}>
                        <FormItem label={generateLabels("firstname") || "First name"}>
                            {getFieldDecorator("fname", {
                                rules: [{ required: true, message: generateLabels("p_firstname") || "Enter your first name" },]
                            })(
                                <Input
                                    placeholder={generateLabels("p_firstname") || "Enter first name"}
                                    type="text"
                                    name="loginMail"
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={12}>
                        <FormItem label={generateLabels("lastname") || "Last name"}>
                            {getFieldDecorator("lname", {
                                rules: [{ required: false, message: generateLabels("p_lastname") },]
                            })(
                                <Input
                                    placeholder={generateLabels("p_lastname") || "Enter last name"}
                                    type="text"
                                    name="loginMail"
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={12}>
                        <FormItem label={`${generateLabels("v_email") || "Email"}`}>
                            {getFieldDecorator("email", {
                                rules: [{ required: true, message: generateLabels("v_email") || "Please enter your Email ID" },]
                            })(
                                <Input
                                    placeholder={generateLabels("v_email") || "Enter Email"}
                                    type="text"
                                    name="loginMail"
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Form.Item label={generateLabels("dob") || "Date of Birth"}>
                            {getFieldDecorator("dob", {
                                rules: [{ type: "object", required: true, message: generateLabels("dob") || "Please select your date of birth!" }],
                            })(<DatePicker placeholder={generateLabels("select_date") || "Select date"} />)}
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <FormItem label="Password">
                            {getFieldDecorator("password", {
                                rules: [{ required: true, message: generateLabels("v_password") || "Please enter your password" },
                                { min: 8, message: generateLabels("v_password") },]
                            })(
                                <Input.Password
                                    className="input-field"
                                    type={this.state.type}
                                    placeholder={generateLabels("v_password") || "Please enter your password"}
                                    id="loginPassword"
                                    autoComplete="password"
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={12}>
                        <FormItem label="Confirm Password">
                            {getFieldDecorator("confirm_password", {
                                rules: [
                                    { required: true, message: generateLabels("p_repeat_password") || "Please enter your confirm password" },
                                    { validator: this.checkPassword }
                                ]
                            })(
                                <Input.Password
                                    className="input-field"
                                    type={this.state.type}
                                    placeholder={generateLabels("p_repeat_password") || "Please re-enter your password"}
                                    id="ConfirmPassword"
                                    autoComplete="ConfirmPassword"
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col xs={24} sm={24}>
                        <FormItem style={{ paddingTop: 36 }}>
                            <Button id="signup"
                                style={{ background: "#FF69B4" }}
                                disabled={this.state.loading}
                                loading={this.state.loading}
                                htmlType="submit"
                                type="primary"
                                className="submit-btn btn-has-icon uppercase btn-width-full"
                            >
                                {generateLabels("signup_label") || "SIgnUp"}
                            </Button>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        );
    }
}
const SignUp = Form.create()(SignUpForm);

export default SignUp;
