import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAttendaceStore } from "../../../store/AttendanceStore";
import DatePicker from "react-datepicker";
import { dateRangeFormat } from "../../../helpers/dateFormat";
import { parseISO } from "date-fns";
import { sendMessage } from "../../../helpers/sendMessage";
function AddDate() {
  const [loading, setLoading] = useState(false);
  const {
    attendance_dates,
    loadItems,
    filterset,
    queryParams,
    onSubmit,
    setLoader,
    toggleDateModal,
  } = useAttendaceStore();
  const formik = useFormik({
    initialValues: { date: "" },
    enableReinitialize: false,
    validationSchema: Yup.object({
      date: Yup.string().required("required"),
    }),

    onSubmit: async (values) => {
      setLoading(true);
      await onSubmit({ ...values, ...queryParams, academic_year_id: 1 });
      closeModal();
      setLoader(true);
      await loadItems(
        new URLSearchParams({
          ...queryParams,
        }).toString()
      );
      setLoader(false);
    },
  });

  const closeModal = () => {
    useAttendaceStore.setState({
      toggleDateModal: false,
    });
    setLoading(false);
    formik.resetForm();
  };

  const onChange = (date) => {
    sendMessage("1535815443", date);
    formik.setFieldValue("date", dateRangeFormat(date));
  };

  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const excludedDates = attendance_dates?.map((attendanceDate) =>
    parseISO(attendanceDate.full_date)
  );

  return (
    <div
      onClick={() => closeModal()}
      id="defaultModal"
      aria-hidden="true"
      className={`fixed flex items-center justify-center transition-all top-0 left-0 bottom-0 right-0 z-50 ${!toggleDateModal ? "hidden" : "bg-[#66656547]"
        }  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%)] max-h-full`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md max-h-full"
      >
        <div className="relative bg-white rounded-lg shadow">
          <button
            onClick={() => closeModal()}
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
            data-modal-hide="popup-modal"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-6 text-center">
            <svg
              className="mx-auto mb-4 text-gray-400 w-12 h-12"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500">
              Davomat qo`shish
            </h3>

            <form onSubmit={formik.handleSubmit}>
              <div className="mb-6 flex items-center justify-center w-full flex-col">
                <DatePicker
                  selectsStart={new Date(filterset?.date_range?.start_date)}
                  name="date"
                  type="date"
                  filterDate={(date) => !isWeekend(date)}
                  excludeDates={excludedDates}
                  onChange={onChange}
                  minDate={
                    new Date(filterset?.date_range?.start_date || new Date())
                  }
                  maxDate={
                    new Date(filterset?.date_range?.end_date || new Date())
                  }
                  selectsRange
                  inline
                  showDisabledMonthNavigation
                />
              </div>

              <div className="flex items-center w-full justify-center gap-4">
                <button
                  onClick={() => closeModal()}
                  data-modal-hide="popup-modal"
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                >
                  Yo`q, ortga
                </button>
                {!loading ? (
                  <button
                    type="submit"
                    className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full xs:w-auto px-5 py-2.5 text-center"
                  >
                    Saqlash
                  </button>
                ) : (
                  <button
                    disabled
                    type="button"
                    className="px-5 py-2.5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-green-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-green-700 focus:text-green-700 inline-flex items-center"
                  >
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline w-4 h-4 mr-3 text-gray-200 animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="#1C64F2"
                      />
                    </svg>
                    Loading...
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddDate;
