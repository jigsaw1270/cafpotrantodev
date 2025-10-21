import Loader from '@/components/ui/loader';

export default function CheckoutLoading() {
  return (
    <div className="bg-purple flex min-h-screen items-center justify-center">
      <Loader size="large" centered />
    </div>
  );
}
