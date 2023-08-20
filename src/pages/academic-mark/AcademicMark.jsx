import { useCallback, useEffect } from "react";
import EmptyContent from "../../components/EmptyContent";
import Loader from "../../components/loaders/Loader";
import Layout from "../../Layout";
import { useAcademicMarkStore } from "../../store/AcademicMarkStore";
import { useLoaderStore } from "../../store/LoaderStore";
import Heading from "./components/Heading";
import Table from "./components/Table";

function AcademicMark() {
  const { onReload, students, loading } = useAcademicMarkStore();
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
    </Layout>
  );
}

export default AcademicMark;
