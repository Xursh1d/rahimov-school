import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import Selector from "./components/Select";
import { useLayoutStore } from "./store/LayoutStore";

function Layout({ children }) {
  const { toggleAttendanceDrop, toggleMarkDrop, isOpenSideBar } =
    useLayoutStore();

  const toggleMarkDropHandler = () => {
    useLayoutStore.setState({
      toggleMarkDrop: !toggleMarkDrop,
    });
  };
  const toggleAttendanceDropHandler = () => {
    useLayoutStore.setState({
      toggleAttendanceDrop: !toggleAttendanceDrop,
    });
  };
  const location = useLocation();
  const currentURL = location.pathname;

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-1 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                onClick={() =>
                  useLayoutStore.setState({
                    isOpenSideBar: !isOpenSideBar,
                  })
                }
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <Link
                to="/"
                className="flex ml-2 md:mr-24 xs:w-20 xs:h-auto sm:w-auto"
              >
                <img
                  src="/rs-logo.png"
                  className="h-14 xs:object-scale-down sm:object-center"
                  alt="FlowBite Logo"
                />
              </Link>
            </div>
            <div className="flex items-center">
              <div className="flex items-center justify-between xs:gap-x-3 sm:gap-5 sm:flex-row">
                <Selector property={"Yillar"} />
                <Selector property={"Oylar"} />
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div
        onClick={() =>
          useLayoutStore.setState({
            isOpenSideBar: false,
          })
        }
        className={`w-full absolute sm:bg-inherit ${
          isOpenSideBar ? "xs:bg-[#5d5d5da3] sm:bg-white z-10" : "z-0"
        } top-16 sm:right-0 left-0 bottom-0 transition-all h-full`}
      >
        <aside
          onClick={(e) => e.stopPropagation()}
          id="logo-sidebar"
          className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
            isOpenSideBar ? "translate-x" : "-translate-x-full"
          }  bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700 pointer-events-auto`}
          aria-label="Sidebar"
        >
          <div className="h-full  px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
              <li>
                <button
                  onClick={() => toggleAttendanceDropHandler()}
                  type="button"
                  className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  aria-controls="dropdown-example"
                  data-collapse-toggle="dropdown-example"
                >
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 20"
                  >
                    <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
                  </svg>
                  <span className="flex-1 ml-3 text-left whitespace-nowrap">
                    Davomat
                  </span>
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <ul
                  id="dropdown-example"
                  className={`${
                    toggleAttendanceDrop ||
                    currentURL == "/" ||
                    currentURL == "/attendance"
                      ? "block"
                      : "hidden"
                  } py-2 space-y-2`}
                >
                  <li>
                    <Link
                      to={"/"}
                      className={`${
                        currentURL == "/"
                          ? "bg-gray-100 dark:text-white dark:bg-gray-700"
                          : ""
                      } flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
                    >
                      Statistikalar
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/attendance"}
                      className={`${
                        currentURL == "/attendance"
                          ? "bg-gray-100 dark:text-white dark:bg-gray-700"
                          : ""
                      } flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
                    >
                      Davomat
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <button
                  onClick={() => toggleMarkDropHandler()}
                  type="button"
                  className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  aria-controls="dropdown-example"
                  data-collapse-toggle="dropdown-example"
                >
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 20"
                  >
                    <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                  </svg>
                  <span className="flex-1 ml-3 text-left whitespace-nowrap">
                    Baholash
                  </span>
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <ul
                  id="dropdown-example"
                  className={`${
                    toggleMarkDrop ||
                    currentURL == "/marking/academic" ||
                    currentURL == "/marking/behavioral"
                      ? "block"
                      : "hidden"
                  } py-2 space-y-2`}
                >
                  <li>
                    <Link
                      to="/marking/academic"
                      className={`${
                        currentURL == "/marking/academic"
                          ? "bg-gray-100 dark:text-white dark:bg-gray-700"
                          : ""
                      } flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
                    >
                      Akademik baholash
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/marking/behavioral"
                      className={`${
                        currentURL == "/marking/behavioral"
                          ? "bg-gray-100 dark:text-white dark:bg-gray-700"
                          : ""
                      } flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
                    >
                      Axloqiy baholash
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </aside>
      </div>

      <div className="p-4 sm:ml-64 min-h-[400px]  relative overflow-x-auto sm:rounded-lg">
        <div className="mt-14">{children}</div>
      </div>
    </div>
  );
}
Layout.propTypes = {
  children: PropTypes.node.isRequired, // 'node' type represents any renderable content
};

export default Layout;
