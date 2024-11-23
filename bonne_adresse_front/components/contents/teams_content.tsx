"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Image from "next/image";

export default function TeamsContent() {
  const teamMembers = [
    {
      id: 1,
      name: "Ugo",
      role: "Développeur back-end Python",
      description: "Passionné par les jeux vidéo.",
      imageUrl: "/src/teams/ugo.jpg",
    },
    {
      id: 2,
      name: "Idriss",
      role: "Guide suprême",
      description: "Aime bien le chocolat.",
      imageUrl: "/src/teams/idriss.webp",
    },
    {
      id: 3,
      name: "Brian",
      role: "Développeur full-stack NextJS",
      description: "Un Féca cheat du Monde des Douze.",
      imageUrl: "/src/teams/brian.webp",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-primary mb-6">
        Rencontrez notre équipe
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <Card
            key={member.id}
            className="w-80 shadow-lg transition-all transform hover:scale-105 hover:shadow-[0_0_15px_5px_rgba(255,223,0,0.75)] cursor-pointer">
            <CardHeader className="p-0">
              <Image
                src={member.imageUrl}
                alt={member.name}
                width={320}
                height={200}
                className="w-full h-[15rem] object-fill rounded-full p-6"
              />
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-lg font-bold">{member.name}</CardTitle>
              <CardDescription className="text-sm text-gray-500">
                {member.role}
              </CardDescription>
              <p className="text-sm text-gray-700 mt-2">{member.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
