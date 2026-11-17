import { Select } from "@base-ui/react/select";
import { Check, ChevronDown } from "lucide-react";
import styles from "./site.module.css";

type Option = { value: string; label: string };

export function CustomizeSelect({ label, value, options, onChange, describedBy }: {
  label: string;
  value: string;
  options: readonly Option[];
  onChange: (value: string) => void;
  describedBy?: string;
}) {
  return (
    <Select.Root items={options} value={value} modal={false} onValueChange={(next) => {
      if (next !== null) onChange(next);
    }}>
      <Select.Label className={styles.pickerLabel}>{label}</Select.Label>
      <Select.Trigger className={styles.pickerTrigger} aria-describedby={describedBy}>
        <Select.Value className={styles.pickerValue} />
        <Select.Icon className={styles.pickerIcon}><ChevronDown size={16} aria-hidden="true" /></Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner className={styles.pickerPositioner} sideOffset={8} alignItemWithTrigger={false}>
          <Select.Popup className={styles.pickerPopup} data-customize-options>
            <Select.List className={styles.pickerList}>
              {options.map((option) => (
                <Select.Item className={styles.pickerOption} key={option.value} value={option.value}>
                  <Select.ItemText>{option.label}</Select.ItemText>
                  <Select.ItemIndicator><Check size={16} aria-hidden="true" /></Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}
