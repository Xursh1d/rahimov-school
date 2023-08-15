import { useCallback, useEffect } from "react";
import Loader from "../../components/loaders/Loader";
import Layout from "../../Layout";
import { useLoaderStore } from "../../store/LoaderStore";
import Heading from "./components/Heading";
import Table from "./components/Table";
import { useBehaviorMarkStore } from "../../store/BehaviorMarkStore";

function BehaviorMark() {
  const { onReload, students, isLoading } = useBehaviorMarkStore();
  const { setLoading } = useLoaderStore();

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
      <Heading />
      {isLoading ? (
        <Loader />
      ) : students?.length > 0 ? (
        <Table />
      ) : (
        <p className="w-full text-center my-10 text-gray-400 font-medium text-lg">
          Ma`lumot topilmadi
        </p>
      )}
    </Layout>
  );
}

export default BehaviorMark;
