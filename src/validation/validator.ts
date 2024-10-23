import { ZodSchema } from 'zod';

const schemaValidator = <Schema extends ZodSchema, Data>(
  schema: Schema,
  data: Data
) => {
  const validationResult = schema.safeParse(data);
  if (!validationResult.success) {
    const errors = validationResult.error.flatten();
    const errorMessage = Object.entries(errors.fieldErrors)
      .map(([field, messages]) => `${field}: ${messages?.join(', ')}`)
      .join('; ');
    throw new Error(`Validation Error: ${errorMessage}`);
  }

  return validationResult;
};

export default schemaValidator;
