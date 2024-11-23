export interface AddressTab {
  origine_address: string;
  correct_address: string;
  fiability: string;
}

export interface AddressMap {
  correct_address: string;
  lat: number;
  long: number;
}

export interface AddressExport {
  export_address_csv: File;
  export_address_excel: File;
}

export interface AddressStats {
  correct_pourcent: string;
  corriger_pourcent: string;
  no_match_pourcent: string;
}

export interface CombinedData {
  export: AddressExport[];
  map: AddressMap[];
  stats: AddressStats;
  tab: AddressTab[];
}



