import { PresentationPage } from '@/components/presentation/PresentationPage';
import { DE_CONTENT } from '@/lib/presentation-content';

export const metadata = {
  title: 'KI mit Selbstbestimmtheit & Dringlichkeit | Präsentation',
  description: 'Ein praktischer Leitfaden für Führungskräfte zur effektiven Nutzung von KI-Tools.',
};

export default function GermanPresentationPage() {
  return <PresentationPage content={DE_CONTENT} />;
}
