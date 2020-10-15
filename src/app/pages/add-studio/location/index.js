import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Row, Col, Button, Input } from "antd";
import Loader from "../../../components/loader";
import StudioSteps from "../../../components/studio-steps";
import { history } from "../../../store";
import { normalizeEmail, getLatLong } from "../../../helpers"
import { getCookie } from "../../../helpers/utility"
import GooglePlaces from "./address.form"

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



class AddStudioLocation extends Component {
    constructor(props) {
        super(props)
        this.state = { search: "", place: "", address: {} }
    }
    cookie = JSON.parse(JSON.stringify(getCookie()))
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
                var data = { ...this.props.onGoingProcess, ...values }
                if (data.step <= 3) data.step = 3
                await this.props.processAddStudio(data)
                var nonLngPayload = {
                    ownerId: normalizeEmail(this.cookie.email),
                    defaultLang: this.props.language,
                    step: data.step
                }
                var lngSpecificPayload = {
                    location: this.props.studioDetails.location || this.props.onGoingProcess.location,
                    formatted_address: {
                        place: this.state.place,
                        place_id: this.state.address.place_id ? this.state.address.place_id :
                            this.props.studioDetails.formatted_address.place_id || this.props.onGoingProcess.formatted_address.place_id
                    },
                    landmark: data.landmark || ""
                }
                getLatLong(this.state.address.place_id).then(res => {
                    if (res && res.results[0])
                        lngSpecificPayload.location = res.results[0].geometry.location
                })
                // console.log(this.state.address.place_id,)
                await this.props.addNewStudio({ step: data.step, lngSpecificPayload, nonLngPayload, docId: this.props.studioDetails && this.props.studioDetails.id, currStep: 3 }).then(async res => {
                    console.log(this.props.studioDetails, "jfjfvjfj")
                    // if (this.props.studioDetails && this.props.studioDetails.id) await this.props.getStudio(this.props.studioDetails.id)
                    console.log(this.props.studioDetails, "AFTER RESPONSE")
                })
                if (this.props.match && this.props.match.params && this.props.match.params.studioId) history.push("/add-studio/pricing/" + this.props.match.params.studioId)
                else {
                    if (this.props.studioDetails && this.props.studioDetails.id) history.push("/add-studio/pricing/" + this.props.studioDetails.id)
                    else history.push("/add-studio/pricing")
                }

            }
        })
    }
    handleAddressChange = async e => {

        await this.setState({ search: e.target.value, place: e.target.value })
    }

    handleSelectSuggest = async suggest =>
        await this.setState({ search: "", address: suggest, place: suggest.formatted_address })
    async componentDidMount() {
        console.log(this.props, "PROPSSSLocation")
        if (this.props.match && this.props.match.params && this.props.match.params.studioId) {
            await this.props.getStudio(this.props.match.params.studioId)
        }
        await this.setState({ place: this.props.onGoingProcess.formatted_address ? this.props.onGoingProcess.formatted_address.place : "" })
    }
    render() {
        const { loading, } = this.props;
        if (loading) return <Loader />;

        const { getFieldDecorator } = this.props.form;

        return (
            <main className="main-inner-wrapper">
                <section className="add-studio-wrapper">
                    <div className="container">
                        <StudioSteps currentStep={4} />
                        <h1 className="main-title">Where's your studio located?</h1>
                        <Form onSubmit={this.handleSubmit.bind(this)} className="basic-form">
                            <Row type="flex" gutter={20}>
                                <Col span={24}>
                                    <Form.Item label="Studio Address">
                                        {getFieldDecorator("location", {
                                            rules: [{ required: false, message: "" }], initialValue: this.props.onGoingProcess.formatted_address && this.props.onGoingProcess.formatted_address.place
                                        })(
                                            // <Input placeholder="Enter street name" />
                                            <GooglePlaces
                                                handleSelectSuggest={this.handleSelectSuggest}
                                                handleAddressChange={this.handleAddressChange}
                                                addressData={this.state}
                                            />
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label="Apt, suite, building # (optional)" className="mb-3x">
                                        {getFieldDecorator("landmark", {
                                            rules: [{ required: false, message: "" }], initialValue: this.props.onGoingProcess.landmark
                                        })(
                                            <Input placeholder="Suite 42" />
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

const FormWrap = Form.create()(AddStudioLocation);

export default connect(mapStateToProps, mapDispatchToProps)(FormWrap);
