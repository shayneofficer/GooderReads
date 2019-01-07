
/**
 * Sets the default styling, and loads in dark mode if the user was using dark mode
 * in their previous session. Light mode is default.
 */
$('signed-in-icon').hide()
$('#lightMode').hide();
if (localStorage.getItem('mode') === "dark") {
  darkMode()
}

/**
 * Calls darkMode() to switch styling to dark theme, and saves that as the user's prefered
 * view mode in their local storage.
 */
$("#darkMode").on("click", function (event) {
  localStorage.setItem("mode", "dark")
  darkMode()
});

/**
 * Calls lightMode() to switch styling to light theme, and saves that as the user's preferred
 * view mode in their local storage.
 */
$("#lightMode").on("click", function (event) {
  localStorage.setItem("mode", "light")
  lightMode(event)
});

/**
 * If the user has previously signed in during this session, gets the username and
 * user ID from ession storage. They are validated on the back-end to ensure they
 * match, meaning someone can't just save any username or ID in their session storage
 * to access someone else's account. If the user is NOT signed in, the user ID is less
 * than 0.
 */
if (sessionStorage.getItem("userName") && sessionStorage.getItem("userID") >= 0) {
  signedIn();
} else {
  sessionStorage.setItem("userName", "");
  sessionStorage.setItem("userID", -4);
  signedOut();
}
