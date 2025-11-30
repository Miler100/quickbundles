/* scripts.js
   Quick Bundles — client-side helpers
   - Preloader hide
   - Floating WhatsApp + order composer
   - Simple order/tracking/contact handlers (open WhatsApp)
   - Small UI helpers
*/

/* Utility: open WhatsApp chat with prefilled text */
function openWhatsApp(text) {
  const phone = "233534226481"; // Quick Bundles WhatsApp (use international format, no +)
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
}

/* PRELOADER: hide when page loads */
document.addEventListener("DOMContentLoaded", function () {
  const pre = document.getElementById("qb-preloader");
  if (pre) {
    setTimeout(() => {
      pre.style.display = "none";
    }, 500); // small delay so users see it briefly
  }

  // Attach buy button handlers (if present)
  document.querySelectorAll(".btn-buy").forEach(btn => {
    btn.addEventListener("click", function (e) {
      // If element has a data-action, use that; otherwise follow link
      const action = btn.getAttribute("data-action");
      if (action === "buy-checker") {
        e.preventDefault();
        openCheckerFlow();
      } else if (action === "buy-bundle") {
        // Go to bundles page if it's a link (default behavior) - do nothing special
      } else {
        // default behaviour for links remains (navigation)
      }
    });
  });
});

/* ---------- Simple flows ---------- */

/* Open a basic checker order form via WhatsApp (quick flow) */
function openCheckerFlow() {
  // We'll ask for minimal details using prompt (works without extra UI)
  const exam = prompt("Which checker? (BECE or WASSCE or Admission)", "WASSCE");
  if (!exam) return;
  const candidate = prompt("Candidate's phone number (or candidate ID):", "");
  if (!candidate) return;
  const qty = prompt("Quantity (e.g., 1):", "1");
  if (!qty) return;

  const priceText = (exam.toLowerCase().includes("bece")) ? "GHS 0.20 (BECE)" :
                    (exam.toLowerCase().includes("wassce")) ? "GHS 0.20 (WASSCE)" :
                    "GHS 305 (Admission)";

  const message =
`Quick Bundles - Order Request
Service: ${exam.toUpperCase()}
Customer number: ${candidate}
Quantity: ${qty}
Price (est): ${priceText}
Payment method: MTN MoMo
Please send payment details/instructions and confirm. Thank you.`;

  openWhatsApp(message);
}

/* Tracking: simple lookup that opens WhatsApp for manual tracking request */
function trackOrder() {
  const input = document.getElementById("trackInput");
  if (!input) {
    alert("Tracking input not found on this page.");
    return;
  }
  const q = input.value.trim();
  if (!q) {
    alert("Please enter your Order ID or phone number.");
    return;
  }

  const message =
`Quick Bundles - Tracking request
Lookup: ${q}
Please check order status and reply.`;

  openWhatsApp(message);
}

/* Contact form handler used on contact.html (if present) */
function sendContactMessage(event) {
  if (event) event.preventDefault();

  const name = document.getElementById("cname") ? document.getElementById("cname").value.trim() : "";
  const phone = document.getElementById("cphone") ? document.getElementById("cphone").value.trim() : "";
  const email = document.getElementById("cemail") ? document.getElementById("cemail").value.trim() : "";
  const msg = document.getElementById("cmsg") ? document.getElementById("cmsg").value.trim() : "";

  if (!name || !phone || !msg) {
    alert("Please fill Name, Phone and Message fields.");
    return;
  }

  const text =
`Quick Bundles - Contact form
Name: ${name}
Phone: ${phone}
Email: ${email || "N/A"}
Message: ${msg}`;

  openWhatsApp(text);
}

/* Payment confirmation helper (used on payment page) */
function confirmPayment(orderType = "Purchase") {
  const payer = prompt("Your name (payer):", "");
  if (!payer) return;
  const amount = prompt("Amount paid (GHS):", "");
  if (!amount) return;
  const ref = prompt("Transaction reference / MoMo code:", "");
  if (!ref) return;

  const text =
`Quick Bundles - Payment Confirmation
Order: ${orderType}
Payer: ${payer}
Amount: GHS ${amount}
Transaction Ref: ${ref}
Please confirm and deliver service.`;

  openWhatsApp(text);
}

/* Small helper to safely attach functions to window so buttons can call them */
window.trackOrder = trackOrder;
window.sendContactMessage = sendContactMessage;
window.confirmPayment = confirmPayment;
window.openCheckerFlow = openCheckerFlow;
