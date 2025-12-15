import Link from "next/link";

export default function PlaytesterTagsCell({
  playtesterId,
  tags,
}: {
  playtesterId: string;
  tags?: string;
}) {
  if (!tags) {
    return null;
  }

  return (
    <Link
      className="cell-tag"
      href={`/dashboard/contact/${playtesterId}/edit/`}
    >
      <ul className="c-tag-list">
        {tags?.split(",").map((tag, i) => (
          <li key={i}>
            <span className="c-tag">{tag}</span>
          </li>
        ))}
      </ul>
    </Link>
  );
}
