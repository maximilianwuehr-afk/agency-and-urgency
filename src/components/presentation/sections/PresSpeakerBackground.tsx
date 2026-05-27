'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { PresentationSection } from '../PresentationSection';
import { PresentationContent } from '@/lib/presentation-content';

interface PresSpeakerBackgroundProps {
  content: PresentationContent;
}

export function PresSpeakerBackground({ content }: PresSpeakerBackgroundProps) {
  const { speakerBackground } = content;
  const image = speakerBackground.image;

  return (
    <PresentationSection id="speaker-background" className="py-8 px-8 justify-center">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-[0.78fr_1.22fr] gap-8 lg:gap-14 items-center">
          {image && (
            <motion.figure
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-panel)]"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={960}
                height={640}
                priority
                className="aspect-[16/9] md:aspect-[4/5] max-h-[540px] w-full object-cover object-center"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-6 pb-5 pt-16">
                <span className="font-mono text-sm text-white/85">
                  {image.caption}
                </span>
              </figcaption>
            </motion.figure>
          )}

          <div className={image ? '' : 'lg:col-span-2'}>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sm font-mono text-[var(--accent-finn)] mb-4"
            >
              {speakerBackground.eyebrow}
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4 leading-tight"
            >
              {speakerBackground.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-lg md:text-xl text-[var(--text-muted)] leading-snug mb-6"
            >
              {speakerBackground.intro}
            </motion.p>

            <div className="grid gap-4">
              {speakerBackground.proofPoints.map((point, index) => (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.12, duration: 0.45 }}
                  className="bg-[var(--bg-panel)] border border-[var(--border)] rounded-xl p-4"
                >
                  <div className="flex items-start gap-4">
                    {point.label && (
                      <div className="font-mono text-[var(--accent-finn)] text-sm shrink-0 pt-1">
                        {point.label}
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-[var(--accent-glow)]">
                        {point.title}
                      </h3>
                      <p className="text-base md:text-lg text-[var(--text-muted)] leading-snug">
                        {point.text}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {speakerBackground.takeaway && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.45 }}
                  className="border-l-4 border-[var(--accent-finn)] bg-[var(--bg-card)] px-5 py-3 rounded-r-xl"
                >
                  <p className="text-base md:text-lg text-[var(--text-primary)] leading-snug">
                    {speakerBackground.takeaway}
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PresentationSection>
  );
}
