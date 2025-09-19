const { useState, useEffect } = React;
const { Link, NavLink } = ReactRouterDOM;
const { useNavigate } = ReactRouter;
const { useSelector } = ReactRedux;

import { userService } from "../services/user.service.js";
import { UserMsg } from "./UserMsg.jsx";
import { LoginSignup } from "./LoginSignup.jsx";
import { showErrorMsg } from "../services/event-bus.service.js";
import {
  setCurrentUser,
  clearCurrentUser,
} from "../store/actions/user.action.js";

export function AppHeader() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.userModule.user);

  useEffect(() => {
    if (user) {
      userService.saveUser(user);
    }
  }, [user]);

  function onLogout() {
    clearCurrentUser();
  }

  function onSetUser(newUser) {
    setCurrentUser(newUser);
    //navigate("/");
  }

  return (
    <header className="app-header full main-layout">
      <section className="header-container">
        <h1>React Todo App</h1>
        {user ? (
          <section>
            <Link to={`/user/${user._id}`}>Hello {user.fullname}</Link>
            <button onClick={onLogout}>Logout</button>
            <h1>balance: {user.balance}</h1>
          </section>
        ) : (
          <section>
            <LoginSignup onSetUser={onSetUser} />
          </section>
        )}
        <nav className="app-nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/todo">Todos</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </nav>
      </section>
      <UserMsg />
    </header>
  );
}
