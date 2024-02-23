
document.addEventListener("DOMContentLoaded", function () {
  const techList = [
    "react",
    "node",
    "express",
    "mongodb",
    "next",
    "jasmine",
    "cypress",
    "jest",
    "git",
  ];



  const themeToggle = document.getElementById("dark-mode-toggle");
  const container = document.getElementById("container");
  // Load saved settings or use default
  const savedSettings =
    JSON.parse(localStorage.getItem("techSettings")) ||
    techList.reduce((acc, tech) => ({ ...acc, [tech]: true }), {});

  // Display saved settings
  const checkboxes = document.querySelectorAll(".tech-checkbox");
  checkboxes.forEach((checkbox) => {
    checkbox.checked = savedSettings[checkbox.value];
  });

  function showInlineMessage(message) {
    const inlineMessage = document.getElementById('inline-message');
    inlineMessage.innerText = message;
    inlineMessage.style.display = 'block';

    // Hide the message after 5 seconds
    setTimeout(() => {
        inlineMessage.innerText = '';
        inlineMessage.style.display = 'none';
    }, 3000); // 5000 milliseconds = 5 seconds
}


  // Save settings
  document
    .getElementById("save-settings-btn")
    .addEventListener("click", function () {
      const updatedSettings = {};
      checkboxes.forEach((checkbox) => {
        updatedSettings[checkbox.value] = checkbox.checked;
      });
      localStorage.setItem("techSettings", JSON.stringify(updatedSettings));
      // alert("Settings saved!");
       // Call the function to show the inline message
    showInlineMessage('Settings saved successfully');
    });

  // Display updates based on settings
                    techList.forEach((tech) => {
                      if (savedSettings[tech]) {
                        fetch(`https://api.github.com/repos/${tech}/releases/latest`)
                          .then((response) => response.json())
                          .then((data) => {
                            const latestVersion = data.tag_name;
                            const updateInfo = document.createElement("p");
                            updateInfo.textContent = `${tech.toUpperCase()}: Latest version - ${latestVersion}`;
                            document.getElementById("update-info").appendChild(updateInfo);
                        

                           
                          })
                          .catch((error) => {
                            console.error(`Error fetching data for ${tech}:`, error);
                          });
                      }
                    });
          

  // Toggle settings display
  document
    .getElementById("settings-btn")
    .addEventListener("click", function () {
      const settingsContainer = document.querySelector(".settings-container");
      settingsContainer.style.display =
        settingsContainer.style.display === "none" ? "block" : "none";
    });

  // Implement dark/light mode
  themeToggle.addEventListener("click", function () {
    container.classList.toggle("dark-mode");
    const theme = container.classList.contains("dark-mode") ? "dark" : "light";
    localStorage.setItem("theme", theme);
    updateThemeStylesheet(theme);
  });

  function updateThemeStylesheet(theme) {
    const themeStylesheet = document.getElementById("theme-stylesheet");
    themeStylesheet.href = `popup_${theme}.css`;
  }

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    updateThemeStylesheet(savedTheme);
    if (savedTheme === "dark") {
      container.classList.add("dark-mode");
    }
  }
});


