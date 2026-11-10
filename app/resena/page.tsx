import type { Metadata } from 'next';
import ReviewRedirect from '../components/ReviewRedirect';

export const metadata: Metadata = {
  title: { absolute: 'Deja tu reseña | Clínica CIALO' },
  description: 'Comparte tu experiencia en Clínica CIALO dejando una reseña en Google.',
  robots: { index: false, follow: false },
};

export default function ResenaPage() {
  return <ReviewRedirect />;
}
