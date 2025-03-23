import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { UploadCloud, AlertCircle } from "lucide-react";
import sectionsData from "../User Tools/sectionsData";

const UploadFineReceipt = () => {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [section, setSection] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileSize = selectedFile.size / 1024 / 1024;
      const fileType = selectedFile.type;
      
      if (fileSize > 2) {
        setMessage("File size exceeds 2MB limit.");
        setMessageType("error");
        setFile(null);
        return;
      }
      
      if (!["image/jpeg", "image/png", "application/pdf"].includes(fileType)) {
        setMessage("Invalid file type. Only .jpg, .png, .pdf are allowed.");
        setMessageType("error");
        setFile(null);
        return;
      }
      
      setMessage("File uploaded successfully.");
      setMessageType("success");
      setFile(selectedFile);
    }
  };

  const submitFineProof = () => {
    console.log("Submitting fine proof...");
    navigate("/payment");
  };

  return (
    <div className="relative">
      <div className="absolute top-4 left-4">
        <Link to="/" className="text-[#C68EFD] hover:underline">← Back to Home</Link>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden mx-auto mt-12"
      >
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-4 text-center bg-gradient-to-r from-green-400 via-[#C68EFD] to-emerald-500 text-transparent bg-clip-text">
            Upload Fine Receipt
          </h2>
          <p className="text-gray-300 text-center">Submit your fine proof for admin approval</p>

          <div className="mt-6">
            <label className="font-semibold block mb-1 text-gray-300">Vehicle Number:</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#C68EFD]"
              placeholder="ABC-1234 / WP-AB-1234"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
            />
          </div>

          <div className="mt-4">
            <label className="font-semibold block mb-1 text-gray-300">License Number:</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#C68EFD]"
              placeholder="L123456789"
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value.toUpperCase())}
            />
          </div>

          <div className="relative mt-4">
            <label className="font-semibold block mb-1 text-gray-300">Section:</label>
            <select
              className="w-full p-3 border border-gray-600 rounded-md bg-gradient-to-r from-[#B07CE5] to-[#C68EFD] text-white 
              focus:outline-none focus:ring-2 focus:ring-[#C68EFD] appearance-none cursor-pointer transition-all duration-200 
              hover:bg-[#B07CE5] shadow-md"
              value={section}
              onChange={(e) => setSection(e.target.value)}
            >
              <option value="">Select a section</option>
              {Object.keys(sectionsData).map((sec) => (
                <option key={sec} value={sec}>Section {sec}</option>
              ))}
            </select>
          </div>

          {section && sectionsData[section] && (
            <div className="mt-2 p-3 bg-gray-700 rounded-md">
              <p className="text-white font-semibold">{sectionsData[section].provision}</p>
              <p className="text-green-400 font-semibold">Fine Amount: Rs. {sectionsData[section].fine}</p>
            </div>
          )}

          {/* Upload File Section */}
          <div className="mt-4">
            <label className="font-semibold block mb-1 text-gray-300">Upload Fine Receipt (.pdf, .png, .jpg | Max 2MB):</label>
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
          
          {message && (
            <p className={`mt-2 text-sm ${messageType === "error" ? "text-red-400" : "text-green-400"}`}>
              {messageType === "error" ? <AlertCircle className="inline-block mr-1" /> : null} {message}
            </p>
          )}

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