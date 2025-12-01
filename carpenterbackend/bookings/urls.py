from django.urls import path
from .views import (
    create_booking,
    admin_list_bookings,
    admin_login,
    update_status,
    delete_booking,
    send_contact_message,
    list_contact_messages
)

urlpatterns = [

    # --------------------------
    # Public Booking API
    # --------------------------
    path("create/", create_booking, name="create-booking"),

    # --------------------------
    # Admin Login
    # --------------------------
    path("admin/login/", admin_login, name="admin-login"),

    # --------------------------
    # Admin Booking Management
    # --------------------------
    path("admin/bookings/", admin_list_bookings, name="admin-list"),
    path("admin/update-status/<int:pk>/", update_status, name="update-status"),
    path("admin/delete/<int:pk>/", delete_booking, name="delete-booking"),

    # --------------------------
    # Contact Form (Frontend)
    # --------------------------
    path("contact/send/", send_contact_message, name="contact-send"),
    path("contact/list/", list_contact_messages, name="contact-list"),
]
