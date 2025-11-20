function BillingFormPage() {
    return (
        <div className="max-w-2xl mx-auto p-6 space-y-4">

            <h1 className="text-2xl font-semibold mb-4">Billing address</h1>

            <form className="space-y-5">

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1">First name *</label>
                        <input className="border w-full p-2" />
                    </div>
                    <div>
                        <label className="block mb-1">Last name *</label>
                        <input className="border w-full p-2" />
                    </div>
                </div>

                <div>
                    <label className="block mb-1">Country / Region *</label>
                    <select className="border w-full p-2">
                        <option>Select a country...</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-1">Street address *</label>
                    <input className="border w-full p-2 mb-3" placeholder="House number and street name" />
                    <input className="border w-full p-2" placeholder="Apartment, suite (optional)" />
                </div>

                <div>
                    <label className="block mb-1">Town / City *</label>
                    <input className="border w-full p-2" />
                </div>

                <div>
                    <label className="block mb-1">State *</label>
                    <select className="border w-full p-2">
                        <option>Select an option...</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-1">ZIP Code *</label>
                    <input className="border w-full p-2" />
                </div>

                <button className="bg-blue-600 text-white px-6 py-2 rounded">
                    SAVE ADDRESS
                </button>
            </form>
        </div>
    );
}

export default BillingFormPage;
