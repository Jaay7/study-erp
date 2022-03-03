import React from "react";
import { AppBar, Toolbar, Typography, CssBaseline, useScrollTrigger, Slide, IconButton, Box, SwipeableDrawer, Icon } from "@mui/material"
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { Global } from "@emotion/react";
import { styled } from '@mui/material/styles';
import { grey } from "@mui/material/colors";
import { Link } from "react-router-dom";

const drawerBleeding = 56;

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: '#D32F2F',
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));

const useStyles = makeStyles({
  tabbar: {
    height: '50px',
    display: 'flex',
    justifyContent: 'center',
  }
})

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const BottomItems = [
  {name: "Home", icon: "home", route: "/"},
  {name: "Academic Registration", icon: "account_balance", route: "/academic-registration"},
  {name: "Fee Payments", icon: "credit_card", route: "/fee-payment"},
  {name: "Attendance Register", icon: "today", route: "/attendance-register"},
  {name: "Courses", icon: "subject", route: ""},
  {name: "End Exam Result", icon: "lock", route: ""},
  {name: "Hostel Management", icon: "hotel", route: ""},
  {name: "My CGPA", icon: "leaderboard", route: ""},
  {name: "Profile", icon: "person", route: "/profile"},
  {name: "Quizes", icon: "quiz", route: ""},
  {name: "Take an Exam", icon: "note_alt", route: ""},
  {name: "Ticketing Support", icon: "help", route: ""},
  {name: "Time Tables", icon: "event_note", route: ""},
  {name: "Feedback", icon: "feedback", route: ""},
]

const Header = (props) => {
  const classes = useStyles();
  let collegeid = localStorage.getItem('collegeid');

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return(
    <React.Fragment>
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      />
      <HideOnScroll {...props}>
        <AppBar className={classes.tabbar}>
          <Toolbar style={{backgroundColor: '#A51C24'}}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography>Study</Typography>
            <span style={{flexGrow: 1}}></span>
            <Typography>{collegeid}</Typography>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      <SwipeableDrawer
        // container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0,
            backgroundColor: '#FFFBEE',
          }}
        >
          <Puller />
          <Typography sx={{ p: 2, color: 'text.primary', fontSize: 18 }}>Study</Typography>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: '100%',
            overflow: 'auto',
            backgroundColor: '#FFFBEE',
          }}
        >
          <div style={{display: 'flex', flexWrap: 'wrap', alignSelf: 'center', width: '100%'}}>
          {BottomItems.map((item, index) => (
            <Box component={Link} to={item.route} key={index} sx={{ p: 1, cursor: 'pointer', width: 'max-content', borderRadius: "8px", display: 'flex', flexDirection: "row", margin: "6px", justifyContent: "center", alignItems: "center", textAlign: "center", boxShadow: "3px 3px 8px #12121220", backgroundColor: '#f0cdce', textDecoration: 'none'}} onClick={ toggleDrawer(false)}>
              <IconButton>
                <Icon baseClassName="material-icons-round" style={{color: '#D32F2F'}}>{item.icon}</Icon>
              </IconButton>
              <Typography style={{color: '#121212'}}>{item.name}</Typography>
            </Box>
          ))}
          </div>
          {/* <Skeleton variant="rectangular" height="100%" /> */}
        </StyledBox>
      </SwipeableDrawer>
    </React.Fragment>
  )
}

export default Header