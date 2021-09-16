import React,{useState,useEffect} from 'react'
import Axios from 'axios'
import fundtransfer from './images/transfer4.JPG'
import UserAccountPage from './UserAccountPage'


function Fundtransfer(){

    const [formdata,setformData] = useState({
        accno:"",
        amount:""
    })
    const [b_formdata,setbformData] = useState({
        name:"",
        email:"",
        accno:""
        
    })
    const [BeneficiaryTransferForm,setBeneficiaryTransferForm] = useState(true)
    const [showUpdateForm,setshowUpdateForm] = useState(false)
    const [showDeleteForm,setshowDeleteForm] = useState(false) 
    const [deleteBeneficiary ,setDeletebeneficiary] = useState()
    const [transactionStatus,setStatus] = useState(false)
 
    // fund transfer
    const [transfer,setTransfer] = useState(false)
    const [quickTransfer,setQuickTransfer] = useState(false)
    const [beneficiaryTransfer,setBeneficiaryTransfer] = useState(false)
    
    //benificiary
    const [selectedUser,setUser] = useState() 
    const [allBeneficiary,setAllBeneficiary] = useState([])
    
    const setdatafn = (e)=>{
        let new_formdata = {...formdata}
        new_formdata[e.target.id] = e.target.value
        setformData(new_formdata)
    }

    //add beneficiary form
    const setdatafn2 = (e)=>{
        let new_formdata = {...b_formdata}
        new_formdata[e.target.id] = e.target.value
        setbformData(new_formdata)
        console.log(b_formdata)

    }

    const FormQuicktransfer= async(e)=>{    
        e.preventDefault()
        const transaction = await Axios.put('http://localhost:4000/user/quicktransfer',{
            accno:formdata.accno,
            amount:formdata.amount,
            sender_email:localStorage.getItem('email'),
            sender:localStorage.getItem('name')
        })
        .then(data=>data)
        .then(json=>{if(json.data == "transaction success"){
            setStatus(data=>true)
        }else if(json.data=="you're broke"){
            console.log("you're broke")
        }})     
    }

    const FormBeneficiary= async(e)=>{    
        e.preventDefault()
        formdata.accno = selectedUser
        console.log(formdata)
        const transaction = await Axios.put('http://localhost:4000/beneficiary/transfertoBeneficiary',{
            accno:formdata.accno,
            amount:formdata.b_amount,
            sender_email:localStorage.getItem('email'),
            sender:localStorage.getItem('name')
        })
        .then(data=>data)
        .then(json=>{if(json.data == "transaction success"){
            setStatus(data=>true)
        }else if(json.data=="you're broke"){
            console.log("you're broke")
        }})     
    }



    const PageReload=()=>{
        window.location.reload()
        setStatus(false)
    }

    const selectBeneficiaryfn=async(e)=>{
        let user = e.target.value
        await Axios.get(`http://localhost:4000/beneficiary/getbeneficiary/${user}`)
        .then(data=>data)
        .then(json=>{
            setUser(json.data)
        }) 
    }

    const getdeletebeneficiary=async(e)=>{
        let user = e.target.value
        await Axios.get(`http://localhost:4000/beneficiary/getbeneficiary/${user}`)
        .then(data=>data)
        .then(json=>{
        setDeletebeneficiary(json.data)
    })    
    }

    const deletebeneficiaryfn=async ()=>{
        await Axios.delete(`http://localhost:4000/beneficiary/deletebeneficiary/${deleteBeneficiary}`) 
        setStatus(data=>true)
    }

    const addbeneficiaryfn = async()=>{
        await Axios.post("http://localhost:4000/beneficiary/addbeneficiary",{
            name:b_formdata.name,
            email:b_formdata.email,
            accno:b_formdata.accno
        })
        .then(data=>data)
        .then(json=>{if(json.data == "beneficiary added"){
            setStatus(data=>true)
        }})  
    }

    const getallBeneficiary = async()=>{
        await Axios.get("http://localhost:4000/beneficiary/getallbeneficiary")
        .then(data=>data)
        .then(json=>{
            console.log(json.data)
            setAllBeneficiary(json.data)})
    }

    useEffect(()=>{
        setTransfer(true)
    },[])

    return(        
        <>
        <UserAccountPage/>

        <div className="detail-cont">

            {transfer && <div className="which-transfer">
                <div className="fund-transfer-mode">
                    
                    <h1 onClick={()=>{
                        setTransfer(false)
                        setQuickTransfer(true)
                        setBeneficiaryTransfer(false)
                    }}>QUICK TRANSFER</h1>

                    <img src={fundtransfer} className="fundtransfer"></img>
                    
                    <h1 onClick={()=>{
                        setTransfer(false)
                        setQuickTransfer(false)
                        getallBeneficiary() 
                        setBeneficiaryTransfer(true)
                    }}>BENEFICIARY</h1>
                </div>
            </div>}
                            

            {quickTransfer && <div className="quick-transfer">
                <div>
                    <p className="closeX" onClick={()=>{
                                                        setQuickTransfer(false)
                                                        setBeneficiaryTransfer(false)
                                                        setTransfer(true)}}>{"<< BACK" }</p>
                    <input onChange={(e)=>{setdatafn(e)}} type="text" id="accno" name="accno" placeholder="ACCOUNT NUMBER"></input><br></br>
                    <input onChange={(e)=>{setdatafn(e)}} type="number" id="amount" name="amount" placeholder="AMOUNT"></input><br></br>
                    <button type="submit" onClick={FormQuicktransfer}>SEND</button><br></br>
                </div>
            </div>}
            
            {beneficiaryTransfer && <div className="benificiary-transfer">
                <div>
                    { BeneficiaryTransferForm &&<>
                        <p className="closeX" onClick={()=>{
                                                            setQuickTransfer(false)
                                                            setBeneficiaryTransfer(false)
                                                            setTransfer(true)}}>{"<< BACK" }</p>
                    <select onChange={e=>{selectBeneficiaryfn(e)}}> 
                        {allBeneficiary && allBeneficiary.map((e)=>(
                            <>
                            <option>{e.email}</option>        
                            </>
                        ))}
                    </select>
                    <br></br>
                    <input type="text" id="b_accno" name="accno" placeholder="ACCOUNT NUMBER" value={selectedUser}></input><br></br>
                    <input onChange={(e)=>{setdatafn(e)}} type="number" id="b_amount" name="amount" placeholder="AMOUNT"></input><br></br>
                    <button type="submit" onClick={FormBeneficiary}>SEND</button><br></br>
                    <h3 className="manage-beneficiary" onClick={()=>{
                        setshowUpdateForm(true)
                        setBeneficiaryTransferForm(false)
                        }}>MANAGE BENEFICIARY</h3>
                    </>}

                    {showUpdateForm && 
                    <>  <p className="closeX" onClick={()=>{setshowUpdateForm(false)
                                        setBeneficiaryTransferForm(true)}}>{"<< BACK" }</p>
                        <input onChange={(e)=>{setdatafn2(e)}} type="text" id="name" name="name" placeholder="NAME"></input><br></br>                        
                        <input onChange={(e)=>{setdatafn2(e)}} type="email" id="email" name="email" placeholder="EMAIL"></input><br></br>
                        <input onChange={(e)=>{setdatafn2(e)}} type="text" id="accno" name="accno" placeholder="ACCOUNT NUMBER"></input><br></br>
                        <button type="submit" onClick={addbeneficiaryfn}>ADD BENEFICIARY</button><br></br>
                        <h3 className="manage-beneficiary" onClick={()=>{
                        setshowUpdateForm(false)
                        setBeneficiaryTransferForm(false)
                        setshowDeleteForm(true)
                        }}>DELETE BENEFICIARY</h3>
                    </>}

                    {showDeleteForm && 
                    <>  
                        <p className="closeX" onClick={()=>{PageReload()}}>{"X"}</p>
                       <select onChange={e=>{getdeletebeneficiary(e)}}> 
                        {allBeneficiary && allBeneficiary.map((e)=>(
                            <>
                            <option>{e.email}</option>        
                            </>
                        ))}
                        </select>
                        <br></br>
                        <button type="submit" onClick={deletebeneficiaryfn}>DELETE</button><br></br>    
                    </>}
                
                </div>
            </div>}
        {transactionStatus && PageReload()}                    
        </div>
    </>
    )
}

export default Fundtransfer