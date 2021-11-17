import React from "react";
import { AppBar, Toolbar, Typography, CssBaseline, useScrollTrigger, Slide } from "@mui/material"
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';

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

const Header = (props) => {
  const classes = useStyles();
  let collegeid = localStorage.getItem('collegeid');

  return(
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar className={classes.tabbar}>
          <Toolbar style={{backgroundColor: '#A51C24'}}>
            <Typography>Study</Typography>
            <span style={{flexGrow: 1}}></span>
            <Typography>{collegeid}</Typography>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </React.Fragment>
  )
}

export default Header