import Loader from '@/components/ui/loader';

export default function CheckoutLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Loader size="large" centered />
    </div>
  );
}
