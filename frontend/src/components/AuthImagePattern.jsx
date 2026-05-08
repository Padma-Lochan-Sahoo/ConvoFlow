const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      <div className="max-w-md text-center">
        {/* Animated grid pattern */}
        <div className="grid grid-cols-3 gap-3 mb-10">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl bg-primary/10 ${
                i % 2 === 0 ? "animate-pulse" : ""
              }`}
              style={{ animationDelay: `${i * 0.15}s`, animationDuration: "2.5s" }}
            />
          ))}
        </div>

        <div className="flex justify-center mb-5">
          <div className="size-14 rounded-2xl bg-primary/15 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="size-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-3">{title}</h2>
        <p className="text-base-content/60 leading-relaxed text-sm">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
