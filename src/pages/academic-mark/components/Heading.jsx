import { useMemo } from "react";
import { useAcademicMarkStore } from "../../../store/AcademicMarkStore";
import Selector from "./Select";

function Heading() {
  const { filterset } = useAcademicMarkStore();

  const teachersOptions = useMemo(() => {
    return (
      filterset?.teacher_options?.map((element) => ({
        label: element.full_name,
        value: element.id,
      })) || []
    );
  }, [filterset]);

  const classOptions = useMemo(() => {
    return (
      filterset?.class_options?.map((element) => ({
        label: element.title,
        value: element.id,
      })) || []
    );
  }, [filterset]);

  const subjectOptions = useMemo(() => {
    return (
      filterset?.subject_options?.map((element) => ({
        label: element.title,
        value: element.id,
      })) || []
    );
  }, [filterset]);

  const monthsOptions = useMemo(() => {
    return (
      filterset?.month_options?.map((element) => ({
        label: element.title,
        value: element.id,
      })) || []
    );
  }, [filterset]);

  return (
    <div className="w-full flex justify-start gap-5">
      <Selector param={teachersOptions} property="Ustoz" />
      <Selector param={subjectOptions} property="Fan" />
      <Selector param={classOptions} property="Sinf" />
      <Selector param={monthsOptions} property="Oy" />
    </div>
  );
}

export default Heading;
