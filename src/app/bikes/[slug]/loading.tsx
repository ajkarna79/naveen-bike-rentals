/** Instant skeleton shown while a bike page streams in on client navigation. */
export default function LoadingBike() {
  return (
    <section className="pb-20 pt-[112px] sm:pt-[132px]" aria-busy="true" aria-label="Loading bike">
      <div className="wrap container-x animate-pulse">
        <div className="mb-8 h-4 w-48 bg-kerb" />
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-7">
            <div className="h-5 w-40 bg-kerb" />
            <div className="mt-4 h-20 w-3/4 bg-kerb" />
            <div className="mt-10 aspect-[16/10] bg-kerb" />
          </div>
          <div className="h-[560px] bg-kerb lg:col-span-5" />
        </div>
      </div>
    </section>
  );
}
