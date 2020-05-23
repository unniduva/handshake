// import React, { Component } from "react";
// import { Col } from "antd"
// class BookingDetails extends Component {
//     render() {
//         var { onGoingBooking } = this.props
//         var array = onGoingBooking.priceMetatdata && Object.keys(onGoingBooking.priceMetatdata)
//         console.log(onGoingBooking)
//         return (
//             <main className="main-inner-wrapper">
//                 <section className="my-request-details">
//                     <div className="container">

//                         <div className="details-wrap">

//                             <div className="content-block">

//                                 <div className="has-padding">
//                                     <div>
//                                         <Col xs={24} sm={12}>
//                                             <h3 className="block-title">Payable Charges</h3>
//                                             <ul className="charges-list">
//                                                 {array && array.map(item => (
//                                                     <li className="list-item" key={item} >
//                                                         <div className="label-block">{item.replace(/_/g, " ")}</div>
//                                                         <div className="value-block">{`$ ${parseFloat(onGoingBooking.priceMetatdata[item]).toFixed(2)}`}</div>
//                                                     </li>
//                                                 ))}
//                                                 {/* <li className="list-item" >
//                                                     <div className="label-block">{"Price per hour"}</div>
//                                                     <div className="value-block">{`11`}</div>
//                                                 </li>
//                                                 {<li className="list-item" >
//                                                     <div className="label-block">{}</div>
//                                                     <div className="value-block">{}</div>
//                                                 </li>}
//                                                 {<li className="list-item" >
//                                                     <div className="label-block">{"Engineering Fee"}</div>
//                                                     <div className="value-block">{`$ `}</div>
//                                                 </li>}
//                                                 {<li className="list-item" >
//                                                     <div className="label-block">{"Engineering Fee"}</div>
//                                                     <div className="value-block">{`$ `}</div>
//                                                 </li>}
//                                                 <li className="list-item" >
//                                                     <div className="label-block">{"Sub Total"}</div>
//                                                     <div className="value-block">{`$11`}</div>
//                                                 </li> */}

//                                             </ul>
//                                             <div className="total-booking-price">
//                                                 <div className="label-block">{"Total booking price"}</div>
//                                                 <div className="value-block">{`$ ${onGoingBooking.price || 0}`}</div>
//                                             </div>
//                                         </Col>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//             </main>
//         );
//     }
// }

// export default BookingDetails;