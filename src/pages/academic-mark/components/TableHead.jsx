function TableHead() {
  return (
    <thead className=" border xs:text-[10px] sm:text-[11px] text-gray-700  bg-lime-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="border px-3">
          #
        </th>
        <th
          scope="col"
          className="border text-center px-1 xs:min-w-[160px] sm:min-w-[200px] "
        >
          Talaba
        </th>
        <th scope="col" className="border text-center px-3 py-2 min-w-[100px]">
          1-ichki test
        </th>
        <th scope="col" className="border text-center px-3 py-2 min-w-[100px]">
          2-ichki test
        </th>
        <th scope="col" className="border text-center px-3 py-2 min-w-[100px]">
          O`rtacha ichki test
        </th>
        <th scope="col" className="border text-center px-3 py-2 min-w-[100px]">
          O`rtacha ichki baho
        </th>
        <th scope="col" className="border text-center px-3 py-2 min-w-[100px]">
          Tashqi test
        </th>
        <th scope="col" className="border text-center px-3 py-2 min-w-[100px]">
          Yakuniy baho
        </th>
      </tr>
    </thead>
  );
}

export default TableHead;
