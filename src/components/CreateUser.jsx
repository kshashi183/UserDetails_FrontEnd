import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../api/baseUrl";
import { useNavigate, useLocation } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const CreateUser = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const editUser = location.state?.user || null;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [navigateAfterSnackbar, setNavigateAfterSnackbar] = useState(false);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);

    if (navigateAfterSnackbar) {
      navigate("/user-details");
    }
  };

  useEffect(() => {
    if (editUser) {
      setFormData({
        title: editUser.title,
        description: editUser.description,
        image: editUser.image,
      });
    }
  }, [editUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevState) => ({
          ...prevState,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editUser) {
        await axios.put(
          `${baseURL}/api/users/updateUser/${editUser._id}`,
          formData
        );
        setSnackbarMessage("User updated successfully!");
        setSnackbarSeverity("success");
      } else {
        await axios.post(`${baseURL}/api/users/createUser`, formData);
        setSnackbarMessage("User created successfully!");
        setSnackbarSeverity("success");
      }
      setSnackbarOpen(true);
      setNavigateAfterSnackbar(true);
    } catch (error) {
      console.error(
        editUser ? "Error updating user:" : "Error creating user:",
        error
      );
      setSnackbarMessage(
        editUser ? "Failed to update user." : "Failed to create user."
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      setNavigateAfterSnackbar(false);
    }
  };

  return (
    <div className="create-user-container col-md-6">
      <h1 className="create-user-title">
        {editUser ? "Edit User" : "Create New User"}
      </h1>
      <form className="create-user-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter description"
            rows="4"
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="image">Upload Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          {formData.image && (
            <div className="image-preview">
              <p>Image Preview:</p>
              <img src={formData.image} alt="Preview" />
            </div>
          )}
        </div>

        <button type="submit" className="submit-btn">
          {editUser ? "Update User" : "Create User"}
        </button>
      </form>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CreateUser;
