import { Map } from "@components";
import { useMapHooks } from "@hooks";

import { BottomSection, TopSection, Wrapper } from "./Styles";

const LeftPanel = () => {
  const { selectedMap } = useMapHooks();

  return (
    <Wrapper>
      <TopSection.Wrapper>
        <TopSection.Heading>
          {selectedMap?.name.toUpperCase()}
        </TopSection.Heading>
        <TopSection.MapContainer>
          <Map />
        </TopSection.MapContainer>
      </TopSection.Wrapper>
      <BottomSection.Wrapper></BottomSection.Wrapper>
    </Wrapper>
  );
};

export default LeftPanel;
