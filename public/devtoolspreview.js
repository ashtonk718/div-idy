



function goback (){
  const projectname = localStorage.getItem('project')
  window.location.href = 'devtools?project='+ projectname;
  
  }


  backbtn.addEventListener('click', goback);
  updateoutput.addEventListener('click', goback);



  const outputFrame = document.getElementById('outputviewmode');

  // Access the contentDocument property directly
  const outputDocument = outputFrame.contentDocument || outputFrame.contentWindow.document;
  
  // Get the content from localStorage
  const htmlCodeupdate = localStorage.getItem('projecthtml');
  const cssCodeupdate = localStorage.getItem('projectcss');
  const jsCodeupdate = localStorage.getItem('projectjs');
  

    // Write the HTML, CSS, and JS to the iframe
    outputDocument.open();
    outputDocument.write(`${htmlCodeupdate}<style>${cssCodeupdate}</style><script>${jsCodeupdate}</script>`);
    outputDocument.close();
  

// Sizing the iframe
setTimeout(() => {
  // Calculate the content height
  const contentHeight = outputDocument.documentElement.scrollHeight;

  // Set the height to the larger of the content height or 700px
  outputFrame.style.height = Math.max(contentHeight, 700) + 'px';
}, 100); // Adjust the timeout duration if needed


  
