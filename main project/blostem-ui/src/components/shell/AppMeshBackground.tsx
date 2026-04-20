export function AppMeshBackground() {
  return (
    <>
      <div className="bg-mesh pointer-events-none fixed inset-0 z-0 opacity-100" />
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="mesh-blob-drift absolute top-0 left-1/4 h-[500px] w-[800px] rounded-full bg-primary-container/5 blur-[120px]" />
        <div className="mesh-blob-drift-slow absolute -bottom-20 left-[15%] h-[520px] w-[520px] rounded-full bg-primary/10 blur-[140px]" />
        <div className="mesh-blob-drift-fast absolute -top-24 -right-24 h-[520px] w-[520px] rounded-full bg-secondary-container/10 blur-[140px]" />
      </div>
    </>
  );
}

