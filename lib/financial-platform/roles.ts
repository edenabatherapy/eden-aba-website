import type { AdminRole } from "./types";

const ROLE_PERMISSIONS: Record<AdminRole, string[]> = {
  owner: ["*"],
  administrator: [
    "donations.approve",
    "sponsorships.approve",
    "applications.review",
    "funds.allocate",
    "campaigns.manage",
    "reports.export",
    "documents.upload",
    "audit.read",
  ],
  finance: [
    "donations.approve",
    "funds.allocate",
    "reports.export",
    "audit.read",
    "campaigns.read",
  ],
  intake_coordinator: [
    "applications.review",
    "documents.upload",
    "sponsorships.approve",
    "audit.read",
  ],
  viewer: ["campaigns.read", "audit.read", "reports.export"],
};

export function resolveStaffRole(staffName: string): AdminRole {
  const envRole = process.env.FINANCIAL_PLATFORM_DEFAULT_ROLE?.trim() as AdminRole | undefined;
  if (envRole && ROLE_PERMISSIONS[envRole]) return envRole;

  const mapped = process.env.FINANCIAL_PLATFORM_ROLE_MAP?.trim();
  if (mapped && staffName) {
    for (const entry of mapped.split(",")) {
      const [name, role] = entry.split(":").map((s) => s.trim());
      if (name && role && name.toLowerCase() === staffName.toLowerCase()) {
        if (ROLE_PERMISSIONS[role as AdminRole]) return role as AdminRole;
      }
    }
  }

  return "administrator";
}

export function hasPermission(role: AdminRole, permission: string): boolean {
  const perms = ROLE_PERMISSIONS[role] ?? [];
  return perms.includes("*") || perms.includes(permission);
}
