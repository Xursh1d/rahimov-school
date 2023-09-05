function TableHead() {
  return (
    <thead className=" border xs:text-[10px] sm:text-[11px] text-gray-700 bg-lime-50">
      <tr>
        <th scope="col" className="border px-3">
          #
        </th>
        <th
          scope="col"
          className="border text-center px-1 xs:min-w-[200px] sm:min-w-[300px] "
        >
          Izoh
        </th>
        <th scope="col" className="border text-center px-3 py-2 min-w-[150px]">
          Status
        </th>
        <th scope="col" className="border text-center px-3 py-2 min-w-[150px]">
          Izoh kiritgan xodim
        </th>
        <th scope="col" className="border text-center px-3 py-2 min-w-[150px]">
          Izoh kiritilgan vaqt
        </th>
        <th scope="col" className="border text-center px-3 py-2"></th>
      </tr>
    </thead>
  );
}

export default TableHead;
