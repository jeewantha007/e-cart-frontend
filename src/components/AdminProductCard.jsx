import React from 'react';
import { Card, CardContent, Typography, IconButton, Button, Box } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const AdminProductCard = ({
  image,
  category,
  title,
  description,
  price,
  onEdit,
  onDelete,
}) => {

  const formattedPrice = price && !isNaN(price)
    ? `LKR ${price.toLocaleString()}`
    : 'LKR 0';

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
      {/* Image Placeholder */}
      <Box
        sx={{
          position: 'relative',
          height: 150,
          bgcolor: '#f3f4f6',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexShrink: 0,
        }}
      >
        {image ? (
          <img className="proImages" src={image} alt={title} style={{ maxHeight: '100%', width: '100%' }} />
        ) : (
          <Typography variant="body2" color="text.secondary">
            Product Image
          </Typography>
        )}
        
      </Box>

      {/* Card Content */}
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

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold" sx={{ fontSize: '1rem' }}>
            {formattedPrice}
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
