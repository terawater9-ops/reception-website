// Contact details shown on every page. Fill these in once, and every page updates.
window.SITE = {
  email: "",
  phone: ""
};

document.addEventListener("DOMContentLoaded", function () {
  var s = window.SITE || {};
  document.querySelectorAll("[data-contact]").forEach(function (el) {
    var parts = [];
    if (s.email) {
      parts.push('<a class="btn" href="mailto:' + s.email + '?subject=Free%20demo%20request">Book a free demo</a>');
    }
    if (s.phone) {
      parts.push('<p>Or call <a href="tel:' + s.phone.replace(/[^+\d]/g, "") + '">' + s.phone + "</a></p>");
    }
    el.innerHTML = parts.length ? parts.join("") : "<p>Contact details are being set up.</p>";
  });
});
