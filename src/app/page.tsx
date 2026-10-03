'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { BackgroundMusic } from '@/components/background-music';
import { Countdown } from '@/components/countdown';
import { invitationData } from '@/data/invitation';

const closingImage = new URL('../../assets/closing.png', import.meta.url).href;
const countdownImage = new URL('../../assets/countdown.png', import.meta.url).href;
const doorOpeningVideo = new URL('../../assets/door-opening.mp4', import.meta.url).href;
const eventDetailsImage = new URL('../../assets/event-details.png', import.meta.url).href;
const journeyImage = new URL('../../assets/our_journey.png', import.meta.url).href;
const littleOneImage = new URL('../../assets/little_one.png', import.meta.url).href;
const venueImage = new URL('../../assets/venue.png', import.meta.url).href;
const welcomeImage = new URL('../../assets/welcome.png', import.meta.url).href;

const EASE = [0.22, 1, 0.36, 1] as const;

function Ornament({ tone = 'gold' }: { tone?: 'gold' | 'ink' }) {
  return (
    <div className={`ornament ${tone === 'ink' ? 'ornament--ink' : ''}`} aria-hidden="true">
      <i />
    </div>
  );
}

function Reveal({
  className = '',
  children,
  delay = 0,
}: {
  className?: string;
  children: React.ReactNode;
  delay?: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function Scene({
  image,
  position = 'center center',
  scrim = 'even',
  align = 'center',
  children,
}: {
  image: string;
  position?: string;
  scrim?: 'top' | 'bottom' | 'even' | 'veil';
  align?: 'start' | 'center' | 'end';
  children: React.ReactNode;
}) {
  return (
    <section className="scene">
      <div
        className="scene-media"
        style={{ backgroundImage: `url(${image})`, backgroundPosition: position }}
      />
      <div className={`scrim scrim--${scrim}`} />
      <div className={`scene-content align-${align}`}>{children}</div>
    </section>
  );
}

export default function Home() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="invitation-shell">
      <BackgroundMusic />

      {/* 1 — Hero */}
      <section className="scene">
        <video
          src={doorOpeningVideo}
          autoPlay
          muted
          playsInline
          preload="auto"
          className="scene-video"
        />
        <div className="scrim scrim--bottom" />

        <motion.div
          className="scene-content align-end"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
        >
          <p className="eyebrow">தாய்மை விழா</p>
          <div style={{ height: '4cqw' }} />
          <Ornament />
          <h1 className="title hero-names">
            {invitationData.brideTamil}
            <span className="amp">&amp;</span>
            {invitationData.groomTamil}
          </h1>
          <p className="hero-latin latin">{invitationData.coupleEnglish}</p>
        </motion.div>
        <div className="scroll-cue" aria-hidden="true" />
      </section>

      {/* 2 — Welcome / Family intro */}
      <Scene image={welcomeImage} position="18% center" scrim="top" align="start">
        <Reveal className="card stack">
          <p className="eyebrow">அன்புடன் அழைக்கிறோம்</p>
          <Ornament />

          {/* Groom's side */}
          
          <p className="family-name">{invitationData.groomTamil}, MBA (H.R.)</p>
          <p className="family-line">
            <span className="family-parents">
              திரு. R. அசோகன் - திருமதி G. வரலட்சுமி
            </span>
            
          </p>

          <div className="heart-divider" aria-hidden="true">♥</div>

          {/* Bride's side */}
          
          <p className="family-name">{invitationData.brideTamil}, M.Sc. (Dietician)</p>
          <p className="family-line">
            <span className="family-parents">
              திரு. S. கண்ணன் - திருமதி K. ஸ்ரீதேவி
            </span>
            
          </p>

          <Ornament />
          <p className="both-families">இரு வீட்டார் அழைப்பு!</p>
        </Reveal>
      </Scene>

      {/* 3 — Journey */}
      <Scene image={journeyImage} position="center 30%" scrim="bottom" align="end">
        <Reveal className="card stack">
          <p className="eyebrow">எங்கள் பயணம்</p>
          <Ornament />
          <h2 className="heading">
            இரு இதயம், ஒரு பயணம்,
            <br />
            இப்போது மூன்று...
          </h2>
          <p className="body-text">
            எங்கள் வாழ்க்கையின் அழகான
            <br />
            புதிய அத்தியாயம் இப்போது தொடங்குகிறது.
          </p>
        </Reveal>
      </Scene>

      {/* 4 — The little one */}
      <Scene image={littleOneImage} position="center 60%" scrim="top" align="start">
        <Reveal className="card stack">
          <p className="eyebrow">ஒரு சிறிய இதயம்...</p>
          <Ornament />
          <h2 className="heading">
            எங்கள் உலகத்தை
            <br />
            முழுமையாக்க வருகிறது.
          </h2>
          <p className="body-text">
            அன்பால் உருவாகும்
            <br />
            ஒரு புதிய உலகம்.
          </p>
        </Reveal>
      </Scene>

      {/* 5 — Event details, set inside the arch of the artwork */}
      <section className="scene details-scene">
        <div
          className="scene-media"
          style={{ backgroundImage: `url(${eventDetailsImage})`, backgroundPosition: 'center' }}
        />
        <Reveal className="details-panel">
          <p className="eyebrow">தாய்மை விழா</p>
          <Ornament tone="ink" />
          <p className="date-number">{invitationData.dateNumber}</p>
          <p className="date-month">{invitationData.dateText}</p>
          <p className="date-weekday">{invitationData.weekdayText}</p>
          <Ornament tone="ink" />
          <p className="time-line">{invitationData.timeText}</p>
          <p className="venue-line">{invitationData.venueName}</p>
          <p className="venue-city">{invitationData.venueCity}</p>
        </Reveal>
      </section>

      {/* 6 — Venue */}
      <Scene image={venueImage} position="center center" scrim="bottom" align="end">
        <Reveal className="card stack">
          <p className="eyebrow">நிகழ்வு நடைபெறும் இடம்</p>
          <Ornament />
          <h2 className="venue-title">{invitationData.venueName}</h2>
          <p className="venue-city">{invitationData.venueCity}</p>
          <a
            href={invitationData.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="button"
          >
            இடம் பார்க்க <span aria-hidden="true">→</span>
          </a>
        </Reveal>
      </Scene>

      {/* 7 — Countdown */}
      <Scene image={countdownImage} position="center center" scrim="even" align="start">
        <Reveal className="card stack">
          <p className="eyebrow">நிகழ்வுக்கு இன்னும்...</p>
          <Ornament />
          <Countdown targetDate={invitationData.countdownTarget} />
        </Reveal>
      </Scene>

      {/* 8 — Closing */}
      <Scene image={closingImage} position="center center" scrim="veil" align="center">
        <Reveal className="stack">
          <h2 className="heading">
            உங்கள் வருகைக்காக
            <br />
            ஆவலுடன் காத்திருக்கிறோம்!
          </h2>
          <Ornament />
          <div className="heart-mark" aria-hidden="true">
            ♡
          </div>
          <p className="accent-text">அன்புடன்</p>
          <p className="signature">{invitationData.couple}</p>
          <p className="body-text">
            ஒரு சிறிய விழா...
            <br />
            எங்கள் பெரிய மகிழ்ச்சி.
          </p>
        </Reveal>
      </Scene>
    </main>
  );
}
