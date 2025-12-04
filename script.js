/**** CONFIG ****/
const ACCESS_CODE = "Bts2025"; // change if needed

// External URLs
const URLS = {
  portal: "https://biggarttech.com",
  stripeCheckout: "https://buy.stripe.com/eVq9ATdt3g3FgIIh2a4800c?locale=en&__embed_source=buy_btn_1RTbNgGxErE1t0T4rVUHaRiK",
  billingPortal: "https://billing.stripe.com/p/login/fZedUp80B8345H25kk",
  addonsWhatsApp: "https://api.whatsapp.com/send/?phone=14388627334&text=Hi+there%2C+I'm+a+VIP+member+looking+to+add-on+to+my+current+plan.",
  checklist: "https://docs.google.com/forms/d/e/1FAIpQLSeU7WmC2VHCIwzI6k35aQRljGo0FJfC3uLMsvWOJTkB9r-VHQ/viewform?usp=header",
  myApp: "https://drive.google.com/drive/folders/1lcXYt7EiWmjFisGwtNZs47jsGqfetqU-?usp=drive_link",
  profile: "https://docs.google.com/forms/d/e/1FAIpQLSfAOUvVwGHTtYlDrjyEzbEkVNBCaxt-BfFdHGWV6PmxMZi1tg/viewform",
  requests: "https://docs.google.com/forms/d/newe/1FAIpQLSevr6ybwDjUz7i1jOu6SqovPIsohUCCMRMpPlLPNpqVzrs2ug/viewform",
  whatsappSupport: "https://wa.me/14388627334?text=Hi%20there%2C%20I'm%20a%20VIP%20member%20requesting%20support.",
  supportEmail: "info@biggarttech.com",
  supportPhone: "+971524400682"
};

/**** ACCESS GATE ****/
const accessSection = document.getElementById("accessSection");
const contentSection = document.getElementById("contentSection");
const accessMsg = document.getElementById("accessMessage");
const codeInput = document.getElementById("codeInput");

function showContent() {
  accessSection.style.display = "none";
  contentSection.style.display = "block";
}

function checkAccessCode() {
  const input = (codeInput.value || "").trim();
  if (input === ACCESS_CODE) {
    try { localStorage.setItem("biggart_access_ok", "1"); } catch (e) {}
    showContent();
  } else {
    accessMsg.textContent = "Access Code invalid. Please try again.";
  }
}

document.getElementById("submitCodeBtn").addEventListener("click", checkAccessCode);

// Auto-unlock if previously validated
try {
  if (localStorage.getItem("biggart_access_ok") === "1") showContent();
} catch (e) {}

/**** BUILD FIRE HELPERS ****/
function openExternal(url) {
  // Prefer BuildFire bridge (native apps), fallback to normal window.open (PWA/preview)
  if (window.parent && window.parent.buildfire && window.parent.buildfire.actionItems) {
    window.parent.buildfire.actionItems.execute({
      title: url,
      url: url,
      action: "linkToWeb",
      openIn: "_system",
      iconUrl: ""
    });
  } else {
    window.open(url, "_blank");
  }
}

function sendEmail(to, subject, body) {
  if (window.parent && window.parent.buildfire && window.parent.buildfire.actionItems) {
    window.parent.buildfire.actionItems.execute({
      title: "Send Email",
      email: to,
      subject: subject,
      body: body,
      action: "sendEmail"
    });
  } else {
    window.location.href =
      `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
}

function callNumber(phone) {
  if (window.parent && window.parent.buildfire && window.parent.buildfire.actionItems) {
    window.parent.buildfire.actionItems.execute({
      action: "callNumber",
      phoneNumber: phone
    });
  } else {
    window.location.href = `tel:${phone}`;
  }
}

/**** NAV + BUTTON WIRING ****/
document.getElementById("myPortalLink").addEventListener("click", (e) => {
  e.preventDefault();
  openExternal(URLS.portal);
});

// Subscribe / checkout
document.getElementById("subscribeBtn").addEventListener("click", (e) => {
  e.preventDefault();
  openExternal(URLS.stripeCheckout);
});

// App
document.getElementById("btnChecklist").addEventListener("click", (e) => {
  e.preventDefault();
  openExternal(URLS.checklist);
});
document.getElementById("btnMyApp").addEventListener("click", (e) => {
  e.preventDefault();
  openExternal(URLS.myApp);
});
document.getElementById("btnProfile").addEventListener("click", (e) => {
  e.preventDefault();
  openExternal(URLS.profile);
});
document.getElementById("btnRequests").addEventListener("click", (e) => {
  e.preventDefault();
  openExternal(URLS.requests);
});

// Billing
document.getElementById("btnBillingPortal").addEventListener("click", (e) => {
  e.preventDefault();
  openExternal(URLS.billingPortal);
});
document.getElementById("btnAddOns").addEventListener("click", (e) => {
  e.preventDefault();
  openExternal(URLS.addonsWhatsApp);
});
document.getElementById("btnPay").addEventListener("click", (e) => {
  e.preventDefault();
  openExternal(URLS.stripeCheckout);
});

// Support
document.getElementById("btnWhatsApp").addEventListener("click", (e) => {
  e.preventDefault();
  openExternal(URLS.whatsappSupport);
});
document.getElementById("btnEmail").addEventListener("click", (e) => {
  e.preventDefault();
  sendEmail(URLS.supportEmail, "VIP Support Request", "Hi there, I'm a VIP member requesting support.");
});
document.getElementById("btnCall").addEventListener("click", (e) => {
  e.preventDefault();
  callNumber(URLS.supportPhone);
});

// Optional: leverage BuildFire Auth (auto-unlock for logged-in users)
// if (window.parent && window.parent.buildfire && window.parent.buildfire.auth) {
//   window.parent.buildfire.auth.getCurrentUser(function(err, user){
//     if (!err && user) { showContent(); }
//   });
// }
