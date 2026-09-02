import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { FiArrowUpRight } from "react-icons/fi";
import {
  ContributionDay,
  ContributionWeek,
  getGithubContributions,
} from "@/lib/github-contributions";

const WEEKDAYS = [0, 1, 2, 3, 4, 5, 6] as const;
const SKELETON_WEEKS = 53;

function formatContributionDate(date: string, locale: string) {
  return new Intl.DateTimeFormat(locale === "pt" ? "pt-BR" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

function getContributionLevel(level: string, count: number) {
  switch (level) {
    case "FIRST_QUARTILE":
      return 1;
    case "SECOND_QUARTILE":
      return 2;
    case "THIRD_QUARTILE":
      return 3;
    case "FOURTH_QUARTILE":
      return 4;
    default:
      return count > 0 ? 1 : 0;
  }
}

function getDayForWeekday(week: ContributionWeek, weekday: number) {
  return week.contributionDays.find((day) => day.weekday === weekday);
}

function ProfileLink({
  label,
  ariaLabel,
}: {
  label: string;
  ariaLabel: string;
}) {
  return (
    <a
      className="github-contributions__profile"
      href="https://github.com/guijoazeiro"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
    >
      {label}
      <FiArrowUpRight aria-hidden="true" focusable="false" />
    </a>
  );
}

function ContributionMeta({
  total,
  hasCalendar,
}: {
  total?: number;
  hasCalendar: boolean;
}) {
  const t = useTranslations("GithubContributions");

  return (
    <div className="github-contributions__meta">
      <span className="github-contributions__activity">
        {t("activity")}
      </span>
      <div className="github-contributions__meta-right">
        <ProfileLink
          label={t(hasCalendar ? "profile" : "profileFallback")}
          ariaLabel={t("profileAriaLabel")}
        />
        {hasCalendar && total !== undefined && (
          <>
            <span
              className="github-contributions__separator"
              aria-hidden="true"
            >
              /
            </span>
            <span className="github-contributions__total">
              {t("total", { total })}
            </span>
          </>
        )}
      </div>
    </div>
  );
}

function ContributionCell({
  day,
  locale,
  rowIndex,
  columnIndex,
}: {
  day: ContributionDay | undefined;
  locale: string;
  rowIndex: number;
  columnIndex: number;
}) {
  const t = useTranslations("GithubContributions");

  if (!day) {
    return <span className="github-contributions__cell" aria-hidden="true" />;
  }

  const date = formatContributionDate(day.date, locale);
  const label = t("cellLabel", {
    count: day.contributionCount,
    date,
  });
  const level = getContributionLevel(
    day.contributionLevel,
    day.contributionCount,
  );

  return (
    <span
      className={`github-contributions__cell github-contributions__cell--level-${level}`}
      role="gridcell"
      aria-label={label}
      aria-rowindex={rowIndex + 1}
      aria-colindex={columnIndex + 1}
      tabIndex={day.contributionCount > 0 ? 0 : -1}
      data-tooltip={label}
      title={label}
    />
  );
}

function ContributionGrid({
  weeks,
  locale,
}: {
  weeks: ContributionWeek[];
  locale: string;
}) {
  const t = useTranslations("GithubContributions");

  return (
    <div
      className="github-contributions__scroll"
      role="region"
      aria-label={t("calendarLabel")}
    >
      <div
        className="github-contributions__grid"
        role="grid"
        aria-label={t("calendarLabel")}
        aria-rowcount={WEEKDAYS.length}
        aria-colcount={weeks.length}
        style={{ gridTemplateColumns: `repeat(${weeks.length}, var(--github-cell-size))` }}
      >
        {WEEKDAYS.map((weekday) => (
          <div
            className="github-contributions__row"
            role="row"
            key={weekday}
          >
            {weeks.map((week, weekIndex) => (
              <ContributionCell
                key={getDayForWeekday(week, weekday)?.date ?? `${weekIndex}-${weekday}`}
                day={getDayForWeekday(week, weekday)}
                locale={locale}
                rowIndex={weekday}
                columnIndex={weekIndex}
              />
            ))}
          </div>
        ))}
      </div>
      <span className="github-contributions__scroll-hint" aria-hidden="true">
        {t("scrollHint")}
      </span>
    </div>
  );
}

async function GithubContributionBody({ locale }: { locale: string }) {
  const t = useTranslations("GithubContributions");
  const result = await getGithubContributions();

  if (!result.ok) {
    return (
      <div className="github-contributions__body">
        <ContributionMeta hasCalendar={false} />
        <div className="github-contributions__error" role="status">
          <p>{t("error")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="github-contributions__body">
      <ContributionMeta
        total={result.calendar.totalContributions}
        hasCalendar
      />
      <ContributionGrid weeks={result.calendar.weeks} locale={locale} />
      <p className="sr-only">
        {t("accessibilitySummary", {
          total: result.calendar.totalContributions,
        })}
      </p>
    </div>
  );
}

function ContributionsSkeleton() {
  const t = useTranslations("GithubContributions");

  return (
    <div
      className="github-contributions__body github-contributions__body--skeleton"
      aria-busy="true"
      aria-label={t("loading")}
    >
      <div className="github-contributions__meta" aria-hidden="true">
        <span className="github-contributions__skeleton-block github-contributions__skeleton-block--activity" />
        <span className="github-contributions__skeleton-block github-contributions__skeleton-block--meta" />
      </div>
      <div className="github-contributions__scroll" aria-hidden="true">
        <div
          className="github-contributions__grid"
          style={{
            gridTemplateColumns: `repeat(${SKELETON_WEEKS}, var(--github-cell-size))`,
          }}
        >
          {Array.from({ length: WEEKDAYS.length * SKELETON_WEEKS }).map(
            (_, index) => (
              <span
                className="github-contributions__cell github-contributions__cell--skeleton"
                key={index}
              />
            ),
          )}
        </div>
      </div>
    </div>
  );
}

export default function GithubContributions({ locale }: { locale: string }) {
  const t = useTranslations("GithubContributions");

  return (
    <section
      className="mb-16 md:mb-24 reveal github-contributions"
      id="github-contributions"
    >
      <div className="experience-heading">
        <span className="experience-heading__bar" aria-hidden="true" />
        <h2 className="section-title">{t("h1")}</h2>
      </div>

      <Suspense fallback={<ContributionsSkeleton />}>
        <GithubContributionBody locale={locale} />
      </Suspense>
    </section>
  );
}
