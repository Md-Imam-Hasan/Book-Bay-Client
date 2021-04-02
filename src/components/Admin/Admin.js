import React from 'react';
import './Admin.css'
import Sidebar from '../Sidebar/Sidebar';
import AddBook from '../AddBook/AddBook';
import ManageBooks from '../ManageBooks/ManageBooks';
import { Route, Switch } from 'react-router';

const Admin = () => {
  return (
      <div className='row admin'>
        <div className="col-sm-3 col-4 bg-dark p-0 text-light">
          <Sidebar></Sidebar>
        </div>
        <div className="col-sm-9 col-8 p-0">
          <div className="container">
            <Switch>
              <Route exact path='/admin'>
                <AddBook></AddBook>
              </Route>
              <Route  path='/admin/add-book'>
                <AddBook></AddBook>
              </Route>
              <Route path='/admin/manage-books'>
                <ManageBooks></ManageBooks>
              </Route>
            </Switch>
          </div>
        </div>
      </div>
  );
};

export default Admin;