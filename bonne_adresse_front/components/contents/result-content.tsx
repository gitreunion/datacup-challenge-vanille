"use client";
import React from "react";

import { GraphStats } from "../blocks/graph-stats";
import ResultTable from "../blocks/result-table";
import {
  AddressExport,
  AddressMap,
  AddressStats,
  AddressTab,
  CombinedData,
} from "@/lib/type";
import dynamic from "next/dynamic";

const ResultMap = dynamic(() => import("../blocks/result-map"), { ssr: false });

export function ResultContent({ data }: { data: CombinedData }) {
  const addressesMap: AddressMap[] = data?.map || [];
  const addressesTab: AddressTab[] = data?.tab || [];
  const addressStats: AddressStats = data?.stats || {};
  const addressExport: AddressExport[] = data?.export || [];

  return (
    <>
      <div className="flex flex-row gap-6 w-full">
        <ResultMap addressMap={addressesMap} />
        <GraphStats addressStats={addressStats} />
      </div>
      <div className="mt-6">
        <ResultTable
          addressesTab={addressesTab}
          addressExport={addressExport}
        />
      </div>
    </>
  );
}
