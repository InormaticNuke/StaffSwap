import { ReplacementCard } from "../ReplacementCard";

export default function ReplacementCardExample() {
  return (
    <div className="flex flex-col gap-4 p-4 max-w-md">
      <ReplacementCard
        id="1"
        absentWorker="John Doe"
        replacementWorker="Alex Brown"
        extraAmount={150.00}
        workSite="Warehouse A"
        status="pending"
        date="Oct 3, 2025"
        showActions
        onApprove={(id) => console.log("Approved:", id)}
        onReject={(id) => console.log("Rejected:", id)}
      />
      <ReplacementCard
        id="2"
        absentWorker="Jane Smith"
        replacementWorker="Emily Davis"
        extraAmount={200.50}
        workSite="Office Downtown"
        status="approved"
        date="Oct 2, 2025"
      />
      <ReplacementCard
        id="3"
        absentWorker="Mike Johnson"
        replacementWorker="Chris Wilson"
        extraAmount={175.00}
        workSite="Factory North"
        status="rejected"
        date="Oct 1, 2025"
      />
    </div>
  );
}
