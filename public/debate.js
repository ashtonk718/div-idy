//firebase

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js';
import { getDatabase, ref, get, child, set } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js"




const projecturl = new URLSearchParams(window.location.search).get('project');
console.log(projecturl);

// Set the 'projecturl' value in local storage with the key 'project'
localStorage.setItem('project', projecturl);



const userDataString = localStorage.getItem('userData');

const userData = JSON.parse(userDataString);


if (userDataString) {


    document.getElementById('accountbtn').style.display = "block";
    const userData = JSON.parse(userDataString);
    const username = userData.displayname;
    document.getElementById('accountbtn').textContent = username;

    document.getElementById('loginhome').style.display = "none";
    document.getElementById('signuphome').style.display = "none";
    document.getElementById('titlepromotion').style.display = "none";


  }else{
    document.getElementById('accountbtn').style.display = "none";
    document.getElementById('loginhome').style.display = "inline-block";
    document.getElementById('signuphome').style.display = "inline-block";
    document.getElementById('titlepromotion').style.display = "block";


  }













function saveprompt (){







  fetch('/firebase-config')
  .then(response => response.json())
  .then(data => {
    // Use the received data (Firebase configuration JSON) here
    const app = initializeApp(data);
    const auth = getAuth(app);
    const db = getDatabase(app);




const currentDate = new Date();



    set(ref(db, 'debate/'),{
        
        
        prompt: document.getElementById('debate-input').value,
        date: currentDate
       

        })
        .then(()=>{
        


        
        
        })
        .catch((error)=>{
        alert("did not work sucka"+error);
        
        
        });




        



})


}















//AI








aidebatebuttonsend.addEventListener('click', aiproject);


function aiproject() {
  document.getElementById("aierrordebate").innerHTML = "";

  if (document.getElementById('debate-input').value !== "") {

    let aiinput;

    // Get the input for the "pro" side
    aiinput = "You are on the pro side for a debate for this topic: " + document.getElementById('debate-input').value + ". Give an opening response that is under 30 words.";
    
    // Make a POST request to the server for the "pro" side
    fetch('/getResponse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ aiinput: aiinput }) // Send the input to the server
    })
      .then(response => response.json()) // Parse the response as JSON
      .then(data => {
        console.log('Pro Response:', data);
    
        const proResponse = data.message.content.replace(/\\n/g, '\n'); // Extract and format the pro response
        console.log('Pro Side:', proResponse);
    





        // Now prepare the input for the "con" side
        let conInput = "You are on the con side for a debate for this topic: " + document.getElementById('debate-input').value + ". Give an opening response that is under 30 words.";
    
        // Make another POST request to the server for the "con" side
        return fetch('/getResponse', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ aiinput: conInput }) // Send the con input to the server
        });
      })
      .then(response => response.json()) // Parse the second response as JSON
      .then(data => {
        console.log('Con Response:', data);
    
        const conResponse = data.message.content.replace(/\\n/g, '\n'); // Extract and format the con response
        console.log('Con Side:', conResponse);






        // Now prepare the input for the "con" side
        let proInput2 = "You are on the pro side for a debate for this topic: " + document.getElementById('debate-input').value + ". Rebuke this statement from the con side in under 30 words" + conResponse;
    
        // Make another POST request to the server for the "con" side
        return fetch('/getResponse', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ aiinput: proInput2 }) // Send the con input to the server
        });
      })
      .then(response => response.json()) // Parse the second response as JSON
      .then(data => {
        console.log('Pro Response:', data);
    
        const proResponse2 = data.message.content.replace(/\\n/g, '\n'); // Extract and format the con response
        console.log('Pro Side:', proResponse2);





 // Now prepare the input for the "con" side
 let conInput2 = "You are on the con side for a debate for this topic: " + document.getElementById('debate-input').value + ". Rebuke this statement from the con side in under 30 words" + proResponse2;
    
 // Make another POST request to the server for the "con" side
 return fetch('/getResponse', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify({ aiinput: proResponse2 }) // Send the con input to the server
 });
})
.then(response => response.json()) // Parse the second response as JSON
.then(data => {
 console.log('Con Response:', data);

 const conResponse2 = data.message.content.replace(/\\n/g, '\n'); // Extract and format the con response
 console.log('Con Side:', conResponse2);




























    
        // You can now display both responses on the page or store them for later use
      })
      .catch(error => console.error('Error:', error));
    











  } else {
    document.getElementById("aierrordebate").innerHTML = "<p style='text-align: center; color: red;'>You need to enter what you would like us to do for you</p>";
  }
}












function gotologin (){
    window.location.href = 'login' + "?" + "for=login";
  
  
  }
  
  function gotosignup (){
    window.location.href = 'login' + "?" + "for=signup";
  
  
  }
  
  
  
  function goback (){
    window.location.href = '/';
    
    }
  
  
  
  loginhome.addEventListener('click', gotologin);
  signuphome.addEventListener('click', gotosignup);
  titlepromotion.addEventListener('click', gotosignup);
  
  backbtn.addEventListener('click', goback);























  





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










