import { program } from "commander";
import { addContact, removeContact, getContactById, listContacts } from './src/contacts.js';

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
        const allContacts = await listContacts();
        console.log(allContacts);
      break;

    case "get":
        const contact = await getContactById(id);
        console.log(contact);
      break;

    case "add":
        const newContact = await addContact(name, email, phone);
        console.log(newContact);
      break;

    case "remove":
        const delcontact = await removeContact(id);
        console.log(delcontact);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
