import { PresentationPage } from '@/components/presentation/PresentationPage';
import { EN_CONTENT } from '@/lib/presentation-content';

export const metadata = {
  title: 'AI with Agency & Urgency | Presentation',
  description: 'A practical guide for business leaders on adopting AI tools effectively.',
};

export default function EnglishPresentationPage() {
  return <PresentationPage content={EN_CONTENT} />;
}
