import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
//import "bootstrap/dist/js/bootstrap.bundle";
import "react-toastify/dist/ReactToastify.css";
import userService from "../Service/userService";
import "./registerform.css";

/*
- we are using the functional component 
- setNewUser is our updator state 
- I placed my labels within the form above their divs because they where originally lining up with the inputs and I wanted them above it
-  <div className="needs-validation">   was the reason there was a space inbetween register form and the properties

*/

function Registerform() {
  // this is a functional component
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
  });

  console.log("New User", newUser);

  // input onChange
  const currentRegister = (event) => {
    const target = event.target; // the event.target will represent the input
    const newUserValue = target.value; // this is the value of the input, the value inthe text the user types into
    const nameOfField = target.name; // this is the name, be sure to give your form fields a name attribute

    setNewUser((prevState) => {
      console.log("updator onchange");
      const newUserObject = {
        ...prevState,
      };

      newUserObject[nameOfField] = newUserValue;
      console.log(newUserObject);

      return newUserObject;
    });
  };
  // this is my onclick function
  const registerUser = (e) => {
    e.preventDefault();
    var newClient = { ...newUser };

    let input = [];
    for (const [key, value] of Object.entries(newClient)) {
      if (value === "") {
        toast.warn(`Please enter ${key}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        input.push(newClient);
      }
    }

    if (input.length === 5) {
      // the reason there is a 5 is because we are requesting the length of the object which is 5 properties
      console.log("This is the input", input[0]);

      userService
        .register(input[0])
        .then(onRegisterSuccess)
        .catch(onRegisterError);
    }
  };

  const onRegisterSuccess = (response) => {
    console.log(response);
  };

  const onRegisterError = (err) => {
    console.log(err);
  };

  return (
    <React.Fragment>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="cover">
        <div className="container">
          <h1 className="registerFormHeader1"> Register Form </h1>
          <form className="needs-validation" noValidate>
            <div className="form-row">
              <label htmlfor="validationCustom1">First Name</label>
              <div className="col-md-4 mb-3">
                <input
                  name="firstName" // this name needs to match the properties, or else you might not be able to type in the input
                  type="text"
                  className="form-control"
                  id="validationCustom1"
                  placeholder="Firstname"
                  value={newUser.firstName}
                  onChange={currentRegister}
                />
              </div>
              <label htmlfor="validationCustom1">Last Name</label>
              <div className="col-md-4 mb-3">
                <input
                  name="lastName"
                  type="text"
                  className="form-control"
                  id="validationCustom1"
                  placeholder="Lastname"
                  value={newUser.lastName}
                  onChange={currentRegister}
                />
              </div>
              <label htmlfor="validationCustom1">Email Address</label>
              <div className="col-md-4 mb-3">
                <input
                  name="emailAddress"
                  type="text"
                  className="form-control"
                  id="validationCustom1"
                  placeholder="Email Address"
                  value={newUser.emailAddress}
                  onChange={currentRegister}
                />
              </div>
              <label htmlfor="validationCustom1">Password</label>
              <div className="col-md-4 mb-3">
                <input
                  name="password"
                  type="text"
                  className="form-control"
                  id="validationCustom1"
                  placeholder="Password"
                  value={newUser.password}
                  onChange={currentRegister}
                />
              </div>
              <label htmlfor="validationCustom1">Confirm Password</label>
              <div className="col-md-4 mb-3">
                <input
                  name="confirmPassword"
                  type="text"
                  className="form-control"
                  id="validationCustom1"
                  placeholder="Confirm Password"
                  value={newUser.confirmPassword}
                  onChange={currentRegister}
                />
              </div>

              <button
                id="submitButton"
                type="submit"
                className="btn btn-primary"
                onClick={registerUser}
              >
                Sign Me Up!
              </button>
              <div className="button/paragraph">
                <p>
                  Already have an account?
                  <button className="signInB">Sign in</button>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Registerform;
