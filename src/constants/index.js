import path from 'node:path'

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

export const FIFTEEN_MINUTES = 15 * 60 * 1000;
export const ONE_MONTH = 24 * 60 * 60 * 30 * 1000;

export const SMTP = {
  SERVER: process.env.SMTP_SERVER,
  PORT: process.env.SMTP_PORT,
  USER: process.env.SMTP_USER,
  PASSWORD: process.env.SMTP_PASSWORD,
  FROM_EMAIL: process.env.SMTP_FROM_EMAIL,
};

export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');