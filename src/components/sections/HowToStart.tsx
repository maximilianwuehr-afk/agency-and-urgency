'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';

const steps = [
  {
    number: 1,
    title: 'Think First',
    description: 'Spend 2 minutes clarifying what you want. The clearer your request, the better the result.',
    bad: '"Summarize this meeting"',
    good: '"Turn a messy meeting + Slack thread into a clean recap and action plan, then draft the follow-up email and tasks."',
  },
  {
    number: 2,
    title: 'Be Specific',
    description: 'Vague requests produce vague results.',
    bad: '"Make a recap from this meeting and Slack thread"',
    good: '"From the notes below, write a 6-bullet recap for the team, then list owners + due dates for each action item."',
  },
  {
    number: 3,
    title: 'Tell It What NOT to Do',
    description: 'Constraints help more than you think.',
    bad: '"Create a recap and tasks from this meeting"',
    good: '"Create a recap and tasks. Do not invent decisions or owners; mark unknowns as [TBD]."',
  },
  {
    number: 4,
    title: 'Explain Why',
    description: 'Context matters. "This is for leadership" leads to a different result than "this is just for my team."',
    bad: '"Draft a follow-up email"',
    good: '"Draft a follow-up email so stakeholders who missed the meeting can approve next steps today."',
  },
  {
    number: 5,
    title: 'Clean Slate When Stuck',
    description: 'If AI keeps failing, start fresh. Copy only essential context. Performance improves dramatically.',
    bad: 'Keep pushing the same broken conversation',
    good: 'New chat, paste only the meeting notes + Slack thread',
  },
  {
    number: 6,
    title: 'Experiment',
    description: "You don't need every tool. But try them. If you're not experimenting, you're losing out.",
    bad: 'Stick with what you know',
    good: 'Try a workflow tool that can create tasks for you',
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
