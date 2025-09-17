// src/types/formidable.d.ts
declare module "formidable" {
  import { IncomingMessage } from "http";

  export interface File {
    filepath: string;
    originalFilename?: string | null;
    mimetype?: string | null;
    size: number;
  }

  export interface Fields {
    [key: string]: string | string[];
  }

  export class IncomingForm {
    multiples?: boolean;
    parse(
      req: IncomingMessage,
      callback: (err: any, fields: Fields, files: { [key: string]: File | File[] }) => void
    ): void;
  }

  export default function formidable(options?: { multiples?: boolean }): IncomingForm;
}
