import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateContact } from "../../store";

interface Contact {
	id: number;
	firstName: string;
	lastName: string;
	status: "Active" | "Inactive";
}

interface Props {
	initialContact: Contact;
	closeModal: () => void;
}

const EditContactForm: React.FC<Props> = ({ initialContact, closeModal }) => {
	const dispatch = useDispatch();
	const [formData, setFormData] = useState<Contact>({
		...initialContact,
	});

	const handleSaveContact = () => {
		dispatch(updateContact(formData));
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
		<div className="flex flex-col items-center justify-center p-2 pt-0 mt-0 my-4 rounded-lg bg-white">
			<p className="text-center text-xl font-bold mb-3 whitespace-nowrap ">
				Edit Contact
			</p>
			<div className="space-y-4 w-full">
				{/* First Name */}
				<div className="justify-center items-center gap-2 flex space-y-2">
					<label
						htmlFor="firstName"
						className="font-semibold text-lg whitespace-nowrap">
						First Name:
					</label>
					<input
						type="text"
						name="firstName"
						value={formData.firstName}
						onChange={handleInputChange}
						placeholder="First Name"
						className="bg-gray-100 text-black border border-solid border-gray-400 rounded-lg p-2 w-full"
					/>
				</div>

				{/* Last Name */}
				<div className="flex justify-center items-center gap-2 space-y-2">
					<label
						htmlFor="lastName"
						className="font-semibold text-lg whitespace-nowrap">
						Last Name:
					</label>
					<input
						type="text"
						name="lastName"
						value={formData.lastName}
						onChange={handleInputChange}
						placeholder="Last Name"
						className="bg-gray-100 text-black border border-solid border-gray-400 rounded-lg p-2 w-full"
					/>
				</div>

				{/* Status */}
				<div className="flex justify-start items-center gap-2">
					<label className="font-semibold text-lg whitespace-nowrap">Status:</label>
					<div className="flex items-center gap-4">
						<label className="flex items-center">
							<input
								type="radio"
								name="status"
								value="Active"
								checked={formData.status === "Active"}
								onChange={handleStatusChange}
								className="mr-2"
							/>
							Active
						</label>
						<label className="flex items-center">
							<input
								type="radio"
								name="status"
								value="Inactive"
								checked={formData.status === "Inactive"}
								onChange={handleStatusChange}
								className="mr-2"
							/>
							Inactive
						</label>
					</div>
				</div>
			</div>
			<button
				onClick={handleSaveContact}
				className="mt-4 px-4 py-2 bg-black text-white font-semibold rounded-lg">
				Save Edited Contact
			</button>
		</div>
	);
};

export default EditContactForm;
