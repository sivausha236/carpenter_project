from django.urls import path
from . import views

urlpatterns = [
    path("", views.dashboard_home, name="dashboard"),
    path("complete/<int:booking_id>/", views.mark_completed, name="mark_completed"),
]
