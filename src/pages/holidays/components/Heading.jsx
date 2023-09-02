import { useMemo } from "react";
import { useHolidayStore } from "../../../store/HolidayStore";
import Selector from "./Select";

function Heading() {
  const { filterset, queryParams } = useHolidayStore();

  const monthOptions = useMemo(() => {
    return (
      filterset?.months?.map((element) => ({
        label: element.title,
        value: element.id,
      })) || []
    );
  }, [filterset]);

  return (
    <div className="w-[100%] flex sm:justify-start xs:justify-center sm:gap-5 xs:gap-2 flex-wrap">
      <Selector
        value={
          monthOptions.find((item) => item.value === queryParams.month_id) ||
          null
        }
        disabled={false}
        param={monthOptions}
        property="Oylar"
      />
    </div>
  );
}

export default Heading;
