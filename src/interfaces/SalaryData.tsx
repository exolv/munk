export default interface SalaryData {
  companyPositionRange: {
    min: number;
    max: number | undefined;
  };
  globalPositionRange: {
    min: number;
    max: number;
  };
}