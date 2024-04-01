import { fileURLToPath } from 'url';
import { dirname, join } from 'path'; 
import fs from 'fs/promises';
import { nanoid } from 'nanoid'

const filename = fileURLToPath(import.meta.url);
const __dirname = dirname(filename);

const contactsPath = join(__dirname, './db/contacts.json');

const listContacts = async() => {
    try {
        const data = await fs.readFile(contactsPath);
        return JSON.parse(data);
    } catch (error) {
        console.error('Error listing contacts:', error);
        throw error;
    }
}

const getContactById = async (contactId) => {
    try {
        const contacts = await listContacts();
        return contacts.find(contact => contact.id === contactId) || null;
    } catch (error) {
        console.error('Error getting contact by id:', error);
        throw error;
    }
}

const removeContact = async (contactId) => {
    try {
        const contacts = await listContacts();
        const removedContact = contacts.find(contact => contact.id === contactId);
        if (!removedContact) return null;
        const updatedContacts = contacts.filter(contact => contact.id !== contactId);
        await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));

        return removedContact;
    } catch (error) {
        console.error('Error removing contact:', error);
        throw error;
    }
}

const addContact = async (name, email, phone) => {
    try {
        const contacts = await listContacts();
        const newContact = { id: nanoid(), name, email, phone };
        const updatedContacts = [...contacts, newContact];
        await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
        
        return newContact;
    } catch (error) {
        throw error;
    }
}

export { addContact, removeContact, getContactById, listContacts };