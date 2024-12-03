import React from "react";

function Welcome() {
  return (
    <div className="welcome-container">
      <h1 className="welcome-heading">Welcome to Our React Application </h1>
      <p className="welcome-subheading">
        Your one-stop solution for efficient and seamless navigation.
      </p>
      <p className="welcome-description">
        Manage your data effortlessly with our platform. Navigate using the
        sidebar to create, read, update, or delete records as needed. We've
        built an intuitive and efficient interface to make your operations
        seamless and productive. Start exploring now and experience the ease of
        data management at your fingertips!
      </p>
      <div className="welcome-footer">
        <p className="welcome-footer-text">
          Need help? Visit our{" "}
          <span className="welcome-link">Support Center</span>.
        </p>
      </div>
    </div>
  );
}

export default Welcome;
