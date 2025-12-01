from django.shortcuts import render, redirect
from bookings.models import Booking
from datetime import date

def dashboard_home(request):
    today = Booking.objects.filter(date=date.today(), completed=False)
    upcoming = Booking.objects.filter(date__gt=date.today(), completed=False)
    completed = Booking.objects.filter(completed=True)

    return render(request, "dashboard_home.html", {
        "today": today,
        "upcoming": upcoming,
        "completed": completed
    })

def mark_completed(request, booking_id):
    booking = Booking.objects.get(id=booking_id)
    booking.completed = True
    booking.save()
    return redirect("dashboard")

