import { useCallback, useEffect } from "react";
import Loader from "../../components/loaders/Loader";
import Layout from "../../Layout";
import { useLoaderStore } from "../../store/LoaderStore";
import Heading from "./components/Heading";
import Table from "./components/Table";
import { useBehaviorMarkStore } from "../../store/BehaviorMarkStore";
import CommentModal from "./components/CommentModal";

function BehaviorMark() {
  const { onReload, students, loading, studentId } = useBehaviorMarkStore();
  const { setLoading, isLoading } = useLoaderStore();

  console.log(studentId);

  const pageLoad = useCallback(async () => {
    setLoading(true);
    await onReload();
    setLoading(false);
  }, []);

  useEffect(() => {
    pageLoad();
  }, []);

  const addCallback = async () => {
    // await deleteProduct(deleteId, updateToast);
    setLoading(true);
    await onReload();
    setLoading(false);
  };

  const cancelCallback = () => {
    useBehaviorMarkStore.setState({
      studentId: null,
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
            <p className="w-full text-center my-10 text-gray-400 font-medium text-lg">
              Ma`lumot topilmadi
            </p>
          )}
        </>
      )}
      <CommentModal
        addCallback={() => addCallback()}
        cancelCallback={cancelCallback}
        studentId={studentId}
      />
    </Layout>
  );
}

export default BehaviorMark;
