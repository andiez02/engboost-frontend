import { CircularProgress } from "@mui/material";
import Lottie from "lottie-react";
import studyingAnimation from "../../assets/lotties/studying.json";

function LearningProgress() {
  return (
    <div className="w-full h-full bg-[#FDFAF6]  p-5 flex flex-col items-center">
      <Lottie animationData={studyingAnimation} loop className="size-full" />
    </div>
  );
}

export default LearningProgress;
