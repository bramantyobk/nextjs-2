import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import FoodForm from "./FoodForm";
export default function FoodCard({ food, detailFood }) {
	const router = useRouter();
	const [isEdit, setEdit] = useState(false);

	const handleFood = () => {
		router.push(`food/${food.id}`);
	};

	const handleEdit = () => {
		setEdit(!isEdit);
	};

	const handleDelete = async () => {
		let confirmAlert = confirm("Apakah anda yakin untuk menghapus makanan?");
		if (confirmAlert) {
			const res = await axios.delete(
				`https://api-bootcamp.do.dibimbing.id/api/v1/delete-food/${router.query.id}`,
				{
					headers: {
						apiKey: "w05KkI9AWhKxzvPFtXotUva-",
						Authorization:
							"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiJjYTIzZDdjYy02Njk1LTQzNGItODE2Yy03ZTlhNWMwNGMxNjQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NjE4NzUzMjF9.wV2OECzC25qNujtyb9YHyzYIbYEV-wud3TQsYv7oB4Q",
					},
				}
			);

			if (res.data.code === "200") router.push("/");
		}
	};
	return (
		<li
			className={
				detailFood
					? "w-full h-full p-8 list-none border rounded-lg bg-green-950 flex flex-col justify-center"
					: "w-full h-full p-8 list-none border rounded-lg cursor-pointer bg-green-950 hover:translate-y-1 flex flex-col justify-center"
			}
			onClick={detailFood ? null : handleFood}
		>
			<img
				className={
					detailFood
						? "block w-auto p-3 h-full"
						: "block w-auto p-3 h-60 object-cover"
				}
				src={food.imageUrl}
			/>
			<div className={detailFood ? null : "font-bold text-center"}>
				{detailFood ? `Nama makanan: ${food.name}` : food.name}
			</div>
			{detailFood && (
				<div>
					<div>Deskripsi makanan: {food.description}</div>
					<div>Resep makanan: {food.ingredients.join(", ")}</div>
					{!isEdit && (
						<div className="flex items-center justify-center mt-7 gap-7">
							<button
								className="block p-3 bg-blue-500 rounded-full"
								onClick={handleEdit}
							>
								Update Makanan
							</button>
							<button
								className="block p-3 bg-red-500 rounded-full "
								onClick={handleDelete}
							>
								Hapus Makanan
							</button>
						</div>
					)}
				</div>
			)}
			{isEdit && (
				<FoodForm
					detailFood={true}
					defaultFormData={{
						name: food?.name,
						imageUrl: food?.imageUrl,
						description: food?.description,
						ingredients: food?.ingredients.join(", "),
					}}
					isEdit={isEdit}
					handleEdit={handleEdit}
				/>
			)}
		</li>
	);
}
