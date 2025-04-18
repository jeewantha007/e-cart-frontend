import React from "react";
import "./components.css";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

const ProductCard = ({
  image,
  category,
  title,
  description,
  price,
  onAddToCart,
}) => {
  const formattedPrice =
    price && !isNaN(price) ? `LKR ${price.toLocaleString()}` : "LKR 0";

  return (
    <Card
      sx={{
        width: 260,
        height: 340,
        borderRadius: 3,
        position: "relative",
        boxShadow: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Image Placeholder */}
      <Box
        sx={{
          position: "relative",
          height: 150,
          bgcolor: "#f3f4f6",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        {image ? (
          <img
            className="proImages"
            src={image}
            alt={title}
            style={{ maxHeight: "100%", width: "100%" }}
          />
        ) : (
          <Typography variant="body2" color="text.secondary">
            Product Image
          </Typography>
        )}

        <IconButton
          sx={{ position: "absolute", top: 6, right: 6 }}
          aria-label="add to favorites"
        >
          <ThumbDownOffAltIcon fontSize="small" />
        </IconButton>
        <IconButton
          sx={{ position: "absolute", top: 6, right: 6, marginRight: "35px" }}
          aria-label="add to favorites"
        >
          <FavoriteBorderIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Card Content */}
      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ textTransform: "uppercase", fontSize: "0.65rem" }}
          >
            {category}
          </Typography>

          <Typography
            variant="subtitle1"
            fontWeight={600}
            sx={{ fontSize: "1rem", mt: 0.5 }}
          >
            {title}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 0.5, fontSize: "0.75rem" }}
          >
            {description}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{ fontSize: "0.8rem" }}
          >
            {formattedPrice}
          </Typography>
          <Button
            variant="outlined"
            size="small"
            startIcon={<ShoppingCartCheckoutIcon fontSize="small" />}
            onClick={onAddToCart}
          >
            Add to Cart
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
