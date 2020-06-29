import "../../styles/styles.scss";
import React, { useState } from "react";
import fire from "../../config";


function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const db = fire.firestore();



  fire.auth().onAuthStateChanged(firebaseuser =>  {
    if(firebaseuser){
      console.log(firebaseuser);
    }else{
      console.log('not logged in');
    }
    // let data = {
    //   name: 'Los Angeles1',
    //   state: 'CA',
    //   country: 'USA',
    //   userid: firebaseuser.uid
    // };
  
  // db.collection('cities').doc('LA').set(data);

  })

const signInWithEmailAndPasswordHandler = async (event, email, password) => {
  event.preventDefault();
  try{
    const {user} = await fire.auth().signInWithEmailAndPassword(email, password);
    fire.firestore().collection('users').doc(user.uid).set(user)

  }
  catch(error){
    console.log(error)
    setError('Error Signing up with email and password');
  }
    
  setEmail("");
  setPassword("");
};

  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    }
  };
  return (
    <React.Fragment>
      <div className="flex-column flex flex-center">
        {error !== null && <div>{error}</div>}
        <form className="p-b-40 p-l-40 p-r-40 p-t-40 pt-40 form_bg br-6 SignIn">
          <br/>
        <div className="flex flex-column">
          <label htmlFor="userEmail" className="block">
            Email:
          </label>
          <input
            type="email"
            className="inline-input p-t-8 p-b-8 p-r-8 m-t-6"
            name="userEmail"
            value={email}
            placeholder="E.g: faruq123@gmail.com"
            id="userEmail"
            onChange={event => onChangeHandler(event)}
          />
        </div>

          <br />
        <div className="flex flex-column">
        <label htmlFor="userPassword" className="block">
            Password:
          </label>
          <input
            type="password"
            className="inline-input p-t-8 p-b-8 p-r-8 m-t-6"
            name="userPassword"
            value={password}
            placeholder="Your Password"
            id="userPassword"
            onChange={event => onChangeHandler(event)}
          />
        </div>
          <br/>
          <button
            className="c-pointer bg-green-400 hover:bg-green-500 w-full py-2 text-white m-t-20"
            onClick={event => {
              signInWithEmailAndPasswordHandler(event, email, password);
            }}
          >
            Sign up
          </button>
        </form>
      </div>
    </React.Fragment>
  );
}

export default SignIn;
