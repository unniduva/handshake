import React, { Component } from "react";
import { connect } from "react-redux";
import { Radio, Form, Row, Col, Button, Input, Checkbox, Select, TimePicker } from "antd";
import Loader from "../../../components/loader";
import StudioSteps from "../../../components/studio-steps";
import moment from "moment";
import { history } from "../../../store";
import { normalizeEmail } from "../../../helpers";
import { getCookie, getLanguage } from "../../../helpers/utility";
import { generateLabels } from "../../../helpers";

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

class AddStudioDescription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            availability: 1, startTime: this.props.onGoingProcess.startTime || "00:00", endTime: this.props.onGoingProcess.endTime || "00:00"
        };
    }
    cookie = JSON.parse(JSON.stringify(getCookie()))

    options = [{ label: generateLabels("professional_studio"), value: "professional" },
        { label: generateLabels("midlevel_studio"), value: "midlevel" },
        { label: generateLabels("basic"), value: "basic" }]
    studioHoursHandler = e => {
        console.log("radio checked", e.target.value);
        this.setState({
            availability: e.target.value,
        });
    };
    async componentDidMount() {
        // console.log(this.props, "PROPSSS")
        if (this.props.match && this.props.match.params && this.props.match.params.studioId) {
            await this.props.getStudio(this.props.match.params.studioId)
        }
        else this.props.clearStore()
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                console.log("Received values of form: ", values, this.state);
                var data = { ...this.props.onGoingProcess, ...values }

                // if (data.step <= 1) data.step = 1
                if (values.availability === 3) {
                    data.startTime = this.state.startTime
                    data.endTime = this.state.endTime
                }
                console.log(data.step, parseInt(data.step) <= parseInt(0), "imnsisi====>")

                var nonLngPayload = {
                    availability: data.availability,
                    studioType: data.studioType,
                    minHour: data.minHour,
                    maxStudioOccupancy: data.maxStudioOccupancy,
                    startTime: data.startTime || "",
                    endTime: data.endTime || "",
                    timeInAdvance: data.timeInAdvance || "",
                    step: (parseInt(data.step) <= parseInt(0)) ? 0 : data.step,
                    bookings: 0,
                    rating: 0,
                    active: true,
                    ownerId: normalizeEmail(this.cookie.email),
                    defaultLang: getLanguage(),
                    isCompleted: false
                }
                if (data.step === 0) nonLngPayload.createdAt = new Date()
                var lngSpecificPayload = {
                    name: data.name,
                    description: data.description || "",
                    pastClients: data.pastClients || "",
                    audioSamples: data.audioSamples ? data.audioSamples.split(",") : [],
                }
                await this.props.processAddStudio(data)
                await this.props.addNewStudio({
                    step: (parseInt(data.step) <= parseInt(0)) ? 0 : data.step,
                    lngSpecificPayload, nonLngPayload, docId: this.props.studioDetails && this.props.studioDetails.id, currStep: 0
                }).then(async res => {
                    console.log(this.props.studioDetails, "jfjfvjfj")

                    // if (this.props.studioDetails && this.props.studioDetails.id) await this.props.getStudio(this.props.studioDetails.id)
                })
                if (this.props.match && this.props.match.params && this.props.match.params.studioId) history.push("/add-studio/features/" + this.props.match.params.studioId)
                else {
                    if (this.props.studioDetails && this.props.studioDetails.id) history.push("/add-studio/features/" + this.props.studioDetails.id)
                    else history.push("/add-studio/features")
                }
            }
        })
    }
    onStartTimeChange = async ev => await this.setState({ startTime: moment(ev).format("HH:MM") })

    onEndTimeChange = async ev => await this.setState({ endTime: moment(ev).format("HH:MM") })

    render() {
        const { loading, } = this.props;
        if (loading) return <Loader />;
        // console.log("on render", this.props)

        const { getFieldDecorator } = this.props.form;
        const { TextArea } = Input;
        const CheckboxGroup = Checkbox.Group;
        const { Option } = Select;

        return (
            <main className="main-inner-wrapper">
                <section className="add-studio-wrapper">
                    <div className="container">
                        <StudioSteps currentStep={1} />
                        <h1 className="main-title">{generateLabels("add_studio_label")}</h1>
                        <Form onSubmit={this.handleSubmit.bind(this)} className="basic-form">
                            <Row type="flex" gutter={20}>
                                <Col span={24}>
                                    <Form.Item label={generateLabels("studio_name")}>
                                        {getFieldDecorator("name", {
                                            rules: [{ required: true, message: "" }], initialValue: this.props.onGoingProcess.name || ""
                                        })(
                                            <Input placeholder={generateLabels("whats_the_name_of_your_studio")} />
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label={generateLabels("studio_details")}>
                                        {getFieldDecorator("description", {
                                            rules: [{ required: false, message: "" }], initialValue: this.props.onGoingProcess.description || ""
                                        })(
                                            <TextArea autoSize={{ minRows: 4, maxRows: 6 }} placeholder={generateLabels("please_enter_a_detailed_description_of_your_studio")} />
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label={generateLabels("studio_type")}>
                                        {getFieldDecorator("studioType", {
                                            rules: [{ required: true, message: generateLabels("please_select") + " " + generateLabels("studio_type") }], initialValue: this.props.onGoingProcess.studioType || []
                                        })(
                                            <CheckboxGroup
                                                options={this.options}
                                            />
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={24} sm={12}>
                                    <Form.Item label={generateLabels("minimum_booking")}>
                                        {getFieldDecorator("minHour", {
                                            rules: [{ required: true, message: generateLabels("select_minimum_hours") }], initialValue: this.props.onGoingProcess.minHour
                                        })(
                                            <Select placeholder={generateLabels("choose_booking_number")} suffixIcon={<span className="icon-caret-down"></span>}>
                                                <Option value="1">01</Option>
                                                <Option value="2">02</Option>
                                                <Option value="3">03</Option>
                                                <Option value="4">04</Option>
                                            </Select>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={24} sm={12}>
                                    <Form.Item label={generateLabels("max_studio_occupancy")}>
                                        {getFieldDecorator("maxStudioOccupancy", {
                                            rules: [{ required: true, message: generateLabels("choose_studio_occupancy") }], initialValue: this.props.onGoingProcess.maxStudioOccupancy
                                        })(
                                            <Select placeholder={generateLabels("choose_studio_occupancy")} suffixIcon={<span className="icon-caret-down"></span>}>
                                                <Option value="1">01</Option>
                                                <Option value="2">02</Option>
                                                <Option value="3">03</Option>
                                                <Option value="4">04</Option>
                                            </Select>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label={generateLabels("studio_hours")}>
                                        {getFieldDecorator("availability", {
                                            rules: [{ required: true, message: generateLabels("please_select") + " " + generateLabels("studio_hours") }], initialValue: this.props.onGoingProcess.availability
                                        })(
                                            <Radio.Group onChange={this.studioHoursHandler} setFieldsValue={this.state.studioHour} className="c-radio-list">
                                                <Radio value={1}>{generateLabels("always_available_24x7")}</Radio>
                                                <Radio value={2}>{generateLabels("message_for_availability")}</Radio>
                                                <Radio value={3}>
                                                    {generateLabels("daily_from")}
                                                    {this.state.availability === 3 || this.props.onGoingProcess.availability === 3 ?
                                                        <div className="daily-from-field">
                                                            <TimePicker placeholder={generateLabels("start_time")} defaultValue={moment(this.props.onGoingProcess.startTime || "00:00", "HH:mm:ss")}
                                                                defaultOpenValue={moment("00:00", "HH:mm")} onChange={this.onStartTimeChange}
                                                                format="HH:mm" suffixIcon={<span className="icon-caret-down"></span>} />
                                                            <span className="separator-block">to</span>
                                                            <TimePicker placeholder={generateLabels("end_time")} defaultValue={moment(this.props.onGoingProcess.endTime || "00:00", "HH:mm:ss")}
                                                                defaultOpenValue={moment("00:00", "HH:mm")} onChange={this.onEndTimeChange}
                                                                format="HH:mm" suffixIcon={<span className="icon-caret-down"></span>} />
                                                        </div>
                                                        : null}
                                                </Radio>
                                            </Radio.Group>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label={generateLabels("time_in_advance_requirement_for_booking_requests")}>
                                        {getFieldDecorator("timeInAdvance", {
                                            rules: [{ required: false, message: "" }], initialValue: this.props.onGoingProcess.timeInAdvance
                                        })(
                                            <Select placeholder={generateLabels("choose_one")} suffixIcon={<span className="icon-caret-down"></span>}>
                                                <Option value="1">01</Option>
                                                <Option value="2">02</Option>
                                                <Option value="3">03</Option>
                                                <Option value="4">04</Option>
                                            </Select>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label={generateLabels("past_clients")}>
                                        {getFieldDecorator("pastClients", {
                                            rules: [{ required: false, message: "" }], initialValue: this.props.onGoingProcess.pastClients
                                        })(
                                            <TextArea autoSize={{ minRows: 4, maxRows: 6 }} placeholder={generateLabels("list_artists_who_have_used_your_studio_here")} />
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label={generateLabels("audio_samples")} className="mb-3x">
                                        {getFieldDecorator("audioSamples", {
                                            rules: [{ required: false, message: "" }], initialValue: this.props.onGoingProcess.audioSamples &&
                                                this.props.onGoingProcess.audioSamples !== null && this.props.onGoingProcess.audioSamples.toString()
                                        })(
                                            <TextArea autoSize={{ minRows: 4, maxRows: 6 }} placeholder={generateLabels("add_soundcloud_spotify_etc_url_here")} />
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item>
                                        <Button htmlType="submit" type="primary" className="submit-btn btn-has-icon uppercase btn-width-auto">
                                            <span className="text-block">{generateLabels("continue")}</span>
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

const FormWrap = Form.create()(AddStudioDescription);

export default connect(mapStateToProps, mapDispatchToProps)(FormWrap);
