document.addEventListener('DOMContentLoaded', function() {
    // Function to remove random text nodes outside of any elements
    function removeRandomTextNodes() {
        const body = document.body;
        const childNodes = Array.from(body.childNodes);

        childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) {
                node.remove();
            }
        });
    }

    // Function to clean up unwanted text within the HTML content
    function cleanUpContent() {
        const bodyHTML = document.body.innerHTML;
        document.body.innerHTML = bodyHTML
            .replace(/```html/g, "")
            .replace(/```/g, "")
            .replace(/code/g, "");
    }

    // Call both functions to clean up content
    removeRandomTextNodes();
    cleanUpContent();

    // Header logo click event
    const headerLogo = document.getElementById('headerlogo');
    if (headerLogo) {
        headerLogo.addEventListener('click', function() {
            console.log("Header logo clicked");
            window.location.href = '/';
        });
    } else {
        console.log("Header logo not found");
    }





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


               
});
