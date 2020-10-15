// import React, { Component } from "react";
// import { connect } from "react-redux";
// import LoginForm from "./login-form";
// import { history } from "../../../store";
// import { Link } from "react-router-dom";
// import { generateLabels } from "../../../helpers"

// const mapDispatchToProps = ({ user, studio }) => {
//     return {
//         ...user, ...studio
//     };
// };

// const mapStateToProps = ({ user, studio }) => {
//     return {
//         ...user, ...studio
//     };
// };

// class Login extends Component {
//     constructor(props) {
//         super(props);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }
//     componentDidUpdate() {
//         if (this.props.user && this.props.user.email)
//             if (this.props.location && this.props.location.state && this.props.location.state.prevPath)
//                 history.push(`${this.props.location.state.prevPath}`)
//             else
//                 history.push("/")
//         else history.push("/login")

//     }
//     async handleSubmit(user) {
//         await this.props.login(user)
//     }

//     handleOpen = () => {
//         this.sucessCommonModal.open()
//     }

//     render() {
//         return (
//             <div className="auth-bg">
//                 <img src={"images/banner3.png"} alt={"Loading.."}></img>
//                 <div className="auth-wrapper">
//                     <div className="auth-wrapper-inner">
//                         <h1 className="title-block">{generateLabels("signin")}</h1>
//                         <div className="auth-form-block">
//                             <LoginForm forgt={
//                                 this.handleOpen
//                             } onSubmit={this.handleSubmit} loading={this.props.loading} errorMessage={this.props.errorMessage} clearMessage={this.props.clearErrorMessage} />
//                         </div>
//                         <div className="bottom-link-block">
//                             <span className="text-block">{`${generateLabels("dont_have_acc")} ?`}</span>
//                             <Link to="/signup" className="auth-header-logo forward-link">{`${generateLabels("signup_label")}`}</Link>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//         );
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Login);

import React, { Component } from "react";
import { connect } from "react-redux";
import LoginForm from "./login-form";
import { history } from "../../../store";
import { Col, Row } from "antd";
// import Dialogs from "../../../components/dialog";
// import {getUserLocation } from "../../../helpers";

const mapDispatchToProps = ({ user }) => {
    return {
        ...user
    };
};

const mapStateToProps = ({ user }) => {
    return {
        ...user
    };
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleSignup = () => {
        // history.push("/signup");
    };
    async handleSubmit(user) {

        await this.props.login(user).then(res => {
            if (res && res.accessToken) history.push("/home")
            console.log("res======", res)
        })

        // let res = await this.props.login(user);
        // console.log("res", this.props.user)
        // if (this.props.user && res) {
        //     if(this.props.user.user_type==="vendoruser"){
        //         history.push("/dashboard")
        //     }
        //     else if(res.user.vendor_id) {
        //         let vendor = await this.props.getBusiness({vendor_id: res.user.vendor_id})
        //         if(vendor && vendor.outlet_signup_status === "Y") {
        //             history.push("/")
        //         }
        //         else {

        //             if(vendor && vendor.business_type === "outlet") {
        //                 history.push("/profile-Outlet-details")
        //             }
        //             else if(vendor && vendor.business_type === "home") {
        //                 history.push("/profile-homerun-business-details")
        //             }
        //             else{
        //                 history.push("/profile")
        //             }
        //         }
        //     }
        //     else 
        //         history.push("/profile")
        // } 
    }
    async componentDidMount() {
        // this.setState({
        //     position: await getUserLocation()
        // });
        // await this.props.listCountries()
    }
    render() {
        return (
            <div className="auth-wrapper1">
                <div className="auth-image">
                    <img src="/images/banner3.png" alt="Loading..."></img>
                </div>
                <div className="auth-form" elevation={4}>
                    <div className="auth-form-inner">
                        <Row>
                            <Col span={24}>
                                <div className="auth-logo" onClick={() => history.push("/")}>
                                    <img src="/images/icon.png" alt="Loading..."></img>
                                    <h2 style={{ padding: "6px 12px 0px 1px", color: "#932068" }}>HandShake</h2>
                                </div>
                                <div>
                                    <LoginForm
                                        //  forgt={  this.handleOpen }
                                        onSubmit={this.handleSubmit}
                                        loading={this.props.loading}
                                        errorMessage={this.props.errorMessage}
                                        clearMessage={this.props.clearErrorMessage} />
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
