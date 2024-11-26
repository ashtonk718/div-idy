
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js';
import { getDatabase, ref, get, child, set } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js"






  function gotologin (){
    window.location.href = 'login' + "?" + "for=login";


}

function gotosignup (){
    window.location.href = 'login' + "?" + "for=signup";


}



function restpassword (){
  window.location.href = 'login' + "?" + "for=reset";


}


loginlogin.addEventListener('click', gotologin);
signuplogin.addEventListener('click', gotosignup);

resetlogin.addEventListener('click', gotosignup);

forgotpass.addEventListener('click', restpassword);





//Authentication



function createanewaccountuser() {


  document.getElementById('errorlogin').innerHTML="";



  if (document.getElementById('signupdisplayname').value.length > 3){
  

  fetch('/firebase-config')
  .then(response => response.json())
  .then(data => {
    // Use the received data (Firebase configuration JSON) here
    const app = initializeApp(data);
    const auth = getAuth(app);
    const db = getDatabase(app);



  const email = document.getElementById('signupemail').value;
  const password = document.getElementById('signuppassword').value;
  const name = document.getElementById('signupdisplayname').value;



  // Example: Sign Up
  createUserWithEmailAndPassword(auth, email, password, name)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Signed up successfully!", user);
      console.log(user.uid);
const useridnumberfirebase = user.uid



set(ref(db, "accounts/"+ useridnumberfirebase ),{
  useridnumber: useridnumberfirebase ,
  email: email,
  displayname: name,
  
  })
  .then(()=>{
  



  
  const userRef = ref(db, 'accounts/' + useridnumberfirebase);
 get(userRef)
                        .then((snapshot) => {
                            if (snapshot.exists()) {
                                const userData = snapshot.val();
                                console.log("User data:", userData);

                                // Store userData in local storage
                                localStorage.setItem('userData', JSON.stringify(userData));
                                window.location.href = 'myaccount';

                                // Now you can use the user data as needed
                            } else {
                                console.log("User data not found.");
                            }
                          });

  
  })
  .catch((error)=>{
  
  
  });

 })
    .catch((error) => {
      console.error("Error signing up:", error.message);

      document.getElementById('errorlogin').innerHTML = "";
  
      let errormessage = ""; // Change const to let
  
      if (error.message.includes("password")) {
          errormessage = "Password should be at least 6 characters";
      } else if (error.message.includes("invalid-email")) {
          errormessage = "Not a Valid Email";
      } else if (error.message.includes("missing-email")) {
          errormessage = "You need to add your email";
      } else if (error.message.includes("email-already-in-use")) {
          errormessage = "You already have an account with this email";
      }
  
      var errorDiv2 = document.getElementById('errorlogin');
      errorDiv2.textContent = errormessage;
      errorDiv2.style.color = "red"; // Set text color to red
      errorDiv2.style.padding = "5px"; // Add padding for better appearance
      errorDiv2.style.marginBottom = "10px"; // Add some space below the error message

    });


  })
  .catch(error => {
    document.getElementById('errorlogin').innerHTML = "";

    console.error('Error fetching Firebase configuration:', error);

  

    var errorDiv2 = document.getElementById('errorlogin');
    errorDiv2.textContent = "server error";
    errorDiv2.style.color = "red"; // Set text color to red
    errorDiv2.style.padding = "5px"; // Add padding for better appearance
    errorDiv2.style.marginBottom = "10px"; // Add some space below the error message
});



} else {
  console.log("You need at least three characters in your username");

  var errorDiv = document.getElementById('errorlogin')
  errorDiv.textContent = "You need at least three characters in your Display Name";
  errorDiv.style.color = "red"; // Set text color to red
  errorDiv.style.padding = "5px"; // Add padding for better appearance
  errorDiv.style.marginBottom = "10px"; // Add some space below the error message


}

}

signupbtn.addEventListener('click', createanewaccountuser);








// file1.js
const emailInput = document.getElementById('loginemail');
const passwordInput = document.getElementById('loginpassword');

export { emailInput, passwordInput };





function logintoaccountuser() {
   
  fetch('/firebase-config')
  .then(response => response.json())
  .then(data => {
    // Use the received data (Firebase configuration JSON) here
    const app = initializeApp(data);
    const db = getDatabase(app);
    const auth = getAuth(app);




const email = document.getElementById('loginemail').value;
const password = document.getElementById('loginpassword').value;



  // Example: Sign In
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Signed in successfully!", user);


      // Assuming you have a reference to the user's data
      const userRef = ref(db, 'accounts/' + user.uid);
      console.log(userRef)

      // Fetch user data from Firebase
      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            console.log("User data:", userData);

          
            localStorage.setItem('userData', JSON.stringify(userData));
            window.location.href = 'myaccount';


            // Now you can use the display name as neededz
          } else {
            console.log("User data not found.");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error.message);
        });



      
    })
    .catch((error) => {
      console.error("Error signing in:", error.message);


      document.getElementById('errorlogin').innerHTML = "";
  
      let errormessage = ""; // Change const to let
  
      if (error.message.includes("missing-password")) {
          errormessage = "Missing Password";
      } else if (error.message.includes("invalid-login-credentials")) {
          errormessage = "Wrong Email or Password";
      } else if (error.message.includes("invalid-email")) {
          errormessage = "Invalid Email";
      } else if (error.message.includes("auth/too-many-requests)")) {
        errormessage = "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.";
    } 
      var errorDiv2 = document.getElementById('errorlogin');
      errorDiv2.textContent = errormessage;
      errorDiv2.style.color = "red"; // Set text color to red
      errorDiv2.style.padding = "5px"; // Add padding for better appearance
      errorDiv2.style.marginBottom = "10px"; // Add some space below the error message




    });


  })
  .catch(error => {
    console.error('Error fetching Firebase configuration:', error);
  });


}


loginbtn.addEventListener('click', logintoaccountuser);







function onPageLoad() {


 // Get the current URL
 const urlParams = new URLSearchParams(window.location.search);
 const forLoginParam = urlParams.get('for');

 // If URL contains "for=login", show the additional elements
 if (forLoginParam === 'login') {
   document.getElementById('loginform').style.display = 'block';
   document.getElementById('signupform').style.display = 'none';
   document.getElementById('resetform').style.display = 'none';

 }



 if (forLoginParam === 'signup') {
  document.getElementById('loginform').style.display = 'none';
  document.getElementById('signupform').style.display = 'block';
  document.getElementById('resetform').style.display = 'none';

}

if (forLoginParam === 'reset') {
  document.getElementById('loginform').style.display = 'none';
  document.getElementById('signupform').style.display = 'none';
  document.getElementById('resetform').style.display = 'block';

}




}



window.onload = onPageLoad;








function sendemailrestpassword (){


  fetch('/firebase-config')
  .then(response => response.json())
  .then(data => {
      const app = initializeApp(data);
      const auth = getAuth(app); // Get authentication object
      const db = getDatabase(app);

      const email = document.getElementById('resetpasswordemail').value;

      // Send password reset email
      sendPasswordResetEmail(auth, email)
          .then(() => {
              // Password reset email sent successfully
              console.log('Password reset email sent');
              alert('Password reset email sent. Check your inbox.');
          })
          .catch((error) => {
              // Handle errors
              console.error('Error sending password reset email:', error.message);
          });
  })
  .catch(error => {
      console.error('Error fetching Firebase configuration:', error);
  });




} 


restbtn.addEventListener('click', sendemailrestpassword);



localStorage.removeItem("firebase:host:webbuilder-b3a38-default-rtdb.firebaseio.com");










function openaboutus (){
  document.getElementById("about-us-overlay").style.display = "block";
}
aboutusfooter.addEventListener('click', openaboutus);

    function closeaboutusfun (){
        document.getElementById("about-us-overlay").style.display = "none";
        }
        document.getElementById("about-us-overlay").addEventListener('click', closeaboutusfun);





        function openprivatepolicy (){
            document.getElementById("privacy-policy-overlay").style.display = "block";
          }
          privatepolicyfooter.addEventListener('click', openprivatepolicy);
          
              function closeprivatepolicyfun (){
                  document.getElementById("privacy-policy-overlay").style.display = "none";
                  }
                  document.getElementById("privacy-policy-overlay").addEventListener('click', closeprivatepolicyfun);





                  function openterms (){
                    document.getElementById("terms-of-service-overlay").style.display = "block";
                  }
                  termsfooter.addEventListener('click', openterms);
                  
                      function closeterms (){
                          document.getElementById("terms-of-service-overlay").style.display = "none";
                          }
                          document.getElementById("terms-of-service-overlay").addEventListener('click', closeterms);
        
        


                          function myaccoutfooterclick (){

                            const userDataString = localStorage.getItem('userData');
                            if (userDataString) {
                                window.location.href = 'myaccount'
                            } else {
                                window.location.href = 'login?for=login'
                            }
                        }
myaccoutfooter.addEventListener('click', myaccoutfooterclick);

