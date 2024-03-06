import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import MaxWidthWrapper from "./components/Wrapper";

const App: React.FC = () => {
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
