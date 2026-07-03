import { css } from "lit";

export const styles = css`
  :host {
    display: block;
    --dem-card-bg: var(--ha-card-background, #0b1220);
    --dem-panel-bg: color-mix(in srgb, var(--dem-card-bg) 82%, white);
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
    overflow: hidden;
    background:
      radial-gradient(circle at 50% 8%, rgba(56, 189, 248, 0.12), transparent 34%),
      linear-gradient(180deg, color-mix(in srgb, var(--dem-card-bg) 92%, white), var(--dem-card-bg));
    color: var(--dem-text-main);
    border-radius: 18px;
    border: 1px solid rgba(148, 163, 184, 0.18);
  }

  .card {
    display: grid;
    gap: 10px;
    padding: 12px;
  }

  .compact-card {
    max-width: 680px;
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
  .hero-reason {
    color: var(--dem-text-muted);
    font-size: 0.78rem;
    line-height: 1.25;
  }

  .hero-header {
    display: grid;
    gap: 4px;
    padding: 10px 11px;
    border: 1px solid var(--dem-border);
    border-radius: 14px;
    background: rgba(15, 23, 42, 0.72);
  }

  .hero-title {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    align-items: flex-start;
  }

  .status-badge {
    flex: 0 0 auto;
    border-radius: 999px;
    padding: 5px 9px;
    font-size: 0.74rem;
    font-weight: 800;
    color: var(--dem-text-main);
    border: 1px solid color-mix(in srgb, var(--chip-tone) 55%, transparent);
    background: color-mix(in srgb, var(--chip-tone) 20%, transparent);
  }

  .status-dot {
    width: 12px;
    height: 12px;
    border-radius: 999px;
    background: var(--tone);
    box-shadow: 0 0 16px var(--tone);
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

  .flow-hero {
    position: relative;
    height: 315px;
    border: 1px solid var(--dem-border);
    border-radius: 18px;
    overflow: hidden;
    background:
      radial-gradient(circle at 50% 49%, rgba(56, 189, 248, 0.12), transparent 33%),
      rgba(2, 6, 23, 0.42);
  }

  .hero-lines {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    color: var(--dem-flow-active);
    pointer-events: none;
  }

  .hero-flow {
    fill: none;
    stroke: var(--dem-flow-inactive);
    stroke-width: var(--flow-width, 3);
    stroke-linecap: round;
    marker-end: url(#hero-arrow);
    opacity: 0.62;
  }

  .hero-flow.active {
    stroke: var(--dem-flow-active);
    opacity: 1;
    stroke-dasharray: 7 9;
    animation: flow-pulse 1.2s linear infinite;
    filter: drop-shadow(0 0 4px rgba(74, 222, 128, 0.55));
  }

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

  .hero-node {
    position: absolute;
    width: 86px;
    min-height: 72px;
    display: grid;
    justify-items: center;
    align-content: center;
    gap: 3px;
    padding: 8px;
    box-sizing: border-box;
    border-radius: 20px;
    border: 1px solid rgba(148, 163, 184, 0.22);
    background: linear-gradient(180deg, rgba(30, 41, 59, 0.92), rgba(15, 23, 42, 0.88));
    box-shadow: 0 12px 26px rgba(0, 0, 0, 0.24);
    text-align: center;
  }

  .hero-node.primary {
    width: 104px;
    min-height: 86px;
    border-color: rgba(56, 189, 248, 0.34);
    background: linear-gradient(180deg, rgba(30, 41, 59, 0.98), rgba(8, 13, 26, 0.95));
  }

  .hero-node ha-icon {
    --mdc-icon-size: 22px;
    color: var(--dem-accent-info);
  }

  .hero-node span {
    color: var(--dem-text-muted);
    font-size: 0.72rem;
  }

  .hero-node strong {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 0.8rem;
    line-height: 1.15;
  }

  .pv { left: calc(50% - 43px); top: 11px; }
  .grid { left: 16px; top: calc(50% - 36px); }
  .home { left: calc(50% - 52px); top: calc(50% - 43px); }
  .load { right: 16px; top: calc(50% - 36px); }
  .battery { left: calc(50% - 52px); bottom: 12px; }
  .ev { right: 44px; bottom: 16px; }
  .heat { left: 44px; bottom: 16px; }

  .battery-visual {
    position: relative;
    display: flex;
    align-items: center;
    gap: 1px;
    width: 24px;
    height: 40px;
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
    height: 36px;
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
    background: linear-gradient(180deg, var(--dem-accent-bright), var(--dem-accent-good));
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
    background: color-mix(in srgb, var(--chip-tone) 12%, rgba(15, 23, 42, 0.72));
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
    background: color-mix(in srgb, var(--chip-tone) 14%, transparent);
    color: var(--dem-text-main);
    font-size: 0.72rem;
    line-height: 1.2;
  }

  .chip span {
    color: var(--dem-text-muted);
  }

  .drawer {
    border: 1px solid rgba(148, 163, 184, 0.16);
    border-radius: 13px;
    background: rgba(15, 23, 42, 0.42);
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
    background: rgba(2, 6, 23, 0.28);
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
    background: var(--dem-panel-bg);
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
    background: rgba(15, 23, 42, 0.72);
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
    background: rgba(15, 23, 42, 0.86);
    display: grid;
    align-content: center;
    justify-items: center;
    gap: 4px;
    padding: 10px;
    text-align: center;
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
  }

  .load-list,
  .control-list {
    display: grid;
    gap: 7px;
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
    background: rgba(15, 23, 42, 0.46);
  }

  .load-meta {
    min-width: 0;
  }

  .load-meta strong,
  .load-meta span {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  button {
    border: 1px solid var(--dem-border);
    background: rgba(30, 41, 59, 0.9);
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
    background: color-mix(in srgb, var(--dem-accent-bad) 18%, rgba(30, 41, 59, 0.9));
  }

  .setup-warning {
    padding: 10px;
    border: 1px solid color-mix(in srgb, var(--dem-accent-warn) 55%, transparent);
    border-radius: 12px;
    background: color-mix(in srgb, var(--dem-accent-warn) 14%, transparent);
  }

  @media (max-width: 520px) {
    .card {
      padding: 10px;
    }

    .flow-hero {
      height: 340px;
    }

    .hero-node {
      width: 78px;
      min-height: 68px;
      padding: 7px;
    }

    .hero-node.primary {
      width: 96px;
    }

    .grid,
    .metric-strip {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .panel,
    .panel.wide {
      grid-column: span 12;
    }

    .heat { left: 16px; }
    .ev { right: 16px; }
  }
`;
