function TableHead() {
  return (
    <thead className="xs:text-[10px] sm:text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className=" p-3">
          #
        </th>
        <th scope="col" className=" p-3 min-w-[160px] ">
          Talaba
        </th>
        <th scope="col" className="text-center py-3 min-w-[100px]">
          Talaba Holati
        </th>
        <th scope="col" colSpan={3} className="text-center py-3 min-w-[100px]">
          Sentabr
        </th>
      </tr>
    </thead>
  );
}

export default TableHead;
