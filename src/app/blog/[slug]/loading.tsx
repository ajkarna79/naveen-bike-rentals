/** Skeleton while a guide streams in on client navigation. */
export default function LoadingPost() {
  return (
    <section className="pb-20 pt-[120px] sm:pt-[148px]" aria-busy="true" aria-label="Loading guide">
      <div className="wrap container-x animate-pulse">
        <div className="mb-8 h-4 w-56 bg-kerb" />
        <div className="h-20 w-3/4 bg-kerb" />
        <div className="mt-12 aspect-[16/9] max-w-[68ch] bg-kerb" />
      </div>
    </section>
  );
}
