const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => {
      console.table(JSON.parse(data));
    })
    .catch((err) => console.log(err));
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => {
      const contacts = JSON.parse(data);

      if (!contacts.find((contact) => contact.id === `${contactId}`)) {
        return console.log("Contact with this id was not found");
      }

      const contact = contacts.find((contact) => contact.id === `${contactId}`);
      console.table(contact);
    })
    .catch((err) => console.log(err));
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => {
      const contacts = JSON.parse(data);
      const indexOfNewContact = Number(contacts[contacts.length - 1].id) + 1;
      const newContact = { id: `${indexOfNewContact}`, name, email, phone };
      fs.writeFile(contactsPath, JSON.stringify([...contacts, newContact]));
      console.log("Contact was added");
    })
    .catch((err) => console.log(err));
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => {
      const contacts = JSON.parse(data);

      if (!contacts.find((contact) => contact.id === `${contactId}`)) {
        return console.log("Contact with this id was not found");
      }

      const newContacts = contacts.filter((contact) => contact.id !== `${contactId}`);
      fs.writeFile(contactsPath, JSON.stringify(newContacts));
      console.log("Contact was deleted");
    })
    .catch((err) => console.log(err));
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
