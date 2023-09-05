function TableHead() {
  return (
    <thead className=" border xs:text-[10px] sm:text-[11px] text-gray-700  bg-lime-50">
      <tr>
        <th
          rowSpan={2}
          scope="col"
          className="bg-[#ecfccb] px-3 w-[20px] sticky left-0 z-10"
        >
          <span className="absolute -left-[1px] top-0 bottom-0 w-[1.5px] h-full bg-gray-200"></span>
          <span className="absolute -left-[1px] -top-[1px] right-0 w-full h-[1px] bg-gray-200"></span>
          <span className="absolute -right-[1px] -top-[1px] bottom-0 w-[1px] h-full bg-gray-200"></span>
          <span className="absolute right-0 bottom-0 -left-[1px] w-full h-[1px] bg-gray-200"></span>
          #
        </th>
        <th
          scope="col"
          rowSpan={2}
          className="text-center px-3 sticky xs:left-[30px] sm:left-[33px] xs:min-w-[150px] sm:min-w-[200px] bg-[#ecfccb] z-10"
        >
          <span className="absolute -left-[1px] top-0 bottom-0 w-[1px] h-full bg-gray-200"></span>
          <span className="absolute -left-[1px] -top-[1px] right-0 w-full h-[1px] bg-gray-200"></span>
          <span className="absolute -right-[1px] -top-[1px] bottom-0 w-[1px] h-full bg-gray-200"></span>
          <span className="absolute right-0 bottom-0 -left-[1px] w-full h-[1px] bg-gray-200"></span>
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
