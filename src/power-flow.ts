import type { HassEntityState } from "./types";
import { cleanState, numberState } from "./helpers";

export type FlowState = {
  pvPower?: number;
  batteryCharge?: number;
  batteryDischarge?: number;
  gridPower?: number;
  housePower?: number;
  evPower?: number;
  thermalLoads?: string;
  pvActive: boolean;
  batteryCharging: boolean;
  batteryDischarging: boolean;
  gridImporting: boolean;
  gridExporting: boolean;
  evActive: boolean;
  thermalActive: boolean;
};

export const buildFlowState = (input: {
  pvPower?: HassEntityState;
  batteryCharge?: HassEntityState;
  batteryDischarge?: HassEntityState;
  gridPower?: HassEntityState;
  housePower?: HassEntityState;
  evPower?: HassEntityState;
  thermalLoads?: HassEntityState;
}): FlowState => {
  const pvPower = numberState(input.pvPower);
  const batteryCharge = numberState(input.batteryCharge);
  const batteryDischarge = numberState(input.batteryDischarge);
  const gridPower = numberState(input.gridPower);
  const housePower = numberState(input.housePower);
  const evPower = numberState(input.evPower);
  const thermalLoads = cleanState(input.thermalLoads);

  return {
    pvPower,
    batteryCharge,
    batteryDischarge,
    gridPower,
    housePower,
    evPower,
    thermalLoads,
    pvActive: (pvPower ?? 0) > 100,
    batteryCharging: (batteryCharge ?? 0) > 100,
    batteryDischarging: (batteryDischarge ?? 0) > 100,
    gridImporting: (gridPower ?? 0) > 100,
    gridExporting: (gridPower ?? 0) < -100,
    evActive: (evPower ?? 0) > 300,
    thermalActive: Boolean(thermalLoads && thermalLoads !== "none"),
  };
};
