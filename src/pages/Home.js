import LoginForm from '../components/LoginForm'



const Home = (props) => {

  return (

    
    <div>
      <h2>Home</h2>
       { !props.loggedIn ? <LoginForm onLoggedIn={props.onLoggedIn} /> : "" }

    </div>
  )
}

export default Home