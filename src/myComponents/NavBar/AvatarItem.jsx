import React from "react";
import PropTypes from "prop-types";
// @material-ui/icons
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import IconButton from "@material-ui/core/IconButton";
// @material-ui/core components
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const AvatarItem = props => {
  const { dispatch } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenuOpen}
        color="inherit"
      >
        <ArrowDropDownIcon />
      </IconButton>

      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={e => {
            handleMenuClose();
            dispatch({ type: "logout" });
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

AvatarItem.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default AvatarItem;
