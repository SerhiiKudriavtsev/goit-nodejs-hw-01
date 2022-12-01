const fs = require('fs').promises;
// const fs = require('fs/promises');

const path = require('path');

const contactsPath = path.join(__dirname, 'db/contacts.json');

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts
  } catch (err) {
    console.log(err.message);
  }
};

const getContactById = async contactId => {
  try {
    const contacts = await listContacts();
    const result = contacts.find(({ id }) => id === contactId);
    return result
  } catch (err) {
    console.log(err.message);
  }
};

const removeContact = async contactId => {
  try {
    const contacts = await listContacts();
    const newContacts = contacts.filter(({ id }) => id !== contactId);
    // contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
    return contacts.filter(({ id }) => id === contactId);
  } catch (err) {
    console.log(err.message);
  }
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const lastElement = contacts[contacts.length - 1];
  const id = Number(lastElement.id) + 1;
  const newContact = { id: `${id}`, name, email, phone };
  contacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
};