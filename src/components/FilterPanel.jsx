import React, { useState, useEffect } from 'react';
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

const FilterPanel = ({ categories, priceRange, onCategoryChange, onPriceRangeChange, onReset }) => {
  const [localCategories, setLocalCategories] = useState(categories);
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);

  // Update local state when props change
  useEffect(() => {
    setLocalCategories(categories);
  }, [categories]);

  useEffect(() => {
    setLocalPriceRange(priceRange);
  }, [priceRange]);

  const handleCategoryChange = (event) => {
    const { name, checked } = event.target;
    const updatedCategories = {
      ...localCategories,
      [name]: checked,
    };
    setLocalCategories(updatedCategories);
    onCategoryChange(updatedCategories);
  };

  const handleSliderChange = (event, newValue) => {
    setLocalPriceRange(newValue);
    onPriceRangeChange(newValue);
  };

  const handleReset = () => {
    onReset();
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
      <Accordion defaultExpanded disableGutters elevation={0}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 0 }}>
          <Typography fontWeight={600}>Price Range</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" sx={{ mb: 1 }}>
            LKR{localPriceRange[0]} - LKR{localPriceRange[1]}
          </Typography>
          <Slider
            value={localPriceRange}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            min={0}
            max={1000000}
            step={500}
            sx={{ color: '#1976d2' }}
          />
        </AccordionDetails>
      </Accordion>

      <Divider sx={{ my: 1 }} />

      {/* Categories Accordion - Dynamic based on API data */}
      <Accordion defaultExpanded disableGutters elevation={0}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 0 }}>
          <Typography fontWeight={600}>Categories</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {Object.keys(localCategories).map((category) => (
              <FormControlLabel
                key={category}
                control={
                  <Checkbox
                    checked={localCategories[category]}
                    onChange={handleCategoryChange}
                    name={category}
                  />
                }
                label={category.charAt(0).toUpperCase() + category.slice(1)}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      <Divider sx={{ my: 2 }} />

      {/* Reset Button */}
      <Button
        variant="contained"
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