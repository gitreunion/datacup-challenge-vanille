"use server";

import { PostFile } from "@/lib/custom-tools";


export const UploadData = async (data: File) => {
  try {

    // Vérification du type de fichier .csv, .xlsx, .xls
    if (
      data.type !== "application/vnd.ms-excel" &&
      data.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      return {
        error: "Le fichier doit avoir une extension .csv, .xlsx ou .xls.",
      };
    }

    const response = await PostFile(
      process.env.API_REST + "/upload_file/",
      data
    );

    console.log(response)

    const parseDataExport = await JSON.parse(response.export)
    response.export = parseDataExport

    const parseDataMap = await JSON.parse(response.map)
    response.map = parseDataMap

    return { success: "Les données on bien été traité !", result: response };
  } catch (error) {
    console.error("Erreur lors de lu traitement :", error);

    return {
      error: "Une erreur s'est produite lors du traitement.",
    };
  }
};