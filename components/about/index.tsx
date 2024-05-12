import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import Header from "../header";

const About = () => {
  return (
    <>
      {/* <Header /> */}
      <div style={{ textAlign: "center", paddingTop: "5rem" }}>
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            <Button
              variant="outlined"
              style={{
                borderRadius: 0,
                padding: "10px 30px",
                marginBottom: "2rem",
              }}
            >
              MY PRODUCT
            </Button>
          </Grid>
        </Grid>

        <Grid container justifyContent="center">
          <Grid item xs={10}>
            <Typography variant="h2" gutterBottom>
              Welcome to our "About Us" page!
            </Typography>
            <Typography variant="body1">
              Our website is built with the goal of providing the best online
              shopping experience for customers. We leverage modern technologies
              like Next.js, Redux, and TypeScript to ensure flexibility,
              performance, and top-notch security for our users.
            </Typography>
          </Grid>
        </Grid>

        <Grid container justifyContent="center" sx={{ my: 4 }}>
          <Grid item xs={10}>
            <Card>
              <CardMedia
                component="img"
                src="https://quotefancy.com/media/wallpaper/3840x2160/7840757-Courtney-Milan-Quote-I-am-small-she-said-but-mighty.jpg"
                alt=""
                sx={{ width: "100%" }}
              />
            </Card>
          </Grid>
        </Grid>

        <Grid container justifyContent="center">
          <Grid item xs={10}>
            <Card sx={{ my: 2 }}>
              <CardContent>
                <Typography variant="h3" gutterBottom>
                  My Team
                </Typography>
                <Typography paragraph>
                  We are committed to delivering the finest online shopping
                  experience to our customers and continuously improving our
                  product to meet every need and expectation. Join us on our
                  journey to explore and discover amazing products on our
                  website!
                </Typography>
                <Grid container spacing={4}>
                  {teamMembers.map((member, index) => (
                    <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
                      <Card>
                        <CardMedia
                          component="img"
                          src={member.imageUrl}
                          alt={member.name}
                          sx={{
                            borderTopLeftRadius: "10px",
                            borderTopRightRadius: "10px",
                          }}
                        />
                        <CardContent
                          sx={{
                            backgroundColor: "#f8f9fa",
                            minHeight: "250px",
                          }}
                        >
                          <Typography
                            variant="subtitle1"
                            fontWeight="600"
                            gutterBottom
                          >
                            {member.name}
                          </Typography>
                          <Typography variant="body2" paragraph>
                            {member.role}
                          </Typography>
                          <Typography
                            variant="body2"
                            style={{ color: "#2feb6d" }}
                          >
                            {member.twitter}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

const teamMembers = [
  {
    name: "Pham Lam Thai (Team Leader)",
    role: "Leads our team and oversees the development and implementation of our e-commerce platform.",
    imageUrl:
      "https://cdnphoto.dantri.com.vn/WbhFvxaImHQw3rjAKFznQQbLlfk=/thumb_w/1020/2024/04/04/lvmh-1712216521030.jpeg",
    twitter: "@dorsm",
  },
  {
    name: "Hoang Van Huan",
    role: "Contributes to frontend and UI/UX development, ensuring a seamless user experience.",
    imageUrl:
      "https://cdnphoto.dantri.com.vn/zQHBV4mwWEmb9aposkJw4DWnRq4=/thumb_w/1020/2024/04/04/1x-1-1712216573520.jpg",
    twitter: "@dorsm",
  },
  {
    name: "Luong Dinh Manh",
    role: "Specializes in backend development, handling server-side logic and database management.",
    imageUrl:
      "https://cdnphoto.dantri.com.vn/eKP_R1GsJVO0VeJ0Hqje28oAj14=/thumb_w/1020/2024/04/04/105510261-1591797492468preview-1712216621604.jpg",
    twitter: "@dorsm",
  },
  {
    name: "Đo Danh Hau",
    role: "Responsible for integrating Redux for state management and ensuring the stability of our application.",
    imageUrl:
      "https://cdnphoto.dantri.com.vn/iW_hYDIVlwzb5CMS8mFgxdFoHC0=/thumb_w/1020/2024/04/04/fb-1712216405812.png",
    twitter: "@dorsm",
  },
];

export default About;
