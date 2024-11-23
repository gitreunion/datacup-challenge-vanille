"use client";
import React, { useState, useTransition } from "react";
import { Button } from "../ui/button";
import Image from "next/image";

import { Input } from "../ui/input";
import { UploadData } from "@/action/uploadData";
import { toast } from "@/hooks/use-toast";
import ModelExemple from "../blocks/model-exemple.tsx";

type UploadContentProps = {
  setOrigineFile: React.Dispatch<React.SetStateAction<File | null>>;
  setComparedFile: React.Dispatch<React.SetStateAction<any>>;
};

export default function UploadContent({
  setOrigineFile,
  setComparedFile,
}: UploadContentProps) {
  const [isPending, startTransition] = useTransition();
  const handleUploadData = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const dataUploaded = event.target.files![0];

    if (dataUploaded) {
      startTransition(() => {
        UploadData(dataUploaded).then((data) => {
          if (data) {
            if (data?.success) {
              toast({
                title: "Succès",
                description: data?.success,
              });
              setOrigineFile(dataUploaded);
              setComparedFile(data.result);
            }
            if (data?.error) {
              toast({
                variant: "destructive",
                title: "Erreur",
                description: data?.error,
              });
            }
          }
        });
      });
    } else {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez choisir un fichier.",
      });
    }
  };

  if (isPending) {
    return (
      <div>
        <div className="pin"></div>
        <div className="pulse "></div>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-semibold text-secondary mb-6 font-heading">
        Comparer vos adresses clients
      </h1>
      <h2 className="text-gray-600 mb-8 font-sans">
        Comparer vos fichiers clients avec{" "}
        <a
          href="#"
          className="text-primary hover:text-primary/60">
          La Base d’adresse national
        </a>
      </h2>
      <div>
        <button
          onClick={() => {
            const input = document.getElementById("fileInput");
            if (input) {
              input.click();
            }
          }}
          disabled={isPending}
          className="bg-primary font-sans text-md text-white px-8 py-6 rounded-lg shadow hover:bg-primary/80">
          Sélectionner le fichier CSV, EXCEL
        </button>
        <Input
          id="fileInput"
          type="file"
          accept=".csv, .xlsx, .xls"
          onChange={handleUploadData}
          style={{ display: "none" }}
        />
      </div>
      {/* <div className="mt-4">
        <Button
          disabled={isPending}
          className="bg-secondary font-sans text-sm text-white px-6 py-4 rounded-lg shadow hover:bg-secondary/80">
          Télécharger le fichier exemple
        </Button>
      </div> */}
      <div className="mt-10 border-t border-gray-200 pt-6">
        <ModelExemple />
        <Image
          src="/src/logo/banner-partenaires.png"
          alt="Bannier des partenaires"
          className=" mx-auto mt-4"
          width={1400}
          height={200}
        />
      </div>
    </>
  );
}
