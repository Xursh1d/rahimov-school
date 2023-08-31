import { useBehaviorMarkStore } from "../../../store/BehaviorMarkStore";
import { useHolidayStore } from "../../../store/HolidayStore";
import TableHead from "./TableHead";
import TableItems from "./TableItems";

function Table() {
  const { holidays } = useHolidayStore();

  return (
    <div className="my-4 overflow-x-auto relative">
      <table className="w-full xs:text-xs sm:text-sm text-left text-gray-500 dark:text-gray-400">
        <TableHead />
        <tbody>
          {holidays?.map((item, index) => {
            return <TableItems item={item} key={index} index={index} />;
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
