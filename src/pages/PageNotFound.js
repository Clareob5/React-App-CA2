import { useLocation } from 'react-router-dom'
import { CardMedia, Typography, Box, Container } from '@mui/material/'

const PageNotFound = () => {

  let location = useLocation();

  console.log(location)
  return (
    <Container className="marginTop">
    <Box style={{marginTop: 40}}>
        <Typography sx={{ borderBottom: 1, borderColor: 'grey.300', fontSize: 20, fontWeight: 400, textAlign: 'left' }}>Page Not Found: 404 the page {location.pathname} was not found</Typography>
      
      <CardMedia
        component="img"
        height="450px"
        width="100px"
        image="../../img/404.gif"
        alt="Restaurant"
      />
    </Box>
    </Container>
  )
}

export default PageNotFound