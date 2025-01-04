async function loadContent() {
  // Fetch the header and footer HTML
  const headerResponse = await fetch("assets/navbar.html");
  const footerResponse = await fetch("assets/footer.html");

  // Get the text content of both
  const headerContent = await headerResponse.text();
  const footerContent = await footerResponse.text();

  // Insert the content into the respective divs
  document.getElementById("mynavbar").innerHTML = headerContent;
  document.getElementById("myfooter").innerHTML = footerContent;
}

// Call the loadContent function when the page loads
loadContent();

const firebaseConfig = {
  apiKey: "AIzaSyBNfVW_F6tTbTZSP4YUgHTUZeK86xPVac4",
  authDomain: "green-energy-advisor-ai-7a0c3.firebaseapp.com",
  projectId: "green-energy-advisor-ai-7a0c3",
  storageBucket: "green-energy-advisor-ai-7a0c3.appspot.com",
  messagingSenderId: "703379505970",
  appId: "1:703379505970:web:3425574eb6b6ffc733cd2b",
  measurementId: "G-6M8D3BSCW3",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Check Authentication State
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is logged in
    document.getElementById("user-info").style.display = "block";
    document.getElementById("login-btn").style.display = "none";
    document.getElementById("user-photo").src =
      user.photoURL || "default-avatar.png";
  } else {
    // User is logged out
    document.getElementById("user-info").style.display = "none";
    document.getElementById("login-btn").style.display = "block";
  }
});

// Login Function
function login() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      console.log("User signed in:", result.user);
    })
    .catch((error) => {
      console.error("Error during sign-in:", error.message);
    });
}

// Logout Function
function logout() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      alert("User logged out successfully!");
      console.log("User signed out.");
    })
    .catch((error) => {
      console.error("Error during logout:", error.message);
    });
}

(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".sticky-top").addClass("shadow-sm").css("top", "0px");
    } else {
      $(".sticky-top").removeClass("shadow-sm").css("top", "-100px");
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Facts counter
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 2000,
  });

  // Header carousel
  $(".header-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1500,
    loop: true,
    nav: false,
    dots: true,
    items: 1,
    dotsData: true,
  });

  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    center: true,
    dots: false,
    loop: true,
    nav: true,
    navText: [
      '<i class="bi bi-arrow-left"></i>',
      '<i class="bi bi-arrow-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
    },
  });

  // Portfolio isotope and filter
  var portfolioIsotope = $(".portfolio-container").isotope({
    itemSelector: ".portfolio-item",
    layoutMode: "fitRows",
  });
  $("#portfolio-flters li").on("click", function () {
    $("#portfolio-flters li").removeClass("active");
    $(this).addClass("active");

    portfolioIsotope.isotope({ filter: $(this).data("filter") });
  });
})(jQuery);
