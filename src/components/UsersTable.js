import axios from '../config/index'
import {  useState, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Typography, Container, Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';


const UsersTable = props => {
  let navigate = useNavigate()

  let token = localStorage.getItem('token')
  const [users, setUsers] = useState({});


  useEffect(() => {
    axios.get(`/users/`)
      .then(response => {
        console.log(response.data)
        setUsers(response.data.users)
      })
      .catch(err => {
        console.log(`Error: ${err}`)
      })
  }, [])

  if (!users) return null

  const onDelete = (id) => {
    axios.delete(`/users/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => {
        console.log(response.data)
        navigate("/")
      })
      .catch(err => {
        console.log(`Error: ${err}`)
      })
  }
  const columns = [

    //{ field: '_id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: "email", headerName: 'Email', width: 180 },
    { field: 'role', headerName: 'Role', width: 150 },
    {
      field: "_id",
      headerName: 'Actions',
      renderCell: (params) => {
        return (
          <>
                <Link to={`/users/${params.row._id}`}><VisibilityIcon /></Link>
                <Link to={`/users/${params.row._id}/edit`}><EditIcon /></Link>
              </>
        );
      }
    }
  ]




  return (
    <Container className="marginTop">
      <Typography sx={{ borderBottom: 1, borderColor: 'grey.400', marginTop: 5, fontSize: 26, fontWeight: 500, textAlign: 'center' }}>Users Table</Typography>

      <Box sx={{ mx: 'auto', width: '70%', height: 400, alignSelf: 'center'}}>
        <DataGrid
          title="Users"
          rows={users}
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={5}
          rowsPerPageOptions={[5]}
          components={{
            Toolbar: GridToolbar,
          }}
          initialState={{
            filter: {
              filterModel: {
                items: [
                  {
                    columnField: 'name',
                    operatorValue: 'contains',
                    value: '',
                  }
                ],
              },
            },
          }}
        />
      </Box>
    </Container>
  )
}

export default UsersTable