import Image from "next/image";

export function Logo() {
  return (
    <Image
      src="/WMRS Logo.svg"
      alt="WMRS — Waste Management Reduction Services"
      width={200}
      height={44}
      priority
      unoptimized
      className="h-9 w-auto"
    />
  );
}
