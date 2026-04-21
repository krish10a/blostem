import { Skeleton } from "@/components/ui/skeleton"

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 xl:grid-cols-[340px_1fr] gap-8">
        <div className="space-y-6">
          <Skeleton className="h-[250px] w-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-[100px] w-full" />
            <Skeleton className="h-[100px] w-full" />
            <Skeleton className="h-[100px] w-full" />
          </div>
        </div>
        <div className="space-y-6">
          <Skeleton className="h-[100px] w-full" />
          <Skeleton className="h-[400px] w-full" />
          <Skeleton className="h-[300px] w-full" />
        </div>
      </div>
    </div>
  )
}

export function PanelSkeleton() {
  return (
    <div className="space-y-4 p-4 rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <Skeleton className="h-[150px] w-full" />
    </div>
  )
}
