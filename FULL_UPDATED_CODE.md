# DriveCare Full Updated Code

## package.json

```json
{
  "name": "drivecare-react-ui",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "lucide-react": "^0.468.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "vite": "^6.0.5"
  }
}

```

## src/main.jsx

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

```

## src/App.jsx

```jsx
import { useEffect, useMemo, useState } from "react";
import {
  AirVent,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Car,
  ChevronRight,
  CircleCheck,
  ClipboardCheck,
  Clock3,
  Cog,
  Gauge,
  Globe,
  Camera,
  Play,
  Send,
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
    image: "/assets/service-oil.jpg",
    icon: Wrench,
  },
  {
    id: 2,
    title: "Brake Service",
    description:
      "Ensure your safety with our expert brake inspection & repair.",
    image: "/assets/service-brakes.jpg",
    icon: CircleCheck,
  },
  {
    id: 3,
    title: "Engine Diagnostics",
    description: "Advanced scanning & diagnostics for all vehicle problems.",
    image: "/assets/service-diagnostics.jpg",
    icon: Gauge,
  },
  {
    id: 4,
    title: "AC Service",
    description: "Keep your drive cool with our AC check & regular service.",
    image: "/assets/service-ac.jpg",
    icon: AirVent,
  },
  {
    id: 5,
    title: "Wheel Alignment",
    description:
      "Precise wheel alignment for better handling & longer tyre life.",
    image: "/assets/service-alignment.jpg",
    icon: SlidersHorizontal,
  },
];

const products = [
  {
    id: 1,
    name: "Castrol EDGE 5W-30 Fully Synthetic Engine Oil 4L",
    image: "/assets/product-castrol.png",
    price: 49.99,
    oldPrice: 56.99,
    reviews: 125,
  },
  {
    id: 2,
    name: "Mobil 1 Extended Performance 5W-30 4L",
    image: "/assets/product-mobil.png",
    price: 44.99,
    oldPrice: 54.99,
    reviews: 98,
  },
  {
    id: 3,
    name: "Prestone All Vehicles Antifreeze/Coolant 3.78L",
    image: "/assets/product-prestone.png",
    price: 19.99,
    oldPrice: 24.99,
    reviews: 87,
  },
  {
    id: 4,
    name: "Brembo DOT 4 Brake Fluid 500ml",
    image: "/assets/product-brembo.png",
    price: 12.99,
    oldPrice: 16.99,
    reviews: 76,
  },
  {
    id: 5,
    name: "Bosch Premium Oil Filter 1 Pc",
    image: "/assets/product-bosch.png",
    price: 8.99,
    oldPrice: 11.99,
    reviews: 112,
  },
  {
    id: 6,
    name: "Amaron Hi-Life Car Battery SSB24L",
    image: "/assets/product-battery.png",
    price: 89.99,
    oldPrice: 109.99,
    reviews: 83,
  },
];

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
    name: "James Wilson",
    city: "New York, USA",
    image: "/assets/avatar-james.png",
    quote:
      "Excellent service and very professional staff. My car feels like new. Highly recommended!",
  },
  {
    name: "Sarah Johnson",
    city: "Los Angeles, USA",
    image: "/assets/avatar-sarah.png",
    quote:
      "Quick and reliable service. Transparent pricing and genuine parts. Great experience!",
  },
  {
    name: "Michael Brown",
    city: "Chicago, USA",
    image: "/assets/avatar-michael.png",
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

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  );
  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart],
  );
  const activeTestimonial = testimonials[testimonialPage];

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

  const submitNewsletter = (event) => {
    event.preventDefault();
    if (!event.currentTarget.email.value.trim())
      return showNotice("Enter your email address");
    showNotice("You are subscribed to DriveCare updates");
    event.currentTarget.reset();
  };

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="header-frame">
          <button
            className="brand-button"
            onClick={() => scrollTo("#home")}
            aria-label="DriveCare home"
          >
            <img
              className="brand-logo"
              src="/assets/logo.png"
              alt="DriveCare Vehicle Service Center"
            />
          </button>

          <div className="nav-zone">
            <div className="nav-status">
              <span className="status-dot" />
              Vehicle care specialists
            </div>

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
              onClick={() => {
                scrollTo("#services");
                window.setTimeout(
                  () =>
                    showNotice(
                      "Select a service to book an appointment for your vehicle",
                    ),
                  450,
                );
              }}
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
            <div className="service-grid">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <article className="service-card" key={service.id}>
                    <div className="service-image-wrap">
                      <img src={service.image} alt={service.title} />
                      <span className="service-icon">
                        <Icon size={19} />
                      </span>
                    </div>
                    <div className="service-card-body">
                      <h3>{service.title}</h3>
                      <p>{service.description}</p>
                      <button
                        onClick={() =>
                          showNotice(
                            `${service.title} details are ready to view`,
                          )
                        }
                      >
                        Learn More <ChevronRight size={15} />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
            <button
              className="button button-outline section-cta"
              onClick={() => showNotice("All available services are displayed")}
            >
              View All Services
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
              <Stat
                icon={ClipboardCheck}
                value="15+"
                label="Years of Experience"
              />
              <Stat icon={UserRound} value="25K+" label="Happy Customers" />
              <Stat icon={Wrench} value="40+" label="Expert Technicians" />
              <Stat icon={ShieldCheck} value="98%" label="Satisfaction Rate" />
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
                    <strong>${product.price.toFixed(2)}</strong>
                    <del>${product.oldPrice.toFixed(2)}</del>
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
            <div className="review-showcase">
              <div className="review-overview">
                <p className="review-kicker">Customer Stories</p>
                <h2>Service people trust, every time.</h2>
                <p className="review-overview-text">
                  Real experiences from drivers who trust DriveCare for
                  dependable service, honest guidance and quality workmanship.
                </p>
                <div className="review-score">
                  <strong>4.9</strong>
                  <div>
                    <span>★★★★★</span>
                    <small>Excellent customer rating</small>
                  </div>
                </div>
                <div className="review-line">
                  <span />
                </div>
                <p className="review-count">
                  Based on verified service feedback
                </p>
              </div>

              <div className="review-carousel-panel">
                <Quote className="review-quote-icon" />
                <div className="review-stars">★★★★★</div>
                <p className="review-featured-quote">
                  “{activeTestimonial.quote}”
                </p>

                <div className="review-author">
                  <img
                    src={activeTestimonial.image}
                    alt={activeTestimonial.name}
                  />
                  <div>
                    <strong>{activeTestimonial.name}</strong>
                    <span>{activeTestimonial.city}</span>
                  </div>
                  <BadgeCheck size={21} />
                </div>

                <div className="review-navigation">
                  <div className="review-arrow-group">
                    <button
                      onClick={() =>
                        setTestimonialPage(
                          (testimonialPage - 1 + testimonials.length) %
                            testimonials.length,
                        )
                      }
                      aria-label="Previous customer review"
                    >
                      <ArrowLeft size={18} />
                    </button>
                    <button
                      onClick={() =>
                        setTestimonialPage(
                          (testimonialPage + 1) % testimonials.length,
                        )
                      }
                      aria-label="Next customer review"
                    >
                      <ArrowRight size={18} />
                    </button>
                  </div>

                  <div className="review-selectors">
                    {testimonials.map((item, index) => (
                      <button
                        className={index === testimonialPage ? "is-active" : ""}
                        key={item.name}
                        onClick={() => setTestimonialPage(index)}
                        aria-label={`Show review from ${item.name}`}
                      >
                        <img src={item.image} alt="" />
                        <span>{item.name.split(" ")[0]}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer" id="contact">
        <div className="container footer-grid">
          <div className="footer-brand">
            <img src="/assets/logo.png" alt="DriveCare" />
            <p>
              We are committed to providing top-quality car service and premium
              products you can trust.
            </p>
            <span>Follow Us</span>
            <div className="social-row">
              <a href="#facebook">
                <Globe />
              </a>
              <a href="#instagram">
                <Camera />
              </a>
              <a href="#youtube">
                <Play />
              </a>
              <a href="#twitter">
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
            <h3>Contact Us</h3>
            <p>
              <MapPin />
              123 Auto Street,
              <br />
              New York, USA 10001
            </p>
            <p>
              <Phone />
              +1 (555) 123-4567
            </p>
            <p>
              <Mail />
              info@drivecare.com
            </p>
            <p>
              <Clock3 />
              Mon - Sat: 8:00 AM - 6:00 PM
              <br />
              Sunday: Closed
            </p>
          </div>
          <div className="footer-column newsletter-column">
            <h3>Newsletter</h3>
            <p>Subscribe to get the latest offers and tips for your vehicle.</p>
            <form onSubmit={submitNewsletter}>
              <input name="email" type="email" placeholder="Enter your email" />
              <button className="button button-primary">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© 2026 DriveCare. All Rights Reserved.</span>
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
                    <strong>${item.price.toFixed(2)}</strong>
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
                <strong>${cartTotal.toFixed(2)}</strong>
              </div>
              <button
                className="button button-primary"
                onClick={() =>
                  showNotice("Checkout is ready for backend integration")
                }
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </aside>

      {notice && (
        <div className="toast">
          <CircleCheck />
          {notice}
        </div>
      )}
      <button
        className="floating-chat"
        onClick={() => showNotice("Live support is ready to help")}
      >
        <MessageCircle />
      </button>
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
function Stat({ icon: Icon, value, label }) {
  return (
    <div className="stat-item">
      <span>
        <Icon />
      </span>
      <div>
        <strong>{value}</strong>
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

```

## src/styles.css

```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Manrope:wght@600;700;800&display=swap");

:root {
  font-family: Inter, Arial, sans-serif;
  color: #111827;
  background: #fff;
  --blue: #075ee6;
  --dark: #031a38;
  --line: #dce5f1;
  --muted: #5f6b7a;
  --shadow: 0 18px 45px rgba(4, 35, 75, 0.12);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-width: 320px;
}

button,
input,
select {
  font: inherit;
}

button {
  cursor: pointer;
}

a {
  text-decoration: none;
  color: inherit;
}

img {
  display: block;
  max-width: 100%;
}

.app-shell {
  overflow-x: hidden;
}

.container {
  width: min(1180px, calc(100% - 44px));
  margin: auto;
}

.section {
  padding: 58px 0;
}

.button {
  border: 0;
  border-radius: 6px;
  min-height: 42px;
  padding: 0 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 700;
  transition: 0.25s;
}

.button:hover {
  transform: translateY(-2px);
}

.button-primary {
  color: #fff;
  background: linear-gradient(135deg, #075ee6, #0c4ed1);
  box-shadow: 0 9px 22px rgba(7, 94, 230, 0.24);
}

.button-outline {
  color: var(--blue);
  background: #fff;
  border: 1px solid var(--blue);
}

.button-outline:hover {
  background: var(--blue);
  color: #fff;
}

.button-large {
  min-height: 50px;
  padding: 0 24px;
}

.button-glass {
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.7);
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(8px);
}

.button-light {
  background: #fff;
  color: #0b55ce;
  margin-top: 14px;
  min-height: 38px;
}

.site-header {
  height: 72px;
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(255, 255, 255, 0.98);
  border-bottom: 1px solid #e4e9f0;
  box-shadow: 0 4px 17px rgba(3, 26, 56, 0.06);
}

.header-inner {
  width: min(1220px, calc(100% - 28px));
  height: 100%;
  margin: auto;
  display: flex;
  align-items: center;
  position: relative;
}

.brand-button {
  border: 0;
  background: transparent;
  padding: 0;
}

.brand-logo {
  width: 144px;
  height: 50px;
  object-fit: contain;
  object-position: left;
}

.main-nav {
  display: flex;
  align-items: center;
  gap: 29px;
  margin: auto;
}

.nav-link {
  position: relative;
  border: 0;
  background: transparent;
  padding: 27px 0 24px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 600;
}

.nav-link:after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 12px;
  height: 2px;
  background: var(--blue);
  transform: scaleX(0);
  transition: 0.2s;
}

.nav-link:hover,
.nav-link.active {
  color: var(--blue);
}

.nav-link:hover:after,
.nav-link.active:after {
  transform: scaleX(1);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon-button,
.cart-button,
.mobile-menu-button {
  border: 0;
  background: transparent;
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
}

.cart-button {
  position: relative;
}

.cart-button span {
  position: absolute;
  top: 0;
  right: 0;
  width: 18px;
  height: 18px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--blue);
  color: #fff;
  font-size: 10px;
  font-weight: 800;
}

.header-shop,
.header-book {
  min-height: 44px;
}

.mobile-menu-button {
  display: none;
}

.search-popover {
  position: absolute;
  right: 255px;
  top: 62px;
  width: 310px;
  padding: 10px 12px;
  display: flex;
  align-items: center;
  gap: 9px;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 9px;
  box-shadow: var(--shadow);
}

.search-popover input {
  flex: 1;
  border: 0;
  outline: 0;
}

.search-popover button {
  border: 0;
  background: transparent;
  display: grid;
  place-items: center;
}

.hero-section {
  min-height: 465px;
  position: relative;
  color: #fff;
  background: #030f20;
  overflow: hidden;
}

.hero-visual {
  position: absolute;
  inset: 0;
  background: url("/assets/hero-mechanic.jpg") no-repeat 57% center/auto 100%;
  transform: scale(1.12);
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    #020c17 0%,
    rgba(2, 12, 23, 0.96) 24%,
    rgba(2, 12, 23, 0.56) 54%,
    rgba(2, 12, 23, 0.2) 75%,
    rgba(2, 12, 23, 0.6) 100%
  );
}

.hero-content {
  min-height: 465px;
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 330px;
  align-items: center;
  gap: 70px;
  padding: 34px 0;
}

.hero-copy {
  max-width: 565px;
}

.hero-eyebrow {
  display: none;
}

.hero-copy h1 {
  font-family: Manrope, Inter, sans-serif;
  margin: 0;
  font-size: clamp(43px, 5vw, 64px);
  line-height: 1.08;
  letter-spacing: -0.035em;
}

.hero-description {
  max-width: 455px;
  font-size: 18px;
  line-height: 1.55;
  margin: 18px 0 24px;
  color: #eef4ff;
}

.hero-trust-list {
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  margin-bottom: 28px;
}

.hero-trust-list div {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  line-height: 1.25;
  font-weight: 700;
}

.hero-trust-list svg {
  width: 27px;
  height: 27px;
  stroke-width: 1.6;
}

.hero-buttons {
  display: flex;
  gap: 15px;
}

.appointment-card {
  width: 330px;
  padding: 22px 22px 18px;
  color: #151b26;
  background: rgba(255, 255, 255, 0.96);
  border-radius: 10px;
  box-shadow: 0 24px 50px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(12px);
}

.appointment-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 17px;
}

.appointment-title svg {
  color: var(--blue);
}

.appointment-title h2 {
  margin: 0;
  font-size: 20px;
  font-family: Manrope, Inter, sans-serif;
}

.appointment-card label {
  display: grid;
  gap: 6px;
  margin-bottom: 12px;
  font-size: 11px;
  font-weight: 700;
}

.appointment-card input,
.appointment-card select {
  width: 100%;
  height: 41px;
  padding: 0 11px;
  border: 1px solid #d7deea;
  border-radius: 5px;
  outline: 0;
  font-size: 12px;
  background: #fff;
}

.appointment-card input:focus,
.appointment-card select:focus {
  border-color: var(--blue);
  box-shadow: 0 0 0 3px rgba(7, 94, 230, 0.09);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.booking-submit {
  width: 100%;
  margin-top: 5px;
}

.appointment-help {
  margin: 13px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 10px;
  color: #526071;
}

.appointment-help svg,
.appointment-help a {
  color: var(--blue);
}

.section-heading {
  text-align: center;
  margin-bottom: 23px;
}

.section-heading h2,
.why-copy h2 {
  font-family: Manrope, Inter, sans-serif;
  color: #111827;
  font-size: clamp(28px, 3vw, 38px);
  line-height: 1.15;
  letter-spacing: -0.025em;
  margin: 3px 0 0;
}

.section-eyebrow {
  margin: 0;
  color: var(--blue);
  text-transform: uppercase;
  font-weight: 800;
  font-size: 12px;
  letter-spacing: 0.03em;
}

.align-left {
  text-align: left;
}

.service-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 18px;
}

.service-card {
  min-width: 0;
  border: 1px solid var(--line);
  border-radius: 9px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 8px 23px rgba(3, 26, 56, 0.04);
  transition: 0.25s;
}

.service-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow);
}

.service-image-wrap {
  position: relative;
  height: 128px;
  overflow: hidden;
  background: #eaf0f8;
}

.service-image-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 0.4s;
}

.service-card:hover img {
  transform: scale(1.05);
}

.service-icon {
  position: absolute;
  left: 13px;
  bottom: -13px;
  width: 37px;
  height: 37px;
  display: grid;
  place-items: center;
  color: #fff;
  background: var(--blue);
  border: 3px solid #fff;
  border-radius: 7px;
}

.service-card-body {
  padding: 24px 15px 15px;
}

.service-card h3 {
  margin: 0 0 9px;
  font-size: 16px;
}

.service-card p {
  min-height: 66px;
  margin: 0;
  color: #4f5c6c;
  font-size: 12px;
  line-height: 1.55;
}

.service-card button {
  border: 0;
  padding: 12px 0 0;
  display: inline-flex;
  align-items: center;
  color: var(--blue);
  background: transparent;
  font-weight: 700;
  font-size: 12px;
}

.section-cta {
  display: flex;
  margin: 18px auto 0;
  min-height: 38px;
}

.why-section {
  padding: 0 0 28px;
}

.why-layout {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr 1.45fr;
  min-height: 208px;
  border-radius: 11px;
  overflow: hidden;
  background: linear-gradient(100deg, #f4f7fb, #fff 58%);
  box-shadow: 0 12px 35px rgba(4, 35, 75, 0.06);
}

.why-copy {
  padding: 30px 24px 25px;
}

.why-copy h2 {
  font-size: 29px;
}

.why-copy > p:last-child {
  margin: 12px 0 0;
  color: #4f5c6c;
  font-size: 12px;
  line-height: 1.6;
}

.benefit-list {
  display: grid;
  align-content: center;
  gap: 13px;
  padding: 25px 18px;
}

.benefit-list div {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  font-size: 12px;
}

.benefit-list svg {
  color: var(--blue);
  fill: var(--blue);
  stroke: #fff;
}

.stat-panel {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-content: center;
  gap: 20px 18px;
  padding: 27px 32px;
  color: #fff;
  background: linear-gradient(135deg, #0a3974, #03245a);
  border-radius: 11px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 13px;
}

.stat-item > span {
  width: 46px;
  height: 46px;
  display: grid;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 50%;
}

.stat-item svg {
  width: 24px;
}

.stat-item strong {
  display: block;
  font-size: 28px;
  line-height: 1;
}

.stat-item p {
  margin: 5px 0 0;
  font-size: 11px;
  color: #dbe9ff;
}

.products-section {
  padding-top: 34px;
}

.product-heading-row {
  position: relative;
}

.product-heading-row .section-heading {
  margin-bottom: 18px;
}

.view-products {
  position: absolute;
  right: 0;
  bottom: 3px;
  border: 0;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--blue);
  background: transparent;
  font-weight: 700;
  font-size: 12px;
}

.product-scroller {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 12px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding: 0 1px 10px;
}

.product-card {
  padding: 10px 10px 12px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: #fff;
  scroll-snap-align: start;
  transition: 0.25s;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 13px 28px rgba(4, 35, 75, 0.1);
}

.product-image {
  height: 155px;
  display: grid;
  place-items: center;
  background: linear-gradient(#fff, #f9fbfe);
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.product-card h3 {
  min-height: 55px;
  margin: 12px 0 8px;
  font-size: 11.5px;
  line-height: 1.45;
}

.rating {
  font-size: 11px;
  display: flex;
  gap: 5px;
}

.rating span,
.testimonial-stars {
  color: #ffac00;
}

.rating small {
  color: #8b95a5;
}

.price-row {
  display: flex;
  gap: 8px;
  align-items: center;
  margin-top: 8px;
}

.price-row strong {
  font-size: 15px;
}

.price-row del {
  color: #929aaa;
  font-size: 10px;
}

.product-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
  margin-top: 11px;
}

.product-actions .button {
  min-height: 33px;
  padding: 0 7px;
  font-size: 10px;
  white-space: nowrap;
}

.offers-section {
  padding: 0 0 28px;
}

.offer-banner {
  min-height: 138px;
  display: grid;
  grid-template-columns: 1.55fr repeat(3, 0.85fr);
  padding: 0;
  overflow: hidden;
  color: #fff;
  border-radius: 11px;
  background: linear-gradient(120deg, #073b7b, #01295f 68%, #062a58);
  box-shadow: 0 16px 34px rgba(3, 26, 56, 0.16);
}

.offer-intro {
  padding: 24px 27px;
  display: flex;
  gap: 17px;
  align-items: flex-start;
}

.offer-icon {
  width: 52px;
  height: 52px;
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  color: #5ba0ff;
  border: 2px solid #1f72e9;
  border-radius: 14px;
  transform: rotate(-5deg);
}

.offer-intro p {
  margin: 0 0 4px;
  color: #62a1fa;
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 800;
}

.offer-intro h2 {
  margin: 0 0 6px;
  font-size: 22px;
  font-family: Manrope, Inter, sans-serif;
}

.offer-intro span {
  font-size: 11px;
  color: #d9e7fb;
}

.offer-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 24px 15px;
  border-left: 1px solid rgba(255, 255, 255, 0.13);
}

.offer-item > span svg {
  width: 38px;
  height: 38px;
  stroke-width: 1.4;
}

.offer-item strong {
  font-size: 17px;
}

.offer-item p {
  margin: 4px 0 12px;
  font-size: 11px;
  color: #dbe8f9;
}

.offer-item small {
  font-size: 10px;
}

.process-section {
  padding: 15px 0 40px;
}

.process-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 14px;
}

.process-card {
  position: relative;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 11px;
}

.step-icon {
  width: 56px;
  height: 56px;
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  color: var(--blue);
  border: 1px solid #d8e5f7;
  background: #f8fbff;
  border-radius: 50%;
  box-shadow: 0 8px 20px rgba(4, 35, 75, 0.07);
}

.step-copy p {
  margin: 0 0 6px;
  display: flex;
  align-items: center;
  gap: 7px;
  font-weight: 800;
  font-size: 11px;
}

.step-copy p span {
  width: 20px;
  height: 20px;
  display: grid;
  place-items: center;
  color: #fff;
  background: var(--blue);
  border-radius: 50%;
  font-size: 10px;
}

.step-copy small {
  display: block;
  color: #596579;
  font-size: 10px;
  line-height: 1.45;
}

.step-arrow {
  position: absolute;
  right: -13px;
  width: 14px;
  color: #b5c8e5;
}

.testimonial-section {
  background: linear-gradient(110deg, #f9fbfe, #fff);
  padding-top: 26px;
}

.testimonial-stage {
  position: relative;
  padding: 0 58px;
}

.testimonial-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.testimonial-card {
  min-height: 150px;
  padding: 20px;
  border: 1px solid var(--line);
  border-radius: 9px;
  background: #fff;
  box-shadow: 0 7px 23px rgba(3, 26, 56, 0.045);
}

.testimonial-card > p {
  min-height: 50px;
  margin: 8px 0 15px;
  font-size: 12px;
  line-height: 1.55;
}

.customer-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.customer-row img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.customer-row strong {
  display: block;
  font-size: 11px;
}

.customer-row span {
  display: block;
  margin-top: 3px;
  color: #7a8492;
  font-size: 10px;
}

.slider-button {
  position: absolute;
  top: 50%;
  z-index: 2;
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border: 1px solid #dce4ef;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 7px 18px rgba(4, 35, 75, 0.1);
  transform: translateY(-50%);
}

.slider-button svg {
  width: 17px;
}

.slider-button.previous {
  left: 0;
}

.slider-button.next {
  right: 0;
}

.site-footer {
  color: #fff;
  background: linear-gradient(130deg, #031b3a, #02142c);
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.3fr 0.8fr 1.05fr 1.2fr 1.3fr;
  padding: 42px 0 34px;
}

.footer-brand,
.footer-column {
  padding: 0 24px;
  border-right: 1px solid rgba(255, 255, 255, 0.14);
}

.footer-brand {
  padding-left: 0;
}

.footer-grid > :last-child {
  border-right: 0;
  padding-right: 0;
}

.footer-brand img {
  width: 140px;
  height: 44px;
  object-fit: contain;
  object-position: left;
  filter: brightness(1.9) saturate(0.75);
}

.footer-brand p,
.footer-column p {
  color: #d1dceb;
  font-size: 11px;
  line-height: 1.65;
}

.footer-brand > span {
  display: block;
  margin-top: 18px;
  font-size: 11px;
}

.social-row {
  display: flex;
  gap: 15px;
  margin-top: 11px;
}

.social-row svg {
  width: 17px;
}

.footer-column h3 {
  margin: 0 0 16px;
  font-size: 13px;
}

.footer-column > a {
  display: block;
  margin-bottom: 10px;
  color: #d7e0ec;
  font-size: 11px;
}

.contact-column p {
  display: flex;
  align-items: flex-start;
  gap: 7px;
  margin: 0 0 9px;
}

.contact-column svg {
  width: 14px;
  flex: 0 0 auto;
}

.newsletter-column form {
  display: grid;
  gap: 8px;
  margin-top: 13px;
}

.newsletter-column input {
  height: 42px;
  border: 0;
  border-radius: 5px;
  padding: 0 12px;
  outline: 0;
}

.footer-bottom {
  min-height: 59px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #b9c7d8;
  border-top: 1px solid rgba(255, 255, 255, 0.13);
  font-size: 10px;
}

.footer-bottom div {
  display: flex;
  align-items: center;
  gap: 17px;
}

.footer-bottom div span {
  width: 1px;
  height: 14px;
  background: rgba(255, 255, 255, 0.35);
}

.cart-drawer-backdrop {
  position: fixed;
  inset: 0;
  z-index: 89;
  pointer-events: none;
  opacity: 0;
  background: rgba(1, 12, 27, 0.48);
  backdrop-filter: blur(2px);
  transition: 0.25s;
}

.cart-drawer-backdrop.is-open {
  pointer-events: auto;
  opacity: 1;
}

.cart-drawer {
  position: fixed;
  z-index: 90;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(420px, 92vw);
  display: flex;
  flex-direction: column;
  background: #fff;
  box-shadow: -25px 0 60px rgba(3, 26, 56, 0.25);
  transform: translateX(105%);
  transition: 0.3s;
}

.cart-drawer.is-open {
  transform: translateX(0);
}

.cart-header {
  min-height: 74px;
  padding: 0 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--line);
}

.cart-header > div {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cart-header h2 {
  margin: 0;
  font-size: 20px;
}

.cart-header button {
  border: 0;
  background: transparent;
}

.empty-cart {
  margin: auto;
  padding: 35px;
  text-align: center;
}

.empty-cart > svg {
  width: 60px;
  height: 60px;
  color: #8ba5c8;
}

.empty-cart p {
  color: var(--muted);
}

.cart-items {
  flex: 1;
  overflow: auto;
  padding: 18px;
}

.cart-item {
  display: grid;
  grid-template-columns: 90px 1fr;
  gap: 14px;
  padding: 12px 0;
  border-bottom: 1px solid var(--line);
}

.cart-item img {
  width: 90px;
  height: 90px;
  object-fit: contain;
  border: 1px solid #edf1f6;
  border-radius: 8px;
}

.cart-item h3 {
  margin: 0 0 8px;
  font-size: 13px;
}

.quantity-control {
  width: max-content;
  margin-top: 10px;
  display: flex;
  align-items: center;
  border: 1px solid var(--line);
  border-radius: 5px;
  overflow: hidden;
}

.quantity-control button {
  width: 31px;
  height: 29px;
  border: 0;
  background: #f4f7fb;
}

.quantity-control span {
  width: 34px;
  text-align: center;
  font-size: 12px;
}

.cart-summary {
  padding: 18px;
  border-top: 1px solid var(--line);
}

.cart-summary > div {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.cart-summary .button {
  width: 100%;
}

.toast {
  position: fixed;
  left: 50%;
  bottom: 24px;
  z-index: 100;
  max-width: calc(100% - 30px);
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 13px 18px;
  color: #fff;
  background: #052d62;
  border-radius: 8px;
  box-shadow: 0 14px 35px rgba(3, 26, 56, 0.24);
  transform: translateX(-50%);
  font-size: 13px;
  font-weight: 700;
}

.toast svg {
  width: 18px;
  color: #74beff;
}

.floating-chat {
  position: fixed;
  right: 23px;
  bottom: 22px;
  z-index: 35;
  width: 52px;
  height: 52px;
  display: grid;
  place-items: center;
  color: #fff;
  border: 0;
  border-radius: 50%;
  background: var(--blue);
  box-shadow: 0 14px 30px rgba(7, 94, 230, 0.34);
}

@media (max-width: 1120px) {
  .main-nav {
    gap: 18px;
  }

  .header-book {
    display: none;
  }

  .hero-content {
    gap: 35px;
  }

  .service-grid {
    gap: 12px;
  }

  .service-card p {
    min-height: 82px;
  }

  .why-layout {
    grid-template-columns: 1fr 1fr;
  }

  .stat-panel {
    grid-column: 1/-1;
    border-radius: 0 0 11px 11px;
  }

  .offer-banner {
    grid-template-columns: 1.3fr repeat(3, 0.8fr);
  }

  .process-grid {
    grid-template-columns: repeat(3, 1fr);
    row-gap: 25px;
  }

  .footer-grid {
    grid-template-columns: 1.3fr repeat(2, 0.8fr) 1.1fr;
  }

  .newsletter-column {
    grid-column: 1/-1;
    border: 0;
    border-top: 1px solid rgba(255, 255, 255, 0.14);
    margin-top: 26px;
    padding: 25px 0 0;
  }

  .newsletter-column form {
    grid-template-columns: 1fr auto;
  }
}

@media (max-width: 900px) {
  .container {
    width: min(100% - 32px, 760px);
  }

  .site-header {
    height: 66px;
  }

  .brand-logo {
    width: 130px;
  }

  .main-nav {
    position: fixed;
    top: 66px;
    left: 0;
    right: 0;
    z-index: 60;
    margin: 0;
    padding: 14px 18px 22px;
    display: grid;
    gap: 0;
    background: #fff;
    box-shadow: 0 18px 30px rgba(4, 35, 75, 0.14);
    transform: translateY(-135%);
    opacity: 0;
    pointer-events: none;
    transition: 0.28s;
  }

  .main-nav.is-open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }

  .nav-link {
    width: 100%;
    padding: 15px 5px;
    border-bottom: 1px solid #edf1f6;
    justify-content: space-between;
  }

  .nav-link:after {
    display: none;
  }

  .header-shop,
  .search-button {
    display: none;
  }

  .mobile-menu-button {
    display: grid;
  }

  .hero-visual {
    background-size: cover;
    background-position: center;
    transform: none;
  }

  .hero-overlay {
    background: linear-gradient(
      90deg,
      rgba(1, 9, 18, 0.97),
      rgba(1, 9, 18, 0.72)
    );
  }

  .hero-content {
    grid-template-columns: 1fr;
    gap: 30px;
    padding: 62px 0 45px;
  }

  .appointment-card {
    width: 100%;
    max-width: 590px;
  }

  .service-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .service-card:last-child {
    grid-column: 1/-1;
  }

  .service-card p {
    min-height: auto;
  }

  .why-layout {
    grid-template-columns: 1fr;
  }

  .benefit-list {
    padding-top: 0;
  }

  .stat-panel {
    grid-column: auto;
  }

  .product-scroller {
    grid-template-columns: repeat(6, minmax(190px, 1fr));
  }

  .offer-banner {
    grid-template-columns: repeat(3, 1fr);
  }

  .offer-intro {
    grid-column: 1/-1;
    border-bottom: 1px solid rgba(255, 255, 255, 0.13);
  }

  .testimonial-grid {
    grid-template-columns: 1fr;
  }

  .testimonial-card {
    display: none;
  }

  .testimonial-card.mobile-active {
    display: block;
  }

  .testimonial-stage {
    max-width: 590px;
    margin: auto;
  }

  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
    row-gap: 28px;
  }

  .footer-brand,
  .footer-column {
    border-right: 0;
    padding: 0;
  }

  .newsletter-column {
    grid-column: 1/-1;
  }
}

@media (max-width: 640px) {
  .container {
    width: min(100% - 24px, 560px);
  }

  .section {
    padding: 43px 0;
  }

  .brand-logo {
    width: 116px;
  }

  .hero-content {
    padding-top: 46px;
  }

  .hero-copy h1 {
    font-size: clamp(39px, 12vw, 54px);
  }

  .hero-description {
    font-size: 15px;
  }

  .hero-trust-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .hero-buttons {
    flex-direction: column;
  }

  .button-large {
    width: 100%;
  }

  .appointment-card {
    padding: 20px 16px;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .service-grid {
    grid-template-columns: 1fr;
  }

  .service-card:last-child {
    grid-column: auto;
  }

  .service-image-wrap {
    height: 180px;
  }

  .why-copy {
    padding: 25px 18px 12px;
  }

  .benefit-list {
    padding: 16px 18px 25px;
  }

  .stat-panel {
    grid-template-columns: 1fr 1fr;
    padding: 23px 18px;
  }

  .view-products {
    position: static;
    display: flex;
    margin: -8px auto 18px;
  }

  .product-scroller {
    grid-template-columns: repeat(6, 77vw);
    margin-right: -12px;
  }

  .product-image {
    height: 180px;
  }

  .offer-banner {
    grid-template-columns: 1fr;
  }

  .offer-intro {
    padding: 22px 18px;
  }

  .offer-item,
  .offer-item + .offer-item {
    border-left: 0;
    border-top: 1px solid rgba(255, 255, 255, 0.13);
    padding: 18px;
  }

  .process-grid {
    grid-template-columns: 1fr;
    gap: 17px;
  }

  .step-arrow {
    display: none;
  }

  .testimonial-stage {
    padding: 0 45px;
  }

  .footer-grid {
    grid-template-columns: 1fr;
  }

  .newsletter-column {
    grid-column: auto;
  }

  .newsletter-column form {
    grid-template-columns: 1fr;
  }

  .footer-bottom {
    padding: 15px 0;
    flex-direction: column;
    justify-content: center;
    gap: 13px;
    text-align: center;
  }

  .floating-chat {
    right: 15px;
    bottom: 15px;
    width: 48px;
    height: 48px;
  }

  .toast {
    bottom: 75px;
    font-size: 11px;
  }
}

@media (max-width: 400px) {
  .header-inner {
    width: calc(100% - 16px);
  }

  .hero-trust-list {
    grid-template-columns: 1fr;
  }

  .stat-panel {
    grid-template-columns: 1fr;
  }

  .product-actions {
    grid-template-columns: 1fr;
  }

  .testimonial-stage {
    padding: 0;
  }

  .slider-button {
    top: auto;
    bottom: -18px;
    transform: none;
  }

  .slider-button.previous {
    left: calc(50% - 50px);
  }

  .slider-button.next {
    right: calc(50% - 50px);
  }
}

/* Updated white navigation, animated home slider and customer reviews */

.site-header {
  height: 86px;
  position: sticky;
  top: 0;
  z-index: 70;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.98);
  border-bottom: 1px solid #e5ebf3;
  box-shadow: 0 12px 32px rgba(3, 36, 78, 0.1);
  backdrop-filter: blur(18px);
}

.site-header::after {
  content: "";
  position: absolute;
  right: 0;
  bottom: -1px;
  width: min(43vw, 620px);
  height: 3px;
  background: linear-gradient(90deg, transparent, #176fe6, #56b9ff);
  clip-path: polygon(8% 0, 100% 0, 100% 100%, 0 100%);
}

.header-frame {
  width: min(1260px, calc(100% - 34px));
  height: 64px;
  margin: auto;
  padding: 7px 10px 7px 8px;
  position: relative;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 22px;
  border: 1px solid #e1e8f2;
  border-radius: 18px;
  background: linear-gradient(135deg, #ffffff, #f8fbff);
  box-shadow:
    0 9px 25px rgba(4, 42, 91, 0.07),
    inset 0 1px 0 #ffffff;
}

.brand-button {
  min-width: 166px;
  height: 50px;
  padding: 5px 14px;
  display: flex;
  align-items: center;
  border: 0;
  border-right: 1px solid #e4ebf4;
  border-radius: 13px 3px 3px 13px;
  background: transparent;
}

.brand-logo {
  width: 137px;
  height: 40px;
  object-fit: contain;
  object-position: left center;
}

.nav-zone {
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.nav-status {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: #56708f;
  white-space: nowrap;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22b96f;
  box-shadow:
    0 0 0 5px rgba(34, 185, 111, 0.11),
    0 0 14px rgba(34, 185, 111, 0.45);
}

.main-nav {
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.nav-link {
  min-height: 42px;
  padding: 0 13px;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #26384f;
  border: 1px solid transparent;
  border-radius: 11px;
  background: transparent;
  font-size: 12px;
  font-weight: 700;
  transition:
    color 0.25s ease,
    background 0.25s ease,
    border-color 0.25s ease,
    transform 0.25s ease;
}

.nav-link::after {
  content: "";
  position: absolute;
  left: 15px;
  right: 15px;
  bottom: 5px;
  height: 2px;
  border-radius: 999px;
  background: linear-gradient(90deg, #075ee6, #53b9ff);
  transform: scaleX(0);
  transition: transform 0.25s ease;
}

.nav-link:hover,
.nav-link.active {
  color: #075ee6;
  border-color: #dbe9fb;
  background: #f2f7ff;
  transform: translateY(-1px);
}

.nav-link:hover::after,
.nav-link.active::after {
  transform: scaleX(1);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon-button,
.cart-button,
.mobile-menu-button {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  color: #16375f;
  border: 1px solid #dce6f2;
  border-radius: 11px;
  background: #ffffff;
  transition: 0.25s ease;
}

.icon-button:hover,
.cart-button:hover,
.mobile-menu-button:hover {
  color: #075ee6;
  border-color: #aecdFA;
  background: #f1f7ff;
  transform: translateY(-1px);
}

.cart-button {
  position: relative;
}

.cart-button span {
  top: -5px;
  right: -4px;
  border: 2px solid #ffffff;
  background: #075ee6;
}

.header-book-button {
  min-height: 42px;
  padding: 0 17px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #ffffff;
  border: 0;
  border-radius: 11px;
  background: linear-gradient(135deg, #075ee6, #0b48c5);
  box-shadow: 0 10px 24px rgba(7, 94, 230, 0.25);
  font-size: 12px;
  font-weight: 800;
  transition: 0.25s ease;
}

.header-book-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 29px rgba(7, 94, 230, 0.33);
}

.mobile-menu-button {
  display: none;
}

.search-popover {
  right: 0;
  top: 72px;
  width: min(360px, calc(100vw - 34px));
  color: #142237;
  border: 1px solid rgba(58, 132, 223, 0.25);
  border-radius: 14px;
  box-shadow: 0 22px 50px rgba(0, 20, 50, 0.24);
}

.hero-section {
  min-height: 625px;
  position: relative;
  isolation: isolate;
  display: flex;
  align-items: stretch;
  color: #ffffff;
  background: #020e1e;
  overflow: hidden;
}

.hero-slider,
.hero-slide,
.hero-slide img,
.hero-overlay,
.hero-grid-pattern {
  position: absolute;
  inset: 0;
}

.hero-slide {
  opacity: 0;
  transform: scale(1.08);
  transition:
    opacity 1.15s ease,
    transform 6.8s ease;
}

.hero-slide.is-active {
  opacity: 1;
  transform: scale(1.015);
}

.hero-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 42%;
}

.hero-overlay {
  z-index: 1;
  background: linear-gradient(
      90deg,
      rgba(1, 12, 28, 0.98) 0%,
      rgba(2, 18, 39, 0.91) 35%,
      rgba(1, 15, 33, 0.44) 64%,
      rgba(1, 12, 27, 0.2) 100%
    ),
    linear-gradient(0deg, rgba(0, 12, 28, 0.62), transparent 42%);
}

.hero-grid-pattern {
  z-index: 2;
  opacity: 0.12;
  pointer-events: none;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.18) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(255, 255, 255, 0.18) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: linear-gradient(90deg, #000, transparent 72%);
}

.hero-content {
  min-height: 625px;
  padding: 74px 0 42px;
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.hero-copy {
  width: min(690px, 67%);
  max-width: none;
  animation: heroTextIn 0.85s ease both;
}

.hero-eyebrow {
  width: max-content;
  max-width: 100%;
  min-height: 34px;
  margin: 0 0 18px;
  padding: 0 14px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #d8ecff;
  border: 1px solid rgba(111, 184, 255, 0.42);
  border-radius: 999px;
  background: rgba(22, 105, 207, 0.18);
  backdrop-filter: blur(12px);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.09em;
  text-transform: uppercase;
}

.hero-eyebrow svg {
  color: #67b8ff;
}

.hero-copy h1 {
  max-width: 650px;
  margin: 0;
  color: #ffffff;
  font-family: Manrope, Inter, sans-serif;
  font-size: clamp(52px, 5.7vw, 78px);
  line-height: 1.01;
  letter-spacing: -0.052em;
  text-wrap: balance;
  text-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
}

.hero-description {
  max-width: 595px;
  margin: 22px 0 27px;
  color: #dce9f8;
  font-size: 17px;
  line-height: 1.7;
}

.hero-trust-list {
  margin-bottom: 30px;
  display: flex;
  flex-wrap: wrap;
  gap: 13px;
}

.hero-trust-list div {
  min-height: 48px;
  padding: 7px 12px 7px 9px;
  display: flex;
  align-items: center;
  gap: 9px;
  color: #f3f8ff;
  border: 1px solid rgba(255, 255, 255, 0.13);
  border-radius: 12px;
  background: rgba(2, 22, 48, 0.48);
  backdrop-filter: blur(10px);
  font-size: 10px;
  font-weight: 700;
}

.hero-trust-list svg {
  width: 30px;
  height: 30px;
  padding: 6px;
  color: #74bdff;
  border-radius: 9px;
  background: rgba(25, 119, 235, 0.2);
}

.hero-buttons {
  display: flex;
  gap: 13px;
}

.hero-buttons .button-primary {
  background: linear-gradient(135deg, #1685ff, #0754d2);
  box-shadow: 0 14px 34px rgba(2, 93, 225, 0.34);
}

.hero-buttons .button-glass {
  border-color: rgba(255, 255, 255, 0.34);
  background: rgba(1, 17, 39, 0.45);
}

.hero-slider-controls {
  width: 100%;
  margin-top: 44px;
  display: flex;
  align-items: center;
  gap: 17px;
}

.hero-arrow-buttons {
  display: flex;
  gap: 8px;
}

.hero-arrow-buttons button {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 12px;
  background: rgba(2, 20, 43, 0.55);
  backdrop-filter: blur(10px);
  transition: 0.25s ease;
}

.hero-arrow-buttons button:hover {
  border-color: #65b4ff;
  background: #146fe6;
}

.hero-dots {
  display: flex;
  align-items: center;
  gap: 7px;
}

.hero-dots button {
  width: 24px;
  height: 4px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.34);
  transition: 0.3s ease;
}

.hero-dots button.is-active {
  width: 48px;
  background: #5eb1ff;
}

.hero-slide-count {
  display: flex;
  align-items: baseline;
  gap: 3px;
  color: #a9c7e8;
  font-size: 11px;
}

.hero-slide-count strong {
  color: #ffffff;
  font-size: 17px;
}

@keyframes heroTextIn {
  from {
    opacity: 0;
    transform: translateY(24px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.testimonial-section {
  padding: 66px 0;
  background: radial-gradient(
      circle at 12% 20%,
      rgba(46, 139, 255, 0.1),
      transparent 29%
    ),
    linear-gradient(135deg, #f6faff, #ffffff 58%, #f3f8ff);
}

.review-showcase {
  min-height: 430px;
  display: grid;
  grid-template-columns: minmax(285px, 0.8fr) minmax(0, 1.35fr);
  overflow: hidden;
  border: 1px solid #dce8f7;
  border-radius: 28px;
  background: #ffffff;
  box-shadow: 0 28px 70px rgba(3, 35, 78, 0.13);
}

.review-overview {
  padding: 48px 42px;
  position: relative;
  color: #ffffff;
  background: radial-gradient(
      circle at 15% 15%,
      rgba(97, 183, 255, 0.28),
      transparent 28%
    ),
    linear-gradient(145deg, #0a4c9c, #042d67 65%, #032452);
}

.review-overview::after {
  content: "";
  position: absolute;
  right: -48px;
  bottom: -48px;
  width: 180px;
  height: 180px;
  border: 34px solid rgba(255, 255, 255, 0.06);
  border-radius: 50%;
}

.review-kicker {
  margin: 0 0 12px;
  color: #80c2ff;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.review-overview h2 {
  max-width: 330px;
  margin: 0;
  font-family: Manrope, Inter, sans-serif;
  font-size: clamp(31px, 3vw, 44px);
  line-height: 1.1;
  letter-spacing: -0.04em;
}

.review-overview-text {
  max-width: 360px;
  margin: 20px 0 28px;
  color: #cee2fa;
  font-size: 13px;
  line-height: 1.75;
}

.review-score {
  display: flex;
  align-items: center;
  gap: 16px;
}

.review-score > strong {
  font-family: Manrope, Inter, sans-serif;
  font-size: 54px;
  line-height: 1;
}

.review-score div {
  display: grid;
  gap: 5px;
}

.review-score div span,
.review-stars {
  color: #ffc342;
  letter-spacing: 0.08em;
}

.review-score small {
  color: #c8ddf5;
  font-size: 10px;
}

.review-line {
  width: min(260px, 100%);
  height: 1px;
  margin: 27px 0 14px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.13);
}

.review-line span {
  width: 66%;
  height: 100%;
  display: block;
  background: linear-gradient(90deg, #62b6ff, transparent);
}

.review-count {
  margin: 0;
  color: #a9c9eb;
  font-size: 10px;
}

.review-carousel-panel {
  padding: 48px 55px 35px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.review-quote-icon {
  width: 52px;
  height: 52px;
  margin-bottom: 16px;
  color: #dbeaff;
  fill: #edf5ff;
  stroke-width: 1.4;
}

.review-stars {
  margin-bottom: 13px;
  font-size: 14px;
}

.review-featured-quote {
  max-width: 680px;
  min-height: 112px;
  margin: 0;
  color: #10243f;
  font-family: Manrope, Inter, sans-serif;
  font-size: clamp(20px, 2vw, 28px);
  font-weight: 700;
  line-height: 1.5;
  letter-spacing: -0.02em;
}

.review-author {
  margin-top: 25px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.review-author img {
  width: 53px;
  height: 53px;
  object-fit: cover;
  border: 3px solid #ffffff;
  border-radius: 50%;
  box-shadow: 0 8px 24px rgba(6, 54, 116, 0.18);
}

.review-author div {
  display: grid;
  gap: 4px;
}

.review-author strong {
  color: #10243f;
  font-size: 13px;
}

.review-author span {
  color: #718096;
  font-size: 11px;
}

.review-author > svg {
  color: #1478eb;
}

.review-navigation {
  margin-top: 34px;
  padding-top: 23px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  border-top: 1px solid #e7eef7;
}

.review-arrow-group {
  display: flex;
  gap: 8px;
}

.review-arrow-group button {
  width: 41px;
  height: 41px;
  display: grid;
  place-items: center;
  color: #174b86;
  border: 1px solid #d5e2f2;
  border-radius: 11px;
  background: #ffffff;
  transition: 0.25s ease;
}

.review-arrow-group button:hover {
  color: #ffffff;
  border-color: #116ee2;
  background: #116ee2;
}

.review-selectors {
  display: flex;
  align-items: center;
  gap: 8px;
}

.review-selectors button {
  min-width: 74px;
  height: 44px;
  padding: 4px 9px 4px 5px;
  display: flex;
  align-items: center;
  gap: 7px;
  color: #61728a;
  border: 1px solid transparent;
  border-radius: 999px;
  background: #f4f8fd;
  font-size: 10px;
  font-weight: 700;
  transition: 0.25s ease;
}

.review-selectors button img {
  width: 32px;
  height: 32px;
  object-fit: cover;
  border-radius: 50%;
}

.review-selectors button.is-active {
  color: #0b5cca;
  border-color: #bcd8fb;
  background: #eaf4ff;
  box-shadow: 0 8px 18px rgba(10, 91, 196, 0.1);
}

@media (max-width: 1180px) {
  .header-frame {
    gap: 12px;
  }

  .nav-zone {
    gap: 9px;
  }

  .nav-status {
    display: none;
  }

  .nav-link {
    padding: 0 9px;
  }

  .header-book-button {
    padding: 0 12px;
  }
}

@media (max-width: 960px) {
  .site-header {
    height: 76px;
  }

  .header-frame {
    width: min(100% - 22px, 760px);
    height: 58px;
    grid-template-columns: auto 1fr auto;
    border-radius: 15px;
  }

  .brand-button {
    min-width: 145px;
    height: 45px;
    padding: 4px 10px;
  }

  .brand-logo {
    width: 124px;
  }

  .nav-zone {
    min-width: 0;
  }

  .main-nav {
    position: fixed;
    top: 76px;
    left: 11px;
    right: 11px;
    z-index: 80;
    max-height: calc(100vh - 90px);
    margin: 0;
    padding: 12px;
    display: grid;
    gap: 5px;
    overflow-y: auto;
    border: 1px solid rgba(102, 172, 255, 0.25);
    border-radius: 0 0 18px 18px;
    background: linear-gradient(145deg, #ffffff, #f5f9ff);
    box-shadow: 0 22px 45px rgba(0, 13, 32, 0.34);
    transform: translateY(-130%);
    opacity: 0;
    pointer-events: none;
    transition: 0.3s ease;
  }

  .main-nav.is-open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }

  .nav-link {
    width: 100%;
    min-height: 48px;
    padding: 0 15px;
    justify-content: space-between;
    color: #26384f;
    border-bottom: 0;
  }

  .header-book-button,
  .search-button {
    display: none;
  }

  .mobile-menu-button {
    display: grid;
  }

  .search-popover {
    top: 67px;
  }

  .hero-section,
  .hero-content {
    min-height: 590px;
  }

  .hero-content {
    padding: 65px 0 38px;
  }

  .hero-copy {
    width: min(720px, 84%);
  }

  .hero-slide img {
    object-position: 58% center;
  }

  .hero-overlay {
    background: linear-gradient(
        90deg,
        rgba(1, 12, 28, 0.98) 0%,
        rgba(2, 18, 39, 0.88) 48%,
        rgba(1, 15, 33, 0.34) 100%
      ),
      linear-gradient(0deg, rgba(0, 12, 28, 0.65), transparent 50%);
  }

  .review-showcase {
    grid-template-columns: 0.9fr 1.2fr;
  }

  .review-overview {
    padding: 40px 30px;
  }

  .review-carousel-panel {
    padding: 40px 34px 30px;
  }

  .review-selectors button {
    min-width: 42px;
    width: 42px;
    padding: 4px;
  }

  .review-selectors button span {
    display: none;
  }
}

@media (max-width: 720px) {
  .header-frame {
    width: calc(100% - 16px);
    padding-right: 7px;
    gap: 6px;
  }

  .brand-button {
    min-width: 131px;
  }

  .brand-logo {
    width: 113px;
  }

  .header-actions {
    gap: 6px;
  }

  .icon-button,
  .cart-button,
  .mobile-menu-button {
    width: 40px;
    height: 40px;
  }

  .hero-section,
  .hero-content {
    min-height: 650px;
  }

  .hero-content {
    padding: 62px 0 34px;
    justify-content: flex-end;
  }

  .hero-copy {
    width: 100%;
  }

  .hero-copy h1 {
    font-size: clamp(43px, 12vw, 62px);
  }

  .hero-description {
    max-width: 520px;
    font-size: 15px;
  }

  .hero-slide img {
    object-position: 62% center;
  }

  .hero-overlay {
    background: linear-gradient(
        0deg,
        rgba(1, 11, 27, 0.98) 0%,
        rgba(1, 14, 31, 0.85) 53%,
        rgba(1, 15, 32, 0.18) 100%
      ),
      linear-gradient(90deg, rgba(1, 13, 31, 0.36), transparent);
  }

  .hero-grid-pattern {
    opacity: 0.08;
    mask-image: linear-gradient(0deg, #000, transparent 80%);
  }

  .hero-trust-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 9px;
  }

  .hero-trust-list div {
    width: 100%;
  }

  .hero-buttons {
    width: 100%;
  }

  .hero-buttons .button {
    flex: 1;
  }

  .hero-slider-controls {
    margin-top: 28px;
  }

  .review-showcase {
    grid-template-columns: 1fr;
    border-radius: 22px;
  }

  .review-overview {
    padding: 35px 28px;
  }

  .review-overview h2 {
    max-width: 480px;
  }

  .review-carousel-panel {
    padding: 35px 28px 27px;
  }

  .review-featured-quote {
    min-height: auto;
  }
}

@media (max-width: 500px) {
  .brand-button {
    min-width: 119px;
    padding: 4px 8px;
  }

  .brand-logo {
    width: 103px;
  }

  .hero-section,
  .hero-content {
    min-height: 690px;
  }

  .hero-content {
    padding-bottom: 27px;
  }

  .hero-eyebrow {
    width: auto;
    font-size: 9px;
    letter-spacing: 0.06em;
  }

  .hero-copy h1 {
    font-size: clamp(40px, 13vw, 54px);
  }

  .hero-description {
    margin: 18px 0 22px;
    line-height: 1.6;
  }

  .hero-trust-list {
    grid-template-columns: 1fr 1fr;
  }

  .hero-trust-list div {
    min-height: 45px;
    font-size: 9px;
  }

  .hero-buttons {
    display: grid;
    grid-template-columns: 1fr;
  }

  .hero-buttons .button {
    width: 100%;
  }

  .hero-slider-controls {
    justify-content: space-between;
    gap: 9px;
  }

  .hero-arrow-buttons button {
    width: 38px;
    height: 38px;
  }

  .hero-dots button {
    width: 17px;
  }

  .hero-dots button.is-active {
    width: 34px;
  }

  .review-overview,
  .review-carousel-panel {
    padding-left: 22px;
    padding-right: 22px;
  }

  .review-featured-quote {
    font-size: 19px;
  }

  .review-navigation {
    align-items: flex-end;
  }

  .review-selectors {
    gap: 4px;
  }

  .review-selectors button {
    width: 38px;
    min-width: 38px;
    height: 38px;
  }

  .review-selectors button img {
    width: 28px;
    height: 28px;
  }
}


/* Final navbar behavior safeguards */
@media (min-width: 961px) {
  .mobile-menu-button {
    display: none !important;
  }

  .main-nav {
    position: static;
    transform: none;
    opacity: 1;
    pointer-events: auto;
  }
}

@media (max-width: 960px) {
  .mobile-menu-button {
    display: grid;
  }

  .main-nav .nav-link {
    color: #26384f;
  }

  .main-nav .nav-link:hover,
  .main-nav .nav-link.active {
    color: #075ee6;
    background: #edf5ff;
  }
}

```
