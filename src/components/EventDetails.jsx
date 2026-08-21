import { useEffect, useRef, useState } from "react";
import SectionReveal from "./SectionReveal";
import Divider from "./Divider";
import { eventDetails } from "../data/weddingData";
import venueVideo from "../../venue.mp4";

const venueImage = `${import.meta.env.BASE_URL}venue.jpg`;

function createGoogleCalendarUrl() {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: "Namrata-Kartik-Wedding",
    // End dates for all-day Google Calendar events are exclusive.
    dates: "20270125/20270126",
    location: `${eventDetails.venue}, ${eventDetails.address}`,
    details: "We can't wait to celebrate with you!",
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export default function EventDetails() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const videoVisibleRef = useRef(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const googleCalendarUrl = createGoogleCalendarUrl();

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return undefined;

    // Start buffering on page load, well before this section is in view.
    // `preload` is only a browser hint, so explicitly loading makes the intent
    // clear to mobile browsers that honour it.
    video.load();

    const observer = new IntersectionObserver(
      ([entry]) => {
        videoVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          video.currentTime = 0;
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1, rootMargin: "200px 0px" }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const retryVideo = () => {
    const video = videoRef.current;
    if (!video) return;

    setVideoFailed(false);
    setVideoReady(false);
    video.load();
  };

  const handleCanPlay = () => {
    setVideoFailed(false);
    setVideoReady(true);
    if (videoVisibleRef.current) videoRef.current?.play().catch(() => {});
  };

  return (
    <section ref={sectionRef} id="details" className="relative bg-ivory py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionReveal className="text-center">
          <p className="font-script text-3xl text-rose">Join the celebration</p>
          <h2 className="section-title mt-1">Event Details</h2>
          <Divider className="mt-4" />
        </SectionReveal>

        <SectionReveal delay={0.15} className="mt-14">
          <div className="overflow-hidden rounded-[2rem] bg-wine shadow-soft">
            <div className="relative aspect-[4/3] overflow-hidden sm:aspect-auto sm:min-h-[34rem] lg:min-h-[38rem]">
              <img
                src={venueImage}
                alt="Blueworld Castles at dusk"
                className="absolute inset-0 h-full w-full origin-top scale-[1.15] object-cover object-top sm:scale-100 sm:object-center"
              />
              <video
                ref={videoRef}
                src={venueVideo}
                loop
                muted
                playsInline
                preload="auto"
                poster={venueImage}
                aria-label="A preview of Blueworld Castles"
                className={`absolute inset-0 h-full w-full origin-top scale-[1.15] object-cover object-top brightness-125 contrast-105 saturate-110 transition-opacity duration-300 sm:scale-100 sm:object-center ${
                  videoReady && !videoFailed ? "opacity-100" : "opacity-0"
                }`}
                onCanPlay={handleCanPlay}
                onError={() => {
                  setVideoReady(false);
                  setVideoFailed(true);
                }}
              />
              {videoFailed && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-wine/80 px-4 py-2 text-center text-sm text-champagne">
                  <p>Showing venue photo.</p>
                  <button
                    type="button"
                    onClick={retryVideo}
                    className="ml-2 font-medium underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne"
                  >
                    Retry
                  </button>
                </div>
              )}
            </div>

            <div className="relative overflow-hidden px-8 py-10 text-center text-champagne sm:px-12">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full border border-gold/30" />
              <div className="pointer-events-none absolute -bottom-24 -left-16 h-52 w-52 rounded-full border border-champagne/15" />
              <div className="relative">
                <p className="text-xs uppercase tracking-[0.32em] text-gold">The Venue</p>
                <h3 className="mt-3 font-serif text-4xl leading-none text-white sm:text-5xl">
                  {eventDetails.venue}
                </h3>
                <p className="mt-4 text-champagne/80">{eventDetails.city}</p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <a
                    href={eventDetails.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-gradient-gold px-4 py-2 text-xs font-medium text-white shadow-glow transition-transform hover:scale-105 sm:px-6 sm:py-3 sm:text-sm"
                  >
                    📍 Get Directions
                  </a>
                  <a
                    href={googleCalendarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-gradient-gold px-4 py-2 text-xs font-medium text-white shadow-glow transition-transform hover:scale-105 sm:px-6 sm:py-3 sm:text-sm"
                  >
                    🗓️ Add to Calendar
                  </a>
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>

      </div>
    </section>
  );
}
