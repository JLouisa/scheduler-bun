import { Skeleton } from "@/components/ui/skeleton";
import * as types from "@/lib/types";

const LoadingSkeletons = ({ count }: types.LoadingSkeletonsType) => {
  const skeletons = Array.from({ length: count }, (_, index) => (
    <Skeleton key={index} className="w-[1080px] h-16" />
  ));

  return <div className="flex flex-col space-y-2 mt-4">{skeletons}</div>;
};

export default LoadingSkeletons;
