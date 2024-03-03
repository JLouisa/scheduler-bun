import { Button } from "./ui/button";
import * as types from "@/lib/types";

interface HeadUIProps {
  weekName: string;
  weeklyId: string;
  weekType: types.TheWeekType;
  printPDF?: () => void;
}

const HeadUI = ({ weekName, weeklyId, weekType, printPDF }: HeadUIProps) => {
  return (
    <>
      <div className="w-full flex justify-between items-center">
        {weekType === types.TheWeekType.Raw && (
          <Button onClick={() => console.log(weeklyId, "Save")}>Save</Button>
        )}
        {weekType === types.TheWeekType.Current && (
          <Button
            id="download-pdf"
            onClick={() => {
              console.log(weeklyId, "Download");
              if (weekType === types.TheWeekType.Current && printPDF)
                printPDF();
            }}
          >
            Download
          </Button>
        )}
        <h1 className="text-xl text-center mt-4 flex-grow">{weekName}</h1>
        <span className="text-xl text-end">{weeklyId}</span>
      </div>
    </>
  );
};

export default HeadUI;
