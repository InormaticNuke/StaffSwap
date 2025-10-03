import { ReplacementHistory } from "../ReplacementHistory";

//todo: remove mock functionality
const mockReplacements = [
  {
    id: "1",
    absentWorker: "John Doe",
    replacementWorker: "Alex Brown",
    extraAmount: 150.00,
    workSite: "Warehouse A",
    status: "approved" as const,
    date: "Oct 3, 2025",
  },
  {
    id: "2",
    absentWorker: "Jane Smith",
    replacementWorker: "Emily Davis",
    extraAmount: 200.50,
    workSite: "Office Downtown",
    status: "pending" as const,
    date: "Oct 2, 2025",
  },
  {
    id: "3",
    absentWorker: "Mike Johnson",
    replacementWorker: "Chris Wilson",
    extraAmount: 175.00,
    workSite: "Factory North",
    status: "rejected" as const,
    date: "Oct 1, 2025",
  },
];

export default function ReplacementHistoryExample() {
  return (
    <div className="max-w-md p-4">
      <ReplacementHistory replacements={mockReplacements} />
    </div>
  );
}
