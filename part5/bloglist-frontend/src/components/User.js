const User = ({user, handleLogout }) => (
  <div>
    <p>{user.name} logged-in</p>
    <button onClick={()=>handleLogout(user.id)}>Logout</button>
  </div>  
)

export default User