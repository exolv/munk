import { BoardType } from './TrackedJobStatus';

export default interface TrackedJob {
  id: number;
  positionTitle: string;
  companyName: string;
  date: string;
  companyImage: string;
  board: BoardType;
}