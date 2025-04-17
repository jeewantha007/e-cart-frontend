import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Modal,
} from '@mui/material';
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
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    image: null,
    category: '', // Add category to state
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/products/getAll');
        setProducts(response.data);
        setFilteredProducts(response.data); // Set filteredProducts initially to all products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Filter products based on the search term and update filteredProducts
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
    formData.append('category', product.category); // Include category
    formData.append('image', product.image); // the image file

    try {
      const response = await axios.post('http://localhost:3000/api/v1/products/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
      alert('Product added!');
      window.location.reload();
      
      setProduct({
        name: '',
        price: '',
        description: '',
        category: '', // Reset category field
        image: null,
      });
    } catch (error) {
      console.error('Error uploading product:', error);
      alert('Upload failed!');
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
                Add New Product
              </Typography>
              <form onSubmit={handleSubmit}>
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
                  <Grid item xs={12}>
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
                    <TextField
                      fullWidth
                      label="Category"
                      name="category"
                      value={product.category}
                      onChange={handleChange}
                    />
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
                    <Button fullWidth variant="contained" color="primary" type="submit" onClick={handleSubmit}>
                      Add Product
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
            image={product.image ? product.image : ''}
            category={product.category}
            title={product.name}
            description={product.description}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
}
