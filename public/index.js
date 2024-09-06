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
          
          

  



              

                            
                            



                            document.addEventListener('DOMContentLoaded', function() {
                                // Function to handle click events and perform redirection
                                function redirectToHomePage() {
                                    window.location.href = '/';
                                }
                            
                                // Get the header logo element
                                const headerLogo = document.getElementById('headerlogo');
                            
                                // Attach click event listener to the header logo element
                                if (headerLogo) {
                                    headerLogo.addEventListener('click', redirectToHomePage);
                                }
                            });
                            




                            document.addEventListener("DOMContentLoaded", function() {
                                // Function to remove random text nodes outside of any elements
                                function removeRandomTextNodes() {
                                    // Get all child nodes of the body
                                    const body = document.body;
                                    const childNodes = body.childNodes;
                            
                                    // Iterate through the child nodes
                                    childNodes.forEach(node => {
                                        // Check if the node is a text node and has some non-whitespace content
                                        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) {
                                            node.remove(); // Remove the text node
                                        }
                                    });
                                }
                            
                                // Call the function to clean up the random text
                                removeRandomTextNodes();
                            });
                                           


                            document.addEventListener("DOMContentLoaded", function() {
                                // Find and remove the unwanted text
                                document.body.innerHTML = document.body.innerHTML
                                    .replace(/```html/g, "")
                                    .replace(/```/g, "")
                                    .replace(/code/g, ""); // Add this line to remove "code"
                            });
                            
                    
                            


