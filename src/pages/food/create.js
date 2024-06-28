import { useState } from "react";
import Navbar from "@/components/Navbar";
import FoodForm from "@/components/FoodForm";

export default function CreateFood() {
	const [formData, setFormData] = useState({
		name: "",
		imageUrl: "",
		description: "",
		ingredients: "",
	});

	return (
		<main>
			<Navbar isCreate={true} />
			<section className="grid justify-center h-screen mx-auto">
				<FoodForm defaultFormData={formData} />
			</section>
		</main>
	);
}
