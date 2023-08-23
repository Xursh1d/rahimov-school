import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DeleteConfirmation from "../../components/DeleteConfirmation";
import EmptyContent from "../../components/EmptyContent";
import Loader from "../../components/loaders/Loader";
import Layout from "../../Layout";
import { useAttendaceStore } from "../../store/AttendanceStore";
import { useLoaderStore } from "../../store/LoaderStore";
import AddDate from "./components/AddDate";
import Heading from "./components/Heading";
import PopUp from "./components/PopUp";
import Table from "./components/Table";

function Attendance() {
  const {
    onReload,
    loadItems,
    students,
    loading,
    deletedDate,
    queryParams,
    deleteDateAction,
    setLoader,
    openPopup,
    changed,
  } = useAttendaceStore();
  const { isLoading, setLoading } = useLoaderStore();

  const pageLoad = useCallback(async () => {
    setLoading(true);
    await onReload();
    setLoading(false);
  }, []);

  useEffect(() => {
    pageLoad();
  }, []);

  const deleteCallback = async () => {
    await deleteDateAction({
      ...queryParams,
      date: deletedDate,
      academic_year_id: 1,
    });
    setLoader(true);
    await loadItems(new URLSearchParams({ ...queryParams }).toString());
    setLoader(false);
  };

  const cancelCallback = () => {
    useAttendaceStore.setState({
      deletedDate: null,
    });
  };

  const navigate = useNavigate();

  const redirectHandler = () => {
    navigate(openPopup, { replace: true });
    cancelRedirect();
  };

  const cancelRedirect = () => {
    useAttendaceStore.setState({
      openPopup: null,
      changed: false,
    });
  };
  useEffect(() => {
    const handler = (e) => {
      if (changed) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    if (changed) {
      window.addEventListener("beforeunload", handler);
      return () => {
        if (changed) {
          window.removeEventListener("beforeunload", handler);
        }
      };
    }
    return () => {};
  }, [changed]);

  return (
    <Layout>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Heading />
          {loading ? (
            <Loader />
          ) : students?.length > 0 ? (
            <Table />
          ) : (
            <EmptyContent />
          )}
        </>
      )}
      <AddDate />
      <DeleteConfirmation
        deleteCallback={deleteCallback}
        cancelCallback={cancelCallback}
        deleteId={deletedDate}
      />
      <PopUp
        redirectHandler={redirectHandler}
        cancelCallback={cancelRedirect}
        open={openPopup}
      />
    </Layout>
  );
}

export default Attendance;
