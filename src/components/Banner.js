import {CardMedia, Grid, Typography, Paper} from '@mui/material'
import { Link } from 'react-router-dom'

const Banner = props => {
  console.log(props)

  const btnstyle = { borderRadius: 5, padding: '8px 40px', background: '#000', color: '#e8f5fe', textDecoration: 'none' }
  const paperStyle = { height: 500, background: '#fcfbfa', borderRadius: 1 }
  const alignCenter = {display: 'flex', width: '35vw', justifyContent: 'center', alignItems: 'center'}

  return (
    <Paper className="marginTop" variant="outlined" style={paperStyle}>
      <Grid container spacing={2} columns={12} >
        <Grid item xs={6}>
          <Typography sx={{  marginTop: 15,fontSize: 28, fontWeight: 400, textAlign: 'center' }}>Welcome to Restaurant Recipes!</Typography>
           {!props.loggedIn ? 
           <>
              <Typography sx={{ marginBottom: 3, fontSize: 20, fontWeight: 300, textAlign: 'center' }}>Do you want Sign up or Login</Typography>
          <div style={alignCenter}>
           <Link underline="none" style={btnstyle} to='/register'>Login / Sign Up</Link>
              </div>
            </> : 
           <Typography sx={{ fontSize: 16, fontWeight: 300, textAlign: 'center'}}>Use the navigation to view recipes, edit restaurants and more</Typography>
           } 
          
           </Grid>
      <Grid item xs={6}><CardMedia component="img"
        height="500"
        image="../img/bannerImg.jpeg"
        alt="Restaurant"></CardMedia>
        </Grid>
        </Grid>
        </Paper>
      
    
  )
}

export default Banner