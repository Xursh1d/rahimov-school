import { useCallback, useEffect } from "react";
import Loader from "../../components/loaders/Loader";
import Layout from "../../Layout";
import { useLoaderStore } from "../../store/LoaderStore";
import Heading from "./components/Heading";
import Table from "./components/Table";
import { useBehaviorMarkStore } from "../../store/BehaviorMarkStore";
import CommentModal from "./components/CommentModal";
import EmptyContent from "../../components/EmptyContent";
import PopUp from "./components/PopUp";
import DeleteConfirmation from "../../components/DeleteConfirmation";
import { BehaviorMarkService } from "../../services/BehaviorMarkService";
import { toastError, toastSuccess } from "../../helpers/toasts";

function BehaviorMark() {
  const {
    onReload,
    students,
    loading,
    change,
    studentId,
    updateParams,
    loadItems,
    openPopup,
    deleteId,
    queryParams,
  } = useBehaviorMarkStore();
  const { setLoading, isLoading } = useLoaderStore();

  console.log(deleteId);

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

  useEffect(() => {
    const handler = (e) => {
      if (change) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    if (change) {
      window.addEventListener("beforeunload", handler);
      return () => {
        if (change) {
          window.removeEventListener("beforeunload", handler);
        }
      };
    }
  }, [change]);

  const cancelCallback = () => {
    useBehaviorMarkStore.setState({
      studentId: null,
    });
  };

  const redirectHandler = () => {
    useBehaviorMarkStore.setState({
      behaviorId: null,
      change: false,
    });
    cancelRedirect();
  };

  const deleteCallback = async () => {
    const { status, nonFieldError } = await BehaviorMarkService.deleteComment(
      deleteId
    );
    if (status) {
      toastSuccess(nonFieldError);
      cancelCallbackDelete();
      setLoading(true);
      await loadItems(
        new URLSearchParams({
          ...queryParams,
        }).toString()
      );
      setLoading(false);
    } else toastError(nonFieldError);
  };

  const cancelCallbackDelete = () => {
    useBehaviorMarkStore.setState({
      deleteId: null,
    });
  };

  const cancelRedirect = () => {
    useBehaviorMarkStore.setState({
      openPopup: false,
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
      <PopUp
        redirectHandler={redirectHandler}
        cancelCallback={cancelRedirect}
        open={openPopup}
      />
      <DeleteConfirmation
        deleteCallback={deleteCallback}
        cancelCallback={cancelCallbackDelete}
        deleteId={deleteId}
      />
    </Layout>
  );
}

export default BehaviorMark;
