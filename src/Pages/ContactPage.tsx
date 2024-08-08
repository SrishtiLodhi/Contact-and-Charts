import { useState } from "react";
import { ContactForm, ContactList } from "../components/componentsIndex";
import { RootState } from "../store";
import { useSelector } from "react-redux";

const ContactPage = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const contacts = useSelector((state: RootState) => state.contacts);
	return (
		<div>
			<div className="flex flex-col justify-center mt-5">
				<button
					onClick={openModal}
					className="bg-black font-bold text-white px-4 py-2 rounded-md w-44 self-center">
					Create Contact
				</button>

				{contacts.length === 0 ? (
					<div className="flex items-center justify-center">
						<span className="text-4xl text-black ml-2">
							&#x2716;
						</span>
						<h2 className="text-center p-5 font-medium text-xl">
							No Contacts Found, please create contact from the
							create contact button!
						</h2>
					</div>
				) : null}

				<ContactList />
			</div>

			{isModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
					<div className="bg-white p-6 rounded-lg relative">
						<button
							onClick={closeModal}
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

						<ContactForm closeModal={closeModal} />
					</div>
				</div>
			)}
		</div>
	);
};

export default ContactPage;
