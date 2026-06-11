export interface MonthData {
  m: string;
  val: number;
  s1: number;
  s2: number;
  s3: number;
}

export interface YearData {
  months: MonthData[];
  trend: string;
}

export interface ChartData {
  [year: number]: YearData;
}

export const chartData: ChartData = {
  2026: {
    months: [
      { m: 'Jan', val: 7.5, s1: 44, s2: 19, s3: 37 },
      { m: 'Feb', val: 6.8, s1: 43, s2: 20, s3: 37 },
      { m: 'Mar', val: 8.0, s1: 41, s2: 21, s3: 38 },
      { m: 'Apr', val: 5.8, s1: 42, s2: 19, s3: 39 },
      { m: 'May', val: 5.0, s1: 43, s2: 18, s3: 39 },
      { m: 'Jun', val: 4.0, s1: 45, s2: 17, s3: 38 },
      { m: 'Jul', val: 4.5, s1: 44, s2: 18, s3: 38 },
      { m: 'Aug', val: 4.3, s1: 46, s2: 16, s3: 38 },
      { m: 'Sep', val: 4.0, s1: 47, s2: 16, s3: 37 },
      { m: 'Oct', val: 3.8, s1: 48, s2: 15, s3: 37 },
      { m: 'Nov', val: 3.5, s1: 49, s2: 15, s3: 36 },
      { m: 'Dec', val: 3.2, s1: 50, s2: 14, s3: 36 },
    ],
    trend: '↓ 25.4%',
  },
  2025: {
    months: [
      { m: 'Jan', val: 8.5, s1: 42, s2: 20, s3: 38 },
      { m: 'Feb', val: 7.2, s1: 40, s2: 21, s3: 39 },
      { m: 'Mar', val: 9.0, s1: 38, s2: 22, s3: 40 },
      { m: 'Apr', val: 6.5, s1: 41, s2: 19, s3: 40 },
      { m: 'May', val: 5.5, s1: 43, s2: 18, s3: 39 },
      { m: 'Jun', val: 4.2, s1: 45, s2: 17, s3: 38 },
      { m: 'Jul', val: 5.0, s1: 44, s2: 18, s3: 38 },
      { m: 'Aug', val: 4.8, s1: 46, s2: 16, s3: 38 },
      { m: 'Sep', val: 4.5, s1: 47, s2: 16, s3: 37 },
      { m: 'Oct', val: 4.3, s1: 48, s2: 15, s3: 37 },
      { m: 'Nov', val: 4.0, s1: 49, s2: 15, s3: 36 },
      { m: 'Dec', val: 3.8, s1: 50, s2: 14, s3: 36 },
    ],
    trend: '↓ 22.3%',
  },
  2024: {
    months: [
      { m: 'Jan', val: 10.2, s1: 38, s2: 24, s3: 38 },
      { m: 'Feb', val: 9.8, s1: 37, s2: 25, s3: 38 },
      { m: 'Mar', val: 11.0, s1: 36, s2: 25, s3: 39 },
      { m: 'Apr', val: 9.5, s1: 38, s2: 23, s3: 39 },
      { m: 'May', val: 8.8, s1: 39, s2: 22, s3: 39 },
      { m: 'Jun', val: 8.0, s1: 40, s2: 22, s3: 38 },
      { m: 'Jul', val: 8.5, s1: 39, s2: 22, s3: 39 },
      { m: 'Aug', val: 8.2, s1: 40, s2: 21, s3: 39 },
      { m: 'Sep', val: 7.8, s1: 41, s2: 21, s3: 38 },
      { m: 'Oct', val: 7.5, s1: 41, s2: 20, s3: 39 },
      { m: 'Nov', val: 7.2, s1: 42, s2: 20, s3: 38 },
      { m: 'Dec', val: 7.0, s1: 42, s2: 19, s3: 39 },
    ],
    trend: '↓ 14.6%',
  },
  2023: {
    months: [
      { m: 'Jan', val: 12.0, s1: 35, s2: 27, s3: 38 },
      { m: 'Feb', val: 11.5, s1: 34, s2: 28, s3: 38 },
      { m: 'Mar', val: 13.2, s1: 33, s2: 28, s3: 39 },
      { m: 'Apr', val: 11.8, s1: 35, s2: 27, s3: 38 },
      { m: 'May', val: 11.0, s1: 36, s2: 26, s3: 38 },
      { m: 'Jun', val: 10.5, s1: 36, s2: 26, s3: 38 },
      { m: 'Jul', val: 11.2, s1: 35, s2: 26, s3: 39 },
      { m: 'Aug', val: 10.8, s1: 36, s2: 26, s3: 38 },
      { m: 'Sep', val: 10.5, s1: 37, s2: 25, s3: 38 },
      { m: 'Oct', val: 10.2, s1: 37, s2: 25, s3: 38 },
      { m: 'Nov', val: 9.8, s1: 38, s2: 25, s3: 37 },
      { m: 'Dec', val: 9.5, s1: 38, s2: 24, s3: 38 },
    ],
    trend: '↓ 8.1%',
  },
};
