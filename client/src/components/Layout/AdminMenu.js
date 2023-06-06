import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/adminMenu.scss';
const AdminMenu = () => {
  return (
    <>
      <div className="adminMenu m-5 text-center p-3">
        <div className="userMenu list-group">
          <h4>Admin Panel</h4>
          <NavLink
            to="/dashboard/admin/create-category"
            className="list-group-item list-group-item-action"
          >
            Create Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            className="list-group-item list-group-item-action"
          >
            Create Product
          </NavLink>
          <NavLink
            to="/dashboard/admin/products"
            className="list-group-item list-group-item-action"
          >
            Products
          </NavLink>
          <NavLink
            to="/dashboard/admin/orders"
            className="list-group-item list-group-item-action"
          >
            Orders
          </NavLink>
     
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
