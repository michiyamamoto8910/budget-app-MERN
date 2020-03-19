import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter , Route } from "react-router-dom";

import ItemList from './components/itemlist.component';
import EditItem from './components/edititem.component';
import CreateItem from './components/createitem.component';
import CreateCategory from './components/createcategory.component';




function App() {
  return (
    <BrowserRouter>
      <div>
      <br/>
      {/* each path directs to component class with that name */}
      <Route path="/" exact component={ItemList} />
      <Route path="/edit/:id" exact component={EditItem} />
      <Route path="/create" exact component={CreateItem} />
      <Route path="/create/category" exact component={CreateCategory} />
      </div>
    </BrowserRouter>
  );
}

export default App;
