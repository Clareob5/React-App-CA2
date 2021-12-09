import axios from '../../config/index'
import { Fragment, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Box, Container, Button, IconButton } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import AddRestaurant from '../../components/Add'
//import MaterialTable from 'material-table';

const Index = props => {
  const [restaurants, setRestaurants] = useState(null)
  let navigate = useNavigate()

  let token = localStorage.getItem('token')


  const onDelete = (id) => {
    axios.delete(`/restaurants/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => {
        console.log(response.data)
        navigate("/restaurants")
      })
      .catch(err => {
        console.log(`Error: ${err}`)
      })
  }

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
                <Link to={`/restaurants/${params.row._id}`}><VisibilityIcon /></Link>
                <Link to={`/restaurants/${params.row._id}/edit`}><EditIcon /></Link>
                <IconButton onClick={() => onDelete(params.row._id)}>
                  <DeleteIcon />
                </IconButton>
              </> : "No Actions"}
          </>
        );
      }
    }
  ]




  return (
    <Container className="marginTop">
      <h2>Restaurants Page</h2>
      {/* <p><Link to="/restaurants/add">Add Restaurant</Link></p> */}
      <Container className="App">{props.loggedIn ? <AddRestaurant /> : ""}  </Container>

      <Box sx={{ marginTop: '10', width: '100%', height: 630 }}>
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
                  },
                ],
              },
            },
          }}
        />
      </Box>
    </Container>
    /* <p>This is the Restaurants Index page</p>
    <p><Link to="/restaurants/add">Add Restaurant</Link></p>
     {/* <MaterialTable
    title="Restaurants"
    data={restaurants}
    columns={columns}
  /> */
    /* { restaurantsList } */
  )
}

export default Index




