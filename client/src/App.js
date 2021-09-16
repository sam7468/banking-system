import './App.css';
import Fetchuser from './Users';
import Register from './Register';
import Login from './Login';
import Home from './HomePage';
import { BrowserRouter as Router, Route, Switch}  from 'react-router-dom';
import card from './images/card.png'
import UserPage from './UserPage';
import About from './About';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles.css'; 
import Balance from './Balance';
import Fundtransfer from './Fundtransfer';
import History from './History';
import UserAccountPage from './UserAccountPage';
import LoanPage from './LoanPage'


function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          
          <Route exact path="/getallusers">
            <Fetchuser/>
          </Route>
          
          <Route exact path="/">
            <Home/>
          </Route>
          
          
          <Route exact path="/user">
            <UserPage/>
          </Route>

          <Route exact path="/account">
            <UserAccountPage/>
          </Route>

          <Route exact path="/user/balance">
            <Balance/>
          </Route>
          
          <Route exact path="/user/transaction">
            <Fundtransfer/>
          </Route>
          
          <Route exact path="/user/history">
            <History/>
          </Route>

          <Route exact path="/about">
            <About/>
          </Route>
          
          <Route exact path="/interest">
            <LoanPage/>
          </Route>
               
        
        <>
        <div className="girl">
            <img src={card}></img>
        </div>
        <Route exact path="/register">
            <Register/>
        </Route>
        <Route exact path="/login">
            <Login/>
        </Route>
        </>

        </Switch>  
      </Router>
    </div>
  );
}

export default App;
