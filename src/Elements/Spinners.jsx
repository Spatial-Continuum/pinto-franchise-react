import { Spinner } from "@material-tailwind/react";
 
export function LoadingSpinners() {
  return (
    <div className="flex flex-1 w-full h-screen justify-center items-center gap-8">
      <Spinner className="h-12 w-12 text-gray-900/50" />
    </div>
  );
}