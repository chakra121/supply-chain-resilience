import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface RoleSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function RoleSelector({ value, onChange }: RoleSelectorProps) {
  return (
    <div className="space-y-2">
      <Label>Role</Label>
      <RadioGroup value={value} onValueChange={onChange} className="flex gap-6">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="analyst" id="analyst" />
          <Label htmlFor="analyst">Analyst</Label>
        </div>

        <div className="flex items-center space-x-2">
          <RadioGroupItem value="executive" id="executive" />
          <Label htmlFor="executive">Executive</Label>
        </div>
      </RadioGroup>
    </div>
  );
}
