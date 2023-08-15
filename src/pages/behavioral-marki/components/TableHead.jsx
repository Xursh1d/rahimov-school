function TableHead() {
  return (
    <thead className="xs:text-[10px] border sm:text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="p-3 max-w-[10px] text-center border ">
          #
        </th>
        <th scope="col" className="p-3 text-center">
          Talaba
        </th>
        <th scope="col" className="text-center border py-3">
          Talaba Holati
        </th>
        <th scope="col" colSpan={3} className="text-center py-3">
          Sentabr
        </th>
      </tr>
    </thead>
  );
}

export default TableHead;
