import { ReplacementForm } from "../ReplacementForm";

export default function ReplacementFormExample() {
  return (
    <div className="max-w-md p-4">
      <ReplacementForm onSubmit={(data) => console.log("Replacement submitted:", data)} />
    </div>
  );
}
