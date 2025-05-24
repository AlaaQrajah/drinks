import React from "react";
import "../../styles/LoginHero.css";

const LoginHero = () => {
  return (
    <div className="login-container">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>

      <form>
        <h3>Login Hero</h3>

        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Email or Phone"
          id="username"
          required
        />

        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Password" id="password" required />

        <button type="submit">Log In</button>

        <div className="social">
          <div className="go">
            <i className="fab fa-google"></i> Google
          </div>
          <div className="fb">
            <i className="fab fa-facebook"></i> Facebook
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginHero;
