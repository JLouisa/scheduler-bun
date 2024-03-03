import { useMutation } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import * as types from "@/lib/types";
import * as DAL from "@/lib/dal";

interface HeadUIProps {
  weekName: string;
  weeklyId: string;
  weekType: types.TheWeekType;
  printPDF?: () => void;
}

const HeadUI = ({ weekName, weeklyId, weekType, printPDF }: HeadUIProps) => {
  const updateWeekStatus = useMutation({
    mutationKey: [
      weekType === types.TheWeekType.Next ? "postAvailability" : "postWeekPlan",
    ],
    mutationFn: async (data: string) => {
      const result = await DAL.updateOneWeekStatus(data);
      return result;
    },
    onSuccess: (data) => {
      toast({
        title: `${data}`,
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: `Uh oh! Something went wrong.`,
        description: `There was a problem saving the week, ${error.message}`,
      });
    },
  });
  return (
    <>
      <div className="w-full flex justify-between items-center">
        {weekType === types.TheWeekType.Raw && (
          <Button
            onClick={() => {
              updateWeekStatus.mutate(weeklyId);
              console.log(weeklyId, "Save");
            }}
          >
            Save
          </Button>
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
