import React from "react";
import ContentLoader from "react-content-loader";

const Title = (props) => {
  const theme = localStorage.getItem("theme");
  return (
    <ContentLoader
      height={150}
      width={720}
      viewBox="0 0 720 100"
      backgroundColor={theme === "light" ? "#f3f3f3" : "#858585"}
      foregroundColor={theme === "light" ? "#ecebeb" : "#595959"}
      {...props}
    >
      <circle cx="50" cy="50" r="50" />
      <rect x="120" y="14" rx="3" ry="3" width="380" height="30" />
      <rect x="120" y="55" rx="3" ry="3" width="280" height="15" />
    </ContentLoader>
  );
};

export default Title;
