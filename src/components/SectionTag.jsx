import { CircuitNode } from "./CircuitTrace";

export default function SectionTag({ id, label }) {
  return <CircuitNode label={`MODULE — ${label}`} id={id} />;
}
