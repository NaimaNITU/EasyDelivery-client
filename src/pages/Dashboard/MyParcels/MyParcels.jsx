import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import Logo from "../../../shared/easyDeliveryLogo/Logo";
import { useNavigate } from "react-router";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: parcels = [] } = useQuery({
    queryKey: ["my-parcels", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString("en-BD", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const handlePay = (id) => {
    console.log(id);
    navigate(`/dashboard/payment/${id}`);
  };

  return (
    <div className="overflow-x-auto p-4">
      <Logo />
      <h2 className="text-xl font-bold mb-4">My Parcels</h2>
      <table className="table w-full">
        <thead>
          <tr className="bg-base-200">
            <th>#</th>
            <th>Type</th>
            <th>Created At</th>
            <th>Cost (৳)</th>
            <th>Payment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {parcels.map((parcel, index) => (
            <tr key={parcel._id}>
              <td>{index + 1}</td>
              <td className="capitalize">{parcel.parcelType}</td>
              <td>{formatDate(parcel.creation_date)}</td>
              <td>{parcel.cost}</td>
              <td>
                <span
                  className={`font-semibold ${
                    parcel.payment_status === "pending"
                      ? "text-[#e49b0f]"
                      : "text-[#22c55e]"
                  }`}
                >
                  {parcel.payment_status}
                </span>
              </td>
              <td className="space-x-1">
                <button className="btn btn-xs btn-info">View</button>
                <button
                  onClick={() => handlePay(parcel._id)}
                  className="btn btn-xs btn-success"
                >
                  Pay
                </button>
                <button className="btn btn-xs btn-error">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyParcels;
