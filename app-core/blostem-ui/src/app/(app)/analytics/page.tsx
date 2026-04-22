import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import { MotionCard, MotionSection } from "@/components/motion/BlostemMotion";

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <MotionCard className="mouse-glow haptic-hover rounded-xl border border-outline-variant/15 bg-surface-container-low/70 p-6 backdrop-blur-md">
        <h1 className="font-headline text-2xl font-bold text-on-surface">Executive Analytics</h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          Blostem AI performance overview across the full pipeline.
        </p>
      </MotionCard>
      <MotionSection delay={0.08}>
        <AnalyticsDashboard />
      </MotionSection>
    </div>
  );
}
