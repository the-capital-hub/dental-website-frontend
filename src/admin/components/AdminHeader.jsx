import { useEffect, useRef, useState } from "react";

import {
  Bell,
  Check,
  ChevronDown,
  Clock3,
  LogOut,
  Menu,
  Search,
  Trash2,
  UserRound,
  X,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import "../styles/admin.css";

const API_URL =
  "https://dental-website-backend.onrender.com/api/notifications";


const AdminHeader = ({
  title = "Dashboard",
  subtitle = "Welcome back to your clinic workspace.",
  onMenuClick,
}) => {

  const navigate = useNavigate();


  // =====================================================
  // PROFILE
  // =====================================================

  const [profileOpen, setProfileOpen] =
    useState(false);


  const profileRef = useRef(null);


  // =====================================================
  // NOTIFICATIONS
  // =====================================================

  const [notificationOpen, setNotificationOpen] =
    useState(false);

  const notificationRef = useRef(null);

  const [notifications, setNotifications] =
    useState([]);

  const [unreadCount, setUnreadCount] =
    useState(0);

  const [notificationLoading, setNotificationLoading] =
    useState(false);


  // =====================================================
  // ADMIN DATA
  // =====================================================

  const [admin, setAdmin] = useState({
    name: "Admin",
    email: "",
    role: "Administrator",
  });


  // =====================================================
  // TOKEN
  // =====================================================

  const getToken = () => {
    return (
      localStorage.getItem("adminToken") ||
      sessionStorage.getItem("adminToken") ||
      localStorage.getItem("token") ||
      ""
    );
  };


  // =====================================================
  // HEADERS
  // =====================================================

  const getHeaders = () => {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    };
  };


  // =====================================================
  // LOAD ADMIN DATA
  // =====================================================

  useEffect(() => {

    try {

      const storedAdmin =
        localStorage.getItem("adminData") ||
        sessionStorage.getItem("adminData");


      if (storedAdmin) {

        const parsedAdmin =
          JSON.parse(storedAdmin);


        setAdmin({

          name:
            parsedAdmin.name ||
            "Admin",

          email:
            parsedAdmin.email ||
            "",

          role:
            parsedAdmin.role === "admin"
              ? "Administrator"
              : parsedAdmin.role ||
                "Administrator",

        });

      }

    } catch (error) {

      console.error(
        "Failed to load admin data:",
        error
      );

    }

  }, []);


  // =====================================================
  // FETCH NOTIFICATIONS
  // =====================================================

  const fetchNotifications = async () => {

    try {

      const token = getToken();


      if (!token) {
        return;
      }


      setNotificationLoading(true);


      const response =
        await fetch(
          API_URL,
          {
            method: "GET",
            headers: getHeaders(),
          }
        );


      const result =
        await response.json();


      if (!response.ok) {

        throw new Error(
          result.message ||
            "Failed to fetch notifications"
        );

      }


      setNotifications(
        result.data || []
      );


      setUnreadCount(
        result.unreadCount || 0
      );


    } catch (error) {

      console.error(
        "Fetch Notifications Error:",
        error
      );

    } finally {

      setNotificationLoading(false);

    }

  };


  // =====================================================
  // INITIAL NOTIFICATIONS
  // =====================================================

  useEffect(() => {

    fetchNotifications();

  }, []);


  // =====================================================
  // AUTO REFRESH NOTIFICATIONS
  // =====================================================

  useEffect(() => {

    const interval =
      setInterval(() => {

        fetchNotifications();

      }, 30000);


    return () => {

      clearInterval(interval);

    };

  }, []);


  // =====================================================
  // CLOSE DROPDOWNS
  // =====================================================

  useEffect(() => {

    const handleOutsideClick = (
      event
    ) => {

      if (
        profileRef.current &&
        !profileRef.current.contains(
          event.target
        )
      ) {

        setProfileOpen(false);

      }


      if (
        notificationRef.current &&
        !notificationRef.current.contains(
          event.target
        )
      ) {

        setNotificationOpen(false);

      }

    };


    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );


    return () => {

      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );

    };

  }, []);


  // =====================================================
  // OPEN NOTIFICATIONS
  // =====================================================

  const handleNotificationClick = () => {

    setNotificationOpen(
      (previous) =>
        !previous
    );

    setProfileOpen(false);

  };


  // =====================================================
  // MARK SINGLE NOTIFICATION AS READ
  // =====================================================

  const markNotificationAsRead =
    async (notification) => {

      try {

        if (notification.isRead) {

          return;

        }


        const response =
          await fetch(
            `${API_URL}/${notification._id}/read`,
            {
              method: "PUT",
              headers: getHeaders(),
            }
          );


        const result =
          await response.json();


        if (!response.ok) {

          throw new Error(
            result.message ||
              "Failed to mark notification"
          );

        }


        setNotifications(
          (previous) =>
            previous.map(
              (item) =>
                item._id ===
                notification._id
                  ? {
                      ...item,
                      isRead: true,
                    }
                  : item
            )
        );


        setUnreadCount(
          (previous) =>
            Math.max(
              0,
              previous - 1
            )
        );

      } catch (error) {

        console.error(
          "Mark Notification Error:",
          error
        );

      }

    };


  // =====================================================
  // MARK ALL AS READ
  // =====================================================

  const markAllAsRead = async () => {

    try {

      const response =
        await fetch(
          `${API_URL}/read-all`,
          {
            method: "PUT",
            headers: getHeaders(),
          }
        );


      const result =
        await response.json();


      if (!response.ok) {

        throw new Error(
          result.message ||
            "Failed to mark notifications"
        );

      }


      setNotifications(
        (previous) =>
          previous.map(
            (notification) => ({
              ...notification,
              isRead: true,
            })
          )
      );


      setUnreadCount(0);

    } catch (error) {

      console.error(
        "Mark All Notifications Error:",
        error
      );

    }

  };


  // =====================================================
  // DELETE NOTIFICATION
  // =====================================================

  const deleteNotification =
    async (notificationId) => {

      try {

        const response =
          await fetch(
            `${API_URL}/${notificationId}`,
            {
              method: "DELETE",
              headers: getHeaders(),
            }
          );


        const result =
          await response.json();


        if (!response.ok) {

          throw new Error(
            result.message ||
              "Failed to delete notification"
          );

        }


        const deletedNotification =
          notifications.find(
            (item) =>
              item._id ===
              notificationId
          );


        setNotifications(
          (previous) =>
            previous.filter(
              (item) =>
                item._id !==
                notificationId
            )
        );


        if (
          deletedNotification &&
          !deletedNotification.isRead
        ) {

          setUnreadCount(
            (previous) =>
              Math.max(
                0,
                previous - 1
              )
          );

        }

      } catch (error) {

        console.error(
          "Delete Notification Error:",
          error
        );

      }

    };


  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {

    localStorage.removeItem(
      "adminToken"
    );

    localStorage.removeItem(
      "adminData"
    );


    sessionStorage.removeItem(
      "adminToken"
    );

    sessionStorage.removeItem(
      "adminData"
    );


    setProfileOpen(false);

    setNotificationOpen(false);


    navigate(
      "/admin/login",
      {
        replace: true,
      }
    );

  };


  // =====================================================
  // PROFILE INITIAL
  // =====================================================

  const profileInitial =
    admin.name
      ?.charAt(0)
      ?.toUpperCase() || "A";


  // =====================================================
  // NOTIFICATION ICON
  // =====================================================

  const getNotificationIcon = (
    type
  ) => {

    if (
      type ===
      "appointment"
    ) {

      return (
        <Clock3 size={15} />
      );

    }


    if (
      type ===
      "lead"
    ) {

      return (
        <UserRound size={15} />
      );

    }


    if (
      type ===
      "patient"
    ) {

      return (
        <UserRound size={15} />
      );

    }


    return (
      <Bell size={15} />
    );

  };


  // =====================================================
  // TIME FORMAT
  // =====================================================

  const formatTime = (
    date
  ) => {

    if (!date) {
      return "";
    }


    const notificationDate =
      new Date(date);


    if (
      Number.isNaN(
        notificationDate.getTime()
      )
    ) {

      return "";

    }


    const now =
      new Date();


    const difference =
      now.getTime() -
      notificationDate.getTime();


    const minutes =
      Math.floor(
        difference /
          (1000 * 60)
      );


    if (minutes < 1) {

      return "Just now";

    }


    if (minutes < 60) {

      return `${minutes} min ago`;

    }


    const hours =
      Math.floor(
        minutes / 60
      );


    if (hours < 24) {

      return `${hours} hr ago`;

    }


    const days =
      Math.floor(
        hours / 24
      );


    if (days < 7) {

      return `${days} day${
        days > 1
          ? "s"
          : ""
      } ago`;

    }


    return notificationDate.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
      }
    );

  };


  return (

    <header className="admin-header">

      {/* =====================================================
          LEFT
      ===================================================== */}

      <div className="admin-header-left">

        <button
          type="button"
          className="admin-mobile-menu"
          onClick={onMenuClick}
          aria-label="Open sidebar"
        >
          <Menu size={19} />
        </button>


        <div className="admin-header-heading">

          <h1>
            {title}
          </h1>

          <p>
            {subtitle}
          </p>

        </div>

      </div>


      {/* =====================================================
          RIGHT
      ===================================================== */}

      <div className="admin-header-right">

        {/* =================================================
            SEARCH
        ================================================= */}

        <button
          type="button"
          className="admin-header-icon-button"
          aria-label="Search"
        >
          <Search size={17} />
        </button>


        {/* =================================================
            NOTIFICATIONS
        ================================================= */}

        <div
          className="admin-header-notification-wrapper"
          ref={notificationRef}
        >

          <button
            type="button"
            className="admin-header-icon-button admin-notification-button"
            onClick={
              handleNotificationClick
            }
            aria-label="Notifications"
            aria-expanded={
              notificationOpen
            }
          >

            <Bell size={17} />


            {unreadCount > 0 && (

              <span className="admin-notification-dot" />

            )}


            {unreadCount > 0 && (

              <span className="admin-notification-count">

                {unreadCount > 99
                  ? "99+"
                  : unreadCount}

              </span>

            )}

          </button>


          {/* =================================================
              NOTIFICATION DROPDOWN
          ================================================= */}

          {notificationOpen && (

            <div className="admin-notification-dropdown">

              <div className="admin-notification-header">

                <div>

                  <strong>
                    Notifications
                  </strong>

                  <span>
                    {unreadCount > 0
                      ? `${unreadCount} unread`
                      : "You're all caught up"}
                  </span>

                </div>


                <button
                  type="button"
                  onClick={() =>
                    setNotificationOpen(
                      false
                    )
                  }
                  aria-label="Close notifications"
                >
                  <X size={16} />
                </button>

              </div>


              {unreadCount > 0 && (

                <button
                  type="button"
                  className="admin-notification-read-all"
                  onClick={
                    markAllAsRead
                  }
                >

                  <Check size={14} />

                  Mark all as read

                </button>

              )}


              <div className="admin-notification-list">

                {notificationLoading ? (

                  <div className="admin-notification-empty">

                    Loading notifications...

                  </div>

                ) : notifications.length ===
                  0 ? (

                  <div className="admin-notification-empty">

                    <Bell size={22} />

                    <strong>
                      No notifications
                    </strong>

                    <span>
                      New activity will appear here.
                    </span>

                  </div>

                ) : (

                  notifications.map(
                    (notification) => (

                      <div
                        key={
                          notification._id
                        }
                        className={`admin-notification-item ${
                          !notification.isRead
                            ? "admin-notification-unread"
                            : ""
                        }`}
                      >

                        <button
                          type="button"
                          className="admin-notification-content"
                          onClick={() =>
                            markNotificationAsRead(
                              notification
                            )
                          }
                        >

                          <span className="admin-notification-item-icon">

                            {getNotificationIcon(
                              notification.type
                            )}

                          </span>


                          <span className="admin-notification-item-text">

                            <strong>
                              {
                                notification.title
                              }
                            </strong>

                            <span>
                              {
                                notification.message
                              }
                            </span>

                            <small>
                              {formatTime(
                                notification.createdAt
                              )}
                            </small>

                          </span>

                        </button>


                        <button
                          type="button"
                          className="admin-notification-delete"
                          onClick={() =>
                            deleteNotification(
                              notification._id
                            )
                          }
                          aria-label="Delete notification"
                        >
                          <Trash2
                            size={13}
                          />
                        </button>

                      </div>

                    )
                  )

                )}

              </div>

            </div>

          )}

        </div>


        {/* =================================================
            DIVIDER
        ================================================= */}

        <span className="admin-header-divider" />


        {/* =================================================
            PROFILE
        ================================================= */}

        <div
          className="admin-header-profile-wrapper"
          ref={profileRef}
        >

          <button
            type="button"
            className="admin-header-profile"
            onClick={() =>
              setProfileOpen(
                (previous) =>
                  !previous
              )
            }
            aria-expanded={
              profileOpen
            }
            aria-haspopup="menu"
          >

            <span className="admin-header-avatar">

              {profileInitial}

            </span>


            <span className="admin-header-profile-info">

              <strong>
                {admin.name}
              </strong>

              <small>
                {admin.role}
              </small>

            </span>


            <ChevronDown
              size={14}
              className={
                profileOpen
                  ? "admin-profile-chevron-open"
                  : ""
              }
            />

          </button>


          {/* =================================================
              PROFILE DROPDOWN
          ================================================= */}

          {profileOpen && (

            <div
              className="admin-profile-dropdown"
              role="menu"
            >

              <div className="admin-profile-dropdown-user">

                <div className="admin-profile-dropdown-avatar">

                  {profileInitial}

                </div>


                <div>

                  <strong>
                    {admin.name}
                  </strong>

                  <span>
                    {admin.email}
                  </span>

                </div>

              </div>


              <div className="admin-profile-dropdown-divider" />


              <button
                type="button"
                className="admin-profile-logout"
                onClick={
                  handleLogout
                }
                role="menuitem"
              >

                <LogOut size={16} />

                <span>
                  Sign out
                </span>

              </button>

            </div>

          )}

        </div>

      </div>

    </header>

  );

};


export default AdminHeader;