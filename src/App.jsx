import { useEffect, useMemo, useRef, useState } from "react";
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
  {
    id: 6,
    title: "Battery Service",
    description:
      "Battery testing, terminal cleaning, charging and reliable replacement.",
    image: "/assets/service-diagnostics.jpg",
    icon: PackageCheck,
  },
  {
    id: 7,
    title: "Tyre Replacement & Balancing",
    description:
      "Professional tyre replacement and wheel balancing for a smoother drive.",
    image: "/assets/service-alignment.jpg",
    icon: CircleCheck,
  },
  {
    id: 8,
    title: "Suspension & Steering",
    description:
      "Inspection and repair of shocks, steering parts and suspension systems.",
    image: "/assets/service-brakes.jpg",
    icon: Cog,
  },
  {
    id: 9,
    title: "Transmission Service",
    description:
      "Transmission inspection, fluid replacement and performance maintenance.",
    image: "/assets/service-oil.jpg",
    icon: Gauge,
  },
  {
    id: 10,
    title: "Car Wash & Detailing",
    description:
      "Complete exterior wash, interior cleaning and professional detailing.",
    image: "/assets/hero-mechanics-2.jpg",
    icon: Sparkles,
  },
  {
    id: 11,
    title: "Electrical Repairs",
    description:
      "Diagnosis and repair of lights, wiring, charging and starting systems.",
    image: "/assets/service-diagnostics.jpg",
    icon: Wrench,
  },
  {
    id: 12,
    title: "Radiator & Cooling System",
    description:
      "Cooling-system inspection, coolant replacement and radiator servicing.",
    image: "/assets/service-ac.jpg",
    icon: AirVent,
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
  const [showAllServices, setShowAllServices] = useState(false);

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
