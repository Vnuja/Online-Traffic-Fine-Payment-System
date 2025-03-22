import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { UploadCloud, AlertCircle } from "lucide-react"; // Importing icons
import sectionsData from "../User Tools/sectionsData";

const UploadFineReceipt = () => {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [section, setSection] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // Allowed file types
  const allowedFileTypes = ["application/pdf", "image/png", "image/jpeg"];
  const maxFileSize = 2 * 1024 * 1024; // 2MB in bytes

  // Vehicle number validation (Sri Lankan format)
  const isValidVehicleNumber = (num) =>
    /^[A-Z]{2,3}-[A-Z]{0,2}-?\d{4}$/.test(num);

  // License number validation (Format: L followed by 9 digits)
  const isValidLicenseNumber = (num) => /^L\d{9}$/.test(num);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      // Validate file type
      if (!allowedFileTypes.includes(selectedFile.type)) {
        setMessage("Invalid file type! Only .pdf, .png, .jpg are allowed.");
        setMessageType("error");
        setFile(null);
        return;
      }

      // Validate file size (2MB)
      if (selectedFile.size > maxFileSize) {
        setMessage("File size exceeds 2MB limit.");
        setMessageType("error");
        setFile(null);
        return;
      }

      setFile(selectedFile);
      setMessage(""); // Clear any previous error message
    }
  };

  const submitFineProof = () => {
    // Validations
    if (!vehicleNumber || !licenseNumber || !section || !file) {
      setMessage("All fields are required!");
      setMessageType("error");
      return;
    }
    if (!isValidVehicleNumber(vehicleNumber)) {
      setMessage(
        "Invalid vehicle number format! Example: WP-AB-1234 or ABC-1234."
      );
      setMessageType("error");
      return;
    }
    if (!isValidLicenseNumber(licenseNumber)) {
      setMessage(
        "Invalid license number! It should start with 'L' followed by 9 digits."
      );
      setMessageType("error");
      return;
    }

    // Success
    setTimeout(() => {
      setMessage(
        "Fine receipt uploaded successfully! Waiting for admin approval."
      );
      setMessageType("success");
    }, 1000);
  };

  return (
    <div className="relative">
      {/* Back to Home Link */}
      <div className="absolute top-4 left-4">
        <Link to="/" className="text-[#C68EFD] hover:underline">
          ← Back to Home
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl 
                   rounded-2xl shadow-xl overflow-hidden mx-auto mt-12"
      >
        <div className="p-8">
          <h2
            className="text-3xl font-bold mb-4 text-center bg-gradient-to-r 
                        from-green-400 via-[#C68EFD] to-emerald-500 text-transparent bg-clip-text"
          >
            Upload Fine Receipt
          </h2>
          <p className="text-gray-300 text-center">
            Submit your fine proof for admin approval
          </p>

          {/* Vehicle Number Input */}
          <div className="mt-6">
            <label className="font-semibold block mb-1 text-gray-300">
              Vehicle Number:
            </label>
            <input
              type="text"
              className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white 
                         focus:outline-none focus:ring-2 focus:ring-[#C68EFD]"
              placeholder="ABC-1234 / WP-AB-1234"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
            />
          </div>

          {/* License Number Input */}
          <div className="mt-4">
            <label className="font-semibold block mb-1 text-gray-300">
              License Number:
            </label>
            <input
              type="text"
              className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white 
                         focus:outline-none focus:ring-2 focus:ring-[#C68EFD]"
              placeholder="L123456789"
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value.toUpperCase())}
            />
          </div>

          {/* Section Dropdown */}
          <div className="relative mt-4">
            <label className="font-semibold block mb-1 text-gray-300">
              Section:
            </label>
            <motion.div whileFocus={{ scale: 1.02 }} className="relative">
              <select
                className="w-full p-3 border border-gray-600 rounded-md bg-gradient-to-r from-[#B07CE5] to-[#C68EFD] text-white 
                           focus:outline-none focus:ring-2 focus:ring-[#C68EFD] appearance-none cursor-pointer transition-all duration-200 
                           hover:bg-[#B07CE5] shadow-md"
                value={section}
                onChange={(e) => setSection(e.target.value)}
              >
                <option value="" className="bg-gray-800 text-white">
                  Select a section
                </option>
                {Object.keys(sectionsData).map((sec) => (
                  <option
                    key={sec}
                    value={sec}
                    className="bg-gray-700 hover:bg-gray-600"
                  >
                    Section {sec}
                  </option>
                ))}
              </select>
            </motion.div>
          </div>

          {/* Upload File Section */}
          <div className="mt-4">
            <label className="font-semibold block mb-1 text-gray-300">
              Upload Fine Receipt (.pdf, .png, .jpg | Max 2MB):
            </label>
            <div className="flex items-center space-x-3 p-3 border border-gray-600 rounded-md bg-gray-700 text-white cursor-pointer hover:bg-gray-600 transition">
              <UploadCloud className="w-6 h-6 text-[#C68EFD]" />
              <input
                type="file"
                className="hidden"
                accept=".pdf,.png,.jpg"
                onChange={handleFileChange}
                id="fileUpload"
              />
              <label htmlFor="fileUpload" className="cursor-pointer">
                {file ? file.name : "Choose a file"}
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            className="w-full mt-6 py-3 px-4 bg-[#C68EFD] text-white font-bold rounded-lg shadow-lg hover:bg-[#B07CE5] focus:outline-none focus:ring-2 focus:ring-[#C68EFD] transition duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={submitFineProof}
          >
            Submit
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default UploadFineReceipt;
