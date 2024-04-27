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


// Set the initial state of the toggle switch and toggle text
const toggleSwitch = document.getElementById('toggleSwitch');
const toggleText = document.getElementById('toggleText');

toggleSwitch.checked = publicload;
toggleText.textContent = publicload ? 'Public' : 'Private';

// Add an event listener to handle changes to the toggle switch
toggleSwitch.addEventListener('change', function () {
    toggleText.textContent = this.checked ? 'Public' : 'Private';
});




const outputFrame = document.getElementById('outputiframepreview');

// Access the contentDocument property directly
const outputDocument = outputFrame.contentDocument || outputFrame.contentWindow.document;

outputDocument.open();
outputDocument.write(`${htmlCode}<style>${cssCode}</style><script>${jsCode}</script>`);
outputDocument.close();


                
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






    updateoutput.addEventListener('click', previewproject);

    buttonsaveproject.addEventListener('click', saveproject);





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

    const htmlCodeupdate =  document.getElementById('html-input').value
    const cssCodeupdate  = document.getElementById('css-input').value 
    const  jsCodeupdate  = document.getElementById('js-input').value  

        const outputFrame = document.getElementById('outputiframepreview');

        // Access the contentDocument property directly
        const outputDocument = outputFrame.contentDocument || outputFrame.contentWindow.document;
        
        outputDocument.open();
        outputDocument.write(`${htmlCodeupdate}<style>${cssCodeupdate}</style><script>${jsCodeupdate}</script>`);
        outputDocument.close();



      })
      .catch(error => {
        console.error('Error fetching Firebase configuration:', error);
      });
    







}




function previewproject (){


 if(document.getElementById("updateoutput").textContent=="Preview") {

  

  document.getElementById("codeoutputpreview").style.display = "block";
  
  // Get the window height
  var windowHeight = window.innerHeight;
  
  // Calculate the desired height for the iframe
  var iframeHeight = windowHeight - 150;
  
  // Set the height of the iframe
  document.getElementById('outputiframepreview').style.height = iframeHeight + 'px';
  
  
  
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
  
  
      const htmlCodeupdate =  document.getElementById('html-input').value
      const cssCodeupdate  = document.getElementById('css-input').value 
      const  jsCodeupdate  = document.getElementById('js-input').value  
  
          const outputFrame = document.getElementById('outputiframepreview');
  
          // Access the contentDocument property directly
          const outputDocument = outputFrame.contentDocument || outputFrame.contentWindow.document;
          
          outputDocument.open();
          outputDocument.write(`${htmlCodeupdate}<style>${cssCodeupdate}</style><script>${jsCodeupdate}</script>`);
          outputDocument.close();
  
  

        })
        .catch(error => {
          console.error('Error fetching Firebase configuration:', error);
        });
      
        document.getElementById("updateoutput").textContent="Back to Editor"

      } else {
        document.getElementById("updateoutput").textContent="Preview"

        closemodal ()


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


  if (document.getElementById('html-input').value !== "") {


    var aiinput = "HTML: " + document.getElementById('html-input').value + " CSS: " + document.getElementById('css-input').value + "JS: " + document.getElementById('js-input').value + "Take this code and make these changes " + document.getElementById('changeai').value + " I need the full html css and js code. divide the code by ```html ```css ```javascript and only give me the code in the response";


} else {

  var aiinput = "I want the full code only!! I need the full html css and js code to create a website where " + document.getElementById('changeai').value + " I need the full html css and js code for this webpage. divide the code by ```html ```css ```javascript and only give me the code in the response";

}




document.getElementById('loadingMessage').style.display = 'block';





  // Make a POST request to the server
  fetch('/getResponse', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ aiinput: aiinput }) // Send the input to the server
  })
  .then(response => response.json()) // Parse the response as JSON
  .then(data => {

    document.getElementById('loadingMessage').style.display = 'none';




    const airesponse = data.message.content.replace(/\\n/g, '\n'); // Extract HTML code and replace newline characters

    // Find the indexes where each code block starts and ends
    const htmlStartIndex = airesponse.indexOf("```html");
    const cssStartIndex = airesponse.indexOf("```css");
    const jsStartIndex = airesponse.indexOf("```javascript");

    const htmlEndIndex = cssStartIndex !== -1 ? cssStartIndex : jsStartIndex;
    const cssEndIndex = jsStartIndex !== -1 ? jsStartIndex : airesponse.length;

    const htmlCode = airesponse.substring(htmlStartIndex, htmlEndIndex).trim().replace(/```html/g, '').replace(/```/g, '').trim();
    const cssCode = airesponse.substring(cssStartIndex, cssEndIndex).trim().replace(/```css/g, '').replace(/```/g, '').trim();
    const jsCode = airesponse.substring(jsStartIndex).trim().replace(/```javascript/g, '').replace(/```/g, '').trim();

    // Populate text boxes with typing effect
    populateTextBoxWithTypingEffect('html-input', htmlCode, 1); // Adjust delay as needed
    populateTextBoxWithTypingEffect('css-input', cssCode, 1); // Adjust delay as needed
    populateTextBoxWithTypingEffect('js-input', jsCode, 1); // Adjust delay as needed

  })
  .catch(error => console.error('Error:', error));


  document.getElementById('changeai').value="";

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
  const textBox = document.getElementById(elementId);
  textBox.value = ''; // Clear the text box
  typeText(textBox, text, 0, delay);
}








function goback (){
  saveproject ()
  window.location.href = 'myaccount.html';
  
  }

  backbtndevtool.addEventListener('click', goback);
  backbtndevtoolmobile.addEventListener('click', goback);




  function closemodal (){


    document.getElementById("codeoutputpreview").style.display = "none";

    document.getElementById("updateoutput").textContent="Preview"

    }
  
    closepreview.addEventListener('click', closemodal);



    function changedevice() {
      var deviceButton = document.getElementById("devicepreview");
      if (deviceButton.innerHTML.includes("smartphone")) {
          deviceButton.innerHTML = '<span class="material-symbols-outlined">computer</span>';
          document.getElementById("outputiframepreview").style.width = "411px";
      } else {
          deviceButton.innerHTML = '<span class="material-symbols-outlined">smartphone</span>';
          document.getElementById("outputiframepreview").style.width = "100%";
      }
  }
  
  document.getElementById("devicepreview").addEventListener('click', changedevice);
  
    


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