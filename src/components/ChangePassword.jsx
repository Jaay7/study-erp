import React from 'react'
import Header from './Layouts/Header'
import { Grid, Card, Typography, CardContent, Box, Button } from "@mui/material"
import { makeStyles } from '@mui/styles';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
const useStyles = makeStyles({
  container: {
    marginTop: 'auto',
    height: '90vh',
  },
  sideBox: {
    height: '90vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    padding: 10,
    margin: "20px 0px",
    width: '100%',
    boxShadow: '0px 0px 6px #e2e2e2',
    borderRadius: 10
  },
  inputF: {
    border: 'none',
    outline: 'none',
    width: '100%',
    fontSize: 14,
  },
  button: {
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

const ChangePassword = (props) => {
  const classes = useStyles()
  const navigate = useNavigate();
  const [password, setPassword] = React.useState('')

  let {collegeid} = useParams();

  const changeStudentPassword = async() => {
    let body = JSON.stringify({password: password})
    await axios.post(`http://localhost:5000/changePassword/${collegeid}`, body)
    .then(res => {
      if(res.data.status === 200) {
        alert('Password Changed Successfully')
        navigate('/')
      } else {
        alert('Password Change Failed')
      }
    })
    .catch(err => {console.log(err)})
  }

  return (
    <div>
      <Header />
      <div className={classes.container}>
        <Grid container spacing={0}>
          <Grid item xs={9}></Grid>
          <Grid item xs={3}>
            <div className={classes.sideBox}>
              <Card variant="outlined" style={{width: '100%', padding: 20}}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Change Password</Typography>
                  <Box className={classes.inputBox}>
                    <input 
                      name='password'
                      placeholder='Password'
                      value={password}
                      className={classes.inputF}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Box>
                  <Button
                    className={classes.button}
                    onClick={changeStudentPassword}  
                  >Change Password</Button>
                </CardContent>
              </Card>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default ChangePassword
