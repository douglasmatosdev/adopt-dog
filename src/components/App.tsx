
'use client';
import { useState } from "react";
import Image from "next/image";
import Carousel from 'react-bootstrap/Carousel';
import confetti from "canvas-confetti";
import dynamic from "next/dynamic";
import { dogs } from "@/utils/data";

const BackToTopButton = dynamic(() => import('../components/BackToTopButton'), { ssr: false });

export default function App() {
	const [selectedDog, setSelectedDog] = useState<Dog>({} as Dog);

	const handleAdopt = (dog: Dog) => {
		confetti({
			particleCount: 100,
			spread: 100,
			origin: { y: 0.6 },
		});

		setTimeout(() => {
			const message = `Quero adotar este amiguinho : ${dog.name}.\n\nATENÇÃO\nEstou ciente de que:\n- Todos os filhotes não são castrados;\n- Não possuem vacinas;\n- O sexo escolhido é ${dog.gender === 'male' ? 'MACHO' : 'FÊMEA'}.\n\n Informe seu nome e endereço que iremos entregar.`;
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
				<div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-8" role="alert">
					<p className="font-bold">Atenção</p>
					<p>Todos os filhotes não são castrados e não possuem vacinas. Verifique o sexo do filhote escolhido antes de prosseguir.</p>
					<p>Nasceram dia 12/02/2025</p>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
					{dogs.map((dog) => (
						<div
							key={dog.id}
							className="relative border rounded-lg shadow-lg p-4 flex flex-col items-center bg-white"
						>
							{dog.status === 'pending' && (
								<div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
									<span className="text-white font-bold text-lg">Em processo de adoção❤️</span>
								</div>
							)}
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
									className={`px-4 py-2 rounded ${dog.status === 'pending' ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : 'bg-blue-500 text-white'
										}`}
									onClick={() => dog.status !== 'pending' && setSelectedDog(dog)}
									disabled={dog.status === 'pending'}
								>
									Ver mais fotos
								</button>
								<button
									className={`px-4 py-2 rounded flex items-center gap-2 ${dog.status === 'pending' ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : 'bg-green-500 text-white'
										}`}
									onClick={() => dog.status !== 'pending' && handleAdopt(dog)}
									disabled={dog.status === 'pending'}
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