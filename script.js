/* ============================================
   KurtiSarara by Shalini — Interactive Logic
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Preloader ----
  const preloader = document.querySelector('.preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 1200);
  });

  // Fallback: hide preloader after 3s max
  setTimeout(() => {
    preloader.classList.add('hidden');
  }, 3000);


  // ---- Navbar Scroll Effect ----
  const navbar = document.querySelector('.navbar');
  const backToTop = document.querySelector('.back-to-top');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top button
    if (currentScroll > 600) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }

    lastScroll = currentScroll;
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  // ---- Mobile Navigation ----
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavClose = document.querySelector('.mobile-nav-close');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

  hamburger.addEventListener('click', () => {
    mobileNav.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  mobileNavClose.addEventListener('click', () => {
    mobileNav.classList.remove('active');
    document.body.style.overflow = '';
  });

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('active');
      document.body.style.overflow = '';
    });
  });


  // ---- Scroll Animations ----
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });


  // ---- Product Filter Tabs ----
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      productCards.forEach((card, index) => {
        const category = card.dataset.category;

        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          card.style.animation = `fadeInUp 0.5s var(--ease-out) ${index * 0.1}s both`;
        } else {
          card.style.display = 'none';
        }
      });
    });
  });


  // ---- Quick View Modal ----
  const modalOverlay = document.querySelector('.modal-overlay');
  const modalClose = document.querySelector('.modal-close');
  const quickViewBtns = document.querySelectorAll('.quick-view-btn');

  const products = [
    {
      id: 1,
      name: 'Maharani Wine Kurti',
      category: 'Designer Kurtis',
      price: '₹4,999',
      desc: 'Exquisite wine red kurti with hand-embroidered gold thread work on the neckline and sleeves. Crafted from premium silk blend fabric with a modern straight-cut silhouette.',
      img: 'images/product_1.png'
    },
    {
      id: 2,
      name: 'Emerald Zari Saree',
      category: 'Silk Sarees',
      price: '₹12,499',
      desc: 'Magnificent emerald green pure silk saree with intricate golden zari weaving. Features a stunning pallu with traditional motifs and a luxurious drape.',
      img: 'images/product_2.png'
    },
    {
      id: 3,
      name: 'Royal Anarkali Suit',
      category: 'Anarkali Collection',
      price: '₹7,999',
      desc: 'Breathtaking royal blue anarkali suit with heavy silver and sequin embroidery. Floor-length flowing silhouette perfect for festive occasions.',
      img: 'images/product_3.png'
    },
    {
      id: 4,
      name: 'Blush Bridal Lehenga',
      category: 'Bridal Collection',
      price: '₹24,999',
      desc: 'Dream-worthy blush pink bridal lehenga with rose gold embroidery and mirror work. A masterpiece of traditional craftsmanship for your special day.',
      img: 'images/product_4.png'
    },
    {
      id: 5,
      name: 'Mustard Palazzo Set',
      category: 'Designer Kurtis',
      price: '₹3,499',
      desc: 'Contemporary mustard yellow palazzo kurti set with artisanal block print and delicate tassel detailing. Perfect fusion of traditional charm and modern style.',
      img: 'images/product_5.png'
    },
    {
      id: 6,
      name: 'Banarasi Silk Saree',
      category: 'Silk Sarees',
      price: '₹15,999',
      desc: 'Timeless Banarasi silk saree in deep magenta with opulent gold brocade weaving. Handcrafted by master weavers, a true collector\'s piece.',
      img: 'images/product_6.png'
    }
  ];

  quickViewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const productId = parseInt(btn.dataset.productId);
      const product = products.find(p => p.id === productId);

      if (product) {
        document.querySelector('.modal-img img').src = product.img;
        document.querySelector('.modal-category').textContent = product.category;
        document.querySelector('.modal-title').textContent = product.name;
        document.querySelector('.modal-price').textContent = product.price;
        document.querySelector('.modal-desc').textContent = product.desc;

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  modalClose.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Size selection in modal
  const sizeBtns = document.querySelectorAll('.size-btn');
  sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });


  // ---- Cart Counter ----
  let cartCount = 0;
  const cartCountEl = document.querySelector('.cart-count');
  const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
  const wishlistBtns = document.querySelectorAll('.wishlist-btn');

  function showToast(message) {
    const toast = document.querySelector('.toast');
    toast.querySelector('span').textContent = message;
    toast.classList.add('visible');

    setTimeout(() => {
      toast.classList.remove('visible');
    }, 2500);
  }

  addToCartBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      cartCount++;
      cartCountEl.textContent = cartCount;
      showToast('Added to cart successfully!');

      // Button pulse animation
      btn.style.transform = 'scale(1.2)';
      setTimeout(() => {
        btn.style.transform = 'scale(1)';
      }, 200);
    });
  });

  // Modal Add to Cart
  const modalAddToCart = document.querySelector('.modal-add-to-cart');
  if (modalAddToCart) {
    modalAddToCart.addEventListener('click', () => {
      cartCount++;
      cartCountEl.textContent = cartCount;
      showToast('Added to cart successfully!');
      setTimeout(() => {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }, 800);
    });
  }

  wishlistBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      btn.classList.toggle('active');

      if (btn.classList.contains('active')) {
        btn.querySelector('svg').style.fill = 'var(--color-wine)';
        btn.querySelector('svg').style.color = 'var(--color-wine)';
        showToast('Added to wishlist ♥');
      } else {
        btn.querySelector('svg').style.fill = 'none';
        btn.querySelector('svg').style.color = '';
        showToast('Removed from wishlist');
      }
    });
  });


  // ---- Newsletter Form ----
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      if (input.value.trim()) {
        showToast('Welcome to the KurtiSarara family! ✨');
        input.value = '';
      }
    });
  }


  // ---- Smooth scroll for nav links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  // ---- Counter Animation ----
  function animateCounters() {
    const counters = document.querySelectorAll('.luxury-stat-number');

    counters.forEach(counter => {
      const target = counter.dataset.target;
      const suffix = counter.dataset.suffix || '';
      const duration = 2000;
      const start = 0;
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(easeOut * target);

        counter.textContent = current.toLocaleString() + suffix;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      }

      requestAnimationFrame(updateCounter);
    });
  }

  // Trigger counter animation when section is in view
  const luxurySection = document.querySelector('.luxury-banner');
  if (luxurySection) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    counterObserver.observe(luxurySection);
  }


  // ---- Parallax on Hero ----
  const heroBg = document.querySelector('.hero-bg img');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        heroBg.style.transform = `translateY(${scrollY * 0.3}px) scale(1.1)`;
      }
    });
  }


  // ---- Keyboard accessibility ----
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      // Close modal
      if (modalOverlay.classList.contains('active')) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
      // Close mobile nav
      if (mobileNav.classList.contains('active')) {
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });

});
