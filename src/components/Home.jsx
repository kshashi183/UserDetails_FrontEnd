import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../api/baseUrl";
import axios from "axios";
import { toast } from "react-toastify";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

// Function to convert base64 to Blob
function base64ToBlob(base64String) {
  // Check if the base64 string has the correct format
  if (!base64String.startsWith("data:image/png;base64,")) {
    throw new Error("Invalid base64 format");
  }

  const base64Data = base64String.split(",")[1];
  if (!base64Data) {
    console.log("Invalid base64 data");
    throw new Error("Invalid base64 string");
  }

  // Clean up the base64 string
  const cleanedBase64Data = base64Data.replace(/[^A-Za-z0-9+/=]/g, "").trim();
  console.log(`Cleaned Base64 length: ${cleanedBase64Data.length}`); // Log cleaned length

  // Decode the cleaned base64 string
  const byteCharacters = atob(cleanedBase64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = new Uint8Array(slice.length);

    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    byteArrays.push(byteNumbers);
  }

  // Return a Blob object for use with object URLs
  const blob = new Blob(byteArrays, { type: "image/png" });
  console.log(`Blob created: size=${blob.size}, type=${blob.type}`); // Log size and type
  return blob;
}

// const Base64ImageViewer = ({ base64String }) => {
//   // Check if the base64 string already includes the data URI prefix
//   const imageSource = base64String.startsWith("data:image")
//     ? base64String
//     : `data:image/png;base64,${base64String}`;

//     return imageSource;

// };

const Home = () => {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState([]); // Store fetched users
  const [imageURLs, setImageURLs] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Control Snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Fetch user details from backend
  const handleSnackbarClose = () => {
    setSnackbarOpen(false); // Close Snackbar
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/users/getAllUsers`);
        setUserDetails(response.data); // Update state with fetched data

        const urls = response.data.map((user, index) => {
          if (user.image) {
            try {
              // Log the Base64 string to verify it's correct
              console.log(`User ${user._id} Image (Base64):`, user.image);
              console.log(
                `Base64 length for user ${user._id}:`,
                user.image.length
              );

              // Convert the base64 string to a Blob
              const blob = base64ToBlob(user.image);
              console.log(`Blob created for user ${user._id}:`, blob);

              // Create an object URL for the Blob
              const imageUrl = URL.createObjectURL(blob);
              return imageUrl;
            } catch (error) {
              console.error(
                `Error converting Base64 for user ${user._id}:`,
                error
              );
              return null; // Return null if the conversion fails
            }
          } else {
            console.warn(`User ${user._id} does not have an image`);
            return null; // Handle case where no image is provided
          }
        });

        // Filter out null URLs if any user doesn't have an image or if conversion failed
        setImageURLs(urls.filter((url) => url !== null));

        console.log("response data", response.data);
      } catch (error) {
        setSnackbarMessage("Failed to fetch user details.");
        setSnackbarOpen(true);
      }
    };
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    navigate("/create-user", { state: { user } });
  };

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${baseURL}/api/users/deleteUser/${id}`);
      alert("User deleted successfully!");

      setUserDetails(userDetails.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Please try again.");
    }
  };
  return (
    <div className="home-container col-md-12">
      <h1 className="home-title">User Details</h1>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <button className="create-btn" onClick={() => navigate("/create-user")}>
        Create User
      </button>
      <table
        className="table
 table-dark"
      >
        <thead>
          <tr>
            <th scope="col">SL_NO</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Image</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {userDetails.map((user, index) => (
            <tr key={user._id} className="table-row">
              <th scope="row" className="centered">
                {index + 1}
              </th>
              <td className="centered">{user.title}</td>
              <td className="centered">{user.description}</td>
              <td className="centered">
                {imageURLs[index] ? (
                  <img
                    src={imageURLs[index]} // Display the converted image from object URL
                    alt="User"
                    className="user-image"
                    width="100"
                    height="100"
                    // You can adjust the size as needed
                    style={{ borderRadius: "10px" }}
                  />
                ) : (
                  <span>No image available</span> // Show this if image is missing
                )}
              </td>
              <td className="centered">
                <button className="edit-btn " onClick={() => handleEdit(user)}>
                  <FaEdit className="action-icon" /> Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => deleteUser(user._id)}
                >
                  <FaTrash className="action-icon" /> Delete
                </button>
              </td>
              ;
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
