
import "./components.css";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Button,
  Box,
  Chip,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import InventoryIcon from "@mui/icons-material/Inventory";

const ProductCard = ({
  image,
  category,
  title,
  description,
  price,
  qty,  // Added qty prop
  onAddToCart,
 
}) => {
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
            disabled={isOutOfStock}
          >
            {isOutOfStock ? "Out of Stock" : "Add to Cart"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;