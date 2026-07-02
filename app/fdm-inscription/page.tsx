import InscriptionForm from './inscriptionsForm';

export default function Page({ searchParams }: { searchParams: { type?: string } }) {
  // Lecture du paramètre 'type' depuis l'URL (côté serveur)
  const initialType = searchParams.type === 'client' ? 'client' : 'agent';

  return <InscriptionForm initialType={initialType} />;
}