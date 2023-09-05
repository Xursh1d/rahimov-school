import PropTypes from "prop-types";
import { useBehaviorMarkStore } from "../../../../store/BehaviorMarkStore";

function TableItems({ formik, index }) {
  const { filterset, setChanged } = useBehaviorMarkStore();

  const handleChange = (e, property) => {
    setChanged(true);
    formik.setFieldValue(
      `studentComment.${index}.${[property]}`,
      e.target.value
    );
  };

  console.log(formik.values.studentComment?.[index]?.id);

  const deleteAction = () => {
    useBehaviorMarkStore.setState({
      deleteId: formik.values.studentComment?.[index]?.id,
    });
  };

  return (
    <tr className="bg-white border-b border">
      <td className="border px-3 py-0 xs:text-[10px] sm:text-sm  ">
        {index + 1}
      </td>
      <th
        scope="row"
        className="h-auto px-1 py-0 text-center xs:text-[10px] sm:text-sm font-medium text-gray-900"
      >
        <textarea
          name={`studentComment.${index}.content`}
          onChange={(e) => handleChange(e, "content")}
          onBlur={formik.handleBlur}
          value={formik.values.studentComment?.[index]?.content || ""}
          className={`px-3 py-0 h-full xs:text-[10px] sm:text-sm  font-normal ${formik.touched.studentComment?.[index]?.content &&
            formik.errors.studentComment?.[index]?.content &&
            "border border-red-600"
            }  outline-none text-center  text-gray-900 text-sm rounded-sm  block w-full p-2.5`}
        />
      </th>
      <td className={`border`}>
        <select
          name={`studentComment.${index}.category_id`}
          onChange={(e) => handleChange(e, "category_id")}
          onBlur={formik.handleBlur}
          value={formik.values.studentComment?.[index]?.category_id || ""}
          className={`px-3 py-0 h-full bg-inherit xs:text-[10px] sm:text-sm  ${formik.touched.studentComment?.[index]?.category_id &&
            formik.errors.studentComment?.[index]?.category_id &&
            "border border-red-600"
            }  outline-none text-center  text-gray-900 text-sm rounded-sm  block w-full p-2.5`}
        >
          <option selected></option>
          {filterset?.comment_categories.map((categoriya) => {
            return (
              <option
                key={categoriya.id}
                value={categoriya.id}
                className="border-red-500 text-start"
              >
                {categoriya.title}
              </option>
            );
          })}
        </select>
      </td>
      <td className="border">
        <input
          type="text"
          name={`studentComment.${index}.marked_teacher`}
          onChange={(e) => handleChange(e, "marked_teacher")}
          onBlur={formik.handleBlur}
          value={formik.values.studentComment?.[index]?.marked_teacher || ""}
          disabled
          className={`bg-inherit px-3 py-0 h-full xs:text-[10px] sm:text-sm  ${formik.touched.studentComment?.[index]?.marked_teacher &&
            formik.errors.studentComment?.[index]?.marked_teacher &&
            "border border-red-600"
            }  outline-none text-center  text-gray-900 text-sm rounded-sm  block w-full p-2.5`}
        />
      </td>
      <td className="border">
        <input
          type="text"
          name={`studentComment.${index}.marked_time`}
          onChange={(e) => handleChange(e, "marked_time")}
          onBlur={formik.handleBlur}
          value={formik.values.studentComment?.[index]?.marked_time || ""}
          disabled
          className={`bg-inherit px-3 py-0 h-full xs:text-[10px] sm:text-sm  ${formik.touched.studentComment?.[index]?.marked_time &&
            formik.errors.studentComment?.[index]?.marked_time &&
            "border border-red-600"
            }  outline-none text-center  text-gray-900 text-sm rounded-sm  block w-full p-2.5`}
        />
      </td>
      <td
        onClick={deleteAction}
        className="border w-[50px] text-center p-2 text-red-500 hover:bg-red-50 cursor-pointer"
      >
        <div className="w-full flex items-center justify-center border-red-500">
          <svg
            className="sm:w-6 sm:h-6 xs:w-4 xs:h-4 text-red-700"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
          </svg>
        </div>
      </td>
    </tr>
  );
}

TableItems.propTypes = {
  formik: PropTypes.any,
  index: PropTypes.number.isRequired,
};

export default TableItems;
