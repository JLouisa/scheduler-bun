import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import MaxWidthWrapper from "./components/Wrapper";
import { getLocalStorageItem } from "@/lib/utils";
import bearStore from "./lib/bearStore.ts";
import { useEffect } from "react";

const App: React.FC = () => {
  const { setIsAdmin } = bearStore();

  useEffect(() => {
    if (getLocalStorageItem("user")) {
      setIsAdmin(true);
    }
  }, []);

  return (
    <>
      <MaxWidthWrapper>
        <Header />
        <main className="h-full w-full flex justify-center items-start mt-4 gap-8">
          <Outlet />
        </main>
      </MaxWidthWrapper>
    </>
  );
};

export default App;
