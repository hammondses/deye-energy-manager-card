import { css } from "lit";

export const styles = css`
  :host {
    display: block;
    --dem-card-bg: var(--card-background-color, var(--ha-card-background, var(--secondary-background-color, #1f2937)));
    --dem-panel-bg: var(--secondary-background-color, rgba(31, 41, 55, 0.72));
    --dem-border: rgba(148, 163, 184, 0.2);
    --dem-accent-good: #22c55e;
    --dem-accent-warn: #f59e0b;
    --dem-accent-bad: #ef4444;
    --dem-accent-info: #38bdf8;
    --dem-accent-bright: #84cc16;
    --dem-text-main: var(--primary-text-color, #f8fafc);
    --dem-text-muted: var(--secondary-text-color, #9ca3af);
    --dem-flow-active: #4ade80;
    --dem-flow-inactive: rgba(100, 116, 139, 0.32);
    --flow-solar: #fbbf24;
    --flow-grid: #60a5fa;
    --flow-battery: #22c55e;
    --flow-load: #e5e7eb;
    --flow-ev: #a78bfa;
    --flow-heat: #fb7185;
    --flow-inactive: rgba(100, 116, 139, 0.34);
    --dem-green: var(--dem-accent-good);
    --dem-bright-green: var(--dem-accent-bright);
    --dem-blue: var(--dem-accent-info);
    --dem-amber: var(--dem-accent-warn);
    --dem-orange: #fb923c;
    --dem-red: var(--dem-accent-bad);
    --dem-grey: #64748b;
    --dem-text: var(--dem-text-main);
    --dem-muted: var(--dem-text-muted);
  }

  ha-card {
    overflow: visible;
    background: var(--dem-card-bg);
    color: var(--dem-text-main);
    border: 1px solid var(--dem-border);
    box-shadow: var(--ha-card-box-shadow, none);
  }

  .card {
    display: grid;
    gap: 10px;
    padding: 12px;
    min-width: 0;
  }

  .compact-card {
    width: 100%;
    box-sizing: border-box;
  }

  h2,
  h3 {
    margin: 0;
    letter-spacing: 0;
  }

  h2 {
    font-size: 1rem;
    line-height: 1.2;
  }

  h3 {
    font-size: 0.76rem;
    text-transform: uppercase;
    color: var(--dem-text-muted);
  }

  .small,
  .subtitle,
  .reason,
  .hero-subtitle,
  .hero-context {
    color: var(--dem-text-muted);
    font-size: 0.78rem;
    line-height: 1.25;
  }

  .hero-header {
    display: grid;
    gap: 8px;
    padding: 10px;
    border-bottom: 1px solid rgba(148, 163, 184, 0.14);
  }

  .hero-title {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    align-items: flex-start;
    min-width: 0;
  }

  .hero-title > div:first-child {
    min-width: 0;
  }

  .hero-title h2,
  .hero-subtitle {
    overflow-wrap: normal;
    word-break: normal;
  }

  .header-badges {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 5px;
  }

  .status-badge {
    flex: 0 0 auto;
    border-radius: 999px;
    padding: 4px 8px;
    font-size: 0.7rem;
    font-weight: 800;
    color: var(--dem-text-main);
    border: 1px solid color-mix(in srgb, var(--chip-tone) 55%, transparent);
    background: transparent;
  }

  .hero-context {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .status-dot {
    width: 12px;
    height: 12px;
    border-radius: 999px;
    background: var(--tone);
    margin-top: 4px;
    flex: 0 0 auto;
  }

  .green { --chip-tone: var(--dem-green); --tone: var(--dem-green); }
  .bright-green { --chip-tone: var(--dem-bright-green); --tone: var(--dem-bright-green); }
  .blue { --chip-tone: var(--dem-blue); --tone: var(--dem-blue); }
  .amber { --chip-tone: var(--dem-amber); --tone: var(--dem-amber); }
  .orange { --chip-tone: var(--dem-orange); --tone: var(--dem-orange); }
  .red { --chip-tone: var(--dem-red); --tone: var(--dem-red); }
  .grey { --chip-tone: var(--dem-grey); --tone: var(--dem-grey); }

  .action-summary {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) minmax(118px, 0.45fr);
    gap: 10px;
    align-items: center;
    padding: 11px;
    border: 1px solid color-mix(in srgb, var(--chip-tone) 44%, transparent);
    border-left: 5px solid var(--chip-tone);
    border-radius: 14px;
    background: transparent;
    min-width: 0;
  }

  [data-entity-id]:not([data-entity-id=""]) {
    cursor: pointer;
  }

  .action-icon {
    display: grid;
    place-items: center;
    width: 38px;
    height: 38px;
    border-radius: 12px;
    background: transparent;
    color: var(--chip-tone);
  }

  .action-icon ha-icon {
    --mdc-icon-size: 24px;
  }

  .action-copy,
  .action-next {
    min-width: 0;
  }

  .action-copy span,
  .action-next span {
    display: block;
    color: var(--dem-text-muted);
    font-size: 0.68rem;
    text-transform: uppercase;
  }

  .action-copy strong,
  .action-next strong {
    display: block;
    line-height: 1.15;
    overflow-wrap: normal;
    word-break: normal;
  }

  .action-copy p {
    margin: 3px 0 0;
    color: var(--dem-text-muted);
    font-size: 0.78rem;
    line-height: 1.28;
    overflow-wrap: normal;
    word-break: normal;
  }

  .action-next {
    align-self: stretch;
    display: grid;
    align-content: center;
    padding-left: 10px;
    border-left: 1px solid rgba(148, 163, 184, 0.16);
  }

  .flow-hero {
    position: relative;
    min-height: 292px;
    overflow: visible;
    background: transparent;
    border-radius: 14px;
  }

  .hero-lines {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    color: var(--flow-load);
    pointer-events: none;
  }

  .hero-flow {
    fill: none;
    stroke: var(--flow-inactive);
    stroke-width: var(--flow-width, 3);
    stroke-linecap: round;
    marker-end: url(#hero-arrow);
    opacity: 0.56;
  }

  .hero-flow.active {
    stroke: var(--flow-color);
    opacity: 1;
    stroke-dasharray: 8 10;
    animation: flow-pulse 1.15s linear infinite;
    filter: drop-shadow(0 0 4px color-mix(in srgb, var(--flow-color) 70%, transparent));
  }

  .hero-flow.reverse.active {
    animation-direction: reverse;
  }

  .hero-flow.solar { --flow-color: var(--flow-solar); }
  .hero-flow.grid { --flow-color: var(--flow-grid); }
  .hero-flow.battery { --flow-color: var(--flow-battery); }
  .hero-flow.load { --flow-color: var(--flow-load); }
  .hero-flow.ev { --flow-color: var(--flow-ev); }
  .hero-flow.heat { --flow-color: var(--flow-heat); }

  .hero-lines marker path {
    fill: currentColor;
  }

  .no-animate .hero-flow.active {
    animation: none;
  }

  @media (prefers-reduced-motion: reduce) {
    .hero-flow.active {
      animation: none;
    }
  }

  @keyframes flow-pulse {
    to {
      stroke-dashoffset: -16;
    }
  }

  .sun-node {
    position: absolute;
    width: clamp(72px, 18%, 92px);
    min-height: 64px;
    display: grid;
    justify-items: center;
    align-content: center;
    gap: 2px;
    padding: 7px;
    box-sizing: border-box;
    border-radius: 999px;
    border: 1px solid rgba(148, 163, 184, 0.18);
    background: transparent;
    text-align: center;
    min-width: 0;
  }

  .sun-node.active {
    border-color: color-mix(in srgb, var(--node-color, var(--dem-accent-info)) 42%, transparent);
    box-shadow: none;
  }

  .sun-node ha-icon {
    --mdc-icon-size: 20px;
    color: var(--node-color, var(--dem-accent-info));
  }

  .sun-node span,
  .sun-node em {
    color: var(--dem-text-muted);
    font-size: 0.68rem;
    font-style: normal;
    line-height: 1.12;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .sun-node strong {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 0.77rem;
    line-height: 1.15;
  }

  .flow-hero .solar { --node-color: var(--flow-solar); left: 50%; top: 6px; transform: translateX(-50%); }
  .flow-hero .grid { --node-color: var(--flow-grid); left: 8px; top: 50%; transform: translateY(-50%); }
  .flow-hero .load { --node-color: var(--flow-load); right: 8px; top: 50%; transform: translateY(-50%); }
  .controller {
    --node-color: var(--tone);
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: clamp(104px, 28%, 126px);
    min-height: 86px;
    border-radius: 24px;
    background: transparent;
  }
  .controller ha-icon { --mdc-icon-size: 24px; }
  .controller strong { font-size: 0.78rem; }
  .controller em {
    max-width: 92px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .flow-hero .battery { --node-color: var(--flow-battery); left: 50%; bottom: 6px; transform: translateX(-50%); width: clamp(104px, 28%, 126px); min-height: 78px; border-radius: 22px; }
  .flow-hero .ev { --node-color: var(--flow-ev); left: 12%; bottom: 14px; }
  .flow-hero .heat { --node-color: var(--flow-heat); right: 12%; bottom: 14px; }

  .battery-visual {
    position: relative;
    display: flex;
    align-items: center;
    gap: 1px;
    width: 24px;
    height: 34px;
  }

  .battery-tip {
    position: absolute;
    top: -3px;
    left: 8px;
    width: 8px;
    height: 3px;
    border-radius: 2px 2px 0 0;
    background: rgba(226, 232, 240, 0.7);
  }

  .battery-shell {
    position: relative;
    width: 24px;
    height: 30px;
    border: 2px solid rgba(226, 232, 240, 0.68);
    border-radius: 5px;
    overflow: hidden;
  }

  .battery-fill {
    position: absolute;
    left: 2px;
    right: 2px;
    bottom: 2px;
    height: calc(var(--soc) - 4px);
    min-height: 2px;
    border-radius: 3px;
    background: var(--dem-accent-good);
  }

  .battery-target {
    position: absolute;
    left: 0;
    right: 0;
    bottom: var(--target);
    border-top: 2px solid var(--dem-accent-warn);
  }

  .metric-strip {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 7px;
  }

  .metric-pill {
    min-width: 0;
    padding: 8px 9px;
    border-radius: 12px;
    border: 1px solid color-mix(in srgb, var(--chip-tone) 45%, transparent);
    background: transparent;
  }

  .metric-pill span,
  .metric-pill em {
    display: block;
    color: var(--dem-text-muted);
    font-size: 0.69rem;
    font-style: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .metric-pill strong {
    display: block;
    margin-top: 2px;
    font-size: 0.86rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .compact-decisions,
  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .chip {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    min-width: 0;
    padding: 4px 8px;
    border: 1px solid color-mix(in srgb, var(--chip-tone) 48%, transparent);
    border-radius: 999px;
    background: transparent;
    color: var(--dem-text-main);
    font-size: 0.72rem;
    line-height: 1.2;
    max-width: 100%;
    white-space: normal;
    overflow-wrap: normal;
    word-break: normal;
  }

  .chip span {
    color: var(--dem-text-muted);
  }

  .drawer {
    border: 1px solid rgba(148, 163, 184, 0.16);
    border-radius: 13px;
    background: transparent;
  }

  details {
    margin: 0;
  }

  summary {
    cursor: pointer;
    color: var(--dem-text-muted);
    font-size: 0.78rem;
    padding: 9px 10px;
    list-style-position: inside;
  }

  .drawer-body {
    display: grid;
    gap: 9px;
    padding: 0 10px 10px;
  }

  .detail-block {
    display: grid;
    gap: 7px;
    padding: 9px;
    border: 1px solid rgba(148, 163, 184, 0.14);
    border-radius: 11px;
    background: transparent;
  }

  .drawer-body .panel,
  .drawer-body .panel.wide {
    grid-column: auto;
  }

  .budget-line {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 0.76rem;
    color: var(--dem-text-muted);
    white-space: normal;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    gap: 14px;
  }

  .panel {
    grid-column: span 6;
    padding: 12px;
    background: transparent;
    border: 1px solid var(--dem-border);
    border-radius: 14px;
    min-width: 0;
  }

  .panel.wide {
    grid-column: span 12;
  }

  .panel-header,
  .header-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    margin-bottom: 10px;
  }

  .header {
    display: grid;
    gap: 8px;
    padding: 14px;
    border-radius: 14px;
    background: transparent;
    border: 1px solid var(--dem-border);
  }

  .flow {
    position: relative;
    min-height: 300px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 14px;
  }

  .flow svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .flow-line {
    stroke: rgba(100, 116, 139, 0.36);
    stroke-width: 3;
    marker-end: url(#arrow);
    transition: stroke 0.2s ease, opacity 0.2s ease;
  }

  .flow-line.active {
    stroke: var(--dem-accent-good);
  }

  .flow-node {
    z-index: 1;
    align-self: center;
    justify-self: center;
    width: min(140px, 100%);
    min-height: 70px;
    border: 1px solid var(--dem-border);
    border-radius: 13px;
    background: transparent;
    display: grid;
    align-content: center;
    justify-items: center;
    gap: 4px;
    padding: 10px;
    text-align: center;
    min-width: 0;
  }

  .node-icon {
    font-size: 1rem;
  }

  .node-name {
    font-size: 0.74rem;
    color: var(--dem-text-muted);
  }

  .node-value {
    font-weight: 700;
    overflow-wrap: normal;
    word-break: normal;
  }

  .value-row {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    padding: 7px 0;
    border-bottom: 1px solid rgba(148, 163, 184, 0.12);
  }

  .value-row:last-child {
    border-bottom: 0;
  }

  .value-row span {
    color: var(--dem-text-muted);
  }

  .value-row strong {
    text-align: right;
    overflow-wrap: normal;
    word-break: normal;
  }

  .load-list,
  .control-list,
  .control-grid {
    display: grid;
    gap: 7px;
  }

  .controls-panel {
    display: grid;
    gap: 9px;
    padding: 10px;
    border: 1px solid var(--dem-border);
    border-radius: 14px;
    background: transparent;
  }

  .controls-panel .panel-header {
    margin-bottom: 0;
  }

  .control-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .load-row,
  .control-row {
    display: grid;
    grid-template-columns: minmax(120px, 1fr) auto;
    gap: 8px;
    align-items: center;
    padding: 8px 9px;
    border: 1px solid rgba(148, 163, 184, 0.14);
    border-radius: 10px;
    background: transparent;
  }

  .control-row strong {
    display: block;
    font-size: 0.84rem;
    line-height: 1.2;
  }

  .action-drawer {
    border-top: 1px solid rgba(148, 163, 184, 0.14);
    padding-top: 2px;
  }

  .action-drawer summary {
    padding: 8px 0;
  }

  .action-list {
    padding-top: 4px;
  }

  .load-meta {
    min-width: 0;
  }

  .load-meta strong,
  .load-meta span {
    display: block;
    overflow-wrap: normal;
    word-break: normal;
  }

  button {
    border: 1px solid var(--dem-border);
    background: transparent;
    color: var(--dem-text-main);
    border-radius: 999px;
    padding: 7px 11px;
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease;
  }

  button:hover {
    border-color: rgba(226, 232, 240, 0.55);
  }

  button.danger {
    border-color: color-mix(in srgb, var(--dem-accent-bad) 55%, transparent);
    background: transparent;
  }

  .switch-button {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    min-width: 72px;
    justify-content: center;
  }

  .switch-track {
    position: relative;
    display: inline-block;
    width: 32px;
    height: 18px;
    border-radius: 999px;
    border: 1px solid var(--dem-border);
    box-sizing: border-box;
  }

  .switch-thumb {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 12px;
    height: 12px;
    border-radius: 999px;
    background: var(--dem-text-muted);
    transition: transform 0.16s ease, background 0.16s ease;
  }

  .switch-button.on {
    border-color: color-mix(in srgb, var(--dem-accent-good) 62%, transparent);
    color: var(--dem-text-main);
  }

  .switch-button.on .switch-thumb {
    transform: translateX(14px);
    background: var(--dem-accent-good);
  }

  .setup-warning {
    padding: 10px;
    border: 1px solid color-mix(in srgb, var(--dem-accent-warn) 55%, transparent);
    border-radius: 12px;
    background: transparent;
  }

  @media (max-width: 520px) {
    .card {
      padding: 10px;
    }

    .flow-hero {
      min-height: 330px;
    }

    .hero-title,
    .action-summary {
      grid-template-columns: 1fr;
    }

    .hero-title {
      display: grid;
    }

    .header-badges {
      justify-content: flex-start;
    }

    .action-summary {
      align-items: start;
    }

    .action-next {
      padding-left: 0;
      padding-top: 9px;
      border-left: 0;
      border-top: 1px solid rgba(148, 163, 184, 0.16);
    }

    .sun-node {
      width: 74px;
      min-height: 60px;
      padding: 6px;
    }

    .controller {
      width: 96px;
      min-height: 80px;
    }

    .battery {
      width: 96px;
    }

    .grid,
    .metric-strip,
    .control-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .panel,
    .panel.wide {
      grid-column: span 12;
    }

    .flow-hero .grid { left: 2px; }
    .flow-hero .load { right: 2px; }
    .flow-hero .heat { right: 10px; }
    .flow-hero .ev { left: 10px; }
  }
`;
