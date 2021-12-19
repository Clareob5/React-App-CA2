import axios from '../../config/index'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { Box, Container, Typography } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';

import AddRestaurant from '../../components/restaurants/Add'

const Index = props => {

  const [restaurants, setRestaurants] = useState(null)

  //axios get restaurants and set is the restaurants
  useEffect(() => {
    axios.get('/restaurants/')
      .then(response => {
        console.log(response.data)
        setRestaurants(response.data.restaurants)

      })
      .catch(err => {
        console.log(`Error: ${err}`)
      })
  }, [])

  if (!restaurants) return null

  //assigning values to the columns that correspond with the fields in the restaurants object
  const columns = [

    { field: 'restaurant_id', headerName: 'ID', width: 130 },
    { field: 'name', headerName: 'Name', width: 200 },
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
                <Link to={`/restaurants/${params.row._id}/edit`}><EditIcon sx={{ color: '#15834c', marginLeft: 1 }} /></Link>
              </>
              : "No Actions"}
          </>
        );
      }
    }
  ]

  return (
    <>
          <Container className="marginTop">
            <Typography sx={{ marginTop: 5, fontSize: 30, fontWeight: 400, textAlign: 'center' }}>
              Restaurants Page
            </Typography>
            <Container style={{ marginBottom: 20 }} >{props.loggedIn ? <AddRestaurant /> : ""}  </Container>
            <Box sx={{ marginTop: '10', width: '100%', height: 670 }}>
              <DataGrid
                title="Restaurants"
                rows={restaurants}
                columns={columns}
                getRowId={(row) => row._id}
                pageSize={10}
                rowsPerPageOptions={[10]}
                //grid toolbar allows to have a filter and export menu
                components={{
                  Toolbar: GridToolbar,
                }}
                initialState={{
                  filter: {
                    filterModel: {
                      items: [
                        {
                          columnField: 'cuisine',
                          operatorValue: 'contains', //default filter
                          value: '',
                        }
                      ],
                    },
                  },
                }}
              />
            </Box>
          </Container>
    </>
  )
}

export default Index




