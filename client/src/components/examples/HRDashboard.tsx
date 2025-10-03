import { HRDashboard } from "../HRDashboard";

//todo: remove mock functionality
const mockReplacements = [
  {
    id: "1",
    absentWorker: "John Doe",
    replacementWorker: "Alex Brown",
    extraAmount: 150.00,
    workSite: "Warehouse A",
    status: "pending" as const,
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
];

export default function HRDashboardExample() {
  return (
    <div className="max-w-md p-4">
      <HRDashboard
        replacements={mockReplacements}
        onApprove={(id) => console.log("Approved:", id)}
        onReject={(id) => console.log("Rejected:", id)}
      />
    </div>
  );
}
