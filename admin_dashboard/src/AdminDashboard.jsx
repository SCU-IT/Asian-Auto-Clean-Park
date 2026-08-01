import { useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  CalendarDays,
  Car,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Clock3,
  CreditCard,
  Download,
  Eye,
  EyeOff,
  FileText,
  LayoutDashboard,
  LockKeyhole,
  LogIn,
  LogOut,
  Mail,
  MapPin,
  Menu,
  Phone,
  RefreshCw,
  Search,
  ShieldCheck,
  User,
  UserRound,
  Wallet,
  Wrench,
  X,
  XCircle,
} from "lucide-react";

const STORAGE_KEY = "aacp_service_bookings";
const ADMIN_SESSION_KEY = "aacp_admin_authenticated";
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

const navigationItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "calendar", label: "Calendar", icon: CalendarDays },
  { id: "requests", label: "Requests", icon: ClipboardList },
  { id: "reports", label: "Reports", icon: BarChart3 },
];

function readBookings() {
  try {
    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
}

function writeBookings(bookings) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
}

function toDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatCurrency(value) {
  return `Rs. ${new Intl.NumberFormat("en-LK").format(Number(value || 0))}`;
}

function formatDate(value) {
  if (!value) return "Not selected";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(`${value}T12:00:00`));
}

function formatLongDate(value) {
  if (!value) return "Not selected";
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(`${value}T12:00:00`));
}

function formatTime(value) {
  if (!value) return "Not selected";
  const [hours, minutes] = value.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function normalizeStatus(status) {
  const value = String(status || "pending").toLowerCase();
  if (["approved", "rejected", "completed", "cancelled"].includes(value)) {
    return value;
  }
  return "pending";
}

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("overview");
  const [bookings, setBookings] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => window.sessionStorage.getItem(ADMIN_SESSION_KEY) === "true",
  );

  const refreshBookings = () => {
    setBookings(
      readBookings().map((booking) => ({
        ...booking,
        status: normalizeStatus(booking.status),
      })),
    );
    setLastUpdated(new Date());
  };

  useEffect(() => {
    if (!isAuthenticated) return undefined;

    refreshBookings();

    const handleStorage = (event) => {
      if (event.key === STORAGE_KEY) refreshBookings();
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [isAuthenticated]);

  const updateBookingStatus = (bookingId, status) => {
    const updated = bookings.map((booking) =>
      booking.id === bookingId
        ? {
            ...booking,
            status,
            updatedAt: new Date().toISOString(),
          }
        : booking,
    );

    setBookings(updated);
    writeBookings(updated);

    setSelectedBooking((current) =>
      current?.id === bookingId ? { ...current, status } : current,
    );
  };

  const pageTitle = {
    overview: "Asian Auto Clean Park Admin Dashboard",
    calendar: "Appointment Calendar",
    requests: "Service Booking Requests",
    reports: "Booking and Revenue Reports",
  }[activePage];

  const pageDescription = {
    overview:
      "Review pending appointments, verify payments and monitor service activity.",
    calendar:
      "View daily appointment availability and scheduled vehicle services.",
    requests:
      "Search, review, approve, reject and complete customer appointments.",
    reports:
      "Analyse bookings, service demand and approved revenue.",
  }[activePage];

  const handleLogin = () => {
    window.sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setIsAuthenticated(false);
    setMenuOpen(false);
    setSelectedBooking(null);
    setActivePage("overview");
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="aacp-admin-shell">
      <aside className={`aacp-admin-sidebar ${menuOpen ? "is-open" : ""}`}>
        <div className="aacp-admin-brand">
          <img src="/assets/logo.png" alt="Asian Auto Clean Park" />
          <div>
            <h2>Admin Panel</h2>
            <p>Asian Auto Clean Park</p>
          </div>
        </div>

        <nav className="aacp-admin-navigation">
          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                className={activePage === item.id ? "is-active" : ""}
                onClick={() => {
                  setActivePage(item.id);
                  setMenuOpen(false);
                }}
              >
                <Icon size={19} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <button
          className="aacp-admin-logout"
          onClick={handleLogout}
        >
          <LogOut size={19} />
          Logout
        </button>
      </aside>

      <main className="aacp-admin-main">
        <header className="aacp-admin-page-header">
          <div className="aacp-admin-header-copy">
            <button
              className="aacp-admin-mobile-menu"
              onClick={() => setMenuOpen((current) => !current)}
              aria-label="Open admin navigation"
            >
              {menuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>

            <div>
              <span>WELCOME, ADMIN</span>
              <h1>{pageTitle}</h1>
              <p>{pageDescription}</p>
            </div>
          </div>

          <button className="aacp-admin-refresh" onClick={refreshBookings}>
            <RefreshCw size={17} />
            Refresh Data
          </button>
        </header>

        <div className="aacp-admin-update-row">
          <span className="aacp-admin-live-dot" />
          Data loaded from the customer booking system
          <small>
            Updated{" "}
            {new Intl.DateTimeFormat("en-US", {
              hour: "numeric",
              minute: "2-digit",
            }).format(lastUpdated)}
          </small>
        </div>

        {activePage === "overview" && (
          <OverviewPage
            bookings={bookings}
            onOpen={setSelectedBooking}
            onStatusChange={updateBookingStatus}
            onViewRequests={() => setActivePage("requests")}
          />
        )}

        {activePage === "calendar" && (
          <CalendarPage bookings={bookings} onOpen={setSelectedBooking} />
        )}

        {activePage === "requests" && (
          <RequestsPage
            bookings={bookings}
            onOpen={setSelectedBooking}
            onStatusChange={updateBookingStatus}
          />
        )}

        {activePage === "reports" && <ReportsPage bookings={bookings} />}
      </main>

      {menuOpen && (
        <button
          className="aacp-admin-sidebar-overlay"
          onClick={() => setMenuOpen(false)}
          aria-label="Close admin navigation"
        />
      )}

      {selectedBooking && (
        <BookingDetailsModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          onStatusChange={updateBookingStatus}
        />
      )}
    </div>
  );
}


function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (!username.trim() || !password) {
      setError("Enter the admin username and password.");
      return;
    }

    setSubmitting(true);

    window.setTimeout(() => {
      if (
        username.trim() === ADMIN_USERNAME &&
        password === ADMIN_PASSWORD
      ) {
        onLogin();
        return;
      }

      setError("Incorrect admin username or password.");
      setSubmitting(false);
    }, 450);
  };

  return (
    <main className="aacp-admin-login-page">
      <div className="aacp-admin-login-background-shape shape-one" />
      <div className="aacp-admin-login-background-shape shape-two" />

      <section className="aacp-admin-login-shell">
        <div className="aacp-admin-login-visual">
          <img src="/assets/logo.png" alt="Asian Auto Clean Park" />

          <h1>Manage every service appointment with confidence.</h1>
          <p>
            Review customer bookings, verify payments, manage schedules and
            monitor vehicle-service performance from one dashboard.
          </p>
          </div>


        <div className="aacp-admin-login-form-panel">
          <div className="aacp-admin-login-heading">
            <span className="aacp-admin-login-icon">
              <LockKeyhole size={24} />
            </span>
            <div>
              <small>ADMIN ACCESS</small>
              <h2>Welcome Back</h2>
              <p>Enter your administrator credentials to continue.</p>
            </div>
          </div>

          <form className="aacp-admin-login-form" onSubmit={handleSubmit}>
            <label>
              <span>Admin Username</span>
              <div className="aacp-admin-login-input">
                <UserRound size={18} />
                <input
                  value={username}
                  onChange={(event) => {
                    setUsername(event.target.value);
                    setError("");
                  }}
                  placeholder="Enter admin username"
                  autoComplete="username"
                  autoFocus
                />
              </div>
            </label>

            <label>
              <span>Admin Password</span>
              <div className="aacp-admin-login-input">
                <LockKeyhole size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setError("");
                  }}
                  placeholder="Enter admin password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>

            {error && (
              <div className="aacp-admin-login-error" role="alert">
                <XCircle size={17} />
                <span>{error}</span>
              </div>
            )}

            <button
              className="aacp-admin-login-submit"
              type="submit"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <span className="aacp-admin-login-spinner" />
                  Checking...
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  Login to Dashboard
                  <ChevronRight size={17} />
                </>
              )}
            </button>
          </form>

          <div className="aacp-admin-login-security">
            <span>Authorized Asian Auto Clean Park administrators only.</span>
          </div>
        </div>
      </section>
    </main>
  );
}

function OverviewPage({
  bookings,
  onOpen,
  onStatusChange,
  onViewRequests,
}) {
  const today = toDateKey(new Date());

  const statistics = useMemo(() => {
    const pending = bookings.filter(
      (booking) => normalizeStatus(booking.status) === "pending",
    ).length;
    const approved = bookings.filter(
      (booking) => normalizeStatus(booking.status) === "approved",
    ).length;
    const rejected = bookings.filter(
      (booking) => normalizeStatus(booking.status) === "rejected",
    ).length;
    const revenue = bookings
      .filter((booking) =>
        ["approved", "completed"].includes(normalizeStatus(booking.status)),
      )
      .reduce((sum, booking) => sum + Number(booking.servicePrice || 0), 0);

    return { pending, approved, rejected, revenue };
  }, [bookings]);

  const todayBookings = bookings.filter(
    (booking) => booking.bookingDate === today,
  );

  const recentBookings = [...bookings]
    .sort(
      (first, second) =>
        new Date(second.createdAt || 0) - new Date(first.createdAt || 0),
    )
    .slice(0, 6);

  return (
    <>
      <section className="aacp-admin-stat-grid">
        <StatCard
          label="Pending Requests"
          value={statistics.pending}
          caption="Waiting for admin approval"
          icon={Clock3}
          tone="orange"
        />
        <StatCard
          label="Approved Requests"
          value={statistics.approved}
          caption="Confirmed appointments"
          icon={CheckCircle2}
          tone="green"
        />
        <StatCard
          label="Rejected Requests"
          value={statistics.rejected}
          caption="Rejected by administrator"
          icon={XCircle}
          tone="red"
        />
        <StatCard
          label="Approved Revenue"
          value={formatCurrency(statistics.revenue)}
          caption="Approved and completed services"
          icon={Wallet}
          tone="blue"
          isMoney
        />
      </section>

      <section className="aacp-admin-overview-grid">
        <div className="aacp-admin-panel aacp-admin-today-panel">
          <div className="aacp-admin-panel-heading">
            <div>
              <h2>Today&apos;s Appointments</h2>
              <p>{formatLongDate(today)}</p>
            </div>
            <span>{todayBookings.length}</span>
          </div>

          {todayBookings.length === 0 ? (
            <EmptyState
              icon={CalendarDays}
              title="No appointments today"
              message="Appointments booked for today will appear here."
            />
          ) : (
            <div className="aacp-admin-today-list">
              {todayBookings
                .sort((first, second) =>
                  String(first.timeSlot).localeCompare(String(second.timeSlot)),
                )
                .map((booking) => (
                  <button key={booking.id} onClick={() => onOpen(booking)}>
                    <span className="aacp-admin-time-box">
                      {formatTime(booking.timeSlot)}
                    </span>
                    <div>
                      <strong>{booking.name}</strong>
                      <small>{booking.service}</small>
                    </div>
                    <StatusBadge status={booking.status} />
                  </button>
                ))}
            </div>
          )}
        </div>

        <div className="aacp-admin-panel aacp-admin-activity-panel">
          <div className="aacp-admin-panel-heading">
            <div>
              <h2>Service Activity</h2>
              <p>Current appointment status distribution</p>
            </div>
          </div>

          <StatusProgress
            label="Pending"
            count={statistics.pending}
            total={bookings.length}
            tone="pending"
          />
          <StatusProgress
            label="Approved"
            count={statistics.approved}
            total={bookings.length}
            tone="approved"
          />
          <StatusProgress
            label="Rejected"
            count={statistics.rejected}
            total={bookings.length}
            tone="rejected"
          />
          <StatusProgress
            label="Completed"
            count={
              bookings.filter(
                (booking) =>
                  normalizeStatus(booking.status) === "completed",
              ).length
            }
            total={bookings.length}
            tone="completed"
          />
        </div>
      </section>

      <section className="aacp-admin-panel aacp-admin-table-panel">
        <div className="aacp-admin-panel-heading">
          <div>
            <h2>Recent Service Requests</h2>
            <p>Review the latest customer vehicle-service appointments.</p>
          </div>

          <button className="aacp-admin-text-button" onClick={onViewRequests}>
            View All Requests
            <ChevronRight size={16} />
          </button>
        </div>

        <RequestTable
          bookings={recentBookings}
          onOpen={onOpen}
          onStatusChange={onStatusChange}
          compact
        />
      </section>
    </>
  );
}

function StatCard({ label, value, caption, icon: Icon, tone, isMoney }) {
  return (
    <article className={`aacp-admin-stat-card tone-${tone}`}>
      <div className="aacp-admin-stat-card-top">
        <span className="aacp-admin-stat-icon">
          <Icon size={22} />
        </span>
        <span className="aacp-admin-stat-label">{label}</span>
      </div>

      <div className="aacp-admin-stat-value-row">
        <strong className={isMoney ? "is-money" : ""}>{value}</strong>
        <span className="aacp-admin-stat-signal">
          <i />
          <i />
          <i />
        </span>
      </div>

      <p className="aacp-admin-stat-caption">{caption}</p>
      <span className="aacp-admin-stat-decoration" />
    </article>
  );
}

function StatusProgress({ label, count, total, tone }) {
  const percentage = total ? Math.round((count / total) * 100) : 0;

  return (
    <div className="aacp-admin-progress-item">
      <div>
        <span>{label}</span>
        <strong>
          {count} <small>({percentage}%)</small>
        </strong>
      </div>
      <span className="aacp-admin-progress-track">
        <i
          className={`tone-${tone}`}
          style={{ width: `${percentage}%` }}
        />
      </span>
    </div>
  );
}

function CalendarPage({ bookings, onOpen }) {
  const [calendarMonth, setCalendarMonth] = useState(
    () => new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  );
  const [selectedDate, setSelectedDate] = useState(toDateKey(new Date()));

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

  const bookingsByDate = useMemo(() => {
    return bookings.reduce((result, booking) => {
      if (!booking.bookingDate) return result;
      if (!result[booking.bookingDate]) result[booking.bookingDate] = [];
      result[booking.bookingDate].push(booking);
      return result;
    }, {});
  }, [bookings]);

  const selectedBookings = [...(bookingsByDate[selectedDate] || [])].sort(
    (first, second) =>
      String(first.timeSlot).localeCompare(String(second.timeSlot)),
  );

  return (
    <section className="aacp-admin-calendar-layout">
      <div className="aacp-admin-panel aacp-admin-calendar-panel">
        <div className="aacp-admin-calendar-header">
          <button
            onClick={() =>
              setCalendarMonth(
                new Date(
                  calendarMonth.getFullYear(),
                  calendarMonth.getMonth() - 1,
                  1,
                ),
              )
            }
            aria-label="Previous month"
          >
            <ChevronLeft size={19} />
          </button>

          <div>
            <h2>
              {new Intl.DateTimeFormat("en-US", {
                month: "long",
                year: "numeric",
              }).format(calendarMonth)}
            </h2>
            <p>Click a date to view scheduled appointments.</p>
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
            <ChevronRight size={19} />
          </button>
        </div>

        <div className="aacp-admin-calendar-weekdays">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>

        <div className="aacp-admin-calendar-grid">
          {calendarDays.map((date) => {
            const dateKey = toDateKey(date);
            const dateBookings = bookingsByDate[dateKey] || [];
            const outside = date.getMonth() !== calendarMonth.getMonth();
            const selected = selectedDate === dateKey;
            const today = dateKey === toDateKey(new Date());

            return (
              <button
                key={dateKey}
                className={`${outside ? "is-outside" : ""} ${
                  selected ? "is-selected" : ""
                } ${today ? "is-today" : ""}`}
                onClick={() => setSelectedDate(dateKey)}
              >
                <span>{date.getDate()}</span>

                {dateBookings.length > 0 && (
                  <div className="aacp-admin-calendar-bookings">
                    {dateBookings.slice(0, 2).map((booking) => (
                      <small
                        key={booking.id}
                        className={`status-${normalizeStatus(booking.status)}`}
                      >
                        {formatTime(booking.timeSlot)} · {booking.service}
                      </small>
                    ))}
                    {dateBookings.length > 2 && (
                      <small className="is-more">
                        +{dateBookings.length - 2} more
                      </small>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <aside className="aacp-admin-panel aacp-admin-day-panel">
        <div className="aacp-admin-panel-heading">
          <div>
            <span className="aacp-admin-section-kicker">SELECTED DATE</span>
            <h2>{formatLongDate(selectedDate)}</h2>
            <p>{selectedBookings.length} appointment(s)</p>
          </div>
        </div>

        {selectedBookings.length === 0 ? (
          <EmptyState
            icon={CalendarDays}
            title="No appointments"
            message="There are no vehicle-service bookings for this date."
          />
        ) : (
          <div className="aacp-admin-day-list">
            {selectedBookings.map((booking) => (
              <button key={booking.id} onClick={() => onOpen(booking)}>
                <span>{formatTime(booking.timeSlot)}</span>
                <div>
                  <strong>{booking.name}</strong>
                  <small>{booking.service}</small>
                  <StatusBadge status={booking.status} />
                </div>
                <Eye size={17} />
              </button>
            ))}
          </div>
        )}
      </aside>
    </section>
  );
}

function RequestsPage({ bookings, onOpen, onStatusChange }) {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");

  const filteredBookings = useMemo(() => {
    const search = searchText.trim().toLowerCase();

    return [...bookings]
      .filter((booking) => {
        const searchableText = [
          booking.id,
          booking.name,
          booking.email,
          booking.contactNumber,
          booking.service,
        ]
          .join(" ")
          .toLowerCase();

        const matchesSearch = !search || searchableText.includes(search);
        const matchesStatus =
          statusFilter === "all" ||
          normalizeStatus(booking.status) === statusFilter;
        const matchesDate =
          !dateFilter || booking.bookingDate === dateFilter;

        return matchesSearch && matchesStatus && matchesDate;
      })
      .sort((first, second) => {
        const firstDate = `${first.bookingDate || ""} ${
          first.timeSlot || ""
        }`;
        const secondDate = `${second.bookingDate || ""} ${
          second.timeSlot || ""
        }`;
        return firstDate.localeCompare(secondDate);
      });
  }, [bookings, searchText, statusFilter, dateFilter]);

  return (
    <section className="aacp-admin-panel aacp-admin-table-panel">
      <div className="aacp-admin-panel-heading aacp-admin-request-heading">
        <div>
          <h2>Customer Appointment Requests</h2>
          <p>
            {filteredBookings.length} of {bookings.length} booking(s) shown
          </p>
        </div>

        <div className="aacp-admin-request-filters">
          <label className="aacp-admin-search-box">
            <Search size={17} />
            <input
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Search ID, customer, email or service"
            />
          </label>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="completed">Completed</option>
          </select>

          <input
            type="date"
            value={dateFilter}
            onChange={(event) => setDateFilter(event.target.value)}
            aria-label="Filter by appointment date"
          />
        </div>
      </div>

      <RequestTable
        bookings={filteredBookings}
        onOpen={onOpen}
        onStatusChange={onStatusChange}
      />
    </section>
  );
}

function RequestTable({
  bookings,
  onOpen,
  onStatusChange,
  compact = false,
}) {
  if (bookings.length === 0) {
    return (
      <EmptyState
        icon={ClipboardList}
        title="No service requests found"
        message="Customer appointment requests will appear here."
      />
    );
  }

  return (
    <div className="aacp-admin-table-wrap">
      <table className="aacp-admin-request-table">
        <thead>
          <tr>
            <th>Request</th>
            <th>Customer</th>
            <th>Date & Service</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking) => {
            const status = normalizeStatus(booking.status);

            return (
              <tr key={booking.id}>
                <td>
                  <strong>{booking.id || "AACP-REQUEST"}</strong>
                  <small>
                    {booking.createdAt
                      ? new Intl.DateTimeFormat("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        }).format(new Date(booking.createdAt))
                      : "Submission date unavailable"}
                  </small>
                </td>

                <td>
                  <strong>{booking.name || "Customer"}</strong>
                  <small>{booking.email || "No email"}</small>
                </td>

                <td>
                  <strong>
                    {formatDate(booking.bookingDate)} ·{" "}
                    {formatTime(booking.timeSlot)}
                  </strong>
                  <small>{booking.service || "Vehicle Service"}</small>
                </td>

                <td>
                  <strong>{formatCurrency(booking.servicePrice)}</strong>
                  <small>
                    {booking.paymentMethod === "bank"
                      ? "Bank transfer"
                      : booking.paymentMethod === "card"
                        ? "Card payment"
                        : "Payment not specified"}
                  </small>
                </td>

                <td>
                  <StatusBadge status={status} />
                </td>

                <td>
                  <div className="aacp-admin-table-actions">
                    <button
                      className="view"
                      onClick={() => onOpen(booking)}
                      title="View request"
                    >
                      <Eye size={16} />
                    </button>

                    {status === "pending" && (
                      <>
                        <button
                          className="approve"
                          onClick={() =>
                            onStatusChange(booking.id, "approved")
                          }
                          title="Approve request"
                        >
                          <Check size={16} />
                        </button>
                        <button
                          className="reject"
                          onClick={() =>
                            onStatusChange(booking.id, "rejected")
                          }
                          title="Reject request"
                        >
                          <X size={16} />
                        </button>
                      </>
                    )}

                    {status === "approved" && (
                      <button
                        className="complete"
                        onClick={() =>
                          onStatusChange(booking.id, "completed")
                        }
                        title="Mark service as completed"
                      >
                        <ShieldCheck size={16} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {compact && bookings.length >= 6 && (
        <div className="aacp-admin-table-note">
          Showing the six most recent booking requests.
        </div>
      )}
    </div>
  );
}

function ReportsPage({ bookings }) {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const reportBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const date = booking.bookingDate || "";
      const status = normalizeStatus(booking.status);

      const matchesFrom = !fromDate || date >= fromDate;
      const matchesTo = !toDate || date <= toDate;
      const matchesStatus =
        statusFilter === "all" || status === statusFilter;

      return matchesFrom && matchesTo && matchesStatus;
    });
  }, [bookings, fromDate, toDate, statusFilter]);

  const serviceReport = useMemo(() => {
    const result = reportBookings.reduce((summary, booking) => {
      const service = booking.service || "Vehicle Service";

      if (!summary[service]) {
        summary[service] = {
          service,
          total: 0,
          approved: 0,
          completed: 0,
          revenue: 0,
        };
      }

      const status = normalizeStatus(booking.status);
      summary[service].total += 1;

      if (status === "approved") summary[service].approved += 1;
      if (status === "completed") summary[service].completed += 1;
      if (["approved", "completed"].includes(status)) {
        summary[service].revenue += Number(booking.servicePrice || 0);
      }

      return summary;
    }, {});

    return Object.values(result).sort((first, second) => {
      if (second.total !== first.total) return second.total - first.total;
      return second.revenue - first.revenue;
    });
  }, [reportBookings]);

  const totalRevenue = reportBookings
    .filter((booking) =>
      ["approved", "completed"].includes(normalizeStatus(booking.status)),
    )
    .reduce((sum, booking) => sum + Number(booking.servicePrice || 0), 0);

  const exportCsv = () => {
    const rows = [
      [
        "Request ID",
        "Customer",
        "Email",
        "Contact",
        "Service",
        "Service Price",
        "Booking Date",
        "Time",
        "Payment Method",
        "Status",
      ],
      ...reportBookings.map((booking) => [
        booking.id || "",
        booking.name || "",
        booking.email || "",
        booking.contactNumber || "",
        booking.service || "",
        booking.servicePrice || 0,
        booking.bookingDate || "",
        booking.timeSlot || "",
        booking.paymentMethod || "",
        normalizeStatus(booking.status),
      ]),
    ];

    const csv = rows
      .map((row) =>
        row
          .map((value) => `"${String(value).replaceAll('"', '""')}"`)
          .join(","),
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `aacp-booking-report-${toDateKey(new Date())}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <>
      <section className="aacp-admin-report-filters">
        <label>
          <span>From Date</span>
          <input
            type="date"
            value={fromDate}
            onChange={(event) => setFromDate(event.target.value)}
          />
        </label>

        <label>
          <span>To Date</span>
          <input
            type="date"
            value={toDate}
            onChange={(event) => setToDate(event.target.value)}
          />
        </label>

        <label>
          <span>Status</span>
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="completed">Completed</option>
          </select>
        </label>

        <button onClick={exportCsv} disabled={reportBookings.length === 0}>
          <Download size={17} />
          Export CSV
        </button>
      </section>

      <section className="aacp-admin-stat-grid aacp-admin-report-stat-grid">
        <StatCard
          label="Total Bookings"
          value={reportBookings.length}
          caption="Bookings in selected report"
          icon={ClipboardList}
          tone="orange"
        />
        <StatCard
          label="Approved"
          value={
            reportBookings.filter(
              (booking) =>
                normalizeStatus(booking.status) === "approved",
            ).length
          }
          caption="Confirmed appointments"
          icon={CheckCircle2}
          tone="green"
        />
        <StatCard
          label="Completed"
          value={
            reportBookings.filter(
              (booking) =>
                normalizeStatus(booking.status) === "completed",
            ).length
          }
          caption="Completed vehicle services"
          icon={ShieldCheck}
          tone="blue"
        />
        <StatCard
          label="Report Revenue"
          value={formatCurrency(totalRevenue)}
          caption="Approved and completed value"
          icon={Wallet}
          tone="blue"
          isMoney
        />
      </section>

      <section className="aacp-admin-panel aacp-admin-report-panel">
        <div className="aacp-admin-panel-heading">
          <div>
            <h2>Service Performance</h2>
            <p>
              Booking count and approved revenue grouped by vehicle service.
            </p>
          </div>
        </div>

        {serviceReport.length === 0 ? (
          <EmptyState
            icon={BarChart3}
            title="No report data"
            message="Change the filters or wait for customer bookings."
          />
        ) : (
          <div className="aacp-admin-table-wrap">
            <table className="aacp-admin-report-table">
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Total Bookings</th>
                  <th>Approved</th>
                  <th>Completed</th>
                  <th>Revenue</th>
                  <th>Demand</th>
                </tr>
              </thead>

              <tbody>
                {serviceReport.map((item) => {
                  const maximum = Math.max(
                    ...serviceReport.map((service) => service.total),
                    1,
                  );
                  const width = Math.max(
                    8,
                    Math.round((item.total / maximum) * 100),
                  );

                  return (
                    <tr key={item.service}>
                      <td>
                        <span className="aacp-admin-service-cell">
                          <Wrench size={17} />
                          <strong>{item.service}</strong>
                        </span>
                      </td>
                      <td>{item.total}</td>
                      <td>{item.approved}</td>
                      <td>{item.completed}</td>
                      <td>{formatCurrency(item.revenue)}</td>
                      <td>
                        <span className="aacp-admin-demand-track">
                          <i style={{ width: `${width}%` }} />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}

function StatusBadge({ status }) {
  const normalized = normalizeStatus(status);

  return (
    <span className={`aacp-admin-status status-${normalized}`}>
      {normalized}
    </span>
  );
}

function EmptyState({ icon: Icon, title, message }) {
  return (
    <div className="aacp-admin-empty-state">
      <span>
        <Icon size={28} />
      </span>
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
}

function BookingDetailsModal({ booking, onClose, onStatusChange }) {
  const status = normalizeStatus(booking.status);
  const receiptAvailable =
    booking.paymentProofUrl || booking.bankSlipData || booking.receiptUrl;

  return (
    <div
      className="aacp-admin-modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section className="aacp-admin-modal">
        <header>
          <div>
            <span>SERVICE REQUEST</span>
            <h2>{booking.id || "AACP Booking"}</h2>
            <StatusBadge status={status} />
          </div>

          <button onClick={onClose} aria-label="Close request details">
            <X size={20} />
          </button>
        </header>

        <div className="aacp-admin-modal-content">
          <div className="aacp-admin-modal-summary">
            <span>
              <Car size={25} />
            </span>
            <div>
              <small>Selected Vehicle Service</small>
              <h3>{booking.service || "Vehicle Service"}</h3>
              <strong>{formatCurrency(booking.servicePrice)}</strong>
            </div>
          </div>

          <div className="aacp-admin-detail-grid">
            <DetailItem
              icon={User}
              label="Customer"
              value={booking.name || "Not provided"}
            />
            <DetailItem
              icon={Mail}
              label="Email"
              value={booking.email || "Not provided"}
            />
            <DetailItem
              icon={Phone}
              label="Contact Number"
              value={booking.contactNumber || "Not provided"}
            />
            <DetailItem
              icon={CalendarDays}
              label="Appointment"
              value={`${formatDate(booking.bookingDate)} · ${formatTime(
                booking.timeSlot,
              )}`}
            />
            <DetailItem
              icon={MapPin}
              label="Address"
              value={booking.address || "Not provided"}
              full
            />
            <DetailItem
              icon={CreditCard}
              label="Payment Method"
              value={
                booking.paymentMethod === "bank"
                  ? "Bank Transfer"
                  : booking.paymentMethod === "card"
                    ? "Card Payment"
                    : "Not specified"
              }
            />
            <DetailItem
              icon={FileText}
              label="Payment Reference"
              value={booking.paymentReference || "Not available"}
            />
          </div>

          <div className="aacp-admin-payment-proof">
            <div>
              <FileText size={20} />
              <span>
                <strong>Payment verification</strong>
                <small>
                  {receiptAvailable
                    ? "A payment document is available for review."
                    : booking.paymentMethod === "bank"
                      ? "The current customer page stores the receipt filename only."
                      : "Verify the card transaction using your payment gateway."}
                </small>
              </span>
            </div>

            {receiptAvailable && (
              <a
                href={
                  booking.paymentProofUrl ||
                  booking.bankSlipData ||
                  booking.receiptUrl
                }
                target="_blank"
                rel="noreferrer"
              >
                View Receipt
              </a>
            )}
          </div>
        </div>

        <footer>
          {status === "pending" && (
            <>
              <button
                className="aacp-admin-modal-reject"
                onClick={() => onStatusChange(booking.id, "rejected")}
              >
                <XCircle size={17} />
                Reject
              </button>
              <button
                className="aacp-admin-modal-approve"
                onClick={() => onStatusChange(booking.id, "approved")}
              >
                <CheckCircle2 size={17} />
                Approve Booking
              </button>
            </>
          )}

          {status === "approved" && (
            <button
              className="aacp-admin-modal-complete"
              onClick={() => onStatusChange(booking.id, "completed")}
            >
              <ShieldCheck size={17} />
              Mark as Completed
            </button>
          )}

          {["rejected", "completed", "cancelled"].includes(status) && (
            <button className="aacp-admin-modal-close-button" onClick={onClose}>
              Close
            </button>
          )}
        </footer>
      </section>
    </div>
  );
}

function DetailItem({ icon: Icon, label, value, full = false }) {
  return (
    <div className={`aacp-admin-detail-item ${full ? "is-full" : ""}`}>
      <span>
        <Icon size={17} />
      </span>
      <div>
        <small>{label}</small>
        <strong>{value}</strong>
      </div>
    </div>
  );
}