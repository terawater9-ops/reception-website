// Site settings. Fill these in once, and every page updates.
window.SITE = {
  email: "info@mutualbiz.ca",
  phone: "",
  // Live demo line: answered by our sample receptionist for "Lakeshore Plumbing".
  demoPhone: "365-517-2724",
  // Web3Forms access key for info@mutualbiz.ca. The demo request form appears once this is set.
  formKey: ""
};

(function () {
  function telHref(n) { return "tel:+1" + n.replace(/\D/g, ""); }

  function demoLine(s) {
    return '<p class="demo-line"><span class="demo-dot" aria-hidden="true"></span>' +
      'Hear it now: call <a href="' + telHref(s.demoPhone) + '">' + s.demoPhone + '</a>' +
      '<span class="demo-note">Our sample receptionist answers as Lakeshore Plumbing, a demo company. Ask it anything. Each phone number can make up to 3 demo calls: the first up to 3 minutes, then 2 minutes each.</span></p>';
  }

  function form(s) {
    return '<form class="demo-form" action="https://api.web3forms.com/submit" method="POST">' +
      '<input type="hidden" name="access_key" value="' + s.formKey + '">' +
      '<input type="hidden" name="subject" value="New demo request: AI receptionist">' +
      '<input type="hidden" name="from_name" value="mutualbiz.ca">' +
      '<input type="hidden" name="redirect" value="https://www.mutualbiz.ca/thanks.html">' +
      '<input type="checkbox" name="botcheck" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">' +
      '<div class="field-row">' +
        '<label>Your name<input name="name" required autocomplete="name"></label>' +
        '<label>Business name<input name="business" required autocomplete="organization"></label>' +
      '</div>' +
      '<div class="field-row">' +
        '<label>Type of business<select name="trade" required>' +
          '<option value="">Choose one</option><option>Plumbing</option><option>HVAC / heating and cooling</option>' +
          '<option>Electrical</option><option>Cleaning</option><option>Roofing / contractor</option>' +
          '<option>Garage door / appliance repair</option><option>Auto shop</option><option>Landscaping</option>' +
          '<option>Dental clinic</option><option>Physio / chiro / wellness clinic</option><option>Other</option>' +
        '</select></label>' +
        '<label>City or service area<input name="service_area" required placeholder="e.g. Mississauga"></label>' +
      '</div>' +
      '<div class="field-row">' +
        '<label>Email<input type="email" name="email" required autocomplete="email"></label>' +
        '<label><span>Phone <span class="opt">(optional)</span></span><input type="tel" name="phone" autocomplete="tel"></label>' +
      '</div>' +
      '<button class="btn" type="submit">Get my free demo</button>' +
      '<p class="fine">We\'ll email you a demo line that answers with your business name. No commitment.</p>' +
      '</form>';
  }

  document.addEventListener("DOMContentLoaded", function () {
    var s = window.SITE || {};
    document.querySelectorAll("[data-demo]").forEach(function (el) {
      if (s.demoPhone) el.innerHTML = demoLine(s);
    });
    document.querySelectorAll("[data-contact]").forEach(function (el) {
      var parts = [];
      if (s.demoPhone) parts.push(demoLine(s));
      if (s.formKey) parts.push(form(s));
      if (s.email) {
        parts.push('<p class="mail-line">' + (s.formKey ? "Or email us: " : "Email us: ") +
          '<a href="mailto:' + s.email + '?subject=Free%20demo%20request">' + s.email + '</a> ' +
          '<button type="button" class="copy" data-copy="' + s.email + '">Copy</button></p>');
      }
      if (s.phone) parts.push('<p>Or call <a href="' + telHref(s.phone) + '">' + s.phone + "</a></p>");
      el.innerHTML = parts.join("");
    });
    document.addEventListener("click", function (e) {
      var b = e.target.closest ? e.target.closest("[data-copy]") : null;
      if (!b) return;
      try {
        navigator.clipboard.writeText(b.getAttribute("data-copy")).then(function () {
          b.textContent = "Copied";
          setTimeout(function () { b.textContent = "Copy"; }, 2000);
        }, function () {});
      } catch (err) {}
    });
  });
})();
