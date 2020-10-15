import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Row, Col, Button, Input } from "antd";
import Loader from "../../../components/loader";
import StudioSteps from "../../../components/studio-steps";
import { history } from "../../../store";
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



class AddStudioFeatures extends Component {
    cookie = JSON.parse(JSON.stringify(getCookie()))
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
                var data = { ...this.props.onGoingProcess, ...values }
                console.log(data, "imnsisi====>", this.props.studioDetails)
                if (data.step <= 1) data.step = 1
                await this.props.processAddStudio(data)
                var nonLngPayload = {
                    ownerId: normalizeEmail(this.cookie.email),
                    step: data.step,
                    defaultLang:this.props.language
                }
                var lngSpecificPayload = {
                    amenities: data.amenities || "",
                    mainEquipment: data.mainEquipment || "",
                }
                await this.props.addNewStudio({ step: data.step, lngSpecificPayload, nonLngPayload, docId: this.props.studioDetails && this.props.studioDetails.id, currStep: 1 }).then(async res => {
                    console.log(this.props.studioDetails, "jfjfvjfj")
                    // if (this.props.studioDetails && this.props.studioDetails.id) await this.props.getStudio(this.props.studioDetails.id)
                    console.log(this.props.studioDetails, "AFTER RESPONSE")
                })
                if (this.props.match && this.props.match.params && this.props.match.params.studioId) history.push("/add-studio/rules/" + this.props.match.params.studioId)
                else {
                    if (this.props.studioDetails && this.props.studioDetails.id) history.push("/add-studio/rules/" + this.props.studioDetails.id)
                    else history.push("/add-studio/rules")
                }
            }
        })
    }
    async componentDidMount() {
        console.log(this.props, "PROPSSSFeatures")
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
                        <StudioSteps currentStep={2} />
                        <h1 className="main-title">What features does your studio have?</h1>
                        <Form onSubmit={this.handleSubmit.bind(this)} className="basic-form">
                            <Row type="flex" gutter={20}>
                                <Col span={24}>
                                    <Form.Item label="Amenities">
                                        {getFieldDecorator("amenities", {
                                            rules: [{ required: true, message: "" }], initialValue: this.props.onGoingProcess.amenities
                                        })(
                                            <TextArea autoSize={{ minRows: 4, maxRows: 6 }} placeholder="List amenities such as lounge, parking, etc here" />
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label="Main Equipment" className="mb-3x">
                                        {getFieldDecorator("mainEquipment", {
                                            rules: [{ required: false, message: "" }], initialValue: this.props.onGoingProcess.mainEquipment
                                        })(
                                            <TextArea autoSize={{ minRows: 4, maxRows: 6 }} placeholder="List the main main equipment in detail here" />
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

const FormWrap = Form.create()(AddStudioFeatures);

export default connect(mapStateToProps, mapDispatchToProps)(FormWrap);
