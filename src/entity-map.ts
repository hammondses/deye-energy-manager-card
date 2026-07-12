import type { DeyeEnergyManagerCardConfig, EntityKey, EntityMap } from "./types";

const DEFAULT_PREFIX = "garage_deye_energy_manager";

const prefixed = (prefix: string, domain: string, objectId: string): string => `${domain}.${prefix}_${objectId}`;

export const requiredEntityKeys: EntityKey[] = [
  "thermalPolicyState",
  "expectedAction",
  "thermalExpectedAction",
  "discretionaryEnergyBudget",
];

export const defaultEntities = (prefix = DEFAULT_PREFIX): EntityMap => ({
  thermalPolicyState: prefixed(prefix, "sensor", "thermal_policy_state"),
  expectedAction: "sensor.deye_energy_manager_expected_action",
  thermalExpectedAction: prefixed(prefix, "sensor", "thermal_expected_action"),
  tariffWindow: "sensor.deye_energy_manager_current_tariff_window",
  solarPhase: prefixed(prefix, "sensor", "solar_phase"),
  activePlan: "sensor.deye_energy_manager_active_plan",
  energyBudgetReason: prefixed(prefix, "sensor", "energy_budget_reason"),
  thermalActionReason: prefixed(prefix, "sensor", "thermal_action_reason"),
  pvPower: "sensor.deye_energy_manager_pv_power_now",
  batteryCharge: "sensor.deye_energy_manager_battery_charge",
  batteryDischarge: "sensor.deye_energy_manager_battery_discharge",
  gridPower: "sensor.deye_grid_ct_power",
  housePower: "sensor.deye_essential_power",
  evDetectedPower: prefixed(prefix, "sensor", "ev_detected_power"),
  activeThermalLoads: prefixed(prefix, "sensor", "active_thermal_loads"),
  rawSoc: "sensor.deye_battery_soc",
  socSource: prefixed(prefix, "sensor", "soc_source"),
  socAgeMinutes: prefixed(prefix, "sensor", "soc_age_minutes"),
  dailyBatteryTargetSoc: prefixed(prefix, "number", "daily_battery_target_soc"),
  energyBudgetTargetSoc: prefixed(prefix, "sensor", "energy_budget_target_soc"),
  energyBudgetTargetName: prefixed(prefix, "sensor", "energy_budget_target_name"),
  batteryKwhNeededToTarget: prefixed(prefix, "sensor", "battery_kwh_needed_to_target"),
  batteryTargetReachableToday: prefixed(prefix, "binary_sensor", "battery_target_reachable_today"),
  projectedEndSoc: prefixed(prefix, "sensor", "projected_end_soc"),
  projectedTimeToFull: prefixed(prefix, "sensor", "projected_time_to_full"),
  remainingSolarBudget: prefixed(prefix, "sensor", "remaining_solar_budget"),
  expectedHouseLoadUntilSolarEnd: prefixed(prefix, "sensor", "expected_house_load_until_solar_end"),
  forecastFullConfidenceBuffer: prefixed(prefix, "number", "forecast_full_confidence_buffer"),
  discretionaryEnergyBudget: prefixed(prefix, "sensor", "discretionary_energy_budget"),
  discretionaryBudgetPositive: prefixed(prefix, "binary_sensor", "discretionary_budget_positive"),
  morningTargetSoc: prefixed(prefix, "sensor", "morning_target_soc"),
  cheapGridMode: prefixed(prefix, "sensor", "cheap_grid_mode"),
  cheapGridReason: prefixed(prefix, "sensor", "cheap_grid_reason"),
  cheapGridPreserveTargetSoc: prefixed(prefix, "sensor", "cheap_grid_preserve_target_soc"),
  gridChargeTargetSoc: prefixed(prefix, "sensor", "grid_charge_target_soc"),
  activeReserveTargetSoc: prefixed(prefix, "sensor", "active_reserve_target_soc"),
  paidTimeFloorSoc: prefixed(prefix, "sensor", "paid_time_floor_soc"),
  solarSoakAllowed: prefixed(prefix, "binary_sensor", "solar_soak_allowed"),
  fullSendSoakAllowed: prefixed(prefix, "binary_sensor", "full_send_soak_allowed"),
  paidGridAvoidanceRequired: prefixed(prefix, "binary_sensor", "paid_grid_avoidance_required"),
  solarArrived: prefixed(prefix, "binary_sensor", "solar_arrived"),
  forecastDrainBlocked: prefixed(prefix, "binary_sensor", "forecast_drain_blocked"),
  comfortHeatAllowed: prefixed(prefix, "binary_sensor", "comfort_heat_allowed"),
  thermalShouldShed: prefixed(prefix, "binary_sensor", "thermal_should_shed"),
  thermalShouldEmergencyShed: prefixed(prefix, "binary_sensor", "thermal_should_emergency_shed"),
  underfloorComfortAllowed: prefixed(prefix, "binary_sensor", "underfloor_comfort_allowed"),
  evChargingDetected: prefixed(prefix, "binary_sensor", "ev_charging_detected"),
  evGridBypassRequired: prefixed(prefix, "binary_sensor", "ev_grid_bypass_required"),
  evLatchActive: prefixed(prefix, "binary_sensor", "ev_latch_active"),
  thermalLoadToAdd: prefixed(prefix, "sensor", "thermal_load_to_add"),
  thermalLoadToShed: prefixed(prefix, "sensor", "thermal_load_to_shed"),
  thermalLoadToNormalise: prefixed(prefix, "sensor", "thermal_load_to_normalise"),
  bedroomHeatPumpThermalStatus: prefixed(prefix, "sensor", "bedroom_heat_pump_thermal_status"),
  diningLivingHeatPumpThermalStatus: prefixed(prefix, "sensor", "dining_living_heat_pump_thermal_status"),
  hallwayHeatPumpThermalStatus: prefixed(prefix, "sensor", "hallway_heat_pump_thermal_status"),
  officeHeatPumpThermalStatus: prefixed(prefix, "sensor", "office_heat_pump_thermal_status"),
  bathroomUnderfloorThermalStatus: prefixed(prefix, "sensor", "bathroom_underfloor_thermal_status"),
  underfloorPolicyState: prefixed(prefix, "sensor", "underfloor_policy_state"),
  underfloorReason: prefixed(prefix, "sensor", "underfloor_reason"),
  underfloorCurrentWindow: prefixed(prefix, "sensor", "underfloor_current_window"),
  evExpectedAction: prefixed(prefix, "sensor", "ev_expected_action"),
  evDecisionReason: prefixed(prefix, "sensor", "ev_decision_reason"),
  thermalControlEnabled: prefixed(prefix, "switch", "thermal_control_enabled"),
  thermalActuationMode: prefixed(prefix, "select", "thermal_actuation_mode"),
  directClimateControlEnabled: "switch.deye_energy_manager_direct_climate_control_enabled",
  lastControlAction: "sensor.deye_energy_manager_last_control_action",
  paidTimeGridAvoidanceEnabled: prefixed(prefix, "switch", "paid_time_grid_avoidance_enabled"),
  morningPreheatEnabled: prefixed(prefix, "switch", "morning_preheat_enabled"),
  underfloorScheduleEnabled: prefixed(prefix, "switch", "underfloor_schedule_enabled"),
  evGridBypassEnabled: prefixed(prefix, "switch", "ev_grid_bypass_enabled"),
  evControlEnabled: "switch.deye_energy_manager_ev_control_enabled",
  recalculateNow: "button.deye_energy_manager_recalculate_now",
  applyPlanNow: "button.deye_energy_manager_apply_plan_now",
  forceEvGridBypassStart: prefixed(prefix, "button", "force_ev_grid_bypass_start"),
  forceEvGridBypassRestore: prefixed(prefix, "button", "force_ev_grid_bypass_restore"),
  emergencyShedAllHeatLoads: prefixed(prefix, "button", "emergency_shed_all_heat_loads"),
});

const toCamelCase = (key: string): string => key.replace(/_([a-z])/g, (_, char: string) => char.toUpperCase());

const explicitAliases: Record<string, EntityKey> = {
  raw_soc: "rawSoc",
  grid_power: "gridPower",
  house_power: "housePower",
  pv_power: "pvPower",
};

const normalizeOverrides = (
  defaults: EntityMap,
  overrides?: DeyeEnergyManagerCardConfig["entities"],
): Partial<EntityMap> => {
  if (!overrides) return {};
  return Object.entries(overrides).reduce<Partial<EntityMap>>((normalized, [key, entityId]) => {
    if (!entityId) return normalized;
    const normalizedKey = explicitAliases[key] ?? toCamelCase(key);
    if (normalizedKey in defaults) {
      normalized[normalizedKey as EntityKey] = entityId;
    } else {
      console.warn(`[deye-energy-manager-card] Ignoring unknown entity override key: ${key}`);
    }
    return normalized;
  }, {});
};

export const buildEntityMap = (config: DeyeEnergyManagerCardConfig): EntityMap => ({
  ...defaultEntities(config.entity_prefix ?? DEFAULT_PREFIX),
  ...normalizeOverrides(defaultEntities(config.entity_prefix ?? DEFAULT_PREFIX), config.entities),
});
