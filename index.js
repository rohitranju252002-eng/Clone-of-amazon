// -------------------------------
// Basic Amazon Clone Interactions
// -------------------------------

// 1. Search Bar Functionality
const searchInput = document.querySelector(".select-input");
const searchBtn = document.querySelector(".search-icon");

searchBtn.addEventListener("click", () => {
    let text = searchInput.value.trim();

    if (text === "") {
        alert("Please enter something to search...");
        return;
    }

    alert("Searching for: " + text);
});

// Allow Enter key to search
searchInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});

// ----------------------------------------------------------
// 2. Highlight navigation boxes on hover (smooth animation)
// ----------------------------------------------------------
const borders = document.querySelectorAll(".border");

borders.forEach(box => {
    box.addEventListener("mouseenter", () => {
        box.style.transition = "0.2s";
        box.style.border = "2px solid white";
    });

    box.addEventListener("mouseleave", () => {
        box.style.border = "2px solid transparent";
    });
});

// -----------------------------------------------
// 3. “See More” buttons — open product alert
// -----------------------------------------------
const seeMoreButtons = document.querySelectorAll(".box-content a");

seeMoreButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        let category = btn.parentElement.querySelector("h2").innerText;
        alert("Opening more about: " + category);
    });
});

// -----------------------------------------------
// 4. Fake Cart Counter
// -----------------------------------------------
let cartCount = 0;

const cart = document.querySelector(".nav-cart");

cart.addEventListener("click", () => {
    cartCount++;
    alert("Item added to cart! Total items: " + cartCount);

    // Update cart text
    cart.innerHTML = `<i class="fa-solid fa-basket-shopping"></i> Cart (${cartCount})`;
});

// --------------------------------------------------
// 5. Back to Top button
// --------------------------------------------------
const backToTop = document.querySelector(".foot-panel1");

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// --------------------------------------------------
// 6. Panel menu click detection
// --------------------------------------------------
const panelItems = document.querySelectorAll(".panel-ops p");

panelItems.forEach(item => {
    item.addEventListener("click", () => {
        alert(`You clicked on: ${item.innerText}`);
    });
});

// --------------------------------------------------
// 7. Change Language Box (Just for Demo)
// --------------------------------------------------
const langBox = document.querySelector(".nav-lang-eng");

langBox.addEventListener("click", () => {
    alert("Language change feature is under development!");
});
