"use client";

import { useState } from "react";
import Image from "next/image";


const dogs: Dog[] = [
  {
    id: 1,
    name: "Amiguinho 1",
    mainImage: "/dog.jpeg",
    moreImages: ["/dog.jpeg", "/dog.jpeg"],
  },
  {
    id: 2,
    name: "Amiguinho 2",
    mainImage: "/dog.jpeg",
    moreImages: ["/dog.jpeg", "/dog.jpeg"],
  },
  {
    id: 3,
    name: "Amiguinho 3",
    mainImage: "/dog.jpeg",
    moreImages: ["/dog.jpeg", "/dog.jpeg"],
  },
  {
    id: 4,
    name: "Amiguinho 4",
    mainImage: "/dog.jpeg",
    moreImages: ["/dog.jpeg", "/dog.jpeg"],
  },
  {
    id: 5,
    name: "Amiguinho 5",
    mainImage: "/dog.jpeg",
    moreImages: ["/dog.jpeg", "/dog.jpeg"],
  },
  {
    id: 6,
    name: "Amiguinho 6",
    mainImage: "/dog.jpeg",
    moreImages: ["/dog.jpeg", "/dog.jpeg"],
  },
];

export default function Home() {
  const [selectedDog, setSelectedDog] = useState<Dog>({} as Dog);

  const handleAdopt = (dog: Dog) => {
    const message = `quero adotar este amiguinho aqui: ${dog.name}`;
    const url = `https://wa.me/5521994642132?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div className="p-8">
      <h1 className="text-center text-2xl font-bold mb-8">Adote um Amiguinho</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {dogs.map((dog) => (
          <div
            key={dog.id}
            className="border rounded-lg shadow-lg p-4 flex flex-col items-center"
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
            <div className="grid grid-cols-2 gap-4">
              {selectedDog?.moreImages?.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`${selectedDog.name} ${index + 1}`}
                  width={100}
                  height={100}
                  className="rounded-lg"
                />
              ))}
            </div>
            <div className="flex justify-between mt-6">
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
      )}
    </div>
  );
}