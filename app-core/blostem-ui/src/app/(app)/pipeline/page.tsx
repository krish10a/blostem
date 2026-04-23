import { Suspense } from "react";
import PipelineWorkbench from "@/components/pipeline/PipelineWorkbench";
import { MotionSection } from "@/components/motion/BlostemMotion";

export default function PipelinePage() {
  return (
    <MotionSection>
      <Suspense fallback={<div>Loading...</div>}>
        <PipelineWorkbench />
      </Suspense>
    </MotionSection>
  );
}
