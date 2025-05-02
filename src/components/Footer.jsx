import React from "react";
import { Box, Container, Typography, Link, Grid } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#333",
        color: "white",
        py: 4,
        mt: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* About */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              E-Cart
            </Typography>
            <Typography variant="body2">
              Your one-stop shop for quality and affordable products.
            </Typography>
          </Grid>

          {/* Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link href="/products" color="inherit" underline="hover" display="block">Products</Link>
            <Link href="/categories" color="inherit" underline="hover" display="block">Categories</Link>
            <Link href="/contact" color="inherit" underline="hover" display="block">Contact Us</Link>
          </Grid>

          {/* Contact */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body2">Email: support@ecart.com</Typography>
            <Typography variant="body2">Phone: +94 77 123 4567</Typography>
          </Grid>

          {/* Social */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Link href="#" color="inherit"><FacebookIcon /></Link>
              <Link href="#" color="inherit"><InstagramIcon /></Link>
              <Link href="#" color="inherit"><TwitterIcon /></Link>
              <Link href="mailto:support@ecart.com" color="inherit"><EmailIcon /></Link>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="body2">
            © {new Date().getFullYear()} E-Cart. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
