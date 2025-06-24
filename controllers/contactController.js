import { Contact } from "../models/Contact.js";

// This function identifies a contact based on email or phone number
// It creates a new contact if no match is found, or links to an existing contact 
export const identifyContact = async (req, res, next) => {
  try {
    const { email, phoneNumber } = req.body;
    if (!email && !phoneNumber) {
      return res.status(400).json({ error: "Email or phoneNumber is required" });
    }

    function validatePhoneNumber(phone) {
      const phoneRegex = /^\d{10}$/;
      return phoneRegex.test(phone);
    }

    function validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    if (!validatePhoneNumber(phoneNumber) || !validateEmail(email)) {
      return res.status(400).json({ error: "Invalid Phone Number or Email." });
    }
    const matchedContacts = await Contact.find({
      $or: [
        { email: email || null },
        { phoneNumber: phoneNumber || null }
      ]
    }).sort({ createdAt: 1 });

    let primaryContact = null;

    if (matchedContacts.length === 0) {
      const newContact = await Contact.create({
        email,
        phoneNumber,
        linkPrecedence: "primary"
      });

      return res.status(200).json({
        primaryContactId: newContact._id,
        emails: [newContact.email].filter(Boolean),
        phoneNumbers: [newContact.phoneNumber].filter(Boolean),
        secondaryContactIds: []
      });
    }

    const primaries = matchedContacts.filter(c => c.linkPrecedence === "primary");

    if (primaries.length === 0) {
      // Fallback: treat the first matched contact as primary
      primaryContact = matchedContacts[0];
    } else {
      primaryContact = primaries[0];
    }

    if (primaries.length > 1) {
      for (let i = 1; i < primaries.length; i++) {
        await Contact.findByIdAndUpdate(primaries[i]._id, {
          linkPrecedence: "secondary",
          linkedId: primaryContact._id
        });
      }
    }

    const knownEmails = matchedContacts.map(c => c.email).filter(Boolean);
    const knownPhones = matchedContacts.map(c => c.phoneNumber).filter(Boolean);

    const isNewEmail = email && !knownEmails.includes(email);
    const isNewPhone = phoneNumber && !knownPhones.includes(phoneNumber);

    if (isNewEmail || isNewPhone) {
      await Contact.create({
        email,
        phoneNumber,
        linkPrecedence: "secondary",
        linkedId: primaryContact._id
      });
    }

    const allLinked = await Contact.find({
      $or: [
        { _id: primaryContact._id },
        { linkedId: primaryContact._id }
      ]
    });

    const emails = [...new Set(allLinked.map(c => c.email).filter(Boolean))];
    const phoneNumbers = [...new Set(allLinked.map(c => c.phoneNumber).filter(Boolean))];
    const secondaryContactIds = allLinked
      .filter(c => c.linkPrecedence === "secondary")
      .map(c => c._id);

    return res.status(200).json({
      primaryContactId: primaryContact._id,
      emails,
      phoneNumbers,
      secondaryContactIds
    });

  } catch (err) {
    next(err);
  }
};

//get all contacts
export const getAllContact = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: 1 });
    res.status(200).json(contacts);
  } catch (err) {
    next(err);
  }
}