// import React from "react";
// import Card from "react-credit-cards";
// import { Input, Form, Button } from "antd"
// // import SupportedCards from './Cards';
// import moment from "moment"
// import { connect } from "react-redux";
// import {
//     formatCreditCardNumber,
//     formatCVC,
//     formatExpirationDate,
//     // formatFormData,
// } from "./utils";
// // import styles from "./styles.css";
// // import { payments } from '../../models';
// import { getCookie } from "../../helpers/utility"
// import { normalizeEmail } from "../../helpers"
// import { history } from "../../store"
// import Notification from "../../components/notification"
// import "react-credit-cards/es/styles-compiled.css";
// const FormItem = Form.Item


// const mapDispatchToProps = ({ studio }) => {
//     return {
//         ...studio
//     };
// };

// const mapStateToProps = ({ studio }) => {
//     return {
//         ...studio
//     };
// };

// class PaymentCard extends React.Component {
//     state = {
//         number: "",
//         name: "",
//         expiry: "",
//         cvc: "",
//         issuer: "",
//         errorMsg: "",
//         errorMsgcvc: "",
//         canSubmit: false
//     };

//     handleCallback = ({ issuer }, isValid) => {
//         // console.log(issuer, isValid, "++++++++++")
//         // if (isValid) {
//         //     this.setState({ issuer });
//         // }
//         this.setState({ issuer });
//     };

//     handleInputFocus = ({ target }) => {
//         this.setState({
//             focused: target.name,
//         });
//     };
//     validateExpiry = async value => {
//         this.setState({ errorMsg: "", canSubmit: true })
//         var temp = value.split("/")

//         if (temp !== null && temp.length > 0) {
//             if (temp[0] && (parseInt(temp[0]) < 0 || parseInt(temp[0]) > 12)) {
//                 this.setState({ errorMsg: "Please enter a valid expiry date", canSubmit: false })
//             }
//             if (temp[1]) {
//                 let flag = moment(`20${temp[1]}-01-01`).isSameOrAfter(moment(), "year");
//                 if (flag === false) this.setState({ errorMsg: "Please enter a valid expiry date", canSubmit: false })
//             }
//         }
//     }
//     validateCVC = async data => {
//         this.setState({ errorMsgcvc: "", canSubmit: true })
//         var flag = data.match(/\d{3,4}/g)
//         if (flag === null) this.setState({ errorMsgcvc: "Please Input valid CVV", canSubmit: false })
//     }
//     handleInputChange = async ({ target }) => {
//         if (target.name === "number") {
//             target.value = formatCreditCardNumber(target.value);
//         } else if (target.name === "expiry") {
//             target.value = formatExpirationDate(target.value);
//             this.validateExpiry(target.value)
//         } else if (target.name === "cvc") {
//             this.validateCVC(target.value)
//             target.value = formatCVC(target.value);
//         }
//         await this.setState({ [target.name]: target.value })
//     };

//     handleSubmit = async e => {
//         e.preventDefault();
//         this.props.form.validateFields(async (err, values) => {
//             if (!err) {
//                 var exp = this.state.expiry.split("/")
//                 await this.props.saveCard({
//                     card: {
//                         number: this.state.number.toString().trim().replace(/ /g, ""),
//                         name: this.state.name,
//                         exp_month: exp[0],
//                         exp_year: `20${exp[1]}`,
//                         cvc: this.state.cvc
//                     }, userId: normalizeEmail(getCookie().email)
//                 }).then(async res => {
//                     if (res) {
//                         await this.props.createPayment({
//                             userId: normalizeEmail(getCookie().email),
//                             studioId: this.props.onGoingBooking.studioId,
//                             cardId: res.data.card.id,
//                             price: this.props.onGoingBooking.price
//                         }).then(async paym => {
//                             var bookdata = this.props.onGoingBooking
//                             console.log(paym, "Payemnt")
//                             if (paym.response.id) {
//                                 bookdata.paymentStatus = "confirmed"
//                                 await this.props.bookStudio({
//                                     card: res.data.card,
//                                     bookingData: bookdata, payment: paym.response
//                                 })
//                             }


//                         })
//                     }
//                     else Notification("Error", "Invalid card")

//                 })

//                 history.push("/messages")
//             }
//             else
//                 console.error(err);
//         });
//         // const { issuer } = this.state;
//         // const formData = [...e.target.elements]
//         //   .filter(d => d.name)
//         //   .reduce((acc, d) => {
//         //     acc[d.name] = d.value;
//         //     return acc;
//         //   }, {});
//         // await this.props.saveCreditcardDetails(formData)
//         // this.setState({ formData });
//         // this.form.reset();
//     };

//     render() {
//         const { name, number, expiry, cvc, focused } = this.state;
//         const { getFieldDecorator } = this.props.form;
//         return (<Form className="login-form" style={{
//             width: "50%",
//             textAlign: "center",
//             maxWidth: "500px",
//             margin: "10px auto",
//             border: "1px solid #ccc",
//             padding: "20px",
//             boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)"
//         }} onSubmit={this.handleSubmit}>
//             <Card
//                 number={number}
//                 name={name}
//                 expiry={expiry}
//                 cvc={cvc}
//                 focused={focused}
//                 callback={this.handleCallback}
//             />
//             <FormItem >
//                 {getFieldDecorator("number", {
//                     rules: [{ required: true, message: "Please input your card number", pattern: new RegExp(/[\d| ]{16,22}/g) }],
//                 })(
//                     <Input className="input-field" placeholder="Card Number" type="text" name="number" onChange={this.handleInputChange} />
//                 )}
//             </FormItem>
//             <FormItem className="m-large mb-0">
//                 {getFieldDecorator("name", {
//                     rules: [{
//                         required: true, message: "Please input your name",
//                     }],
//                 })(
//                     <Input className="input-field" placeholder="Name" id="name" name="name" onChange={this.handleInputChange} />

//                 )}
//             </FormItem>
//             <FormItem className="m-large mb-0">
//                 {getFieldDecorator("expirydate", {
//                     rules: [{
//                         required: true, message: "Please input your expiry",
//                         pattern: new RegExp(/[\d\d/\d\d]/g)
//                     }],
//                 })(


//                     <Input className="input-field" placeholder="Expiry" id="expiry" name="expiry" onChange={this.handleInputChange} />
//                 )}
//                 <small style={{ color: "red" }}>{this.state.errorMsg}</small>

//             </FormItem>
//             <FormItem className="m-large mb-0">
//                 {getFieldDecorator("cvc", {
//                     rules: [{
//                         required: true, message: "Please input your cvc",
//                         pattern: new RegExp(/\d{3,4}/g)
//                     }],
//                 })(
//                     <Input className="input-field" placeholder="CVC" id="cvc" name="cvc" onChange={this.handleInputChange} />
//                 )}

//             </FormItem>
//             <FormItem className="last-item form-btn-block">
//                 <Button disabled={this.props.loading} loading={this.props.loading}
//                     type="secondary" htmlType="submit"
//                     className="form-submit-btn">Submit</Button>
//             </FormItem>
//         </Form>)
//     }
// }
// const Payment = Form.create()(PaymentCard);
// export default connect(mapStateToProps, mapDispatchToProps)(Payment);
