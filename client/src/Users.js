import React,{useState} from 'react'

function Fetchuser(){
    const [users,setUser] = useState([])
    fetch('http://localhost:4000/getusers')
    .then(data=>data.json())
    .then(json => setUser(users=>json))
    
    return(
        <div className="users">
        {users && users.map((user) => (
                <>
                    <li>Name: {user.name}</li>
                    <p>AccNo: 1347000{user.id}</p><br></br>
                    <p>{user.email}</p>
                    <p>-- {user.password} -- </p>
                    <div className=" border-bottom"></div>
                </>
            ))}
        </div>
    )
}

export default Fetchuser