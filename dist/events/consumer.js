"use strict";
// import { eventProducer } from "../events/producer";
// import * as CooperateService from "../services/cooperateService";
// import * as EscrowService from "../services/escrowService";
// async function start(){
// console.log("Are we here consumer")
// eventProducer.on("processOrdertoWareHouse", async (currentUser, ordersCreated, defaultWareHouseDetails) => {
//   console.log("Is This Dispatch => processOrdertoWareHouse");
//   (async function(){
//     await CooperateService.processOrdertoWareHouse(currentUser, ordersCreated, defaultWareHouseDetails)
//   })()
// })
// // eventProducer.on("completeOrderCreationFromInvoice", (ordersCreated, defaultWareHouseDetails, procurementInvoice, currentUser) => {
// //   console.log("Is this Dispatch => completeOrderCreationFromInvoice");
// //   (async function(){
// //     await InvoiceService.completeOrderCreationFromInvoice(ordersCreated, defaultWareHouseDetails, procurementInvoice, currentUser)
// //   })()
// // })
// eventProducer.on("afterConfirmedOrderPayment",  (order) => {
//   console.log("Function Dispatch => afterConfirmedOrderPayment");
//   (async function(){
//     await EscrowService.afterConfirmedOrderPayment(order!)
//   })()
// })
// eventProducer.on('RIDING_STATUS', (data) => {
//   (async function(){
//     console.log("Caught the event")
//   })()
// });
// }
// start()
//# sourceMappingURL=consumer.js.map