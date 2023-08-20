function TableHead() {
  return (
    <thead className=" border xs:text-[10px] sm:text-[11px] text-gray-700  bg-lime-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-3 max-w-[10px] text-center border ">
          #
        </th>
        <th
          scope="col"
          className="border text-center px-1 xs:min-w-[160px] sm:min-w-[200px] "
        >
          Talaba
        </th>
        <th scope="col" className="text-center border py-2">
          Talaba Holati
        </th>
        <th scope="col" colSpan={3} className="text-center py-2">
          Sentabr
        </th>
      </tr>
    </thead>
  );
}

export default TableHead;
