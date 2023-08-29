const contacts = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const data = await contacts.listContacts();
      return console.table(data);
      break;

    case "get":
      const item = await contacts.getContactById(id);
      return console.log(item ?? 'No item with this id', id);
      break;

    case "add":
      const newOne = await contacts.addContact(name, email, phone);
      return console.log(newOne)
      break;

    case "remove":
      const removeItem = await contacts.removeContact(id);
      return console.log(removeItem ?? `No file with this id `, id)
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
