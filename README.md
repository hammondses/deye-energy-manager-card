# Deye Energy Manager Card

Standalone Home Assistant Lovelace custom card for the `deye_energy_manager` custom integration.

Card type:

```yaml
type: custom:deye-energy-manager-card
```

This pass focuses on correct structure, entity mapping, responsive layout, and clear data flow. Visual polish, richer illustrations, and animations can be added later without changing the core card model.

## Features

- Controller status header with policy state, expected action, tariff window, solar phase, active plan, budget, and reason.
- Basic power-flow diagram for PV, house, battery, grid, EV, and thermal loads.
- Battery target panel with SOC source, SOC age, target SOC, kWh needed, reachability, and projections.
- Rolling energy budget panel.
- Decision matrix for controller gates.
- Managed thermal, underfloor, and EV load rows.
- Optional controls section for safe switches and guarded action buttons.
- Prefix-based defaults plus per-entity overrides.
- Graceful handling for optional missing entities.

## Installation

### HACS Custom Repository

1. In HACS, open the three-dot menu and choose **Custom repositories**.
2. Add this repository URL.
3. Select category **Lovelace**.
4. Install **Deye Energy Manager Card**.
5. Add the resource if HACS does not do it automatically:

```yaml
url: /hacsfiles/deye-energy-manager-card/deye-energy-manager-card.js
type: module
```

### Manual Install

1. Build or download `deye-energy-manager-card.js`.
2. Copy it to:

```text
config/www/deye-energy-manager-card/deye-energy-manager-card.js
```

3. Add a Lovelace resource:

```yaml
url: /local/deye-energy-manager-card/deye-energy-manager-card.js
type: module
```

## Development

```bash
npm install
npm run build
```

Build output:

```text
dist/deye-energy-manager-card.js
```

## Example YAML

```yaml
type: custom:deye-energy-manager-card
name: Deye Energy Manager
entity_prefix: garage_deye_energy_manager
compact: false
show_controls: true
show_power_flow: true
show_debug_reasons: true
entities:
  rawSoc: sensor.deye_battery_soc
  gridPower: sensor.deye_grid_ct_power
  housePower: sensor.deye_essential_power
  pvPower: sensor.deye_energy_manager_pv_power_now
```

`entity_prefix` defaults to `garage_deye_energy_manager`.

## Core Entities

The card expects at least these decision entities:

| Purpose | Default entity |
| --- | --- |
| Thermal policy state | `sensor.garage_deye_energy_manager_thermal_policy_state` |
| Expected action | `sensor.deye_energy_manager_expected_action` |
| Thermal expected action fallback | `sensor.garage_deye_energy_manager_thermal_expected_action` |
| Discretionary budget | `sensor.garage_deye_energy_manager_discretionary_energy_budget` |
| SOC source or raw SOC | `sensor.garage_deye_energy_manager_soc_source`, `sensor.deye_battery_soc` |

Optional entities are hidden or shown as unknown when unavailable. Missing optional entities do not prevent the card from rendering. The browser console logs each missing entity warning only once.

## Raw Deye Defaults

These defaults are not prefix-based:

```text
sensor.deye_battery_soc
sensor.deye_grid_ct_power
sensor.deye_essential_power
sensor.deye_energy_manager_pv_power_now
sensor.deye_energy_manager_battery_charge
sensor.deye_energy_manager_battery_discharge
sensor.deye_energy_manager_expected_action
sensor.deye_energy_manager_current_tariff_window
sensor.deye_energy_manager_active_plan
switch.deye_energy_manager_ev_control_enabled
button.deye_energy_manager_recalculate_now
button.deye_energy_manager_apply_plan_now
```

## Budget Formula

The budget panel presents the controller's rolling budget model:

```text
Remaining solar
- Battery need
- House load
- Safety buffer
= Discretionary budget
```

Positive budget is green, near-zero budget is amber, and negative budget is red. The card displays the values reported by Home Assistant entities; it does not make policy decisions itself.

## Policy States

| State | Tone |
| --- | --- |
| `battery_priority` | Amber caution |
| `comfort_only` | Blue |
| `solar_soak_allowed` | Green |
| `solar_soak_full_send` | Bright green |
| `normalise` | Amber |
| `shed` | Orange/red |
| `emergency_shed` | Red |
| missing/unknown | Grey |

## Control Safety

The card may call Home Assistant services for configured `switch` and `button` entities.

The following controls require browser confirmation before the service call is made:

- `button.deye_energy_manager_apply_plan_now`
- `button.garage_deye_energy_manager_force_ev_grid_bypass_start`
- `button.garage_deye_energy_manager_force_ev_grid_bypass_restore`
- `button.garage_deye_energy_manager_emergency_shed_all_heat_loads`

The card does not write inverter values directly. It only invokes the Home Assistant entity service for the configured entity.

## Screenshots

Placeholder for Pass 2 visual polish screenshots.

## Notes for Later Passes

- Replace text placeholders in the flow nodes with polished icons or illustrations.
- Add subtle animated flow lines once the v1 data model is proven.
- Add a Lovelace visual editor.
- Add number/select controls for battery target, forecast buffer, underfloor comfort, thermal SOC thresholds, and full soak thresholds.
