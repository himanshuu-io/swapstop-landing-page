import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="top"
      data-nav-bg="dark"
      className="relative flex min-h-[100svh] w-full overflow-hidden bg-black"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.webp"
          alt=""
          fill
          quality={95}
          className="object-cover"
          style={{ objectPosition: "50% 30%" }}
          priority
        />
      </div>
      <div className="absolute inset-0 z-[1] bg-black/50" />

      {/* Content container */}
      <div className="relative z-[2] w-full max-w-page mx-auto flex flex-col min-h-full pt-[85px]">
        <div className="mt-auto flex flex-col gap-12 pb-[120px] pl-[96px] pr-[133px] max-1100:px-14 max-640:gap-8 max-640:pb-14 max-640:px-6">
          {/* Title */}
          <h1 className="m-0 max-w-[682px] font-display font-medium text-[96px] leading-none tracking-[-1.92px] text-white max-1100:text-[clamp(48px,7.5vw,96px)] max-640:text-[clamp(30px,9.5vw,48px)] max-640:tracking-[-0.5px]">
            A simpler way to buy and sell on your time.
          </h1>

          {/* Row with CTAs and description */}
          <div className="flex items-end justify-between gap-10 flex-wrap max-1100:items-start max-640:flex-col max-640:items-start max-640:gap-6">
            {/* CTAs */}
            <div className="flex items-center gap-6 flex-wrap max-420:gap-4">
              <a
                href="#get-app"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-btn border border-lime bg-lime px-8 py-4 text-[20px] font-semibold text-forest transition-colors hover:bg-[#8ade1c] active:scale-[0.97] max-420:px-6"
              >
                Get the App
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-btn border border-white bg-transparent px-8 py-4 text-[20px] font-semibold text-white transition-colors hover:bg-white/10 active:scale-[0.97] max-420:px-6"
              >
                How it works
              </a>
            </div>

            {/* Description */}
            <p className="m-0 max-w-[469px] text-[20px] font-normal leading-[1.4] text-desc max-640:max-w-full">
              Swap Stop gives you a simple place to drop off and pick up items, so you can buy,
              sell or swap locally without having to coordinate every handoff.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
