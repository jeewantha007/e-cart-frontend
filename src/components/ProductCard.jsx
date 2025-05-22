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
  DialogTitle,
  DialogActions,
  IconButton
} from "@mui/material";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import InventoryIcon from "@mui/icons-material/Inventory";
import CloseIcon from "@mui/icons-material/Close";

const ProductCard = ({
  image,
  category,
  title,
  description,
  price,
  qty,
  onAddToCart
}) => {
  const [expanded, setExpanded] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  
  const handleExpandClick = (e) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };
  
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  
  const handleCloseModal = () => {
    setOpenModal(false);
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
            pb: "16px !important", // Override MUI default
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
                  height: 32, // Fixed height for 2 lines
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
          {/* Image at top of modal */}
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
            
            {/* Stock status in modal */}
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
            
            {/* Close button */}
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
            {/* Category */}
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ textTransform: "uppercase" }}
            >
              {category}
            </Typography>
            
            {/* Title */}
            <Typography
              variant="h6"
              component="h2"
              fontWeight={600}
              sx={{ mt: 0.5, mb: 2 }}
            >
              {title}
            </Typography>
            
            {/* Full description */}
            <Typography variant="body2" paragraph>
              {description}
            </Typography>
            
            {/* Price */}
            <Typography
              variant="h6"
              fontWeight="bold"
              color="primary"
              sx={{ mt: 2 }}
            >
              {formattedPrice}
            </Typography>
            
            {/* Stock info */}
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {isOutOfStock ? "Currently out of stock" : `${qty} items available`}
            </Typography>
          </DialogContent>
          
          <DialogActions sx={{ px: 3, pb: 2 }}>
            {/* Add to cart button */}
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