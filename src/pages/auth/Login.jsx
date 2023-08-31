import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { toastError } from "../../helpers/toasts";
import LoginService from "../../services/LoginService";

function Login() {
  const [loading, setLoader] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      username: Yup.string().required("Login kiritilishi shart!"),
      password: Yup.string().required("Parol kiritilishi shart!"),
    }),
    onSubmit: async (values) => {
      setLoader(true);
      const { data, status, nonFieldError } = await LoginService.login(values);

      if (status === true) {
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/", { replace: true });
      } else toastError(nonFieldError);

      setLoader(false);
    },
  });
  return (
    <div className="w-full h-screen flex items-center justify-center border bg-gray-50">
      <div className="sm:h-[400px] sm:w-[60%] xs:w-[90%] sm:flex-row flex sm:items-center sm:justify-between xs:flex-col  border bg-white rounded-lg">
        <div className="sm:w-[45%] p-10 xs:w-[80%]  xs:flex xs:justify-center sm:block">
          <img src="/rs-logo.png" />
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="sm:w-[55%] xs:w-full sm:p-10 xs:px-10 xs:pb-10 sm:pb-0 h-full flex flex-col justify-center gap-6"
        >
          <div className="relative w-full">
            <label
              htmlFor="login"
              className="block mb-2 xs:text-sm sm:text-md font-medium text-gray-900 dark:text-white"
            >
              Login
            </label>
            <input
              id="login"
              name="username"
              value={formik.values?.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              className={`bg-gray-50 outline-none h-[45px] border focus:border-none transition-all duration-300 text-gray-900 text-sm rounded-xl focus:ring-2 ring-offset-2 ${formik.errors.username
                ? "ring-2 ring-red-200 dark:ring-orange-700 focus:bg-red-100 border-none"
                : "focus:bg-blue-50 ring-blue-300 dark:ring-blue-700"
                } block w-full px-4 dark:bg-gray-700 dark:ring-offset-gray-800 dark:placeholder-gray-400 dark:text-white`}
            />
            {formik.errors.username && (
              <span className="absolute top-[80px] transition-all duration-300  text-red-500  text-sm">
                {formik.errors.username}
              </span>
            )}
          </div>
          <div className="relative w-full">
            <label
              htmlFor="login"
              className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
            >
              Parol
            </label>
            <input
              id="login"
              name="password"
              value={formik.values?.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="password"
              className={`bg-gray-50 outline-none h-[45px] border focus:border-none transition-all duration-300 text-gray-900 text-sm rounded-xl focus:ring-2 ring-offset-2 ${formik.errors.password
                ? "ring-2 ring-red-200 dark:ring-orange-700 focus:bg-red-100 border-none"
                : "focus:bg-blue-50 ring-blue-300 dark:ring-blue-700"
                } block w-full px-4 dark:bg-gray-700 dark:ring-offset-gray-800 dark:placeholder-gray-400 dark:text-white`}
            />
            {formik.errors.password && (
              <span className="absolute top-[80px] transition-all duration-300  text-red-500  text-sm">
                {formik.errors.password}
              </span>
            )}
          </div>
          <div className="w-full flex justify-end mt-2">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 xs:w-full focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {loading ? (
                <>
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 mr-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                  Loading...
                </>
              ) : (
                "Tizimga Kirish"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
