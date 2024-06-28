import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

export default function FoodForm({
	defaultFormData,
	detailFood,
	isEdit,
	handleEdit,
}) {
	const router = useRouter();
	const [formData, setFormData] = useState(defaultFormData);

	const onSubmit = async (event) => {
		event.preventDefault();
		const urlEdit = `https://api-bootcamp.do.dibimbing.id/api/v1/update-food/${router.query.id}`;
		const urlCreate = `https://api-bootcamp.do.dibimbing.id/api/v1/create-food`;
		console.log(detailFood ? urlEdit : urlCreate);
		const foodIngredients = formData.ingredients.replace(/\s*,\s*/g, ",");
		const res = await axios.post(
			detailFood ? urlEdit : urlCreate,
			{
				name: formData.name,
				imageUrl: formData.imageUrl,
				description: formData.description,
				ingredients: foodIngredients.split(","),
			},
			{
				headers: {
					apiKey: "w05KkI9AWhKxzvPFtXotUva-",
					"Content-Type": "application/json",
					Authorization:
						"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiJjYTIzZDdjYy02Njk1LTQzNGItODE2Yy03ZTlhNWMwNGMxNjQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NjE4NzUzMjF9.wV2OECzC25qNujtyb9YHyzYIbYEV-wud3TQsYv7oB4Q",
				},
			}
		);
		if (res.data.code === "200") {
			if (detailFood) router.reload();
			else {
				alert("Makanan berhasil dibuat");
				router.push("/");
			}
		}
	};

	const handleChange = (event) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	};

	return (
		<div>
			<form
				onSubmit={onSubmit}
				className="flex flex-col items-center justify-center gap-3"
			>
				<h1 className="mt-8 mb-8 text-3xl font-bold underline underline-offset-8">
					{detailFood ? "Update Makanan" : "Buat Makanan Baru"}
				</h1>

				<label className="self-start block text-white">Nama Makanan</label>
				<input
					value={formData.name}
					onChange={handleChange}
					name="name"
					type="text"
					className="block w-full h-10 text-black rounded"
					placeholder="Masukkan nama makanan"
				/>

				<label className="self-start block text-white">
					URL Gambar Makanan
				</label>
				<input
					value={formData.imageUrl}
					onChange={handleChange}
					name="imageUrl"
					type="url"
					className="block w-full h-10 text-black"
					placeholder="Masukkan url gambar"
					required
				/>

				<label className="self-start block text-white">Deskripsi Makanan</label>
				<input
					value={formData.description}
					onChange={handleChange}
					name="description"
					type="text"
					className="block w-full h-10 text-black"
					placeholder="Masukkan deskripsi makanan"
					required
				/>

				<label className="self-start block text-white ">Resep masakan</label>
				<input
					value={formData.ingredients}
					onChange={handleChange}
					name="ingredients"
					type="text"
					className="block w-full h-10 text-black"
					placeholder="Bawang Putih, Telur, dll"
					required
				/>

				<div className="flex items-center justify-center mt-7 gap-7 mb-7">
					{isEdit && (
						<button
							className="block p-3 bg-red-500 rounded-full "
							onClick={handleEdit}
						>
							Batal Update
						</button>
					)}
					<button className="block p-3 bg-blue-500 rounded-full" type="submit">
						{detailFood ? "Update Makanan" : "Buat Makanan"}
					</button>
				</div>
			</form>
		</div>
	);
}
