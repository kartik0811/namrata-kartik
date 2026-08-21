import { useEffect, useRef, useState } from "react";
import SectionReveal from "./SectionReveal";
import Divider from "./Divider";
import { eventDetails } from "../data/weddingData";
import venueVideo from "../../venue.mp4";

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
  const googleCalendarUrl = createGoogleCalendarUrl();

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return undefined;

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
    video.load();
  };

  const handleCanPlay = () => {
    setVideoFailed(false);
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
            <div className="relative aspect-video overflow-hidden sm:aspect-auto sm:min-h-[34rem] lg:min-h-[38rem]">
              <video
                ref={videoRef}
                src={venueVideo}
                loop
                muted
                playsInline
                preload="metadata"
                poster={`${import.meta.env.BASE_URL}venue.jpg`}
                aria-label="A preview of Blueworld Castles"
                className="absolute inset-0 h-full w-full origin-top scale-[1.15] object-cover object-top brightness-125 contrast-105 saturate-110 sm:scale-100 sm:object-center"
                onCanPlay={handleCanPlay}
                onError={() => setVideoFailed(true)}
              />
              {videoFailed && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-wine/65 px-6 text-center text-champagne">
                  <p className="font-serif text-lg">Unable to load the venue video.</p>
                  <button
                    type="button"
                    onClick={retryVideo}
                    className="rounded-full border border-champagne/70 px-5 py-2 text-sm font-medium transition hover:bg-champagne hover:text-wine focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne"
                  >
                    Retry video
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
                    className="rounded-full bg-gradient-gold px-6 py-3 text-sm font-medium text-white shadow-glow transition-transform hover:scale-105"
                  >
                    📍 Get Directions
                  </a>
                  <a
                    href={googleCalendarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-gradient-gold px-6 py-3 text-sm font-medium text-white shadow-glow transition-transform hover:scale-105"
                  >
                    🗓️ Add to Google Calendar
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
