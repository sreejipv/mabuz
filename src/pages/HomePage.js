import "../styles/styles.scss";
import React from "react";
import SignIn from '../components/SignIn'
import Signup from '../components/SignUp'


function HomePage() {
  return (
    <React.Fragment>
        <div className="bg_brandBlue">
          <h1 className="c_white f_bold m-t-0 m-b-0">MABUZ</h1>
        </div>
        <div className="bg_scene container__row flex flex-right" style={{ padding: "0 50px", height: "100vh" }}>
           <Signup/>
           <SignIn/>
        </div>
        <div style={{ textAlign: "center" }}>Mabuz Design ©2020</div>
    </React.Fragment>
  );
}

export default HomePage;
