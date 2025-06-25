import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
};

export default function Contact() {
  return (
    <div>
       <h2 className="text-xl font-bold mb-4 text-center">Contact</h2>
       <label>
        <form>
           <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">Namee</label>
          <input
            id="name"
            name="name"
            required
            // value={formData.name}
            // onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        </form>
       </label>
    </div>
  );
}