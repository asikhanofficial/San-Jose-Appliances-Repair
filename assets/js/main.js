/**
 * SAN JOSE APPLIANCES REPAIR — MAIN CLIENT JAVASCRIPT
 * Domain: sanjoseappliancesrepair.online | Phone: (833) 327-1076
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. File Protocol Link Normalization (Enables opening index.html directly from local folder)
  if (window.location.protocol === 'file:') {
    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (
        href &&
        !href.startsWith('http') &&
        !href.startsWith('tel:') &&
        !href.startsWith('mailto:') &&
        !href.startsWith('#') &&
        !href.endsWith('.html') &&
        !href.includes('?') &&
        !href.startsWith('/')
      ) {
        link.setAttribute('href', href + '.html');
      }
    });
  }

  // 2. Active Navigation Highlight
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-link, .dropdown-link, .mobile-nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (currentPath.endsWith(href) || currentPath.endsWith(href + '.html'))) {
      link.classList.add('active');
    }
  });

  // 3. Mobile Navigation Hamburger & Drawer
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileOverlay = document.getElementById('mobileOverlay');

  function openMobileMenu() {
    if (hamburgerBtn && mobileDrawer && mobileOverlay) {
      hamburgerBtn.classList.add('is-active');
      mobileDrawer.classList.add('is-open');
      mobileOverlay.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileMenu() {
    if (hamburgerBtn && mobileDrawer && mobileOverlay) {
      hamburgerBtn.classList.remove('is-active');
      mobileDrawer.classList.remove('is-open');
      mobileOverlay.style.display = 'none';
      document.body.style.overflow = '';
    }
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer && mobileDrawer.classList.contains('is-open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileMenu);
  }

  // Close mobile menu when any mobile link is clicked
  document.querySelectorAll('.mobile-drawer a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // 4. Mobile Services Submenu Toggle
  const mobileServicesToggle = document.getElementById('mobileServicesToggle');
  const mobileServicesSubmenu = document.getElementById('mobileServicesSubmenu');
  if (mobileServicesToggle && mobileServicesSubmenu) {
    mobileServicesToggle.addEventListener('click', (e) => {
      e.preventDefault();
      const isVisible = mobileServicesSubmenu.style.display === 'flex';
      mobileServicesSubmenu.style.display = isVisible ? 'none' : 'flex';
      const arrow = mobileServicesToggle.querySelector('.nav-dropdown-icon');
      if (arrow) {
        arrow.style.transform = isVisible ? 'rotate(0deg)' : 'rotate(180deg)';
      }
    });
  }

  // 5. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const button = item.querySelector('.faq-button');
    if (button) {
      button.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');
        // Close siblings
        faqItems.forEach(sibling => {
          if (sibling !== item) {
            sibling.classList.remove('is-open');
          }
        });
        // Toggle current
        if (isOpen) {
          item.classList.remove('is-open');
        } else {
          item.classList.add('is-open');
        }
      });
    }
  });

  // 6. Header Scroll Shadow
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.style.boxShadow = '0 4px 20px rgba(23, 33, 38, 0.08)';
      } else {
        header.style.boxShadow = 'none';
      }
    });
  }

  // 7. Interactive Lead / Booking Form (Client-Side Validated)
  const contactForm = document.getElementById('applianceContactForm');
  const formSuccess = document.getElementById('formSuccessBanner');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = contactForm.querySelector('[name="name"]');
      const phone = contactForm.querySelector('[name="phone"]');
      const appliance = contactForm.querySelector('[name="appliance"]');
      const message = contactForm.querySelector('[name="message"]');

      if (!name || !name.value.trim()) {
        alert('Please enter your full name.');
        if (name) name.focus();
        return;
      }

      if (!phone || !phone.value.trim()) {
        alert('Please enter your contact phone number.');
        if (phone) phone.focus();
        return;
      }

      // Display immediate success feedback
      if (formSuccess) {
        formSuccess.style.display = 'block';
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      contactForm.reset();
    });
  }
});
