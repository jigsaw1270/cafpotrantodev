import Loader from '@/components/ui/loader';

export default function Loading() {
  return (
    <div className="bg-purple flex min-h-screen items-center justify-center">
      <Loader size="large" centered />
    </div>
  );
}
