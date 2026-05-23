'use client';

import { motion } from 'framer-motion';
import { PresentationSection } from '../PresentationSection';
import { PresentationContent } from '@/lib/presentation-content';

interface PresSpeakerBackgroundProps {
  content: PresentationContent;
}

export function PresSpeakerBackground({ content }: PresSpeakerBackgroundProps) {
  const { speakerBackground } = content;

  return (
    <PresentationSection id="speaker-background" className="py-20 px-8 justify-center">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14 items-center">
          <div>
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
              className="text-4xl md:text-6xl font-bold text-[var(--text-primary)] mb-8 leading-tight"
            >
              {speakerBackground.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-xl md:text-2xl text-[var(--text-muted)] leading-relaxed"
            >
              {speakerBackground.intro}
            </motion.p>
          </div>

          <div className="space-y-5">
            {speakerBackground.proofPoints.map((point, index) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12, duration: 0.45 }}
                className="bg-[var(--bg-panel)] border border-[var(--border)] rounded-xl p-6"
              >
                <div className="flex items-start gap-5">
                  <div className="font-mono text-[var(--accent-finn)] text-sm shrink-0 pt-1">
                    {point.label}
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-[var(--accent-glow)] mb-2">
                      {point.title}
                    </h3>
                    <p className="text-lg text-[var(--text-muted)] leading-relaxed">
                      {point.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45 }}
              className="border-l-4 border-[var(--accent-finn)] bg-[var(--bg-card)] px-6 py-5 rounded-r-xl"
            >
              <p className="text-xl text-[var(--text-primary)] leading-relaxed">
                {speakerBackground.takeaway}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </PresentationSection>
  );
}
