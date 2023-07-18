
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import PetsIcon from "@mui/icons-material/Pets";
import CasinoIcon from "@mui/icons-material/Casino";
import CelebrationIcon from "@mui/icons-material/Celebration";
import PhishingIcon from "@mui/icons-material/Phishing";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import WifiIcon from "@mui/icons-material/Wifi";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";
const greenTick = () => <CheckIcon style={{ color: "green" }} />;
const redTick = () => <ClearIcon style={{ color: "red" }} />;

function Facilities({ data }) {


    return (
      <>
        {data?.Facilities && data.Facilities.length > 0 ? (
          <div className="chck-grid-single">
            <div className="chck-grid-single__facility">
              <p>
                <AcUnitIcon className="chck-grid-single__facility-icon" /> AC:{" "}
                {data.Facilities[0].AC ? greenTick() : redTick()}
              </p>
              <p>
                <PersonalVideoIcon className="chck-grid-single__facility-icon" />{" "}
                TV: {data.Facilities[0].AC ? greenTick() : redTick()}
              </p>
              <p>
                <WifiIcon className="chck-grid-single__facility-icon" /> Wi-Fi:{" "}
                {data.Facilities[0].AC ? greenTick() : redTick()}
              </p>
              <p>
                <PhishingIcon className="chck-grid-single__facility-icon" />{" "}
                Fishing: {data.Facilities[0].AC ? greenTick() : redTick()}
              </p>
            </div>
            <div className="chck-grid-single__facility">
              <p>
                <FastfoodIcon className="chck-grid-single__facility-icon" /> Food:{" "}
                {data.Facilities[0].AC ? greenTick() : redTick()}
              </p>
              <p>
                <PetsIcon className="chck-grid-single__facility-icon" /> Pets:{" "}
                {data.Facilities[0].AC ? greenTick() : redTick()}
              </p>
              <p>
                <CelebrationIcon className="chck-grid-single__facility-icon" />{" "}
                Party Hall: {data.Facilities[0].AC ? greenTick() : redTick()}
              </p>
              <p>
                <CasinoIcon className="chck-grid-single__facility-icon" /> Games:{" "}
                {data.Facilities[0].AC ? greenTick() : redTick()}
              </p>
            </div>
          </div>
        ) : null}
      </>
    );
  }
  
  export default Facilities;
  