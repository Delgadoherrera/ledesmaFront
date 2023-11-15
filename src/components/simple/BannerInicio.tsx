import ImageBanner from "../../assets/icons/e2617862-caa8-4f65-a61c-319d6c474b85.png";
import { Space, Typography } from "antd";
const { Text, Link } = Typography;

const ExploreContainer: React.FC<any> = () => {
  return (
    <div className="bannerContainer">
      <img src={ImageBanner}></img>
      <Text italic type="secondary">
        <b>Ledesma & Cia. </b>Trabajadores de la madera
      </Text>
    </div>
  );
};

export default ExploreContainer;
