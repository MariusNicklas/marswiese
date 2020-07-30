import React, { useContext } from 'react';
// @material-ui/icons
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LogoutIcon from '@material-ui/icons/ExitToApp';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import { Link, withRouter } from 'react-router-dom';
// core components
import CustomDropdown from '../../components/CustomDropdown/CustomDropdown';

import { logout } from '../../APIUtils';
import UserContext from '../../context/UserContext';

import styles from 'assets/jss/material-kit-pro-react/components/headerLinksStyle.js';

const useStyles = makeStyles(styles);

const HomeItem = props => {
  const classes = useStyles();
  const { userData } = useContext(UserContext);

  return (
    <CustomDropdown
      //dropdownHeader="Dropdown header"
      buttonText={userData.firstName + ' ' + userData.lastName}
      buttonProps={{
        round: true,
        color: 'transparent'
      }}
      dropPlacement="bottom"
      dropdownList={[
        <Link
          to="/profil"
          className={classes.dropdownLink}
          onClick={e => console.log('in HomeItem: onClick event ' + e)}
        >
          <AccountCircleIcon className={classes.dropdownIcons} /> Profil
        </Link>,

        { divider: true },
        <Link to="/" className={classes.dropdownLink} onClick={() => logout()}>
          <LogoutIcon className={classes.dropdownIcons} /> Abmelden
        </Link>
      ]}
    >
      <AccountCircleIcon />
    </CustomDropdown>
  );
};

export default withRouter(HomeItem);
