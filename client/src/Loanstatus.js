import React,{useEffect, useState} from 'react'
import logout from './images/logout.png' 
import { Redirect } from 'react-router-dom'
import Axios from 'axios'

function Loanstatus() {
    const [redirectHomeStatus,setRedirectHome] = useState(false)
    const [loanstatus,setLoanStatus] = useState({})

    useEffect(()=>{
        statusfn()
    },[])


    const statusfn  = (async()=>{
        console.log("fn working")
        await Axios.post('http://localhost:4000/loan/status',{email:localStorage.getItem('email')})
        .then(data=>data)
        .then(json=>{
            console.log("fn working1-->",json.data)
            setLoanStatus(json.data)
            console.log("fn workin2-->",json.data)
        })
    })
    
    
    const redirectHome = ()=>{
        setRedirectHome(true)
    }

    return(
        <>
            <div> <img src={logout} onClick={redirectHome} className="logout"></img></div>
            <div className="status-div">
                <h1> {loanstatus.loantype} </h1>
                <br></br>
                <h1>( status : {loanstatus.status} )</h1>
            </div>
            {redirectHomeStatus && <Redirect to="/"/>}
        </>
    )

}

export default Loanstatus