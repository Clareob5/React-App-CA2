import axios from 'axios'
import { useEffect, useState } from 'react'

const Add = () => {

  const [form, setForm] = useState(null)

  let token = localStorage.getItem('token')
 

  const handleForm = e => {
    setForm(prevState => ({
      ...prevState,
      [e.target.name] : e.target.value
    }))
    console.log(form)
  }

const submitForm = () => {
  console.log(form)

        axios.post(`http://localhost:8000/api/restaurants`, {
             headers: {
                 "Authorization": `Bearer ${token}`
             },
            
    address: {
      building: form.building,
      coord: [ form.coord1,form.coord2  ],
      street: form.street,
      zipcode: form.zipcode
    },
    borough: form.borough,
    cuisine: form.cuisine,
    grades: [
      {
        date: form.date,
        grade: form.grade,
        score: form.score
      }  
    ],
    name: form.name,
    restaurant_id: form.restaurant_id
        })
        .then(response => {
                 console.log(response.data)
             })
             .catch(err => {
                 console.log(`Error: ${err}`)
             })
            }
  
  return (
    <>
      <h2>Add Restaurant</h2>

    <h4>Address</h4>

      Building: <input type="text" name="building" onChange={handleForm} /> <br />
      coord: <input type="number" name="coord1" onChange={handleForm} /> 
             <input type="number" name="coord2" onChange={handleForm} /> <br />
      street: <input type="text" name="street" onChange={handleForm} /> 
      zipcode: <input type="text" name="zipcode" onChange={handleForm} /> <br />
      Borough: <input type="text" name="borough" onChange={handleForm} />
      Cuisine: <input type="text" name="cuisine" onChange={handleForm} /> <br />
      <h4>Grade</h4>
      Date: <input type="date" name="date" onChange={handleForm} />
      Grade: <input type="text" name="grade" onChange={handleForm} /> <br />
      Score: <input type="number" name="score" onChange={handleForm} /> <br />
      Name: <input type="text" name="name" onChange={handleForm} />
      Restaurant Identification number: <input type="number" name="number" onChange={handleForm} />



      <button onClick={submitForm}> Submit</button>

    </>
  )
}

export default Add