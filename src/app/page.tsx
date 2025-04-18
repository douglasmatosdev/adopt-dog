"use client";

import { useState } from "react";
import Image from "next/image";
import Carousel from 'react-bootstrap/Carousel';
import confetti from "canvas-confetti";

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

export default function Home() {
  const [selectedDog, setSelectedDog] = useState<Dog>({} as Dog);

  const handleAdopt = (dog: Dog) => {
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.6 },
    });

    setTimeout(() => {
      const message = `quero adotar este amiguinho aqui: ${dog.name}`;
      const url = `https://wa.me/5521994642132?text=${encodeURIComponent(
        message
      )}`;
      window.open(url, "_blank");
    }, 1000);
  };

  return (
    <div className="p-8"
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
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={() => handleAdopt(dog)}
              >
                Adotar
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
  );
}