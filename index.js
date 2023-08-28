const contacts = require('./contacts');
// const {
//   listContacts, removeContact, getContactById, addContact
// } = default;

// contacts.listContacts()
// contacts.getContactById('rsKkOQUi80UsgVPCcLZZW')
// contacts.removeContact('rsKkOQUi80UsgVPCcZZW')
// contacts.addContact('Vasya', 'vasya@gmail.com', '+38066666666')


// {
//   "id": "rsKkOQUi80UsgVPCcLZZW",
//   "name": "Alec Howard",
//   "email": "Donec.elementum@scelerisquescelerisquedui.net",
//   "phone": "(748) 206-2688"
// }

const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторити
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      contacts.listContacts()
      break;

    case 'get':
      contacts.getContactById(id) // 'rsKkOQUi80UsgVPCcLZZW'
      break;

    case 'add':
      contacts.addContact( name, email, phone ) // 'Vasya', 'vasya@gmail.com', '+38066666666')
      break;

    case 'remove':
      contacts.removeContact(id)
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);