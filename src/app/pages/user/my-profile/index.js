import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Input, Button, DatePicker, Row, Col, Upload, Icon, message } from "antd";
import Loader from "../../../components/loader";
import { generateLabels, normalizeEmail } from "../../../helpers"
// import { history } from "../../../store";
import moment from "moment";
import { getCookie } from "../../../helpers/utility";

const FormItem = Form.Item;

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

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
    } else {
        message.success("Image uploaded successfully.");
    }
    return isJpgOrPng && isLt2M;
}


class myProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "password",
            icon: "passowrd-hide",
            phone: null,
            validation: false,
            loading: false,
        };
    }
    cookie = JSON.parse(JSON.stringify(getCookie()))
    handleUpload = info => {
        if (info.file.status === "uploading") {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === "done") {
            // Get this url from response in real world.
            this.props.uploadProfileImage({ files: info.file, userId: normalizeEmail(this.cookie.email) })
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );

        }
    };


    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
                console.log("this props= ", values.dob._d);

                const newDate = new Date(values.dob._d);
                const newValues = Object.assign({}, values, { dob: newDate });
                console.log("this props2= ", newValues);

                await this.props.updateProfile(newValues)
                // history.push("/add-studio/rules")
            }
        })
    }

    render() {
        const { loading, user } = this.props;
        if (loading) return <Loader />;
        const { getFieldDecorator } = this.props.form;
        // const { imageUrl } = this.state;

        const uploadButton = (
            <div>
                {this.state.loading ?
                    <Icon className="loading-block" type="loading" />
                    :
                    <Icon className="icon-block" type="user" />
                }
            </div>
        );

        return (
            <main className="main-inner-wrapper">
                <section className="my-profile-wrapper">
                    {user && user !== null && <div className="container">
                        <h1 className="primary-title">{generateLabels("my_profile")}</h1>
                        <Form className="basic-form" onSubmit={this.handleSubmit}>
                            <div className="dp-block">
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="profile-pic-uploader"
                                    showUploadList={false}
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    beforeUpload={beforeUpload}
                                    onChange={this.handleUpload}
                                >
                                    {user.imgUrl ?
                                        <>
                                            <div className="icon-pencil hover-block"></div>
                                            <img className="profile-pic" src={user.imgUrl} alt="avatar" style={{ width: "100%" }} />
                                        </>
                                        :
                                        uploadButton
                                    }
                                </Upload>
                            </div>
                            <div className="form-block">
                                <Row gutter={20} type="flex">
                                    <Col xs={24} sm={12}>
                                        <FormItem label={generateLabels("firstname")}>
                                            {getFieldDecorator("fname", {
                                                rules: [{
                                                    required: true, message: generateLabels("v_email") || "Enter your first name"
                                                }], initialValue: user.firstName
                                            })(
                                                <Input
                                                    placeholder="Enter your first name"
                                                    type="text"
                                                />
                                            )}
                                        </FormItem>
                                    </Col>
                                    <Col xs={24} sm={12}>
                                        <FormItem label={generateLabels("lastname")}>
                                            {getFieldDecorator("lname", {
                                                rules: [{ required: false, message: generateLabels("v_email") },], initialValue: user.lastName
                                            })(
                                                <Input
                                                    placeholder="Enter your last name"
                                                    type="text"
                                                />
                                            )}
                                        </FormItem>
                                    </Col>
                                    <Col xs={24} sm={12}>
                                        <FormItem label={`${generateLabels("email")} ID`}>
                                            {getFieldDecorator("email", {
                                                rules: [{ required: true, message: generateLabels("v_email") || "Please enter your Email ID" }], initialValue: user.email
                                            })(
                                                <Input
                                                    placeholder="Please enter your Email ID"
                                                    type="text"
                                                    readOnly
                                                />
                                            )}
                                        </FormItem>
                                    </Col>
                                    <Col xs={24} sm={12}>
                                        <Form.Item label={generateLabels("dob")}>
                                            {getFieldDecorator("dob", {
                                                rules: [{ type: "object", required: true, message: generateLabels("v_dob") || "Please select your date of birth!" }], initialValue: moment(user.Dob)
                                            })(<DatePicker format="DD/MM/YYYY" />)}
                                        </Form.Item>
                                    </Col>
                                    {/* <Col xs={24} sm={12}>
                                        <FormItem label="Password">
                                            {getFieldDecorator("password", {
                                                rules: [{ required: false, message: generateLabels("v_password") || "Please enter your password" },
                                                { min: 8, message: generateLabels("v_password_valid") },]
                                            })(
                                                <Input.Password
                                                    className="input-field"
                                                    type={this.state.type}
                                                    placeholder={generateLabels("p_password") || "Please enter your password"}
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
                                                    { required: false, message: generateLabels("v_repeat_password") || "Please enter your confirm password" },
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
                                    </Col> */}
                                    <Col xs={24} sm={24}>
                                        <FormItem style={{ paddingTop: 36 }}>
                                            <Button id="signup"
                                                disabled={this.props.loading}
                                                loading={this.props.loading}
                                                htmlType="submit"
                                                type="primary"
                                                className="submit-btn btn-has-icon uppercase btn-width-auto"
                                            >
                                                {generateLabels("update_profile") || "Update Profile"}
                                            </Button>
                                        </FormItem>
                                    </Col>
                                </Row>
                            </div>
                        </Form>
                    </div>}
                </section>
            </main>
        )
    }
}

const FormWrap = Form.create()(myProfile);

export default connect(mapStateToProps, mapDispatchToProps)(FormWrap);
