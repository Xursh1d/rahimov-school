function TableHead() {
  return (
    <thead className=" border xs:text-[10px] sm:text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="border p-3">
          #
        </th>
        <th scope="col" className="border text-center p-3 min-w-[160px] ">
          Talaba
        </th>
        <th scope="col" className="border text-center py-3 min-w-[100px]">
          1-ichki test
        </th>
        <th scope="col" className="border text-center py-3 min-w-[100px]">
          2-ichki test
        </th>
        <th scope="col" className="border text-center py-3 min-w-[100px]">
          O`rtacha ichki test
        </th>
        <th scope="col" className="border text-center py-3 min-w-[100px]">
          O`rtacha ichki baho
        </th>
        <th scope="col" className="border text-center py-3 min-w-[100px]">
          Tashqi test
        </th>
        <th scope="col" className="border text-center py-3 min-w-[100px]">
          Yakuniy baho
        </th>
      </tr>
    </thead>
  );
}

export default TableHead;
