import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import "./widgetLg.css";
//import {format} from "timeago.js"
import {format} from "date-fns"
import $ from 'jquery';
import { Link } from "react-router-dom";

export default function WidgetLg() {
  const[orders, setOrders] = useState([])

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
      }catch(err){
        console.log(err);
      }
    }
    getOrders();

  },[]);

  //console.log(orders)
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest orders</h3>
      <table className="widgetLgTable">
       
        <tr className="widgetLgTr">
          <th className="widgetLgTh">ID</th>
          <th className="widgetLgTh">Status</th>
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
        </tr>

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
                </select>
                : "Not paid"
                }
              </td>
              <td className="widgetLgUser">
                <img
                  src="https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                  alt=""
                  className="widgetLgImg"
                />
                <span className="widgetLgName">{order.billingAddress.firstname} {order.billingAddress.lastname}</span>
              </td>
              <td className="widgetLgDate">{format(new Date(order.createdAt), 'dd.MM.yyyy HH:mm')}</td>
              <td className="widgetLgAmount">{order.total.toFixed(2)} ???</td>
            </tr>
         
         ))}
      </table>
    </div>
  );
}
