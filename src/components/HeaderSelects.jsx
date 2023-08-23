import { useMemo } from "react";
import { useUserStore } from "../store/UserDetailsStore";
import Selector from "./Select";

function HeaderSelects() {
  const user_details = JSON.parse(localStorage.getItem("user_details"));
  const { queryParams } = useUserStore();

  const yearsOptions = useMemo(() => {
    return (
      user_details?.academic_year_options?.map((element) => ({
        label: element.years,
        value: element.id,
      })) || []
    );
  }, [user_details]);

  const branchOptions = useMemo(() => {
    return (
      user_details?.branch_options?.map((element) => ({
        label: element.title,
        value: element.id,
      })) || []
    );
  }, [user_details]);

  return (
    <div className="flex items-center">
      <div className="flex items-center justify-between xs:gap-x-3 sm:gap-5 sm:flex-row">
        <Selector
          property={"O'quv yili"}
          param={yearsOptions}
          value={yearsOptions.find(
            (item) => item.value == queryParams?.academic_year_id
          )}
        />
        <Selector
          property={"Filiallar"}
          param={branchOptions}
          value={branchOptions.find(
            (item) => item.value == queryParams?.branch_id
          )}
        />
      </div>
    </div>
  );
}

export default HeaderSelects;
