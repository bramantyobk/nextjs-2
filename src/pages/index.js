import FoodCard from "@/components/FoodCard";
import axios from "axios";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";

export async function getServerSideProps() {
	const res = await axios.get(
		"https://api-bootcamp.do.dibimbing.id/api/v1/foods",
		{ headers: { apiKey: "w05KkI9AWhKxzvPFtXotUva-" } }
	);
	const data = res?.data.data;
	return { props: { foods: data } };
}

export default function Home({ foods }) {
	const router = useRouter();
	// const page = Number(router.query.page || 1);

	// const handleNext = () => router.push(`?page=${page + 1}`);

	return (
		<div>
			<Navbar />
			<ol className="grid grid-cols-5 px-5 py-5 mx-auto gap-x-8 gap-y-8 place-content-center place-items-center">
				{/* {console.log(foods)} */}
				{foods.map((food, key) => (
					<FoodCard food={food} key={key} />
				))}
			</ol>

			{/* <button
				className="block p-2 text-white bg-blue-800 rounded"
				onClick={handleNext}
			>
				Next
			</button> */}
		</div>
	);
}
