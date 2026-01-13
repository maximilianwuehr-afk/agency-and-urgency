'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';

const steps = [
  {
    number: 1,
    title: 'Think First',
    description: 'Spend 2 minutes clarifying what you want. Use "plan mode" — it forces structured thinking.',
    bad: '"Build an auth system"',
    good: '"Interview me about building an auth system. What are key steps?"',
  },
  {
    number: 2,
    title: 'Be Specific',
    description: 'Vague requests produce vague results.',
    bad: '"Build an auth system"',
    good: '"Build email/password auth using our existing User model, with JWT tokens, password reset, and rate limiting"',
  },
  {
    number: 3,
    title: 'Tell It What NOT to Do',
    description: 'Constraints help more than you think.',
    bad: '"Build an auth system"',
    good: '"Build an auth system. No OAuth or email verification — it\'s just an MVP."',
  },
  {
    number: 4,
    title: 'Explain Why',
    description: 'Context matters. "Runs on every API request" leads to different code than "one-time migration."',
    bad: '"Build an auth system"',
    good: '"Build an auth system. This is a demo to show stakeholders the concept."',
  },
  {
    number: 5,
    title: 'Clean Slate When Stuck',
    description: 'If AI keeps failing, start fresh. Copy only essential context. Performance improves dramatically.',
    bad: 'Keep pushing the same broken conversation',
    good: 'New chat, clear prompt, fresh start',
  },
  {
    number: 6,
    title: 'Experiment',
    description: "You don't need every tool. But try them. If you're not experimenting, you're losing out.",
    bad: 'Stick with what you know',
    good: 'Try one new tool this week',
  },
];

export function HowToStart() {
  return (
    <Section id="practical-guide" className="py-32 px-8">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-6 text-[var(--text-primary)]"
        >
          Practical Guide
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg text-[var(--text-muted)] mb-16"
        >
          How to actually use AI effectively, step by step.
        </motion.p>

        <div className="space-y-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-6"
            >
              <div className="shrink-0">
                <div className="w-12 h-12 rounded-full bg-[var(--accent-finn)] flex items-center justify-center text-white font-bold text-lg">
                  {step.number}
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                  {step.title}
                </h3>
                <p className="text-[var(--text-muted)] mb-4">{step.description}</p>

                {step.bad && step.good && (
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="p-3 bg-[var(--accent-warn)]/10 border border-[var(--accent-warn)]/30 rounded-lg">
                      <div className="text-xs font-mono text-[var(--accent-warn)] mb-1">❌ Don&apos;t</div>
                      <div className="text-sm text-[var(--text-muted)] font-mono">{step.bad}</div>
                    </div>
                    <div className="p-3 bg-[var(--accent-success)]/10 border border-[var(--accent-success)]/30 rounded-lg">
                      <div className="text-xs font-mono text-[var(--accent-success)] mb-1">✓ Do</div>
                      <div className="text-sm text-[var(--text-muted)] font-mono">{step.good}</div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
