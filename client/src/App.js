import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { setAuthToken } from "./components/utils/setAuthToken";
import { loadUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import SingleProduct from "./components/SingleProduct/SingleProduct";
import Dashboard from "./components/Dashboard/dashboard/Dashboard";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import Footer from "./components/footer/Footer";
import Modal from "./components/Modal/Modal";
import ReduxToastr from "react-redux-toastr";
import PrivateRoute from "./components/utils/PrivateRoute";
import NotFound from "./components/utility/notFound/NotFound";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Modal />
        <ReduxToastr />
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <Route exact path="/product/:pid" component={SingleProduct} />
          <Route path="/" component={NotFound} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
