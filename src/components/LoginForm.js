import { useState } from 'react'
import axios from 'axios'


 
const LoginForm = (props) => {
  const [form, setForm] = useState({email: "clare@mail.com", password: "password"})
 

  const handleForm = e => {
    setForm(prevState => ({
      ...prevState,
      [e.target.name] : e.target.value
    }))
    console.log(form)
  }

const submitForm = () => {
  console.log(form)

  axios.post('http://localhost:8000/api/users/login', {
    email: form.email,
    password: form.password
  })
  .then(response => {
    console.log(response.data)
    props.onLoggedIn(true, response.data.token)
    //setLoggedIn(true)
  })
  .catch(err => console.log(`Error: ${err}`))
}

    return (
    //react fragment syntax
    <>

      Email: <input type="text" name="email" onChange={handleForm} /> <br />
      Password: <input type="password" name="password" onChange={handleForm} />

      <button onClick={submitForm}> Submit</button>

    </>
  )

}


export default LoginForm