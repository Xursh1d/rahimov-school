import { useCallback, useEffect } from "react";
import DeleteConfirmation from "../../components/DeleteConfirmation";
import EmptyContent from "../../components/EmptyContent";
import Loader from "../../components/loaders/Loader";
import Layout from "../../Layout";
import { useAttendaceStore } from "../../store/AttendanceStore";
import { useLoaderStore } from "../../store/LoaderStore";
import AddDate from "./components/AddDate";
import Heading from "./components/Heading";
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
    </Layout>
  );
}

export default Attendance;
