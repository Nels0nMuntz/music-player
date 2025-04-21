import { CreateTrackRequest } from "./createTrackRequest";

export interface EditTrackRequest extends CreateTrackRequest {
  id: string;
}
