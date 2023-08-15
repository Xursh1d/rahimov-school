import { useCallback, useEffect } from "react";
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
            <p className="w-full text-center my-10 text-gray-400 font-medium text-lg">
              Ma`lumot topilmadi
            </p>
          )}
        </>
      )}
    </Layout>
  );
}

export default AcademicMark;
