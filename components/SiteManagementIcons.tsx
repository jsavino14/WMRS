// Six line-art icons for the site management "You report it once" grid.
// Style: thin charcoal strokes, single green accent, no filled shapes.
// Same visual family as the homepage overcharge icons.

const C = "#1E2428"; // charcoal stroke
const G = "#2E7D4F"; // green accent
const SW = 1.5;      // default stroke-width

export function InvoiceReviewIcon() {
  // Document body + line items + green checkmark in corner
  return (
    <svg viewBox="0 0 42 50" fill="none" style={{ height: 50, width: "auto", display: "block" }}>
      {/* Document */}
      <rect x="3" y="3" width="30" height="42" stroke={C} strokeWidth={SW} />
      {/* Line items */}
      <line x1="9" y1="15" x2="27" y2="15" stroke={C} strokeWidth={SW} />
      <line x1="9" y1="23" x2="27" y2="23" stroke={C} strokeWidth={SW} />
      <line x1="9" y1="31" x2="19" y2="31" stroke={C} strokeWidth={SW} />
      {/* Green checkmark */}
      <polyline points="20,37 24,43 33,30" stroke={G} strokeWidth="2" />
    </svg>
  );
}

export function ServiceChaseIcon() {
  // Flag pole (the report) + green arrow (we chase it)
  return (
    <svg viewBox="0 0 60 44" fill="none" style={{ height: 44, width: "auto", display: "block" }}>
      {/* Flag pole */}
      <line x1="8" y1="4" x2="8" y2="40" stroke={C} strokeWidth={SW} />
      {/* Flag */}
      <polyline points="8,5 28,11 8,20" stroke={C} strokeWidth={SW} />
      {/* Green arrow: we chase it */}
      <line x1="34" y1="22" x2="52" y2="22" stroke={G} strokeWidth={SW} />
      <polyline points="47,17 53,22 47,27" stroke={G} strokeWidth={SW} />
    </svg>
  );
}

export function ContainerSizingIcon() {
  // Dumpster outline + green bidirectional arrow (sizing)
  return (
    <svg viewBox="0 0 48 58" fill="none" style={{ height: 58, width: "auto", display: "block" }}>
      {/* Lid */}
      <line x1="4" y1="12" x2="44" y2="12" stroke={C} strokeWidth={SW + 0.5} />
      {/* Handle on lid */}
      <rect x="18" y="5" width="12" height="7" stroke={C} strokeWidth={SW} />
      {/* Container body */}
      <rect x="6" y="12" width="36" height="30" stroke={C} strokeWidth={SW} />
      {/* Center divider line */}
      <line x1="24" y1="12" x2="24" y2="42" stroke={C} strokeWidth={0.8} opacity={0.4} />
      {/* Green bidirectional arrow (sizing) */}
      <line x1="7" y1="50" x2="41" y2="50" stroke={G} strokeWidth={SW} />
      <polyline points="11,46 7,50 11,54" stroke={G} strokeWidth={SW} />
      <polyline points="37,46 41,50 37,54" stroke={G} strokeWidth={SW} />
    </svg>
  );
}

export function RenewalTrackingIcon() {
  // Calendar with a green-highlighted renewal date cell
  return (
    <svg viewBox="0 0 46 46" fill="none" style={{ height: 46, width: "auto", display: "block" }}>
      {/* Calendar body */}
      <rect x="2" y="8" width="42" height="36" stroke={C} strokeWidth={SW} />
      {/* Header bar */}
      <line x1="2" y1="18" x2="44" y2="18" stroke={C} strokeWidth={SW} />
      {/* Ring hangers */}
      <line x1="13" y1="4" x2="13" y2="12" stroke={C} strokeWidth={2} />
      <line x1="33" y1="4" x2="33" y2="12" stroke={C} strokeWidth={2} />
      {/* Grid (faint) */}
      <line x1="17" y1="18" x2="17" y2="44" stroke={C} strokeWidth={0.75} opacity={0.35} />
      <line x1="31" y1="18" x2="31" y2="44" stroke={C} strokeWidth={0.75} opacity={0.35} />
      <line x1="2"  y1="28" x2="44" y2="28" stroke={C} strokeWidth={0.75} opacity={0.35} />
      <line x1="2"  y1="38" x2="44" y2="38" stroke={C} strokeWidth={0.75} opacity={0.35} />
      {/* Green: renewal window cell */}
      <rect x="32" y="29" width="12" height="9" stroke={G} strokeWidth={SW} />
    </svg>
  );
}

export function MultiLocationIcon() {
  // Three building outlines (different heights) with green connecting baseline
  return (
    <svg viewBox="0 0 58 46" fill="none" style={{ height: 46, width: "auto", display: "block" }}>
      {/* Building 1 (left) */}
      <rect x="2"  y="14" width="13" height="22" stroke={C} strokeWidth={SW} />
      <rect x="5"  y="18" width="4"  height="4"  stroke={C} strokeWidth={0.9} />
      <rect x="5"  y="26" width="4"  height="4"  stroke={C} strokeWidth={0.9} />
      {/* Building 2 (center, tallest) */}
      <rect x="23" y="8"  width="13" height="28" stroke={C} strokeWidth={SW} />
      <rect x="26" y="12" width="4"  height="4"  stroke={C} strokeWidth={0.9} />
      <rect x="26" y="20" width="4"  height="4"  stroke={C} strokeWidth={0.9} />
      {/* Building 3 (right) */}
      <rect x="44" y="18" width="12" height="18" stroke={C} strokeWidth={SW} />
      <rect x="47" y="22" width="4"  height="4"  stroke={C} strokeWidth={0.9} />
      {/* Green connecting line (consolidated) */}
      <line x1="8"  y1="42" x2="50" y2="42" stroke={G} strokeWidth={SW} />
      <line x1="8"  y1="36" x2="8"  y2="42" stroke={G} strokeWidth={SW} />
      <line x1="29" y1="36" x2="29" y2="42" stroke={G} strokeWidth={SW} />
      <line x1="50" y1="36" x2="50" y2="42" stroke={G} strokeWidth={SW} />
    </svg>
  );
}

export function DirectContactIcon() {
  // Mobile phone outline + green signal bars (reads unmistakably as a phone)
  return (
    <svg viewBox="0 0 44 46" fill="none" style={{ height: 46, width: "auto", display: "block" }}>
      {/* Phone body */}
      <rect x="8" y="2" width="20" height="36" stroke={C} strokeWidth={SW} />
      {/* Speaker slot */}
      <line x1="14" y1="7" x2="22" y2="7" stroke={C} strokeWidth={1.2} />
      {/* Screen area */}
      <rect x="11" y="11" width="14" height="16" stroke={C} strokeWidth={0.75} opacity={0.45} />
      {/* Home bar */}
      <line x1="14" y1="33" x2="22" y2="33" stroke={C} strokeWidth={1.2} />
      {/* Green signal bars (outside, top-right) */}
      <rect x="31" y="20" width="3" height="6"  fill={G} />
      <rect x="36" y="15" width="3" height="11" fill={G} />
      <rect x="31" y="10" width="3" height="3"  fill={G} opacity={0.35} />
    </svg>
  );
}

// Map icon key → component (same order as siteManagement.whatWeDoSection.items)
export const SITE_MGMT_ICONS: Record<string, () => React.ReactElement> = {
  "invoice-review":   InvoiceReviewIcon,
  "service-chase":    ServiceChaseIcon,
  "container-sizing": ContainerSizingIcon,
  "renewal-tracking": RenewalTrackingIcon,
  "multi-location":   MultiLocationIcon,
  "direct-contact":   DirectContactIcon,
};
