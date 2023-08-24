import { useEffect, useMemo } from "react";
import { useAttendaceStore } from "../../../store/AttendanceStore";
import Selector from "./Select";

function Heading() {
  const { filterset, queryParams, setAttendanceFilters, attendanceFilters } = useAttendaceStore();

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

  useEffect(() => {
    if (queryParams.teacher_id) {
      setAttendanceFilters({
        teacher_id: queryParams.teacher_id,
        subject_id: null,
        class_id: null,
        month_id: null,
      });
    }
  }, [queryParams.teacher_id, setAttendanceFilters]);

  useEffect(() => {
    if (queryParams.subject_id) {
      setAttendanceFilters({
        subject_id: queryParams.subject_id,
        class_id: null,
        month_id: null,
      });
    }
  }, [queryParams.subject_id, setAttendanceFilters]);

  useEffect(() => {
    if (queryParams.class_id) {
      setAttendanceFilters({
        class_id: queryParams.class_id,
        month_id: null,
      });
    }
  }, [queryParams.class_id, setAttendanceFilters]);

  useEffect(() => {
    if (queryParams.month_id) {
      setAttendanceFilters({
        month_id: queryParams.month_id,
      });
    }
  }, [queryParams.month_id, setAttendanceFilters]);


  return (
    <div className="w-full flex justify-start gap-5">
      <Selector
        value={
          teachersOptions.find(
            (item) => item.value === queryParams.teacher_id || item.value === attendanceFilters?.teacher_id
          ) || null
        }
        disabled={false}
        param={teachersOptions}
        property="Ustoz"
      />
      <Selector
        value={
          subjectOptions.find(
            (item) => item.value === queryParams.subject_id || item.value === attendanceFilters?.subject_id
          ) || null
        }
        disabled={!queryParams.teacher_id && !attendanceFilters?.teacher_id}
        param={subjectOptions}
        property="Fan"
      />
      <Selector
        value={
          classOptions.find((item) => item.value === queryParams.class_id || item.value === attendanceFilters?.class_id) ||
          null
        }
        disabled={!queryParams.subject_id && !attendanceFilters?.subject_id}
        param={classOptions}
        property="Sinf"
      />
      <Selector
        value={
          monthsOptions.find((item) => item.value === queryParams.month_id || item.value === attendanceFilters?.month_id) ||
          null
        }
        disabled={!queryParams.class_id && !attendanceFilters?.class_id}
        param={monthsOptions}
        property="Oy"
      />
    </div>
  );
}

export default Heading;
