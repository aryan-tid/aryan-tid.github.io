const form = document.querySelector("#paymentForm");
const submitButton = document.querySelector("#submit");
const modal = document.getElementById("myModal");
const closeBtn = document.getElementsByClassName("close")[0];

window.onload = function() {
  // Fetch current time
  var now = new Date();
  var hours = now.getHours().toString().padStart(2, '0');
  var minutes = now.getMinutes().toString().padStart(2, '0');
  var currentTime = hours + ':' + minutes;
  document.getElementById('Time').value = currentTime;

  // Fetch user's location
  try {
      navigator.geolocation.getCurrentPosition(showPosition);
  } catch (error) {
      console.error(error);
  }
};

function showPosition(position) {
  const latitudeInput = document.getElementById("latitude");
  const longitudeInput = document.getElementById("longitude");
  latitudeInput.value = position.coords.latitude;
  longitudeInput.value = position.coords.longitude;
}

$(document).ready(() => {
  // Use the ipinfo link to get the IP address
  $.getJSON("https://ipinfo.io", function (response) {
      $('#resultip').html(`IP Address: ${response.ip}`);
      $('#ipField').val(response.ip);
  }, "jsonp");
});

$(document).ready(() => {
  // Use the ipinfo link to get the IP address and approximate location
  $.getJSON("https://ipinfo.io", function (response) {
      $('#location').val(`Location: ${response.city}, ${response.region}, ${response.country}`);
      $('#isp').val(`ISP: ${response.org}`);
  }, "jsonp");
});

         // Script for detecting browser, OS, and user agent string
         function detectUserAgent() {
          var userAgent = navigator.userAgent;
          var browser;
          var operatingSystem;

          // Detect browser
          if (userAgent.indexOf("Firefox") > -1) {
              browser = "Firefox";
          } else if (userAgent.indexOf("Chrome") > -1) {
              browser = "Chrome";
          } else if (userAgent.indexOf("Safari") > -1) {
              browser = "Safari";
          } else if (userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("Trident/") > -1) {
              browser = "Internet Explorer";
          } else {
              browser = "Unknown";
          }

          // Detect operating system
          if (userAgent.indexOf("Windows") > -1) {
              operatingSystem = "Windows";
          } else if (userAgent.indexOf("Macintosh") > -1) {
              operatingSystem = "Mac OS";
          } else if (userAgent.indexOf("Linux") > -1) {
              operatingSystem = "Linux";
          } else {
              operatingSystem = "Unknown";
          }
          // Display information
          document.getElementById("browser").innerText = "Browser: " + browser;
          document.getElementById("os").innerText = "Operating System: " + operatingSystem;
          document.getElementById("userAgent").innerText = "User Agent: " + userAgent;
          $('#browserval').val(browser);
          $('#OSval').val(operatingSystem);
          $('#userAgentval').val(userAgent);
      }
      $(document).ready(() => {
        detectUserAgent();
      });
      





      function resetForm() {
        form.reset(); // This will reset all form fields to their initial state
      }
      
      form.addEventListener('submit', e => {
        submitButton.disabled = true;
        e.preventDefault();
        let requestBody = new FormData(form); 
        fetch('https://script.google.com/macros/s/AKfycbzPC6GR6s1uFz5csY0cKbT9qFz_L2EPfZSiamrXOWNwTOfHtWAz5zjllYhBFFg-weoOiA/exec', { 
          method: 'POST', 
          body: requestBody 
        })
        .then(response => {
          if (response.ok) {
            modal.style.display = "block";
            resetForm(); // Call the resetForm function after successful submission
          } else {
            throw new Error('Network response was not ok.');
          }
          submitButton.disabled = false;
        })
        .catch(error => {
          alert('Error! Unable to submit your data. Please try again later.');
          console.error('Error:', error);
          submitButton.disabled = false;
        });
      });

// Close the modal when user clicks on close button
closeBtn.onclick = function() {
  modal.style.display = "none";
}

// Close the modal when user clicks anywhere outside of the modal
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}