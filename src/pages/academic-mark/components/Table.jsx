import { useAcademicMarkStore } from "../../../store/AcademicMarkStore";
import TableHead from "./TableHead";
import TableItems from "./TableItems";

function Table() {
  const { students } = useAcademicMarkStore();

  return (
    <div className="my-4 xs:rounded-lg">
      <table className="w-full xs:text-xs sm:text-sm text-left text-gray-500 dark:text-gray-400">
        <TableHead />
        <tbody>
          {students?.map((item, index) => {
            return <TableItems item={item} key={index} index={index} />;
          })}
        </tbody>
      </table>
      <div className="w-full h-[50px] flex items-center justify-end">
        <button
          type="button"
          className="mt-5 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >
          Saqlash
        </button>
      </div>
    </div>
  );
}

export default Table;
