import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmptyContent from "../../components/EmptyContent";
import Loader from "../../components/loaders/Loader";
import Layout from "../../Layout";
import { useAcademicMarkStore } from "../../store/AcademicMarkStore";
import { useLoaderStore } from "../../store/LoaderStore";
import Heading from "./components/Heading";
import PopUp from "./components/PopUp";
import Table from "./components/Table";

function AcademicMark() {
  const {
    onReload,
    students,
    academic_changed,
    loading,
    openPopup,
    updateParams,
    loadItems,
  } = useAcademicMarkStore();
  const { isLoading, setLoading } = useLoaderStore();
  const navigate = useNavigate();

  const pageLoad = useCallback(async () => {
    const academicFilters = JSON.parse(localStorage.getItem("academicFilters"));
    setLoading(true);
    if (academicFilters) {
      updateParams(academicFilters);
      await loadItems(new URLSearchParams({ ...academicFilters }).toString());
    } else await onReload();
    setLoading(false);
  }, []);

  useEffect(() => {
    pageLoad();
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (academic_changed) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    if (academic_changed) {
      window.addEventListener("beforeunload", handler);
      return () => {
        if (academic_changed) {
          window.removeEventListener("beforeunload", handler);
        }
      };
    }
    return () => {};
  }, [academic_changed]);

  const redirectHandler = () => {
    navigate(openPopup, { replace: true });
    cancelRedirect();
  };

  const cancelRedirect = () => {
    useAcademicMarkStore.setState({
      openPopup: null,
      academic_changed: false,
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
      <PopUp
        redirectHandler={redirectHandler}
        cancelCallback={cancelRedirect}
        open={openPopup}
      />
    </Layout>
  );
}

export default AcademicMark;
