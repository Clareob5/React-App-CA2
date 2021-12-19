import axios from '../../config/index'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Container, Typography } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { DataGrid, GridToolbar, GridOverlay   } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';

import AddRestaurant from '../../components/restaurants/Add'

const Index = props => {
  const [restaurants, setRestaurants] = useState(null)
  const [loading, setLoading] = useState(true)

  //let token = localStorage.getItem('token')
  useEffect(() => {
    axios.get('/restaurants/')
      .then(response => {
        console.log(response.data)
        setRestaurants(response.data.restaurants)
        setLoading(false)
       
      })
      .catch(err => {
        console.log(`Error: ${err}`)
      })
  }, [])

  if (!restaurants) return null


  const columns = [

    { field: 'restaurant_id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: "cuisine", headerName: 'Cuisine', width: 170 },
    { field: 'borough', headerName: 'Borough', width: 200 },
    {
      field: "address",
      headerName: 'Address',
      width: 230,
      renderCell: (params) => {
        return <>{params.row.address.building},{params.row.address.street},{params.row.address.zipcode}</>;
      },
    },
    {
      field: "_id",
      headerName: 'Actions',
      renderCell: (params) => {
        return (
          <>
            {props.loggedIn ?
              <>
                <Link to={`/restaurants/${params.row._id}`}><VisibilityIcon color="primary" /></Link>
                <Link to={`/restaurants/${params.row._id}/edit`}><EditIcon sx={{ color: '#15834c', MArginLeft: 1}} /></Link>
              </> 
              : "No Actions"}
          </>
        );
      }
    }
  ]

  return (
    <>
    { loading ? <CircularProgress className = "loading" /> :
    <Container className="marginTop">      
          <Typography sx={{ marginTop: 5, fontSize: 30, fontWeight: 400, textAlign: 'center' }}>Restaurants Page</Typography>
          <Container style={{ marginBottom: 20 }} >{props.loggedIn ? <AddRestaurant /> : ""}  </Container>

          <Box sx={{ marginTop: '10', width: '100%', height: 670 }}>
            <DataGrid
              title="Restaurants"
              rows={restaurants}
              columns={columns}
              getRowId={(row) => row._id}
              pageSize={10}
              rowsPerPageOptions={[10]}
              components={{
                Toolbar: GridToolbar,
              }}
              initialState={{
                filter: {
                  filterModel: {
                    items: [
                      {
                        columnField: 'cuisine',
                        operatorValue: 'contains',
                        value: '',
                      }, {
                        columnField: 'borough',
                        operatorValue: 'contains',
                        value: '',
                      },
                    ],
                  },
                },
              }}
            />
          </Box>
    </Container>
      }
  </>
  )
}

export default Index




