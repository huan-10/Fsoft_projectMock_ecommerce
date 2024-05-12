import React, { useState, useRef } from "react";
import { Grid, Typography, TextField, Button, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Link from "next/link";

const Contact: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const emailInputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOpenSnackbar(true);
    setName("");
    setEmail("");
    setPhone("");
    setSubject("");
    setMessage("");
  };

  const handleEmailClick = () => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div style={{ fontFamily: "-moz-initial" }}>
      <Header />
      <div className="">
        <Grid container justifyContent="center">
          <Grid
            item
            xs={12}
            md={8}
            lg={5}
            style={{ margin: "auto", padding: "24px" }}
          >
            <Typography
              variant="h5"
              style={{
                fontWeight: "700",
                letterSpacing: "3px",
                marginBottom: "30px",
                textAlign: "center",
              }}
            >
              CONTACT US
            </Typography>

            <Typography
              variant="h6"
              style={{
                fontSize: "15px",
                fontWeight: "600",
                marginBottom: "20px",
              }}
            >
              Our Location
            </Typography>
            <Typography variant="body1" style={{ fontSize: "15px" }}>
              17 Duy Tan - Ha Noi - Vietnam
            </Typography>

            <Typography
              variant="h6"
              style={{
                fontSize: "15px",
                fontWeight: "600",
                marginBottom: "20px",
                marginTop: "30px",
              }}
            >
              Business Hours
            </Typography>
            <Typography variant="body1" style={{ fontSize: "15px" }}>
              Monday - Friday: 9am - 5pm
              <br />
              Saturday: 10am - 2pm
              <br />
              Sunday: Closed
            </Typography>

            <Typography
              variant="h6"
              style={{
                fontSize: "15px",
                fontWeight: "600",
                marginBottom: "20px",
                marginTop: "30px",
              }}
            >
              Contact Information
            </Typography>
            <Typography variant="body1" style={{ fontSize: "15px" }}>
              Email: shopify@gmail.com
              <br />
              Phone: +123 456 789
            </Typography>
            <Typography
              variant="body1"
              style={{ fontSize: "15px", fontWeight: "600", marginTop: "30px" }}
            >
              For inquiries, contact us at{" "}
              <span style={{ fontWeight: "400" }}>
                hoangvanhuan2k1@gmail.com
              </span>
            </Typography>

            <Typography
              variant="body1"
              style={{ fontSize: "15px", fontWeight: "600", marginTop: "20px" }}
            >
              If you are interested in influencer opportunities, please apply to
              our Creator Squad HERE.
            </Typography>
          </Grid>
        </Grid>

        <Grid container>
          <Grid
            style={{ margin: "auto" }}
            className="p-4"
            item
            xs={12}
            md={8}
            lg={5}
          >
            <form onSubmit={handleSubmit}>
              <TextField
                label="Your Name"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label="Email Address"
                type="email"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                inputRef={emailInputRef}
              />
              <TextField
                label="Phone Number"
                type="tel"
                variant="outlined"
                fullWidth
                margin="normal"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <TextField
                label="Subject"
                variant="outlined"
                fullWidth
                margin="normal"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
              <TextField
                label="Message"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                margin="normal"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button
                className="my-4"
                variant="contained"
                color="info"
                type="submit"
                style={{ margin: "20px 0" }}
              >
                Submit
              </Button>
            </form>
          </Grid>
        </Grid>
      </div>

      <div
        style={{ backgroundColor: "#cadfe3", borderTop: "1px solid #3d3d3d38" }}
      >
        <div style={{ textAlign: "center", padding: "80px 0" }}>
          <Grid container>
            <Grid
              style={{ margin: "auto" }}
              className=""
              item
              xs={10}
              md={8}
              lg={6}
            >
              <h4
                className="p-3"
                style={{ letterSpacing: "10px", fontWeight: "700" }}
              >
                JUICY & JOYFUL CONTENT
              </h4>
              {/* <p>
                Learn about the SHOP PAY community; stay up-to-date on offers,
                new products, and more-straight to your inbox.
              </p> */}
            </Grid>
          </Grid>
          <Grid container style={{ margin: "10px 0" }}>
            <Grid
              style={{ margin: "auto" }}
              className="p-3"
              item
              xs={8}
              md={6}
              lg={4}
            >
              <Typography
                onClick={handleEmailClick}
                variant="body1"
                style={{
                  display: "inline-block",
                  marginRight: "20px",
                  fontSize: "11px",
                  cursor: "pointer",
                }}
              >
                EMAIL ADDRESS
              </Typography>
              <Link legacyBehavior href="/signin">
                <Button component="a" variant="outlined" color="inherit">
                  <Typography variant="body1" style={{ fontSize: "11px" }}>
                    SIGN UP
                  </Typography>
                </Button>
              </Link>
            </Grid>
          </Grid>
        </div>
      </div>

      <Footer />

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity="success"
        >
          Form submitted successfully!
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default Contact;
