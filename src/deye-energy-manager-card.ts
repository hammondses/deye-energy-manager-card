import { LitElement, html, nothing, type TemplateResult } from "lit";
import { customElement, property, state as litState } from "lit/decorators.js";
import { buildEntityMap, requiredEntityKeys } from "./entity-map";
import {
  binaryOn,
  booleanTone,
  budgetTone,
  callEntityService,
  chip,
  cleanState,
  formatEnergy,
  formatLabel,
  formatPercent,
  formatPower,
  getEntity,
  numberState,
  state,
  statusToneForPolicy,
  valueRow,
} from "./helpers";
import { buildFlowState, type FlowState } from "./power-flow";
import { styles } from "./styles";
import type { DeyeEnergyManagerCardConfig, EntityKey, EntityMap, HassEntityState, HomeAssistant, StatusTone } from "./types";

const CARD_VERSION = "0.3.1";

@customElement("deye-energy-manager-card")
export class DeyeEnergyManagerCard extends LitElement {
  static override styles = styles;

  @property({ attribute: false }) public hass?: HomeAssistant;
  @litState() private config?: DeyeEnergyManagerCardConfig;
  @litState() private detailsOpen = false;
  @litState() private controlsOpen = false;
  private entities?: EntityMap;

  public setConfig(config: DeyeEnergyManagerCardConfig): void {
    if (!config) throw new Error("Invalid configuration");
    this.config = {
      name: "Deye Energy Manager",
      compact: true,
      show_details: false,
      show_controls: false,
      show_power_flow: true,
      show_debug_reasons: false,
      animate_flows: true,
      ...config,
    };
    this.entities = buildEntityMap(this.config);
  }

  public getCardSize(): number {
    return this.config?.compact ? 7 : 12;
  }

  public getGridOptions(): Record<string, number> {
    return this.config?.compact
      ? { rows: 7, columns: 12, min_rows: 5, min_columns: 6 }
      : { rows: 12, columns: 12, min_rows: 8, min_columns: 6 };
  }

  protected override render(): TemplateResult {
    if (!this.hass || !this.config || !this.entities) return html``;

    const missingRequired = requiredEntityKeys.filter((key) => {
      const entity = getEntity(this.hass!, this.entities!, key, true);
      if (key === "expectedAction") return !entity && !getEntity(this.hass!, this.entities!, "thermalExpectedAction", true);
      return !entity;
    });

    return this.config.compact ? this.renderCompact(missingRequired) : this.renderFull(missingRequired);
  }

  private renderFull(missingRequired: EntityKey[]): TemplateResult {
    return html`
      <ha-card>
        <div class="card full-card">
          ${missingRequired.length ? this.renderSetupWarning(missingRequired) : nothing}
          ${this.renderHeader()}
          <div class="grid">
            ${this.config?.show_power_flow === false ? nothing : this.renderPowerFlow()}
            ${this.renderBatteryTarget()}
            ${this.renderEnergyBudget()}
            ${this.renderDecisionMatrix()}
            ${this.renderManagedLoads()}
            ${this.config?.show_controls ? this.renderControls() : nothing}
          </div>
        </div>
      </ha-card>
    `;
  }

  private renderCompact(missingRequired: EntityKey[]): TemplateResult {
    const flow = this.currentFlowState();
    const policy = cleanState(this.entity("thermalPolicyState"));
    const tone = statusToneForPolicy(policy);

    return html`
      <ha-card>
        <div class="card compact-card ${this.config?.animate_flows === false ? "no-animate" : "animate"}">
          ${missingRequired.length ? this.renderSetupWarning(missingRequired) : nothing}
          ${this.renderCompactHeader(tone)}
          ${this.renderActionSummary(flow)}
          ${this.config?.show_power_flow === false ? nothing : this.renderFlowHero(flow)}
          ${this.renderMetricStrip()}
          ${this.renderCompactDecisionChips()}
          ${this.renderDetailsDrawer()}
          ${this.config?.show_controls ? this.renderControls() : nothing}
        </div>
      </ha-card>
    `;
  }

  private entity(key: EntityKey, warn = false): HassEntityState | undefined {
    return this.hass && this.entities ? getEntity(this.hass, this.entities, key, warn) : undefined;
  }

  private renderSetupWarning(missing: EntityKey[]): TemplateResult {
    return html`
      <div class="setup-warning">
        <strong>Setup warning</strong>
        <div class="small">
          Missing core entities: ${missing.map((key) => this.entities?.[key] ?? key).join(", ")}
        </div>
      </div>
    `;
  }

  private renderHeader(): TemplateResult {
    const policy = cleanState(this.entity("thermalPolicyState"));
    const expected = cleanState(this.entity("expectedAction")) ?? cleanState(this.entity("thermalExpectedAction"));
    const budget = numberState(this.entity("discretionaryEnergyBudget"));
    const tone = statusToneForPolicy(policy);
    const reason = cleanState(this.entity("energyBudgetReason")) ?? cleanState(this.entity("thermalActionReason"));

    return html`
      <section class="header ${tone}">
        <div class="header-top">
          <div>
            <h2>${this.config?.name}</h2>
            <div class="subtitle">
              ${formatLabel(policy)} · ${formatLabel(expected)} · Budget ${formatEnergy(budget)}
            </div>
          </div>
          <span class="status-dot"></span>
        </div>
        <div class="chips">
          ${chip({ label: "Tariff", value: formatLabel(cleanState(this.entity("tariffWindow"))), tone: "grey" })}
          ${chip({ label: "Solar", value: formatLabel(cleanState(this.entity("solarPhase"))), tone: "blue" })}
          ${chip({ label: "Plan", value: formatLabel(cleanState(this.entity("activePlan"))), tone: "grey" })}
        </div>
        ${reason ? html`<div class="reason">${reason}</div>` : nothing}
      </section>
    `;
  }

  private renderCompactHeader(tone: StatusTone): TemplateResult {
    const policy = cleanState(this.entity("thermalPolicyState"));
    const expected = cleanState(this.entity("expectedAction")) ?? cleanState(this.entity("thermalExpectedAction"));
    const budget = numberState(this.entity("discretionaryEnergyBudget"));
    const reachable = binaryOn(this.entity("batteryTargetReachableToday"));
    const shortReason = reachable === false
      ? "Target not reachable today"
      : formatLabel(expected);

    return html`
      <section class="hero-header ${tone}">
        <div class="hero-title">
          <div>
            <h2>${this.config?.name}</h2>
            <div class="hero-subtitle">${shortReason}</div>
          </div>
          <div class="header-badges">
            <span class="status-badge ${tone}">${this.statusBadgeLabel(policy)}</span>
            <span class="status-badge ${budgetTone(budget)}">Budget ${formatEnergy(budget)}</span>
          </div>
        </div>
        <div class="hero-context">
          ${chip({ label: "Tariff", value: formatLabel(cleanState(this.entity("tariffWindow"))), tone: "grey" })}
          ${chip({ label: "Solar", value: formatLabel(cleanState(this.entity("solarPhase"))), tone: "blue" })}
          ${chip({ label: "Plan", value: formatLabel(cleanState(this.entity("activePlan"))), tone: "grey" })}
        </div>
      </section>
    `;
  }

  private renderActionSummary(flow: FlowState): TemplateResult {
    const summary = this.activeSummary(flow);
    return html`
      <section class=${`action-summary ${summary.tone}`}>
        <div class="action-icon"><ha-icon icon=${summary.icon}></ha-icon></div>
        <div class="action-copy">
          <span>Active now</span>
          <strong>${summary.title}</strong>
          <p>${summary.detail}</p>
        </div>
        <div class="action-next">
          <span>Next</span>
          <strong>${summary.next}</strong>
        </div>
      </section>
    `;
  }

  private activeSummary(flow: FlowState): { title: string; detail: string; next: string; tone: StatusTone; icon: string } {
    const policy = cleanState(this.entity("thermalPolicyState"));
    const expected = cleanState(this.entity("expectedAction")) ?? cleanState(this.entity("thermalExpectedAction"));
    const reason = cleanState(this.entity("evDecisionReason"))
      ?? cleanState(this.entity("energyBudgetReason"))
      ?? cleanState(this.entity("thermalActionReason"));
    const evCharging = binaryOn(this.entity("evChargingDetected")) ?? flow.evActive;
    const evBypass = binaryOn(this.entity("evGridBypassRequired"));
    const evLatch = binaryOn(this.entity("evLatchActive"));
    const paidAvoid = binaryOn(this.entity("paidGridAvoidanceRequired"));
    const reachable = binaryOn(this.entity("batteryTargetReachableToday"));
    const budget = numberState(this.entity("discretionaryEnergyBudget"));

    if (evCharging && evBypass) {
      return {
        title: "EV cheap-grid bypass",
        detail: "Cheap grid is feeding the EV and house. Battery grid top-up is paused while the EV is active.",
        next: evLatch ? "Resume after EV stop and latch clear" : "Resume when EV stops",
        tone: "blue",
        icon: "mdi:ev-station",
      };
    }

    if (policy === "emergency_shed") {
      return {
        title: "Emergency load shed",
        detail: reason ?? "Battery reserve protection is active and managed loads are being removed.",
        next: "Restore after reserve recovers",
        tone: "red",
        icon: "mdi:alert-octagon",
      };
    }

    if (policy === "shed") {
      return {
        title: "Shedding managed loads",
        detail: reason ?? "The controller is reducing discretionary load to protect the energy plan.",
        next: "Normalise when budget improves",
        tone: "orange",
        icon: "mdi:power-plug-off",
      };
    }

    if (policy === "solar_soak_full_send" || policy === "solar_soak_allowed") {
      return {
        title: policy === "solar_soak_full_send" ? "Full solar soak" : "Solar soak allowed",
        detail: reason ?? "Surplus solar budget is available for managed loads.",
        next: reachable === false ? "Re-check target reachability" : "Hold until budget changes",
        tone: policy === "solar_soak_full_send" ? "bright-green" : "green",
        icon: "mdi:weather-sunny",
      };
    }

    if (paidAvoid) {
      return {
        title: "Avoiding paid grid import",
        detail: "Active reserve is lowered so the battery can serve house load instead of preserving charge.",
        next: "Return reserve at cheap grid or solar window",
        tone: "amber",
        icon: "mdi:transmission-tower-off",
      };
    }

    if (flow.batteryCharging) {
      return {
        title: "Battery top-up active",
        detail: `Battery is charging at ${formatPower(flow.batteryCharge)} toward the morning target.`,
        next: budget !== undefined && budget < 0 ? "Stop if budget is exhausted" : "Stop at target SOC",
        tone: "green",
        icon: "mdi:battery-charging",
      };
    }

    if (flow.batteryDischarging) {
      return {
        title: "Battery serving load",
        detail: `Battery is supplying ${formatPower(flow.batteryDischarge)} to reduce grid import.`,
        next: "Import only when reserve requires it",
        tone: "amber",
        icon: "mdi:battery-arrow-down",
      };
    }

    return {
      title: formatLabel(expected),
      detail: reason ?? "No high-priority override is active.",
      next: "Waiting for tariff, solar, SOC, or load change",
      tone: statusToneForPolicy(policy),
      icon: "mdi:lightning-bolt-circle",
    };
  }

  private statusBadgeLabel(policy?: string): string {
    if (policy === "emergency_shed") return "Emergency";
    if (policy === "shed") return "Shed";
    if (policy === "solar_soak_full_send") return "Full send";
    if (policy === "solar_soak_allowed") return "Soak";
    return formatLabel(policy);
  }

  private currentFlowState(): FlowState {
    return buildFlowState({
      pvPower: this.entity("pvPower"),
      batteryCharge: this.entity("batteryCharge"),
      batteryDischarge: this.entity("batteryDischarge"),
      gridPower: this.entity("gridPower"),
      housePower: this.entity("housePower"),
      evPower: this.entity("evDetectedPower"),
      thermalLoads: this.entity("activeThermalLoads"),
    });
  }

  private batterySoc(): number | undefined {
    return numberState(this.entity("rawSoc"))
      ?? this.attributeNumber(this.entity("socSource"), [
        "soc",
        "battery_soc",
        "current_soc",
        "last_known_good_soc",
        "last_known_soc",
        "value",
      ]);
  }

  private attributeNumber(entity: HassEntityState | undefined, names: string[]): number | undefined {
    if (!entity) return undefined;
    for (const name of names) {
      const value = Number(entity.attributes[name]);
      if (Number.isFinite(value)) return value;
    }
    return undefined;
  }

  private renderFlowHero(flow: FlowState): TemplateResult {
    const soc = this.batterySoc();
    const target = numberState(this.entity("dailyBatteryTargetSoc"));
    const policy = cleanState(this.entity("thermalPolicyState"));
    const expected = cleanState(this.entity("expectedAction")) ?? cleanState(this.entity("thermalExpectedAction"));
    const tone = statusToneForPolicy(policy);
    const underfloorAllowed = binaryOn(this.entity("underfloorComfortAllowed"));
    const underfloorPolicy = cleanState(this.entity("underfloorPolicyState"));
    const batteryState = flow.batteryCharging
      ? `Charging ${formatPower(flow.batteryCharge)}`
      : flow.batteryDischarging
        ? `Discharging ${formatPower(flow.batteryDischarge)}`
        : "Idle";
    const heatLabel = flow.thermalActive
      ? formatLabel(flow.thermalLoads)
      : underfloorAllowed === false
        ? "Hold"
        : underfloorPolicy
          ? formatLabel(underfloorPolicy)
          : "Idle";

    return html`
      <section class=${`flow-hero sunsynk ${tone}`}>
        ${this.renderHeroFlowLines(flow)}
        ${this.powerNode("Solar", "mdi:solar-power-variant", formatPower(flow.pvPower), undefined, "solar", flow.pvActive)}
        ${this.powerNode("Grid", "mdi:transmission-tower", this.gridLabel(flow), undefined, "grid", flow.gridImporting || flow.gridExporting)}
        ${this.controllerNode(policy, expected, tone)}
        ${this.powerNode("Load", "mdi:home-lightning-bolt", formatPower(flow.housePower), undefined, "load", (flow.housePower ?? 0) > 100)}
        ${this.batteryNode(soc, target, batteryState)}
        ${this.powerNode("EV", "mdi:ev-station", flow.evActive ? formatPower(flow.evPower) : "Idle", undefined, "ev satellite", flow.evActive)}
        ${this.powerNode("Heat/Floor", "mdi:heat-pump", heatLabel, undefined, "heat satellite", flow.thermalActive || underfloorAllowed === false)}
      </section>
    `;
  }

  private renderHeroFlowLines(flow: FlowState): TemplateResult {
    const loadActive = (flow.housePower ?? 0) > 100;
    const gridActive = flow.gridImporting || flow.gridExporting;
    const batteryActive = flow.batteryCharging || flow.batteryDischarging;

    return html`
      <svg class="hero-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <marker id="hero-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z"></path>
          </marker>
        </defs>
        ${this.flowPath("solar", "M50 22 L50 41", flow.pvActive, flow.pvPower)}
        ${this.flowPath("grid", flow.gridExporting ? "M42 50 L23 50" : "M23 50 L42 50", gridActive, flow.gridPower, flow.gridExporting)}
        ${this.flowPath("load", "M58 50 L77 50", loadActive, flow.housePower)}
        ${this.flowPath("battery", flow.batteryDischarging ? "M50 77 L50 59" : "M50 59 L50 77", batteryActive, flow.batteryCharge ?? flow.batteryDischarge, flow.batteryDischarging)}
        ${this.flowPath("ev", "M45 58 C39 65 33 72 27 80", flow.evActive, flow.evPower)}
        ${this.flowPath("heat", "M55 58 C61 65 67 72 73 80", flow.thermalActive)}
      </svg>
    `;
  }

  private flowPath(channel: string, path: string, active: boolean, power?: number, reverse = false): TemplateResult {
    const width = Math.max(2.4, Math.min(5.6, Math.abs(power ?? 350) / 650));
    return html`<path class=${`hero-flow ${channel} ${active ? "active" : ""} ${reverse ? "reverse" : ""}`} d=${path} style=${`--flow-width:${width.toFixed(1)};`}></path>`;
  }

  private powerNode(
    label: string,
    icon: string,
    value: string,
    subvalue: string | undefined,
    className: string,
    active: boolean,
  ): TemplateResult {
    return html`
      <div class=${`sun-node ${className} ${active ? "active" : ""}`}>
        <ha-icon icon=${icon}></ha-icon>
        <span>${label}</span>
        <strong>${value}</strong>
        ${subvalue ? html`<em>${subvalue}</em>` : nothing}
      </div>
    `;
  }

  private controllerNode(policy?: string, expected?: string, tone: StatusTone = "grey"): TemplateResult {
    return html`
      <div class=${`sun-node controller active ${tone}`}>
        <ha-icon icon="mdi:lightning-bolt-circle"></ha-icon>
        <span>Controller</span>
        <strong>${formatLabel(policy)}</strong>
        <em>${formatLabel(expected)}</em>
      </div>
    `;
  }

  private batteryNode(soc?: number, target?: number, stateText = "Idle"): TemplateResult {
    const fill = Math.max(0, Math.min(100, soc ?? 0));
    const marker = Math.max(0, Math.min(100, target ?? 0));
    return html`
      <div class="sun-node battery active">
        <div class="battery-visual" style=${`--soc:${fill}%;--target:${marker}%;`}>
          <div class="battery-tip"></div>
          <div class="battery-shell">
            <span class="battery-fill"></span>
            ${target !== undefined ? html`<span class="battery-target"></span>` : nothing}
          </div>
        </div>
        <span>Battery</span>
        <strong>${formatPercent(soc)} · ${stateText}</strong>
      </div>
    `;
  }

  private renderMetricStrip(): TemplateResult {
    const soc = this.batterySoc();
    const source = cleanState(this.entity("socSource"));
    const age = numberState(this.entity("socAgeMinutes"));
    const target = numberState(this.entity("dailyBatteryTargetSoc"));
    const reachable = binaryOn(this.entity("batteryTargetReachableToday"));
    const need = numberState(this.entity("batteryKwhNeededToTarget"));
    const solar = numberState(this.entity("remainingSolarBudget"));
    const budget = numberState(this.entity("discretionaryEnergyBudget"));

    return html`
      <section class="metric-strip">
        ${this.metricPill("SOC", `${formatPercent(soc)} → ${formatPercent(target)}`, source === "last_known_good" ? "amber" : "blue", source === "last_known_good" ? `SOC cached${age !== undefined ? ` · ${Math.round(age)}m` : ""}` : undefined)}
        ${this.metricPill("Need", formatEnergy(need), need !== undefined && need > 0 ? "amber" : "green", reachable === false ? "Target not reachable" : undefined)}
        ${this.metricPill("Solar left", formatEnergy(solar), "blue")}
        ${this.metricPill("Budget", formatEnergy(budget), budgetTone(budget))}
      </section>
    `;
  }

  private metricPill(label: string, value: string, tone: StatusTone, note?: string): TemplateResult {
    return html`
      <div class=${`metric-pill ${tone}`}>
        <span>${label}</span>
        <strong>${value}</strong>
        ${note ? html`<em>${note}</em>` : nothing}
      </div>
    `;
  }

  private renderCompactDecisionChips(): TemplateResult {
    const chips = this.compactGateChips();
    return html`<section class="compact-decisions">${chips}</section>`;
  }

  private compactGateChips(): Array<TemplateResult | typeof nothing> {
    const gates: Array<[EntityKey, string, string, string, boolean]> = [
      ["batteryTargetReachableToday", "Target", "Yes", "No", true],
      ["discretionaryBudgetPositive", "Budget", "Positive", "Negative", true],
      ["solarSoakAllowed", "Soak", "Allowed", "Blocked", true],
      ["paidGridAvoidanceRequired", "Grid", "Avoid", "Idle", false],
      ["thermalShouldShed", "Shed", "Yes", "No", false],
      ["underfloorComfortAllowed", "Floor", "Allowed", "Hold", true],
      ["evChargingDetected", "EV", "Charging", "Idle", true],
    ];

    return gates.map(([key, label, onText, offText, positiveWhenOn]) => {
      const value = binaryOn(this.entity(key));
      if (value === undefined) return nothing;
      return chip({ label, value: value ? onText : offText, tone: booleanTone(value, positiveWhenOn) });
    });
  }

  private renderDetailsDrawer(): TemplateResult {
    const open = Boolean(this.config?.show_details || this.detailsOpen);
    return html`
      <section class="drawer">
        <details ?open=${open} @toggle=${this.handleDetailsToggle}>
          <summary>Details</summary>
          ${open ? html`
            <div class="drawer-body">
              ${this.renderEnergyBudgetDetail()}
              ${this.renderDecisionMatrix()}
              ${this.renderManagedLoads()}
              ${this.renderSocDetail()}
            </div>
          ` : nothing}
        </details>
      </section>
    `;
  }

  private handleDetailsToggle(event: Event): void {
    this.detailsOpen = (event.currentTarget as HTMLDetailsElement).open;
  }

  private renderEnergyBudgetDetail(): TemplateResult {
    const remainingSolar = numberState(this.entity("remainingSolarBudget"));
    const batteryNeed = numberState(this.entity("batteryKwhNeededToTarget"));
    const houseLoad = numberState(this.entity("expectedHouseLoadUntilSolarEnd"));
    const buffer = numberState(this.entity("forecastFullConfidenceBuffer"));
    const budget = numberState(this.entity("discretionaryEnergyBudget"));
    const reason = cleanState(this.entity("energyBudgetReason"));

    return html`
      <div class="detail-block">
        <h3>Energy Budget</h3>
        <div class="budget-line">
          ${formatEnergy(remainingSolar)} solar - ${formatEnergy(batteryNeed)} battery -
          ${formatEnergy(houseLoad)} house - ${formatEnergy(buffer)} buffer = ${formatEnergy(budget)}
        </div>
        ${reason ? html`<div class="reason">${reason}</div>` : nothing}
      </div>
    `;
  }

  private renderSocDetail(): TemplateResult {
    const source = cleanState(this.entity("socSource"));
    const age = numberState(this.entity("socAgeMinutes"));
    const projectedEnd = numberState(this.entity("projectedEndSoc"));
    const full = cleanState(this.entity("projectedTimeToFull"));

    return html`
      <div class="detail-block">
        <h3>SOC Source</h3>
        <div class="chips">
          ${chip({ label: "Source", value: formatLabel(source), tone: source === "last_known_good" ? "amber" : "blue" })}
          ${age !== undefined ? chip({ label: "Age", value: `${Math.round(age)}m`, tone: "grey" }) : nothing}
          ${chip({ label: "Projected", value: formatPercent(projectedEnd), tone: "grey" })}
          ${full ? chip({ label: "Full", value: full, tone: "grey" }) : nothing}
        </div>
      </div>
    `;
  }

  private renderPowerFlow(): TemplateResult {
    const flow = this.currentFlowState();

    return html`
      <section class="panel wide">
        <div class="panel-header">
          <h3>Power Flow</h3>
          ${chip({ label: "Grid", value: this.gridLabel(flow), tone: flow.gridExporting ? "green" : flow.gridImporting ? "amber" : "grey" })}
        </div>
        <div class="flow">
          ${this.renderFlowLines(flow)}
          ${this.flowNode("Solar", "PV", formatPower(flow.pvPower), 1, 1)}
          ${this.flowNode("Battery", "BAT", flow.batteryCharging ? `Charging ${formatPower(flow.batteryCharge)}` : flow.batteryDischarging ? `Discharging ${formatPower(flow.batteryDischarge)}` : "Idle", 1, 3)}
          ${this.flowNode("Grid", "GRID", this.gridLabel(flow), 2, 1)}
          ${this.flowNode("House", "LOAD", formatPower(flow.housePower), 2, 2)}
          ${this.flowNode("EV", "EV", flow.evActive ? formatPower(flow.evPower) : "Idle", 3, 1)}
          ${this.flowNode("Thermal", "HEAT", flow.thermalActive ? formatLabel(flow.thermalLoads) : "Idle", 3, 3)}
        </div>
      </section>
    `;
  }

  private renderFlowLines(flow: FlowState): TemplateResult {
    const active = (condition: boolean): string => condition ? "active" : "";
    return html`
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor"></path>
          </marker>
        </defs>
        <line class="flow-line ${active(flow.pvActive)}" x1="18" y1="18" x2="50" y2="50"></line>
        <line class="flow-line ${active(flow.batteryCharging)}" x1="26" y1="24" x2="74" y2="24"></line>
        <line class="flow-line ${active(flow.gridExporting)}" x1="48" y1="48" x2="18" y2="50"></line>
        <line class="flow-line ${active(flow.batteryDischarging)}" x1="74" y1="30" x2="54" y2="48"></line>
        <line class="flow-line ${active(flow.gridImporting)}" x1="18" y1="52" x2="46" y2="52"></line>
        <line class="flow-line ${active(flow.evActive)}" x1="46" y1="56" x2="18" y2="82"></line>
        <line class="flow-line ${active(flow.thermalActive)}" x1="54" y1="56" x2="76" y2="82"></line>
      </svg>
    `;
  }

  private flowNode(label: string, icon: string, value: string, row: number, column: number): TemplateResult {
    return html`
      <div class="flow-node" style=${`grid-row:${row};grid-column:${column};`}>
        <div class="node-icon">${icon}</div>
        <div class="node-name">${label}</div>
        <div class="node-value">${value}</div>
      </div>
    `;
  }

  private gridLabel(flow: FlowState): string {
    if (flow.gridImporting) return `Import ${formatPower(flow.gridPower)}`;
    if (flow.gridExporting) return `Export ${formatPower(Math.abs(flow.gridPower ?? 0))}`;
    return formatPower(flow.gridPower);
  }

  private renderBatteryTarget(): TemplateResult {
    const soc = this.batterySoc();
    const source = cleanState(this.entity("socSource"));
    const age = numberState(this.entity("socAgeMinutes"));
    const target = numberState(this.entity("dailyBatteryTargetSoc"));
    const reachable = binaryOn(this.entity("batteryTargetReachableToday"));
    const socLine = `${formatPercent(soc)}${source ? ` · ${source.replace(/_/g, " ")}` : ""}${age !== undefined ? ` · ${Math.round(age)}m old` : ""}`;

    return html`
      <section class="panel">
        <div class="panel-header">
          <h3>Battery Target</h3>
          ${chip({
            label: "Reachable",
            value: reachable === undefined ? "Unknown" : reachable ? "Yes" : "No",
            tone: booleanTone(reachable),
          })}
        </div>
        ${valueRow("SOC", socLine, source === "last_known_good" ? "amber" : undefined)}
        ${valueRow("Target SOC", formatPercent(target))}
        ${valueRow("Need", formatEnergy(numberState(this.entity("batteryKwhNeededToTarget"))))}
        ${reachable === false ? valueRow("Status", "Target not reachable today", "red") : nothing}
        ${valueRow("Projected End SOC", formatPercent(numberState(this.entity("projectedEndSoc"))))}
        ${valueRow("Projected Full", cleanState(this.entity("projectedTimeToFull")) ?? "--")}
      </section>
    `;
  }

  private renderEnergyBudget(): TemplateResult {
    const remainingSolar = numberState(this.entity("remainingSolarBudget"));
    const batteryNeed = numberState(this.entity("batteryKwhNeededToTarget"));
    const houseLoad = numberState(this.entity("expectedHouseLoadUntilSolarEnd"));
    const buffer = numberState(this.entity("forecastFullConfidenceBuffer"));
    const budget = numberState(this.entity("discretionaryEnergyBudget"));
    const positive = binaryOn(this.entity("discretionaryBudgetPositive"));
    const reason = cleanState(this.entity("energyBudgetReason"));
    const tone = budgetTone(budget);

    return html`
      <section class="panel">
        <div class="panel-header">
          <h3>Energy Budget</h3>
          ${chip({ label: "Budget", value: formatEnergy(budget), tone })}
        </div>
        ${valueRow("Discretionary", formatEnergy(budget), tone)}
        ${valueRow("Budget positive", positive === undefined ? "Unknown" : positive ? "Yes" : "No", booleanTone(positive))}
        <div class="budget-line">
          ${formatEnergy(remainingSolar)} solar - ${formatEnergy(batteryNeed)} battery -
          ${formatEnergy(houseLoad)} house - ${formatEnergy(buffer)} buffer = ${formatEnergy(budget)}
        </div>
        ${reason ? html`
          <details ?open=${this.config?.show_debug_reasons}>
            <summary>Reason</summary>
            <div class="reason">${reason}</div>
          </details>
        ` : nothing}
      </section>
    `;
  }

  private renderDecisionMatrix(): TemplateResult {
    const gates: Array<[EntityKey, string, string, string, boolean]> = [
      ["batteryTargetReachableToday", "Target", "Reachable", "Not reachable", true],
      ["discretionaryBudgetPositive", "Budget", "Positive", "Negative", true],
      ["solarSoakAllowed", "Solar soak", "Allowed", "Blocked", true],
      ["fullSendSoakAllowed", "Full send", "Allowed", "Blocked", true],
      ["paidGridAvoidanceRequired", "Paid grid", "Active", "Idle", true],
      ["solarArrived", "Solar", "Arrived", "Waiting", true],
      ["forecastDrainBlocked", "Drain block", "Blocked", "Clear", false],
      ["comfortHeatAllowed", "Comfort", "Allowed", "Hold", true],
      ["thermalShouldShed", "Shed", "Yes", "No", false],
      ["thermalShouldEmergencyShed", "Emergency", "Shed", "No", false],
      ["underfloorComfortAllowed", "Underfloor", "Allowed", "Hold", true],
      ["evChargingDetected", "EV", "Charging", "Idle", true],
      ["evGridBypassRequired", "EV bypass", "Required", "Idle", false],
      ["evLatchActive", "EV latch", "Active", "Idle", true],
    ];

    return html`
      <section class="panel wide">
        <div class="panel-header"><h3>Decision Matrix</h3></div>
        <div class="chips">
          ${gates.map(([key, label, onText, offText, positiveWhenOn]) => {
            const value = binaryOn(this.entity(key));
            if (value === undefined) return nothing;
            return chip({
              label,
              value: value ? onText : offText,
              tone: booleanTone(value, positiveWhenOn),
              entityId: this.entities?.[key],
            });
          })}
        </div>
      </section>
    `;
  }

  private renderManagedLoads(): TemplateResult {
    const thermalKeys: EntityKey[] = [
      "bedroomHeatPumpThermalStatus",
      "diningLivingHeatPumpThermalStatus",
      "hallwayHeatPumpThermalStatus",
      "officeHeatPumpThermalStatus",
      "bathroomUnderfloorThermalStatus",
    ];

    return html`
      <section class="panel wide">
        <div class="panel-header">
          <h3>Managed Loads</h3>
          ${chip({ label: "Active thermal", value: formatLabel(cleanState(this.entity("activeThermalLoads"))), tone: "grey" })}
        </div>
        <div class="load-list">
          ${thermalKeys.map((key) => this.renderThermalLoad(key))}
          ${this.renderUnderfloorRow()}
          ${this.renderEvRow()}
        </div>
      </section>
    `;
  }

  private renderThermalLoad(key: EntityKey): TemplateResult | typeof nothing {
    const entity = this.entity(key);
    if (!entity) return nothing;
    const attrs = entity.attributes;
    const loadName = String(attrs.load_name ?? formatLabel(entity.entity_id.split(".")[1]));
    const currentTemp = attrs.current_temperature !== undefined ? `${attrs.current_temperature}°` : undefined;
    const targetTemp = attrs.target_temperature !== undefined ? `${attrs.target_temperature}°` : undefined;
    const estimated = attrs.estimated_load_w !== undefined ? formatPower(Number(attrs.estimated_load_w)) : undefined;
    const owner = attrs.owner ?? (attrs.owned_by_manager ? "manager" : undefined);
    const reason = attrs.not_chosen_reason ?? attrs.lease_reason ?? attrs.underfloor_reason;
    const badges = [
      attrs.chosen_for_add ? "add" : undefined,
      attrs.chosen_for_shed ? "shed" : undefined,
      state(this.entity("thermalLoadToNormalise")) === entity.state ? "normalise" : undefined,
      attrs.needs_soak ? "needs soak" : undefined,
      attrs.satisfied ? "satisfied" : undefined,
    ].filter(Boolean).join(" · ");

    return html`
      <div class="load-row">
        <div class="load-meta">
          <strong>${loadName}</strong>
          <span class="small">
            ${formatLabel(cleanState(entity) ?? entity.state)}
            ${currentTemp || targetTemp ? ` · ${currentTemp ?? "--"} / ${targetTemp ?? "--"}` : ""}
            ${owner ? ` · ${owner}` : ""}
            ${estimated ? ` · ${estimated}` : ""}
          </span>
          ${reason ? html`<span class="small">${String(reason)}</span>` : nothing}
        </div>
        ${badges ? chip({ label: "Role", value: badges, tone: attrs.chosen_for_shed ? "orange" : "blue" }) : nothing}
      </div>
    `;
  }

  private renderUnderfloorRow(): TemplateResult {
    const allowed = binaryOn(this.entity("underfloorComfortAllowed"));
    const policy = cleanState(this.entity("underfloorPolicyState"));
    const reason = cleanState(this.entity("underfloorReason"));
    const window = cleanState(this.entity("underfloorCurrentWindow"));

    return html`
      <div class="load-row">
        <div class="load-meta">
          <strong>Underfloor</strong>
          <span class="small">${formatLabel(policy)}${window ? ` · ${formatLabel(window)}` : ""}</span>
          ${reason ? html`<span class="small">${reason}</span>` : nothing}
        </div>
        ${chip({ label: "Comfort", value: allowed ? "Allowed" : "Hold", tone: booleanTone(allowed) })}
      </div>
    `;
  }

  private renderEvRow(): TemplateResult {
    const charging = binaryOn(this.entity("evChargingDetected"));
    const bypass = binaryOn(this.entity("evGridBypassRequired"));
    const latch = binaryOn(this.entity("evLatchActive"));
    const power = numberState(this.entity("evDetectedPower"));
    const action = cleanState(this.entity("evExpectedAction"));
    const reason = cleanState(this.entity("evDecisionReason"));

    return html`
      <div class="load-row">
        <div class="load-meta">
          <strong>EV</strong>
          <span class="small">${charging ? "Charging" : "Idle"} · ${formatPower(power)}${action ? ` · ${formatLabel(action)}` : ""}</span>
          ${reason ? html`<span class="small">${reason}</span>` : nothing}
        </div>
        <div class="chips">
          ${chip({ label: "Bypass", value: bypass ? "Required" : "Idle", tone: booleanTone(bypass, false) })}
          ${chip({ label: "Latch", value: latch ? "Active" : "Idle", tone: booleanTone(latch) })}
        </div>
      </div>
    `;
  }

  private renderControls(): TemplateResult {
    const open = this.controlsOpen;
    const switches: Array<[EntityKey, string]> = [
      ["thermalControlEnabled", "Thermal control"],
      ["paidTimeGridAvoidanceEnabled", "Paid grid avoidance"],
      ["morningPreheatEnabled", "Morning preheat"],
      ["underfloorScheduleEnabled", "Underfloor schedule"],
      ["evGridBypassEnabled", "EV grid bypass"],
      ["evControlEnabled", "EV control"],
    ];
    const buttons: Array<[EntityKey, string, boolean]> = [
      ["recalculateNow", "Recalculate now", false],
      ["applyPlanNow", "Apply plan now", true],
      ["forceEvGridBypassStart", "Force EV bypass", true],
      ["forceEvGridBypassRestore", "Restore EV bypass", true],
      ["emergencyShedAllHeatLoads", "Emergency shed heat", true],
    ];

    return html`
      <section class="drawer controls-drawer">
        <details ?open=${open} @toggle=${this.handleControlsToggle}>
          <summary>Controls</summary>
          ${open ? html`
            <div class="control-list drawer-body">
              ${switches.map(([key, label]) => this.renderSwitchControl(key, label))}
              ${buttons.map(([key, label, danger]) => this.renderButtonControl(key, label, danger))}
            </div>
          ` : nothing}
        </details>
      </section>
    `;
  }

  private handleControlsToggle(event: Event): void {
    this.controlsOpen = (event.currentTarget as HTMLDetailsElement).open;
  }

  private renderSwitchControl(key: EntityKey, label: string): TemplateResult | typeof nothing {
    const entity = this.entity(key);
    if (!entity || !this.hass) return nothing;
    const on = entity.state === "on";
    return html`
      <div class="control-row">
        <div>
          <strong>${label}</strong>
          <div class="small">${entity.entity_id}</div>
        </div>
        <button @click=${() => this.handleService(entity.entity_id)}>${on ? "Turn off" : "Turn on"}</button>
      </div>
    `;
  }

  private renderButtonControl(key: EntityKey, label: string, danger: boolean): TemplateResult | typeof nothing {
    const entity = this.entity(key);
    if (!entity || !this.hass) return nothing;
    return html`
      <div class="control-row">
        <div>
          <strong>${label}</strong>
          <div class="small">${entity.entity_id}</div>
        </div>
        <button class=${danger ? "danger" : ""} @click=${() => this.handleService(entity.entity_id, danger)}>${danger ? "Confirm" : "Run"}</button>
      </div>
    `;
  }

  private async handleService(entityId: string, confirmFirst = false): Promise<void> {
    if (!this.hass) return;
    if (confirmFirst && !window.confirm(`Run ${entityId}?`)) return;
    await callEntityService(this.hass, entityId);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "deye-energy-manager-card": DeyeEnergyManagerCard;
  }

  interface Window {
    customCards?: Array<Record<string, unknown>>;
  }
}

window.customCards = window.customCards ?? [];
window.customCards.push({
  type: "deye-energy-manager-card",
  name: "Deye Energy Manager Card",
  description: "Decision-focused Deye Energy Manager Lovelace card",
  preview: true,
});

console.info(`%cDEYE-ENERGY-MANAGER-CARD ${CARD_VERSION}`, "color: #22c55e; font-weight: 700");
