import React from "react";

const Signup = () => {
  return (
    <div className="signup-container">
      <div className="form-container shadow">
        <h2 className="text-center ">Sign Up</h2>
        <form>
          {/* Name Field */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your name"
              required
            />
          </div>
          {/* Email Field */}
          <div className="mb-1">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              required
            />
          </div>
          {/* Password Field */}
          <div className="mb-1">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              required
            />
          </div>
          {/* Confirm Password Field */}
          <div className="mb-1">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Confirm your password"
              required
            />
          </div>
          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100">
            Sign Up
          </button>
        </form>
        <p className="text-center mt-1">
          Already have an account?{" "}
          <a href="#!" className="text-decoration-none">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};



export default Signup;
