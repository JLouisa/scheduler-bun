interface HeadUIProps {
  weekName: string;
  weeklyId: string;
}

const HeadUI = ({ weekName, weeklyId }: HeadUIProps) => {
  return (
    <>
      <div className="w-full flex justify-between items-center">
        <h1 className="text-xl text-center mt-4 flex-grow">{weekName}</h1>
        <span className="text-xl text-end">{weeklyId}</span>
      </div>
    </>
  );
};

export default HeadUI;
