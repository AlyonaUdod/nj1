const fs = require("fs").promises;
const path = require("path");
const { randomUUID } = require("crypto");

const contactsPath = path.resolve("db", "contacts.json");

// TODO: задокументировать каждую функцию
function listContacts() {
  // ...твой код. Возвращает массив контактов.
  fs.readFile(contactsPath)
    .then((data) => {
      return console.log(data.toString());
    })
    .catch((err) => console.log(err.message));
}

function getContactById(contactId) {
  // ...твой код. Возвращает объект контакта с таким id. Возвращает null если объект с таким id не найден.
  fs.readFile(contactsPath)
    .then(
      (data) => {
        return console.log(
          JSON.parse(data.toString()).find((el) => el.id === contactId) ?? null
        );
        // console.log(d.find((el) => el.id === contactId))
      }

      // console.log(data.toString().find((el) => el.id === contactId))
    )
    .catch((err) => console.log(err.message));
}

function removeContact(contactId) {
  // ...твой код. Возвращает объект удаленного контакта. Возвращает null если объект с таким id не найден.
  fs.readFile(contactsPath)
    .then((data) => {
      const item =
        JSON.parse(data.toString()).find((el) => el.id === contactId) ?? null;
      if (item) {
        const newArr = JSON.parse(data.toString()).filter(
          (el) => el.id !== contactId
        );
        fs.writeFile(contactsPath, JSON.stringify(newArr))
          .then((d) => {
            return console.log("Successfully deleted --- ", item);
          })
          .catch((err) => console.log(err.message));
      } else {
        return console.log("No file with this id --- " + contactId);
      }
    })
    .catch((err) => console.log(err.message));
}

function addContact(name, email, phone) {
  // ...твой код. Возвращает объект добавленного контакта. Возвращает null если объект с таким id не найден.
  const contact = { id: randomUUID(), name, email, phone };
  fs.readFile(contactsPath)
    .then((data) => {
      const arr = JSON.parse(data.toString());
      arr.push(contact);
      fs.writeFile(contactsPath, JSON.stringify(arr)).then(() =>
        console.log(contact)
      );
    })
    .catch((err) => console.log(err.message));
}

module.exports = {
  listContacts,
  removeContact,
  getContactById,
  addContact
};
