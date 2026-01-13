'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';

const codeExample = `# AGENTS.md
## Project Context
- Stack: Next.js, TypeScript, Tailwind
- Style: Minimal, functional components
- Conventions: Prefer composition over inheritance

## Do's
- Use semantic HTML
- Keep components under 200 lines
- Write tests for business logic

## Don'ts
- Don't add abstractions I didn't ask for
- Don't refactor surrounding code
- Don't use class components`;

export function ContextGame() {
  return (
    <Section id="context-game" className="py-24 px-8">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-4 text-[var(--text-primary)]"
        >
          The Context Game
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg text-[var(--text-muted)] mb-12"
        >
          AI performance depends heavily on context — what you tell it about your situation,
          constraints, and goals.
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* AGENTS.md */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
              AGENTS.md / CLAUDE.md
            </h3>
            <p className="text-[var(--text-muted)] mb-4 text-sm">
              A file in your project that gives AI persistent instructions: coding style,
              project structure, do&apos;s and don&apos;ts. It reads this before every conversation.
            </p>
            <div className="bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-card)] border-b border-[var(--border)]">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                <span className="text-xs text-[var(--text-muted)] ml-2 font-mono">AGENTS.md</span>
              </div>
              <pre className="p-4 text-xs font-mono text-[var(--text-muted)] overflow-x-auto">
                {codeExample}
              </pre>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
              Skills
            </h3>
            <p className="text-[var(--text-muted)] mb-4 text-sm">
              Reusable prompts for common tasks. Like macros, but for AI.
            </p>
            <div className="space-y-3">
              {[
                { name: '/o3-prep', desc: 'Generates 1:1 prep with accountability tracking' },
                { name: '/cli-design', desc: 'Helps with crafting command-line interfaces' },
                { name: '/frontend-design', desc: 'Grounds the AI for design decisions' },
              ].map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-3 bg-[var(--bg-panel)] border border-[var(--border)] rounded-lg"
                >
                  <code className="text-[var(--accent-glow)] font-mono text-sm">{skill.name}</code>
                  <p className="text-[var(--text-muted)] text-sm mt-1">{skill.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Warning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-6 bg-[var(--accent-warn)]/10 border border-[var(--accent-warn)]/30 rounded-xl"
        >
          <h4 className="text-lg font-semibold text-[var(--accent-warn)] mb-3 flex items-center gap-2">
            <span>⚠</span> Warning: Context Bloat
          </h4>
          <p className="text-[var(--text-muted)] mb-4">
            More context ≠ better results. Performance degrades when the context window fills up.
          </p>
          <div className="flex items-center gap-4 p-4 bg-[var(--bg-primary)] rounded-lg">
            <div className="text-4xl font-bold text-[var(--accent-warn)]">~30%</div>
            <div className="text-sm text-[var(--text-muted)]">
              is where quality starts dropping. Be selective. Clear conversations when stuck.
              <span className="text-[var(--accent-glow)]"> Start fresh.</span>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
