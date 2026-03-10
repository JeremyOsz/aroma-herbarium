import { Suspense } from "react";
import { HerbariumExplorer } from "@/components/herbarium-explorer";

export default function Home() {
  return (
    <Suspense fallback={null}>
      <HerbariumExplorer />
    </Suspense>
  );
}
