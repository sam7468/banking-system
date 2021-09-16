import React,{useState,useEffect} from 'react'
import Axios from 'axios'
import UserAccountPage from './UserAccountPage'

function Balance() {
    const [balanceAmount,setBalanceAmount] = useState(0)

    useEffect(async()=>{
        await Axios.get(`http://localhost:4000/user/balance/${localStorage.getItem('email')}`)
        .then(data=>data)
        .then(json=>{
            setBalanceAmount(json.data.balance)})      
    })

    return(
        <>
            <UserAccountPage/>
            {<div className="balance">
                <div>
                    <h1>Rs.{balanceAmount}</h1>
                </div>
            </div>}
        </>
    )
} 

export default Balance