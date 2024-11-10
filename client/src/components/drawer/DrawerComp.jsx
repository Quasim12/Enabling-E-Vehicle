import React, { useState } from 'react';
import { Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Button, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, Link } from 'react-router-dom'; // Add Link import

const PAGES = ["Home", "About Us", "Products", "Contact Us"];
const PATHS = ["/", "/about", "/products", "/contact"];

const DrawerComp = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    const handleLoginClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
                <List>
                    {
                        PAGES.map((page, index) => (
                            <ListItemButton onClick={() => { setOpenDrawer(false); navigate(PATHS[index]); }} key={index}>
                                <ListItemIcon>
                                    <ListItemText>{page}</ListItemText>
                                </ListItemIcon>
                            </ListItemButton>
                        ))
                    }
                </List>
                <Button 
                    variant="contained" 
                    sx={{ 
                        margin: "10px", 
                        background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)", 
                        color: "#fff", 
                        '&:hover': {
                            background: "linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)"
                        }
                    }} 
                    onClick={handleLoginClick}
                >
                    Login
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    MenuListProps={{
                        sx: {
                            backgroundColor: "rgba(255, 255, 255, 0.8)",
                            backdropFilter: "blur(10px)",
                            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                            borderRadius: "8px",
                        },
                    }}
                >
                    <MenuItem 
                        component={Link} 
                        to="/admin" 
                        onClick={() => { handleMenuClose(); setOpenDrawer(false); }}
                        sx={{
                            '&:hover': {
                                backgroundColor: "#f0f0f0",
                            },
                        }}
                    >
                        Admin
                    </MenuItem>
                    <MenuItem 
                        component={Link} 
                        to="/subAdminLogin" 
                        onClick={() => { handleMenuClose(); setOpenDrawer(false); }}
                        sx={{
                            '&:hover': {
                                backgroundColor: "#f0f0f0",
                            },
                        }}
                    >
                        SubAdmin
                    </MenuItem>
                    <MenuItem 
                        component={Link} 
                        to="/dealerLogin" 
                        onClick={() => { handleMenuClose(); setOpenDrawer(false); }}
                        sx={{
                            '&:hover': {
                                backgroundColor: "#f0f0f0",
                            },
                        }}
                    >
                        Dealer
                    </MenuItem>
                </Menu>
            </Drawer>
            <IconButton sx={{ color: 'white', marginLeft: 'auto' }} onClick={() => setOpenDrawer(!openDrawer)}>
                <MenuIcon />
            </IconButton>
        </React.Fragment>
    )
}

export default DrawerComp;