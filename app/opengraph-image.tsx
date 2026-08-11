import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "WMRS - Waste Management Reduction Services";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#1E2428",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            color: "#2E7D4F",
            fontSize: "13px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            marginBottom: "32px",
          }}
        >
          WASTE MANAGEMENT REDUCTION SERVICES
        </div>
        <div
          style={{
            color: "white",
            fontSize: "68px",
            fontWeight: 800,
            lineHeight: 1.1,
            maxWidth: "920px",
          }}
        >
          You&apos;re probably overpaying for trash.
        </div>
        <div
          style={{
            color: "#F7F8F7",
            fontSize: "26px",
            marginTop: "36px",
            opacity: 0.65,
          }}
        >
          Free audit. No upfront cost. 50/50 savings split.
        </div>
        <div
          style={{
            marginTop: "60px",
            borderTop: "1px solid #2E7D4F",
            paddingTop: "20px",
            color: "#F7F8F7",
            fontSize: "18px",
            opacity: 0.5,
          }}
        >
          wmrs.com
        </div>
      </div>
    ),
    size
  );
}
