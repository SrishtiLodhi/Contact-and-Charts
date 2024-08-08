import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addContact } from "../../store";

interface Contact {
	id: number;
	firstName: string;
	lastName: string;
	status: "Active" | "Inactive";
}

interface FormData {
	firstName: string;
	lastName: string;
	status: "Active" | "Inactive";
}

interface Props {
	closeModal: () => void;
}

const ContactForm: React.FC<Props> = ({ closeModal }) => {
	const dispatch = useDispatch();
	const [formData, setFormData] = useState<FormData>({
		firstName: "",
		lastName: "",
		status: "Inactive", // Default status is 'Inactive' as shown in the screenshot
	});

	const handleSaveContact = () => {
		const newContactId = Date.now();

		const newContact: Contact = {
			id: newContactId,
			firstName: formData.firstName,
			lastName: formData.lastName,
			status: formData.status,
		};

		dispatch(addContact(newContact));
		closeModal();
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newStatus = event.target.value as "Active" | "Inactive";
		setFormData((prevData) => ({
			...prevData,
			status: newStatus,
		}));
	};

	return (
		<div className="flex flex-col p-2 bg-white rounded-lg">
			<div className="mb-4 flex justify-center items-center gap-2">
				<label className="whitespace-nowrap mb-2 text-lg font-semibold">First Name:</label>
				<input
					type="text"
					name="firstName"
					value={formData.firstName}
					onChange={handleInputChange}
					className="w-full px-4 py-2 border rounded-lg"
				/>
			</div>

			<div className="mb-4 flex justify-center items-center gap-2">
				<label className="whitespace-nowrap mb-2 text-lg font-semibold">Last Name:</label>
				<input
					type="text"
					name="lastName"
					value={formData.lastName}
					onChange={handleInputChange}
					className="w-full px-4 py-2 border rounded-lg"
				/>
			</div>

			<div className="mb-4 flex justify-start items-center gap-2">
				<span className="whitespace-nowrap text-lg font-semibold">Status:</span>
				<div className="flex items-center">
					<label className="mr-4">
						<input
							type="radio"
							name="status"
							value="Active"
							checked={formData.status === "Active"}
							onChange={handleStatusChange}
							className="mr-1"
						/>
						Active
					</label>
					<label>
						<input
							type="radio"
							name="status"
							value="Inactive"
							checked={formData.status === "Inactive"}
							onChange={handleStatusChange}
							className="mr-1"
						/>
						Inactive
					</label>
				</div>
			</div>

			<button
				onClick={handleSaveContact}
				className="px-4 py-2 mt-4 text-lg font-semibold text-white bg-gray-800 rounded-lg">
				Save Contact
			</button>
		</div>
	);
};

export default ContactForm;
