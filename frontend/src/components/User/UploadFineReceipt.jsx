import { useState } from "react";
import { motion } from "framer-motion";

const UploadFineReceipt = () => {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const submitFineProof = () => {
    if (!vehicleNumber || !licenseNumber || !file) {
      setMessage("All fields are required!");
      setMessageType("error");
      return;
    }

    // Simulating file upload
    setTimeout(() => {
      setMessage("Fine receipt uploaded successfully! Waiting for admin approval.");
      setMessageType("success");
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl 
                 rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-4 text-center bg-gradient-to-r 
                      from-green-400 via-[#C68EFD] to-emerald-500 text-transparent bg-clip-text">
          Upload Fine Receipt
        </h2>
        <p className="text-gray-300 text-center">Submit your fine proof for admin approval</p>

        <div className="mt-6">
          <label className="font-semibold block mb-1 text-gray-300">Vehicle Number:</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white 
                       focus:outline-none focus:ring-2 focus:ring-[#C68EFD]"
            placeholder="ABC-1234"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
          />
        </div>

        <div className="mt-4">
          <label className="font-semibold block mb-1 text-gray-300">License Number:</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white 
                       focus:outline-none focus:ring-2 focus:ring-[#C68EFD]"
            placeholder="L123456789"
            value={licenseNumber}
            onChange={(e) => setLicenseNumber(e.target.value)}
          />
        </div>

        <div className="mt-4">
          <label className="font-semibold block mb-1 text-gray-300">Upload Fine Receipt (Image/PDF):</label>
          <input
            type="file"
            className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
            accept="image/*,application/pdf"
            onChange={handleFileChange}
          />
        </div>

        <motion.button
          className="w-full mt-6 py-3 px-4 bg-[#C68EFD] text-white font-bold rounded-lg shadow-lg 
                     hover:bg-[#B07CE5] focus:outline-none focus:ring-2 focus:ring-[#C68EFD] focus:ring-offset-2 
                     focus:ring-offset-gray-900 transition duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={submitFineProof}
        >
          Submit
        </motion.button>

        {message && (
          <p className={`mt-3 font-semibold text-center ${messageType === "error" ? "text-red-500" : "text-green-500"}`}>
            {message}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default UploadFineReceipt;
