import React,{useState,useEffect} from 'react'
import Axios from 'axios'
import UserAccountPage from './UserAccountPage'



function History(props) {
    const [transactions,setTransactions] = useState({})
    const [len,setlen] = useState(0)
    const [trigger,settrigger]  = useState("")

    //one time trigger
    setTimeout(()=>{settrigger("...")},200)

    useEffect(async()=>{
        await Axios.get(`http://localhost:4000/user/history/${localStorage.getItem('email')}`)
        .then(data=>data)
        .then(json=>{
            setTransactions(json.data)
            setlen(transactions.length)
            console.log(transactions)
        })
    },[trigger])

    return(
        <>  
            <UserAccountPage/>
            {<div className="history">
            
            <table class="table">
                <thead class="thead-dark">
                    <tr>
                    <th scope="col">DATE</th>
                    <th scope="col">TIME</th>
                    <th scope="col">SENDER</th>
                    <th scope="col">RECEIVER</th>
                    <th scope="col">AMOUNT</th>
                    </tr>
                </thead>
                <tbody>
                    {len>=1 && <>
                        <tr>
                            <th scope="row">{String(transactions[0].date).slice(0,10)}</th>
                            <td>{String(transactions[0].time).slice(0,String(transactions[0].time).indexOf("."))}</td>
                            <td>{transactions[0].name}</td>
                            <td>{transactions[0].receiver_name}</td>
                            <td>{transactions[0].amount}</td>
                        </tr>
                    </>}
                    {len>=2 && <>
                        <tr>
                            <th scope="row">{String(transactions[1].date).slice(0,10)}</th>
                            <td>{String(transactions[1].time).slice(0,String(transactions[1].time).indexOf("."))}</td>
                            <td>{transactions[1].name}</td>
                            <td>{transactions[1].receiver_name}</td>
                            <td>{transactions[1].amount}</td>
                        </tr>
                    </>}
                    {len>=3 && <>
                        <tr>
                            <th scope="row">{String(transactions[2].date).slice(0,10)}</th>
                            <td>{String(transactions[2].time).slice(0,String(transactions[2].time).indexOf("."))}</td>
                            <td>{transactions[2].name}</td>
                            <td>{transactions[2].receiver_name}</td>
                            <td>{transactions[2].amount}</td>
                        </tr>
                    </>}
                    {len>=4 && <>
                        <tr>
                        <th scope="row">{String(transactions[3].date).slice(0,10)}</th>
                            <td>{String(transactions[3].time).slice(0,String(transactions[3].time).indexOf("."))}</td>
                            <td>{transactions[3].name}</td>
                            <td>{transactions[3].receiver_name}</td>
                            <td>{transactions[3].amount}</td>
                        </tr>
                    </>}
                </tbody>
                </table>
        </div>}
        
        </>
    )

}

export default History