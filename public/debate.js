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


async function aiproject() {
    document.getElementById("aierrordebate").innerHTML = "";
  
    if (document.getElementById('debate-input').value !== "") {


        try {
        const debateTopic = document.getElementById('debate-input').value;
  
        // Prepare input for the "pro" side
        let aiinput = `You are on the pro side for a debate for this topic: ${debateTopic}. Give an opening response that is under 50 words.`;
        
        // Fetch the "pro" side response
        const proResponse = await fetch('/getResponse', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ aiinput: aiinput }),
        }).then((response) => response.json());
  
        const proMessage = proResponse.message.content.replace(/\\n/g, '\n');
        document.getElementById('pro1').style.display = "block";
        document.getElementById('pro1').innerText = proMessage;

  




        // Prepare input for the "con" side
        let conInput = `You are on the con side for a debate for this topic: ${debateTopic}. Give an opening response that is under 50 words.`;
  
        // Fetch the "con" side response
        const conResponse = await fetch('/getResponse', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ aiinput: conInput }),
        }).then((response) => response.json());
  
        const conMessage = conResponse.message.content.replace(/\\n/g, '\n');
        document.getElementById('con1').style.display = "block";
        document.getElementById('con1').innerText = conMessage;

  




        // Prepare input for the "pro" rebuttal
        let proRebuttalInput = `You are on the pro side for a debate for this topic: ${debateTopic}. Rebuke this statement from the con side in under 50 words: "${conMessage}"`;
  
        // Fetch the "pro" rebuttal response
        const proRebuttalResponse = await fetch('/getResponse', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ aiinput: proRebuttalInput }),
        }).then((response) => response.json());
  
        const proRebuttalMessage = proRebuttalResponse.message.content.replace(/\\n/g, '\n');
        document.getElementById('pro2').style.display = "block";
        document.getElementById('pro2').innerText = proRebuttalMessage;
  






        // Prepare input for the "con" rebuttal
        let conRebuttalInput = `You are on the con side for a debate for this topic: ${debateTopic}. Rebuke this statement from the pro side in under 50 words: "${proRebuttalMessage}"`;

        console.log('con Rebuttal prompt:', conRebuttalInput);

  
        // Fetch the "con" rebuttal response
        const conRebuttalResponse = await fetch('/getResponse', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ aiinput: conRebuttalInput }),
        }).then((response) => response.json());
  
        const conRebuttalMessage = conRebuttalResponse.message.content.replace(/\\n/g, '\n');
        document.getElementById('con2').style.display = "block";
        document.getElementById('con2').innerText = conRebuttalMessage;
  









        // Display responses or store them for later use
        console.log('Debate Complete');
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      document.getElementById("aierrordebate").innerHTML =
        "<p style='text-align: center; color: red;'>You need to enter what you would like us to do for you</p>";
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








