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
/* ========== Amazon Clone: slideshow + product pages + cart ========== */

/* --------- Minimal helper to safely query --------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));

/* ---------------------------
   1) Slideshow (hero-sec area)
   --------------------------- */
(function initSlideshow() {
  const hero = document.querySelector(".hero-sec");
  if (!hero) return;

  // slide images - using names present in your project (fallback placeholders)
  const slides = [
    "box1.jpg",
    "ele.jpg",
    "deals.jpg",
    "latest.avif"
  ];

  // build slideshow structure
  hero.innerHTML = `
    <div class="slideshow">
      <div class="slides-wrapper"></div>
      <button class="slide-btn prev" aria-label="Previous">&lt;</button>
      <button class="slide-btn next" aria-label="Next">&gt;</button>
      <div class="slide-dots"></div>
    </div>
  `;

  // inject styles for slideshow (keeps index.css untouched)
  const slideStyles = document.createElement("style");
  slideStyles.textContent = `
    .slideshow { position: relative; height: 100%; display:flex; align-items:center; justify-content:center; overflow:hidden; }
    .slides-wrapper { width:100%; height:100%; display:flex; transition: transform 450ms ease; }
    .slide { min-width:100%; height:100%; background-position:center; background-size:cover; }
    .slide-btn { position:absolute; top:50%; transform:translateY(-50%); background: rgba(0,0,0,0.45); color:white; border:none; padding:8px 12px; cursor:pointer; font-size:18px; border-radius:6px;}
    .slide-btn.prev { left:12px; } .slide-btn.next { right:12px; }
    .slide-dots { position:absolute; bottom:12px; left:50%; transform:translateX(-50%); display:flex; gap:6px; }
    .slide-dot { width:10px; height:10px; border-radius:50%; background: rgba(255,255,255,0.5); cursor:pointer; }
    .slide-dot.active { background: rgba(255,255,255,0.95); }
  `;
  document.head.appendChild(slideStyles);

  const wrapper = $(".slides-wrapper", hero);
  const dots = $(".slide-dots", hero);

  slides.forEach((img, i) => {
    const s = document.createElement("div");
    s.className = "slide";
    s.style.backgroundImage = `url("${img}")`;
    s.setAttribute("data-index", i);
    wrapper.appendChild(s);

    const dot = document.createElement("div");
    dot.className = "slide-dot" + (i === 0 ? " active" : "");
    dot.dataset.index = i;
    dots.appendChild(dot);
  });

  let index = 0;
  let playing = true;
  const total = slides.length;

  const go = (n) => {
    index = (n + total) % total;
    wrapper.style.transform = `translateX(-${index * 100}%)`;
    $$(".slide-dot", dots).forEach(d => d.classList.toggle("active", Number(d.dataset.index) === index));
  };

  const next = () => go(index + 1);
  const prev = () => go(index - 1);

  const interval = setInterval(() => { if (playing) next(); }, 4500);

  // controls
  $(".slide-btn.next", hero).addEventListener("click", () => { next(); playing = false; });
  $(".slide-btn.prev", hero).addEventListener("click", () => { prev(); playing = false; });

  // dots clickable
  $$(".slide-dot", dots).forEach(d => d.addEventListener("click", () => { go(Number(d.dataset.index)); playing = false; }));

  // pause on hover
  hero.addEventListener("mouseenter", () => playing = false);
  hero.addEventListener("mouseleave", () => playing = true);

  // initial
  go(0);
})();

/* ---------------------------
   2) Product Data & Rendering
   --------------------------- */
const PRODUCTS = [
  {
    id: "p_elec",
    title: "Smart LED TV 55\"",
    category: "Electronics",
    price: 28999,
    image: "ele.jpg",
    desc: "55-inch 4K UHD Smart LED TV with HDR and multiple HDMI ports."
  },
  {
    id: "p_furn",
    title: "Wooden Coffee Table",
    category: "Furniture",
    price: 7999,
    image: "furniture.jpg",
    desc: "Solid wood coffee table with natural finish, 1-year warranty."
  },
  {
    id: "p_cloth",
    title: "Men's Casual Jacket",
    category: "Clothes",
    price: 2599,
    image: "clothes.jpg",
    desc: "Comfortable and stylish jacket for all seasons."
  },
  {
    id: "p_mobile",
    title: "Smartphone XYZ",
    category: "Mobiles",
    price: 15999,
    image: "mobile.jpg",
    desc: "6.5\" AMOLED, 8GB RAM, 128GB storage, 5000mAh battery."
  },
  // add more products as needed...
];

/* Helper: find product by category fallback - if a box is clicked we map to a product */
function productForBox(boxEl) {
  const h2 = boxEl.querySelector("h2");
  const category = h2 ? h2.innerText.trim().toLowerCase() : "";
  // try to find product with matching category word
  return PRODUCTS.find(p => p.category.toLowerCase().includes(category)) || PRODUCTS[0];
}

/* Create product overlay and cart overlay only once */
let overlay, cartOverlay;
function createOverlays() {
  if (overlay) return;

  overlay = document.createElement("div");
  overlay.id = "product-overlay";
  overlay.innerHTML = `
    <div class="product-modal">
      <button class="close-product" aria-label="Close">✕</button>
      <div class="product-inner">
        <div class="product-image"></div>
        <div class="product-info">
          <h2 class="product-title"></h2>
          <p class="product-price"></p>
          <p class="product-desc"></p>
          <div class="product-actions">
            <label>Qty: <input type="number" class="product-qty" min="1" value="1" /></label>
            <button class="add-to-cart">Add to Cart</button>
            <button class="open-full">Open Product Page</button>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  // cart overlay
  cartOverlay = document.createElement("div");
  cartOverlay.id = "cart-overlay";
  cartOverlay.innerHTML = `
    <div class="cart-modal">
      <button class="close-cart">✕</button>
      <h3>Your Cart</h3>
      <div class="cart-items"></div>
      <div class="cart-total"></div>
    </div>
  `;
  document.body.appendChild(cartOverlay);

  // inject styles for overlays
  const style = document.createElement("style");
  style.textContent = `
    #product-overlay, #cart-overlay { position: fixed; inset:0; display:none; align-items:center; justify-content:center; background: rgba(0,0,0,0.6); z-index:9999; }
    .product-modal, .cart-modal { width:90%; max-width:980px; background:white; border-radius:8px; padding:18px; box-shadow: 0 8px 30px rgba(0,0,0,0.4); }
    .product-inner { display:flex; gap:16px; align-items:flex-start; }
    .product-image { width:48%; min-height:280px; background-size:cover; background-position:center; border-radius:6px; }
    .product-info { width:52%; }
    .product-price { font-weight:700; margin:8px 0; color:#B12704; }
    .product-actions { margin-top:12px; display:flex; gap:10px; align-items:center; }
    .product-actions input[type=number] { width:72px; padding:6px; }
    .close-product, .close-cart { position:absolute; right:12px; top:12px; background:transparent; border: none; font-size:20px; cursor:pointer; }
    .cart-items { max-height:300px; overflow:auto; margin:10px 0; }
    .cart-item { display:flex; gap:8px; padding:8px 0; border-bottom:1px solid #eee; align-items:center;}
    .cart-item img { width:72px; height:72px; object-fit:cover; border-radius:6px; }
    .cart-total { text-align:right; font-weight:700; margin-top:12px; }
    @media (max-width:800px) { .product-inner { flex-direction:column; } .product-image, .product-info { width:100%; } }
  `;
  document.head.appendChild(style);

  // close handlers
  overlay.addEventListener("click", (e) => { if (e.target === overlay) closeOverlay(); });
  cartOverlay.addEventListener("click", (e) => { if (e.target === cartOverlay) closeCart(); });

  $(".close-product", overlay).addEventListener("click", closeOverlay);
  $(".close-cart", cartOverlay).addEventListener("click", closeCart);
}

/* show overlay with product info */
function showProduct(product) {
  createOverlays();
  overlay.style.display = "flex";
  const img = $(".product-image", overlay);
  $(".product-title", overlay).innerText = product.title;
  $(".product-price", overlay).innerText = `₹ ${product.price.toLocaleString()}`;
  $(".product-desc", overlay).innerText = product.desc;
  img.style.backgroundImage = `url("${product.image}")`;
  $(".product-qty", overlay).value = 1;

  $(".add-to-cart", overlay).onclick = () => {
    const qty = Number($(".product-qty", overlay).value) || 1;
    addToCart(product.id, qty);
    alert(`${product.title} added (${qty})`);
    updateCartCount();
  };

  $(".open-full", overlay).onclick = () => {
    openFullProductPage(product);
  };
}

/* close overlay */
function closeOverlay() {
  if (overlay) overlay.style.display = "none";
}
function closeCart() {
  if (cartOverlay) cartOverlay.style.display = "none";
}

/* -----------------------
   3) Simple "full page" product view
   ----------------------- */
function openFullProductPage(product) {
  // create or reuse page view
  let page = $("#product-page-view");
  if (!page) {
    page = document.createElement("div");
    page.id = "product-page-view";
    page.innerHTML = `<div class="product-page-inner">
        <button class="close-page">← Back</button>
        <div class="product-page-body"></div>
      </div>`;
    document.body.appendChild(page);

    // style
    const s = document.createElement("style");
    s.textContent = `
      #product-page-view { position:fixed; inset:0; background:#fafafa; z-index:9998; display:flex; align-items:flex-start; justify-content:center; padding:38px; overflow:auto; }
      .product-page-inner { width:100%; max-width:1100px; background:white; padding:18px; border-radius:8px; box-shadow:0 6px 20px rgba(0,0,0,0.15); }
      .close-page { background:transparent; border:none; font-size:16px; cursor:pointer; margin-bottom:8px; }
      .product-page-body { display:flex; gap:16px; }
      .product-page-body img { width:46%; border-radius:8px; object-fit:cover; }
      .product-page-info { width:54%; }
      @media (max-width:900px) { .product-page-body { flex-direction:column; } .product-page-body img, .product-page-info { width:100%; } }
    `;
    document.head.appendChild(s);

    $(".close-page", page).addEventListener("click", () => page.remove());
  }

  // populate
  const body = $(".product-page-body", page);
  body.innerHTML = `
    <img src="${product.image}" alt="${product.title}" />
    <div class="product-page-info">
      <h1>${product.title}</h1>
      <p style="color:#B12704; font-weight:700; font-size:1.25rem">₹ ${product.price.toLocaleString()}</p>
      <p>${product.desc}</p>
      <hr />
      <p><strong>Category:</strong> ${product.category}</p>
      <div style="margin-top:10px;">
        <button id="page-addcart">Add to Cart</button>
      </div>
    </div>
  `;
  // add to cart from page
  $("#page-addcart", page).onclick = () => { addToCart(product.id, 1); updateCartCount(); alert("Added to cart"); };

  // show and hide overlay if needed
  closeOverlay();
}

/* -----------------------
   4) Cart persistence
   ----------------------- */
const CART_KEY = "amazon_clone_cart_v1";

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "{}");
  } catch {
    return {};
  }
}
function setCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}
function addToCart(productId, qty = 1) {
  const cart = getCart();
  cart[productId] = (cart[productId] || 0) + qty;
  setCart(cart);
}
function removeFromCart(productId) {
  const cart = getCart();
  delete cart[productId];
  setCart(cart);
}

/* show cart overlay */
function showCart() {
  createOverlays();
  cartOverlay.style.display = "flex";
  const itemsContainer = $(".cart-items", cartOverlay);
  itemsContainer.innerHTML = "";
  const cart = getCart();

  let total = 0;
  for (const id in cart) {
    const product = PRODUCTS.find(p => p.id === id);
    if (!product) continue;
    const qty = cart[id];
    total += product.price * qty;

    const item = document.createElement("div");
    item.className = "cart-item";
    item.innerHTML = `
      <img src="${product.image}" alt="${product.title}" />
      <div>
        <div style="font-weight:700">${product.title}</div>
        <div>Qty: ${qty} • ₹ ${product.price.toLocaleString()}</div>
        <div style="margin-top:6px;">
          <button class="remove" data-id="${id}">Remove</button>
        </div>
      </div>
    `;
    itemsContainer.appendChild(item);
  }
  $(".cart-total", cartOverlay).innerText = `Total: ₹ ${total.toLocaleString()}`;

  // remove handlers
  $$(".remove", cartOverlay).forEach(btn => btn.addEventListener("click", e => {
    const id = e.target.dataset.id;
    removeFromCart(id);
    showCart();
    updateCartCount();
  }));
}

/* update cart icon count */
function updateCartCount() {
  const cart = getCart();
  const count = Object.values(cart).reduce((a,b) => a + b, 0);
  const cartEl = document.querySelector(".nav-cart");
  if (cartEl) cartEl.innerHTML = `<i class="fa-solid fa-basket-shopping"></i> Cart (${count})`;
}

/* wire up cart click to show cart */
(function initCartUI() {
  const cartEl = document.querySelector(".nav-cart");
  if (cartEl) {
    cartEl.addEventListener("click", (e) => {
      // clicking cart now shows cart; previously added fake increments are replaced
      if (getCart() && Object.keys(getCart()).length > 0) {
        showCart();
      } else {
        alert("Cart is empty — add some products first.");
      }
    });
  }
  updateCartCount();
})();

/* -----------------------
   5) Link boxes to product detail
   ----------------------- */
function attachBoxListeners() {
  createOverlays();
  const boxes = $$(".box");
  boxes.forEach(box => {
    // clicking anywhere in the box opens a product detail for that category
    box.style.cursor = "pointer";
    box.addEventListener("click", (e) => {
      // avoid when clicking inner link specifically (we still open product)
      const product = productForBox(box);
      showProduct(product);
    });

    // make "See More" links also open product specific detail
    const seeMore = box.querySelector(".box-content a");
    if (seeMore) {
      seeMore.addEventListener("click", (ev) => {
        ev.preventDefault();
        const product = productForBox(box);
        showProduct(product);
      });
    }
  });
}

/* -------------
   Boot everything
   ------------- */
(function boot() {
  attachBoxListeners();
  updateCartCount();
})();

