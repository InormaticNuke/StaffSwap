import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ReplacementFormProps {
  onSubmit: (data: {
    absentWorker: string;
    replacementWorker: string;
    extraAmount: number;
    workSite: string;
  }) => void;
}

export function ReplacementForm({ onSubmit }: ReplacementFormProps) {
  const [absentWorker, setAbsentWorker] = useState("");
  const [replacementWorker, setReplacementWorker] = useState("");
  const [extraAmount, setExtraAmount] = useState("");
  const [workSite, setWorkSite] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(extraAmount);
    if (absentWorker && replacementWorker && !isNaN(amount) && amount >= 0 && workSite) {
      onSubmit({
        absentWorker,
        replacementWorker,
        extraAmount: amount,
        workSite,
      });
      setAbsentWorker("");
      setReplacementWorker("");
      setExtraAmount("");
      setWorkSite("");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Replacement</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="absentWorker">Absent Worker</Label>
            <Select value={absentWorker} onValueChange={setAbsentWorker} required>
              <SelectTrigger id="absentWorker" className="h-14" data-testid="select-absent-worker">
                <SelectValue placeholder="Select worker" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="john-doe">John Doe</SelectItem>
                <SelectItem value="jane-smith">Jane Smith</SelectItem>
                <SelectItem value="mike-johnson">Mike Johnson</SelectItem>
                <SelectItem value="sarah-williams">Sarah Williams</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="replacementWorker">Replacement Worker</Label>
            <Select value={replacementWorker} onValueChange={setReplacementWorker} required>
              <SelectTrigger id="replacementWorker" className="h-14" data-testid="select-replacement-worker">
                <SelectValue placeholder="Select replacement" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="alex-brown">Alex Brown</SelectItem>
                <SelectItem value="emily-davis">Emily Davis</SelectItem>
                <SelectItem value="chris-wilson">Chris Wilson</SelectItem>
                <SelectItem value="lisa-moore">Lisa Moore</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="extraAmount">Extra Amount</Label>
            <Input
              id="extraAmount"
              type="number"
              step="0.01"
              min="0"
              placeholder="Enter amount"
              value={extraAmount}
              onChange={(e) => setExtraAmount(e.target.value)}
              className="h-14"
              data-testid="input-extra-amount"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="workSite">Work Site</Label>
            <Select value={workSite} onValueChange={setWorkSite} required>
              <SelectTrigger id="workSite" className="h-14" data-testid="select-work-site">
                <SelectValue placeholder="Select work site" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="warehouse-a">Warehouse A</SelectItem>
                <SelectItem value="warehouse-b">Warehouse B</SelectItem>
                <SelectItem value="office-downtown">Office Downtown</SelectItem>
                <SelectItem value="factory-north">Factory North</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="h-12 w-full" data-testid="button-submit-replacement">
            Submit Replacement
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
