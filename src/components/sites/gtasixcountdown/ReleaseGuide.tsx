import {
  RELEASE_BY_COUNTRY, RELEASE_DATE, RELEASE_EXAMPLE_ZONES, RELEASE_LISTINGS_NOTE,
  type ReleaseWindow,
} from "../vice-signal/config";
import { newsLink, newsSource, type NewsItem } from "./news-data";
import styles from "./release-guide.module.css";
import { ReleaseTable } from "./ReleaseTable";

function localTime(window: ReleaseWindow) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: RELEASE_EXAMPLE_ZONES[window.id],
  }).format(new Date(window.utc));
}

function countryTime(country: string) {
  const window = RELEASE_BY_COUNTRY.get(country);
  return window ? localTime(window) : "Not listed";
}

export function ReleaseGuide({ news }: { news: NewsItem[] }) {
  const headlines = [...news].sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
    .flatMap(item => {
      const link = newsLink(item.linkUrl) ?? newsLink(item.tweetUrl) ?? newsLink(newsSource);
      return link ? [{ id: item.id, title: item.title, link }] : [];
    }).slice(0, 5);

  return (
    <section className={styles.guide} aria-labelledby="release-guide-title">
      <div className={styles.inner}>
        <h2 id="release-guide-title">GTA 6 release date and unlock time</h2>
        <p>The GTA 6 countdown tracks when GTA VI is due to unlock in your region. The release date is {RELEASE_DATE}. Since regions use different unlock windows, the time on your clock depends on where you are. The timer uses your region automatically when it can. To check a different window, open Customize and choose a release region manually.</p>
        <p>The table pairs each unlock window with one example city and a UTC time. If your country spans more than one time zone, use the UTC column to work out the time where you live. For example, the United States uses one unlock instant, so the clock shows a different hour in New York than it does in Los Angeles.</p>
        <p>{RELEASE_LISTINGS_NOTE}</p>
        <ReleaseTable locale="en" labels={["Region", "Example local time", "UTC"]} />
        <h3>GTA VI and GTA 6 countdown FAQ</h3>
        <dl>
          <dt>When does GTA VI come out?</dt>
          <dd>The listed release date is {RELEASE_DATE}.</dd>
          <dt>What time does GTA VI unlock in Ukraine and Poland?</dt>
          <dd>The listed local times are {countryTime("UA")} in Kyiv and {countryTime("PL")} in Warsaw.</dd>
          <dt>Does it unlock worldwide at the same time?</dt>
          <dd>The PlayStation Store listings in this guide show different unlock instants by region.</dd>
          <dt>Which platforms does this countdown cover?</dt>
          <dd>It follows PlayStation Store listings. Xbox uses the same windows as an estimate, pending confirmation.</dd>
          <dt>Is this site official?</dt>
          <dd>This is an unofficial fan site. Rockstar Games and Take-Two Interactive are unaffiliated with it.</dd>
        </dl>
        {headlines.length > 0 && <>
          <h3>Latest GTA 6 news</h3>
          <ul>
            {headlines.map(({ id, title, link }) => (
              <li key={id}><a href={link.href}>{title}</a> <small>{link.hostname.replace(/^www\./, "")}</small></li>
            ))}
          </ul>
        </>}
      </div>
    </section>
  );
}
