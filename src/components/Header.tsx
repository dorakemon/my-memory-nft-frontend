import React, { useState } from "react";

import { AccountCircle } from "@mui/icons-material";
import {
  AppBar,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from "@mui/material";

const Header = (props: { address: string; balance: string }) => {
  const { address, balance } = props;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#666666" }}>
      <Container>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            // noWrap
            component="div"
            pl="5vw"
          >
            Memorial NFT
          </Typography>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
            style={{ position: "absolute", right: 3 }}
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem disableRipple style={{ fontWeight: "900" }}>
              Shibuya test network
            </MenuItem>
            <MenuItem disableRipple>My account</MenuItem>
            <MenuItem disableRipple style={{ fontWeight: "700" }}>
              {address}
            </MenuItem>
            <MenuItem disableRipple>My Balance</MenuItem>
            <MenuItem disableRipple style={{ fontWeight: "700" }}>
              {balance}
            </MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
