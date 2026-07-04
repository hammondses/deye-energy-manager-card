import type { TemplateResult } from "lit";

export type HassEntityState = {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed?: string;
  last_updated?: string;
};

export type HomeAssistant = {
  states: Record<string, HassEntityState | undefined>;
  callService: (
    domain: string,
    service: string,
    data?: Record<string, unknown>,
    target?: Record<string, unknown>,
  ) => Promise<unknown>;
  localize?: (key: string, ...args: unknown[]) => string;
};

export type EntityKey =
  | "thermalPolicyState"
  | "expectedAction"
  | "thermalExpectedAction"
  | "tariffWindow"
  | "solarPhase"
  | "activePlan"
  | "energyBudgetReason"
  | "thermalActionReason"
  | "pvPower"
  | "batteryCharge"
  | "batteryDischarge"
  | "gridPower"
  | "housePower"
  | "evDetectedPower"
  | "activeThermalLoads"
  | "rawSoc"
  | "socSource"
  | "socAgeMinutes"
  | "dailyBatteryTargetSoc"
  | "energyBudgetTargetSoc"
  | "energyBudgetTargetName"
  | "batteryKwhNeededToTarget"
  | "batteryTargetReachableToday"
  | "projectedEndSoc"
  | "projectedTimeToFull"
  | "remainingSolarBudget"
  | "expectedHouseLoadUntilSolarEnd"
  | "forecastFullConfidenceBuffer"
  | "discretionaryEnergyBudget"
  | "discretionaryBudgetPositive"
  | "morningTargetSoc"
  | "cheapGridMode"
  | "cheapGridReason"
  | "cheapGridPreserveTargetSoc"
  | "gridChargeTargetSoc"
  | "activeReserveTargetSoc"
  | "paidTimeFloorSoc"
  | "solarSoakAllowed"
  | "fullSendSoakAllowed"
  | "paidGridAvoidanceRequired"
  | "solarArrived"
  | "forecastDrainBlocked"
  | "comfortHeatAllowed"
  | "thermalShouldShed"
  | "thermalShouldEmergencyShed"
  | "underfloorComfortAllowed"
  | "evChargingDetected"
  | "evGridBypassRequired"
  | "evLatchActive"
  | "thermalLoadToAdd"
  | "thermalLoadToShed"
  | "thermalLoadToNormalise"
  | "bedroomHeatPumpThermalStatus"
  | "diningLivingHeatPumpThermalStatus"
  | "hallwayHeatPumpThermalStatus"
  | "officeHeatPumpThermalStatus"
  | "bathroomUnderfloorThermalStatus"
  | "underfloorPolicyState"
  | "underfloorReason"
  | "underfloorCurrentWindow"
  | "evExpectedAction"
  | "evDecisionReason"
  | "thermalControlEnabled"
  | "paidTimeGridAvoidanceEnabled"
  | "morningPreheatEnabled"
  | "underfloorScheduleEnabled"
  | "evGridBypassEnabled"
  | "evControlEnabled"
  | "recalculateNow"
  | "applyPlanNow"
  | "forceEvGridBypassStart"
  | "forceEvGridBypassRestore"
  | "emergencyShedAllHeatLoads";

export type EntityMap = Record<EntityKey, string>;

export type DeyeEnergyManagerCardConfig = {
  type: "custom:deye-energy-manager-card";
  name?: string;
  entity_prefix?: string;
  compact?: boolean;
  show_details?: boolean;
  show_controls?: boolean;
  show_power_flow?: boolean;
  show_debug_reasons?: boolean;
  animate_flows?: boolean;
  entities?: Partial<Record<EntityKey | string, string>>;
};

export type StatusTone = "green" | "bright-green" | "blue" | "amber" | "orange" | "red" | "grey";

export type Chip = {
  label: string;
  value: string;
  tone: StatusTone;
  entityId?: string;
};

export type PanelRenderer = () => TemplateResult | typeof import("lit").nothing;
