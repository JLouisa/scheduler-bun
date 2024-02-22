import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RememberMeT } from "@/lib/types";

export function RememberMe({ rememberRef }: RememberMeT) {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="remember-me"
        onCheckedChange={(isChecked) => (rememberRef.current = isChecked)}
      />
      <Label htmlFor="remember-me">Remember Me</Label>
    </div>
  );
}

export default RememberMe;
