import { useNavigate } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

const ThumbnailDashboard = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1 className="flex justify-row justify-col justify-center text-5xl bold italic">
        A smarter way to
      </h1>
      <h1 className="flex  justify-row justify-col justify-center text-5xl bold italic">
        grow and move ahead,
      </h1>
      <div className="text-xl text-gray-400 mt-2.5 py-16 flex  flex-col  justify-center items-center ">
        <p>Our aim to deliver premium-quality thumbnails,</p>
        <p>with precise, platform-perfect aspect ratios.</p>

        <div className="mt-5">
          <SignedOut>
            <SignInButton>
              <button className="bg-neutral-700 py-5 rounded-full h-14 w-xs hover:bg-gray-900 transition-all hover:text-2xl tracking-normal">
                Click here
              </button>
            </SignInButton>
          </SignedOut>

          <div className="flex flex-col items-center gap-4">
            <button
              onClick={() => {
                navigate("/thumbnail");
              }}
            >
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThumbnailDashboard;
