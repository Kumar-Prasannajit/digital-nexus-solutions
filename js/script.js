/* ==========================================================================
   Digital Nexus Solutions — site scripts
   Mobile nav, smooth scroll, callback time-chips, Netlify Forms AJAX
   submission, and the back-to-top button. No dependencies.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close the mobile menu after tapping a link
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Smooth scroll for in-page anchors ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = this.getAttribute('href');
      if (id.length > 1) {
        var target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  /* ---------- Callback form: "best time to call" chips ---------- */
  var timeChips = document.querySelectorAll('.time-chip');
  var timeValue = document.getElementById('cb-time-value');

  timeChips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      timeChips.forEach(function (c) { c.classList.remove('sel'); });
      this.classList.add('sel');
      if (timeValue) timeValue.value = this.dataset.time;
    });
  });

  /* ---------- Netlify Forms: submit via fetch, show inline success ----------
     Netlify detects these forms at deploy time because the <form> tags in
     this HTML carry data-netlify="true" and a matching hidden form-name
     field. Submitting with fetch keeps the visitor on the page instead of
     redirecting them to a blank success page. */
  function encodeFormData(form) {
    var data = new URLSearchParams();
    new FormData(form).forEach(function (value, key) {
      data.append(key, value);
    });
    return data.toString();
  }

  function wireNetlifyForm(formId, successId) {
    var form = document.getElementById(formId);
    var success = document.getElementById(successId);
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodeFormData(form)
      })
        .then(function () {
          form.reset();
          // Reset the time-chip UI back to its default after a successful callback request
          if (formId === 'callbackForm') {
            timeChips.forEach(function (c) { c.classList.remove('sel'); });
            var morning = form.querySelector('.time-chip[data-time="Morning"]');
            if (morning) morning.classList.add('sel');
            if (timeValue) timeValue.value = 'Morning';
          }
          if (success) success.classList.add('show');
        })
        .catch(function () {
          alert('Something went wrong sending that — please try again, or message us directly on WhatsApp.');
        })
        .finally(function () {
          if (submitBtn) submitBtn.disabled = false;
        });
    });
  }

  wireNetlifyForm('contactForm', 'contactSuccess');
  wireNetlifyForm('callbackForm', 'callbackSuccess');

  /* ---------- Back to top button ---------- */
  var backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      backToTop.classList.toggle('show', window.scrollY > 600);
    }, { passive: true });

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});
