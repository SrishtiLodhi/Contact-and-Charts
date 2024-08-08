import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, deleteContact } from "../../store";
import EditContactForm from "../contactForm/EditContactForm";

interface Contact {
	id: number;
	firstName: string;
	lastName: string;
	status: "Active" | "Inactive";
}

const ContactList: React.FC = () => {
	const contacts = useSelector((state: RootState) => state.contacts);
	const dispatch = useDispatch();

	const [selectedContact, setSelectedContact] = useState<Contact | null>(
		null
	);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);

	const handleDeleteContact = (contactId: number) => {
		dispatch(deleteContact(contactId));
	};

	const handleEditContact = (contact: Contact) => {
		setSelectedContact(contact);
		setIsEditModalOpen(true); // Open the edit modal
	};

	const closeEditModal = () => {
		setIsEditModalOpen(false);
	};

	return (
		<div className=" min-h-screen py-8">
			<div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
				<div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-4">
					<h1 className="text-white text-2xl font-semibold">
						Contact List
					</h1>
				</div>
				<div className="p-4">
					{contacts.map((contact) => (
						<div
							key={contact.id}
							className="mb-4 p-3 border rounded-lg border-gray-300 bg-white shadow-md">
							<h2 className="text-xl font-semibold mb-1">
								{contact.firstName} {contact.lastName}
							</h2>
							<p className="text-gray-600 text-sm mb-2">
								{contact.status}
							</p>
							<div className="flex space-x-2">
								<button
									onClick={() => handleEditContact(contact)} // Trigger edit
									className="flex items-center space-x-1 text-blue-500 hover:text-blue-600">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-4 w-4"
										viewBox="0 0 20 20"
										fill="currentColor">
										{/* Edit SVG path */}
									</svg>
									Edit
								</button>
								<button
									onClick={() =>
										handleDeleteContact(contact.id)
									}
									className="flex items-center space-x-1 text-red-500 hover:text-red-600">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-4 w-4"
										viewBox="0 0 20 20"
										fill="currentColor">
										{/* Delete SVG path */}
									</svg>
									Delete
								</button>
							</div>
						</div>
					))}
				</div>
			</div>

			{isEditModalOpen && selectedContact && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
					<div className="bg-white p-6 rounded-lg relative">
						<button
							onClick={closeEditModal}
							className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								viewBox="0 0 20 20"
								fill="currentColor">
								<path
									fillRule="evenodd"
									d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z"
									clipRule="evenodd"
								/>
							</svg>
						</button>

						<EditContactForm
							initialContact={selectedContact}
							closeModal={closeEditModal}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default ContactList;
