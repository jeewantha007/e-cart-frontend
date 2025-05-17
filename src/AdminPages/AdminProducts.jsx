import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Modal, Typography, Grid, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import './adminProducts.css';
import AdminProductCard from '../components/AdminProductCard';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default function AdminProducts() {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleOpen = () => {
    setEditMode(false);
    setProduct({
      name: '',
      price: '',
      description: '',
      category: '',
      qty: '',  // Added qty field with empty initial value
      image: null,
    });
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    image: null,
    category: '',
    qty: '',  // Added qty field with empty initial value
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/products/getAll');
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setProduct((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price);
    formData.append('description', product.description);
    formData.append('category', product.category);
    formData.append('qty', product.qty); // Added qty field to form data
    formData.append('image', product.image);

    try {
      const response = await axios.post('http://localhost:3000/api/v1/products/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
      alert('Product added!');
      window.location.reload();
    } catch (error) {
      console.error('Error uploading product:', error);
      alert('Upload failed!');
    }
  };

  const handleEditOpen = (product) => {
    setEditMode(true);
    setSelectedProductId(product.id);
    setProduct({
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      qty: product.qty || '', // Include qty with fallback to empty string
      image: null,
    });
    setOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price);
    formData.append('description', product.description);
    formData.append('category', product.category);
    formData.append('qty', product.qty); // Added qty field to form data
    if (product.image) {
      formData.append('image', product.image);
    }
    
    try {
      // Correct URL format with the ID as part of the path
      const response = await axios.put(`http://localhost:3000/api/v1/products/update/${selectedProductId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log(response.data);
      alert('Product updated!');
      window.location.reload();
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Update failed!');
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:3000/api/v1/products/delete/${productId}`);
        alert('Product deleted!');
        window.location.reload();
        setProducts(products.filter((p) => p._id !== productId));
        setFilteredProducts(filteredProducts.filter((p) => p._id !== productId));
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product.');
      }
    }
  };
  

  return (
    <div className="ap-container">
      <div className="ap-top">
      <Box>
      <Button variant="contained" onClick={handleOpen}>
        Add New Product
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" gutterBottom>
            {editMode ? 'Edit Product' : 'Add New Product'}
          </Typography>
          <form onSubmit={editMode ? handleUpdate : handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Product Name"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Price"
                  name="price"
                  type="number"
                  value={product.price}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Stock Quantity"
                  name="qty"
                  type="number"
                  value={product.qty}
                  onChange={handleChange}
                  required
                  inputProps={{ min: 0 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  multiline
                  rows={4}
                  value={product.description}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    label="Category"
                  >
                    <MenuItem value="Electronics">Electronics</MenuItem>
                    <MenuItem value="Clothing">Clothing</MenuItem>
                    <MenuItem value="Footwear">Footwear</MenuItem>
                    <MenuItem value="Accessories">Accessories</MenuItem>
                    <MenuItem value="Home & Kitchen">Home & Kitchen</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" component="label">
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageChange}
                  />
                </Button>
                {product.image && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {product.image.name}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  {editMode ? 'Update Product' : 'Add Product'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </Box>

        <TextField
          id="outlined-basic"
          placeholder="Search products..."
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{
            width: '300px',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon style={{ color: '#1976d2' }} />
              </InputAdornment>
            ),
          }}
        />
      </div>

      <div className="ap-topic">
        <Typography variant="h4" gutterBottom>
          Products
        </Typography>
      </div>

      <div className="ap-rest">
        {filteredProducts.map((product, index) => (
          <AdminProductCard
            key={index}
            product={product}
            image={product.image || ''}
            category={product.category}
            title={product.name}
            description={product.description}
            price={product.price}
            qty={product.qty}  // Added qty to props passed to AdminProductCard
            onEdit={() => handleEditOpen(product)}
            onDelete={() => handleDelete(product.id)}
          />
        ))}
      </div>
    </div>
  );
}