import { useMemo } from "react";
import { useBehaviorMarkStore } from "../../../store/BehaviorMarkStore";
import Selector from "./Select";

function Heading() {
	const { filterset } = useBehaviorMarkStore();

	const classOptions = useMemo(() => {
		return (
			filterset?.class_options?.map((element) => ({
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
			<Selector param={classOptions} property="Sinf" />
			<Selector param={monthsOptions} property="Oy" />
		</div>
	);
}

export default Heading;
