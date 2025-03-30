import React, { useState } from "react";
import { PDFDownloadLink, Document, Page, Text } from "@react-pdf/renderer";
import { Card, CardContent, Typography, Button, TextField, Grid, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import Navbar from '../Nav/Navbar';
import Footer from '../Nav/Footer';


// Initial hardcoded data for users and their fines
const initialUsers = [
  { id: 1, name: "Kamal Perera", nic: "123456789V", phone: "0771234567", fines: [{ type: "Speeding", amount: 120 }] },
  { id: 2, name: "Nimal Silva", nic: "987654321V", phone: "0719876543", fines: [{ type: "Parking Violation", amount: 60 }] },
  { id: 3, name: "Sunil Fernando", nic: "456789123V", phone: "0754567891", fines: [{ type: "Red Light Violation", amount: 150 }] },
  { id: 4, name: "Chathurika Jayasinghe", nic: "321654987V", phone: "0783216549", fines: [{ type: "DUI", amount: 250 }] },
  { id: 5, name: "Amara Wijesinghe", nic: "654987321V", phone: "0726549873", fines: [{ type: "Reckless Driving", amount: 300 }] },
];

const AI_PredictFine = [
  { id: 1, type: "Speeding", amount: 100 },
  { id: 2, type: "Parking Violation", amount: 50 },
  { id: 3, type: "Red Light Violation", amount: 150 },
  { id: 4, type: "DUI", amount: 200 },
  { id: 5, type: "Reckless Driving", amount: 250 },
  { id: 6, type: "Expired Registration", amount: 75 },
  { id: 7, type: "Seatbelt Violation", amount: 25 },
  { id: 8, type: "Cell Phone Use", amount: 50 },
  { id: 9, type: "Failure to Yield", amount: 100 },
  { id: 10, type: "Driving Without Insurance", amount: 300 },
];

export default function AI() {
  const [users, setUsers] = useState(initialUsers); // Define the users state
  const [newUser, setNewUser] = useState("");
  const [newNic, setNewNic] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newFine, setNewFine] = useState({ type: "", amount: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [fineDialogOpen, setFineDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedFineIndex, setSelectedFineIndex] = useState(null);

  const addUser = () => {
    if (newUser.trim() && newNic.trim() && newPhone.trim()) {
      const newUserObject = {
        id: Date.now(), // Unique ID for the user
        name: newUser.trim(), // Trimmed user name
        nic: newNic.trim(), // NIC from input
        phone: newPhone.trim(), // Phone from input
        fines: [], // Initialize with an empty fines array
      };

      // Update the users state with the new user
      setUsers((prevUsers) => [...prevUsers, newUserObject]);

      // Clear the input fields after adding the user
      setNewUser("");
      setNewNic("");
      setNewPhone("");
    } else {
      // Show an alert if any field is empty
      alert("All fields (Name, NIC, Phone) are required!");
    }
  };

  const handleDeleteUser = (id) => {
    setSelectedUserId(id);
    setDialogOpen(true);
  };

  const confirmDeleteUser = () => {
    setUsers(users.filter((user) => user.id !== selectedUserId));
    setDialogOpen(false);
    setSelectedUserId(null);
  };

  const addFine = (userId) => {
    if (newFine.type.trim() && newFine.amount.trim()) {
      const updatedUsers = users.map((user) => {
        if (user.id === userId) {
          user.fines.push({ type: newFine.type, amount: parseFloat(newFine.amount) });
        }
        return user;
      });
      setUsers(updatedUsers);
      setNewFine({ type: "", amount: "" });
    }
  };

  const confirmDeleteFine = () => {
    if (selectedUserId !== null && selectedFineIndex !== null) {
      const updatedUsers = users.map((user) => {
        if (user.id === selectedUserId) {
          return {
            ...user,
            fines: user.fines.filter((_, index) => index !== selectedFineIndex), // Create a new fines array
          };
        }
        return user;
      });

      setUsers(updatedUsers); // Update the users state
      setFineDialogOpen(false); // Close the confirmation dialog
      setSelectedUserId(null); // Reset the selected user ID
      setSelectedFineIndex(null); // Reset the selected fine index
    } else {
      console.error("Invalid user ID or fine index");
    }
  };

  const handleDeleteFine = (userId, fineIndex) => {
    if (userId !== null && fineIndex !== null) {
      setSelectedUserId(userId);
      setSelectedFineIndex(fineIndex);
      setFineDialogOpen(true); // Open the confirmation dialog
    } else {
      console.error("Invalid user ID or fine index");
    }
  };

  // Filter users based on search query
  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user.phone.includes(query) ||
      user.nic.toLowerCase().includes(query) ||
      user.fines.some((fine) => fine.type.toLowerCase().includes(query))
    );
  });

  return (
    <div>
      {/* Upper Purple Header */}
      <div className="header">
        <p>Welcome to the Online Traffic Fine Payment System</p>
      </div>

      {/* Navigation Bar */}
      <Navbar />
      <Box sx={{ padding: 3, fontFamily: "Arial, sans-serif" }}>
        {/* Search Bar */}
        <TextField
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          label="Search by Phone, NIC, or Fine Type"
          variant="outlined"
          fullWidth
          sx={{ mb: 4, backgroundColor: "white" }}
        />

        {/* Add User */}
          <Grid container spacing={2} mb={4} sx={{ backgroundColor: "#ffffff", padding: 2, borderRadius: 2 }}>
            <Grid item xs={12} sm={4}>
              <TextField
                value={newUser}
                onChange={(e) => setNewUser(e.target.value)}
                label="Enter User Name"
                variant="outlined"
                fullWidth
                sx={{ mb: 4, backgroundColor: "white", borderRadius: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                value={newNic}
                onChange={(e) => setNewNic(e.target.value)}
                label="Enter NIC"
                variant="outlined"
                fullWidth
                sx={{ mb: 4, backgroundColor: "white", borderRadius: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                label="Enter Phone"
                variant="outlined"
                fullWidth
                sx={{ mb: 4, backgroundColor: "white", borderRadius: 1 }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={addUser}
                fullWidth
                sx={{ padding: 1.5, fontSize: "1rem", fontWeight: "bold" }}
              >
                Add User
              </Button>
            </Grid>
          </Grid>

          {filteredUsers
            .slice()
            .sort((a, b) => b.id - a.id)
            .map((user) => (
              <Card key={user.id} sx={{ mb: 4, boxShadow: 3, borderRadius: 2, overflow: "hidden" }}>
                <CardContent sx={{ backgroundColor: "#ffffff", padding: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={8}>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1565c0" }}>
                  {user.nic}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1565c0" }}>
                  {user.name}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1565c0" }}>
                  {user.phone}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                  Predicted Next Fine:{" "}
                  <span style={{ fontWeight: "bold", color: "#d32f2f" }}>
              {AI_PredictFine[Math.floor(Math.random() * AI_PredictFine.length)].type}
                  </span>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                  <PDFDownloadLink
              document={
                <Document>
                  <Page size="A4" style={{ padding: 20, fontFamily: "Helvetica" }}>
                    <Text style={{ fontSize: 20, marginBottom: 10, textAlign: "center" }}>
                Traffic Fine Details
                    </Text>
                    <Text style={{ fontSize: 16, marginBottom: 5 }}>
                Name: {user.name}
                    </Text>
                    <Text style={{ fontSize: 16, marginBottom: 5 }}>
                NIC: {user.nic}
                    </Text>
                    <Text style={{ fontSize: 16, marginBottom: 5 }}>
                Phone: {user.phone}
                    </Text>
                    <Text style={{ fontSize: 16, marginTop: 10, marginBottom: 5 }}>
                Fines:
                    </Text>
                    {user.fines && user.fines.length > 0 ? (
                user.fines.map((fine, index) => (
                  <Text key={index} style={{ fontSize: 14, marginBottom: 3 }}>
                    {index + 1}. {fine.type} - ${fine.amount}
                  </Text>
                ))
                    ) : (
                <Text style={{ fontSize: 14, marginBottom: 3 }}>No fines available</Text>
                    )}
                    <Text style={{ fontSize: 14, marginTop: 20, textAlign: "center" }}>
                Thank you for using the Online Traffic Fine Payment System.
                    </Text>
                  </Page>
                </Document>
              }
              fileName={`${user.name}_fines.pdf`}
                  >
              {({ loading }) =>
                loading ? (
                  <Button variant="outlined" color="primary" disabled>
                    Loading PDF...
                  </Button>
                ) : (
                  <Button variant="outlined" color="primary" sx={{ fontWeight: "bold" }}>
                    Download PDF
                  </Button>
                )
              }
                  </PDFDownloadLink>
                  <Button
              variant="outlined"
              color="error"
              onClick={() => handleDeleteUser(user.id)}
              sx={{ fontWeight: "bold" }}
                  >
              Delete User
                  </Button>
                </Box>
              </Grid>
            </Grid>
                <Box sx={{ mt: 3 }}>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    Add Fine
                  </Typography>
                  <Grid container spacing={2} mb={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        value={newFine.type}
                        onChange={(e) => setNewFine({ ...newFine, type: e.target.value })}
                        label="Fine Type"
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        value={newFine.amount}
                        onChange={(e) => setNewFine({ ...newFine, amount: e.target.value })}
                        label="Fine Amount"
                        variant="outlined"
                        type="number"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => addFine(user.id)}
                    fullWidth
                    sx={{ mb: 2 }}
                  >
                    Add Fine
                  </Button>

                  {/* Display Fines */}
                  {user.fines.length > 0 && (
                    <Box>
                      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                        Fines:
                      </Typography>
                      {user.fines.map((fine, index) => (
                        <Grid container spacing={2} key={index} alignItems="center" sx={{ mb: 1 }}>
                          <Grid item xs={8}>
                            <Typography>{fine.type} - ${fine.amount}</Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Button
                              variant="outlined"
                              color="error"
                              onClick={() => handleDeleteFine(user.id, index)}
                              fullWidth
                            >
                              Delete Fine
                            </Button>
                          </Grid>
                        </Grid>
                      ))}
                    </Box>
                  )}
                </Box>
              </CardContent>
            </Card>
          ))}
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>Are you sure you want to delete this user?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={confirmDeleteUser} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        {/* Fine Delete Confirmation Dialog */}
        <Dialog open={fineDialogOpen} onClose={() => setFineDialogOpen(false)}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this fine?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setFineDialogOpen(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={confirmDeleteFine} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      {/* Footer */}
      <Footer />
    </div>
  );
}
