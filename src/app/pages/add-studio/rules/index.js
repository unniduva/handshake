import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Row, Col, Button, Input, Checkbox } from "antd";
import Loader from "../../../components/loader";
import StudioSteps from "../../../components/studio-steps";
import { history } from "../../../store";
import { Link } from "react-router-dom";
import { normalizeEmail } from "../../../helpers"
import { getCookie } from "../../../helpers/utility"

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




class AddStudioRules extends Component {
    cookie = JSON.parse(JSON.stringify(getCookie()))
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
                var data = { ...this.props.onGoingProcess, ...values }
                if (data.step <= 2) data.step = 2
                await this.props.processAddStudio(data)
                var nonLngPayload = {
                    ownerId: normalizeEmail(this.cookie.email),
                    step: data.step,
                    defaultLang: this.props.language
                }
                var lngSpecificPayload = {
                    studioRules: data.studioRules || "",
                }
                await this.props.addNewStudio({ step: data.step, lngSpecificPayload, nonLngPayload, docId: this.props.studioDetails && this.props.studioDetails.id, currStep: 2 }).then(async res => {
                    console.log(this.props.studioDetails, "jfjfvjfj")
                    // if (this.props.studioDetails && this.props.studioDetails.id) await this.props.getStudio(this.props.studioDetails.id)
                    console.log(this.props.studioDetails, "AFTER RESPONSE")
                })
                if (this.props.match && this.props.match.params && this.props.match.params.studioId) history.push("/add-studio/location/" + this.props.match.params.studioId)
                else {
                    if (this.props.studioDetails && this.props.studioDetails.id) history.push("/add-studio/location/" + this.props.studioDetails.id)
                    else history.push("/add-studio/location")
                }

            }
        })
    }
    async componentDidMount() {
        console.log(this.props, "PROPSSSRules")
        if (this.props.match && this.props.match.params && this.props.match.params.studioId) {
            await this.props.getStudio(this.props.match.params.studioId)
        }
    }
    render() {
        const { loading, } = this.props;
        if (loading) return <Loader />;

        const { getFieldDecorator } = this.props.form;
        const { TextArea } = Input;

        return (
            <main className="main-inner-wrapper">
                <section className="add-studio-wrapper">
                    <div className="container">
                        <StudioSteps currentStep={3} />
                        <h1 className="main-title">Add studio rules and policy for bookings.</h1>
                        <Form onSubmit={this.handleSubmit.bind(this)} className="basic-form">
                            <Row type="flex" gutter={20}>
                                <Col span={24}>
                                    <Form.Item label="Studio Rules">
                                        {getFieldDecorator("studioRules", {
                                            rules: [{ required: true, message: "" }], initialValue: this.props.onGoingProcess.studioRules
                                        })(
                                            <TextArea autoSize={{ minRows: 6, maxRows: 10 }} placeholder="Describe your studio rules and policies if applicable" />
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item className="mb-3x">
                                        {getFieldDecorator("agree", {
                                            rules: [{ required: true, message: "" }], initialValue: this.props.onGoingProcess.agree || this.props.onGoingProcess.step > 2 ? true : false
                                        })(
                                            <Checkbox defaultChecked={this.props.onGoingProcess.agree || this.props.onGoingProcess.step > 2 ? true : false} className="terms-checkbox">
                                                I agree to the StudioRent
                                                <Link to="/cms/cancellationpolicy">Cancellation Policy</Link>
                                            </Checkbox>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item>
                                        <Button htmlType="submit" type="primary" className="submit-btn btn-has-icon uppercase btn-width-auto">
                                            <span className="text-block">Continue</span>
                                            <span className="icon-long-arrow-right icon-block"></span>
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </section>
            </main>
        )
    }
}

const FormWrap = Form.create()(AddStudioRules);

export default connect(mapStateToProps, mapDispatchToProps)(FormWrap);
