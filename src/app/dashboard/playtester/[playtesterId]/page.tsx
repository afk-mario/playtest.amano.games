"use server";

export default async function Page(
  props: {
    params: Promise<{ playtesterId: string }>;
  }
) {
  const params = await props.params;
  return <div>playtesterId: {params.playtesterId}</div>;
}
