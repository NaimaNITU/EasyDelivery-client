import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import serviceData from "../../../public/data/warehouses.json";

const ParcelForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const [cost, setCost] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);

  // Watch inputs
  const parcelType = watch("parcelType");
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");

  // Service Center Filtering
  const getCentersByRegion = (region) => {
    return serviceData
      .filter((item) => item.region === region)
      .map((item) => item.city);
  };

  const calculateCost = (data) => {
    let baseCost = data.parcelType === "document" ? 50 : 100;
    if (data.weight) baseCost += parseInt(data.weight) * 10;
    return baseCost;
  };

  const onSubmit = (data) => {
    const deliveryCost = calculateCost(data);
    setCost(deliveryCost);
    toast.success(`Delivery Cost: ${deliveryCost} TK`);
    setShowConfirm(true);
  };

  const onConfirm = (data) => {
    const parcelData = {
      ...data,
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
        {/* Parcel Info */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Parcel Information</h3>
          <div className="flex gap-6 mb-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="document"
                {...register("parcelType", { required: true })}
                //   {...register("parcelType", { required: true })} this line means:
                //   <input
                //     type="radio"
                //     value="document"
                //     name="parcelType"
                //     onChange={...}
                //     onBlur={...}
                //     ref={...}
                //   />
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
              className="input input-bordered w-full "
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

        {/* Sender & Receiver Info */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sender Info */}
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

          {/* Receiver Info */}
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

        {/* Submit Button */}
        <button
          type="submit"
          className="btn bg-white text-black border border-gray-300 hover:bg-gray-100"
        >
          Submit
        </button>
      </form>

      {showConfirm && (
        <div className="mt-6">
          <button onClick={handleSubmit(onConfirm)} className="btn btn-success">
            Confirm & Save (৳{cost})
          </button>
        </div>
      )}
    </div>
  );
};

export default ParcelForm;
