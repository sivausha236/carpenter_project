from twilio.rest import Client
import os
from dotenv import load_dotenv

load_dotenv()  # Loads .env file

# Load credentials correctly from .env
TWILIO_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_NUMBER = os.getenv("TWILIO_NUMBER")  
ADMIN_NUMBER = os.getenv("ADMIN_NUMBER")    # Your father's number

def send_sms_message(message):
    try:
        client = Client(TWILIO_SID, TWILIO_AUTH)

        client.messages.create(
            body=message,
            from_=TWILIO_NUMBER,
            to=ADMIN_NUMBER
        )

        print("SMS sent successfully!")

    except Exception as e:
        print("Error sending SMS:", e)
