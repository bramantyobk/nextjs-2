import FoodCard from "@/components/FoodCard";
import axios from "axios";
import Navbar from "@/components/Navbar";
export async function getServerSideProps(context) {
	const res = await axios.get(
		`https://api-bootcamp.do.dibimbing.id/api/v1/foods/${context.params.id}`,
		{
			headers: { apiKey: "w05KkI9AWhKxzvPFtXotUva-" },
		}
	);
	const data = res?.data.data;
	return { props: { food: data } };
}

export default function FoodDetails({ food }) {
	let test = food.ingredients.toString();
	console.log(test);
	return (
		<main>
			<Navbar />
			<section className="flex flex-col items-center justify-center">
				<div className="w-1/3">
					<FoodCard food={food} detailFood={true} />
				</div>
			</section>
		</main>
	);
}
