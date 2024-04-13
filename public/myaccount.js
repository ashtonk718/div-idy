

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-analytics.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js';

  import { getDatabase, ref, set, get, child } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js';



  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration







// Retrieve data from local storage
const userDataString = localStorage.getItem('userData');

if (userDataString) {
    const userData = JSON.parse(userDataString);

    //header
    document.getElementById('accountbtn').style.display = "block";
    const username = userData.displayname;
    document.getElementById('accountbtn').textContent = username;

    const userid = userData.useridnumber;

    fetch('/firebase-config')
        .then(response => response.json())
        .then(data => {
            const app = initializeApp(data);
            const auth = getAuth(app);
            const db = getDatabase(app);

            const userRef = ref(db, 'accounts/' + userid);

            get(userRef)
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        const userData = snapshot.val();
                        localStorage.setItem('userData', JSON.stringify(userData));
                        const displayName = userData.displayname;
                        document.getElementById('displayname').innerHTML = "Welcome " + displayName;

                        const projectsContainer = document.querySelector('.projects');

                        // Convert myprojects into an array of objects with additional projectNumber property
                        const projectsArray = Object.keys(userData.myprojects).map(projectNumber => {
                            return {
                                projectNumber: projectNumber,
                                projectData: userData.myprojects[projectNumber]
                            };
                        });

                        // Sort projectsArray based on the lastsaved property
                        projectsArray.sort((a, b) => {
                            // Convert last saved dates to Date objects
                            const lastSavedA = a.projectData.lastsaved ? new Date(a.projectData.lastsaved) : new Date(0); // If undefined, use lowest possible date
                            const lastSavedB = b.projectData.lastsaved ? new Date(b.projectData.lastsaved) : new Date(0); // If undefined, use lowest possible date
                            return lastSavedB - lastSavedA; // Sort in descending order based on last saved date
                        });

                        // Iterate over sorted projectsArray and create a div for each project
                        projectsArray.forEach(project => {
                          const projectNumber = project.projectNumber;
                          const projectData = project.projectData;
                      
                          // Fetch publicviews data
                          fetch('/firebase-config')
                              .then(response => response.json())
                              .then(data => {
                                  const app = initializeApp(data);
                                  const auth = getAuth(app);
                                  const db = getDatabase(app);
                                  const dbref = ref(db);
                      
                                  // Get publicviews from Firebase
                                  get(child(dbref, 'public/' + projectNumber + "/"))
                                      .then((snapshot) => {
                                          let publicviews = 0; // Initialize publicviews
                                          if (snapshot.exists()) {
                                              publicviews = snapshot.val().views !== undefined ? snapshot.val().views : 0;
                                          }
                      
                                          // Create project div with updated publicviews
                                          const projectDiv = document.createElement('div');
                                          projectDiv.classList.add('myaccountprojects');
                                          projectDiv.innerHTML = `${projectData.projectname} <br> ID: ${projectNumber}<br> Views: ${publicviews} <br> Last Modified: ${projectData.lastsaved}<br><button id="deleteproject" class="delete-btn"><span class="material-symbols-outlined delete-icon">delete</span></button>`;
                      
                                          projectDiv.addEventListener('click', function () {
                                              window.location.href = 'devtools.html?project=' + projectNumber;
                                          });
                      
                                          // Add event listener to delete button
                                          const deleteButton = projectDiv.querySelector('#deleteproject');
                                          deleteButton.addEventListener('click', function (event) {
                                              event.stopPropagation(); // Prevent the click event from triggering the project div's click event
                                              // Delete the project from Firebase and refresh the page
                                              deleteProject(projectNumber);
                                          });
                      
                                          projectsContainer.appendChild(projectDiv);
                                      })
                                      .catch(error => {
                                          console.error('Error getting publicviews:', error);
                                      });
                              })
                              .catch(error => {
                                  console.error('Error fetching Firebase configuration:', error);
                              });
                      });
                      
                    } else {
                        console.log("User data not found.");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error.message);
                });
        })
        .catch(error => {
            console.error('Error fetching Firebase configuration:', error);
        });
} else {
    console.error("User data not found in local storage");
}









newproject.addEventListener('click', createnewproject);

function createnewproject () {
  document.getElementById("newprojectnamemodal").style.display = "block"
  document.getElementById("errornewproject").innerHTML = "";

}

closenew.addEventListener('click', closenewproject);
function closenewproject () {
  document.getElementById("newprojectnamemodal").style.display = "none"
  document.getElementById("errornewproject").innerHTML = "";

}










createnewprojectbtn.addEventListener('click', addnewproject);



function addnewproject () {



  const projectNameInput = document.getElementById("projectnameinput");
  
  if (projectNameInput.value.trim() !== "") { // Check if the input field has a non-empty value
 


  function generateRandom16DigitNumber() {
    let randomNumber = '';
    for (let i = 0; i < 16; i++) {
        // Generate a random digit (0 to 9) and convert it to a string
        let randomDigit = Math.floor(Math.random() * 10).toString();
        // Concatenate the digit to the result
        randomNumber += randomDigit;
    }
    return randomNumber;
}

// project number
const random16DigitNumber = generateRandom16DigitNumber();
console.log(random16DigitNumber);


let projectnameinput = document.getElementById("projectnameinput").value

const userDataString = localStorage.getItem('userData');

const userData = JSON.parse(userDataString);

fetch('/firebase-config')
.then(response => response.json())
.then(data => {
  // Use the received data (Firebase configuration JSON) here
  const app = initializeApp(data);
  const auth = getAuth(app);
  const db = getDatabase(app);


set(ref(db, 'accounts/' + userData.useridnumber + "/myprojects/" + random16DigitNumber + "/"),{
  html: "",
  css: "",
  js: "",
  public: false,
projectname: projectnameinput,
views: 0
  })
  .then(()=>{alert("data stored successfully");  window.location.href = 'devtools.html?project=' + random16DigitNumber;
}).catch((error)=>{alert("did not work sucka"+error);});



})
.catch(error => {
  console.error('Error fetching Firebase configuration:', error);
});


document.getElementById("errornewproject").innerHTML = "";


} else {

  document.getElementById("errornewproject").innerHTML = "You need to have a name for your project";


}





}







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
  window.location.href = 'index.html'
}

logoutbtn.addEventListener('click', logout);



function dividy ()
{

  window.location.href = 'index.html'


}



headerlogomya.addEventListener('click', dividy);



// Function to delete project from Firebase and refresh the page
function deleteProject(projectNumber) {
  const userDataString = localStorage.getItem('userData');
  const userData = JSON.parse(userDataString);

  fetch('/firebase-config')
      .then(response => response.json())
      .then(data => {
          const app = initializeApp(data);
          const db = getDatabase(app);

          const projectRef = ref(db, `accounts/${userData.useridnumber}/myprojects/${projectNumber}`);
          // Remove the project data from Firebase
          set(projectRef, null)
              .then(() => {
                  console.log('Project deleted successfully');
                  // Refresh the page
                  location.reload();
              })
              .catch(error => {
                  console.error('Error deleting project:', error);
              });
      })
      .catch(error => {
          console.error('Error fetching Firebase configuration:', error);
      });
}


localStorage.removeItem("firebase:host:webbuilder-b3a38-default-rtdb.firebaseio.com");
