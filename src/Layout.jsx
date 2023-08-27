import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import HeaderSelects from "./components/HeaderSelects";
import { useAcademicMarkStore } from "./store/AcademicMarkStore";
import { useAttendaceStore } from "./store/AttendanceStore";
import { useLayoutStore } from "./store/LayoutStore";
import UserPermissionWidget from "./UserPermissionWidget";

function Layout({ children }) {
  const { toggleAttendanceDrop, toggleMarkDrop, toggleSettingDrop, isOpenSideBar } =
    useLayoutStore();

  const { changed } = useAttendaceStore();
  const { academic_changed } = useAcademicMarkStore();

  const toggleMarkDropHandler = () => {
    useLayoutStore.setState({
      toggleMarkDrop: !toggleMarkDrop,
    });
  };
  const toggleSettingDropHandler = () => {
    useLayoutStore.setState({
      toggleSettingDrop: !toggleSettingDrop,
    });
  };
  const toggleAttendanceDropHandler = () => {
    useLayoutStore.setState({
      toggleAttendanceDrop: !toggleAttendanceDrop,
    });
  };
  const location = useLocation();
  const currentURL = location.pathname;

  const alertChange = (url) => {
    if (currentURL == "/marking/academic") {
      useAcademicMarkStore.setState({
        openPopup: url,
      });
    } else
      useAttendaceStore.setState({
        openPopup: url,
      });
  };

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
            <HeaderSelects />
          </div>
        </div>
      </nav>
      <div
        onClick={() =>
          useLayoutStore.setState({
            isOpenSideBar: false,
          })
        }
        className={`w-full absolute sm:bg-inherit ${isOpenSideBar ? "xs:bg-[#5d5d5da3] sm:bg-white z-10" : "z-0"
          } top-16 sm:right-0 left-0 bottom-0 transition-all h-full`}
      >
        <aside
          onClick={(e) => e.stopPropagation()}
          id="logo-sidebar"
          className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${isOpenSideBar ? "translate-x" : "-translate-x-full"
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
                  className={`${toggleAttendanceDrop
                    ? "block"
                    : "hidden"
                    } py-2 space-y-2`}
                >
                  <li>
                    <UserPermissionWidget
                      hasPermission={
                        currentURL == "/marking/academic"
                          ? academic_changed
                          : changed
                      }
                      emptyContent={
                        <div
                          onClick={() => alertChange("/")}
                          className={`${currentURL == "/"
                            ? "bg-gray-100 dark:text-white dark:bg-gray-700 "
                            : ""
                            } flex cursor-pointer items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
                        >
                          Statistikalar
                        </div>
                      }
                    >
                      <Link
                        to={"/"}
                        className={`${currentURL == "/"
                          ? "bg-gray-100 dark:text-white dark:bg-gray-700"
                          : ""
                          } flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
                      >
                        Statistikalar
                      </Link>
                    </UserPermissionWidget>
                  </li>
                  <li>
                    <UserPermissionWidget
                      hasPermission={
                        currentURL == "/marking/academic"
                          ? academic_changed
                          : changed
                      }
                      emptyContent={
                        <div
                          onClick={() => alertChange("/attendance")}
                          className={`${currentURL == "/attendance"
                            ? "bg-gray-100 dark:text-white dark:bg-gray-700 "
                            : ""
                            } flex cursor-pointer  items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
                        >
                          Davomat
                        </div>
                      }
                    >
                      <Link
                        to={"/attendance"}
                        className={`${currentURL == "/attendance"
                          ? "bg-gray-100 dark:text-white dark:bg-gray-700"
                          : ""
                          } flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
                      >
                        Davomat
                      </Link>
                    </UserPermissionWidget>
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
                  className={`${toggleMarkDrop
                    ? "block"
                    : "hidden"
                    } py-2 space-y-2`}
                >
                  <li>
                    <UserPermissionWidget
                      hasPermission={
                        currentURL == "/marking/academic"
                          ? academic_changed
                          : changed
                      }
                      emptyContent={
                        <div
                          onClick={() => alertChange("/marking/academic")}
                          className={`${currentURL == "/marking/academic"
                            ? "bg-gray-100 dark:text-white dark:bg-gray-700 "
                            : ""
                            } flex cursor-pointer  items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
                        >
                          Akademik baholash
                        </div>
                      }
                    >
                      <Link
                        to={"/marking/academic"}
                        className={`${currentURL == "/marking/academic"
                          ? "bg-gray-100 dark:text-white dark:bg-gray-700"
                          : ""
                          } flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
                      >
                        Akademik baholash
                      </Link>
                    </UserPermissionWidget>
                  </li>
                  <li>
                    <UserPermissionWidget
                      hasPermission={
                        currentURL == "/marking/academic"
                          ? academic_changed
                          : changed
                      }
                      emptyContent={
                        <div
                          onClick={() => alertChange("/marking/behaviour")}
                          className={`${currentURL == "/marking/behaviour"
                            ? "bg-gray-100 dark:text-white dark:bg-gray-700 "
                            : ""
                            } flex cursor-pointer  items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
                        >
                          Axloqiy baholash
                        </div>
                      }
                    >
                      <Link
                        to={"/marking/behaviour"}
                        className={`${currentURL == "/marking/behaviour"
                          ? "bg-gray-100 dark:text-white dark:bg-gray-700"
                          : ""
                          } flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
                      >
                        Axloqiy baholash
                      </Link>
                    </UserPermissionWidget>
                  </li>
                </ul>
              </li>
              <li>
                <button
                  onClick={() => toggleSettingDropHandler()}
                  type="button"
                  className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  aria-controls="dropdown-example"
                  data-collapse-toggle="dropdown-example"
                >
                  <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.5 8C5.80777 8 5.13108 7.79473 4.55551 7.41015C3.97993 7.02556 3.53133 6.47893 3.26642 5.83939C3.00152 5.19985 2.9322 4.49612 3.06725 3.81719C3.2023 3.13825 3.53564 2.51461 4.02513 2.02513C4.51461 1.53564 5.13825 1.2023 5.81719 1.06725C6.49612 0.932205 7.19985 1.00152 7.83939 1.26642C8.47893 1.53133 9.02556 1.97993 9.41015 2.55551C9.79473 3.13108 10 3.80777 10 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6.5 17H1V15C1 13.9391 1.42143 12.9217 2.17157 12.1716C2.92172 11.4214 3.93913 11 5 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M19.5 11H18.38C18.2672 10.5081 18.0714 10.0391 17.801 9.613L18.601 8.818C18.6947 8.72424 18.7474 8.59708 18.7474 8.4645C18.7474 8.33192 18.6947 8.20476 18.601 8.111L17.894 7.404C17.8002 7.31026 17.6731 7.25761 17.5405 7.25761C17.4079 7.25761 17.2808 7.31026 17.187 7.404L16.392 8.204C15.9647 7.93136 15.4939 7.73384 15 7.62V6.5C15 6.36739 14.9473 6.24021 14.8536 6.14645C14.7598 6.05268 14.6326 6 14.5 6H13.5C13.3674 6 13.2402 6.05268 13.1464 6.14645C13.0527 6.24021 13 6.36739 13 6.5V7.62C12.5081 7.73283 12.0391 7.92863 11.613 8.199L10.818 7.404C10.7242 7.31026 10.5971 7.25761 10.4645 7.25761C10.3319 7.25761 10.2048 7.31026 10.111 7.404L9.404 8.111C9.31026 8.20476 9.25761 8.33192 9.25761 8.4645C9.25761 8.59708 9.31026 8.72424 9.404 8.818L10.204 9.618C9.9324 10.0422 9.73492 10.5096 9.62 11H8.5C8.36739 11 8.24021 11.0527 8.14645 11.1464C8.05268 11.2402 8 11.3674 8 11.5V12.5C8 12.6326 8.05268 12.7598 8.14645 12.8536C8.24021 12.9473 8.36739 13 8.5 13H9.62C9.73283 13.4919 9.92863 13.9609 10.199 14.387L9.404 15.182C9.31026 15.2758 9.25761 15.4029 9.25761 15.5355C9.25761 15.6681 9.31026 15.7952 9.404 15.889L10.111 16.596C10.2048 16.6897 10.3319 16.7424 10.4645 16.7424C10.5971 16.7424 10.7242 16.6897 10.818 16.596L11.618 15.796C12.0422 16.0676 12.5096 16.2651 13 16.38V17.5C13 17.6326 13.0527 17.7598 13.1464 17.8536C13.2402 17.9473 13.3674 18 13.5 18H14.5C14.6326 18 14.7598 17.9473 14.8536 17.8536C14.9473 17.7598 15 17.6326 15 17.5V16.38C15.4919 16.2672 15.9609 16.0714 16.387 15.801L17.182 16.601C17.2758 16.6947 17.4029 16.7474 17.5355 16.7474C17.6681 16.7474 17.7952 16.6947 17.889 16.601L18.596 15.894C18.6897 15.8002 18.7424 15.6731 18.7424 15.5405C18.7424 15.4079 18.6897 15.2808 18.596 15.187L17.796 14.392C18.0686 13.9647 18.2662 13.4939 18.38 13H19.5C19.6326 13 19.7598 12.9473 19.8536 12.8536C19.9473 12.7598 20 12.6326 20 12.5V11.5C20 11.3674 19.9473 11.2402 19.8536 11.1464C19.7598 11.0527 19.6326 11 19.5 11ZM14 14.5C13.5055 14.5 13.0222 14.3534 12.6111 14.0787C12.2 13.804 11.8795 13.4135 11.6903 12.9567C11.5011 12.4999 11.4516 11.9972 11.548 11.5123C11.6445 11.0273 11.8826 10.5819 12.2322 10.2322C12.5819 9.8826 13.0273 9.6445 13.5123 9.54804C13.9972 9.45157 14.4999 9.50108 14.9567 9.6903C15.4135 9.87952 15.804 10.2 16.0787 10.6111C16.3534 11.0222 16.5 11.5055 16.5 12C16.5 12.663 16.2366 13.2989 15.7678 13.7678C15.2989 14.2366 14.663 14.5 14 14.5Z" fill="currentColor" />
                  </svg>

                  <span className="flex-1 ml-3 text-left whitespace-nowrap">
                    Sozlamalar
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
                  className={`${toggleSettingDrop
                    ? "block"
                    : "hidden"
                    } py-2 space-y-2`}
                >
                  <li>
                    <UserPermissionWidget
                      hasPermission={
                        currentURL == "/marking/academic"
                          ? academic_changed
                          : changed
                      }
                      emptyContent={
                        <div
                          onClick={() => alertChange("/marking/academic")}
                          className={`${currentURL == "/marking/academic"
                            ? "bg-gray-100 dark:text-white dark:bg-gray-700 "
                            : ""
                            } flex cursor-pointer  items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
                        >
                          Axloqiy baholash kategoriyalari
                        </div>
                      }
                    >
                      <Link
                        to={"/marking/academic"}
                        className={`${currentURL == "/marking/academic"
                          ? "bg-gray-100 dark:text-white dark:bg-gray-700"
                          : ""
                          } flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
                      >
                        Akademik baholash
                      </Link>
                    </UserPermissionWidget>
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
  children: PropTypes.node.isRequired,
};

export default Layout;
