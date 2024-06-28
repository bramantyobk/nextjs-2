import { useRouter } from "next/router";
import Link from "next/link";
export default function Navbar({ isCreate }) {
	const router = useRouter();
	const handleCreateFood = () => {
		router.push("/food/create");
	};

	return (
		<nav className="flex items-center justify-between px-10 py-5 mb-5 bg-emerald-700">
			<Link href="/">
				<h1 className="text-3xl">Restoran Dibimbing</h1>
			</Link>
			{isCreate ? null : (
				<button
					onClick={handleCreateFood}
					className="px-3 py-3 bg-green-900 rounded-xl"
				>
					<span className="px-2 text-xl text-center text-black bg-white rounded-xl">
						+
					</span>{" "}
					Buat Menu Makanan
				</button>
			)}
		</nav>
	);
}
