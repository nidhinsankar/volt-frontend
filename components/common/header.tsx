import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";

const Header = () => {
  return (
    <header className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-violet-600" />
          <span className="text-xl font-semibold">Logoipsum</span>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="secondary" className="font-medium">
            Sign In
          </Button>
          <Link
            className={buttonVariants({ variant: "ghost" })}
            href={"/create-trip"}
          >
            create trip
          </Link>
          <Link
            className={buttonVariants({ variant: "link" })}
            href={"/dashboard"}
          >
            My Trips
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
