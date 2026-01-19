// auth.js
import { auth } from "./assets/firebase.js";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// FORM ELEMENTS
const form = document.getElementById("auth-form");
const signupBtn = document.getElementById("signup-btn");

// ========================
// LOGIN
// ========================
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Enter email and password.");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login successful!");
    window.location.href = "home.html";
  } catch (err) {
    alert(err.message);
  }
});

// ========================
// SIGNUP
// ========================
signupBtn.addEventListener("click", async () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Enter email and password first.");
    return;
  }

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Account created successfully!");
    window.location.href = "home.html";
  } catch (err) {
    alert(err.message);
  }
});
