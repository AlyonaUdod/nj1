const fs = require("fs").promises;
const path = require("path");
const { randomUUID } = require("crypto");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  return data.find((el) => el.id === contactId) ?? null;
};

const removeContact = async (contactId) => {
  const data = await listContacts();
  const item = data.find((el) => el.id === contactId) ?? null;
  if (item) {
    const newArr = data.filter((el) => el.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(newArr, null, 2));
  }
  return item;
};

const addContact = async (name, email, phone) => {
  const contact = { id: randomUUID(), name, email, phone };
  const data = await listContacts();
  data.push(contact);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return contact;
};

module.exports = {
  listContacts,
  removeContact,
  getContactById,
  addContact
};
