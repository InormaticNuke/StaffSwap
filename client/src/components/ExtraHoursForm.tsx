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

interface ExtraHoursFormProps {
  onSubmit: (data: {
    worker: string;
    workSite: string;
    hours: number;
    date: string;
  }) => void;
}

export function ExtraHoursForm({ onSubmit }: ExtraHoursFormProps) {
  const [worker, setWorker] = useState("");
  const [workSite, setWorkSite] = useState("");
  const [hours, setHours] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const hoursNum = parseFloat(hours);
    if (worker && workSite && !isNaN(hoursNum) && hoursNum > 0 && date) {
      onSubmit({
        worker,
        workSite,
        hours: hoursNum,
        date,
      });
      setWorker("");
      setWorkSite("");
      setHours("");
      setDate("");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Log Extra Hours</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="worker">Worker</Label>
            <Select value={worker} onValueChange={setWorker} required>
              <SelectTrigger id="worker" className="h-14" data-testid="select-worker">
                <SelectValue placeholder="Select worker" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="john-doe">John Doe</SelectItem>
                <SelectItem value="jane-smith">Jane Smith</SelectItem>
                <SelectItem value="mike-johnson">Mike Johnson</SelectItem>
                <SelectItem value="sarah-williams">Sarah Williams</SelectItem>
                <SelectItem value="alex-brown">Alex Brown</SelectItem>
                <SelectItem value="emily-davis">Emily Davis</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="workSiteHours">Work Site</Label>
            <Select value={workSite} onValueChange={setWorkSite} required>
              <SelectTrigger id="workSiteHours" className="h-14" data-testid="select-work-site-hours">
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

          <div className="space-y-2">
            <Label htmlFor="hours">Extra Hours</Label>
            <Input
              id="hours"
              type="number"
              step="0.5"
              min="0.5"
              placeholder="Enter hours"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              className="h-14"
              data-testid="input-hours"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="h-14"
              data-testid="input-date"
              required
            />
          </div>

          <Button type="submit" className="h-12 w-full" data-testid="button-submit-extra-hours">
            Submit Extra Hours
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
