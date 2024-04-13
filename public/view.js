// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js';
import { getDatabase, ref, set, get, update, increment } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js';



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration







function onPageLoad() {


//header
const userDataString = localStorage.getItem('userData');
  if (userDataString) {


    document.getElementById('accountbtn').style.display = "block";
    const userData = JSON.parse(userDataString);
    const username = userData.displayname;
    document.getElementById('accountbtn').textContent = username;

    document.getElementById('loginhome').style.display = "none";
    document.getElementById('signuphome').style.display = "none";

  }else{
    document.getElementById('accountbtn').style.display = "none";
    document.getElementById('loginhome').style.display = "inline-block";
    document.getElementById('signuphome').style.display = "inline-block";

  }






  // Check if the current page is view.html
  if (window.location.pathname.includes('view.html')) {
      const queryString = window.location.search;
      const productValue = new URLSearchParams(queryString).get('v');
      console.log(productValue);


      fetch('/firebase-config')
      .then(response => response.json())
      .then(data => {
        // Use the received data (Firebase configuration JSON) here
        const app = initializeApp(data);
        const auth = getAuth(app);
        const db = getDatabase(app);


      const projectsRef = ref(db, 'public');


      const projectRef = ref(db, 'public/' + productValue);
      update(projectRef, {
          views: increment(1)
      }).catch(error => {
          console.error('Error updating views count:', error);
      });



      // Fetch data from Firebase
      get(projectsRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const projects = snapshot.val();
  
            // Initialize variables to store data
            let htmlcode, csscode, jscode;
  
            // Iterate through user accounts
            for (const projectId in projects) {


          

                if (projects.hasOwnProperty(projectId)) {
                  const project = projects[projectId];

                  console.log("User Projects:", project); // Add this line for debugging
              
                  // Check if productValue matches a project name
                  if (projects && projects.hasOwnProperty(productValue)) {
                    const project = projects[productValue];
              
                    console.log("Project:", project); // Add this line for debugging
              
                    // Assign data to variables
                    htmlcode = project.html || '';
                    csscode = project.css || '';
                    jscode = project.js || '';
              

                  

                    // Break the loop since we found the project
                    break;
                  }
                }
              }
              
  
            // Now you can use htmlcode, csscode, and jscode as needed
            console.log('HTML Code:', htmlcode);
            console.log('CSS Code:', csscode);
            console.log('JS Code:', jscode);

            const outputFrame = document.getElementById('outputviewmode');

            // Access the contentDocument property directly
            const outputDocument = outputFrame.contentDocument || outputFrame.contentWindow.document;
        
            outputDocument.open();
            outputDocument.write(`${htmlcode}<style>${csscode}</style><script>${jscode}</script>`);
            outputDocument.close();



          } else {
            console.log('No data available');
          }
        })
        .catch((error) => {
          console.error('Error getting data:', error);
        });




      })
      .catch(error => {
        console.error('Error fetching Firebase configuration:', error);
      });




  }




}

window.onload = onPageLoad;





function gotologin (){
  window.location.href = 'login.html' + "?" + "for=login";


}

function gotosignup (){
  window.location.href = 'login.html' + "?" + "for=signup";


}



function goback (){
  window.location.href = 'index.html';
  
  }



loginhome.addEventListener('click', gotologin);
signuphome.addEventListener('click', gotosignup);
backbtn.addEventListener('click', goback);










document.addEventListener("click", function(event) {
  var dropdownContent = document.getElementById("dropdownContent");
  var accountBtn = document.getElementById("accountbtn");
  // Check if the clicked element is not the accountBtn or inside the dropdownContent
  if (!event.target.matches("#accountbtn") && !dropdownContent.contains(event.target)) {
      dropdownContent.style.display = "none";
  }
});

document.getElementById("accountbtn").addEventListener("click", function(event) {
  var dropdownContent = document.getElementById("dropdownContent");
  // Toggle the display of the dropdownContent
  dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
  // Prevent event propagation to avoid closing the dropdown immediately after opening it
  event.stopPropagation();
});



function gotomyaccount (){

  window.location.href = 'myaccount.html'
}


myaccountlocation.addEventListener('click', gotomyaccount);



function logout (){

// Delete the keys from localStorage
localStorage.removeItem('firebase:host:webbuilder-b3a38-default-rtdb.firebaseio.com');
localStorage.removeItem('userData');

// Refresh the page
location.reload();

}

logoutbtn.addEventListener('click', logout);




