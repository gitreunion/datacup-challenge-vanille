"use client";
import React, { useState } from "react";

import UploadContent from "./upload-content";
import { ResultContent } from "./result-content";

export default function HomeContent() {
  const [origineFile, setOrigineFile] = useState<File | null>(null);
  const [comparedFile, setComparedFile] = useState<any>(null);

  if (origineFile) {
    return <ResultContent data={comparedFile} />;
  } else {
    return (
      <UploadContent
        setOrigineFile={setOrigineFile}
        setComparedFile={setComparedFile}
      />
    );
  }
}
