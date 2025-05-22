import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Collapse,
  IconButton,
  Avatar,
  useTheme,
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

export default function AdminRating() {
  const theme = useTheme();

  const [products, setProducts] = useState([]);
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [productRatings, setProductRatings] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/ratings/getAll") // Replace with your actual API route
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleToggle = async (productId) => {
    if (expandedProduct === productId) {
      setExpandedProduct(null);
    } else {
      if (!productRatings[productId]) {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/v1/ratings/getEach/${productId}`
          );
          setProductRatings((prev) => ({
            ...prev,
            [productId]: response.data,
          }));
        } catch (error) {
          console.error("Error fetching ratings:", error);
        }
      }
      setExpandedProduct(productId);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom align="center">
        Product Ratings
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#1e1e2f" }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>No</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Image</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Product Name</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Category</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Price</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Qty</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Avg Rating</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Created At</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>User Ratings</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products.map((product, index) => (
              <React.Fragment key={product.id}>
                <TableRow>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Avatar
                      variant="rounded"
                      src={`http://localhost:3000/images/${product.image}`}
                      alt={product.name}
                      sx={{ width: 56, height: 56 }}
                    />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.qty}</TableCell>
                  <TableCell>{product.averageRating} stars</TableCell>
                  <TableCell>{new Date(product.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleToggle(product.id)}>
                      {expandedProduct === product.id ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell colSpan={9} sx={{ paddingBottom: 0, paddingTop: 0 }}>
                    <Collapse in={expandedProduct === product.id} timeout="auto" unmountOnExit>
                      <Box margin={2}>
                        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                          User Ratings
                        </Typography>
                        <Table
                          size="small"
                          sx={{
                            border: `1px solid ${theme.palette.divider}`,
                            borderRadius: 1,
                            "& thead th": {
                              backgroundColor: theme.palette.grey[200],
                              fontWeight: "bold",
                              fontSize: 14,
                              borderBottom: `2px solid ${theme.palette.divider}`,
                            },
                            "& tbody tr:nth-of-type(odd)": {
                              backgroundColor: theme.palette.action.hover,
                            },
                            "& tbody td": {
                              fontSize: 13,
                              paddingY: 1.2,
                              borderBottom: `1px solid ${theme.palette.divider}`,
                            },
                          }}
                        >
                          <TableHead>
                            <TableRow>
                              <TableCell>Use ID</TableCell>
                              <TableCell>Rating</TableCell>
                              <TableCell>Date</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {productRatings[product.id]?.length > 0 ? (
                              productRatings[product.id].map((rating, idx) => (
                                <TableRow key={rating.id ||  `${rating.user_id}-${rating.created_at}-${idx}`} >
                                  <TableCell>{rating.user_id}</TableCell>
                                  <TableCell>{rating.rating} stars</TableCell>
                                  <TableCell>{new Date(rating.created_at).toLocaleString()}</TableCell>
                                </TableRow>
                              ))
                            ) : (
                              <TableRow>
                                <TableCell colSpan={3} align="center">
                                  No ratings yet.
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
