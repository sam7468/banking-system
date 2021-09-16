import React,{useState} from 'react'
import logout from './images/logout.png' 
import { Redirect } from 'react-router-dom'


function InterestCalc() {
    
    const [formdata,setformdata] = useState({
        amount:"",
        months:"",
        interest:""
    })

    const [showForm , setShowForm] = useState(true)
    const [ShowResult,setShowResult] = useState(false)
    const [redirectHomeStatus,setRedirectHome] = useState(false)


    const setformvalue=(e)=>{
        let new_form = {...formdata}
        new_form[e.target.id] = e.target.value
        setformdata(new_form)
        console.log(formdata)
    }

    const displayresult=(e)=>{
        e.preventDefault()
        console.log("from displayresult",formdata)
        let p = formdata.amount
        let r = formdata.interest
        let n = formdata.months 
        // console.log(p,r,n)
        let intrest = p * (r*(0.01)) / n
        let total = (p / n) + intrest
        localStorage.setItem('emi',total.toFixed(0))
        localStorage.setItem('totalAmount',(total*n).toFixed(0))
        setShowForm(false)
        setShowResult(true)
    }

        
    const redirectHome = ()=>{
        setRedirectHome(true)
    }
    
    return(
        <>
            <div> <img src={logout} onClick={redirectHome} className="logout"></img></div>
            <div className="interestcalc">
                {showForm && <div>
                    <input onChange={(e)=>{setformvalue(e)}} type="numbers" id="amount" placeholder="AMOUNT"></input><br></br>
                    <input onChange={(e)=>{setformvalue(e)}} type="numbers" id="months" placeholder="MONTHS"></input><br></br>
                    <input onChange={(e)=>{setformvalue(e)}} type="numbers" id="interest" placeholder="INTEREST in %"></input><br></br>
                    <br></br>
                    <button onClick={displayresult} type="submit">CALCULATE</button>
                </div>}

                {ShowResult && <div>
                    <div className="balance">
                        <div>
                            <h1>E M I : {localStorage.getItem('emi')}</h1>
                            <br></br>
                            <h1>AMOUNT: {localStorage.getItem('totalAmount')}</h1>
                        </div>
                   </div>
                    <br></br>
                </div>}
            </div>
            {redirectHomeStatus && <Redirect to="/user"/>}
    
        </>
    )

}

export default InterestCalc