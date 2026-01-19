import { auth } from "./firebase.js";
import {
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
// ---------- CART STORAGE ----------
const CART_KEY = "alankar_cart_v1";

function getCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Failed to parse cart from localStorage", e);
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// ---------- REVIEWS STORAGE ----------
const REVIEWS_KEY = "alankar_reviews_v1";

function getStoredReviews() {
  try {
    const raw = localStorage.getItem(REVIEWS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Failed to parse reviews from localStorage", e);
    return [];
  }
}

function saveStoredReviews(arr) {
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(arr));
}

// ---------- TOAST HELPER ----------
let toastTimeout;
function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<span class="icon">✨</span><span class="msg"></span>`;
    document.body.appendChild(toast);
  }
  toast.classList.remove("hide");
  toast.querySelector(".msg").textContent = message;

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.add("hide");
  }, 2200);
}

// ---------- CATEGORY DATA ----------
const categories = {
  maharashtrian: [
    {
      name: "Nath - Maharashtrian",
      price: 2499,
      img: "https://mehkan.com/wp-content/uploads/2023/11/Peshwai-Nath-Design.webp",
    },
    {
      name: "Thushi Necklace",
      price: 2899,
      img: "https://siddhisilver.in/cdn/shop/files/pure-silver-gheru-gold-plated-v-nachni-thushi.jpg?v=1723725303",
    },
    {
      name: "Kolhapuri Saaj",
      price: 2500,
      img: "https://kolhapurithusi.in/cdn/shop/files/gheru-kolhapuri-saaj.jpg?v=1722339321",
    },
    {
      name: "mangalsutra",
      price: 2300,
      img: "https://manubhai.in/SocialMedia/post_artworks/Wedding-10-9Jan2023.jpg",
    },
    {
      name: "Bajuband",
      price: 1700,
      img: "https://sukkhi.com/cdn/shop/products/SKR61665_BG_28i1_29_800x.jpg?v=1660392772",
    },
    {
      name: "Maharashtrian Earrings",
      price: 2499,
      img: "https://manubhai.in/SocialMedia/post_artworks/DABE02805.jpg",
    },
    {
      name: "Painjan",
      price: 1999,
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiMJfXRRQC6ss5YDNoYwW835qfPnQzs4VSlITs-NVdIcn63PqmH-H74MSp342GwVxUwVwJPLQdKcOT-dmuVgiwnCVgKqInf7fZfgUHqIfIwHcBrS3amPFloplVY4ZOkmFBQlFJHb5AlqJYTL7v9StAfhj6FBBfZxTIYS_6WWPxio6eB4YlVoOCZOuuBHsw/w1200-h630-p-k-no-nu/antique-payal-ruby-green-gold-antique-payal-147635-37367603200156.webp",
    },
    {
      name: "Tode",
      price: 1599,
      img: "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dwe44a92cf/images/hi-res/51W2A1VTM2A00_1.jpg?sw=640&sh=640",
    },
  ],
  gujarati: [
    {
      name: "Gujarati Necklace",
      price: 3999,
      img: "https://i.pinimg.com/originals/5e/9c/22/5e9c22d7323ececdc7e31da6f95e8dc2.jpg",
    },
    {
      name: "Latkan Earrings",
      price: 2999,
      img: "https://static3.azafashions.com/uploads/product_gallery/ppsae80025_1405-0097283001620996875.jpg",
    },
    {
      name: "challa",
      price: 3999,
      img: "https://i.ytimg.com/vi/Ncc39v8v45g/maxresdefault.jpg",
    },
    {
      name: "Bandhani Maang Tikka",
      price: 1999,
      img: "https://www.manekratna.com/webimage/product/resized/Polki-Manng-Tikka-MT-889Ru-59-VL.jpg",
    },
    {
      name: "Gujarti nathni",
      price: 1299,
      img: "https://5.imimg.com/data5/ECOM/Default/2022/5/RN/QQ/YW/77950844/zevar-jewelry-nathni-ahmdabadi-nose-ring-36694719791337-250x250.jpg",
    },
    {
      name: "Kundan Set",
      price: 1200,
      img: "https://www.southjewellery.com/wp-content/uploads/2022/09/traditional-kundan-necklace-4-scaled.jpg",
    },
    {
      name: "Bajubandh",
      price: 1999,
      img: "https://www.eonexports.com/product_image/11530691428.jpeg",
    },
    {
      name: "Gujarati Bangle",
      price: 2499,
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgTlfQZgjPF9veIkwE6eRuwgrak8f03qZdx0cb70ZOFpeTIm9msEXy2nIctN1tJdi7JA6x9eTF7xjB73NpAneWpnu-zyI4OjK14SuLjFpqGLZqt1uPvaIG2Tkrt8BQiJIWK2JMQDYzzHV_I2xrsE9BMQDmc0f37DnNr_h1cBKfbe_dVauxIzXSnGXdm/s640/22K-Antique-Bangles---JGS-2204-06032.jpg",
    },
  ],
  rajasthani: [
    {
      name: "Rajasthani Borla",
      price: 2599,
      img: "https://www.dhanalakshmijewellers.com/wp-content/uploads/2023/01/2-1.jpg",
    },
    {
      name: "Kundan Rani Haar",
      price: 2900,
      img: "https://i.pinimg.com/736x/86/ac/11/86ac110de902e449b8869afab665538a.jpg",
    },
    {
      name: "Aadh Rajputi chocker",
      price: 2999,
      img: "https://i.etsystatic.com/26221648/c/2172/2172/0/779/il/ddf87b/5842633190/il_600x600.5842633190_5pzb.jpg",
    },
    {
      name: "Meenakari Earrings",
      price: 3999,
      img: "https://i.pinimg.com/originals/83/91/34/8391344ba8ec4e15762d36fd0a8deca8.jpg",
    },
    {
      name: "polki kundan nathni",
      price: 2999,
      img: "https://5.imimg.com/data5/ECOM/Default/2022/11/OD/OC/US/77950844/zevar-jewelry-bridal-polki-nath-nathni-nose-ring-with-a-chain-no-piercing-needed-by-zevar-37561962496233-1000x1000.jpg",
    },
    {
      name: "Rakhri Rajasthani Bangle",
      price: 2999,
      img: "https://cdn.shopify.com/s/files/1/1501/0634/collections/Protraits_5_of_36_red.jpg?v=1671195612",
    },
    {
      name: "sheeshpatti",
      price: 1499,
      img: "https://i.etsystatic.com/17911310/r/il/24bc70/6660390693/il_1080xN.6660390693_l417.jpg",
    },
    {
      name: "hathfool",
      price: 1299,
      img: "https://i.etsystatic.com/13124666/c/1500/1500/0/326/il/5f47a6/3525493588/il_600x600.3525493588_mb7a.jpg",
    },
  ],
  peshwai: [
    {
      name: "Mohan mala",
      price: 2499,
      img: "https://manubhai.in/SocialMedia/post_artworks/Ashtamala-18-25August2022.jpg",
    },
    {
      name: "Amabada pin",
      price: 1999,
      img: "https://5.imimg.com/data5/ECOM/Default/2023/2/TM/PS/DU/13173376/ha23012418g-750-1-1000x1000.jpg",
    },
    {
      name: "Tanmani",
      price: 2790,
      img: "https://i.pinimg.com/originals/0a/91/3b/0a913b7980ffd4f7c9cc204c6b320564.jpg",
    },
    {
      name: "Kambarpatta",
      price: 2999,
      img: "https://5.imimg.com/data5/IK/EZ/ZA/SELLER-2020419/antique-matte-gold-plated-south-indian-kamar-patta-202357-1000x1000.JPG",
    },
    {
      name: "Bugdi",
      price: 2999,
      img: "https://i.pinimg.com/originals/fd/53/8b/fd538bfc234dbc943e868b47951e8681.jpg",
    },
    {
      name: "Patlya",
      price: 3900,
      img: "https://i.pinimg.com/originals/98/41/69/984169ebcf14b74fee027359f0714288.jpg",
    },
    {
      name: "vaaki",
      price: 1499,
      img: "https://kolhapurisaaj.in/cdn/shop/files/traditional-maharashtrian-micro-gold-plated-peacock-shaped-bajuband-armlet.jpg?v=1721130228",
    },
    {
      name: "nath",
      price: 1599,
      img: "https://vivahspecial.com/wp-content/uploads/2023/10/Traditional-Maharashtrian-Gold-Plated-Nath-VSNATH005.jpg",
    },
  ],
  south: [
    {
      name: "Temple Jewellery Set",
      price: 2999,
      img: "https://i.pinimg.com/originals/bb/7c/e0/bb7ce0e25d2e1ef26729945f41887811.jpg",
    },
    {
      name: "oddiyanam",
      price: 2999,
      img: "https://i.pinimg.com/originals/f6/43/9b/f6439bd33c46de25b4ba08beb784ae09.jpg",
    },
    {
      name: "South Indian Earrings",
      price: 3299,
      img: "https://southindiajewels.com/wp/wp-content/uploads/2020/04/silver-gold-plated-temple-jumka.jpg",
    },
    {
      name: "Bajubandh",
      price: 1999,
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjRYtHRFaxfE3cs0UqQGmmGEmgWfDj_Pdj-TuJdIZ1eO9eIXNHBL_nDIyJtyLSTy1jRLzmb2bpfF2PGwLMHO0OnM4XFh4g12SWVeQ7SyrsuO1iunzQ7-j4wWJYYniAGr7ic0jCom2GDRu9GdtkCk-i0Weg3xD7uE32oLg9j_TJN3Q0uPj3xzG8ixsdfeec/w320-h320/temple-bajuband-ruby-oxidised-gold-silver-temple-bajuband-154773-36070137495708_720x.webp",
    },
    {
      name: "Bangles",
      price: 2499,
      img: "https://shop.southindiajewels.com/wp-content/uploads/2025/04/Elephant-Design-Kids-Bangles-759x1012.jpg",
    },
    {
      name: "Nose pin",
      price: 1499,
      img: "https://shop.southindiajewels.com/wp-content/uploads/2024/04/188.jpg",
    },
    {
      name: "Payal",
      price: 1299,
      img: "https://5.imimg.com/data5/SELLER/Default/2024/7/431748417/AM/FY/LQ/33393103/antique-gold-plated-delicate-payal-200758-1000x1000.jpg",
    },
    {
      name: "Pendent set",
      price: 2999,
      img: "https://southindiajewels.com/wp/wp-content/uploads/2015/03/vintage-jewelry-necklace.jpg",
    },
  ],
};

// ---------- GLOBAL HELPERS ----------
function addToCartFromElement(btn) {
  const card = btn.closest(".item");
  if (!card) return;
  const nameEl = card.querySelector("p");
  const priceEl = card.querySelector(".price");
  const imgEl = card.querySelector("img");
  if (!nameEl || !priceEl || !imgEl) return;

  const name = nameEl.innerText.trim();
  const price = parseInt(priceEl.innerText.replace(/[^0-9]/g, ""), 10) || 0;
  const img = imgEl.src;

  addToCart({ name, price, img });
}
window.addToCartFromElement = addToCartFromElement;

function addToCart(item) {
  const cart = getCart();
  const idx = cart.findIndex(
    (c) => c.name === item.name && c.price === item.price
  );
  if (idx > -1) {
    cart[idx].qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }
  saveCart(cart);
  showToast(`${item.name} added to your cart`);
}

// For HTML escaping in reviews
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ---------- PAGE INITIALIZERS ----------
document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;

  if (page === "login") initLoginPage();
  if (page === "home") initHomePage();
  if (page === "collaboration") initCollabPage();
  if (page === "cart") initCartPage();
  if (page === "reviews") initReviewsPage();
  if (page === "category") initCategoryPage();
});

// ---------- LOGIN PAGE ----------
function initLoginPage() {
  const loginBtn = document.getElementById("login-btn");
  const googleBtn = document.getElementById("google-btn");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  const existingMsg = document.querySelector(".form-message");
  const msgEl =
    existingMsg ||
    (() => {
      const p = document.createElement("p");
      p.className = "form-message";
      const card = loginBtn?.closest(".auth-card") || document.body;
      card.appendChild(p);
      return p;
    })();

  function setMessage(text, type = "error") {
    msgEl.textContent = text;
    msgEl.classList.remove("success");
    if (type === "success") msgEl.classList.add("success");
  }

  function handleLogin(e) {
    e.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      setMessage("Please enter both email and password.");
      return;
    }

    if (!email.includes("@")) {
      setMessage("Please enter a valid email address.");
      return;
    }

    // Fake login, just redirect after a tiny delay for UX
    setMessage("Signing you in…", "success");
    loginBtn.disabled = true;
    googleBtn.disabled = true;
    setTimeout(() => {
      window.location.href = "home.html";
    }, 600);
  }

  if (loginBtn) loginBtn.addEventListener("click", handleLogin);
  if (googleBtn) googleBtn.addEventListener("click", handleLogin);
}

// ---------- HOME PAGE ----------
function initHomePage() {
  const searchInput = document.getElementById("search");
  const catSelect = document.getElementById("category-select");
  const quickSelect = document.getElementById("category-select-quick");

  if (searchInput) {
    searchInput.addEventListener("keyup", filterJewellery);
  }

  function handleCategoryChange(e) {
    const value = e.target.value;
    if (!value) return;
    const map = {
      maharashtrian: "category-maharashtrian.html",
      gujarati: "category-gujarati.html",
      rajasthani: "category-rajasthani.html",
      peshwai: "category-peshwai.html",
      south: "category-south.html",
    };
    if (map[value]) {
      window.location.href = map[value];
    }
  }

  if (catSelect) catSelect.addEventListener("change", handleCategoryChange);
  if (quickSelect) quickSelect.addEventListener("change", handleCategoryChange);
}

function filterJewellery() {
  const searchEl = document.getElementById("search");
  if (!searchEl) return;
  const search = searchEl.value.toLowerCase();
  const items = document.querySelectorAll("#jewellery-list .item");
  items.forEach((item) => {
    const name = item.querySelector("p").textContent.toLowerCase();
    item.style.display = name.includes(search) ? "block" : "none";
  });
}

// ---------- COLLABORATION PAGE ----------
function initCollabPage() {
  // Buttons use addToCartFromElement via onclick attribute or can be wired here if needed
}

// ---------- CATEGORY PAGES ----------
function initCategoryPage() {
  const grid = document.querySelector(".category-grid");
  if (!grid) return;

  const key = grid.dataset.category;
  if (!key || !categories[key]) return;

  renderCategoryGrid(key, grid);
}

function renderCategoryGrid(key, container) {
  const arr = categories[key] || [];
  container.innerHTML = "";

  arr.forEach((item) => {
    const div = document.createElement("div");
    div.className = "item";

    const img = document.createElement("img");
    img.src = item.img;
    img.alt = item.name;

    const nameP = document.createElement("p");
    nameP.textContent = item.name;

    const priceP = document.createElement("p");
    priceP.className = "price";
    priceP.textContent = "₹" + item.price;

    const btn = document.createElement("button");
    btn.textContent = "Add to Cart";
    btn.addEventListener("click", function () {
      addToCart(item);
    });

    div.appendChild(img);
    div.appendChild(nameP);
    div.appendChild(priceP);
    div.appendChild(btn);

    container.appendChild(div);
  });
}

// ---------- CART PAGE ----------
function initCartPage() {
  renderCart();
}

function renderCart() {
  const cont = document.getElementById("cart-contents");
  const totalEl = document.getElementById("cart-total");
  if (!cont || !totalEl) return;

  const cart = getCart();
  cont.innerHTML = "";

  if (cart.length === 0) {
    cont.innerHTML = "<p>Your cart is empty.</p>";
    totalEl.innerText = "";
    return;
  }

  cart.forEach((c, i) => {
    const div = document.createElement("div");
    div.className = "cart-item";

    const img = document.createElement("img");
    img.src = c.img;

    const infoDiv = document.createElement("div");
    infoDiv.style.textAlign = "left";
    const nameDiv = document.createElement("div");
    nameDiv.textContent = c.name;
    const priceDiv = document.createElement("div");
    priceDiv.className = "price";
    priceDiv.textContent = "₹" + c.price;
    infoDiv.appendChild(nameDiv);
    infoDiv.appendChild(priceDiv);

    const qtyInput = document.createElement("input");
    qtyInput.className = "qty-input";
    qtyInput.type = "number";
    qtyInput.min = "1";
    qtyInput.value = c.qty;
    qtyInput.addEventListener("change", (e) => {
      changeQty(i, e.target.value);
    });

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => removeFromCart(i));

    div.appendChild(img);
    div.appendChild(infoDiv);
    div.appendChild(qtyInput);
    div.appendChild(removeBtn);

    cont.appendChild(div);
  });

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  totalEl.innerText = "Total: ₹" + total;
}

function changeQty(i, val) {
  const cart = getCart();
  if (!cart[i]) return;
  const parsed = parseInt(val, 10) || 1;
  cart[i].qty = parsed < 1 ? 1 : parsed;
  saveCart(cart);
  renderCart();
}

function removeFromCart(i) {
  const cart = getCart();
  cart.splice(i, 1);
  saveCart(cart);
  renderCart();
}

function checkout() {
  const cart = getCart();
  if (cart.length === 0) {
    showToast("Your cart is empty");
    return;
  }
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  showToast(`Checkout successful! Total ₹${total}`);
  saveCart([]);
  renderCart();
  setTimeout(() => {
    window.location.href = "home.html";
  }, 900);
}

// ---------- REVIEWS PAGE ----------
let currentRating = 0;

function initReviewsPage() {
  renderReviewsPage();

  const submitBtn = document.getElementById("review-submit");
  const clearBtn = document.getElementById("review-clear");

  if (submitBtn) {
    submitBtn.addEventListener("click", submitReview);
  }
  if (clearBtn) {
    clearBtn.addEventListener("click", clearReviewForm);
  }

  renderStarsInteractive();
}

function renderStarsInteractive() {
  const stars = document.querySelectorAll("#rating-stars .star");
  stars.forEach((s) => {
    const v = parseInt(s.getAttribute("data-value"), 10);

    s.classList.toggle("filled", v <= currentRating);

    s.onclick = () => {
      currentRating = v;
      renderStarsInteractive();
    };

    s.onmouseover = () => {
      stars.forEach((st) => {
        const vv = parseInt(st.getAttribute("data-value"), 10);
        st.classList.toggle("filled", vv <= v);
      });
    };

    s.onmouseout = () => {
      stars.forEach((st) => {
        const vv = parseInt(st.getAttribute("data-value"), 10);
        st.classList.toggle("filled", vv <= currentRating);
      });
    };
  });
}

function submitReview() {
  const name =
    (document.getElementById("review-name").value || "").trim() || "Anonymous";
  const text = (document.getElementById("review-text").value || "").trim();

  if (!text) {
    showToast("Please write a review before submitting.");
    return;
  }

  const rating = currentRating || 0;
  const reviews = getStoredReviews();
  const now = new Date();
  const obj = {
    id: "r_" + now.getTime(),
    name,
    text,
    rating,
    createdAt: now.toISOString(),
  };

  reviews.push(obj);
  saveStoredReviews(reviews);
  clearReviewForm();
  renderReviewsPage();
  showToast("Thank you — your review has been submitted!");
}

function clearReviewForm() {
  const nameEl = document.getElementById("review-name");
  const textEl = document.getElementById("review-text");
  if (nameEl) nameEl.value = "";
  if (textEl) textEl.value = "";
  currentRating = 0;
  renderStarsInteractive();
}

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleString();
}

function renderReviewsPage() {
  const container = document.getElementById("reviews-list");
  const summaryEl = document.getElementById("reviews-summary");
  if (!container || !summaryEl) return;

  container.innerHTML = "";
  const reviews = getStoredReviews().slice().reverse();

  if (reviews.length === 0) {
    summaryEl.innerText = "No reviews yet — be the first to review!";
  } else {
    const total = reviews.reduce((s, r) => s + (r.rating || 0), 0);
    const avg = total / reviews.length || 0;
    summaryEl.innerText = `Average rating: ${avg.toFixed(1)} ★  •  ${
      reviews.length
    } review(s)`;
  }

  reviews.forEach((r) => {
    const div = document.createElement("div");
    div.className = "single-review";

    const starsDisplay = Array.from({ length: 5 }, (_, i) =>
      i < (r.rating || 0) ? "★" : "☆"
    ).join("");

    div.innerHTML = `
      <div class="rev-header">
        <div>
          <div class="rev-name">${escapeHtml(r.name)}</div>
          <div class="small">${starsDisplay}</div>
        </div>
        <div class="rev-date">${formatDate(r.createdAt)}</div>
      </div>
      <div class="rev-text">${escapeHtml(r.text)}</div>
    `;

    container.appendChild(div);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logout-btn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      await signOut(auth);
      alert("Logged out!");
      window.location.href = "auth.html";
    });
  }
});

onAuthStateChanged(auth, (user) => {
  const publicPages = ["auth.html"];
  const current = window.location.pathname.split("/").pop();

  if (!user && !publicPages.includes(current)) {
    window.location.href = "auth.html";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logout-btn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      await signOut(auth);
      alert("Logged out!");
      window.location.href = "auth.html";
    });
  }
});

//profile
document.addEventListener("DOMContentLoaded", () => {
  if (document.body.dataset.page !== "profile") return;

  const nameEl = document.getElementById("profile-name");
  const emailEl = document.getElementById("profile-email");
  const phoneEl = document.getElementById("profile-phone");
  const requestEl = document.getElementById("profile-request");
  const addressEl = document.getElementById("profile-address");
  const saveBtn = document.getElementById("profile-save-btn");

  // Load Firebase user
  onAuthStateChanged(auth, (user) => {
    if (!user) return;

    nameEl.textContent = user.displayName || "User";
    emailEl.textContent = user.email;

    // Load saved profile data
    const saved = JSON.parse(localStorage.getItem("alankar_profile") || "{}");
    phoneEl.value = saved.phone || "";
    requestEl.value = saved.request || "";
    addressEl.value = saved.address || "";
  });

  // Save profile info
  saveBtn.addEventListener("click", () => {
    const data = {
      phone: phoneEl.value.trim(),
      request: requestEl.value.trim(),
      address: addressEl.value.trim(),
    };

    localStorage.setItem("alankar_profile", JSON.stringify(data));
    alert("Profile updated!");
  });
});
