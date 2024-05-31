
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
import { useNavigate, useLocation, Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';


const drawerWidth = 240;
const navItems = [
    { name: 'Home', path: "/" },
    { name: 'ESC Advisory Services', path: "/esg-advisory-services" },
    { name: 'Measure Carbon Emissions', path: "/measure-ghg-emissions" },
    { name: 'News Room', path: '/blogs' },
    { name: 'About Us', path: '/about-us' }];

const Header = (props) => {
    const { window } = props;
    const navigate = useNavigate()
    const location = useLocation()
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const routeName = location?.pathname

    const handleMenuToggle = (event) => {
        event.stopPropagation();
        setIsMenuOpen(!isMenuOpen);
    };
    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const home = () => {
        navigate('/')
    }

    const drawer = (
        <>
            <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ my: 2, display: "flex", justifyContent: "center", cursor: "pointer" }} onClick={home}>
                    <img src={logo} width={100} alt="logo" />
                </Typography>
                <Divider />
                <List>
                    {navItems.map((item) => (
                        item?.name === 'ESC Advisory Services' ? (
                            <div key={item.name} style={{ display: 'inline', marginLeft: "-15px" }} className='esg_menu'>
                                <Button
                                    className={`text-capitalize fs-6 fw-bold  ${routeName === item?.path ? 'green' : 'text-dark'}`}
                                    onClick={() => navigate(item.path)}
                                >
                                    {item?.name}
                                </Button>
                                <ExpandMoreIcon
                                    className="expand-icon"
                                    onClick={handleMenuToggle}
                                    style={{ cursor: 'pointer' }}
                                />
                                {isMenuOpen && (
                                    <div className='esg_menuItem' style={{ zIndex: "9" }}>
                                        <li style={{ width: "180px", padding: "5px 0", cursor: "pointer" }}>
                                            <Link to="/esg-advisory-services/organisations/" style={{ textDecoration: "none", color: "#000" }}>Organisations</Link>
                                        </li>
                                        <li style={{ width: "180px", padding: "5px 0", cursor: "pointer" }}>
                                            <Link to="/esg-advisory-services/service-providers/" style={{ textDecoration: "none", color: "#000" }}>Agencies</Link>
                                        </li>
                                        <li style={{ width: "180px", padding: "5px 0", cursor: "pointer" }}>
                                            <Link to="/esg-advisory-services/hospitality-industry/" style={{ textDecoration: "none", color: "#000" }}>Hospitality</Link>
                                        </li>
                                        <li style={{ width: "180px", padding: "5px 0", cursor: "pointer" }}>
                                            <Link to="/esg-advisory-services/exhibition-organiser/" style={{ textDecoration: "none", color: "#000" }}>Exhibitions</Link>
                                        </li>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <ListItem key={item.name} disablePadding>
                                <ListItemButton onClick={() => navigate(item.path)} className='text-dark'>
                                    <ListItemText primary={item.name} />
                                </ListItemButton>
                            </ListItem>
                        )
                    ))}
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate('/login')} className='text-dark'>
                            <Button className='text-capitalize w-100 fs-6 ' style={{ backgroundColor: "#fff", color: "#4ABD43", border: "1px solid #4ABD43", marginLeft: "15px" }}>
                                login
                            </Button>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </>
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
                        sx={{ flexGrow: 1, display: { md: 'flex' }, cursor: "pointer" }}
                        onClick={home}
                    >
                        <img src={logo} width={"120px"} alt="logo" />
                    </Typography>
                    <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                        {navItems.map((item) => (
                            item?.name === 'ESC Advisory Services' ? (
                                <div key={item.name} style={{ display: 'inline' }} className='esg_menu'>
                                    <Button
                                        className={` text-capitalize  fs-6 mx-1 ${routeName === item?.path ? 'green' : 'text-dark'}`}
                                        onClick={() => navigate(item.path)}
                                    >
                                        {item?.name}<ExpandMoreIcon />
                                    </Button>
                                    <div className='esg_menuItem'>
                                        <li style={{ width: "180px", padding: "5px 0", cursor: "pointer" }} ><Link to="/esg-advisory-services/organisations/" style={{ textDecoration: "none", color: "#000" }}>Organisations</Link></li>
                                        <li style={{ width: "180px", padding: "5px 0", cursor: "pointer" }} ><Link to="/esg-advisory-services/service-providers/" style={{ textDecoration: "none", color: "#000" }}>Agencies</Link></li>
                                        <li style={{ width: "180px", padding: "5px 0", cursor: "pointer" }} ><Link to="/esg-advisory-services/hospitality-industry/" style={{ textDecoration: "none", color: "#000" }}>Hospitality</Link></li>
                                        <li style={{ width: "180px", padding: "5px 0", cursor: "pointer" }} ><Link to="/esg-advisory-services/exhibition-organiser/" style={{ textDecoration: "none", color: "#000" }}>Exhibitions</Link></li>
                                    </div>
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
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
            <Box component="main" >
                <Toolbar />

            </Box>
        </Box>
    );
}

Header.propTypes = {
    window: PropTypes.func,
};

export default Header;
