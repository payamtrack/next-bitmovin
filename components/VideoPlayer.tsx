"use client";

import dynamic from "next/dynamic";

// the below code will cause an error
// import BitmovinPlayer from "@/components/BitmovinPlayer";

// so we should disable ssr
const BitmovinPlayer = dynamic(() => import("@/components/BitmovinPlayer"), {
  ssr: false,
});
export default function VideoPlayer() {
  return <BitmovinPlayer />;
}
