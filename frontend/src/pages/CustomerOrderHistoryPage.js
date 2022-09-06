import '../css/index.css';
import '../css/SearchPage.css';
import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import useAuth from '../Authentication/useAuth';
import CustomerOrderCard from '../components/CustomerOrderCard';

const CustomerOrderHistoryPage = () => {
  const { auth } = useAuth();
  let customerId = auth?._id;
  const [completedOrders, setCompletedOrders] = useState([]);
  const [notCompletedOrders, setNotCompletedOrders] = useState([]);

  // usage: show order info
  useEffect(() => {
    const handleGetInfo = async (e) => {
      await fetch(`/api/orders/customer/` + customerId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(res => res.json())
        .then((res) => {
          const result = res.reduce((r, o) => {
            r[o.completed ? 'completed' : 'notCompleted'].push(o);
            return r;
          }, { completed: [], notCompleted: [] });
          setCompletedOrders(result?.completed);
          setNotCompletedOrders(result?.notCompleted);
        })
    }
    handleGetInfo();
  }, [])

  return (
    <div className="order-history-page">
      <div className="order-history-list">
        <header>
          <h1>Order History</h1>
        </header>
        <h1>In Progress Orders</h1>

        {notCompletedOrders.length == 0 ?
          <div>you don't have any order in progress...</div>
          :
          <>
            {notCompletedOrders.map((order) => {
              return <CustomerOrderCard key={order._id} order={order} completed={false}/>;
            })}
          </>
        }

        <h1>Completed Orders</h1>
        {completedOrders.length == 0 ?
          <div>you don't have any completed order...</div>
          :
          <>
            {completedOrders.map((order) => {
              return <CustomerOrderCard key={order._id} order={order} completed={true} />;
            })}
          </>
        }

      </div>
    </div>
  );
};

export default CustomerOrderHistoryPage;