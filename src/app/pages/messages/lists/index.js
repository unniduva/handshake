import React, { Component } from "react";
import { connect } from "react-redux";
import { Tabs, Row, Col, Button, Select } from "antd";
import Loader from "../../../components/loader";
import { Link } from "react-router-dom";
import { getCookie } from "../../../helpers/utility";
import { normalizeEmail, generateLabels } from "../../../helpers";
import Nodata from "../../../components/no-data"
import moment from "moment"
const { TabPane } = Tabs;

const mapDispatchToProps = ({ studio }) => {
    return {
        ...studio
    };
};

const mapStateToProps = ({ studio }) => {
    return {
        ...studio
    };
};


class myMessages extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false, reload: false, query: null, Activekey: "1", filter: "1"
        };
    }
    cookie = JSON.parse(JSON.stringify(getCookie()))
    async componentDidMount() {
        console.log(this.state, "DIDMOUNT", this.props)
        await this.props.listmyRequests({ userId: normalizeEmail(this.cookie.email) })
        await this.props.listmyBooking({ ownerId: normalizeEmail(this.cookie.email), query: this.state.query })
    }
    tConvert = time => {
        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
        if (time.length > 1) {
            time = time.slice(1);
            time[5] = +time[0] < 12 ? " AM" : " PM";
            time[0] = +time[0] % 12 || 12;
        }
        return time.join("");
    }
    OnSelectChange = async val => {
        let query = null;
        if (val === "2") query = "confirmed"
        else if (val === "3") query = "cancelled"
        await this.setState({ query: query, filter: val })
        await this.props.listmyBooking({ ownerId: normalizeEmail(this.cookie.email), query: query })
    }
    ChangeStatus = async obj => {
        this.props.myBookings && this.props.myBookings.map(item => {
            if (item.bookingData.id === obj.id) {
                item.bookingData.status = obj.status
                return item
            }
            else return item
        })
        this.props.myRequests && this.props.myRequests.map(item => {
            if (item.bookingData.id === obj.id) {
                item.bookingData.status = obj.status
                return item
            }
            else return item
        })
        await this.setState({ reload: !this.state.reload })
        await this.props.updateBooking(obj)

    }
    cancelRequest = async data => {
        var id = data.id
        await this.ChangeStatus(data)

        await this.props.processRefund({ bookingId: id })
    }
    handleChange = async key => await this.setState({ Activekey: key })
    render() {
        const { loading, myRequests, myBookings } = this.props;
        const { Option } = Select;
        if (loading) return <Loader />;
        return (
            <main className="main-inner-wrapper">
                <section className="messages-wrapper">
                    <div className="container">
                        <h1 className="primary-title">{generateLabels("messages_label")}</h1>
                        <Tabs
                            animated={false}
                            activeKey={this.state.Activekey}
                            onChange={this.handleChange}
                            className="messages-tab-wrapper"
                        >
                            <TabPane tab={generateLabels("my_requests")} key="1">
                                {myRequests && myRequests.length > 0 ? myRequests.map((item, key) => (
                                    <div className="my-request-list-item" key={key}>
                                        <div className="media-block">
                                            <img src={item.images && item.images[0]} alt={item.name} />
                                            {item.bookingData.status === "cancelled" && (<span className="uppercase status-block status-cancelled">{generateLabels("canceled")}</span>)}
                                            {item.bookingData.status === "pending" && (<span className="uppercase status-block status-pending">{generateLabels("pending")}</span>)}
                                            {item.bookingData.status === "confirmed" && (<span className="uppercase status-block status-confirmed">{generateLabels("confirmed")}</span>)}
                                        </div>
                                        <div className="content-block">
                                            <div className="top-block">
                                                <Row type="flex" justify="center" align="middle" gutter={30}>
                                                    <Col xs={24} sm={14}>
                                                        <Link to={"my-requests/" + item.bookingData.id} className="title-block uppercase">{item.name}</Link>
                                                        <div className="request-id">{`${generateLabels("request")} ID:`} {item.bookingData && item.bookingData.id}</div>
                                                    </Col>
                                                    <Col xs={24} sm={10}>
                                                        {item.bookingData.status === "pending" && (<div className="btn-wrap">
                                                            <Button type="primary" className="uppercase cancel-btn"
                                                                onClick={() => this.cancelRequest({ id: item.bookingData && item.bookingData.id, status: "cancelled" })}>{generateLabels("cancel_request")}</Button></div>)}
                                                    </Col>
                                                </Row>
                                            </div>
                                            <div className="bottom-block">
                                                <div className="detail-item" key={key}>
                                                    <div className="uppercase label-block">{generateLabels("booking_for")}</div>
                                                    <div className="value-block">{item.bookingData && moment(item.bookingData.startDate.toDate()).format("DD-MM-YYYY")}</div>
                                                </div>
                                                <div className="detail-item" key={key}>
                                                    <div className="uppercase label-block">{generateLabels("time_slot")}</div>
                                                    <div className="value-block">
                                                        {`${this.tConvert(item.bookingData.startTime)} to ${this.tConvert(item.bookingData.endTime)}`}
                                                    </div>
                                                </div>
                                                {/* {item.messageDetails.map((detailItem, key) => (
                                                    <div className="detail-item" key={key}>
                                                        <div className="uppercase label-block">{detailItem.label}</div>
                                                        <div className="value-block">{detailItem.value}</div>
                                                    </div>
                                                ))} */}
                                            </div>
                                        </div>
                                    </div>
                                )) : <Nodata />}
                            </TabPane>
                            <TabPane tab={generateLabels("studio_bookings")} key="2">
                                <div className="basic-form">
                                    <div className="filter-option">
                                        <Select onChange={this.OnSelectChange} value={this.state.filter} placeholder="Filter by: All" suffixIcon={<span className="icon-caret-down"></span>}>
                                            <Option value="1">{generateLabels("all")}</Option>
                                            <Option value="2">{generateLabels("accepted")}</Option>
                                            <Option value="3">{generateLabels("rejected")}</Option>
                                        </Select>
                                    </div>
                                </div>
                                {myBookings && myBookings.length > 0 ? myBookings.map((item, key) => (
                                    <div className="studio-booking-list-item" key={key}>
                                        <div className="content-block">
                                            <div className="top-block">
                                                <Link to={"studio-bookings/" + item.bookingData.id} className="title-block uppercase">{item.name}</Link>
                                                <div className="sub-title-wrap">
                                                    <div className="request-id">{`${generateLabels("request")} ID:`} {item.bookingData && item.bookingData.id}</div>
                                                    {item.bookingData.status === "cancelled" && (<span className="uppercase status-block status-cancelled">{generateLabels("canceled")}</span>)}
                                                    {item.bookingData.status === "pending" && (<span className="uppercase status-block status-pending">{generateLabels("pending")}</span>)}
                                                    {item.bookingData.status === "confirmed" && (<span className="uppercase status-block status-confirmed">{generateLabels("confirmed")}</span>)}
                                                </div>
                                            </div>
                                            <div className="bottom-block">
                                                <Row type="flex" justify="center" align="middle" gutter={30}>
                                                    <Col xs={24} sm={14}>
                                                        <div className="detail-wrap">
                                                            <div className="detail-item" key={key}>
                                                                <div className="uppercase label-block">{generateLabels("booking_for")}</div>
                                                                <div className="value-block">{item.bookingData && moment(item.bookingData.startDate.toDate()).format("DD-MM-YYYY")}</div>
                                                            </div>
                                                            <div className="detail-item" key={key}>
                                                                <div className="uppercase label-block">{generateLabels("time_slot")}</div>
                                                                <div className="value-block">
                                                                    {`${this.tConvert(item.bookingData.startTime)} to ${this.tConvert(item.bookingData.endTime)}`}
                                                                </div>
                                                            </div>
                                                            {/* {item.messageDetails.map((detailItem, key) => (
                                                                <div className="detail-item" key={key}>
                                                                    <div className="uppercase label-block">{detailItem.label}</div>
                                                                    <div className="value-block">{detailItem.value}</div>
                                                                </div>
                                                            ))} */}
                                                        </div>
                                                    </Col>
                                                    <Col xs={24} sm={10}>
                                                        <div className="btn-wrap">
                                                            <Button type="primary" disabled={item.bookingData.status === "pending" ? false : true}
                                                                onClick={() => this.ChangeStatus({ id: item.bookingData && item.bookingData.id, status: "confirmed" })}
                                                                className="btn-width-auto uppercase accept-btn">{generateLabels("accept")}</Button>
                                                            <Button type="default" disabled={item.bookingData.status === "pending" ? false : true}
                                                                onClick={() => this.cancelRequest({ id: item.bookingData && item.bookingData.id, status: "cancelled" })}
                                                                className="btn-width-auto uppercase reject-btn">{generateLabels("reject")}</Button>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                    </div>
                                )) : <Nodata />}
                            </TabPane>
                        </Tabs>
                    </div>
                </section>
            </main>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(myMessages);
