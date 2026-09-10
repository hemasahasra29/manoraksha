from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -----------------------------
# DATABASE
# -----------------------------

def get_db():
    conn = sqlite3.connect("manoraksha.db")
    conn.row_factory = sqlite3.Row
    return conn


def create_tables():
    conn = get_db()

    conn.execute("""
        CREATE TABLE IF NOT EXISTS emergency_contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id TEXT NOT NULL,
            name TEXT NOT NULL,
            phone TEXT NOT NULL
        )
    """)

    conn.commit()
    conn.close()


create_tables()


# -----------------------------
# DATA MODELS
# -----------------------------

class ContactRequest(BaseModel):
    user_id: str
    name: str
    phone: str


class SOSRequest(BaseModel):
    latitude: float
    longitude: float
    user_id: str


# -----------------------------
# HOME
# -----------------------------

@app.get("/")
def home():
    return {
        "message": "ManoRaksha SOS backend is running"
    }


# -----------------------------
# SAVE EMERGENCY CONTACT
# -----------------------------

@app.post("/api/contacts")
def add_contact(contact: ContactRequest):

    if not contact.name.strip():
        raise HTTPException(
            status_code=400,
            detail="Contact name is required"
        )

    if not contact.phone.strip():
        raise HTTPException(
            status_code=400,
            detail="Phone number is required"
        )

    conn = get_db()

    conn.execute(
        """
        INSERT INTO emergency_contacts
        (user_id, name, phone)
        VALUES (?, ?, ?)
        """,
        (
            contact.user_id,
            contact.name,
            contact.phone
        )
    )

    conn.commit()
    conn.close()

    return {
        "success": True,
        "message": "Emergency contact saved"
    }


# -----------------------------
# GET CONTACTS FOR USER
# -----------------------------

@app.get("/api/contacts/{user_id}")
def get_contacts(user_id: str):

    conn = get_db()

    contacts = conn.execute(
        """
        SELECT id, name, phone
        FROM emergency_contacts
        WHERE user_id = ?
        """,
        (user_id,)
    ).fetchall()

    conn.close()

    return {
        "success": True,
        "contacts": [dict(contact) for contact in contacts]
    }


# -----------------------------
# SOS
# -----------------------------

@app.post("/api/sos")
async def trigger_sos(request: SOSRequest):

    latitude = request.latitude
    longitude = request.longitude
    user_id = request.user_id

    # Validate location

    if not (-90 <= latitude <= 90):
        raise HTTPException(
            status_code=400,
            detail="Invalid latitude"
        )

    if not (-180 <= longitude <= 180):
        raise HTTPException(
            status_code=400,
            detail="Invalid longitude"
        )

    # Find victim's emergency contacts

    conn = get_db()

    contacts = conn.execute(
        """
        SELECT name, phone
        FROM emergency_contacts
        WHERE user_id = ?
        """,
        (user_id,)
    ).fetchall()

    conn.close()

    if not contacts:
        raise HTTPException(
            status_code=400,
            detail="No emergency contacts saved"
        )

    # Google Maps location

    location_link = (
        f"https://www.google.com/maps"
        f"?q={latitude},{longitude}"
    )

    # Message that will eventually be sent by SMS

    message = (
        "🚨 MANORAKSHA SOS ALERT 🚨\n\n"
        f"User {user_id} may need immediate help.\n\n"
        f"Current location:\n"
        f"{location_link}\n\n"
        "Please contact them immediately."
    )

    # --------------------------------
    # TEMPORARY TEST
    # --------------------------------

    print("\n==============================")
    print("🚨 SOS ALERT")
    print("==============================")

    print("Victim:", user_id)
    print("Latitude:", latitude)
    print("Longitude:", longitude)
    print("Location:", location_link)

    print("\nContacts to notify:")

    for contact in contacts:
        print(
            f"Name: {contact['name']}"
        )
        print(
            f"Phone: {contact['phone']}"
        )

    print("\nMessage:")
    print(message)

    print("==============================\n")

    # --------------------------------
    # REAL SMS WILL GO HERE
    # --------------------------------

    # send_sms(contact["phone"], message)

    return {
        "success": True,
        "message": "SOS processed successfully",
        "contacts_notified": len(contacts),
        "location": location_link
    }
