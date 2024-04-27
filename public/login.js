
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js';
import { getDatabase, ref, get, child, set } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js"






  function gotologin (){
    window.location.href = 'login.html' + "?" + "for=login";


}

function gotosignup (){
    window.location.href = 'login.html' + "?" + "for=signup";


}



function restpassword (){
  window.location.href = 'login.html' + "?" + "for=reset";


}


loginlogin.addEventListener('click', gotologin);
signuplogin.addEventListener('click', gotosignup);

resetlogin.addEventListener('click', gotosignup);

forgotpass.addEventListener('click', restpassword);





//Authentication



function createanewaccountuser() {


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
  
  alert("data stored successfully")



  
  const userRef = ref(db, 'accounts/' + useridnumberfirebase);
 get(userRef)
                        .then((snapshot) => {
                            if (snapshot.exists()) {
                                const userData = snapshot.val();
                                console.log("User data:", userData);

                                // Store userData in local storage
                                localStorage.setItem('userData', JSON.stringify(userData));
                                window.location.href = 'myaccount.html';

                                // Now you can use the user data as needed
                            } else {
                                console.log("User data not found.");
                            }
                          });

  
  })
  .catch((error)=>{
  alert("did not work sucka"+error);
  
  
  });

 })
    .catch((error) => {
      console.error("Error signing up:", error.message);
    });


  })
  .catch(error => {
    console.error('Error fetching Firebase configuration:', error);
  });


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
            window.location.href = 'myaccount.html';


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
              alert('Error: ' + error.message);
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
                                window.location.href = 'myaccount.html'
                            } else {
                                window.location.href = 'login.html?for=login'
                            }
                        }
myaccoutfooter.addEventListener('click', myaccoutfooterclick);