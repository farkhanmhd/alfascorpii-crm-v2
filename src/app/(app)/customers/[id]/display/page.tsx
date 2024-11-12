import { Separator } from '@/components/ui/separator';
import { DisplayForm } from './display-form';

export default function SettingsDisplayPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Follow Up</h3>
        <p className="text-sm text-muted-foreground">
          List of Customer Follow Up
        </p>
      </div>
      <Separator />
      <DisplayForm />
    </div>
  );
}
