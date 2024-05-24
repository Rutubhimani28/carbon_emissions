
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/images/logo.png';


const drawerWidth = 240;
const navItems = [
    { name: 'Home', path: "/" },
    { name: 'ESC Advisory Services', path: "/measure-ghg-emissions" },
    { name: 'Measure Carbon Emissions', path: "/" },
    { name: 'News Room', path: '/' },
    { name: 'About Us', path: '' }];

const Header = (props) => {
    const { window } = props;
    const navigate = useNavigate()
    const location = useLocation()
    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const routeName = location?.pathname

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2, display: "flex", justifyContent: "center" }}>
                <img src={logo} width={100} alt="logo" />
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.name} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav" style={{ backgroundColor: "#fff" }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { md: 'none' }, color: "#4ABD43", order: "1" }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { md: 'flex' } }}
                    >
                        <img src={logo} width={"120px"} alt="logo" />
                    </Typography>
                    <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                        {navItems.map((item) => (
                            item === 'ESC Advisory Services' ? (
                                <div key={item} style={{ display: 'inline' }}>
                                    <Button
                                        className='text-dark text-capitalize fs-6 mx-1'
                                        onClick={handleMenuClick}
                                    >
                                        {item}<ExpandMoreIcon />
                                    </Button>
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={handleMenuClose}

                                    >
                                        <MenuItem style={{ width: "180px" }} onClick={handleMenuClose}>Organisations</MenuItem>
                                        <MenuItem style={{ width: "180px" }} onClick={handleMenuClose}>Agencies</MenuItem>
                                        <MenuItem style={{ width: "180px" }} onClick={handleMenuClose}>Hospitality</MenuItem>
                                        <MenuItem style={{ width: "180px" }} onClick={handleMenuClose}>Exhibitions</MenuItem>
                                    </Menu>
                                </div>
                            ) : (
                                <>
                                    <Button key={item.name} className={` text-capitalize fs-6 mx-1 ${routeName === item?.path ? 'green' : 'text-dark'}`} onClick={() => navigate(item.path)}>
                                        {item.name}
                                    </Button>

                                </>
                            )
                        ))}
                        <Button onClick={() => navigate('/login')} className='text-capitalize fs-6 ' style={{ backgroundColor: "#fff", color: "#4ABD43", border: "1px solid #4ABD43", marginLeft: "15px" }}>
                            login
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
            <Box component="main" >
                <Toolbar />

            </Box>
        </Box >
    );
}

Header.propTypes = {
    window: PropTypes.func,
};

export default Header;
