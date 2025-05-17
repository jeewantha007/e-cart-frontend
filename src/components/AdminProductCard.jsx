import React from 'react';
import { Card, CardContent, Typography, IconButton, Box, Chip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InventoryIcon from '@mui/icons-material/Inventory';

const AdminProductCard = ({
  image,
  category,
  title,
  description,
  price,
  qty,
  onEdit,
  onDelete,
}) => {
  const formattedPrice = price && !isNaN(price)
    ? `LKR ${price.toLocaleString()}`
    : 'LKR 0';

  const getStockStatus = () => {
    if (!qty || qty <= 0) return { label: "Out of Stock", color: "error" };
    if (qty <= 5) return { label: "Low Stock", color: "warning" };
    return { label: `In Stock: ${qty}`, color: "success" };
  };

  const stockStatus = getStockStatus();

  return (
    <Card
      sx={{
        width: 260,
        height: 380,
        borderRadius: 3,
        position: 'relative',
        boxShadow: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Image */}
      <Box
        sx={{
          position: 'relative',
          height: 150,
          bgcolor: '#f3f4f6',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {image ? (
          <img className="proImages" src={image} alt={title} style={{ maxHeight: '100%', width: '100%' }} />
        ) : (
          <Typography variant="body2" color="text.secondary">
            Product Image
          </Typography>
        )}

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

      {/* Content */}
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ textTransform: 'uppercase', fontSize: '0.65rem' }}
          >
            {category}
          </Typography>

          <Typography variant="subtitle1" fontWeight={600} sx={{ fontSize: '1rem', mt: 0.5 }}>
            {title}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontSize: '0.75rem' }}>
            {description}
          </Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold" sx={{ fontSize: '1rem' }}>
            {formattedPrice}
          </Typography>

          <Typography variant="caption" color="text.secondary">
            Qty: {qty}
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
            <IconButton onClick={onEdit} color="primary">
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton onClick={onDelete} color="error">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AdminProductCard;
