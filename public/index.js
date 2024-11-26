//sign in buttons

function gotologin (){
    window.location.href = 'login' + "?" + "for=login";


}

function gotosignup (){
    window.location.href = 'login' + "?" + "for=signup";


}





loginhome.addEventListener('click', gotologin);
signuphome.addEventListener('click', gotosignup);
titlepromotion.addEventListener('click', gotosignup);



//firebase

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js';
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js"


  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional

  fetch('/firebase-config')
  .then(response => response.json())
  .then(data => {
    // Use the received data (Firebase configuration JSON) here
    const app = initializeApp(data);
    const auth = getAuth(app);
    const db = getDatabase(app);

    // Now you can use the db variable
    onPageLoad(db); // Pass db as an argument to onPageLoad function
  })
  .catch(error => {
    console.error('Error fetching Firebase configuration:', error);
  });





//initial page load projects
const posterThumbnailsDiv = document.getElementById('posterthumbnails');

function onPageLoad(db) {

    document.getElementById('loadingMessage').style.display = 'block';


    // Nav Buttons
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
        document.getElementById('accountbtn').style.display = "block";
        const userData = JSON.parse(userDataString);
        const username = userData.displayname;
        document.getElementById('accountbtn').textContent = username;
        document.getElementById('loginhome').style.display = "none";
        document.getElementById('signuphome').style.display = "none";
        document.getElementById('titlepromotion').style.display = "none";

    } else {
        document.getElementById('accountbtn').style.display = "none";
        document.getElementById('loginhome').style.display = "inline-block";
        document.getElementById('signuphome').style.display = "inline-block";
        document.getElementById('titlepromotion').style.display = "block";

        
    }

    const projectsRef = ref(db, 'public'); // Reference to the 'public' folder in Firebase

    // Fetch data from Firebase
    get(projectsRef)
    .then((snapshot) => {
        if (snapshot.exists()) {
            const projects = snapshot.val();

                // Initialize an array to store project names
                const publicProjects = [];

               // Iterate through projects
               for (const projectId in projects) {
                if (projects.hasOwnProperty(projectId)) {
                    const project = projects[projectId];
                    // Check if the project is public
                        const userDisplayName = project.displayname; // Fetch display name from project
                        const userDisplayViews = project.views !== undefined ? project.views : 0;
                        const projectName = projectId
                        // Push project data to publicProjects array
                        publicProjects.push({
                            projectContainer: createProjectContainer(project, userDisplayName, userDisplayViews, projectName), // Pass project data to createProjectContainer
                            views: userDisplayViews


                        });

                }
            }

            // Sort projects by the number of views (descending order)
            publicProjects.sort((a, b) => b.views - a.views);

            // Limit to top 20 projects
            const topProjects = publicProjects.slice(0, 20);

            // Append sorted project containers to posterThumbnailsDiv
            topProjects.forEach(project => {
                posterThumbnailsDiv.appendChild(project.projectContainer);
            });
        } else {
            console.log('No data available');
        }
    })
    .catch((error) => {
        console.error('Error getting data:', error);
    });




    localStorage.removeItem("firebase:host:webbuilder-b3a38-default-rtdb.firebaseio.com");

      

}

// Function to create a project container element
function createProjectContainer(project, userDisplayName, userDisplayViews, projectName) {
    const projectContainer = document.createElement('div');
    projectContainer.classList.add('project-container');

    // Store projectName within the scope of createProjectContainer function
    projectContainer.dataset.projectName = projectName;

    // Create a container for the preview
    const previewContainer = document.createElement('div');
    previewContainer.classList.add('preview-container');
    projectContainer.appendChild(previewContainer);

    // Create an iframe
    const iframeElement = document.createElement('iframe');
    iframeElement.classList.add('preview-iframe');
    const combinedCode = `<html><head><style>${project.css}*{transform: scale(0.6);transform-origin: top left;}</style></head><body>${project.html}</body></html>`;
    iframeElement.srcdoc = combinedCode;
    previewContainer.appendChild(iframeElement);

    // Create an overlay div
    const overlayDiv = document.createElement('div');
    overlayDiv.classList.add('overlay');
    overlayDiv.addEventListener('click', () => {
        // Retrieve projectName from dataset
        const clickedProjectName = projectContainer.dataset.projectName;
        window.location.href = `view?v=${clickedProjectName}`;
    });
    projectContainer.appendChild(overlayDiv);

    // Create a header for the project name
    const projectHeader = document.createElement('h3');
    projectHeader.textContent = project.projectname;
    projectHeader.classList.add('project-name');
    projectHeader.addEventListener('click', () => {
        const clickedProjectName = projectContainer.dataset.projectName;
        window.location.href = `view?v=${clickedProjectName}`;
    });
    projectContainer.appendChild(projectHeader);

    // Add display name to the container
    const displayNameElement = document.createElement('p');
    displayNameElement.textContent = userDisplayName;
    displayNameElement.classList.add('user-name');
    projectContainer.appendChild(displayNameElement);

    // Add display views to the container
    const displayViewElement = document.createElement('p');
    displayViewElement.textContent = `Views: ${userDisplayViews}`;
    displayViewElement.classList.add('user-name');
    projectContainer.appendChild(displayViewElement);

    document.getElementById('loadingMessage').style.display = 'none';



    return projectContainer;

}




  window.onload = onPageLoad;
  






    function search() {
      const searchInput = document.getElementById('searchhp');
      const searchValue = searchInput.value.trim().toLowerCase(); // Convert search value to lowercase for case-insensitive search
  
      if (searchValue !== '') {

        
        

const posterthumbnails = document.getElementById('posterthumbnails');
posterthumbnails.innerHTML = '';



          fetch('/firebase-config')
          .then(response => response.json())
          .then(data => {
              // Use the received data (Firebase configuration JSON) here
              const app = initializeApp(data);
              const auth = getAuth(app);
              const db = getDatabase(app);
              
              const projectsRef = ref(db, 'public'); // Reference to the 'public' folder in Firebase

              // Fetch data from Firebase
              get(projectsRef)
              .then((snapshot) => {
                  if (snapshot.exists()) {
                      const projects = snapshot.val();
          


                          // Initialize an array to store project names
                          const publicProjects = [];
          
                         // Iterate through projects
                         for (const projectId in projects) {
                          if (projects.hasOwnProperty(projectId)) {
                              const project = projects[projectId];
                              // Check if the project is public

                             



                              if ((project.projectname && project.projectname.toLowerCase().includes(searchValue)) || (project.html && project.html.toLowerCase().includes(searchValue))) {

                             
                                const userDisplayName = project.displayname; // Fetch display name from project
                                const userDisplayViews = project.views !== undefined ? project.views : 0;
                                const projectName = projectId


  // Pass the search value to createProjectContainersearch
  const projectContainer = createProjectContainersearch(project, userDisplayName, userDisplayViews, projectName, searchValue);

                                  // Push project data to publicProjects array
                                  if (projectContainer !== null) {
                                    // Push project data to publicProjects array only if projectContainer is not null
                                    publicProjects.push({
                                        projectContainer: projectContainer,
                                        views: userDisplayViews
                                    });
                                }

                                  console.log(projectName)

                                }
                          }
                      }
          
                      // Sort projects by the number of views (descending order)
                      publicProjects.sort((a, b) => b.views - a.views);
          
                      // Limit to top 20 projects
                      const topProjects = publicProjects.slice(0, 20);
          
                      // Append sorted project containers to posterThumbnailsDiv
                      topProjects.forEach(project => {
                          posterThumbnailsDiv.appendChild(project.projectContainer);
                      });
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




      } else {
          // Handle case when search value is empty
          // For example, you can clear the search results or display a message
          console.log('Search field is empty');
          // Add your code here to handle the empty search value
      }
  }
  
  // Call the search function when the search button is clicked
  searchButton.addEventListener('click', search);
  




// Function to create a project container element
function createProjectContainersearch(project, userDisplayName, userDisplayViews, projectName) {



  // Check if the project name contains the search value
      const projectContainer = document.createElement('div');
      projectContainer.classList.add('project-container');

      // Store projectName within the scope of createProjectContainer function
      projectContainer.dataset.projectName = projectName;

      // Create a container for the preview
      const previewContainer = document.createElement('div');
      previewContainer.classList.add('preview-container');
      projectContainer.appendChild(previewContainer);

      // Create an iframe
      const iframeElement = document.createElement('iframe');
      iframeElement.classList.add('preview-iframe');
      const combinedCode = `<html><head><style>${project.css}*{transform: scale(0.6);transform-origin: top left;}</style></head><body>${project.html}</body></html>`;
      iframeElement.srcdoc = combinedCode;
      previewContainer.appendChild(iframeElement);

      // Create an overlay div
      const overlayDiv = document.createElement('div');
      overlayDiv.classList.add('overlay');
      overlayDiv.addEventListener('click', () => {
          // Retrieve projectName from dataset
          const clickedProjectName = projectContainer.dataset.projectName;
          window.location.href = `view?v=${clickedProjectName}`;
      });
      projectContainer.appendChild(overlayDiv);

      // Create a header for the project name
      const projectHeader = document.createElement('h3');
      projectHeader.textContent = project.projectname;
      projectHeader.classList.add('project-name');
      projectHeader.addEventListener('click', () => {
          const clickedProjectName = projectContainer.dataset.projectName;
          window.location.href = `view?v=${clickedProjectName}`;
      });
      projectContainer.appendChild(projectHeader);

      // Add display name to the container
      const displayNameElement = document.createElement('p');
      displayNameElement.textContent = userDisplayName;
      displayNameElement.classList.add('user-name');
      projectContainer.appendChild(displayNameElement);

      // Add display views to the container
      const displayViewElement = document.createElement('p');
      displayViewElement.textContent = `Views: ${userDisplayViews}`;
      displayViewElement.classList.add('user-name');
      projectContainer.appendChild(displayViewElement);

      return projectContainer;

}





searchButton.addEventListener('click', search);





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
  
    window.location.href = 'myaccount'
  }
  
  
  myaccountlocation.addEventListener('click', gotomyaccount);
  
  
  
  function logout (){
  
  // Delete the keys from localStorage
  localStorage.removeItem('firebase:host:webbuilder-b3a38-default-rtdb.firebaseio.com');
  localStorage.removeItem('userData');
    window.location.href = '/'
  }
  
  logoutbtn.addEventListener('click', logout);









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






//Promotion header
 // List of words to cycle through
 const words = [
    "Webpage",
    "Video Game",
    "Digital Resume",
    "Portfolio",
    "Blog",
    "Prank Website",
    "Lesson Display"
  ];

  const webexperienceElement = document.getElementById("webexperience");

  let wordIndex = 0;

  function changeWord() {
    webexperienceElement.textContent = words[wordIndex];
    wordIndex = (wordIndex + 1) % words.length;
  }

  // Change word right when it's fully visible
  webexperienceElement.addEventListener('animationiteration', changeWord);

  // Set initial word
  changeWord();