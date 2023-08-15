function TableItems({ item, index }) {
  return (
    <tr className="bg-white border-b border dark:bg-gray-800 dark:border-gray-700">
      <td className="border p-3">{index + 1}</td>
      <th
        scope="row"
        className="px-3 text-center max-w-[160px] font-medium text-gray-900  dark:text-white"
      >
        {item.student}
      </th>
      <td className="border focus:border-red-600">
        <input
          defaultValue={item.first_term_points}
          type="text"
          className="px-3 py-4  outline-none text-center  border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </td>
      <td className="border focus:border-red-600">
        <input
          type="text"
          defaultValue={item.second_term_points}
          className="px-3 py-4  outline-none text-center  border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </td>

      <td className="border focus:border-red-600">
        <input
          value={item.average_term_points}
          type="text"
          disabled
          className="px-3 py-4  outline-none text-center  border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </td>

      <td className="border focus:border-red-600">
        <input
          type="text"
          defaultValue={item.average_term_mark}
          disabled
          className="px-3 py-4  outline-none text-center  border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </td>

      <td className="border focus:border-red-600">
        <input
          type="text"
          defaultValue={item.final_term_points}
          className="px-3 py-4  outline-none text-center  border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </td>
      <td className="border focus:border-red-600">
        <input
          type="text"
          defaultValue={item.final_mark}
          disabled
          className="px-3 py-4  outline-none text-center  border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </td>
    </tr>
  );
}

export default TableItems;
