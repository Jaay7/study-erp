import React from 'react'
import { Grid, Card, Typography, CardContent, Box, Button, IconButton, Slide, Snackbar } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { useNavigate } from "react-router-dom"
import edusignin from '../assets/images/edusignin.svg'
import axios from 'axios'
import { Visibility, VisibilityOff } from '@mui/icons-material'

function Transition(props) {
  return <Slide {...props} direction="right" />;
}

const useStyles = makeStyles({
  root: {
    height: '100vh',
    boxSizing: 'border-box'
  },
  container: {
    height: '100vh', 
    display: 'flex', 
    alignItems: 'center', 
    width: '100%', 
    flexGrow:1, 
    justifyContent: 'center'
  },
  inputBox: {
    height: '35px',
    padding: 5,
    margin: "20px 0px",
    width: '100%',
    boxShadow: '0px 0px 6px #e2e2e2',
    borderRadius: 10,
    display: 'flex', 
    alignItems: 'center',
  },
  inputF: {
    border: 'none',
    outline: 'none',
    width: '100%',
    fontSize: 14,
    padding: 10,
  },
  buttonz: {
    border: 'none',
    outline: 'none',
    padding: 10,
    color: 'white',
    backgroundColor: '#A51C24',
    margin: "20px 0px",
    width: '100%',
    boxShadow: '0px 0px 6px #e2e2e2',
    borderRadius: 10,
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: '#A51C24d0',
    }
  }
})

const Signin = () => {
  const navigate = useNavigate();
  const classes = useStyles();

  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [snackMsg, setSnackMsg] = React.useState('');
  const [idno, setIdno] = React.useState('')
  const [password, setPassword] = React.useState({
    text: '',
    show: false
  })

  const handleClose = () => {
    setOpenSnackBar(false);
  };

  const signInStudent = async() => {
    await axios.post('http://localhost:5000/login', null, {
      params: {
        collegeid: idno, 
        password: password.text
      }
    }).then(res => {
      if(res.data.status === 200) {
        console.log(res.data)
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('collegeid', res.data.collegeid)
        if(res.pending === true) {
          navigate(`/changePassword/${idno}?forgot=no`)
        } else {
          setOpenSnackBar(true);
          setSnackMsg(res.data.message);
          setTimeout(() => {
            navigate('/')
          }, 1500)
        }
      } else {
        setOpenSnackBar(true);
        setSnackMsg(res.data.message);
      }
    })
    .catch(err => {
      setOpenSnackBar(true);
      setSnackMsg(err.message);
      console.log(err)
    })
  }

  return (
    <div>
      <div className={classes.root}>
        <Grid container spacing={0} columns={9}>
          <Grid item xs={3}>
            <div className={classes.container}>
              <img src={edusignin} alt="edu" height={300} width={300} />
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className={classes.container}>
              <Card variant="outlined" style={{width: '100%', padding: 20}}>
                <CardContent>
                  <Typography gutterBottom variant='h5'>Sign In</Typography>
                    <Box className={classes.inputBox}>
                      <input 
                        name='idno'
                        placeholder='Student Id'
                        value={idno}
                        className={classes.inputF}
                        onChange={(e) => setIdno(e.target.value)}
                      />
                    </Box>
                    <Box className={classes.inputBox}>
                      <input 
                        name='password'
                        placeholder='Password'
                        type={password.show ? 'text' : 'password'}
                        value={password.text}
                        className={classes.inputF}
                        onChange={(e) => setPassword({text: e.target.value})}
                      />
                      <IconButton size="small" onClick={() => setPassword({show: !password.show})}>
                        {password.show ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </Box>
                    <Typography>Forgot Password?</Typography>
                    <Button
                      disabled = {idno === '' || password.text === ''}
                      className={classes.buttonz}
                      onClick={signInStudent}  
                    >SignIn</Button>
                </CardContent>
              </Card>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div style={{height: '100%'}}></div>
          </Grid>
        </Grid>
      </div>
      <Snackbar
        open={openSnackBar}
        onClose={handleClose}
        autoHideDuration={1500}
        TransitionComponent={Transition}
        message={snackMsg}
      />
    </div>
  )
}

export default Signin
