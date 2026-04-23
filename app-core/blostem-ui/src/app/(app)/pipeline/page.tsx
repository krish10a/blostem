import { Suspense } from "react";
import PipelineWorkbench from "@/components/pipeline/PipelineWorkbench";
import { DashboardSkeleton } from "@/components/LoadingSkeleton";
import { MotionSection } from "@/components/motion/BlostemMotion";

export default function PipelinePage() {
  return (
    <MotionSection>
      <Suspense fallback={<div className="p-8"><DashboardSkeleton /></div>}>
        <PipelineWorkbench />
      </Suspense>
    </MotionSection>
  );
}
