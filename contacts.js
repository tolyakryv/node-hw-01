const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");
const contactsPath = path.join(__dirname, "/db/contacts.json");
async function listContacts() {
  const data = await fs.readFile(contactsPath);

  return JSON.parse(data);
}
async function getContactById(contactId) {
  const data = await listContacts();
  console.log(contactId);
  const result = data.find((e) => e.id == contactId);
  return result;
}

async function removeContact(contactId) {
  const data = await listContacts();
  console.log(contactId);
  const index = data.findIndex((e) => e.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = data.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return result;
}

async function addContact({ name, email, phone }) {
  const data = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  data.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return newContact;
}
module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
