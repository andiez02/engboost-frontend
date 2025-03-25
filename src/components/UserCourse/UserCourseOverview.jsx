import { Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function UserCourseOverview() {
  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800">Khoá học của tôi</h3>
      <div className="w-full h-40 bg-gray-100 mt-4 rounded-2xl border border-gray-300 p-4 flex flex-col justify-between">
        <p className="text-base font-light text-gray-500">
          Bạn chưa sở hữu khoá học nào cho chương trình này. Hãy để{" "}
          <span className="font-semibold text-indigo-600">EngBoost</span> giúp
          bạn lựa chọn khoá học phù hợp với trình độ và mục tiêu của bạn nhé!
        </p>
        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          sx={{
            alignSelf: "start",
            "&:hover": { bgcolor: "#4F46E5" },
          }}
        >
          Khám phá ngay
        </Button>
      </div>
    </div>
  );
}

export default UserCourseOverview;
