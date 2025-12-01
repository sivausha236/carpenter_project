from twilio.rest import Client
from django.conf import settings

def send_sms(to, message):
    try:
        client = Client(settings.TWILIO_SID, settings.TWILIO_AUTH)
        client.messages.create(
            body=message,
            from_=settings.TWILIO_NUMBER,
            to=f"+91{to}"
        )
    except Exception as e:
        print("SMS Error:", e)
