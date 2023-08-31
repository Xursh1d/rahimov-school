import Layout from "../../Layout";
import { useHolidayStore } from "../../store/HolidayStore";
import Table from "./components/Table";

function Holidays() {
  const { loadItems } = useHolidayStore()


  return (
    <Layout>
      <Table></Table>
    </Layout>
  );
}

export default Holidays;
