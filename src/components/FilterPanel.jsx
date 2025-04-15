import React, { useState } from 'react';
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
  Divider,
  Slider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/system';

const FilterPanel = () => {
  const [categories, setCategories] = useState({
    electronics: false,
    clothing: false,
    footwear: false,
    accessories: false,
    homeKitchen: false,
  });

  const [priceRange, setPriceRange] = useState([100, 1000]);

  const handleCategoryChange = (event) => {
    setCategories({
      ...categories,
      [event.target.name]: event.target.checked,
    });
  };

  const handleReset = () => {
    setCategories({
      electronics: false,
      clothing: false,
      footwear: false,
      accessories: false,
      homeKitchen: false,
    });
    setPriceRange([100, 1000]);
  };

  const handleSliderChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  return (
    <Box
      sx={{
        width: 250,
        borderRadius: 2,
        border: '1px solid #e0e0e0',
        p: 2,
        bgcolor: '#fff',
      }}
    >
      {/* Price Range Accordion */}
      <Accordion disableGutters elevation={0}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 0 }}>
          <Typography fontWeight={600}>Price Range</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" sx={{ mb: 1 }}>
            ${priceRange[0]} - ${priceRange[1]}
          </Typography>
          <Slider
            value={priceRange}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            min={0}
            max={2000}
            step={50}
            sx={{ color: '#1976d2' }}
          />
        </AccordionDetails>
      </Accordion>

      <Divider sx={{ my: 1 }} />

      {/* Categories Accordion */}
      <Accordion defaultExpanded disableGutters elevation={0}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 0 }}>
          <Typography fontWeight={600}>Categories</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {[
              { name: 'electronics', label: 'Electronics' },
              { name: 'clothing', label: 'Clothing' },
              { name: 'footwear', label: 'Footwear' },
              { name: 'accessories', label: 'Accessories' },
              { name: 'homeKitchen', label: 'Home & Kitchen' },
            ].map((item) => (
              <FormControlLabel
                key={item.name}
                control={
                  <Checkbox
                    checked={categories[item.name]}
                    onChange={handleCategoryChange}
                    name={item.name}
                  />
                }
                label={item.label}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      <Divider sx={{ my: 2 }} />

      {/* Buttons */}
      <Button
        variant="contained"
        fullWidth
        sx={{ mb: 1, fontWeight: 600, textTransform: 'none' }}
      >
        Apply Filters
      </Button>
      <Button
        variant="outlined"
        fullWidth
        onClick={handleReset}
        sx={{ fontWeight: 500, textTransform: 'none' }}
      >
        Reset Filters
      </Button>
    </Box>
  );
};

export default FilterPanel;
