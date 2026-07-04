import { html, nothing, type TemplateResult } from "lit";
import type { Chip, EntityKey, EntityMap, HassEntityState, HomeAssistant, StatusTone } from "./types";

const missingWarnings = new Set<string>();

export const unavailableStates = new Set(["unknown", "unavailable", "none", ""]);

export const getEntity = (
  hass: HomeAssistant,
  entities: EntityMap,
  key: EntityKey,
  warn = false,
): HassEntityState | undefined => {
  const entityId = entities[key];
  const stateObj = hass.states[entityId];
  if (!stateObj && warn && !missingWarnings.has(entityId)) {
    missingWarnings.add(entityId);
    console.warn(`[deye-energy-manager-card] Missing entity: ${entityId}`);
  }
  return stateObj;
};

export const state = (entity?: HassEntityState): string | undefined => entity?.state;

export const cleanState = (entity?: HassEntityState): string | undefined => {
  if (!entity || unavailableStates.has(entity.state)) return undefined;
  return entity.state;
};

export const numberState = (entity?: HassEntityState): number | undefined => {
  const value = Number(entity?.state);
  return Number.isFinite(value) ? value : undefined;
};

export const binaryOn = (entity?: HassEntityState): boolean | undefined => {
  if (!entity || unavailableStates.has(entity.state)) return undefined;
  return entity.state === "on";
};

export const formatLabel = (value?: string): string => {
  if (!value) return "Unknown";
  return value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export const formatPower = (value?: number): string => {
  if (value === undefined) return "-- W";
  const abs = Math.abs(value);
  if (abs >= 1000) return `${(value / 1000).toFixed(abs >= 10000 ? 0 : 1)} kW`;
  return `${Math.round(value)} W`;
};

export const formatEnergy = (value?: number): string => {
  if (value === undefined) return "-- kWh";
  return `${value.toFixed(1)} kWh`;
};

export const formatPercent = (value?: number): string => {
  if (value === undefined) return "--%";
  return `${Math.round(value)}%`;
};

export const statusToneForPolicy = (policy?: string): StatusTone => {
  switch (policy) {
    case "battery_priority":
      return "amber";
    case "comfort_only":
      return "blue";
    case "solar_soak_allowed":
      return "green";
    case "solar_soak_full_send":
      return "bright-green";
    case "normalise":
      return "amber";
    case "shed":
      return "orange";
    case "emergency_shed":
      return "red";
    default:
      return "grey";
  }
};

export const budgetTone = (budget?: number): StatusTone => {
  if (budget === undefined) return "grey";
  if (budget > 0.5) return "green";
  if (budget >= -0.5) return "amber";
  return "red";
};

export const booleanTone = (value: boolean | undefined, positiveWhenOn = true): StatusTone => {
  if (value === undefined) return "grey";
  return value === positiveWhenOn ? "green" : "red";
};

export const chip = ({ label, value, tone, entityId }: Chip): TemplateResult => html`
  <span class="chip ${tone}" title=${entityId ?? ""} data-entity-id=${entityId ?? ""}>
    <span>${label}</span>
    <strong>${value}</strong>
  </span>
`;

export const valueRow = (label: string, value: unknown, tone?: StatusTone): TemplateResult => html`
  <div class="value-row ${tone ?? ""}">
    <span>${label}</span>
    <strong>${value ?? "--"}</strong>
  </div>
`;

export const optional = (condition: unknown, content: () => TemplateResult) => condition ? content() : nothing;

export const callEntityService = async (hass: HomeAssistant, entityId: string): Promise<void> => {
  const [domain] = entityId.split(".");
  if (domain === "switch") {
    await hass.callService("switch", "toggle", undefined, { entity_id: entityId });
    return;
  }
  if (domain === "button") {
    await hass.callService("button", "press", undefined, { entity_id: entityId });
  }
};
