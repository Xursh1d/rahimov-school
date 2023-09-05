import { useBehaviorMarkStore } from "../../../store/BehaviorMarkStore";
import TableHead from "./TableHead";
import TableItem from "./TableItem";

function Table() {
  const { students } = useBehaviorMarkStore();

  return (
    <div className="my-4 overflow-x-auto relative">
      <table className="w-full xs:text-xs sm:text-sm text-left text-gray-500">
        <TableHead />
        <tbody>
          {students?.map((item, index) => {
            return <TableItem item={item} key={index} index={index} />;
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
