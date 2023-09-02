import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DeleteConfirmation from "../../components/DeleteConfirmation";
import EmptyContent from "../../components/EmptyContent";
import Loader from "../../components/loaders/Loader";
import Layout from "../../Layout";
import { useHolidayStore } from "../../store/HolidayStore";
import { useLoaderStore } from "../../store/LoaderStore";
import AddDate from "../attendance/components/AddDate";
import PopUp from "../attendance/components/PopUp";
import Heading from "./components/Heading";
import Table from "./components/Table";

function Holidays() {
  const {
    onReload,
    holidays,
    openPopup,
    loading,
    deleteDateAction,
    setLoader,
    loadItems,
    queryParams,
    deletedId,
  } = useHolidayStore();
  const { isLoading, setLoading } = useLoaderStore();

  const pageLoad = useCallback(async () => {
    setLoading(true);
    await onReload();
    setLoading(false);
  }, []);

  useEffect(() => {
    pageLoad();
  }, []);

  const cancelCallback = () => {
    useHolidayStore.setState({
      deletedDate: null,
    });
  };

  const navigate = useNavigate();

  const redirectHandler = () => {
    navigate(openPopup, { replace: true });
    cancelRedirect();
  };

  const cancelRedirect = () => {
    useHolidayStore.setState({
      openPopup: null,
      changed: false,
    });
  };
  const deleteCallback = async () => {
    await deleteDateAction({
      date: deletedId,
      ...queryParams,
    });
    setLoader(true);
    await loadItems(new URLSearchParams({ ...queryParams }).toString());
    setLoader(false);
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
          ) : holidays?.length > 0 ? (
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
        deleteId={deletedId}
      />
      <PopUp
        redirectHandler={redirectHandler}
        cancelCallback={cancelRedirect}
        open={openPopup}
      />
    </Layout>
  );
}

export default Holidays;
