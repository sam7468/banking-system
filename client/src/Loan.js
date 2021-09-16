import React,{useState} from 'react'
import logout from './images/logout.png' 
import { Redirect } from 'react-router-dom'
import LoanForm from './LoanForm'

function Loan() {

    const [redirectHomeStatus,setRedirectHome] = useState(false)
    const [allLoans,setAllLoans] = useState(true)    
    
    const [PersonalLoan,setPersonalLoan] = useState(false) 
    const [VehicleLoan,setVehicleLoan] = useState(false) 
    const [HomeLoan,setHomeLoan] = useState(false) 
    const [CreditCard,setCreditCard] = useState(false) 



    const redirectHome = ()=>{
        setRedirectHome(true)
    }

    const gotoform=(e)=>{

        setAllLoans(false)
        const id = e.target.id

        if(id=="personal"){
        setPersonalLoan(true)}

        else if(id=="vehicle"){
        setVehicleLoan(true)}

        else if(id=="home"){
        setHomeLoan(true)}

        else{setCreditCard(true)}  
    }

    
    return(
        
        <>  
            <div> <img src={logout} onClick={redirectHome} className="logout"></img></div>
            
            {allLoans && <div className="loan-div">
                <div className="loan-category">
                    <h1 onClick={gotoform} id="personal">Personal Loan</h1>
                    <h1 onClick={gotoform} id="home">Home Loan</h1>            
                </div>
                <div className="loan-category">
                    <h1 onClick={gotoform} id="vehicle">Vehicle Loan</h1>
                    <h1 onClick={gotoform} id="creditcard">Credit Card</h1>
                </div>
            </div>}


            {PersonalLoan && <LoanForm data="PERSONAL LOAN"/>}
            {HomeLoan && <LoanForm data="HOME LOAN"/>}
            {VehicleLoan && <LoanForm data="VEHICLE LOAN"/>}
            {CreditCard && <LoanForm data="CREDIT CARD"/>}
            {redirectHomeStatus && <Redirect to="/user"/>}
    
        </>
    )

}

export default Loan