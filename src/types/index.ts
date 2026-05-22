export interface SalaryRecord {
  id: string;
  company: string;
  role: string;
  level: string;
  location: string;
  experience_years: number;
  base_salary: number;
  bonus: number;
  stock: number;
  total_compensation: number;
  confidence_score: number;
  created_at: string;
}

export interface CompanyStats {
  company: string;
  salaries: SalaryRecord[];
  median_compensation: number;
  avg_compensation: number;
  max_compensation: number;
  min_compensation: number;
  level_distribution: Record<string, number>;
  role_distribution: Record<string, number>;
  location_distribution: Record<string, number>;
  total_entries: number;
}

export interface CompareResult {
  salary_a: SalaryRecord;
  salary_b: SalaryRecord;
  diff: {
    base: number;
    bonus: number;
    stock: number;
    total: number;
    experience: number;
    level_difference: string;
  };
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface SalaryFilters {
  company?: string;
  role?: string;
  level?: string;
  location?: string;
}

export interface SortConfig {
  field: 'total_compensation' | 'base_salary' | 'experience_years' | 'created_at';
  order: 'asc' | 'desc';
}
