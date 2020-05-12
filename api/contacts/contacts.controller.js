const { ContactModel } = require("./contacts.model");

class ContactsController {
  async listContacts(req, res, next) {
    try {
      const contacts = await ContactModel.findAllContacts();

      return res.status(200).send(contacts);
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      const { contactId } = req.params;

      const searchedUser = await ContactModel.findContactById(contactId);
      if (!searchedUser) return res.status(404).send({ message: "Not found" });
      return res.status(200).send(searchedUser);
    } catch (err) {
      next(err);
    }
  }

  async addContact(req, res, next) {
    try {
      const newContact = await ContactModel.createContact(req.body);

      return res.status(201).send(newContact);
    } catch (err) {
      next(err);
    }
  }

  validateAddContact(req, res, next) {
    const { name, email, phone } = req.body;
    if (!name) {
      return res.status(400).send({ message: "missing required name field" });
    }
    if (!email) {
      return res.status(400).send({ message: "missing required email field" });
    }
    if (!phone) {
      return res.status(400).send({ message: "missing required phone field" });
    }
    next();
  }

  async removeContact(req, res, next) {
    const { contactId } = req.params;

    try {
      const searchedUser = await ContactModel.findContactById(contactId);
      if (!searchedUser) return res.status(404).send({ message: "Not found" });

      await ContactModel.deleteContactById(contactId);

      return res.status(200).send({ message: "contact deleted" });
    } catch (err) {
      next(err);
    }
  }

  async updateContact(req, res, next) {
    const { name, email, phone } = req.body;
    if (!name && !email && !phone) {
      return res.status(400).send({
        message:
          "missing fields. You need any of name/email/phone to update contact",
      });
    }

    const { contactId } = req.params;

    try {
      const searchedUser = await ContactModel.findContactById(contactId);
      if (!searchedUser) return res.status(404).send({ message: "Not found" });
      const updatedContact = await ContactModel.updateContactById(
        contactId,
        req.body
      );

      return res.status(200).send(updatedContact);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = {
  ContactsController: new ContactsController(),
};
