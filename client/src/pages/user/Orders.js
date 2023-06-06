import React, { useState, useEffect } from 'react';
import UserMenu from '../../components/Layout/UserMenu';
import Layout from './../../components/Layout/Layout';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import moment from 'moment';
import '../../styles/order.scss';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get('/api/dd/auth/orders');
      setOrders(data.orders);
      console.log('Response data:', data); // Add this line
    } catch (error) {
      console.log('Error fetching orders:', error);
    }
  };
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <Layout>
            <div className="background"></div>

      <div className="container-fluid dashboard">
        <div className="userDash row" style={{ maxWidth: '100%' }}>
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="custom col-md-9">
            <h1 className="text-center">All Orders</h1>
            {orders?.map((o, i) => {
              return (
                <div className="border shadow mb-4" key={o._id}>
                  <table className="table" style={{ maxWidth: '100%' }}>
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col"> date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createAt).fromNow()}</td>
                        <td>{o?.payment.success ? 'Success' : 'Failed'}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="opis container" style={{ maxWidth: '100%' }}>
                    {o?.products?.map((p, j) => (
                      <div
                        className="row mb-2 p-3 card flex-row"
                        key={`${p._id}-${j}`}
                        style={{ maxWidth: '100%' }}
                      >
                        <div className="col-md-4">
                          <img
                            src={`/api/dd/product/product-photo/${p._id}`}
                            className="slikica card-img-top"
                            alt={p.name}
                          />
                        </div>
                        <div className="col-md-8">
                          <p>{p.name}</p>
                          <p>{p.description.substring(0, 30)}</p>
                          <p>Price : ${p.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
