export const appEnv = {
  appName: process.env.NEXT_PUBLIC_APP_NAME ?? 'GEM CYBER',
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? 'admin@gemcybersecurityassist.com',
  supportPhone: process.env.NEXT_PUBLIC_SUPPORT_PHONE ?? '(860) 305-4376',
  dataProviderApiKey: process.env.DATA_PROVIDER_API_KEY ?? '',
  newsIngestionWebhookSecret: process.env.NEWS_INGESTION_WEBHOOK_SECRET ?? '',
  emailProviderApiKey: process.env.EMAIL_PROVIDER_API_KEY ?? '',
  emailSendingDomain: process.env.EMAIL_SENDING_DOMAIN ?? '',
  databaseUrl: process.env.DATABASE_URL ?? '',
  auditLogSink: process.env.AUDIT_LOG_SINK ?? '',
};
