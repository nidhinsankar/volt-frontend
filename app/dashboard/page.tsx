import FilteredTrips from "@/components/common/tags";
import { Button } from "@/components/ui/button";

const DashboardPage = () => {
  return (
    <div>
      <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-y">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-violet-600" />
            <span className="text-xl font-semibold">Logoipsum</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="font-medium">
              Create Trip
            </Button>
            <Button variant="ghost" className="font-medium">
              My Trips
            </Button>
            <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 font-semibold">
              0
            </div>
          </div>
        </div>
      </nav>
      <div className="pt-24">
        <FilteredTrips />
      </div>
    </div>
  );
};

export default DashboardPage;
