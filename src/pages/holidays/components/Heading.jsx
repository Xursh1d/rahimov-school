import { useMemo } from "react";
import { useAttendaceStore } from "../../../store/AttendanceStore";
import Selector from "./Select";

function Heading() {
  const { filterset, queryParams } = useAttendaceStore();

  const teachersOptions = useMemo(() => {
    return (
      filterset?.teachers?.map((element) => ({
        label: element.full_name,
        value: element.id,
      })) || []
    );
  }, [filterset]);

  const classOptions = useMemo(() => {
    return (
      filterset?.classes?.map((element) => ({
        label: element.title,
        value: element.id,
      })) || []
    );
  }, [filterset]);

  const subjectOptions = useMemo(() => {
    return (
      filterset?.subjects?.map((element) => ({
        label: element.title,
        value: element.id,
      })) || []
    );
  }, [filterset]);

  const monthsOptions = useMemo(() => {
    return (
      filterset?.monthes?.map((element) => ({
        label: element.title,
        value: element.id,
      })) || []
    );
  }, [filterset]);

  return (
    <div className="w-[100%] flex sm:justify-start xs:justify-center sm:gap-5 xs:gap-2 flex-wrap">
      <Selector
        value={
          teachersOptions.find(
            (item) => item.value === queryParams.teacher_id
          ) || null
        }
        disabled={false}
        param={teachersOptions}
        property="Ustoz"
      />
      <Selector
        value={
          subjectOptions.find(
            (item) => item.value === queryParams.subject_id
          ) || null
        }
        disabled={!queryParams.teacher_id}
        param={subjectOptions}
        property="Fan"
      />
      <Selector
        value={
          classOptions.find((item) => item.value === queryParams.class_id) ||
          null
        }
        disabled={!queryParams.subject_id}
        param={classOptions}
        property="Sinf"
      />
      <Selector
        value={
          monthsOptions.find((item) => item.value === queryParams.month_id) ||
          null
        }
        disabled={!queryParams.class_id}
        param={monthsOptions}
        property="Oy"
      />
    </div>
  );
}

export default Heading;
