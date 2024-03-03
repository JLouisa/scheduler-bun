import { useMutation } from "@tanstack/react-query";
import { Button } from "./ui/button";
import * as types from "@/lib/types";
import { toast } from "./ui/use-toast";

interface HeadUIProps {
  weekName: string;
  weeklyId: string;
  weekType: types.TheWeekType;
  printPDF: () => void;
}

const HeadUI = ({ weekName, weeklyId, weekType, printPDF }: HeadUIProps) => {
  // const SaveDownload = useMutation({
  //   mutationKey: [
  //     weekType === types.TheWeekType.Raw ? "saveWeek" : "downloadWeek",
  //   ],
  //   mutationFn: async (weeklyID: string) => {
  //     const result =
  //       weekType === types.TheWeekType.Raw
  //         ? await DAL.updateNewUser(weeklyID)
  //         : await DAL.postNewUser(weeklyID);
  //     return result;
  //   },
  //   onSuccess: () => {
  //     toast({
  //       title: `Successful request`,
  //       description: `${
  //         weekType === types.TheWeekType.Raw
  //           ? "Week has been successfully Saved"
  //           : "Request to download info has been Successful"
  //       }!`,
  //     });
  //   },
  //   onError: (error) => {
  //     toast({
  //       title: "Oops! Something went wrong!",
  //       variant: "destructive",
  //       description: `Error: ${error}`,
  //     });
  //   },
  // });

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
