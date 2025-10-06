export default function CancelPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold text-red-600">❌ Payment Cancelled</h1>
            <p className="mt-4">Your order was not completed. Try again.</p>
        </div>
    );
}
