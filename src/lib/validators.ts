import { z } from 'zod';

export const SalaryIngestionSchema = z.object({
  company: z.string().min(1, 'Company name is required').max(100),
  role: z.string().min(1, 'Role is required').max(100),
  level: z.enum(['L3', 'L4', 'L5', 'L6', 'L7'], {
    message: 'Level must be one of: L3, L4, L5, L6, L7',
  }),
  location: z.string().min(1, 'Location is required').max(100),
  experience_years: z.number().int().min(0).max(40),
  base_salary: z.number().positive('Base salary must be positive').min(100000),
  bonus: z.number().min(0).default(0),
  stock: z.number().min(0).default(0),
  confidence_score: z.number().min(0).max(1).default(0.8),
});

export type SalaryIngestionInput = z.infer<typeof SalaryIngestionSchema>;

export const SalaryQuerySchema = z.object({
  company: z.string().optional(),
  role: z.string().optional(),
  level: z.string().optional(),
  location: z.string().optional(),
  sort: z
    .enum(['total_compensation', 'base_salary', 'experience_years', 'created_at'])
    .default('total_compensation'),
  order: z.enum(['asc', 'desc']).default('desc'),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export type SalaryQueryInput = z.infer<typeof SalaryQuerySchema>;
