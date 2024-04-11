function Greeting() {
  return (
    <section className="h-[70dvh] grid place-content-center">
      <article className="text-center">
        <h1 className="text-xl font-semibold lowercase pb-1">
          Welcome to bundle
        </h1>
        <p className="text-sm font-light lowercase text-center">
          Simplify your day one <span className="font-medium">bundle</span> at a
          time...
        </p>
        <p className="text-sm lowercase font-light">
          Create a board to get started
        </p>
      </article>
    </section>
  );
}

export default Greeting;
