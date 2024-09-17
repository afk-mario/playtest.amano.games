"use server";

export default async function Page({
  params,
}: {
  params: { playtesterId: string };
}) {
  return <div>playtesterId: {params.playtesterId}</div>;
}
