import { MaterialIcon } from "@/components/shell/MaterialIcon";
import { MotionButton, MotionCard, MotionGroup } from "@/components/motion/BlostemMotion";

export default function BillingPage() {
  return (
    <div className="space-y-8">
      <MotionCard className="mouse-glow haptic-hover rounded-2xl border border-outline-variant/10 bg-surface-container-low/60 p-6 backdrop-blur-md">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <h2 className="font-headline text-3xl font-bold tracking-tight text-on-surface">
              Settings & Billing
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-on-surface-variant">
              Manage your organization’s configuration, billing plan, and operational preferences.
            </p>
          </div>
          <div className="flex gap-3">
            <MotionButton>
              <button className="inline-flex items-center gap-2 rounded-lg border border-outline-variant/30 px-4 py-2 text-sm font-medium text-on-surface hover:bg-surface-container-high hover:border-outline-variant/50 transition-all">
              <MaterialIcon name="download" className="text-sm" />
              Export Data
            </button>
            </MotionButton>
            <MotionButton delay={0.08}>
              <button className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-primary-container px-4 py-2 text-sm font-medium text-on-primary shadow-[0_0_15px_rgba(177,197,255,0.2)] hover:shadow-[0_0_20px_rgba(177,197,255,0.4)] transition-all">
              <MaterialIcon name="save" className="text-sm" />
              Save Changes
            </button>
            </MotionButton>
          </div>
        </div>
      </MotionCard>

      <MotionGroup className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <MotionCard className="mouse-glow haptic-hover rounded-2xl border border-outline-variant/10 bg-surface-container/50 p-6 backdrop-blur-md" delay={0.08}>
            <h3 className="font-headline text-xl font-bold text-on-surface mb-6 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
                <MaterialIcon name="person" className="text-primary text-sm" />
              </span>
              Profile Management
            </h3>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {[
                { label: "Full Name", value: "Sarah Jenkins", type: "text" },
                { label: "Title", value: "Head of Operations", type: "text" },
                { label: "Email Address", value: "sarah.j@blostem.ai", type: "email", span: 2 },
              ].map((f) => (
                <div key={f.label} className={f.span === 2 ? "sm:col-span-2" : ""}>
                  <label className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                    {f.label}
                  </label>
                  <input
                    className="mt-2 w-full rounded-xl border border-outline-variant/20 bg-surface/50 px-4 py-2.5 text-sm text-on-surface shadow-inner focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all"
                    defaultValue={f.value}
                    type={f.type}
                  />
                </div>
              ))}
            </div>
          </MotionCard>

          <MotionCard className="mouse-glow haptic-hover rounded-2xl border border-outline-variant/10 bg-surface-container/50 p-6 backdrop-blur-md" delay={0.14}>
            <h3 className="font-headline text-xl font-bold text-on-surface mb-6 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-secondary/20 bg-secondary/10">
                <MaterialIcon name="tune" className="text-secondary text-sm" />
              </span>
              App Preferences
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-xl border border-white/5 bg-surface/30 p-4">
                <div>
                  <div className="text-sm font-medium text-on-surface">Theme</div>
                  <div className="mt-1 text-xs text-on-surface-variant">
                    This UI is optimized for dark, low-light operations.
                  </div>
                </div>
                <div className="rounded-lg border border-white/5 bg-surface-container-highest/80 p-1 shadow-inner">
                  <button className="rounded-md bg-surface px-3 py-1.5 text-sm text-primary border border-white/10">
                    <span className="inline-flex items-center gap-2">
                      <MaterialIcon name="dark_mode" className="text-sm" fill />
                      Dark
                    </span>
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-white/5 bg-surface/30 p-4">
                <div>
                  <div className="text-sm font-medium text-on-surface">Email Notifications</div>
                  <div className="mt-1 text-xs text-on-surface-variant">
                    Receive daily summaries and alerts.
                  </div>
                </div>
                <div className="h-6 w-11 rounded-full border border-white/10 bg-surface-container-highest/80 shadow-inner relative">
                  <div className="absolute left-[2px] top-[2px] h-5 w-5 rounded-full bg-white" />
                </div>
              </div>
            </div>
          </MotionCard>
        </div>

        <div className="space-y-6">
          <MotionCard className="mouse-glow haptic-hover rounded-2xl border border-outline-variant/10 bg-surface-container/50 p-6 backdrop-blur-md" delay={0.2}>
            <div className="flex items-start justify-between">
              <h3 className="font-headline text-xl font-bold text-on-surface flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-tertiary/20 bg-tertiary/10">
                  <MaterialIcon name="credit_card" className="text-tertiary text-sm" />
                </span>
                Current Plan
              </h3>
              <span className="rounded-md border border-primary/20 bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                Pro Tier
              </span>
            </div>
            <div className="mt-6 border-b border-white/5 pb-6">
              <div className="flex items-baseline gap-1">
                <span className="font-headline text-4xl font-extrabold text-on-surface">$299</span>
                <span className="text-sm text-on-surface-variant">/mo</span>
              </div>
              <p className="mt-2 text-xs text-on-surface-variant">
                Next billing date: Oct 15, 2024
              </p>
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-on-surface-variant">API Requests</span>
                <span className="text-on-surface font-medium">45k / 50k</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-container-highest/80 shadow-inner">
                <div className="h-full w-[90%] rounded-full bg-gradient-to-r from-primary to-primary-container" />
              </div>
              <button className="w-full rounded-xl bg-gradient-to-r from-primary to-primary-container py-2.5 text-sm font-medium text-on-primary shadow-[0_0_15px_rgba(177,197,255,0.2)] hover:shadow-[0_0_25px_rgba(177,197,255,0.4)] transition-all">
                Upgrade Plan
              </button>
              <button className="w-full rounded-xl border border-white/10 bg-surface/30 py-2.5 text-sm font-medium text-on-surface hover:bg-surface-container-highest hover:border-white/20 transition-all">
                Manage Billing
              </button>
            </div>
          </MotionCard>
        </div>
      </MotionGroup>
    </div>
  );
}
