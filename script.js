// DOM Elements
const passwordInput = document.getElementById("password");
const lengthSlider = document.getElementById("length");
const lengthDisplay = document.getElementById("length-value");
const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");
const generateButton = document.getElementById("generate-btn");
const copyButton = document.getElementById("copy-btn");
const strengthText = document.querySelector(".strength-container p");
const strengthLabel = document.getElementById("strength-label");
const strengthColor = document.querySelector(".password-container");

// Character sets
const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numberCharacters = "0123456789";
const symbolCharacters = "!@#$%^&*()-_=+[]{}|;:,.<>?/";

lengthSlider.addEventListener("input", () => {
  lengthDisplay.textContent = lengthSlider.value;
});

generateButton.addEventListener("click", makePassword);

// Random Password Generator
function makePassword() {
  const length = Number(lengthSlider.value);
  const includeUppercase = uppercaseCheckbox.checked;
  const includeLowercase = lowercaseCheckbox.checked;
  const includeNumbers = numbersCheckbox.checked;
  const includeSymbols = symbolsCheckbox.checked;

  if (
    !includeUppercase &&
    !includeLowercase &&
    !includeNumbers &&
    !includeSymbols
  ) {
    alert("Please select at least one character type.");
    return;
  }

  const newPassword = createRandomPassword(
    length,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols,
  );

  passwordInput.value = newPassword;
  updateStrengthMeter(newPassword);
}

function updateStrengthMeter(password) {
  const passwordLength = password.length;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSymbols = /[!@#$%^&*()-_=+[\]{}|;:,.<>?]/.test(password);

  let strengthScore = 0;
  strengthScore += Math.min(passwordLength * 2, 40);
  if (hasUppercase) strengthScore += 15;
  if (hasLowercase) strengthScore += 15;
  if (hasNumbers) strengthScore += 15;
  if (hasSymbols) strengthScore += 15;

  // Enforce minimum score for short password
  if (passwordLength < 8) {
    strengthScore = Math.min(strengthScore, 40);
  }

  let strengthLabelText = "";
  let strengthBgColor = "";

  if (strengthScore < 40) {
    // Weak Password
    strengthBgColor = "rgba(255, 0, 0, 0.08)";
    const weakPassword = [
      "😬 — Even my grandma could guess this.",
      "😬 — That's barely a password.",
      "🧻 — Paper-thin security.",
      "🐣 — Easily cracked.",
      "😅 — Hackers say thank you.",
      "🚪 — Door wide open.",
      "😬 — Hackers love this one.",
      "🧠 — Zero brain required to guess.",
      "🪶 — Light as a feather.",
      "😅 — Try harder…",
      "🚨 — Security risk detected.",
      "🐌 — Slow security.",
      "🪟 — Wide open window.",
      "🎯 — Easy target.",
      "🍪 — Easy to crumble.",
      "😴 — Security sleeping.",
    ];
    const weakRandomIndex =
      crypto.getRandomValues(new Uint32Array(1))[0] % weakPassword.length;
    strengthLabelText = weakPassword[weakRandomIndex];
  } else if (strengthScore < 70) {
    // Medium Password
    strengthBgColor = "rgba(255, 174, 0, 0.08)";
    const mediumPassword = [
      "😏 — Better… but still snackable.",
      "😏 — Getting warmer...",
      "🧱 — Not bad, but add another brick.",
      "🐤 — Harder to crack… still possible.",
      "🤔 — You’re making them work.",
      "🔒 — Door locked… kinda.",
      "😐 — Better, but not bulletproof.",
      "🤓 — Some effort needed.",
      "🪵 — A bit more solid.",
      "👍 — You're getting there.",
      "⚠️ — Proceed with caution.",
      "🐢 — Steady protection.",
      "🚪 — Door half closed.",
      "🛡️ — Some protection.",
      "🍞 — A bit tougher.",
      "😐 — Security awake.",
    ];
    const mediumRandomIndex =
      crypto.getRandomValues(new Uint32Array(1))[0] % mediumPassword.length;
    strengthLabelText = mediumPassword[mediumRandomIndex];
  } else {
    // Strong Password
    strengthBgColor = "rgba(179, 255, 0, 0.08)";
    const strongPassword = [
      "🔐 — Fort Knox just took notes.",
      "🔐 — Now we're talking.",
      "🏰 — Built like a fortress.",
      "🦅 — Uncrackable beast.",
      "😎 — Hackers gave up.",
      "🔐 — Vault secured.",
      "🔐 — Mission impossible.",
      "🧠 — Big brain security.",
      "🪨 — Rock solid.",
      "🔥 — Unbreakable.",
      "✅ — You're safe.",
      "🦍 — Beast mode security.",
      "🏦 — Bank vault level.",
      "🛡️⚔️ — Fully armored.",
      "🥖 — Hard to break.",
      "😎 — Security on duty.",
    ];
    const strongRandomIndex =
      crypto.getRandomValues(new Uint32Array(1))[0] % strongPassword.length;
    strengthLabelText = strongPassword[strongRandomIndex];
  }

  strengthColor.style.backgroundColor = strengthBgColor;
  strengthLabel.textContent = strengthLabelText;
}

function createRandomPassword(
  length,
  includeUppercase,
  includeLowercase,
  includeNumbers,
  includeSymbols,
) {
  const selectedTypes = [];
  if (includeUppercase) selectedTypes.push(uppercaseLetters);
  if (includeLowercase) selectedTypes.push(lowercaseLetters);
  if (includeNumbers) selectedTypes.push(numberCharacters);
  if (includeSymbols) selectedTypes.push(symbolCharacters);

  const allCharacters = selectedTypes.join("");
  const randomValues = new Uint32Array(length);
  crypto.getRandomValues(randomValues);

  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = randomValues[i] % allCharacters.length;
    password += allCharacters[randomIndex];
  }

  if (selectedTypes.length > 0 && length >= selectedTypes.length) {
    const randomValues2 = new Uint32Array(selectedTypes.length);
    crypto.getRandomValues(randomValues2);

    const guaranteedChars = [];
    for (let i = 0; i < selectedTypes.length; i++) {
      const charSet = selectedTypes[i];
      const charIndex = randomValues2[i] % charSet.length;
      guaranteedChars.push(charSet[charIndex]);
    }

    const passwordArray = password.split("");
    for (let i = 0; i < guaranteedChars.length; i++) {
      const pos =
        crypto.getRandomValues(new Uint32Array(1))[0] % passwordArray.length;
      passwordArray[pos] = guaranteedChars[i];
    }
    password = passwordArray.join("");
  }

  return password;
}

// Random Password on Window Refresh
window.addEventListener("DOMContentLoaded", makePassword);

// Copy to Clipboard
copyButton.addEventListener("click", () => {
  if (!passwordInput.value) return;

  navigator.clipboard
    .writeText(passwordInput.value)
    .then(() => showCopySuccess())
    .catch((error) => console.log("Could not copy:", error));
});

function showCopySuccess() {
  copyButton.classList.remove("far", "fa-copy");
  copyButton.classList.add("fas", "fa-check");
  copyButton.style.color = "white";

  setTimeout(() => {
    copyButton.classList.remove("fas", "fa-check");
    copyButton.classList.add("far", "fa-copy");
    copyButton.style.color = "";
  }, 1500);
}
