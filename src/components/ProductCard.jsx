import React, { useState } from "react";
import "./components.css";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Dialog,
  DialogContent,
  DialogActions,
  IconButton
} from "@mui/material";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import InventoryIcon from "@mui/icons-material/Inventory";
import CloseIcon from "@mui/icons-material/Close";
import Rating from '@mui/material/Rating';

const ProductCard = ({
  productId,
  userId,
  image,
  category,
  title,
  description,
  price,
  qty,
  onAddToCart,
  averageRating = 0,
  totalRatings = 0,
  userRating = 0,
  onRatingSubmit
}) => {
  const [expanded, setExpanded] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [tempRating, setTempRating] = useState(userRating);

  const handleRatingChange = (event, newValue) => {
    if (newValue !== null) {
      setTempRating(newValue);
    }
  };

  const handleRatingSubmit = () => {
    if (onRatingSubmit && tempRating > 0) {
      onRatingSubmit(productId, tempRating);
    }
  };

  const handleExpandClick = (e) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };
  
  const handleOpenModal = () => {
    setOpenModal(true);
    setTempRating(userRating); // Reset temp rating to user's current rating
  };
  
  const handleCloseModal = () => {
    setOpenModal(false);
    setTempRating(userRating); // Reset temp rating when closing without submitting
  };

  const formattedPrice =
    price && !isNaN(price) ? `LKR ${price.toLocaleString()}` : "LKR 0";

  // Determine stock status for visual indication
  const getStockStatus = () => {
    if (!qty || qty <= 0) return { label: "Out of Stock", color: "error" };
    if (qty <= 5) return { label: "Low Stock", color: "warning" };
    return { label: `In Stock: ${qty}`, color: "success" };
  };

  const stockStatus = getStockStatus();
  const isOutOfStock = !qty || qty <= 0;
  
  // Determine if description needs a "Read More" button
  const isLongDescription = description && description.length > 60;
  const displayDescription = isLongDescription 
    ? `${description.substring(0, 60)}...` 
    : description;

  return (
    <>
      <Card
        sx={{
          width: 260,
          height: 340,
          borderRadius: 3,
          position: "relative",
          boxShadow: 2,
          display: "flex",
          flexDirection: "column",
          transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: 4,
          },
        }}
      >
        {/* Image Container - Fixed height */}
        <Box
          sx={{
            position: "relative",
            height: 150,
            bgcolor: "#ffff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            cursor: "pointer",
          }}
          onClick={handleOpenModal}
        >
          {image ? (
            <img
              className="proImages"
              src={image}
              alt={title}
              style={{ 
                height: "100%", 
                width: "100%", 
                objectFit: "contain", 
                maxWidth: "90%",
                maxHeight: "90%"
              }}
            />
          ) : (
            <Typography variant="body2" color="text.secondary">
              Product Image
            </Typography>
          )}

          {/* Stock indicator in top left corner */}
          <Chip
            icon={<InventoryIcon fontSize="small" />}
            label={stockStatus.label}
            color={stockStatus.color}
            size="small"
            sx={{
              position: "absolute",
              top: 5,
              left: 5,
              fontSize: "0.7rem",
            }}
          />
        </Box>

        {/* Card Content */}
        <CardContent
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            p: 2,
            pb: "16px !important",
          }}
        >
          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ textTransform: "uppercase", fontSize: "0.65rem", display: "block" }}
            >
              {category}
            </Typography>

            <Typography
              variant="subtitle1"
              fontWeight={600}
              sx={{ 
                fontSize: "1rem", 
                mt: 0.5,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                lineHeight: 1.3,
                cursor: "pointer",
              }}
              onClick={handleOpenModal}
            >
              {title}
            </Typography>

            <Box sx={{ position: "relative", mt: 0.5 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ 
                  fontSize: "0.75rem",
                  lineHeight: 1.4,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  height: 32,
                }}
              >
                {displayDescription}
              </Typography>
              
              {isLongDescription && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    mt: 0.5
                  }}
                >
                  <Button
                    size="small"
                    onClick={handleOpenModal}
                    sx={{ 
                      minHeight: 0,
                      minWidth: "auto",
                      p: "2px 5px",
                      fontSize: "0.7rem",
                      color: "primary.main",
                      textTransform: "none",
                      lineHeight: 1,
                    }}
                  >
                    Read More
                  </Button>
                </Box>
              )}
            </Box>
          </Box>

          {/* Display average rating (read-only) */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
            <Rating
              name="average-rating-display"
              value={averageRating}
              readOnly
              precision={0.1}
              sx={{
                fontSize: 18
              }}
            />
            <Typography variant="caption" color="text.secondary">
              
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: "auto",
              pt: 1,
              borderTop: "1px solid rgba(0,0,0,0.05)",
            }}
          >
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{ fontSize: "0.9rem" }}
            >
              {formattedPrice}
            </Typography>

            <Button
              variant="outlined"
              size="small"
              startIcon={<ShoppingCartCheckoutIcon fontSize="small" />}
              onClick={(e) => {
                e.stopPropagation();
                if (onAddToCart && !isOutOfStock) onAddToCart();
              }}
              disabled={isOutOfStock}
              sx={{
                fontSize: "0.7rem",
                px: 1,
                py: 0.5,
                textTransform: "none",
              }}
            >
              {isOutOfStock ? "Out of Stock" : "Add to Cart"}
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Product Detail Modal */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            overflow: "hidden",
          },
        }}
      >
        <Box sx={{ position: "relative" }}>
          <Box
            sx={{
              height: 250,
              width: "100%",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              bgcolor: "#ffff",
              position: "relative"
            }}
          >
            {image ? (
              <img
                src={image}
                alt={title}
                style={{
                  maxWidth: "90%",
                  maxHeight: "90%",
                  objectFit: "contain",
                }}
              />
            ) : (
              <Typography variant="body1" color="text.secondary">
                Product Image Not Available
              </Typography>
            )}
            
            <Chip
              icon={<InventoryIcon fontSize="small" />}
              label={stockStatus.label}
              color={stockStatus.color}
              size="small"
              sx={{
                position: "absolute",
                top: 16,
                left: 16,
              }}
            />
            
            <IconButton
              onClick={handleCloseModal}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                bgcolor: "rgba(255,255,255,0.7)",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.9)",
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          
          <DialogContent sx={{ pt: 2, pb: 3 }}>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ textTransform: "uppercase" }}
            >
              {category}
            </Typography>
            
            <Typography
              variant="h6"
              component="h2"
              fontWeight={600}
              sx={{ mt: 0.5, mb: 2 }}
            >
              {title}
            </Typography>
            
            <Typography variant="body2" paragraph>
              {description}
            </Typography>
            
            <Typography
              variant="h6"
              fontWeight="bold"
              color="primary"
              sx={{ mt: 2 }}
            >
              {formattedPrice}
            </Typography>
            
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {isOutOfStock ? "Currently out of stock" : `${qty} items available`}
            </Typography>

            {/* Average Rating Display */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Customer Reviews
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <Rating
                  name="average-rating-modal"
                  value={averageRating}
                  readOnly
                  precision={0.1}
                  sx={{ fontSize: 20 }}
                />
                <Typography variant="body2" color="text.secondary">
                  {averageRating.toFixed(1)} out of 5
                </Typography>
              </Box>
            </Box>

            {/* User Rating Submission */}
            {userId && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Rate this product
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Rating
                    name="user-rating-submit"
                    value={tempRating}
                    onChange={handleRatingChange}
                    sx={{ fontSize: 24 }}
                  />
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={handleRatingSubmit}
                    disabled={tempRating === 0 || tempRating === userRating}
                    sx={{ textTransform: "none" }}
                  >
                    {userRating > 0 ? "Update Rating" : "Submit Rating"}
                  </Button>
                </Box>
                {userRating > 0 && (
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: "block" }}>
                    Your current rating: {userRating} stars
                  </Typography>
                )}
              </Box>
            )}
          </DialogContent>
          
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button
              variant="contained"
              startIcon={<ShoppingCartCheckoutIcon />}
              onClick={onAddToCart}
              disabled={isOutOfStock}
              disableElevation
              sx={{ ml: "auto" }}
            >
              {isOutOfStock ? "Out of Stock" : "Add to Cart"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

export default ProductCard;