import '../css/index.css';
import '../css/SearchPage.css';
import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import useAuth from '../Authentication/useAuth';
import ProviderOrderCard from '../components/ProviderOrderCard';

const ProviderOrderHistoryPage = () => {
  const { auth } = useAuth();
  let providerId = auth?._id;
  const [completedClicked, setCompletedClicked] = useState("");
  const [completedOrders, setCompletedOrders] = useState([]);
  const [notCompletedOrders, setNotCompletedOrders] = useState([]);

  // usage: show order info
  useEffect(() => {
    const handleGetInfo = async (e) => {
      await fetch(`/api/orders/provider/` + providerId, {
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
  }, [completedClicked])

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
              return <ProviderOrderCard key={order._id} order={order} completed={false} setCompletedClicked={setCompletedClicked}/>;
            })}
          </>
        }

        <h1>Completed Orders</h1>
        {completedOrders.length == 0 ?
          <div>you don't have any completed order...</div>
          :
          <>
            {completedOrders.map((order) => {
              return <ProviderOrderCard key={order._id} order={order} completed={true} setCompletedClicked={setCompletedClicked}/>;
            })}
          </>
        }

      </div>
    </div>
  );
};

export default ProviderOrderHistoryPage;