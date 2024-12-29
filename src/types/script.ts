export interface SavedScript {
    id: string;
    name: string;
    element: string;
    position: string;
    script: string;
    parsedElement: {
      attributes: Record<string, string>;
      type: string;
    };
}
  
export interface HeaderScript {
  id: number;
  name: string;
  script: string;
}
  