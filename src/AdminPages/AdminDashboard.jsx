import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PeopleIcon from '@mui/icons-material/People';
import RateReviewIcon from '@mui/icons-material/RateReview';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import AdminProducts from './AdminProducts';
import { Routes, Route, useNavigate } from 'react-router-dom';
import AdminHome from './AdminHome';
import Users from './Users';
import AdminOrders from './AdminOrders';
import PaymentsIcon from '@mui/icons-material/Payments';
import AdminPayments from './AdminPayments';
import AdminRating from './AdminRating';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  backgroundColor: '#1e1e2f',
  color: '#fff',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  backgroundColor: '#1e1e2f',
  color: '#fff',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 2),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: '#ffff',
  color: '#1e1e2f', // Add the missing comma here
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open
      ? {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        }
      : {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        }),
  })
);

const NavItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin-dashboard' },
  { text: 'Products', icon: <ShoppingCartIcon />, path: '/admin-dashboard/admin-products' },
  { text: 'Orders', icon: <ListAltIcon />, path: '/admin-dashboard/admin-orders' },
  { text: 'Payments', icon: <PaymentsIcon />, path: '/admin-dashboard/admin-Payments' },
  { text: 'Users', icon: <PeopleIcon />, path: '/admin-dashboard/admin-users' },
  { text: 'Reviews', icon: <RateReviewIcon />, path: '/admin-dashboard/admin-ratings' },

];

export default function AdminDashboard() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleLogout = () => {
    localStorage.clear();
    
  
    navigate('/', { replace: true });
    window.location.reload(); // Force re-evaluate App routing based on localStorage
  };
  

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ marginRight: 5, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            E-Cart Admin
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{ textTransform: 'none' }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Typography variant="h6" sx={{ color: 'white' }}>
            Admin Panel
          </Typography>
          <IconButton onClick={handleDrawerClose} sx={{ color: 'white' }}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
        <List>
          {NavItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{ minHeight: 48, px: 2.5, color: 'white' }}
                onClick={() => navigate(item.path)}
              >
                <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} sx={{ color: 'white' }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, backgroundColor: '#f5f6fa', minHeight: '100vh' }}
      >
        <DrawerHeader />
       
       
          <Routes>
            <Route index element={<AdminHome />} />
            <Route path="/admin-products" element={<AdminProducts />} />
            <Route path="/admin-orders" element={<AdminOrders />} />
            <Route path="/admin-Payments" element={<AdminPayments />} />
            <Route path="/admin-users" element={<Users />} />
            <Route path="/admin-ratings" element={<AdminRating />} />
      

          </Routes>
        
      </Box>
    </Box>
  );
}
