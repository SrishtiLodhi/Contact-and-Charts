import { createStore } from "redux";

interface Contact {
	id: number;
	firstName: string;
	lastName: string;
	status: "Active" | "Inactive";
}

interface AppState {
	contacts: Contact[];
}

const initialState: AppState = {
	contacts: [],
};

function rootReducer(state = initialState, action: any) {
	switch (action.type) {
		case "ADD_CONTACT":
			return {
				...state,
				contacts: [...state.contacts, action.payload],
			};
		case "UPDATE_CONTACT":
			const updatedContacts = state.contacts.map((contact) =>
				contact.id === action.payload.id ? action.payload : contact
			);
			return {
				...state,
				contacts: updatedContacts,
			};
		case "DELETE_CONTACT":
			const filteredContacts = state.contacts.filter(
				(contact) => contact.id !== action.payload
			);
			return {
				...state,
				contacts: filteredContacts,
			};
		default:
			return state;
	}
}

export function addContact(contact: Contact) {
	return {
		type: "ADD_CONTACT",
		payload: contact,
	};
}

export function updateContact(contact: Contact) {
	return {
		type: "UPDATE_CONTACT",
		payload: contact,
	};
}

export function deleteContact(contactId: number) {
	return {
		type: "DELETE_CONTACT",
		payload: contactId,
	};
}

const store = createStore(rootReducer);

export default store;
