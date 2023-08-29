import { useCallback, useEffect } from "react";
import Loader from "../../components/loaders/Loader";
import Layout from "../../Layout";
import { useLoaderStore } from "../../store/LoaderStore";
import Table from "./components/Table";
import EmptyContent from "../../components/EmptyContent";
import { useBehaviorMarkCategoriesStore } from "../../store/BehaviorMarkCategoriesStore";
import CommentModal from "./components/CommentModal";
import DeleteConfirmation from "../../components/DeleteConfirmation";
import { BehaviorMarkCategoriesService } from "../../services/BehaviouralMarkCategoriesService";
import { toastError, toastSuccess } from "../../helpers/toasts";

function BehaviorMarkCategories() {
  const {
    onReload,
    categories,
    loading,
    loadItems,
    queryParams,
    isOpenModal,
    deleteId,
  } = useBehaviorMarkCategoriesStore();
  const { setLoading, isLoading } = useLoaderStore();

  const pageLoad = useCallback(async () => {
    setLoading(true);
    await onReload();
    setLoading(false);
  }, []);

  useEffect(() => {
    pageLoad();
  }, []);

  const cancelCallbackModal = () => {
    useBehaviorMarkCategoriesStore.setState({
      isOpenModal: false,
      category_details: null,
    });
  };
  const deleteCallback = async () => {
    const { status, nonFieldError } =
      await BehaviorMarkCategoriesService.deleteCommit(deleteId);
    if (status) {
      toastSuccess(nonFieldError);
      cancelCallback();
      setLoading(true);
      await loadItems(
        new URLSearchParams({
          ...queryParams,
        }).toString()
      );
      setLoading(false);
    } else toastError(nonFieldError);
  };

  const cancelCallback = () => {
    useBehaviorMarkCategoriesStore.setState({
      deleteId: null,
    });
  };
  return (
    <Layout>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="overflow-x-auto">
          {loading ? (
            <Loader />
          ) : categories?.length > 0 ? (
            <Table />
          ) : (
            <EmptyContent />
          )}
          <CommentModal
            cancelCallback={cancelCallbackModal}
            categoryId={isOpenModal}
          />
          <DeleteConfirmation
            deleteCallback={deleteCallback}
            cancelCallback={cancelCallback}
            deleteId={deleteId}
          />
        </div>
      )}
    </Layout>
  );
}

export default BehaviorMarkCategories;
