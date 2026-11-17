import { RELEASE_EXAMPLE_ZONES, RELEASE_WINDOWS, type ReleaseWindow } from "../vice-signal/config";
import styles from "./release-guide.module.css";

type TableLabels = readonly [region: string, localTime: string, utc: string, current?: string];

export function ReleaseTable({ locale, labels, active }: {
  locale: "en" | "uk" | "pl";
  labels: TableLabels;
  active?: ReleaseWindow["id"];
}) {
  return (
    <div className={styles.tableFrame} role="region" aria-label={labels[0]} tabIndex={0}>
      <table>
        <thead><tr>{labels.slice(0, 3).map(label => <th key={label} scope="col">{label}</th>)}</tr></thead>
        <tbody>
          {RELEASE_WINDOWS.map(window => {
            const timeZone = RELEASE_EXAMPLE_ZONES[window.id];
            const local = new Intl.DateTimeFormat(locale === "en" ? "en-GB" : locale, {
              day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZone,
            }).format(new Date(window.utc));
            return (
              <tr key={window.id} aria-current={window.id === active ? true : undefined}>
                <th scope="row">{window.labels[locale]}{window.id === active && <small>{labels[3]}</small>}</th>
                <td><time dateTime={window.utc}>{local}</time><small>{timeZone.replaceAll("_", " ")}</small></td>
                <td><time dateTime={window.utc}>{window.utc.replace("T", " ").replace(":00Z", "")}</time></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
