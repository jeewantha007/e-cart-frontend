import React, { useState } from "react";
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
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

const ProductCard = ({
  image,
  category,
  title,
  description,
  price,
  onAddToCart,
  handleDislike,
  handleFavorite
}) => {
  const formattedPrice =
    price && !isNaN(price) ? `LKR ${price.toLocaleString()}` : "LKR 0";

  // Track product reaction state - can be "favorite", "dislike" or null
  const [reaction, setReaction] = useState(null);

  // Function to handle dislike button click
  const onDislikeClick = () => {
    // If already disliked, remove the dislike
    if (reaction === "dislike") {
      setReaction(null);
      handleDislike(false); // Pass false to indicate removing dislike
    } 
    // If not disliked, set to dislike and remove any favorite
    else {
      setReaction("dislike");
      handleDislike(true); // Pass true to indicate adding dislike
    }
  };

  // Function to handle favorite button click
  const onFavoriteClick = () => {
    // If already favorited, remove the favorite
    if (reaction === "favorite") {
      setReaction(null);
      handleFavorite(false); // Pass false to indicate removing from favorites
    } 
    // If not favorited, set to favorite and remove any dislike
    else {
      setReaction("favorite");
      handleFavorite(true); // Pass true to indicate adding to favorites
    }
  };

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

        {/* Fixed positioning for consistent button placement */}
        <Box sx={{ position: "absolute", top: 5, right: 8, display: "flex" }}>
          <IconButton
            aria-label="add to favorites"
            onClick={onFavoriteClick}
          >
            {reaction === "favorite" ? (
              <FavoriteIcon fontSize="small" color="primary" /> 
            ) : (
              <FavoriteBorderIcon fontSize="small" />
            )}
          </IconButton>

          <IconButton
            aria-label="dislike product"
            onClick={onDislikeClick}
          >
            {reaction === "dislike" ? (
              <ThumbDownIcon fontSize="small" color="error" />
            ) : (
              <ThumbDownOffAltIcon fontSize="small" />
            )}
          </IconButton>
        </Box>
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