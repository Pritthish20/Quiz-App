import { getUserData} from "../IndexedDB/hooks"; // Import IndexedDB functions
const Done = () => {
  return (
    <div className="p-8 bg-white shadow-lg rounded-lg w-full max-w-3xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-green-600 mb-4">🎉 Quiz Completed! 🎉</h2>
      <p className="text-lg text-gray-500">You can now close this tab.</p>
    </div>
  );
};

export default Done;
