import { useEffect } from "react";
import TableHead from "./TableHead";
import TableItems from "./TableItems";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useBehaviorMarkCategoriesStore } from "../../../store/BehaviorMarkCategoriesStore";

const initialValues = {
  categories: [],
};

function TableComment() {
  const { categories, onSubmit } = useBehaviorMarkCategoriesStore();

  useEffect(() => {
    categories?.forEach((element, index) => {
      formik.setFieldValue(`categories.${index}.id`, element["id"], false);
      formik.setFieldValue(
        `categories.${index}.title`,
        element["title"],
        false
      );
      formik.setFieldValue(
        `categories.${index}.status`,
        element["status_verbose_name"],
        false
      );
      formik.setFieldValue(
        `categories.${index}.mark`,
        String(element["mark"]),
        false
      );
    });
  }, [categories]);

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: false,
    validationSchema: Yup.object({
      categories: Yup.array().of(
        Yup.object().shape({
          title: Yup.string(),
          status: Yup.string(),
          mark: Yup.string(),
          id: Yup.number().min(1, "Required").required("Required"),
        })
      ),
    }),
    onSubmit: async (values) => {
      await onSubmit(values.categories);
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="py-2 xs:rounded-lg xs:w-max sm:w-full"
    >
      <table className="w-full xs:text-xs sm:text-sm text-left text-gray-500">
        <TableHead />
        <tbody>
          {categories?.map((item, index) => {
            return <TableItems formik={formik} key={index} index={index} />;
          })}
        </tbody>
      </table>
    </form>
  );
}
export default TableComment;
