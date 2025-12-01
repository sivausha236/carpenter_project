from django.contrib import admin
from .models import Booking

class BookingAdmin(admin.ModelAdmin):
    list_display = ("name", "phone", "address", "problem", "date", "time", "created_at")
    list_filter = ("date", "created_at")
    search_fields = ("name", "phone", "address", "problem")
    ordering = ("-created_at",)  # newest first

admin.site.register(Booking, BookingAdmin)

