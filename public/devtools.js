//firebase

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js';
import { getDatabase, ref, get, child, set } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js"


  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional




const projecturl = new URLSearchParams(window.location.search).get('project');
console.log(projecturl);




const userDataString = localStorage.getItem('userData');

const userData = JSON.parse(userDataString);

var views;





fetch('/firebase-config')
.then(response => response.json())
.then(data => {
  // Use the received data (Firebase configuration JSON) here
  const app = initializeApp(data);
  const auth = getAuth(app);
  const db = getDatabase(app);

  // Now you can use the db variable

const dbref = ref(db);




get(child(dbref, 'public/' + projecturl + "/"))
.then((snapshot) => {
  if (snapshot.exists()) {
    views = snapshot.val().views !== undefined ? snapshot.val().views : 0;
    console.log("count this" + views)
  } else {
    console.log("No data found first error");
  }
})





get(child(dbref, 'accounts/' + userData.useridnumber + "/myprojects/" + projecturl + "/"))
.then((snapshot) => {
        
              if (snapshot.exists()) {
        
        
        
        
        const htmlCode = snapshot.val().html
            const cssCode = snapshot.val().css
            const jsCode = snapshot.val().js
            const publicload = snapshot.val().public
            const projectnameload = snapshot.val().projectname
            

        
document.getElementById('html-input').value = htmlCode
document.getElementById('css-input').value = cssCode
document.getElementById('js-input').value = jsCode
document.getElementById('proname').value = projectnameload;

updateLabel()


// Set the initial state of the toggle switch and toggle text
const toggleSwitch = document.getElementById('toggleSwitch');
const toggleText = document.getElementById('toggleText');

toggleSwitch.checked = publicload;
toggleText.textContent = publicload ? 'Public' : 'Private';

// Add an event listener to handle changes to the toggle switch
toggleSwitch.addEventListener('change', function () {
    toggleText.textContent = this.checked ? 'Public' : 'Private';
});





                
              } else {
                alert("No data found");
              }
            })
            .catch((error) => {
              alert("Error: " + error.message);
            });
        


          })
          .catch(error => {
            console.error('Error fetching Firebase configuration:', error);
          });




          function updateLabel() {
            if (document.getElementById('html-input').value !== "") {
              
                document.getElementById('ailabel').innerHTML = "Type what changes you'd like";
                document.getElementById('changeai').placeholder = "Change the background color to... "
            } else {
             
              document.getElementById('ailabel').innerHTML = "Type what you would like to create";
              document.getElementById('changeai').placeholder = "Make me a webpage for a... "


            }
        }

        





    updateoutput.addEventListener('click', previewproject);






function saveproject (){







  fetch('/firebase-config')
  .then(response => response.json())
  .then(data => {
    // Use the received data (Firebase configuration JSON) here
    const app = initializeApp(data);
    const auth = getAuth(app);
    const db = getDatabase(app);



console.log(db, 'accounts/' + userData.useridnumber + "/myprojects/" + projecturl + "/")

const currentDate = new Date();
const dateString = currentDate.toLocaleDateString();
const timeString = currentDate.toLocaleTimeString();
const dateTimeString = dateString + " " + timeString;


    set(ref(db, 'accounts/' + userData.useridnumber + "/myprojects/" + projecturl + "/"),{
        html: document.getElementById('html-input').value,
        css: document.getElementById('css-input').value,
        js: document.getElementById('js-input').value,
        public: document.getElementById('toggleText').innerHTML.includes("Public"),
        projectname: document.getElementById('proname').value,
        lastsaved: dateTimeString, 
        views: views !== undefined ? views : 0 // Ensure views is defined before setting


        })
        .then(()=>{
        


        
        
        })
        .catch((error)=>{
        alert("did not work sucka"+error);
        
        
        });




        const toggleText = document.getElementById('toggleText');
        if (toggleText.textContent == "Public"){


        
              const displayname = userData.displayname




        set(ref(db, 'public/' + projecturl + "/"),{
          html: document.getElementById('html-input').value,
          css: document.getElementById('css-input').value,
          js: document.getElementById('js-input').value,
          public: document.getElementById('toggleText').innerHTML.includes("Public"),
          projectname: document.getElementById('proname').value,
          lastsaved: dateTimeString,
          displayname: displayname,
          views: views !== undefined ? views : 0 // Ensure views is defined before setting

          })
          .then(()=>{
          
          })
          .catch((error)=>{
          alert("did not work sucka"+error);
          
          
          });}






      })
      .catch(error => {
        console.error('Error fetching Firebase configuration:', error);
      });
    







}




function previewproject (){


  document.getElementById('loadingMessage').style.display = 'block';



  updateLabel();

 if(document.getElementById("updateoutput").textContent=="Preview") {

  



  
  




  
  
  
    //preview info 

    const htmlCodeupdate =  document.getElementById('html-input').value
    const cssCodeupdate  = document.getElementById('css-input').value 
    const  jsCodeupdate  = document.getElementById('js-input').value  
    
    localStorage.setItem('projecthtml', htmlCodeupdate);
    localStorage.setItem('projectcss', cssCodeupdate);
    localStorage.setItem('projectjs', jsCodeupdate);
     
    

  













  
    fetch('/firebase-config')
    .then(response => response.json())
    .then(data => {
      // Use the received data (Firebase configuration JSON) here
      const app = initializeApp(data);
      const auth = getAuth(app);
      const db = getDatabase(app);
  
 //Save to private database 
  
  console.log(db, 'accounts/' + userData.useridnumber + "/myprojects/" + projecturl + "/")
  
  const currentDate = new Date();
  const dateString = currentDate.toLocaleDateString();
  const timeString = currentDate.toLocaleTimeString();
  const dateTimeString = dateString + " " + timeString;
    
  
  
      set(ref(db, 'accounts/' + userData.useridnumber + "/myprojects/" + projecturl + "/"),{
          html: document.getElementById('html-input').value,
          css: document.getElementById('css-input').value,
          js: document.getElementById('js-input').value,
          public: document.getElementById('toggleText').innerHTML.includes("Public"),
          projectname: document.getElementById('proname').value,
          lastsaved: dateTimeString,
 views: views !== undefined ? views : 0 // Ensure views is defined before setting
  
  
  
          })
          .then(()=>{
          
  
  
          
          
          })
          .catch((error)=>{
          alert("did not work sucka"+error);
          
          
          });








  


//Save to Public Database
          const toggleText = document.getElementById('toggleText');
          if (toggleText.textContent == "Public"){
  
  
          
                const displayname = userData.displayname
  
  
  
  
          set(ref(db, 'public/' + projecturl + "/"),{
            html: document.getElementById('html-input').value,
            css: document.getElementById('css-input').value,
            js: document.getElementById('js-input').value,
            public: document.getElementById('toggleText').innerHTML.includes("Public"),
            projectname: document.getElementById('proname').value,
            lastsaved: dateTimeString,
            displayname: displayname,
            views: views !== undefined ? views : 0 // Ensure views is defined before setting

            })
            .then(()=>{
            
            })
            .catch((error)=>{
            alert("did not work sucka"+error);
            
            
            });}
  
      


   
  
  

        })
        .catch(error => {
          console.error('Error fetching Firebase configuration:', error);
        });
      



        setTimeout(() => {        
document.getElementById("updateoutput").textContent="Back to Editor"
const projectname = localStorage.getItem('project')
window.location.href = 'devtoolspreview?preview=' + projectname
document.getElementById('loadingMessage').style.display = 'none';


}, 700);


      } else {
        document.getElementById("updateoutput").textContent="Preview"



      }






  }








//Toggle Button

document.getElementById('toggleSwitch').addEventListener('change', function () {
    const toggleText = document.getElementById('toggleText');
    toggleText.textContent = this.checked ? 'Public' : 'Private';

    fetch('/firebase-config')
  .then(response => response.json())
  .then(data => {
    // Use the received data (Firebase configuration JSON) here
    const app = initializeApp(data);
    const auth = getAuth(app);
    const db = getDatabase(app);



if (toggleText.textContent == "Public"){

    console.log("Public")

    const currentDate = new Date();
  const dateString = currentDate.toLocaleDateString();
  const timeString = currentDate.toLocaleTimeString();
  const dateTimeString = dateString + " " + timeString;

    set(ref(db, 'accounts/' + userData.useridnumber + "/myprojects/" + projecturl + "/"),{
        public: true,
        html: document.getElementById('html-input').value,
        css: document.getElementById('css-input').value,
        js: document.getElementById('js-input').value,
        projectname: document.getElementById('proname').value,
        lastsaved: dateTimeString,
 views: views !== undefined ? views : 0 // Ensure views is defined before setting
        })
        .then(()=>{
        })
        .catch((error)=>{
        alert("did not work sucka"+error);
        });


    


        
              const displayname = userData.displayname

        set(ref(db, 'public/' + projecturl + "/"),{
          html: document.getElementById('html-input').value,
          css: document.getElementById('css-input').value,
          js: document.getElementById('js-input').value,
          public: document.getElementById('toggleText').innerHTML.includes("Public"),
          projectname: document.getElementById('proname').value,
          lastsaved: dateTimeString,
          displayname: displayname,
          views: views !== undefined ? views : 0 // Ensure views is defined before setting

          })
          .then(()=>{
          
          })
          .catch((error)=>{
          alert("did not work sucka"+error);
          
          
          });


} else {
    console.log("Private")

    const currentDate = new Date();
  const dateString = currentDate.toLocaleDateString();
  const timeString = currentDate.toLocaleTimeString();
  const dateTimeString = dateString + " " + timeString;

    set(ref(db, 'accounts/' + userData.useridnumber + "/myprojects/" + projecturl + "/"),{
        public: false,
        html: document.getElementById('html-input').value,
        css: document.getElementById('css-input').value,
        js: document.getElementById('js-input').value,
        projectname: document.getElementById('proname').value,
        lastsaved: dateTimeString,
 views: views !== undefined ? views : 0 // Ensure views is defined before setting
        })
        .then(()=>{
        })
        .catch((error)=>{
        alert("did not work sucka"+error);
        });



        set(ref(db, 'public/' + projecturl + "/"),null)
          .then(()=>{
          
          })
          .catch((error)=>{
          alert("did not work sucka"+error);
          
          
          });





}


})
.catch(error => {
  console.error('Error fetching Firebase configuration:', error);
});


});















//AI








aibuttonsend.addEventListener('click', aiproject);




function aiproject() {
  document.getElementById("aierror").innerHTML = "";

  if (document.getElementById('changeai').value !== "") {
    let aiinput;
    if (document.getElementById('html-input').value !== "") {
      aiinput = "You are a web developer for a web service where your code is put into an iframe on a website. Here is the current code: HTML: " + document.getElementById('html-input').value + " CSS: " + document.getElementById('css-input').value + " JS: " + document.getElementById('js-input').value + " Take this code and make these changes " + document.getElementById('changeai').value + " I need the full html css and js code. divide the code by ```html ```css ```javascript and only give me the code in the response. In the html add this in the header for set purpose <meta name=description content=> and <meta name=keywords content=>";
    } else {
      aiinput = "You are a web developer for a web service where your code is put into an iframe on a website. I want the full code only!! I need the full html css and js code to create a webpage, the following is the prompt from the user" + document.getElementById('changeai').value + " I need the full html css and js code for this webpage. Don't add any images and divide the code by ```html ```css ```javascript and only give me the code in the response. In the html add this in the header for set purpose <meta name=description content=> and <meta name=keywords content=>";
    }







    document.getElementById('loadingMessage').style.display = 'block';

    fetch('/getResponse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ aiinput: aiinput })
    })
      .then(response => response.json())
      .then(data => {
        document.getElementById('loadingMessage').style.display = 'none';
    
        if (!data.content) {
          throw new Error("AI response content is empty or undefined");
        }
    
        const airesponse = data.content.replace(/\\n/g, '\n'); 
    


        const htmlStartIndex = airesponse.indexOf("```html");
        const cssStartIndex = airesponse.indexOf("```css");
        const jsStartIndex = airesponse.indexOf("```javascript");
    
        const htmlEndIndex = cssStartIndex !== -1 ? cssStartIndex : jsStartIndex;
        const cssEndIndex = jsStartIndex !== -1 ? jsStartIndex : airesponse.length;
    
        const htmlCode = airesponse.substring(htmlStartIndex, htmlEndIndex).trim().replace(/```html/g, '').replace(/```/g, '').trim();
        const cssCode = airesponse.substring(cssStartIndex, cssEndIndex).trim().replace(/```css/g, '').replace(/```/g, '').trim();
        const jsCode = airesponse.substring(jsStartIndex).trim().replace(/```javascript/g, '').replace(/```/g, '').trim();
    
        // Populate text boxes with typing effect
        const htmlTyping = populateTextBoxWithTypingEffect('html-input', htmlCode, 1);
        const cssTyping = populateTextBoxWithTypingEffect('css-input', cssCode, 1);
        const jsTyping = populateTextBoxWithTypingEffect('js-input', jsCode, 1);
    
        Promise.all([htmlTyping, cssTyping, jsTyping]).then(previewproject);
      })
      .catch(error => {
        console.error('Error:', error);
        alert("An error occurred: " + error.message); // Inform the user of the issue
      });
    

    document.getElementById('changeai').value = "";
  } else {
    document.getElementById("aierror").innerHTML = "<p style='text-align: center; color: red;'>You need to enter what you would like us to do for you</p>";
  }
}

// Function to simulate typing effect
function typeText(element, text, index, delay) {
  if (index < text.length) {
    element.value += text.charAt(index);
    index++;
    element.scrollTop = element.scrollHeight; // Scroll down
    setTimeout(function() {
      typeText(element, text, index, delay);
    }, delay);
  }
}

// Function to populate text boxes with typing effect
function populateTextBoxWithTypingEffect(elementId, text, delay) {
  const element = document.getElementById(elementId);
  let index = 0;

  return new Promise((resolve) => {
    function typeCharacter() {
      if (index < text.length) {
        element.value += text.charAt(index);
        index++;
        element.scrollTop = element.scrollHeight; // Scroll down
        setTimeout(typeCharacter, delay);
      } else {
        resolve(); // Resolve the promise when typing is done
      }
    }

    element.value = ''; // Clear the element before starting
    typeCharacter();
  });
}









function goback (){
  saveproject ()
  window.location.href = 'myaccount';
  
  }

  backbtndevtool.addEventListener('click', goback);
  backbtndevtoolmobile.addEventListener('click', goback);




  





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










  //Share Work





  function genqrcode() {

    document.getElementById("outputshare").innerHTML = "";


    const toggleText = document.getElementById('toggleText');
  
  
  
  
  if (toggleText.textContent == "Public"){




var qrcode = new QRCode("outputshare", {
  text: "https://www.div-idy.com/view?v=" + projecturl,
  colorDark: "#0a4a79", // foreground color
  colorLight: "#ffffff", // background color
  width: 200,
  height: 200
});


// Append the button at the end of the content inside the element with ID 'outputshare'
document.getElementById("outputshare").insertAdjacentHTML('beforeend', `<button id="buttondownloadQR">Download QR Code</button>`);


}else {

      document.getElementById("outputshare").innerHTML = "<p style='text-align: center; color: red;'>Your project needs to be public to be shared</p>";
    
    }

}

document.getElementById("downloadQR").addEventListener('click', genqrcode);







function downloadqrcode (){

console.log("clicked")
  
      var qrCodeImage = document.getElementById("outputshare").querySelector("img");
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');
      canvas.width = qrCodeImage.width;
      canvas.height = qrCodeImage.height;
      context.drawImage(qrCodeImage, 0, 0);
      var a = document.createElement('a');
      a.href = canvas.toDataURL('image/png');
      a.download = 'qr_code.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);


}


// Attach event listener to document and delegate the event to the button
document.addEventListener('click', function(event) {
  if (event.target && event.target.id === 'buttondownloadQR') {
      downloadqrcode();
  }
});









function copylinkfun() {

  document.getElementById("outputshare").innerHTML = "";


  const toggleText = document.getElementById('toggleText');




if (toggleText.textContent == "Public"){




  

  var link = "https://www.div-idy.com/view?v=" + projecturl;


  document.getElementById("outputshare").innerHTML = "<a href='" + link + "'>" + link + "</a>";
  document.getElementById("outputshare").innerHTML += "<p style='text-align: center'; >Link copied!!</p>";



  // Create a temporary input element
  var tempInput = document.createElement("input");
  tempInput.value = link;
  document.body.appendChild(tempInput);

  // Select the text in the input element
  tempInput.select();
  tempInput.setSelectionRange(0, 99999); // For mobile devices

  // Copy the selected text
  document.execCommand("copy");

  // Remove the temporary input
  document.body.removeChild(tempInput);
}

else {

  document.getElementById("outputshare").innerHTML = "<p style='text-align: center; color: red;'>Your project needs to be public to be shared</p>";

}



}

document.getElementById("copyLink").addEventListener('click', copylinkfun);






