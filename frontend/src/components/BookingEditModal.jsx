import { CalendarDays, ImagePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./Button";
import { Field, inputClass } from "./Field";
import { api } from "../services/api";

export function BookingEditModal({ booking, onClose, onSuccess }) {
    const [referenceImage, setReferenceImage] = useState(null);

    const [form, setForm] = useState({
        customerName: "",
        serviceType: "",
        description: "",
        bust: "",
        waist: "",
        hip: "",
        shoulder: "",
        length: "",
        deliveryDate: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    useEffect(() => {
        if (!booking) return;

        setForm({
            customerName: booking.customerName || "",
            serviceType: booking.serviceType || "",
            description: booking.description || "",
            bust: booking.measurements?.bust || "",
            waist: booking.measurements?.waist || "",
            hip: booking.measurements?.hip || "",
            shoulder: booking.measurements?.shoulder || "",
            length: booking.measurements?.length || "",
            deliveryDate: booking.deliveryDate || ""
        });
    }, [booking]);

    function update(field, value) {
        setForm((current) => ({
            ...current,
            [field]: value
        }));
    }
    async function save(event) {
        event.preventDefault();

        setLoading(true);
        setError("");

        try {
            const payload = new FormData();

            payload.append("customerName", form.customerName);
            payload.append("serviceType", form.serviceType);
            payload.append("description", form.description);
            payload.append("deliveryDate", form.deliveryDate);

            payload.append(
                "measurements",
                JSON.stringify({
                    bust: form.bust,
                    waist: form.waist,
                    hip: form.hip,
                    shoulder: form.shoulder,
                    length: form.length
                })
            );

            if (referenceImage) {
                payload.append("referenceImage", referenceImage);
            }

            await api.updateBooking(booking.id, payload);

            onSuccess?.();
        } catch (err) {
            setError(err.message || "Failed to update booking.");
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4">
            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-neutral-950">
                        Edit Booking
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        className="text-2xl font-bold text-neutral-500 hover:text-neutral-900"
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={save} className="space-y-4">
                    <Field label="Customer name">
                        <input
                            className={inputClass}
                            value={form.customerName}
                            onChange={(e) => update("customerName", e.target.value)}
                            required
                        />
                    </Field>

                    <Field label="Service type">
                        <input
                            className={inputClass}
                            value={form.serviceType}
                            onChange={(e) => update("serviceType", e.target.value)}
                            required
                        />
                    </Field>

                    <Field label="Requirements">
                        <textarea
                            className={inputClass}
                            value={form.description}
                            onChange={(e) => update("description", e.target.value)}
                            required
                        />
                    </Field>

                    <div className="grid gap-3 sm:grid-cols-2">
                        {[
                            ["bust", "Bust"],
                            ["waist", "Waist"],
                            ["hip", "Hip"],
                            ["shoulder", "Shoulder"],
                            ["length", "Length"]
                        ].map(([key, label]) => (
                            <Field key={key} label={`${label} measurement`}>
                                <input
                                    className={inputClass}
                                    value={form[key]}
                                    onChange={(e) => update(key, e.target.value)}
                                    placeholder="e.g. 34 inch"
                                />
                            </Field>
                        ))}
                    </div>

                    <Field label="Expected completion date">
                        <div className="relative">
                            <CalendarDays
                                className="pointer-events-none absolute left-3 top-3 text-neutral-400"
                                size={18}
                            />
                            <input
                                type="date"
                                className={`${inputClass} pl-10`}
                                value={form.deliveryDate}
                                onChange={(e) => update("deliveryDate", e.target.value)}
                                required
                            />
                        </div>
                    </Field>

                    <label className="flex cursor-pointer items-center justify-between rounded-xl border border-dashed border-pink-200 bg-pink-50 p-4">
                        <span className="inline-flex items-center gap-2 font-semibold text-rosewood">
                            <ImagePlus size={18} />
                            {referenceImage
                                ? referenceImage.name
                                : "Replace reference image (optional)"}
                        </span>

                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                                setReferenceImage(e.target.files?.[0] || null)
                            }
                        />
                    </label>

                    {error && (
                        <p className="rounded-xl border border-red-200 bg-red-50 p-3 font-semibold text-red-700">
                            {error}
                        </p>
                    )}

                    <div className="flex justify-end gap-3 pt-2">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>

                        <Button type="submit" disabled={loading}>
                            {loading ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}