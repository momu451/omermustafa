(() => {
  const body = document.body;
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const gatedBlocks = document.querySelectorAll('.gated-items');
  const modal = document.getElementById('gate-modal');
  const modalClose = modal ? modal.querySelector('.modal-close') : null;
  const modalBackdrop = modal ? modal.querySelector('.modal-backdrop') : null;
  const gateTriggers = document.querySelectorAll('.gate-trigger');
  const detailsBlocks = document.querySelectorAll('details');
  const desktopQuery = window.matchMedia('(min-width: 900px)');

  const unlock = () => {
    body.classList.remove('locked');
    gatedBlocks.forEach((section) => section.setAttribute('aria-hidden', 'false'));
    sessionStorage.setItem('access_unlocked', '1');
  };

  const openModal = () => {
    if (!modal) {
      return;
    }
    modal.setAttribute('aria-hidden', 'false');
    modal.querySelector('input, textarea, button')?.focus();
  };

  const closeModal = () => {
    if (!modal) {
      return;
    }
    modal.setAttribute('aria-hidden', 'true');
  };

  if (sessionStorage.getItem('access_unlocked') === '1') {
    unlock();
  }

  const syncDetails = () => {
    detailsBlocks.forEach((detail) => {
      detail.open = desktopQuery.matches;
    });
  };

  syncDetails();
  if (desktopQuery.addEventListener) {
    desktopQuery.addEventListener('change', syncDetails);
  } else if (desktopQuery.addListener) {
    desktopQuery.addListener(syncDetails);
  }

  const scrollToAssets = () => {
    const assets = document.getElementById('gated-assets');
    if (assets) {
      assets.scrollIntoView({ behavior: 'smooth' });
      const cvLink = document.getElementById('cv-link');
      if (cvLink) {
        cvLink.focus();
      }
    }
  };

  gateTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      if (!body.classList.contains('locked')) {
        const gateType = trigger.getAttribute('data-gate');
        if (gateType === 'cv' || gateType === 'case') {
          event.preventDefault();
          scrollToAssets();
        }
        return;
      }
      event.preventDefault();
      openModal();
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', closeModal);
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  });

  if (!form) {
    return;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (status) {
      status.textContent = 'Submitting...';
    }
    const formData = new FormData(form);
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        if (status) {
          status.textContent = 'Access granted. You can now open gated assets.';
        }
        form.reset();
        unlock();
        closeModal();
        return;
      }

      const data = await response.json();
      if (status) {
        if (data && data.errors) {
          status.textContent = data.errors.map((error) => error.message).join(' ');
        } else {
          status.textContent = 'Submission failed. Try again later.';
        }
      }
    } catch (err) {
      if (status) {
        status.textContent = 'Submission failed. Check your connection and try again.';
      }
    }
  });
})();
