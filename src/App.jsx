import { useEffect, useMemo, useRef, useState } from "react";
import {
  AirVent,
  AlertCircle,
  Banknote,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Check,
  CheckCircle2,
  Car,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  ClipboardCheck,
  Clock3,
  CreditCard,
  Cog,
  FileText,
  Gauge,
  Globe,
  Camera,
  Play,
  Send,
  LockKeyhole,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  PackageCheck,
  Phone,
  Search,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  SlidersHorizontal,
  Tag,
  ThumbsUp,
  UploadCloud,
  User,
  UserRound,
  Wrench,
  X,
  Quote,
  Sparkles,
} from "lucide-react";

const services = [
  {
    id: 1,
    title: "Oil Change",
    description: "High quality oil change service for smooth performance.",
    image: "/assets/oil-change.jpg",
    icon: Wrench,
    price: 8500,
  },
  {
    id: 2,
    title: "Brake Service",
    description:
      "Ensure your safety with our expert brake inspection & repair.",
    image: "/assets/brake-service.jpg",
    icon: CircleCheck,
    price: 12000,
  },
  {
    id: 3,
    title: "Engine Diagnostics",
    description: "Advanced scanning & diagnostics for all vehicle problems.",
    image: "/assets/engine-diagnostics.jpg",
    icon: Gauge,
    price: 5000,
  },
  {
    id: 4,
    title: "AC Service",
    description: "Keep your drive cool with our AC check & regular service.",
    image: "/assets/ac-service.jpg",
    icon: AirVent,
    price: 10000,
  },
  {
    id: 5,
    title: "Wheel Alignment",
    description:
      "Precise wheel alignment for better handling & longer tyre life.",
    image: "/assets/wheel-alignment.jpg",
    icon: SlidersHorizontal,
    price: 6500,
  },
  {
    id: 6,
    title: "Battery Service",
    description:
      "Battery testing, terminal cleaning, charging and reliable replacement.",
    image: "/assets/service-diagnostics.jpg",
    icon: PackageCheck,
    price: 7500,
  },
  {
    id: 7,
    title: "Tyre Replacement & Balancing",
    description:
      "Professional tyre replacement and wheel balancing for a smoother drive.",
    image: "/assets/service-alignment.jpg",
    icon: CircleCheck,
    price: 9500,
  },
  {
    id: 8,
    title: "Suspension & Steering",
    description:
      "Inspection and repair of shocks, steering parts and suspension systems.",
    image: "/assets/service-brakes.jpg",
    icon: Cog,
    price: 15000,
  },
  {
    id: 9,
    title: "Transmission Service",
    description:
      "Transmission inspection, fluid replacement and performance maintenance.",
    image: "/assets/service-oil.jpg",
    icon: Gauge,
    price: 18000,
  },
  {
    id: 10,
    title: "Car Wash & Detailing",
    description:
      "Complete exterior wash, interior cleaning and professional detailing.",
    image: "/assets/hero-mechanics-2.jpg",
    icon: Sparkles,
    price: 7000,
  },
  {
    id: 11,
    title: "Electrical Repairs",
    description:
      "Diagnosis and repair of lights, wiring, charging and starting systems.",
    image: "/assets/service-diagnostics.jpg",
    icon: Wrench,
    price: 8000,
  },
  {
    id: 12,
    title: "Radiator & Cooling System",
    description:
      "Cooling-system inspection, coolant replacement and radiator servicing.",
    image: "/assets/service-ac.jpg",
    icon: AirVent,
    price: 11000,
  },
];

const products = [
  {
    id: 1,
    name: "Castrol MAGNATEC A5 5W-30 Engine Oil 4L",
    image: "/assets/product-castrol.png",
    price: 27400,
    oldPrice: 30110,
    reviews: 125,
  },
  {
    id: 2,
    name: "Mobil Super Friction Fighter 5W-30 Engine Oil 4L",
    image: "/assets/product-mobil.png",
    price: 13930,
    oldPrice: 15500,
    reviews: 98,
  },
  {
    id: 3,
    name: "Prestone All Vehicles Antifreeze/Coolant 4L",
    image: "/assets/product-prestone.png",
    price: 5550,
    oldPrice: 6590,
    reviews: 87,
  },
  {
    id: 4,
    name: "Brembo DOT 4 Brake Fluid 500ml",
    image: "/assets/product-brembo.png",
    price: 3750,
    oldPrice: 4250,
    reviews: 76,
  },
  {
    id: 5,
    name: "Bosch Premium Oil Filter 1 Pc",
    image: "/assets/product-bosch.png",
    price: 2850,
    oldPrice: 3200,
    reviews: 112,
  },
  {
    id: 6,
    name: "Amaron 46B24 R/L GO Car Battery 45Ah",
    image: "/assets/product-battery.png",
    price: 28454.25,
    oldPrice: 34490,
    reviews: 83,
  },
];

const formatLKR = (value) =>
  `Rs. ${new Intl.NumberFormat("en-LK", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(Number(value || 0))}`;

const processSteps = [
  {
    title: "Book Appointment",
    description: "Choose your service and book online.",
    icon: CalendarDays,
  },
  {
    title: "Vehicle Inspection",
    description: "Our experts inspect your vehicle thoroughly.",
    icon: Car,
  },
  {
    title: "Service & Repair",
    description: "We service your vehicle using quality parts.",
    icon: Cog,
  },
  {
    title: "Quality Check",
    description: "Final quality check for your complete satisfaction.",
    icon: BadgeCheck,
  },
  {
    title: "Deliver & Enjoy",
    description: "Your vehicle is ready. Enjoy a smooth drive!",
    icon: PackageCheck,
  },
];

const testimonials = [
  {
    name: "Saman Kumara",
    city: "Colombo",
    image: "/assets/R1.jpg",
    quote:
      "Excellent service and very professional staff. My car feels like new. Highly recommended!",
  },
  {
    name: "Kasuni Wijeeseekara",
    city: "Galle",
    image: "/assets/R2.jpg",
    quote:
      "Quick and reliable service. Transparent pricing and genuine parts. Great experience!",
  },
  {
    name: "Malith Perera",
    city: "Kandy",
    image: "/assets/R3.jpg",
    quote: "Best service center in town! They treated my car with best care.",
  },
];

const navItems = [
  ["Home", "#home"],
  ["Services", "#services"],
  ["Shop", "#shop"],
  ["About Us", "#about"],
  ["Offers", "#offers"],
  ["Contact Us", "#contact"],
];

const defaultHeroSlides = [
  {
    id: 1,
    image: "/assets/hero-mechanics-1.jpg",
  },
  {
    id: 2,
    image: "/assets/hero-mechanics-2.jpg",
  },
];

const heroContent = {
  eyebrow: "Precision care. Proven expertise.",
  title: "Expert Care For Your Vehicle",
  description:
    "Professional inspections, dependable repairs and genuine vehicle-care products delivered by skilled technicians.",
};

const heroSlides =
  typeof window !== "undefined" &&
  Array.isArray(window.__DRIVECARE_CONTENT__?.heroSlides) &&
  window.__DRIVECARE_CONTENT__.heroSlides.length > 0
    ? window.__DRIVECARE_CONTENT__.heroSlides
    : defaultHeroSlides;

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [notice, setNotice] = useState("");
  const [testimonialPage, setTestimonialPage] = useState(0);
  const [heroSlide, setHeroSlide] = useState(0);
  const [showAllServices, setShowAllServices] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  );
  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart],
  );
  const visibleServices = showAllServices ? services : services.slice(0, 5);

  useEffect(() => {
    const sliderTimer = window.setInterval(() => {
      setHeroSlide((currentSlide) => (currentSlide + 1) % heroSlides.length);
    }, 5200);

    return () => window.clearInterval(sliderTimer);
  }, []);

  const showNotice = (message) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2600);
  };

  const scrollTo = (selector) => {
    document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const addToCart = (product) => {
    setCart((items) => {
      const found = items.find((item) => item.id === product.id);
      return found
        ? items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        : [...items, { ...product, quantity: 1 }];
    });
    showNotice("Product added to cart");
  };

  const updateQuantity = (id, amount) => {
    setCart((items) =>
      items
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + amount) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };


  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="header-frame">
          <button
            className="brand-button"
            onClick={() => scrollTo("#home")}
            aria-label="Asian Auto Clean Park home"
          >
            <img
              className="brand-logo"
              src="/assets/logo.png"
              alt="Asian Auto Clean Park"
            />
          </button>

          <div className="nav-zone">
            <nav className={`main-nav ${menuOpen ? "is-open" : ""}`}>
              {navItems.map(([label, href], index) => (
                <button
                  key={label}
                  className={`nav-link ${index === 0 ? "active" : ""}`}
                  onClick={() => scrollTo(href)}
                >
                  <span>{label}</span>
                </button>
              ))}
              <button
                className="mobile-booking-nav-button"
                onClick={() => {
                  setMenuOpen(false);
                  setBookingOpen(true);
                }}
              >
                <CalendarDays size={17} />
                Book an Appointment
              </button>
            </nav>
          </div>

          <div className="header-actions">
            <button
              className="icon-button search-button"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
            >
              <Search size={19} />
            </button>
            <button
              className="cart-button"
              onClick={() => setCartOpen(true)}
              aria-label="Open cart"
            >
              <ShoppingCart size={21} />
              <span>{cartCount}</span>
            </button>
            <button
              className="header-book-button"
              onClick={() => setBookingOpen(true)}
            >
              <CalendarDays size={17} />
              Book an Appointment
            </button>
            <button
              className="mobile-menu-button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {searchOpen && (
            <div className="search-popover">
              <Search size={18} />
              <input autoFocus placeholder="Search services or products" />
              <button
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
              >
                <X size={18} />
              </button>
            </div>
          )}
        </div>
      </header>

      <main>
        <section className="hero-section" id="home">
          <div className="hero-slider" aria-hidden="true">
            {heroSlides.map((slide, index) => (
              <div
                className={`hero-slide ${index === heroSlide ? "is-active" : ""}`}
                key={slide.id}
              >
                <img src={slide.image} alt="" />
              </div>
            ))}
          </div>
          <div className="hero-overlay" />
          <div className="hero-grid-pattern" />

          <div className="hero-content container">
            <div className="hero-copy">
              <div className="hero-eyebrow">
                <Sparkles size={16} />
                {heroContent.eyebrow}
              </div>
              <h1>{heroContent.title}</h1>
              <p className="hero-description">{heroContent.description}</p>

              <div className="hero-trust-list">
                <div>
                  <Wrench />
                  <span>
                    Skilled
                    <br />
                    Technicians
                  </span>
                </div>
                <div>
                  <ShieldCheck />
                  <span>
                    Quality
                    <br />
                    Service
                  </span>
                </div>
                <div>
                  <PackageCheck />
                  <span>
                    Genuine
                    <br />
                    Parts
                  </span>
                </div>
                <div>
                  <ThumbsUp />
                  <span>
                    Customer
                    <br />
                    Focused
                  </span>
                </div>
              </div>

              <div className="hero-buttons">
                <button
                  className="button button-primary button-large"
                  onClick={() => scrollTo("#services")}
                >
                  <Wrench size={18} />
                  Explore Services
                </button>
                <button
                  className="button button-glass button-large"
                  onClick={() => scrollTo("#shop")}
                >
                  <ShoppingBag size={18} />
                  Explore Shop
                </button>
              </div>
            </div>

            <div className="hero-slider-controls">
              <div className="hero-arrow-buttons">
                <button
                  onClick={() =>
                    setHeroSlide(
                      (heroSlide - 1 + heroSlides.length) % heroSlides.length,
                    )
                  }
                  aria-label="Previous hero image"
                >
                  <ArrowLeft size={18} />
                </button>
                <button
                  onClick={() =>
                    setHeroSlide((heroSlide + 1) % heroSlides.length)
                  }
                  aria-label="Next hero image"
                >
                  <ArrowRight size={18} />
                </button>
              </div>

              <div className="hero-dots">
                {heroSlides.map((slide, index) => (
                  <button
                    key={slide.id}
                    className={index === heroSlide ? "is-active" : ""}
                    onClick={() => setHeroSlide(index)}
                    aria-label={`Show hero image ${index + 1}`}
                  />
                ))}
              </div>

              <div className="hero-slide-count">
                <strong>{String(heroSlide + 1).padStart(2, "0")}</strong>
                <span>/ {String(heroSlides.length).padStart(2, "0")}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section services-section" id="services">
          <div className="container">
            <SectionHeading eyebrow="Our Services" title="What We Offer" />
            <div
              className={`service-grid ${showAllServices ? "is-expanded" : ""}`}
            >
              {visibleServices.map((service, index) => {
                const isAdditionalService = index >= 5;

                return (
                  <article
                    className={`service-card ${
                      isAdditionalService ? "is-additional" : ""
                    }`}
                    style={
                      isAdditionalService
                        ? { animationDelay: `${(index - 5) * 70}ms` }
                        : undefined
                    }
                    key={service.id}
                  >
                    <div className="service-image-wrap">
                      <img
                        src={service.image}
                        alt={service.title}
                        loading={isAdditionalService ? "lazy" : "eager"}
                      />
                    </div>
                    <div className="service-card-body">
                      <h3>{service.title}</h3>
                      <p>{service.description}</p>
                    </div>
                  </article>
                );
              })}
            </div>
            <button
              className="button button-outline section-cta services-toggle-button"
              aria-expanded={showAllServices}
              onClick={() => {
                setShowAllServices((currentValue) => {
                  const nextValue = !currentValue;

                  if (!nextValue) {
                    window.setTimeout(() => scrollTo("#services"), 80);
                  }

                  return nextValue;
                });
              }}
            >
              {showAllServices ? "Show Fewer Services" : "View All Services"}
              <ChevronRight
                className={showAllServices ? "is-open" : ""}
                size={16}
              />
            </button>
          </div>
        </section>

        <section className="why-section" id="about">
          <div className="container why-layout">
            <div className="why-copy">
              <p className="section-eyebrow align-left">Why Choose Us</p>
              <h2>
                We Ensure the Best
                <br />
                Service Experience
              </h2>
              <p>
                At DriveCare, customer satisfaction is our top priority. We
                combine expertise, technology and genuine parts to keep your
                vehicle in the best condition.
              </p>
            </div>
            <div className="benefit-list">
              {[
                "Experienced & Certified Technicians",
                "Genuine Parts & Quality Oils",
                "Transparent Pricing",
                "On-time Delivery",
                "Customer Satisfaction Guarantee",
              ].map((item) => (
                <div key={item}>
                  <CircleCheck size={18} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="stat-panel">
              <AnimatedStat
                icon={ClipboardCheck}
                target={15}
                suffix="+"
                label="Years of Experience"
              />
              <AnimatedStat
                icon={UserRound}
                target={25}
                suffix="K+"
                label="Happy Customers"
              />
              <AnimatedStat
                icon={Wrench}
                target={40}
                suffix="+"
                label="Expert Technicians"
              />
              <AnimatedStat
                icon={ShieldCheck}
                target={98}
                suffix="%"
                label="Satisfaction Rate"
              />
            </div>
          </div>
        </section>

        <section className="section products-section" id="shop">
          <div className="container">
            <div className="product-heading-row">
              <SectionHeading
                eyebrow="Shop Top Products"
                title="Oils, Fluids & More"
              />
              <button
                className="view-products"
                onClick={() => showNotice("Full product catalogue opened")}
              >
                View All Products <ArrowRight size={16} />
              </button>
            </div>
            <div className="product-scroller">
              {products.map((product) => (
                <article className="product-card" key={product.id}>
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <h3>{product.name}</h3>
                  <div className="rating">
                    <span>★★★★★</span>
                    <small>({product.reviews})</small>
                  </div>
                  <div className="price-row">
                    <strong>{formatLKR(product.price)}</strong>
                    <del>{formatLKR(product.oldPrice)}</del>
                  </div>
                  <div className="product-actions">
                    <button
                      className="button button-outline"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="button button-primary"
                      onClick={() => {
                        addToCart(product);
                        setCartOpen(true);
                      }}
                    >
                      Buy Now
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="offers-section" id="offers">
          <div className="container offer-banner">
            <div className="offer-intro">
              <div className="offer-icon">
                <Tag />
              </div>
              <div>
                <p>Special Offers</p>
                <h2>Big Savings on Service & Products!</h2>
                <span>
                  Limited time offers on services and top-quality products.
                </span>
                <button
                  className="button button-light"
                  onClick={() => showNotice("Offer codes copied")}
                >
                  View All Offers
                </button>
              </div>
            </div>
            <OfferItem
              icon={Car}
              value="20% OFF"
              label="On Brake Service"
              code="BRAKE20"
            />
            <OfferItem
              icon={AirVent}
              value="15% OFF"
              label="On AC Service"
              code="AC15"
            />
            <OfferItem
              icon={Wrench}
              value="10% OFF"
              label="On All Fluids"
              code="FLUID10"
            />
          </div>
        </section>

        <section className="section process-section">
          <div className="container">
            <SectionHeading
              eyebrow="Our Process"
              title="Simple Steps to Great Service"
            />
            <div className="process-grid">
              {processSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <article className="process-card" key={step.title}>
                    <span className="step-icon">
                      <Icon />
                    </span>
                    <div className="step-copy">
                      <p>
                        <span>{index + 1}</span>
                        {step.title}
                      </p>
                      <small>{step.description}</small>
                    </div>
                    {index < processSteps.length - 1 && (
                      <ChevronRight className="step-arrow" />
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section testimonial-section">
          <div className="container">
            <SectionHeading
              eyebrow="Customer Reviews"
              title="What Our Customers Say"
            />
            <p className="review-section-intro">
              Read genuine feedback from customers who trusted us with their
              vehicles.
            </p>

            <div className="normal-review-stage">
              <button
                className="normal-review-arrow normal-review-arrow-left"
                onClick={() =>
                  setTestimonialPage(
                    (testimonialPage - 1 + testimonials.length) %
                      testimonials.length,
                  )
                }
                aria-label="Previous customer review"
              >
                <ArrowLeft size={19} />
              </button>

              <div className="normal-review-grid">
                {testimonials.map((item, index) => (
                  <article
                    className={`normal-review-card ${
                      index === testimonialPage ? "is-active" : ""
                    }`}
                    key={item.name}
                  >
                    <div className="normal-review-top">
                      <div className="normal-review-stars">★★★★★</div>
                      <span className="normal-review-quote-icon">
                        <Quote size={23} />
                      </span>
                    </div>

                    <p>{item.quote}</p>

                    <div className="normal-review-author">
                      <img src={item.image} alt={item.name} />
                      <div>
                        <strong>{item.name}</strong>
                        <span>{item.city}</span>
                      </div>
                      <BadgeCheck size={19} aria-label="Verified customer" />
                    </div>
                  </article>
                ))}
              </div>

              <button
                className="normal-review-arrow normal-review-arrow-right"
                onClick={() =>
                  setTestimonialPage(
                    (testimonialPage + 1) % testimonials.length,
                  )
                }
                aria-label="Next customer review"
              >
                <ArrowRight size={19} />
              </button>
            </div>

            <div className="normal-review-dots">
              {testimonials.map((item, index) => (
                <button
                  key={item.name}
                  className={index === testimonialPage ? "is-active" : ""}
                  onClick={() => setTestimonialPage(index)}
                  aria-label={`Show review ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer" id="contact">
        <div className="container footer-grid">
          <div className="footer-brand">
            <img src="/assets/logo.png" alt="Asian Auto Clean Park" />
            <p>
              Professional vehicle servicing, repairs, washing and detailing
              for drivers in Dehiwala-Mount Lavinia.
            </p>
            <span>Follow Us</span>
            <div className="social-row">
              <a href="#facebook" aria-label="Facebook">
                <Globe />
              </a>
              <a href="#instagram" aria-label="Instagram">
                <Camera />
              </a>
              <a href="#youtube" aria-label="YouTube">
                <Play />
              </a>
              <a href="#twitter" aria-label="Social media">
                <Send />
              </a>
            </div>
          </div>

          <FooterLinks
            title="Quick Links"
            links={[
              "Home",
              "Services",
              "Shop",
              "About Us",
              "Offers",
              "Contact Us",
            ]}
          />

          <FooterLinks
            title="Shop Categories"
            links={[
              "Engine Oils",
              "Lubricants",
              "Fluids & Coolants",
              "Filters",
              "Batteries",
              "Accessories",
            ]}
          />

          <div className="footer-column contact-column">
            <h3>Asian Auto Clean Park</h3>
            <p>
              <MapPin />
              <span>
                No. 117, Kadawatha Road,
                <br />
                Dehiwala-Mount Lavinia 10350, Sri Lanka
              </span>
            </p>
            <p>
              <Phone />
              <a href="tel:+94773460822">+94 77 346 0822</a>
            </p>
            <p>
              <Clock3 />
              <span>Please call for current opening hours.</span>
            </p>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>© 2026 Asian Auto Clean Park. All Rights Reserved.</span>
          <div>
            <a href="#privacy">Privacy Policy</a>
            <span />
            <a href="#terms">Terms & Conditions</a>
          </div>
        </div>
      </footer>

      <div
        className={`cart-drawer-backdrop ${cartOpen ? "is-open" : ""}`}
        onClick={() => setCartOpen(false)}
      />
      <aside className={`cart-drawer ${cartOpen ? "is-open" : ""}`}>
        <div className="cart-header">
          <div>
            <ShoppingCart />
            <h2>Your Cart</h2>
          </div>
          <button onClick={() => setCartOpen(false)}>
            <X />
          </button>
        </div>
        {cart.length === 0 ? (
          <div className="empty-cart">
            <ShoppingBag />
            <h3>Your cart is empty</h3>
            <p>Add a product from the shop section.</p>
            <button
              className="button button-primary"
              onClick={() => {
                setCartOpen(false);
                scrollTo("#shop");
              }}
            >
              Browse Products
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div className="cart-item-copy">
                    <h3>{item.name}</h3>
                    <strong>{formatLKR(item.price)}</strong>
                    <div className="quantity-control">
                      <button onClick={() => updateQuantity(item.id, -1)}>
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)}>
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <div>
                <span>Subtotal</span>
                <strong>{formatLKR(cartTotal)}</strong>
              </div>
              <button
                className="button button-primary"
                onClick={() =>
                  showNotice("Checkout is ready")
                }
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </aside>

      <BookingModal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        services={services}
      />

      {notice && (
        <div className="toast">
          <CircleCheck />
          {notice}
        </div>
      )}
    </div>
  );
}

function SectionHeading({ eyebrow, title }) {
  return (
    <div className="section-heading">
      <p className="section-eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
    </div>
  );
}
function AnimatedStat({
  icon: Icon,
  target,
  suffix = "",
  label,
  duration = 1700,
}) {
  const [value, setValue] = useState(0);
  const statRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = statRef.current;
    if (!element) return undefined;

    let animationFrame;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;

        hasAnimated.current = true;
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
          const progress = Math.min((currentTime - startTime) / duration, 1);
          const easedProgress = 1 - Math.pow(1 - progress, 3);
          setValue(Math.round(target * easedProgress));

          if (progress < 1) {
            animationFrame = requestAnimationFrame(updateCounter);
          }
        };

        animationFrame = requestAnimationFrame(updateCounter);
        observer.disconnect();
      },
      { threshold: 0.4 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [duration, target]);

  return (
    <div className="stat-item" ref={statRef}>
      <span>
        <Icon />
      </span>
      <div>
        <strong>
          {value}
          {suffix}
        </strong>
        <p>{label}</p>
      </div>
    </div>
  );
}
function OfferItem({ icon: Icon, value, label, code }) {
  return (
    <div className="offer-item">
      <span>
        <Icon />
      </span>
      <div>
        <strong>{value}</strong>
        <p>{label}</p>
        <small>Use Code: {code}</small>
      </div>
    </div>
  );
}
function FooterLinks({ title, links }) {
  return (
    <div className="footer-column">
      <h3>{title}</h3>
      {links.map((link) => (
        <a href={`#${link.toLowerCase().replaceAll(" ", "-")}`} key={link}>
          {link}
        </a>
      ))}
    </div>
  );
}

const BOOKING_TIME_SLOTS = [
  { value: "08:00", label: "8:00 AM" },
  { value: "09:00", label: "9:00 AM" },
  { value: "10:00", label: "10:00 AM" },
  { value: "11:00", label: "11:00 AM" },
  { value: "12:00", label: "12:00 PM" },
  { value: "13:00", label: "1:00 PM" },
  { value: "14:00", label: "2:00 PM" },
  { value: "15:00", label: "3:00 PM" },
  { value: "16:00", label: "4:00 PM" },
  { value: "17:00", label: "5:00 PM" },
];

const EMPTY_BOOKING_FORM = {
  serviceId: "",
  name: "",
  email: "",
  contactNumber: "",
  address: "",
  bookingDate: "",
  timeSlot: "",
  paymentMethod: "",
  cardholderName: "",
  cardNumber: "",
  expiry: "",
  cvv: "",
  bankSlip: null,
};

function toLocalDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatBookingDate(dateKey) {
  if (!dateKey) return "Not selected";
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${dateKey}T12:00:00`));
}

function formatTimeSlot(value) {
  return BOOKING_TIME_SLOTS.find((slot) => slot.value === value)?.label || value;
}

function formatServicePrice(value) {
  const amount = Number(value || 0);
  return `Rs. ${new Intl.NumberFormat("en-US").format(amount)}`;
}

function BookingModal({ open, onClose, services }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(EMPTY_BOOKING_FORM);
  const [errors, setErrors] = useState({});
  const [now, setNow] = useState(new Date());
  const [calendarMonth, setCalendarMonth] = useState(
    () => new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  );
  const [bookings, setBookings] = useState([]);
  const [success, setSuccess] = useState(false);
  const [bookingReference, setBookingReference] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [serviceMenuOpen, setServiceMenuOpen] = useState(false);
  const serviceSelectRef = useRef(null);

  const bookingServices = useMemo(
    () => [
      {
        id: "full-vehicle-service",
        title: "Full Vehicle Service",
        description:
          "Complete scheduled maintenance, inspection and essential servicing.",
        price: 25000,
      },
      ...services,
    ],
    [services],
  );

  const selectedService = bookingServices.find(
    (service) => String(service.id) === String(form.serviceId),
  );

  useEffect(() => {
    if (!open) return undefined;

    setStep(1);
    setForm(EMPTY_BOOKING_FORM);
    setErrors({});
    setSuccess(false);
    setSubmitting(false);
    setBookingReference("");
    setServiceMenuOpen(false);
    const current = new Date();
    setNow(current);
    setCalendarMonth(new Date(current.getFullYear(), current.getMonth(), 1));

    try {
      const stored = JSON.parse(
        window.localStorage.getItem("aacp_service_bookings") || "[]",
      );
      setBookings(Array.isArray(stored) ? stored : []);
    } catch {
      setBookings([]);
    }

    return undefined;
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !submitting) onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose, submitting]);

  useEffect(() => {
    if (!open) return undefined;
    const timer = window.setInterval(() => setNow(new Date()), 30000);
    return () => window.clearInterval(timer);
  }, [open]);

  useEffect(() => {
    if (!serviceMenuOpen) return undefined;

    const handlePointerDown = (event) => {
      if (!serviceSelectRef.current?.contains(event.target)) {
        setServiceMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [serviceMenuOpen]);

  const calendarDays = useMemo(() => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const gridStart = new Date(year, month, 1 - firstDay.getDay());

    return Array.from({ length: 42 }, (_, index) => {
      const date = new Date(gridStart);
      date.setDate(gridStart.getDate() + index);
      return date;
    });
  }, [calendarMonth]);

  const combinedBookings = useMemo(() => {
    const liveSlots =
      typeof window !== "undefined" &&
      Array.isArray(window.__AACP_BOOKED_SLOTS__)
        ? window.__AACP_BOOKED_SLOTS__
        : [];
    return [...bookings, ...liveSlots];
  }, [bookings, now]);

  if (!open) return null;

  const todayKey = toLocalDateKey(now);
  const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const canGoToPreviousMonth = calendarMonth > currentMonthStart;

  const getSlotState = (dateKey, timeValue) => {
    if (!dateKey) return "waiting";
    if (dateKey < todayKey) return "booked";

    const slotDate = new Date(`${dateKey}T${timeValue}:00`);
    if (slotDate.getTime() <= now.getTime() + 30 * 60 * 1000) {
      return "booked";
    }

    const isBooked = combinedBookings.some(
      (booking) =>
        booking.bookingDate === dateKey &&
        booking.timeSlot === timeValue &&
        booking.status !== "cancelled" &&
        booking.status !== "rejected",
    );

    return isBooked ? "booked" : "available";
  };

  const isSlotUnavailable = (dateKey, timeValue) =>
    getSlotState(dateKey, timeValue) !== "available";

  const isDayUnavailable = (dateKey) =>
    dateKey < todayKey ||
    BOOKING_TIME_SLOTS.every((slot) =>
      isSlotUnavailable(dateKey, slot.value),
    );

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  };

  const validateStepOne = () => {
    const nextErrors = {};
    if (!form.serviceId) nextErrors.serviceId = "Please select a service.";
    if (!form.name.trim()) nextErrors.name = "Name is required.";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim()))
      nextErrors.email = "Enter a valid email address.";
    const contactDigits = form.contactNumber.replace(/\D/g, "");
    if (contactDigits.length < 9 || contactDigits.length > 15)
      nextErrors.contactNumber = "Enter a valid contact number.";
    if (!form.address.trim()) nextErrors.address = "Address is required.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validateStepTwo = () => {
    const nextErrors = {};
    if (!form.bookingDate) nextErrors.bookingDate = "Select a booking date.";
    if (!form.timeSlot) nextErrors.timeSlot = "Select an available time slot.";
    if (
      form.bookingDate &&
      form.timeSlot &&
      isSlotUnavailable(form.bookingDate, form.timeSlot)
    ) {
      nextErrors.timeSlot = "This time slot is no longer available.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const isValidExpiry = (value) => {
    if (!/^\d{2}\/\d{2}$/.test(value)) return false;
    const [month, year] = value.split("/").map(Number);
    if (month < 1 || month > 12) return false;
    const fullYear = 2000 + year;
    const expiryDate = new Date(fullYear, month, 0, 23, 59, 59);
    return expiryDate >= now;
  };

  const validateStepThree = () => {
    const nextErrors = {};
    if (!form.paymentMethod)
      nextErrors.paymentMethod = "Choose a payment option.";

    if (form.paymentMethod === "card") {
      const cardDigits = form.cardNumber.replace(/\D/g, "");
      if (!form.cardholderName.trim())
        nextErrors.cardholderName = "Cardholder name is required.";
      if (cardDigits.length < 13 || cardDigits.length > 19)
        nextErrors.cardNumber = "Enter a valid card number.";
      if (!isValidExpiry(form.expiry))
        nextErrors.expiry = "Enter a valid future expiry date.";
      if (!/^\d{3,4}$/.test(form.cvv))
        nextErrors.cvv = "Enter a valid CVV.";
    }

    if (form.paymentMethod === "bank" && !form.bankSlip) {
      nextErrors.bankSlip = "Upload the bank transfer receipt.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const goNext = () => {
    if (step === 1 && !validateStepOne()) return;
    if (step === 2 && !validateStepTwo()) return;
    setStep((current) => Math.min(current + 1, 3));
  };

  const handleBankSlip = (file) => {
    if (!file) return;
    const allowedTypes = [
      "application/pdf",
      "image/png",
      "image/jpeg",
      "image/jpg",
    ];
    if (!allowedTypes.includes(file.type)) {
      setErrors((current) => ({
        ...current,
        bankSlip: "Upload a PDF, PNG, JPG or JPEG file.",
      }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors((current) => ({
        ...current,
        bankSlip: "The receipt must be smaller than 5 MB.",
      }));
      return;
    }
    updateField("bankSlip", file);
  };

  const submitBooking = () => {
    if (!validateStepThree()) return;
    setSubmitting(true);

    window.setTimeout(() => {
      const reference = `AACP-${Date.now().toString().slice(-8)}`;
      const cardDigits = form.cardNumber.replace(/\D/g, "");
      const safeBooking = {
        id: reference,
        serviceId: form.serviceId,
        service: selectedService?.title || "Vehicle Service",
        servicePrice: selectedService?.price || 0,
        name: form.name.trim(),
        email: form.email.trim(),
        contactNumber: form.contactNumber.trim(),
        address: form.address.trim(),
        bookingDate: form.bookingDate,
        timeSlot: form.timeSlot,
        paymentMethod: form.paymentMethod,
        paymentReference:
          form.paymentMethod === "card"
            ? `Card ending ${cardDigits.slice(-4)}`
            : form.bankSlip?.name || "Bank transfer receipt",
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      const updatedBookings = [...bookings, safeBooking];
      setBookings(updatedBookings);
      try {
        window.localStorage.setItem(
          "aacp_service_bookings",
          JSON.stringify(updatedBookings),
        );
      } catch {
      }

      setBookingReference(reference);
      setSubmitting(false);
      setSuccess(true);
    }, 850);
  };

  const selectDate = (date) => {
    const dateKey = toLocalDateKey(date);
    if (isDayUnavailable(dateKey)) return;
    updateField("bookingDate", dateKey);
    updateField("timeSlot", "");
  };

  const formatCardNumber = (value) =>
    value
      .replace(/\D/g, "")
      .slice(0, 19)
      .replace(/(.{4})/g, "$1 ")
      .trim();

  const formatExpiry = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    return digits.length > 2
      ? `${digits.slice(0, 2)}/${digits.slice(2)}`
      : digits;
  };

  const closeModal = () => {
    if (!submitting) onClose();
  };

  return (
    <div
      className="appointment-modal-backdrop is-open"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeModal();
      }}
      role="presentation"
    >
      <section
        className="appointment-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="appointment-modal-title"
      >
        <div className="appointment-modal-accent" />
        <header className="appointment-modal-header">
          <div>
            <span className="appointment-modal-kicker">
              <CalendarDays size={15} /> Online Service Booking
            </span>
            <h2 id="appointment-modal-title">
              {success ? "Appointment Submitted" : "Book an Appointment"}
            </h2>
            <p>
              {success
                ? "Your booking is waiting for administrator approval."
                : "Complete the three steps to reserve your service time."}
            </p>
          </div>
          <button
            className="appointment-modal-close"
            onClick={closeModal}
            aria-label="Close appointment popup"
          >
            <X size={20} />
          </button>
        </header>

        {!success && (
          <div className="appointment-progress" aria-label="Booking progress">
            {[
              [1, "Your Details"],
              [2, "Date & Time"],
              [3, "Payment"],
            ].map(([number, label]) => (
              <div
                className={`appointment-progress-step ${
                  step === number ? "is-current" : ""
                } ${step > number ? "is-complete" : ""}`}
                key={number}
              >
                <span>{step > number ? <Check size={15} /> : number}</span>
                <small>{label}</small>
              </div>
            ))}
          </div>
        )}

        <div className="appointment-modal-scroll">
          {success ? (
            <div className="appointment-success">
              <div className="appointment-success-icon">
                <CheckCircle2 size={42} />
              </div>
              <span className="appointment-status-badge">Status: Pending</span>
              <h3>Your booking was submitted successfully.</h3>
              <p>
                The administrator will verify your payment and approve the
                service appointment. You will be contacted after review.
              </p>

              <div className="appointment-success-summary">
                <div>
                  <span>Booking Reference</span>
                  <strong>{bookingReference}</strong>
                </div>
                <div>
                  <span>Customer</span>
                  <strong>{form.name}</strong>
                </div>
                <div>
                  <span>Service</span>
                  <strong>
                    {selectedService?.title} · {formatServicePrice(selectedService?.price)}
                  </strong>
                </div>
                <div>
                  <span>Date & Time</span>
                  <strong>
                    {formatBookingDate(form.bookingDate)} · {formatTimeSlot(form.timeSlot)}
                  </strong>
                </div>
              </div>

              <button
                className="button button-primary appointment-success-button"
                onClick={closeModal}
              >
                Done
              </button>
            </div>
          ) : (
            <div className="appointment-step-panel" key={step}>
              {step === 1 && (
                <div className="appointment-form-section">
                  <div className="appointment-form-grid">
                    <AppointmentField
                      label="Select Service"
                      error={errors.serviceId}
                      fullWidth
                      asDiv
                    >
                      <div
                        className={`appointment-service-select ${
                          serviceMenuOpen ? "is-open" : ""
                        }`}
                        ref={serviceSelectRef}
                      >
                        <button
                          type="button"
                          className="appointment-service-select-trigger"
                          aria-haspopup="listbox"
                          aria-expanded={serviceMenuOpen}
                          onClick={() => setServiceMenuOpen((current) => !current)}
                        >
                          <div>
                            <small>
                              {selectedService
                                ? "Selected vehicle service"
                                : "Choose a vehicle service"}
                            </small>
                            <strong>
                              {selectedService?.title || "Select a service"}
                            </strong>
                          </div>
                          {selectedService && (
                            <span className="appointment-service-trigger-price">
                              {formatServicePrice(selectedService.price)}
                            </span>
                          )}
                          <ChevronDown
                            className="appointment-service-select-arrow"
                            size={19}
                          />
                        </button>

                        {serviceMenuOpen && (
                          <div
                            className="appointment-service-select-menu"
                            role="listbox"
                            aria-label="Vehicle services"
                          >
                            {bookingServices.map((service) => {
                              const isSelected =
                                String(service.id) === String(form.serviceId);

                              return (
                                <button
                                  type="button"
                                  role="option"
                                  aria-selected={isSelected}
                                  className={isSelected ? "is-selected" : ""}
                                  key={service.id}
                                  onClick={() => {
                                    updateField("serviceId", String(service.id));
                                    setServiceMenuOpen(false);
                                  }}
                                >
                                  <div>
                                    <strong>{service.title}</strong>
                                    <small>
                                      {service.description ||
                                        "Professional vehicle service and maintenance."}
                                    </small>
                                  </div>
                                  <span>{formatServicePrice(service.price)}</span>
                                  {isSelected && <Check size={16} />}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </AppointmentField>

                    <AppointmentField label="Name" error={errors.name}>
                      <div className="appointment-input-icon">
                        <User size={17} />
                        <input
                          value={form.name}
                          onChange={(event) =>
                            updateField("name", event.target.value)
                          }
                          placeholder="Enter your name"
                          autoComplete="name"
                        />
                      </div>
                    </AppointmentField>

                    <AppointmentField label="Email" error={errors.email}>
                      <div className="appointment-input-icon">
                        <Mail size={17} />
                        <input
                          type="email"
                          value={form.email}
                          onChange={(event) =>
                            updateField("email", event.target.value)
                          }
                          placeholder="Enter your email"
                          autoComplete="email"
                        />
                      </div>
                    </AppointmentField>

                    <AppointmentField
                      label="Contact Number"
                      error={errors.contactNumber}
                    >
                      <div className="appointment-input-icon">
                        <Phone size={17} />
                        <input
                          value={form.contactNumber}
                          onChange={(event) =>
                            updateField("contactNumber", event.target.value)
                          }
                          placeholder="Enter your contact number"
                          autoComplete="tel"
                        />
                      </div>
                    </AppointmentField>

                    <AppointmentField
                      label="Address"
                      error={errors.address}
                      fullWidth
                    >
                      <div className="appointment-input-icon appointment-textarea-icon">
                        <MapPin size={17} />
                        <textarea
                          value={form.address}
                          onChange={(event) =>
                            updateField("address", event.target.value)
                          }
                          placeholder="Enter your address"
                          rows={3}
                          autoComplete="street-address"
                        />
                      </div>
                    </AppointmentField>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="appointment-schedule-layout">
                  <div className="appointment-calendar-card">
                    <div className="appointment-calendar-header">
                      <button
                        onClick={() =>
                          canGoToPreviousMonth &&
                          setCalendarMonth(
                            new Date(
                              calendarMonth.getFullYear(),
                              calendarMonth.getMonth() - 1,
                              1,
                            ),
                          )
                        }
                        disabled={!canGoToPreviousMonth}
                        aria-label="Previous month"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <div>
                        <strong>
                          {new Intl.DateTimeFormat("en-US", {
                            month: "long",
                            year: "numeric",
                          }).format(calendarMonth)}
                        </strong>
                        <span><span className="live-calendar-dot" /> Live availability</span>
                      </div>
                      <button
                        onClick={() =>
                          setCalendarMonth(
                            new Date(
                              calendarMonth.getFullYear(),
                              calendarMonth.getMonth() + 1,
                              1,
                            ),
                          )
                        }
                        aria-label="Next month"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>

                    <div className="appointment-calendar-weekdays">
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                        (day) => <span key={day}>{day}</span>,
                      )}
                    </div>

                    <div className="appointment-calendar-grid">
                      {calendarDays.map((date) => {
                        const dateKey = toLocalDateKey(date);
                        const isOutsideMonth =
                          date.getMonth() !== calendarMonth.getMonth();
                        const isDisabled = isDayUnavailable(dateKey);
                        const isSelected = form.bookingDate === dateKey;
                        const isToday = dateKey === todayKey;

                        return (
                          <button
                            type="button"
                            key={dateKey}
                            className={`${isOutsideMonth ? "is-outside" : ""} ${
                              isDisabled ? "is-disabled" : ""
                            } ${isSelected ? "is-selected" : ""} ${
                              isToday ? "is-today" : ""
                            }`}
                            onClick={() => selectDate(date)}
                            disabled={isDisabled}
                            aria-label={formatBookingDate(dateKey)}
                          >
                            <span>{date.getDate()}</span>
                            {isToday && <small>Today</small>}
                          </button>
                        );
                      })}
                    </div>
                    {errors.bookingDate && (
                      <p className="appointment-field-error calendar-error">
                        <AlertCircle size={14} /> {errors.bookingDate}
                      </p>
                    )}
                  </div>

                  <div className="appointment-time-card">
                    <div className="appointment-step-heading compact">
                      <span><Clock3 size={19} /></span>
                      <div>
                        <h3>Select a time slot</h3>
                        <p>
                          {form.bookingDate
                            ? formatBookingDate(form.bookingDate)
                            : "Choose a date from the calendar first."}
                        </p>
                      </div>
                    </div>

                    <div className="appointment-time-grid">
                      {BOOKING_TIME_SLOTS.map((slot) => {
                        const slotState = getSlotState(
                          form.bookingDate,
                          slot.value,
                        );
                        const unavailable = slotState !== "available";
                        const isSelected = form.timeSlot === slot.value;

                        return (
                          <button
                            type="button"
                            key={slot.value}
                            disabled={unavailable}
                            className={`${isSelected ? "is-selected" : ""} ${
                              slotState === "booked" ? "is-booked" : ""
                            } ${slotState === "waiting" ? "is-waiting" : ""}`}
                            onClick={() => updateField("timeSlot", slot.value)}
                          >
                            <Clock3 size={15} />
                            <span>{slot.label}</span>
                            <small>
                              {slotState === "waiting"
                                ? "Select date"
                                : slotState === "booked"
                                  ? "Booked"
                                  : "Available"}
                            </small>
                          </button>
                        );
                      })}
                    </div>
                    {errors.timeSlot && (
                      <p className="appointment-field-error">
                        <AlertCircle size={14} /> {errors.timeSlot}
                      </p>
                    )}

                    <div className="appointment-live-note">
                      <CalendarDays size={17} />
                      Past dates and elapsed time slots are disabled automatically.
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="appointment-payment-layout">
                  <div className="appointment-payment-panel">
                    <div className="appointment-step-heading">
                      <span><CreditCard size={19} /></span>
                      <div>
                        <h3>Choose your payment option</h3>
                        <p>Payment information is required to submit the booking.</p>
                      </div>
                    </div>

                    <div className="appointment-payment-amount">
                      <div>
                        <small>Amount to Pay</small>
                        <strong>
                          {selectedService
                            ? formatServicePrice(selectedService.price)
                            : "Rs. 0"}
                        </strong>
                      </div>
                      <span>{selectedService?.title || "Vehicle Service"}</span>
                    </div>

                    <div className="appointment-payment-options">
                      <button
                        type="button"
                        className={form.paymentMethod === "card" ? "is-selected" : ""}
                        onClick={() => updateField("paymentMethod", "card")}
                      >
                        <span><CreditCard size={21} /></span>
                        <div>
                          <strong>Card Payment</strong>
                          <small>Visa or Mastercard</small>
                        </div>
                        <i>{form.paymentMethod === "card" && <Check size={15} />}</i>
                      </button>
                      <button
                        type="button"
                        className={form.paymentMethod === "bank" ? "is-selected" : ""}
                        onClick={() => updateField("paymentMethod", "bank")}
                      >
                        <span><Banknote size={21} /></span>
                        <div>
                          <strong>Bank Transfer</strong>
                          <small>Upload your payment receipt</small>
                        </div>
                        <i>{form.paymentMethod === "bank" && <Check size={15} />}</i>
                      </button>
                    </div>
                    {errors.paymentMethod && (
                      <p className="appointment-field-error">
                        <AlertCircle size={14} /> {errors.paymentMethod}
                      </p>
                    )}

                    {form.paymentMethod === "card" && (
                      <div className="appointment-card-form">
                        <AppointmentField
                          label="Cardholder Name"
                          error={errors.cardholderName}
                          fullWidth
                        >
                          <input
                            value={form.cardholderName}
                            onChange={(event) =>
                              updateField("cardholderName", event.target.value)
                            }
                            placeholder="Name shown on the card"
                            autoComplete="cc-name"
                          />
                        </AppointmentField>
                        <AppointmentField
                          label="Card Number"
                          error={errors.cardNumber}
                          fullWidth
                        >
                          <div className="appointment-input-icon">
                            <CreditCard size={17} />
                            <input
                              value={form.cardNumber}
                              onChange={(event) =>
                                updateField(
                                  "cardNumber",
                                  formatCardNumber(event.target.value),
                                )
                              }
                              placeholder="0000 0000 0000 0000"
                              inputMode="numeric"
                              autoComplete="cc-number"
                            />
                          </div>
                        </AppointmentField>
                        <AppointmentField label="Expiry" error={errors.expiry}>
                          <input
                            value={form.expiry}
                            onChange={(event) =>
                              updateField("expiry", formatExpiry(event.target.value))
                            }
                            placeholder="MM/YY"
                            inputMode="numeric"
                            autoComplete="cc-exp"
                          />
                        </AppointmentField>
                        <AppointmentField label="CVV" error={errors.cvv}>
                          <div className="appointment-input-icon">
                            <LockKeyhole size={16} />
                            <input
                              type="password"
                              value={form.cvv}
                              onChange={(event) =>
                                updateField(
                                  "cvv",
                                  event.target.value.replace(/\D/g, "").slice(0, 4),
                                )
                              }
                              placeholder="CVV"
                              inputMode="numeric"
                              autoComplete="cc-csc"
                            />
                          </div>
                        </AppointmentField>
                        <p className="appointment-security-note">
                          <ShieldCheck size={16} /> Connect this form to your secure
                          payment gateway before accepting real card payments.
                        </p>
                      </div>
                    )}

                    {form.paymentMethod === "bank" && (
                      <div className="appointment-bank-panel">
                        <div className="appointment-bank-instruction">
                          <Banknote size={21} />
                          <div>
                            <strong>Bank transfer receipt</strong>
                            <p>
                              Complete the transfer using the official bank details
                              provided by Asian Auto Clean Park, then upload the receipt.
                            </p>
                          </div>
                        </div>

                        <label className={`appointment-upload-box ${form.bankSlip ? "has-file" : ""}`}>
                          <input
                            type="file"
                            accept=".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg"
                            onChange={(event) =>
                              handleBankSlip(event.target.files?.[0])
                            }
                          />
                          {form.bankSlip ? (
                            <>
                              <FileText size={28} />
                              <strong>{form.bankSlip.name}</strong>
                              <small>
                                {(form.bankSlip.size / 1024 / 1024).toFixed(2)} MB · Click to replace
                              </small>
                            </>
                          ) : (
                            <>
                              <UploadCloud size={30} />
                              <strong>Upload bank transfer receipt</strong>
                              <small>PDF, PNG, JPG or JPEG · Maximum 5 MB</small>
                            </>
                          )}
                        </label>
                        {errors.bankSlip && (
                          <p className="appointment-field-error">
                            <AlertCircle size={14} /> {errors.bankSlip}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <aside className="appointment-booking-summary">
                    <span className="appointment-summary-label">Booking Summary</span>
                    <h3>Review your appointment</h3>
                    <div className="appointment-summary-service">
                      <span><Wrench size={19} /></span>
                      <div>
                        <small>Selected Service</small>
                        <strong>{selectedService?.title || "Not selected"}</strong>
                        <b>
                          {selectedService
                            ? formatServicePrice(selectedService.price)
                            : "Rs. 0"}
                        </b>
                      </div>
                    </div>
                    <dl>
                      <div>
                        <dt><User size={15} /> Customer</dt>
                        <dd>{form.name || "Not provided"}</dd>
                      </div>
                      <div>
                        <dt><CalendarDays size={15} /> Date</dt>
                        <dd>{formatBookingDate(form.bookingDate)}</dd>
                      </div>
                      <div>
                        <dt><Clock3 size={15} /> Time</dt>
                        <dd>{formatTimeSlot(form.timeSlot) || "Not selected"}</dd>
                      </div>
                      <div>
                        <dt><Mail size={15} /> Email</dt>
                        <dd>{form.email || "Not provided"}</dd>
                      </div>
                      <div className="appointment-summary-total-row">
                        <dt><Banknote size={15} /> Total Payment</dt>
                        <dd>
                          {selectedService
                            ? formatServicePrice(selectedService.price)
                            : "Rs. 0"}
                        </dd>
                      </div>
                    </dl>
                    <div className="appointment-pending-note">
                      <ShieldCheck size={18} />
                      <p>
                        Your service status will remain <strong>Pending</strong> until
                        the administrator checks the payment and approves the booking.
                      </p>
                    </div>
                  </aside>
                </div>
              )}
            </div>
          )}
        </div>

        {!success && (
          <footer className="appointment-modal-footer">
            <div className="appointment-footer-note">
              {selectedService && (
                <div className="appointment-footer-service">
                  <span className="appointment-footer-service-icon">
                    <Wrench size={16} />
                  </span>
                  <span className="appointment-footer-service-copy">
                    <small>Selected service</small>
                    <strong>{selectedService.title}</strong>
                  </span>
                  <span className="appointment-footer-service-price">
                    <small>Service Price</small>
                    <strong>{formatServicePrice(selectedService.price)}</strong>
                  </span>
                </div>
              )}
            </div>
            <div className="appointment-footer-actions">
              {step > 1 && (
                <button
                  className="button appointment-back-button"
                  onClick={() => {
                    setErrors({});
                    setStep((current) => current - 1);
                  }}
                  disabled={submitting}
                >
                  <ChevronLeft size={17} /> Back
                </button>
              )}
              {step < 3 ? (
                <button className="button button-primary" onClick={goNext}>
                  Next Step <ChevronRight size={17} />
                </button>
              ) : (
                <button
                  className="button button-primary appointment-submit-button"
                  onClick={submitBooking}
                  disabled={submitting}
                >
                  {submitting ? (
                    <><span className="appointment-spinner" /> Submitting...</>
                  ) : (
                    <><CheckCircle2 size={18} /> Submit Booking</>
                  )}
                </button>
              )}
            </div>
          </footer>
        )}
      </section>
    </div>
  );
}

function AppointmentField({
  label,
  error,
  fullWidth = false,
  asDiv = false,
  children,
}) {
  const FieldTag = asDiv ? "div" : "label";

  return (
    <FieldTag className={`appointment-field ${fullWidth ? "is-full" : ""}`}>
      <span>{label} <b>*</b></span>
      {children}
      {error && (
        <small className="appointment-field-error">
          <AlertCircle size={13} /> {error}
        </small>
      )}
    </FieldTag>
  );
}

