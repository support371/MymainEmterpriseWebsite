type AuditEvent = {
  action: string
  user?: string
  route?: string
  timestamp: number
}

const auditEvents: AuditEvent[] = []

export function audit(event: Omit<AuditEvent, "timestamp">) {
  auditEvents.push({ ...event, timestamp: Date.now() })
}

export function listAuditEvents() {
  return auditEvents
}
