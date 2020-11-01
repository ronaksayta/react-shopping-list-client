import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import RegistrationModal from './auth/RegistrationModal';
import Logout from './auth/Logout';
import Login from './auth/LoginModal';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  link: {
    color: 'white',
    '&:hover': {
      textDecoration: 'none'
    },
    [theme.breakpoints.down('md')]: {
      color: 'black'
    }
  },
  inputRoot: {
    color: 'inherit',
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  displayName: {
    marginTop: '0.4rem'
  }
}));

export default function AppNavbar() {

  const { isAuthenticated, user } = useSelector(state => (
    {
      isAuthenticated: state.auth.isAuthenticated,
      user: state.auth.user
    }));



  const classes = useStyles();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const authLinksDesktop = (
    <Fragment>
      <span className = {classes.displayName}>
        <Typography variant="button">{user ? `Welcome ${user.name}` : ''}</Typography>
      </span>
      <Logout />
    </Fragment>
  );

  const guestLinksDesktop = (
    <Fragment>
      <RegistrationModal />
      <Login />
    </Fragment>
  );


  const authLinksMobile = (
    <MenuItem key = "logoutButton">
      <Logout />
    </MenuItem>
  );

  const guestLinksMobile = [

    <MenuItem key = "loginButton">
      <Login />
    </MenuItem>,
    <MenuItem key = "registrationButton">
      <RegistrationModal />
    </MenuItem>

  ];

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >

      {isAuthenticated ? authLinksMobile : guestLinksMobile}

    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" noWrap>
            Shopping List
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {isAuthenticated ? authLinksDesktop : guestLinksDesktop}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
}
