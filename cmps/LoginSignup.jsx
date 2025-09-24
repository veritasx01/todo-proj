import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { userService } from "../services/user.service.js";

const { useState } = React;

export function LoginSignup({ onSetUser }) {
  const [isSignup, setIsSignUp] = useState(false);
  const [credentials, setCredentials] = useState(
    userService.getEmptyCredentials()
  );

  function handleChange({ target }) {
    const { name: field, value } = target;
    setCredentials((prevCreds) => ({ ...prevCreds, [field]: value }));
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    onLogin(credentials);
  }

  function onLogin(credentials) {
    isSignup ? signup(credentials) : login(credentials);
  }

  function login(credentials) {
    userService
      .login(credentials)
      .then((cred) => {
        onSetUser(cred);
        showSuccessMsg("Logged in successfully");
      })
      .catch((err) => {
        showErrorMsg("Oops try again");
      });
  }

  function signup(credentials) {
    userService
      .signup(credentials)
      .then(onSetUser)
      .then(() => {
        showSuccessMsg("Signed in successfully");
      })
      .catch((err) => {
        showErrorMsg("Oops try again");
      });
  }

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
          autoFocus
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          autoComplete="off"
        />
        {isSignup && (
          <input
            type="text"
            name="fullname"
            placeholder="Full name"
            onChange={handleChange}
            required
          />
        )}
        <button>{isSignup ? "Signup" : "Login"}</button>
      </form>

      <div className="btns">
        <a onClick={() => setIsSignUp(!isSignup)}>
          {isSignup ? "Already a member? Login" : "New user? Signup here"}
        </a>
      </div>
    </div>
  );
}
