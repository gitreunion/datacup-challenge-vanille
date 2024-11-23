"use client";
import React, { useState } from "react";
import { Tabs, TabsContent } from "../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { AddressExport, AddressTab } from "@/lib/type";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { FaFileDownload } from "react-icons/fa";
import { FaRightLong } from "react-icons/fa6";
import * as XLSX from "xlsx";
import { Input } from "../ui/input";

export default function ResultTable({
  addressesTab,
  addressExport,
}: {
  addressesTab: AddressTab[];
  addressExport: AddressExport[];
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [searchTerms, setSearchTerms] = useState({
    correct_address: "",
    fiability: "",
  });

  const filteredProducts = addressesTab.filter((adresse) => {
    return (
      adresse.correct_address &&
      adresse.correct_address
        .toString()
        .toLowerCase()
        .includes((searchTerms.correct_address || "").toLowerCase()) &&
      adresse.fiability &&
      adresse.fiability
        .toString()
        .toLowerCase()
        .includes((searchTerms.fiability || "").toLowerCase())
    );
  });

  const totalPages = Math.ceil(
    (filteredProducts && filteredProducts.length
      ? filteredProducts.length
      : 0) / itemsPerPage
  );

  const [currentAddress, setCurrentAddress] = useState(
    (filteredProducts || []).slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    )
  );

  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  };

  const exportToExcel = (jsonData: any) => {
    const headers = Object.keys(jsonData[0]); // Extraire les clés des objets pour les en-têtes
    const rows = jsonData.map((row: any) => {
      return headers.map((header) => {
        return row[header];
      });
    });

    // Préparer les données à insérer dans le fichier Excel
    const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);

    // Créer un classeur Excel avec les données
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Données");

    // Générer et télécharger le fichier Excel
    XLSX.writeFile(wb, "export_donnees.xlsx");
  };

  // Fonction pour transformer les données JSON en CSV
  const jsonToCsv = (jsonData: any) => {
    const headers = Object.keys(jsonData[0]);
    const rows = jsonData.map((row: any) => {
      return headers.map((header) => {
        return row[header];
      });
    });

    // Convertir en format CSV avec les en-têtes
    const csv = [
      headers.join(";"),
      ...rows.map((row: any[]) => row.join(";")),
    ].join("\n");

    return csv;
  };

  const exportToCSV = (jsonData: any) => {
    const csv = jsonToCsv(jsonData);

    // Créer un Blob avec le contenu CSV
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

    // Créer un lien de téléchargement
    const link = document.createElement("a");
    const url = window.URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "dataAdresses.csv"); // Nom du fichier CSV
    link.click();
  };

  return (
    <Tabs defaultValue="all">
      <TabsContent value="all">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>Tableau d'adresses</CardTitle>
            <CardDescription>
              Voici la liste des adresses corrigées ou non trouvées.
            </CardDescription>
            <div className="flex items-center justify-between">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 gap-1 bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:text-secondary-foreground">
                    <FaFileDownload className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap ">
                      Exporter Les Adresses Corrigées
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="w-auto">
                  <DropdownMenuLabel>Type d'export</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    onClick={() => exportToCSV(addressExport)}>
                    CSV
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    onClick={() => exportToExcel(addressExport)}>
                    EXCEL
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 gap-1 bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground">
                    <FaFileDownload className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap ">
                      Exporter Le Tableau
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="w-auto">
                  <DropdownMenuLabel>Type d'export</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    onClick={() => exportToCSV(filteredProducts)}>
                    CSV
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    onClick={() => exportToExcel(filteredProducts)}>
                    EXCEL
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>

          {/* Tableaux */}
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="h-fit w-fit p-2 text-center">
                    <Input
                      placeholder="Adresse d'origine"
                      value={searchTerms.correct_address}
                      onChange={(e) =>
                        setSearchTerms({
                          ...searchTerms,
                          correct_address: e.target.value,
                        })
                      }
                      className="w-full my-2 text-center"
                    />
                  </TableHead>
                  <TableHead className="h-fit w-fit p-2 text-center">
                    <FaRightLong className="h-5 w-5" />
                  </TableHead>
                  <TableHead className="h-fit w-fit p-2 text-center">
                    <span>Adresse corrigée</span>
                  </TableHead>
                  <TableHead className="h-fit w-fit p-2 text-center">
                    <Input
                      placeholder="Fiabilité(%)"
                      value={searchTerms.fiability}
                      onChange={(e) =>
                        setSearchTerms({
                          ...searchTerms,
                          fiability: e.target.value,
                        })
                      }
                      className="w-full my-2 text-center"
                    />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts && filteredProducts.length > 0 ? (
                  filteredProducts
                    .sort(
                      (a, b) => parseInt(b.fiability) - parseInt(a.fiability)
                    )
                    .map((address, index) => (
                      <TableRow
                        key={index}
                        className={
                          index % 2 === 0
                            ? "bg-gray-100 dark:bg-gray-600 dark:text-white"
                            : "bg-white dark:bg-gray-700 dark:text-white"
                        }>
                        <TableCell className="table-cell text-center">
                          {address.origine_address}
                        </TableCell>
                        <TableCell className="table-cell text-center">
                          <FaRightLong className="h-5 w-5" />
                        </TableCell>
                        <TableCell className="table-cell text-center">
                          {address.correct_address}
                        </TableCell>
                        <TableCell className="table-cell text-center">
                          {address.fiability}%
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={10}
                      className="text-center">
                      Aucun adresse corriger.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>

          <CardFooter className="gap-5 ">
            <div className="text-xs text-muted-foreground">
              Affichage <strong>{(currentPage - 1) * itemsPerPage + 1}</strong>{" "}
              à{" "}
              <strong>
                {Math.min(currentPage * itemsPerPage, currentAddress.length)}
              </strong>{" "}
              sur <strong>{currentAddress.length}</strong> produits
            </div>
            {/* Dropdown for items per page */}
            <div className="flex items-center">
              <span>Afficher :</span>
              <select
                className="ml-2 rounded border p-1 dark:bg-gray-700 dark:text-white "
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={200}>200</option>
              </select>
            </div>
            {/* Pagination Buttons */}
            <div className="flex items-center space-x-2">
              {/* Go to First Page */}
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={goToFirstPage}
                  disabled={currentPage === 1}
                  className="dark:bg-gray-700 dark:text-white">
                  ««
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className="dark:bg-gray-700 dark:text-white">
                  {"<"}
                </Button>
              </>

              {/* Previous Page Button */}
              {currentPage > 1 && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={goToPreviousPage}
                  className="dark:bg-gray-700 dark:text-white">
                  {currentPage - 1}
                </Button>
              )}

              {/* Current Page Button */}
              <Button
                size="sm"
                variant="default"
                className="dark:bg-gray-700 dark:text-white">
                {currentPage}
              </Button>

              {/* Next Page Button */}
              {currentPage < totalPages && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={goToNextPage}
                  className="dark:bg-gray-700 dark:text-white">
                  {currentPage + 1}
                </Button>
              )}

              {/* Go to Last Page */}
              {currentPage < totalPages && (
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={goToNextPage}
                    className="dark:bg-gray-700 dark:text-white">
                    {">"}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={goToLastPage}
                    className="dark:bg-gray-700 dark:text-white">
                    »»
                  </Button>
                </>
              )}
            </div>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
