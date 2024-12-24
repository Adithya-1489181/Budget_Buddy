document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed");

    // Check if the user is signed in (this could also be done using sessionStorage or cookies)
    const isSignedIn = localStorage.getItem("userLoggedIn");
    console.log("User logged in status:", isSignedIn);

    if (isSignedIn) {
        console.log("User is signed in, redirecting to dashboard.html");
        window.location.href = "dashboard.html";  // Redirect to home if logged in
    } else {
        console.log("User is not signed in");
    }

    const exploreButton = document.getElementById("explore-btn");

    if (exploreButton) {
        exploreButton.addEventListener("click", () => {
            console.log("Explore button clicked, redirecting to login.html");
            window.location.href = "login.html";  // Redirect to login page
        });
    } else {
        console.log("Explore button not found");
    }
});
