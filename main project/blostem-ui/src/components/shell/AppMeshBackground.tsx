import { FloatingOrb } from "@/components/motion/BlostemMotion";

export function AppMeshBackground() {
  return (
    <>
      <div className="bg-mesh pointer-events-none fixed inset-0 z-0 opacity-100" />
      <div className="pointer-events-none fixed inset-0 z-0">
        <FloatingOrb
          className="absolute -left-[10%] top-[-10%] h-[40rem] w-[40rem] rounded-full bg-primary-container/12 blur-[140px]"
          duration={26}
        />
        <FloatingOrb
          className="absolute left-[18%] top-[12%] h-[32rem] w-[52rem] rounded-full bg-primary/8 blur-[130px]"
          duration={20}
          delay={0.4}
        />
        <FloatingOrb
          className="absolute -bottom-28 left-[8%] h-[36rem] w-[36rem] rounded-full bg-primary/12 blur-[150px]"
          duration={30}
          delay={0.9}
        />
        <FloatingOrb
          className="absolute -top-24 right-[-8%] h-[34rem] w-[34rem] rounded-full bg-secondary-container/12 blur-[145px]"
          duration={18}
          delay={0.2}
        />
        <FloatingOrb
          className="absolute bottom-[8%] right-[18%] h-[22rem] w-[22rem] rounded-full bg-sky-400/8 blur-[120px]"
          duration={24}
          delay={0.6}
        />
      </div>
    </>
  );
}
