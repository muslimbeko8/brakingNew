import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useUpdateProfileMutation } from "../service/api";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import { Person } from "@mui/icons-material";

const Profile = () => {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [formData, setFormData] = React.useState({
    username: user?.username || "",
    gender: user?.gender || "female",
    email: user?.email || "",
    name: user?.name || "",
    age: user?.age || "",
    image: null,
  });

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async () => {
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    try {
      const result = await updateProfile(data).unwrap();
      setSnackbar({
        open: true,
        message: "Profile updated successfully",
        severity: "success",
      });
      setOpen(false);
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.data?.message || "Failed to update profile",
        severity: "error",
      });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardContent>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Profile
          </Typography>

          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              {user?.image ? (
                <img
                  src={`https://mustafocoder.pythonanywhere.com/api${user.image}`}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                  <Person sx={{ width: 64, height: 64, color: "grey.400" }} />
                </div>
              )}
            </div>

            <div className="w-full space-y-4">
              <div className="grid grid-cols-2 gap-4 text-lg">
                <Typography variant="subtitle1" fontWeight="medium">
                  Username:
                </Typography>
                <Typography variant="body1">{user?.username}</Typography>

                <Typography variant="subtitle1" fontWeight="medium">
                  Gender:
                </Typography>
                <Typography variant="body1">{user?.gender}</Typography>

                <Typography variant="subtitle1" fontWeight="medium">
                  Email:
                </Typography>
                <Typography variant="body1">{user?.email}</Typography>

                <Typography variant="subtitle1" fontWeight="medium">
                  Name:
                </Typography>
                <Typography variant="body1">{user?.name}</Typography>

                <Typography variant="subtitle1" fontWeight="medium">
                  Age:
                </Typography>
                <Typography variant="body1">{user?.age}</Typography>
              </div>
            </div>

            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpen(true)}
              disabled={isLoading}
            >
              Update Profile
            </Button>

            <Dialog
              open={open}
              onClose={() => !isLoading && setOpen(false)}
              maxWidth="sm"
              fullWidth
            >
              <DialogTitle>Update Profile</DialogTitle>
              <DialogContent>
                <div className="space-y-4 py-4">
                  <TextField
                    fullWidth
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    disabled={isLoading}
                    margin="normal"
                  />

                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    row
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                      disabled={isLoading}
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                      disabled={isLoading}
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                      disabled={isLoading}
                    />
                  </RadioGroup>

                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                    margin="normal"
                  />

                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isLoading}
                    margin="normal"
                  />

                  <TextField
                    fullWidth
                    label="Age"
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleChange}
                    disabled={isLoading}
                    margin="normal"
                  />

                  <Button
                    variant="contained"
                    component="label"
                    disabled={isLoading}
                  >
                    Upload Profile Picture
                    <input
                      type="file"
                      hidden
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                  </Button>

                  <div className="flex justify-end space-x-4 mt-4">
                    <Button
                      variant="outlined"
                      onClick={() => setOpen(false)}
                      disabled={isLoading}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleSubmit}
                      disabled={isLoading}
                    >
                      {isLoading ? "Updating..." : "Update"}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Snackbar
              open={snackbar.open}
              autoHideDuration={6000}
              onClose={handleSnackbarClose}
            >
              <Alert
                onClose={handleSnackbarClose}
                severity={snackbar.severity}
                sx={{ width: "100%" }}
              >
                {snackbar.message}
              </Alert>
            </Snackbar>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
