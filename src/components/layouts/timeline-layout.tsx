import {ParentProps} from "../../types";

function TimelineLayout(props: ParentProps) {
  return (
    <section className="w-[598px] h-full border-x-[1px] border-x-border xs:border-x-0">
      {props.children}
    </section>
  );
}

export default TimelineLayout;