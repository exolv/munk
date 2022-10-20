import { TrackedJobStatus } from './TrackedJobStatus';

export default interface TimelineLog {
  positionTitle: string;
  companyName: string;
  date: string;
  status: TrackedJobStatus;
  title: string;
}