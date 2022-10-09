import { TrackedJobStatus } from './TrackedJobStatus';

export default interface TimelineLog {
  positionTitle: string;
  companyName: string;
  date: Date;
  status: TrackedJobStatus;
  title: string;
}