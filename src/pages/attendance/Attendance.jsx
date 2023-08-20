import { useCallback, useEffect } from "react";
import EmptyContent from "../../components/EmptyContent";
import Loader from "../../components/loaders/Loader";
import Layout from "../../Layout";
import { useAttendaceStore } from "../../store/AttendanceStore";
import { useLoaderStore } from "../../store/LoaderStore";
import AddDate from "./components/AddDate";
import Heading from "./components/Heading";
import Table from "./components/Table";

function Attendance() {
  const { onReload, students, loading } = useAttendaceStore();
  const { isLoading, setLoading } = useLoaderStore();

  const pageLoad = useCallback(async () => {
    setLoading(true);
    await onReload();
    setLoading(false);
  }, []);

  useEffect(() => {
    pageLoad();
  }, []);

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
    </Layout>
  );
}

export default Attendance;
