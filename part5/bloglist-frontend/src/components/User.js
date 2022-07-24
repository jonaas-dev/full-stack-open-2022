const User = ({user, handleLogout }) => {

  const userStyle = {
    paddingBottom: 20
  }
  
  return (
    <div style={userStyle}>
    {user.name} logged-in  <button onClick={()=>handleLogout(user.id)}>Logout</button>
    </div>  
  )
}

export default User