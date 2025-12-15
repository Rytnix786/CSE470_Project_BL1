const { z } = require('zod');

const createHealthRecordSchema = z.object({
  date: z.string().optional(),
  bloodPressure: z.object({
    systolic: z.number().optional(),
    diastolic: z.number().optional(),
  }).optional(),
  bloodSugar: z.number().optional(),
  weight: z.number().optional(),
  height: z.number().optional(),
  notes: z.string().optional(),
});

module.exports = {
  createHealthRecordSchema,
};
