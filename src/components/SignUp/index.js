import "../../styles/styles.scss";
import React, { useState } from "react";
import fire from "../../config";


function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);
  const db = fire.firestore();
  let data = {
    name: 'Los Angeles1',
    state: 'CA',
    country: 'USA',
    userid: 'kkk'
  };

function signout() {
  // fire.auth().signOut().then(function() {
  //   // Sign-out successful.
  // }).catch(function(error) {
  //   // An error happened.
  // });

  db.collection('cities').doc('LA3').set(data);

}  

const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
  event.preventDefault();
  try{
    const {user} = await fire.auth().createUserWithEmailAndPassword(email, password);
    console.log(user);
    // db.collection('cities').doc('LA').set(data);

    db.collection('users').doc(user.uid).set({
      email: user.email,
      uid: user.uid
    });
  }

  catch(error){
    console.log(error)
    setError('Error Signing up with email and password');
  }
    
  setEmail("");
  setPassword("");
  setDisplayName("");
};

  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    }
  };
  return (
    <React.Fragment>
      <div className="flex-column flex flex-center">
        {error !== null && <div>{error}</div>}
        <span onClick={signout}>signout</span>
        <form className="p-b-40 p-l-40 p-r-40 p-t-40 pt-40 form_bg br-6 signup">
        <div className="flex flex-column">
          <label htmlFor="displayName">Display Name:</label>
          <input
            type="text"
            name="displayName"
            className="inline-input p-t-8 p-b-8 p-r-8 m-t-6"
            placeholder="E.g: Faruq"
            id="displayName"
            onChange={event => onChangeHandler(event)}
          />
        </div>
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
              createUserWithEmailAndPasswordHandler(event, email, password);
            }}
          >
            Sign up
          </button>
        </form>
      </div>
    </React.Fragment>
  );
}

export default SignUp;
