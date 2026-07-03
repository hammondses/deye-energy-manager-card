import { css } from "lit";

export const styles = css`
  :host {
    display: block;
    --dem-card-bg: var(--ha-card-background, #111827);
    --dem-panel-bg: color-mix(in srgb, var(--dem-card-bg) 88%, white);
    --dem-border: rgba(148, 163, 184, 0.22);
    --dem-muted: var(--secondary-text-color, #9ca3af);
    --dem-text: var(--primary-text-color, #f8fafc);
    --dem-green: #22c55e;
    --dem-bright-green: #84cc16;
    --dem-blue: #38bdf8;
    --dem-amber: #f59e0b;
    --dem-orange: #f97316;
    --dem-red: #ef4444;
    --dem-grey: #64748b;
  }

  ha-card {
    overflow: hidden;
    background: var(--dem-card-bg);
    color: var(--dem-text);
    border-radius: 16px;
  }

  .card {
    padding: 16px;
    display: grid;
    gap: 14px;
  }

  .header {
    display: grid;
    gap: 10px;
    padding: 16px;
    border-radius: 14px;
    background: linear-gradient(135deg, rgba(15, 23, 42, 0.96), rgba(30, 41, 59, 0.86));
    border: 1px solid var(--dem-border);
  }

  .header-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
  }

  h2,
  h3 {
    margin: 0;
    letter-spacing: 0;
  }

  h2 {
    font-size: 1.15rem;
    line-height: 1.25;
  }

  h3 {
    font-size: 0.9rem;
    text-transform: uppercase;
    color: var(--dem-muted);
  }

  .subtitle,
  .reason,
  .small {
    color: var(--dem-muted);
    font-size: 0.85rem;
    line-height: 1.35;
  }

  .status-dot {
    width: 14px;
    height: 14px;
    border-radius: 999px;
    background: var(--tone);
    box-shadow: 0 0 18px var(--tone);
    margin-top: 4px;
    flex: 0 0 auto;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    gap: 14px;
  }

  .panel {
    grid-column: span 6;
    padding: 14px;
    background: var(--dem-panel-bg);
    border: 1px solid var(--dem-border);
    border-radius: 14px;
    min-width: 0;
  }

  .panel.wide {
    grid-column: span 12;
  }

  .panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
  }

  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 9px;
    border: 1px solid color-mix(in srgb, var(--chip-tone) 50%, transparent);
    border-radius: 999px;
    background: color-mix(in srgb, var(--chip-tone) 16%, transparent);
    color: var(--dem-text);
    font-size: 0.78rem;
    min-width: 0;
  }

  .chip span {
    color: var(--dem-muted);
  }

  .green { --chip-tone: var(--dem-green); --tone: var(--dem-green); }
  .bright-green { --chip-tone: var(--dem-bright-green); --tone: var(--dem-bright-green); }
  .blue { --chip-tone: var(--dem-blue); --tone: var(--dem-blue); }
  .amber { --chip-tone: var(--dem-amber); --tone: var(--dem-amber); }
  .orange { --chip-tone: var(--dem-orange); --tone: var(--dem-orange); }
  .red { --chip-tone: var(--dem-red); --tone: var(--dem-red); }
  .grey { --chip-tone: var(--dem-grey); --tone: var(--dem-grey); }

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
    color: var(--dem-muted);
  }

  .value-row strong {
    text-align: right;
  }

  .flow {
    position: relative;
    min-height: 320px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 16px;
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
    stroke: var(--dem-green);
  }

  .flow-node {
    z-index: 1;
    align-self: center;
    justify-self: center;
    width: min(150px, 100%);
    min-height: 76px;
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
    font-size: 1.25rem;
  }

  .node-name {
    font-size: 0.78rem;
    color: var(--dem-muted);
  }

  .node-value {
    font-weight: 700;
  }

  .budget-line {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 0.82rem;
    color: var(--dem-muted);
    white-space: normal;
  }

  details {
    margin-top: 10px;
  }

  summary {
    cursor: pointer;
    color: var(--dem-muted);
    font-size: 0.82rem;
  }

  .load-list,
  .control-list {
    display: grid;
    gap: 8px;
  }

  .load-row,
  .control-row {
    display: grid;
    grid-template-columns: minmax(120px, 1fr) auto;
    gap: 10px;
    align-items: center;
    padding: 9px 10px;
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
    color: var(--dem-text);
    border-radius: 999px;
    padding: 7px 11px;
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease;
  }

  button:hover {
    border-color: rgba(226, 232, 240, 0.55);
  }

  button.danger {
    border-color: color-mix(in srgb, var(--dem-red) 55%, transparent);
    background: color-mix(in srgb, var(--dem-red) 18%, rgba(30, 41, 59, 0.9));
  }

  .setup-warning {
    padding: 12px;
    border: 1px solid color-mix(in srgb, var(--dem-amber) 55%, transparent);
    border-radius: 12px;
    background: color-mix(in srgb, var(--dem-amber) 14%, transparent);
  }

  @media (max-width: 760px) {
    .card {
      padding: 12px;
    }

    .panel,
    .panel.wide {
      grid-column: span 12;
    }

    .flow {
      min-height: 520px;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: repeat(4, 1fr);
    }

    .flow svg {
      display: none;
    }

    .flow-node {
      width: 100%;
    }
  }
`;
