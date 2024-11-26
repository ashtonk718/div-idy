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
    document.getElementById('titlepromotion').style.display = "none";


  }else{
    document.getElementById('accountbtn').style.display = "none";
    document.getElementById('loginhome').style.display = "inline-block";
    document.getElementById('signuphome').style.display = "inline-block";
    document.getElementById('titlepromotion').style.display = "block";


  }






  // Check if the current page is view.html
  if (window.location.pathname.includes('view')) {
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
            let htmlcode, csscode, jscode, projectnametitle;
  
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
                    projectnametitle = project.projectname

                  

                    // Break the loop since we found the project
                    break;
                  }
                }
              }
              
  
            // Now you can use htmlcode, csscode, and jscode as needed
            console.log('HTML Code:', htmlcode);
            console.log('CSS Code:', csscode);
            console.log('JS Code:', jscode);
            console.log('Name:', projectnametitle);



      //SEO for the View Page      


      //Title
            if (projectnametitle) {
              document.title = projectnametitle; // Dynamically set the webpage title

              const titleMetaMappings = [
                { selector: 'meta[property="og:title"]', content: projectnametitle },
                { selector: 'meta[name="twitter:title"]', content: projectnametitle }
              ];
            
              titleMetaMappings.forEach(({ selector, content }) => {
                let metaTag = document.querySelector(selector);
            
                if (metaTag) {
                  // Update the content attribute if the meta tag exists
                  metaTag.setAttribute("content", content);
                } else {
                  // Create and append the meta tag if it doesn't exist
                  const newMeta = document.createElement("meta");
                  const attribute = selector.includes('property') ? 'property' : 'name';
                  newMeta.setAttribute(attribute, selector.match(/["']([^"']+)["']/)[1]);
                  newMeta.setAttribute("content", content);
                  document.head.appendChild(newMeta);
                }
              });
            
              console.log("Meta tags for 'og:title' and 'twitter:title' updated.");
            

            
            }


            
// Get the current URL
const currentUrl = window.location.href;

// Find the meta tag for og:url
let ogUrlMeta = document.querySelector('meta[property="og:url"]');

if (ogUrlMeta) {
  // Update the content attribute if the meta tag exists
  ogUrlMeta.setAttribute("content", currentUrl);
} else {
  // Create and append the meta tag if it doesn't exist
  const newMeta = document.createElement("meta");
  newMeta.setAttribute("property", "og:url");
  newMeta.setAttribute("content", currentUrl);
  document.head.appendChild(newMeta);
}

console.log(`Meta tag for 'og:url' updated to: ${currentUrl}`);




            




      




            function syncIframeMetaToPage() {
              const iframe = document.getElementById("outputviewmode");
            
              if (!iframe || !iframe.contentDocument) {
                console.error("Iframe with id 'outputviewmode' not found or inaccessible.");
                return;
              }
            
              const iframeHead = iframe.contentDocument.head;
            
              if (!iframeHead) {
                console.error("Iframe does not have a head element.");
                return;
              }
            
              // Get description and keywords from the iframe
              const iframeDescription = iframeHead.querySelector('meta[name="description"]')?.getAttribute("content");
              const iframeKeywords = iframeHead.querySelector('meta[name="keywords"]')?.getAttribute("content");
            
              if (!iframeDescription) {
                console.warn("No description meta tag found in the iframe.");
              }
            
              if (!iframeKeywords) {
                console.warn("No keywords meta tag found in the iframe.");
              }
            
              // Define mappings for all six meta tags
              const metaMappings = [
                { selector: 'meta[name="description"]', content: iframeDescription },
                { selector: 'meta[name="keywords"]', content: iframeKeywords },
                { selector: 'meta[property="og:description"]', content: iframeDescription },
                { selector: 'meta[name="twitter:description"]', content: iframeDescription },
                { selector: 'meta[property="og:keywords"]', content: iframeKeywords }, // Optional
                { selector: 'meta[name="twitter:keywords"]', content: iframeKeywords }  // Optional
              ];
            
              metaMappings.forEach(({ selector, content }) => {
                if (content) {
                  let existingMeta = document.head.querySelector(selector);
            
                  if (existingMeta) {
                    // Update existing meta tag
                    existingMeta.setAttribute("content", content);
                  } else {
                    // Create a new meta tag if it doesn't exist
                    const newMeta = document.createElement("meta");
                    const attribute = selector.includes('property') ? 'property' : 'name';
                    newMeta.setAttribute(attribute, selector.match(/["']([^"']+)["']/)[1]);
                    newMeta.setAttribute("content", content);
                    document.head.appendChild(newMeta);
                  }
                }
              });
            
              console.log("Meta tags updated from iframe metadata.");
            }
            
            // Ensure the iframe content is loaded before syncing
            document.getElementById("outputviewmode").addEventListener("load", syncIframeMetaToPage);
            







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

// Refresh the page
location.reload();

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





//Promotional 

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