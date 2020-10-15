import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Row, Col, Button, Input, Checkbox } from "antd";
import Loader from "../../../components/loader";
import StudioSteps from "../../../components/studio-steps";
import { history } from "../../../store";
import { getCookie } from "../../../helpers/utility"
import { normalizeEmail } from "../../../helpers"

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



class AddStudioPricing extends Component {
    constructor(props) {
        super(props);
        this.state = { discountAmount: "", audioEngineer: false, sessionAudioEng: false, Btndisable: false }
    }
    cookie = JSON.parse(JSON.stringify(getCookie()))

    saveStudio = async data => {
        var nonLngPayload = {
            Hourlyrate: data.Hourlyrate,
            step: data.step,
            ownerId: normalizeEmail(this.cookie.email),
            defaultLang: this.props.language
        }
        var lngSpecificPayload = {
            audioEngineer: data.audioEngineer === true ? true : false,
            discount: data.discount || "",
            isDiscountSelected: data.discount ? true : false,
            sessionAudEng: data.sessionAudioEng ? true : false,
            sessionAudEngRate: data.sessionAudioEng || "",
            mixingServices: data.mixingServices ? true : false,
            mixingServicesRate: data.mixingServices | "",
            otherServices: data.otherServices ? true : false,
            otherServicesRate: data.otherServices | "",
            discAudEng: data.discAudEng === true ? true : false
        }
        data = { ...data, ...nonLngPayload, ...lngSpecificPayload }
        await this.props.processAddStudio(data)
        console.log("before send....", nonLngPayload, lngSpecificPayload)
        await this.props.addNewStudio({ step: data.step, lngSpecificPayload, nonLngPayload, docId: this.props.studioDetails && this.props.studioDetails.id, currStep: 4 }).then(async res => {
            console.log(this.props.studioDetails, "jfjfvjfj")
            // if (this.props.studioDetails && this.props.studioDetails.id) await this.props.getStudio(this.props.studioDetails.id)
            console.log(this.props.studioDetails, "AFTER RESPONSE")
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({ Btndisable: true })
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                console.log("Received values of form: ", values, this.state);
                var data = { ...this.props.onGoingProcess, ...values }
                if (data.step <= 4) data.step = 4
                if (values.discount === true) data.discountAmount = this.state.discountAmount
                // await this.props.processAddStudio(data)
                await this.saveStudio(data)
                if (this.props.match && this.props.match.params && this.props.match.params.studioId) history.push("/add-studio/photos/" + this.props.match.params.studioId)
                else {
                    if (this.props.studioDetails && this.props.studioDetails.id) history.push("/add-studio/photos/" + this.props.studioDetails.id)
                    else history.push("/add-studio/photos")
                }

            }
        })
    }
    handleCheckChange = name => async ev => await this.setState({ [name]: !this.state[name] })
    handleChange = name => async ev => await this.setState({ [name]: ev.target.value })
    async componentDidMount() {
        console.log(this.props, "PROPSSSLocation")
        if (this.props.match && this.props.match.params && this.props.match.params.studioId) {
            await this.props.getStudio(this.props.match.params.studioId)
        }
    }
    render() {
        const { loading, } = this.props;
        if (loading) return <Loader />;
        console.log(this.state)
        const { getFieldDecorator } = this.props.form;

        return (
            <main className="main-inner-wrapper">
                <section className="add-studio-wrapper">
                    <div className="container">
                        <StudioSteps currentStep={5} />
                        <h1 className="main-title">How much does it cost?</h1>
                        <Form onSubmit={this.handleSubmit.bind(this)} className="basic-form">
                            <Row type="flex" gutter={20}>
                                <Col span={24}>
                                    <Form.Item label="Price per hour">
                                        {getFieldDecorator("Hourlyrate", {
                                            rules: [{ required: true, message: "" }], initialValue: this.props.onGoingProcess.Hourlyrate
                                        })(
                                            <Input placeholder="Enter your hourly rate (i.e: $45)" />
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item className="mb-2x">
                                        {getFieldDecorator("audioEngineer", {
                                            rules: [{ required: false, message: "" }], initialValue: this.props.onGoingProcess.audioEngineer
                                        })(
                                            <Checkbox disabled={this.state.sessionAudioEng} onChange={this.handleCheckChange("audioEngineer")} defaultChecked={this.props.onGoingProcess.audioEngineer}>Audio Engineer included in rate</Checkbox>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <h3 className="sub-title">Add Discounts</h3>
                                    <Form.Item className="mb-2x">
                                        {getFieldDecorator("discount", {
                                            rules: [{ required: false, message: "" }], initialValue: this.props.onGoingProcess.discount
                                        })(
                                            <div className="discount-block">
                                                <Checkbox defaultChecked={this.props.onGoingProcess.discount ? true : false} />
                                                <Input placeholder="Enter value" onChange={this.handleChange("discountAmount")} defaultValue={this.props.onGoingProcess.discount} />
                                                <span className="percentage-label">% discount on bookings longer than 8 hours</span>
                                            </div>
                                        )}
                                        <div className="note-text">This will be displayed as your day rate discount for all bookings.</div>
                                    </Form.Item>
                                </Col>
                                <Col span={24} >
                                    <h3 className="sub-title">Additional Services</h3>
                                    <Form.Item>
                                        {getFieldDecorator("sessionAudioEng", {
                                            rules: [{ required: false, message: "" }], initialValue: this.props.onGoingProcess.sessionAudEngRate
                                        })(
                                            <div className="discount-block">
                                                <Checkbox onChange={this.handleCheckChange("sessionAudioEng")} disabled={this.state.audioEngineer} defaultChecked={this.props.onGoingProcess.sessionAudEng ? true : false}>Session Audio Engineer:</Checkbox>
                                                <Input disabled={this.state.audioEngineer} placeholder="$0.00" defaultValue={this.props.onGoingProcess.sessionAudEngRate} />
                                                <span className="percentage-label">per hour</span>
                                            </div>
                                        )}
                                        <Form.Item>
                                            {getFieldDecorator("discAudEng", {
                                                rules: [{ required: false, message: "" }], initialValue: this.props.onGoingProcess.discAudEng
                                            })(
                                                <div style={{ paddingLeft: 25 }}>
                                                    <Checkbox disabled={this.state.audioEngineer} defaultChecked={this.props.onGoingProcess.discAudEng ? true : false}>
                                                        Enable discount for Session Engineer's rate on bookings longer than 8 hours</Checkbox>
                                                </div>
                                            )}
                                        </Form.Item>

                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item>
                                        {getFieldDecorator("mixingServices", {
                                            rules: [{ required: false, message: "" }], initialValue: this.props.onGoingProcess.mixingServicesRate
                                        })(
                                            <div className="discount-block">
                                                <Checkbox defaultChecked={this.props.onGoingProcess.mixingServices ? true : false}>Mixing/Mastering Services:</Checkbox>
                                                <Input placeholder="$0.00" defaultValue={this.props.onGoingProcess.mixingServicesRate} />
                                                <span className="percentage-label">per booking (fixed fee)</span>
                                            </div>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item className="mb-3x">
                                        {getFieldDecorator("otherServices", {
                                            rules: [{ required: false, message: "" }], initialValue: this.props.onGoingProcess.otherServicesRate
                                        })(
                                            <div className="discount-block">
                                                <Checkbox defaultChecked={this.props.onGoingProcess.otherServices ? true : false}>Other Production Services:</Checkbox>
                                                <Input placeholder="$0.00" defaultValue={this.props.onGoingProcess.otherServicesRate} />
                                                <span className="percentage-label">per booking (fixed fee)</span>
                                            </div>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item>
                                        <Button  htmlType="submit" type="primary" className="submit-btn btn-has-icon uppercase btn-width-auto">
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

const FormWrap = Form.create()(AddStudioPricing);

export default connect(mapStateToProps, mapDispatchToProps)(FormWrap);
