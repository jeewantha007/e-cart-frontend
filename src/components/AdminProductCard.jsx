import React, { useState } from 'react';
import { Card, CardContent, Typography, IconButton, Box, Chip, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InventoryIcon from '@mui/icons-material/Inventory';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

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
  const [expanded, setExpanded] = useState(false);
  
  const toggleExpanded = (e) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  const formattedPrice = price && !isNaN(price)
    ? `LKR ${price.toLocaleString()}`
    : 'LKR 0';

  const getStockStatus = () => {
    if (!qty || qty <= 0) return { label: "Out of Stock", color: "error" };
    if (qty <= 5) return { label: "Low Stock", color: "warning" };
    return { label: `In Stock: ${qty}`, color: "success" };
  };

  const stockStatus = getStockStatus();

  // Determine if description needs a "Read More" button
  const isLongDescription = description && description.length > 80;
  const displayDescription = isLongDescription && !expanded 
    ? `${description.substring(0, 80)}...` 
    : description;

  return (
    <Card
      sx={{
        width: 260,
        height: 380, // Fixed height for uniformity
        borderRadius: 3,
        position: 'relative',
        boxShadow: 2,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden', // Prevent content from spilling out
      }}
    >
      {/* Image Container - Fixed height */}
      <Box
        sx={{
          position: 'relative',
          height: 150, // Fixed height
          bgcolor: '#ffff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          flexShrink: 0, // Prevent shrinking
        }}
      >
        {image ? (
          <img 
            className="proImages" 
            src={image} 
            alt={title} 
            style={{ 
              maxHeight: '90%', 
              maxWidth: '90%', 
              objectFit: 'contain' 
            }} 
          />
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

      {/* Content Container - Scrollable if expanded */}
      <CardContent 
        sx={{ 
          height: expanded ? 'auto' : 230, // Fixed height when not expanded
          maxHeight: expanded ? 'none' : 230, // Allow scrolling when expanded
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          p: 2,
          pb: "16px !important", // Override MUI default
          position: 'relative',
          overflow: expanded ? 'visible' : 'hidden',
        }}
      >
        {/* Product Info */}
        <Box sx={{ mb: 1 }}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ 
              textTransform: 'uppercase', 
              fontSize: '0.65rem',
              display: 'block',
            }}
          >
            {category}
          </Typography>

          <Typography 
            variant="subtitle1" 
            fontWeight={600} 
            sx={{ 
              fontSize: '1rem', 
              mt: 0.5,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              lineHeight: 1.3,
            }}
          >
            {title}
          </Typography>
        </Box>

        {/* Description */}
        <Box 
          sx={{ 
            position: 'relative',
            flex: 1,
            overflow: expanded ? 'visible' : 'hidden',
          }}
        >
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              fontSize: '0.75rem',
              lineHeight: 1.4,
            }}
          >
            {displayDescription}
          </Typography>
          
          {isLongDescription && (
            <Box 
              sx={{
                position: expanded ? 'relative' : 'absolute',
                bottom: expanded ? 'auto' : 0,
                left: 0,
                width: '100%',
                textAlign: 'left',
                pt: 0.5,
                pb: expanded ? 0 : 1,
                background: expanded ? 'none' : 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1) 70%)',
              }}
            >
              <Button
                onClick={toggleExpanded}
                size="small"
                sx={{ 
                  minWidth: 'auto', 
                  p: 0.5,
                  fontSize: '0.7rem',
                  color: 'primary.main',
                  textTransform: 'none',
                }}
                endIcon={expanded ? <KeyboardArrowUpIcon fontSize="small" /> : <KeyboardArrowDownIcon fontSize="small" />}
              >
                {expanded ? 'Read Less' : 'Read More'}
              </Button>
            </Box>
          )}
        </Box>

        {/* Price and Actions */}
        <Box 
          sx={{ 
            mt: 'auto', 
            pt: 1,
            borderTop: '1px solid rgba(0,0,0,0.05)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'absolute',
            bottom: 10,
            left: 16,
            right: 16,
            backgroundColor: 'white',
          }}
        >
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ fontSize: '1rem' }}>
              {formattedPrice}
            </Typography>

            <Typography variant="caption" color="text.secondary">
              Qty: {qty}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <IconButton 
              onClick={onEdit} 
              color="primary" 
              size="small"
              sx={{ p: 0.5 }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton 
              onClick={onDelete} 
              color="error" 
              size="small"
              sx={{ p: 0.5 }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </CardContent>

      {/* Modal overlay for expanded state */}
      {expanded && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: 'rgba(0,0,0,0.5)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClick={toggleExpanded}
        >
          <Card
            sx={{
              width: { xs: '90%', sm: 400 },
              maxHeight: '80vh',
              borderRadius: 3,
              position: 'relative',
              boxShadow: 5,
              display: 'flex',
              flexDirection: 'column',
              m: 2,
              overflow: 'hidden',
              zIndex: 1001,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header with image */}
            <Box
              sx={{
                position: 'relative',
                height: 200,
                bgcolor: '#f3f4f6',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
              }}
            >
              {image ? (
                <img 
                  src={image} 
                  alt={title} 
                  style={{ 
                    maxHeight: '90%', 
                    maxWidth: '90%', 
                    objectFit: 'contain' 
                  }} 
                />
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
                  top: 10,
                  left: 10,
                  fontSize: "0.7rem",
                }}
              />

              <IconButton
                onClick={toggleExpanded}
                sx={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  bgcolor: 'rgba(255,255,255,0.8)',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.9)',
                  },
                }}
              >
                <KeyboardArrowUpIcon />
              </IconButton>
            </Box>

            {/* Modal content */}
            <CardContent sx={{ overflow: 'auto', maxHeight: 'calc(80vh - 200px)' }}>
              <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase' }}>
                {category}
              </Typography>

              <Typography variant="h6" fontWeight={600} sx={{ mt: 0.5 }}>
                {title}
              </Typography>

              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  {description}
                </Typography>
              </Box>

              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {formattedPrice}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Qty: {qty}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton onClick={onEdit} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={onDelete} color="error">
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}
    </Card>
  );
};

export default AdminProductCard;