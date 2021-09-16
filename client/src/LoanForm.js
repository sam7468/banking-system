import React,{useEffect, useState} from 'react'
import logout from './images/logout.png' 
import { Redirect } from 'react-router-dom'
import Axios from 'axios'

function LoanForm(props) {
    const [loanName,setLoanName]  = useState("")
    const [formdata,setformdata] = useState({
        f_name:"",
        l_name:"",
        email:"",
        city:"",
        dob:"",
        mobile:"",
        job:"",
        salary:"",
        amount:"",
        pincode:""
    })

    useEffect(()=>{
        setLoanName(props.data)
        console.log(loanName)
    },[])

    const [showForm , setShowForm] = useState(true)
    const [ShowResult,setShowResult] = useState(false)
    const [redirectHomeStatus,setRedirectHome] = useState(false)


    const setformvalue=(e)=>{
        let new_form = {...formdata}
        new_form[e.target.id] = e.target.value
        new_form.loantype = loanName
        setformdata(new_form)
        console.log(new_form)
    }

    const submitloanform=async(e)=>{
        e.preventDefault()
        redirectHome()
        await Axios.post('http://localhost:4000/loan/submitform',{formdata})
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
                    <div className="which-loan">
                        <h2>{loanName}</h2>
                    </div>
                    <div className="loanform-div">
                        <div>
                            <input onChange={(e)=>{setformvalue(e)}} type="text" id="f_name" placeholder="FIRST NAME"></input><br></br>
                            <input onChange={(e)=>{setformvalue(e)}} type="text" id="l_name" placeholder="LAST NAME"></input><br></br>
                            <input onChange={(e)=>{setformvalue(e)}} type="email" id="email" placeholder="EMAIL"></input><br></br>                            
                            <input onChange={(e)=>{setformvalue(e)}} type="date" id="dob" placeholder="" className="form-date"></input><br></br>                    
                            <input onChange={(e)=>{setformvalue(e)}} type="text" id="city" placeholder="CITY"></input><br></br>
                        </div>
                        <div>
                            <input onChange={(e)=>{setformvalue(e)}} type="numbers" id="amount" placeholder="LOAN AMOUNT"></input><br></br>
                            <input onChange={(e)=>{setformvalue(e)}} type="numbers" id="salary" placeholder="MONTHLY INCOME"></input><br></br>
                            <input onChange={(e)=>{setformvalue(e)}} type="text" id="job" placeholder="JOB ROLE"></input><br></br>
                            <input onChange={(e)=>{setformvalue(e)}} type="numbers" id="mobile" placeholder="MOBILE NO."></input><br></br>
                            <input onChange={(e)=>{setformvalue(e)}} type="numbers" id="pincode" placeholder="PINCODE"></input><br></br>                        
                        </div>
                    </div>
                    <br></br>
                    <button onClick={submitloanform} type="submit">SUBMIT</button>
                </div>}

                {ShowResult && <div>
                    <div className="balance">
                        <div className="loan-submitted">
                            <h1>APPLICATION RECEIVED !</h1>
                        </div>
                   </div>
                    <br></br>
                </div>}
            </div>
            {redirectHomeStatus && <Redirect to="/user"/>}
    
        </>
    )

}

export default LoanForm