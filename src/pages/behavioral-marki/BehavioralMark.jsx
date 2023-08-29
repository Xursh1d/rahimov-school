import { useCallback, useEffect } from "react";
import Loader from "../../components/loaders/Loader";
import Layout from "../../Layout";
import { useLoaderStore } from "../../store/LoaderStore";
import Heading from "./components/Heading";
import Table from "./components/Table";
import { useBehaviorMarkStore } from "../../store/BehaviorMarkStore";
import CommentModal from "./components/CommentModal";
import EmptyContent from "../../components/EmptyContent";

function BehaviorMark() {
  const { onReload, students, loading, studentId, updateParams, loadItems } =
    useBehaviorMarkStore();
  const { setLoading, isLoading } = useLoaderStore();

  const pageLoad = useCallback(async () => {
    const behavioralFilters = JSON.parse(
      localStorage.getItem("behavioralFilters")
    );
    setLoading(true);
    if (behavioralFilters) {
      updateParams(behavioralFilters);
      await loadItems(new URLSearchParams({ ...behavioralFilters }).toString());
    } else await onReload();
    setLoading(false);
  }, []);

  useEffect(() => {
    pageLoad();
  }, []);

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
        <div className="overflow-x-auto">
          <Heading />
          {loading ? (
            <Loader />
          ) : students?.length > 0 ? (
            <Table />
          ) : (
            <EmptyContent />
          )}
        </div>
      )}
      <CommentModal cancelCallback={cancelCallback} studentId={studentId} />
    </Layout>
  );
}

export default BehaviorMark;
