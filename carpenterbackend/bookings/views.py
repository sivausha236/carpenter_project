from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404
from django.http import JsonResponse

from .models import Booking, ContactMessage
from .serializers import BookingSerializer
from django.conf import settings
from twilio.rest import Client
from .serializers import BookingSerializer



# =======================================
# PUBLIC: Create Booking
# =======================================
# =======================================
# PUBLIC: Create Booking + SMS Send
# =======================================
@api_view(["POST"])
@permission_classes([AllowAny])
def create_booking(request):
    serializer = BookingSerializer(data=request.data)

    if serializer.is_valid():
        booking = serializer.save()

        # ----------------------------------------------------
        # SEND SMS TO FATHER (ADMIN)
        # ----------------------------------------------------
        try:
            account_sid = settings.TWILIO_ACCOUNT_SID
            auth_token = settings.TWILIO_AUTH_TOKEN
            client = Client(account_sid, auth_token)

            sms_body = (
                f"New Booking Received:\n"
                f"Name: {booking.name}\n"
                f"Phone: {booking.phone}\n"
                f"Address: {booking.address}\n"
                f"Work: {booking.problem}\n"
                f"Date: {booking.date}\n"
                f"Time: {booking.time}"
            )

            client.messages.create(
                body=sms_body,
                from_=settings.TWILIO_NUMBER,
                to=settings.ADMIN_NUMBER,
            )

        except Exception as e:
            print("SMS sending failed:", e)

        # ----------------------------------------------------

        return Response({"success": True, "message": "Booking Created"}, 201)

    return Response(serializer.errors, 400)
    



# =======================================
# ADMIN: Login (Simple Password Only)
# =======================================
@api_view(["POST"])
@permission_classes([AllowAny])
def admin_login(request):
    password = request.data.get("password")

    if password != "admin123":
        return Response({"error": "Invalid password"}, status=401)

    return Response({"message": "Login successful"}, status=200)


# =======================================
# ADMIN: List Bookings (NO AUTH CHECK)
# =======================================
@api_view(["GET"])
@permission_classes([AllowAny])  # frontend will handle blocking
def admin_list_bookings(request):
    bookings = Booking.objects.all().order_by("-date", "-time", "-id")
    serializer = BookingSerializer(bookings, many=True)
    return Response(serializer.data, status=200)


# =======================================
# ADMIN: Update Booking Status
# =======================================
@api_view(["PATCH"])
@permission_classes([AllowAny])  # Your frontend will block non-admin
def update_status(request, pk):
    booking = get_object_or_404(Booking, pk=pk)
    new_status = request.data.get("status")

    if not new_status:
        return Response({"error": "Status required"}, 400)

    booking.status = new_status
    booking.save()

    return Response({"success": True, "status": booking.status}, 200)


# =======================================
# ADMIN: Delete Booking
# =======================================
@api_view(["DELETE"])
@permission_classes([AllowAny])
def delete_booking(request, pk):
    booking = get_object_or_404(Booking, pk=pk)
    booking.delete()
    return Response({"deleted": True}, 200)


# =======================================
# PUBLIC: Contact Form Submission
# =======================================
@api_view(["POST"])
@permission_classes([AllowAny])
def send_contact_message(request):
    name = request.data.get("name")
    email = request.data.get("email")
    message = request.data.get("message")

    if not name or not email or not message:
        return Response({"error": "All fields required"}, 400)

    ContactMessage.objects.create(
        name=name,
        email=email,
        message=message
    )

    return Response({"success": "Message sent successfully"}, 200)


# =======================================
# ADMIN: List Contact Messages
# =======================================
@api_view(["GET"])
@permission_classes([AllowAny])
def list_contact_messages(request):
    messages = ContactMessage.objects.all().order_by("-created_at")

    data = [
        {
            "id": msg.id,
            "name": msg.name,
            "email": msg.email,
            "message": msg.message,
            "created_at": msg.created_at.strftime("%Y-%m-%d %H:%M"),
        }
        for msg in messages
    ]

    return JsonResponse(data, safe=False)
