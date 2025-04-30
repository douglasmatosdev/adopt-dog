
'use client';
import { useState } from "react";
import Image from "next/image";
import Carousel from 'react-bootstrap/Carousel';
import confetti from "canvas-confetti";
import dynamic from "next/dynamic";

const BackToTopButton = dynamic(() => import('../components/BackToTopButton'), { ssr: false });

const dogs: Dog[] = [
	{
		id: 1,
		name: "Amiguinho 1 (Macho)",
		mainImage: "/amiguinho-1/foto-5-macho-1.jpeg",
		moreImages: ["/amiguinho-1/foto-1-macho-1.jpeg", "/amiguinho-1/foto-2-macho-1.jpeg", "/amiguinho-1/foto-3-macho-1.jpeg", "/amiguinho-1/foto-4-macho-1.jpeg", "/amiguinho-1/foto-5-macho-1.jpeg", "/amiguinho-1/foto-6-macho-1.jpeg"],
	},
	{
		id: 2,
		name: "Amiguinho 2 (Fêmea)",
		mainImage: "/amiguinho-2/foto-1-femea-2.jpeg",
		moreImages: ["/amiguinho-2/foto-1-femea-2.jpeg", "/amiguinho-2/foto-2-femea-2.jpeg", "/amiguinho-2/foto-3-femea-2.jpeg"],
	},
	{
		id: 3,
		name: "Amiguinho 3 (Fêmea)",
		mainImage: "/amiguinho-3/foto-3-femea-3.jpeg",
		moreImages: ["/amiguinho-3/foto-1-femea-3.jpeg", "/amiguinho-3/foto-2-femea-3.jpeg", "/amiguinho-3/foto-3-femea-3.jpeg"],
	},
	{
		id: 4,
		name: "Amiguinho 4 (Macho)",
		mainImage: "/amiguinho-4/foto-2-macho-4.jpeg",
		moreImages: ["/amiguinho-4/foto-2-macho-4.jpeg", "/amiguinho-4/foto-1-macho-4.jpeg"],
	},
	{
		id: 5,
		name: "Amiguinho 5 (Macho)",
		mainImage: "/amiguinho-5/foto-2-macho-5.jpeg",
		moreImages: ["/amiguinho-5/foto-1-macho-5.jpeg", "/amiguinho-5/foto-2-macho-5.jpeg", "/amiguinho-5/foto-3-macho-5.jpeg", "/amiguinho-5/foto-4-macho-5.jpeg"],
	},
	{
		id: 6,
		name: "Amiguinho 6 (Macho)",
		mainImage: "/amiguinho-6/foto-4-macho-6.jpeg",
		moreImages: ["/amiguinho-6/foto-1-macho-6.jpeg", "/amiguinho-6/foto-2-macho-6.jpeg", "/amiguinho-6/foto-3-macho-6.jpeg", "/amiguinho-6/foto-4-macho-6.jpeg"],
	},
];


export default function App() {
	const [selectedDog, setSelectedDog] = useState<Dog>({} as Dog);

	const handleAdopt = (dog: Dog) => {
		confetti({
			particleCount: 100,
			spread: 100,
			origin: { y: 0.6 },
		});

		setTimeout(() => {
			const message = `Quero adotar este amiguinho : ${dog.name}`;
			const url = `https://wa.me/5521994642132?text=${encodeURIComponent(
				message
			)}`;
			window.open(url, "_blank");
		}, 1000);
	};

	return (
		<>
			<BackToTopButton />
			<div className="px-8 pt-8 pb-16"
				style={{
					backgroundImage: "url('/paisagem-natural.webp')",
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			>
				<h1
					className="text-center font-bold mb-8"
					style={{
						fontFamily: 'Barriecito',
						fontSize: '3rem'
					}}
				>
					Adote um Amiguinho
				</h1>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
					{dogs.map((dog) => (
						<div
							key={dog.id}
							className="border rounded-lg shadow-lg p-4 flex flex-col items-center bg-white"
						>
							<Image
								src={dog.mainImage}
								alt={dog.name}
								width={200}
								height={200}
								className="rounded-lg"
							/>
							<h2 className="text-lg font-semibold mt-4">{dog.name}</h2>
							<div className="flex gap-4 mt-4">
								<button
									className="bg-blue-500 text-white px-4 py-2 rounded"
									onClick={() => setSelectedDog(dog)}
								>
									Ver mais fotos
								</button>
								<button
									className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2"
									onClick={() => handleAdopt(dog)}
								>
									Adotar
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 32 32"
										fill="currentColor"
										className="w-5 h-5"
									>
										<path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.734 5.605 2.126 8.065L0 32l8.188-2.09A15.91 15.91 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.09c-2.59 0-5.13-.67-7.37-1.94l-.53-.31-4.86 1.24 1.3-4.73-.34-.54A13.02 13.02 0 012.91 16c0-7.18 5.91-13.09 13.09-13.09 7.18 0 13.09 5.91 13.09 13.09 0 7.18-5.91 13.09-13.09 13.09zm7.1-9.73c-.39-.2-2.3-1.14-2.65-1.27-.35-.13-.61-.2-.87.2-.26.39-1 1.27-1.23 1.53-.22.26-.45.29-.84.1-.39-.2-1.65-.61-3.15-1.94-1.16-1.03-1.94-2.3-2.17-2.69-.22-.39-.02-.6.17-.79.17-.17.39-.45.58-.68.2-.23.26-.39.39-.65.13-.26.07-.49-.03-.68-.1-.2-.87-2.1-1.2-2.88-.31-.75-.63-.65-.87-.66h-.74c-.26 0-.68.1-1.03.49-.35.39-1.36 1.33-1.36 3.25 0 1.91 1.39 3.75 1.58 4.01.2.26 2.73 4.17 6.63 5.85.93.4 1.65.64 2.21.82.93.29 1.78.25 2.45.15.75-.11 2.3-.94 2.63-1.85.33-.91.33-1.69.23-1.85-.1-.16-.35-.26-.74-.45z" />
									</svg>
								</button>
							</div>
						</div>
					))}
				</div>

				{selectedDog?.id && (
					<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
						<div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
							<h2 className="text-xl font-bold mb-4">{selectedDog.name}</h2>
							<div>
								<Carousel style={{
									maxHeight: '50vh'
								}}>
									{selectedDog?.moreImages?.map((image, index) => (
										<Carousel.Item key={image + index}>
											<Image
												src={image}
												alt={`${selectedDog.name} ${index + 1}`}
												layout="responsive"
												width={100}
												height={100}
												style={{
													maxHeight: '50vh'
												}}
												className="rounded-lg cursor-pointer"
												onClick={() => window.open(image, "_blank")}
											/>

										</Carousel.Item>
									))}
								</Carousel>

								<div>
									<h3>{selectedDog?.name}</h3>

									<div className="flex justify-between">
										<button
											className="bg-gray-500 text-white px-4 py-2 rounded"
											onClick={() => setSelectedDog({} as Dog)}
										>
											Fechar
										</button>
										<button
											className="bg-green-500 text-white px-4 py-2 rounded"
											onClick={() => handleAdopt(selectedDog)}
										>
											Adotar
										</button>
									</div>
								</div>
							</div>

						</div>
					</div>
				)}
			</div>
		</>
	);
}