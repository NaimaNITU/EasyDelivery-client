import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import serviceData from "../../../public/data/warehouses.json";

const ParcelForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [cost, setCost] = useState(0);
  const [summary, setSummary] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);

  const parcelType = watch("parcelType");
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");

  const getCentersByRegion = (region) => {
    return serviceData
      .filter((item) => item.region === region)
      .map((item) => item.city);
  };

  const calculateCost = (data) => {
    const { parcelType, weight = 0, senderRegion, receiverRegion } = data;
    const parsedWeight = parseFloat(weight) || 0;
    const isSameRegion = senderRegion === receiverRegion;

    let base = 0;
    let extraKg = 0;
    let extraWeightCost = 0;
    let outsideRegionCharge = isSameRegion ? 0 : 40;
    let breakdown = "";

    if (parcelType === "document") {
      base = isSameRegion ? 60 : 80;
      const total = base + outsideRegionCharge;
      breakdown = `Delivery Charge Breakdown:\nParcel Type: Document\n\nBase Cost: ৳${base}${
        !isSameRegion ? "\nOutside Region Charge: ৳40" : ""
      }\n\n✅ Total Cost: ৳${total}`;
      return { cost: total, breakdown };
    } else if (parcelType === "non-document") {
      if (parsedWeight <= 3) {
        base = isSameRegion ? 110 : 150;
        const total = base + outsideRegionCharge;
        breakdown = `Delivery Charge Breakdown:\nParcel Type: Non-document\n\nTotal Weight: ${parsedWeight} kg\n\nBase Cost (up to 3kg): ৳${base}${
          !isSameRegion ? "\nOutside Region Charge: ৳40" : ""
        }\n\n✅ Total Cost: ৳${total}`;
        return { cost: total, breakdown };
      } else {
        base = 150;
        extraKg = parsedWeight - 3;
        extraWeightCost = extraKg * 40;
        const total = base + extraWeightCost + outsideRegionCharge;
        breakdown = `Delivery Charge Breakdown:\nParcel Type: Non-document\n\nTotal Weight: ${parsedWeight} kg\n\nBase Cost (up to 3kg): ৳150\n\nExtra Weight (${parsedWeight}kg - 3kg = ${extraKg}kg): ৳40 × ${extraKg} = ৳${extraWeightCost}${
          !isSameRegion ? "\n\nOutside Region Charge: ৳40" : ""
        }\n\n✅ Total Cost: ৳${total}`;
        return { cost: total, breakdown };
      }
    }
  };

  const onSubmit = (data) => {
    const { cost, breakdown } = calculateCost(data);
    setCost(cost);
    setSummary({ ...data, cost, breakdown });
    setShowConfirm(true);
  };

  const onConfirm = () => {
    const parcelData = {
      ...summary,
      creation_date: new Date().toISOString(),
    };
    console.log("Saved Parcel:", parcelData);
    toast.success("Parcel Added Successfully");
    reset();
    setShowConfirm(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Toaster position="top-right" />
      <h2 className="text-3xl font-bold mb-2">Send a Parcel</h2>
      <p className="mb-6 text-gray-500">
        Fill in the details below to create a door-to-door delivery request.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        <div>
          <h3 className="font-semibold text-lg mb-2">Parcel Information</h3>
          <div className="flex gap-6 mb-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="document"
                {...register("parcelType", { required: true })}
                className="radio"
              />
              Document
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="non-document"
                {...register("parcelType", { required: true })}
                className="radio"
              />
              Non-Document
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              {...register("title", { required: true })}
              type="text"
              placeholder="Parcel Title"
              className="input input-bordered w-full"
            />
            {parcelType === "non-document" && (
              <input
                {...register("weight", { required: true })}
                type="number"
                placeholder="Weight (kg)"
                className="input input-bordered w-full"
              />
            )}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">Sender Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                {...register("senderName", { required: true })}
                type="text"
                placeholder="Your Name"
                className="input input-bordered w-full"
              />
              <input
                {...register("senderContact", { required: true })}
                type="tel"
                placeholder="Contact Number"
                className="input input-bordered w-full"
              />
              <select
                {...register("senderRegion", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select Region</option>
                {[...new Set(serviceData.map((item) => item.region))].map(
                  (region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  )
                )}
              </select>
              <select
                {...register("senderCenter", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select Service Center</option>
                {getCentersByRegion(senderRegion).map((center) => (
                  <option key={center} value={center}>
                    {center}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-1 gap-4 mt-4">
              <input
                {...register("senderAddress", { required: true })}
                type="text"
                placeholder="Address"
                className="input input-bordered w-full"
              />
              <textarea
                {...register("pickupInstruction", { required: true })}
                placeholder="Pickup Instruction"
                className="textarea textarea-bordered w-full"
              ></textarea>
            </div>
          </div>

          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">Receiver Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                {...register("receiverName", { required: true })}
                type="text"
                placeholder="Receiver Name"
                className="input input-bordered w-full"
              />
              <input
                {...register("receiverContact", { required: true })}
                type="tel"
                placeholder="Contact Number"
                className="input input-bordered w-full"
              />
              <select
                {...register("receiverRegion", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select Region</option>
                {[...new Set(serviceData.map((item) => item.region))].map(
                  (region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  )
                )}
              </select>
              <select
                {...register("receiverCenter", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select Service Center</option>
                {getCentersByRegion(receiverRegion).map((center) => (
                  <option key={center} value={center}>
                    {center}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-1 gap-4 mt-4">
              <input
                {...register("receiverAddress", { required: true })}
                type="text"
                placeholder="Address"
                className="input input-bordered w-full"
              />
              <textarea
                {...register("deliveryInstruction", { required: true })}
                placeholder="Delivery Instruction"
                className="textarea textarea-bordered w-full"
              ></textarea>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="btn bg-white text-black border border-gray-300 hover:bg-gray-100"
        >
          Submit
        </button>
      </form>

      {/* modal */}
      {showConfirm && (
        <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[600px] space-y-4">
            <h3 className="text-xl font-bold">Delivery Summary</h3>
            <p>
              <strong>Parcel Type:</strong> {summary.parcelType}
            </p>
            <p>
              <strong>Weight:</strong> {summary.weight || "N/A"}
            </p>
            <p>
              <strong>From:</strong> {summary.senderRegion} →{" "}
              <strong>To:</strong> {summary.receiverRegion}
            </p>
            <pre className="bg-gray-100 p-4 rounded text-sm whitespace-pre-wrap">
              {summary.breakdown}
            </pre>
            <p className="text-xl font-bold">Total Cost: ৳{cost}</p>
            <div className="flex gap-4 mt-4">
              <button
                className="btn btn-outline"
                onClick={() => setShowConfirm(false)}
              >
                Edit
              </button>
              <button className="btn btn-success" onClick={onConfirm}>
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParcelForm;
