import React from 'react';
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import "./widgetLg.css";
//import {format} from "timeago.js"
import {format} from "date-fns"
import $ from 'jquery';
import { Link } from "react-router-dom";
import { Badge } from "@material-ui/core";
import { Notifications, CheckCircle, Cancel } from "@material-ui/icons";

export default function WidgetLg() {
  const[orders, setOrders] = useState([])
  const [newOrders, setNewOrders] = useState(0);
  const [newOrdersDelivered, setNewOrdersDelivered] = useState(0);
  const [newOrdersRefunded, setNewOrdersRefunded] = useState(0);
  const [packingVideoLink, setPackingVideoLink] = useState("");
  
  


  
  const sendReminder = async (orderId) => {
    const reminderEmailSent = true
  

    try {
      const res = await userRequest.put("sendMail/sendOrderReminder/" + orderId, { reminderEmailSent: reminderEmailSent });
      console.log(res.statusText)

      console.log("reminder sent");
      $('#'+orderId).prop('disabled', true);
      
    } catch (err) {
      console.log(err);
    }
  }

  const sendVideoLink = async (orderId, packingVideoLink) => {
    const videoEmailSent = true

    try {
      const res = await userRequest.put("sendMail/sendOrderVideoLink/" + orderId, { videoEmailSent: videoEmailSent, packingVideoLink: packingVideoLink });
      console.log(res.statusText)

      console.log("video link sent");
      $('#'+orderId+"_videoLink").prop('disabled', true);
      
    } catch (err) {
      console.log(err);
    }
  }
  


  const HandleOrderStatus = async (event, orderId) => {
    const status = event.target.value;

    console.log(status, orderId)


    try {
      const res = await userRequest.put("sendMail/updateOrderStatus/" + orderId, { status: status });
      console.log(res.statusText)

      $('#'+orderId).removeClass();
      $('#'+orderId).addClass(status);
    } catch (err) {
      console.log(err);
    }
  };

  

  useEffect(() => {
    const getOrders = async () =>{
      try{
        const res = await userRequest.get("orders");
        setOrders(res.data);

        const searchData = res.data.filter((item) => item.status === "created" && item.paid === true);
        const searchDataDelivered = res.data.filter((item) => item.status === "delivered" && item.paid === true);
        const searchDataRefunded = res.data.filter((item) => item.status === "refunded" && item.paid === true);

        setNewOrders(searchData.length)
        setNewOrdersDelivered(searchDataDelivered.length)
        setNewOrdersRefunded(searchDataRefunded.length)
        
      }catch(err){
        console.log(err);
      }
    }
    getOrders();

  },[]);

 

  //console.log(orders)
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest orders 
        <Badge color="secondary" badgeContent={newOrders}><Notifications/></Badge>
        <Badge color="secondary" badgeContent={newOrdersDelivered}><CheckCircle/></Badge>
        <Badge color="secondary" badgeContent={newOrdersRefunded}><Cancel/></Badge>
      </h3>

      <table className="widgetLgTable">
        <thead>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">ID</th>
            <th className="widgetLgTh">Status</th>
            <th className="widgetLgTh">Package video</th>
            <th className="widgetLgTh">Customer</th>
            <th className="widgetLgTh">Date</th>
            <th className="widgetLgTh">Discount (%)/ Code</th>
            <th className="widgetLgTh">Amount</th>
          </tr>
        </thead>
        <tbody>
        {orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(order=>(
      
            <tr className="widgetLgTr" key={order._id}>
              
              <td><Link to={"./orderpage/"+ order._id}>{order.shortId ? order.shortId : order._id}</Link></td>
              <td className="widgetLgStatus">
                
                { order.paid === true ?
                <select id={order._id} className={order.status} defaultValue={order.status} onChange={e => HandleOrderStatus(e, order._id)}>
                    <option  value="created">Created</option>
                    <option  value="confirmed">Confirmed</option>
                    <option  value="delivering">Delivering</option>
                    <option  value="delivered">Delivered</option>
                    <option  value="refunded">Refunded</option>
                </select>
                : order.reminderEmailSent ? "reminder already sent" : <button id={order._id} onClick={e => sendReminder(order._id)}>Not paid, send reminder</button>
                }
              </td>

              <td className="widgetLgPackageVideo">
              {order.packingVideoLink !== "" ? (
                <input
                  type="text"
                  placeholder="Enter Video Link"
                  id={order._id + "_videoLinkInput"}
                  value={packingVideoLink}
                  onChange={(e) => setPackingVideoLink(e.target.value)}
                />
              ) : (
                <input
                  type="text"
                  placeholder="Enter Video Link"
                  id={order._id + "_videoLinkInput"}
                />
              )}
                <button
                  onClick={(e) => {
                    if (packingVideoLink.trim() !== "") {
                      sendVideoLink(order._id, packingVideoLink);
                      inputElement.value = ""; // Clear the input field after sending
                    }
                  }}
                  disabled={order.videoEmailSent}
                >
                  Send
                </button>
              </td>

              <td className="widgetLgUser">
                <span className="widgetLgName">{order.billingAddress.firstname} {order.billingAddress.lastname}</span>
              </td>
              <td className="widgetLgDate">{format(new Date(order.createdAt), 'dd.MM.yyyy HH:mm')}</td>
              <td className="widgetLgAmount">{order.promoPercentage} / {order.promoCode}</td>
              <td className="widgetLgAmount">{order.promoPercentage === 100 ? 0.00 : order.total.toFixed(2)} €</td>
            </tr>
         
         ))}
         </tbody>
      </table>
    </div>
  );
}
