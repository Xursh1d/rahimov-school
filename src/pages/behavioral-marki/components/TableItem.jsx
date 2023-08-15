function TableItems({ item, index }) {
  return (
    <tr className="bg-white border-b border dark:bg-gray-800 dark:border-gray-700">
      <td className="p-3">{index + 1}</td>
      <th
        scope="row"
        className="px-3 max-w-[160px] font-medium text-gray-900 dark:text-white"
      >
        {item.student}
      </th>
      <td className="border focus:border-red-600">
        <input
          defaultValue={item.status}
          type="text"
          className="px-3 py-4 outline-none text-center border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </td>
      <td className="border focus:border-red-600 min-w-[100px]">
        <input
          type="text"
          defaultValue={item.points}
          className="px-3 py-4 outline-none text-center border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </td>

      <td className="border focus:border-red-600 min-w-[160px]">
        <input
          value={"Izohlar (0)"}
          type="text"
          disabled
          className="px-3 py-4 outline-none text-center border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </td>

      <td className="border focus:border-red-600 text-center">
        <button
          type="button"
          className="mt-5 text-white text-center bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          +
        </button>
      </td>
    </tr>
  );
}

export default TableItems;
